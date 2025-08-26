"use client";

import { useEffect, useMemo, useState } from "react";
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

export default function MessagesClient({
  userId,
  token,
}: {
  userId: number;
  token: string;
}) {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeId, setActiveId] = useState<number | null>(null);
  const [loadingConvs, setLoadingConvs] = useState(false);

  const authHeaders = useMemo(
    () => ({
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    }),
    [token]
  );

  // Load my conversations
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
          if (!activeId && (data?.conversations?.length ?? 0) > 0) {
            setActiveId(data.conversations[0].id);
          }
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
  }, [authHeaders, activeId]);

  return (
    <div className={styles.layout}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <h3 className={styles.sidebarTitle}>Messages</h3>
          <New1to1Button token={token} userId={userId} onCreated={(conv) => {
            setConversations((prev) => [conv, ...prev]);
            setActiveId(conv.id);
        
          }}/>
        </div>

        {loadingConvs ? (
          <div className={styles.muted}>Loading…</div>
        ) : conversations.length === 0 ? (
          <div className={styles.muted}>No conversations yet.</div>
        ) : (
          <ul className={styles.convList}>
            {conversations.map((c) => {
              const other =
                (!c.is_group && c.participants)
                  ? c.participants.find((p) => p.id !== userId)
                  : undefined;
              const title = c.is_group ? (c.title ?? "Group") : (other?.full_name ?? `User #${other?.id}`);
              const last = c.messages?.[0]?.body ?? "No messages yet";
              const active = c.id === activeId;
              return (
                <li key={c.id}>
                  <button
                    className={`${styles.convItem} ${active ? styles.convItemActive : ""}`}
                    onClick={() => setActiveId(c.id)}
                  >
                    <div className={styles.convTitle}>{title}</div>
                    <div className={styles.convLast}>{last}</div>
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </aside>

      {/* Thread */}
      <section className={styles.thread}>
        {activeId ? (
          <Thread token={token} userId={userId} conversationId={activeId} />
        ) : (
          <div className={styles.threadEmpty}>Select a conversation</div>
        )}
      </section>
    </div>
  );
}

/* ────────────────────────── Thread ────────────────────────── */

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

  const headers = useMemo(
    () => ({
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    }),
    [token]
  );

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
          messages.map((m) => {
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
          })
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

/* ────────────────────── New 1–1 Conversation ────────────────────── */

function New1to1Button({
  token,
  userId,
  onCreated,
}: {
  token: string;
  userId: number;
  onCreated: (c: Conversation) => void;
}) {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  const authHeaders = useMemo(
    () => ({
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    }),
    [token]
  );

  // Fetch users when modal opens
  useEffect(() => {
    if (open) {
        fetchUsers();
    }
    }, [open]);

    // Always filter (empty query = all users except me)
    useEffect(() => {
    const safeUsers = Array.isArray(users) ? users : [];
    const query = searchQuery.toLowerCase();

    setFilteredUsers(
        safeUsers.filter(
        u =>
            u.id !== userId &&
            (
            query === "" ||
            u.full_name?.toLowerCase().includes(query) ||
            u.name?.toLowerCase().includes(query) ||
            u.email?.toLowerCase().includes(query)
            )
        )
    );
    }, [searchQuery, users, userId]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${url}/api/v1/users/`, {
        headers: authHeaders,
      });
      const data = await res.json();
      console.log('Users API response:', data); // Debug log
      
      // Handle different possible response structures
      const list =
      Array.isArray(data) ? data :
      Array.isArray(data?.payload) ? data.payload :
      Array.isArray(data?.users) ? data.users :
      Array.isArray(data?.data) ? data.data : [];

    setUsers(list);
  } catch (e) {
    console.error("Failed to load users", e);
    setUsers([]);
  } finally {
    setLoading(false);
  }
  };

  const createConv = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUser) return;
    
    try {
      const res = await fetch(`${url}/api/v1/messages/conversations`, {
        method: "POST",
        headers: authHeaders,
        body: JSON.stringify({ user_ids: [selectedUser.id] }),
      });
      const data = await res.json();
      if (data?.conversation) {
        onCreated(data.conversation);
        setOpen(false);
        setSearchQuery("");
        setSelectedUser(null);
      }
    } catch (e) {
      console.error("Create conversation failed", e);
    }
  };

  const handleUserSelect = (user: User) => {
    setSelectedUser(user);
    setSearchQuery(user.full_name || user.name || `User ${user.id}`);
  };

  const resetModal = () => {
    setOpen(false);
    setSearchQuery("");
    setSelectedUser(null);
  };

  return (
    <>
      <button className={styles.newBtn} onClick={() => setOpen(true)}>New</button>
      {open && (
        <div className={styles.modalBackdrop} onClick={resetModal}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h4>Start a direct message</h4>
              <button className={styles.closeBtn} onClick={resetModal}>✕</button>
            </div>
            <form className={styles.form} onSubmit={createConv}>
              <label className={styles.label}>
                Select a user                                            
                <select
                    className={styles.select}
                    value={selectedUser?.id || ""}
                    onChange={(e) => {
                    const id = Number(e.target.value);
                    const user = users.find((u) => u.id === id) || null;
                    setSelectedUser(user);
                    }}
                >
                    <option value="">Choose a user</option>
                    {users
                    .filter((u) => u.id !== userId)
                    .map((user) => (
                        <option key={user.id} value={user.id}>
                        {user.full_name || user.name || `User ${user.id}`} 
                        {user.email ? ` (${user.email})` : ""}
                        </option>
                    ))}
                </select>
                </label>

              {/* User dropdown - only show when typing and no user selected */}
              

              <div className={styles.modalActions}>
                <button type="button" className={styles.secondaryBtn} onClick={resetModal}>
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className={styles.primaryBtn}
                  disabled={!selectedUser}
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}