"use client";

import { getSession } from "@/actions/get-session";
import { useEffect, useState } from "react";
import type { User } from "@/utils/types/backend";

export default function useSession() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any | null>(null);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const session = await getSession();
        if (session) {
          setUser(session);
        } else {
          setUser(null);
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSession();
  }, []);

  return { user, loading, error };
}
