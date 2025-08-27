"use client";

import { useEffect, useMemo, useState, useRef } from "react";
import styles from "./style.module.css";
import { url } from "@/utils/backend";

type Conversation = {
  id: number;
  title: string | null;
  is_group: boolean;
  participants?: { id: number; name: string; email?: string }[];
  messages?: { id: number; body: string; created_at: string; user_id: number }[];
};

type Message = {
  id: number;
  body: string;
  user_id: number;
  created_at: string;
};

type User = {
  id: number;
  full_name?: string;
  name?: string;
  email?: string;
};

type UserWithConversation = User & {
  conversationId?: number;
  lastMessage?: string;
  hasConversation: boolean;
};

export default function MessagesClient({
  userId,
  token,
}: {
  userId: number;
  token: string;
}) {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [usersWithConversations, setUsersWithConversations] = useState<UserWithConversation[]>([]);
  const [activeId, setActiveId] = useState<number | null>(null);
  const [loadingConvs, setLoadingConvs] = useState(false);
  const [loadingUsers, setLoadingUsers] = useState(false);

  const authHeaders = useMemo(
    () => ({
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    }),
    [token]
  );

  // Load all users
  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoadingUsers(true);
      try {
        const res = await fetch(`${url}/api/v1/users/`, {
          headers: authHeaders,
        });
        const data = await res.json();
        
        const list =
          Array.isArray(data) ? data :
          Array.isArray(data?.payload) ? data.payload :
          Array.isArray(data?.users) ? data.users :
          Array.isArray(data?.data) ? data.data : [];

        if (!cancelled) {
          setUsers(list.filter(u => u.id !== userId)); // Exclude current user
        }
      } catch (e) {
        console.error("Failed to load users", e);
      } finally {
        if (!cancelled) setLoadingUsers(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [authHeaders, userId]);

  // Load conversations
  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoadingConvs(true);
      try {
        const res = await fetch(`${url}/api/v1/messages/conversations`, {
          headers: authHeaders,
          cache: "no-store",
        });
        const data = await res.json();
        if (!cancelled) {
          setConversations(data?.conversations ?? []);
        }
      } catch (e) {
        console.error("Failed to load conversations", e);
      } finally {
        if (!cancelled) setLoadingConvs(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [authHeaders]);

  // Combine users with their conversation data
  useEffect(() => {
    const combined: UserWithConversation[] = users.map(user => {
      // Find conversation with this user
      const conversation = conversations.find(conv => 
        !conv.is_group && 
        conv.participants?.some(p => p.id === user.id)
      );

      return {
        ...user,
        conversationId: conversation?.id,
        lastMessage: conversation?.messages?.[0]?.body || "",
        hasConversation: !!conversation
      };
    });

    // Sort: users with conversations first (by last message time), then users without conversations
    combined.sort((a, b) => {
      if (a.hasConversation && !b.hasConversation) return -1;
      if (!a.hasConversation && b.hasConversation) return 1;
      
      if (a.hasConversation && b.hasConversation) {
        const aConv = conversations.find(c => c.id === a.conversationId);
        const bConv = conversations.find(c => c.id === b.conversationId);
        const aTime = aConv?.messages?.[0]?.created_at || "";
        const bTime = bConv?.messages?.[0]?.created_at || "";
        return bTime.localeCompare(aTime); // Most recent first
      }

      // Both don't have conversations, sort alphabetically
      const aName = a.full_name || a.name || `User ${a.id}`;
      const bName = b.full_name || b.name || `User ${b.id}`;
      return aName.localeCompare(bName);
    });

    setUsersWithConversations(combined);
  }, [users, conversations]);

  const handleUserClick = async (user: UserWithConversation) => {
    if (user.hasConversation) {
      // User has existing conversation, just switch to it
      setActiveId(user.conversationId!);
    } else {
      // Create new conversation
      try {
        const res = await fetch(`${url}/api/v1/messages/conversations`, {
          method: "POST",
          headers: authHeaders,
          body: JSON.stringify({ user_ids: [user.id] }),
        });
        const data = await res.json();
        if (data?.conversation) {
          setConversations(prev => [data.conversation, ...prev]);
          setActiveId(data.conversation.id);
        }
      } catch (e) {
        console.error("Create conversation failed", e);
      }
    }
  };

  return (
    <div className={styles.layout}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <h3 className={styles.sidebarTitle}>Messages</h3>
        </div>

        <div className={styles.convListContainer}>
          {loadingUsers || loadingConvs ? (
            <div className={styles.muted}>Loading…</div>
          ) : usersWithConversations.length === 0 ? (
            <div className={styles.muted}>No users found.</div>
          ) : (
            <ul className={styles.convList}>
              {usersWithConversations.map((user) => {
                const title = user.full_name || user.name || `User ${user.id}`;
                const lastMsg = user.lastMessage || "No msg yet";
                const active = user.conversationId === activeId;
                
                return (
                  <li key={user.id}>
                    <button
                      className={`${styles.convItem} ${active ? styles.convItemActive : ""}`}
                      onClick={() => handleUserClick(user)}
                    >
                      <div className={styles.convTitle}>{title}</div>
                      <div className={styles.convLast}>{lastMsg}</div>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </aside>

      {/* Thread */}
      <section className={styles.thread}>
        {activeId ? (
          <Thread token={token} userId={userId} conversationId={activeId} />
        ) : (
          <div className={styles.threadEmpty}>Select a user to start messaging</div>
        )}
      </section>
    </div>
  );
}

/* ────────────────────────────── Thread ────────────────────────────── */

function Thread({
  token,
  userId,
  conversationId,
}: {
  token: string;
  userId: number;
  conversationId: number;
}) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const headers = useMemo(
    () => ({
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    }),
    [token]
  );

  // Auto-scroll to bottom when messages change
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // load messages
  const load = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `${url}/api/v1/messages/conversations/${conversationId}/messages`,
        { headers, cache: "no-store" }
      );
      const data = await res.json();
      setMessages(data?.messages ?? []);
    } catch (e) {
      console.error("Failed to load messages", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // Optional: simple polling every 5s. Replace with websockets later.
    const t = setInterval(load, 5000);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conversationId]);

  async function onSend(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const input = e.currentTarget.elements.namedItem("body") as HTMLInputElement;
    const body = input.value.trim();
    if (!body) return;

    input.value = "";
    try {
      const res = await fetch(
        `${url}/api/v1/messages/conversations/${conversationId}/messages`,
        {
          method: "POST",
          headers,
          body: JSON.stringify({ body }),
        }
      );
      const data = await res.json();
      // optimistic append
      if (data?.message) {
        setMessages((prev) => [...prev, data.message]);
      } else {
        // fallback reload
        load();
      }
    } catch (e) {
      console.error("Send failed", e);
    }
  }

  return (
    <>
      <div className={styles.threadBody}>
        {loading && messages.length === 0 ? (
          <div className={styles.muted}>Loading…</div>
        ) : (
          <>
            {messages.map((m) => {
              const mine = m.user_id === userId;
              return (
                <div
                  key={m.id}
                  className={`${styles.bubble} ${mine ? styles.me : styles.them}`}
                  title={new Date(m.created_at).toLocaleString()}
                >
                  <div>{m.body}</div>
                  <div className={styles.timestamp}>
                    {new Date(m.created_at).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
              );
            })}
            {/* Invisible element to scroll to */}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      <form className={styles.composer} onSubmit={onSend}>
        <input
          name="body"
          placeholder="Type a message…"
          className={styles.input}
          autoComplete="off"
        />
        <button type="submit" className={styles.sendBtn}>Send</button>
      </form>
    </>
  );
}