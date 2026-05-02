import { createContext, useCallback, useContext, useEffect, useMemo, useState, ReactNode } from "react";
import { api, ApiError } from "@/lib/api";

interface AuthCtx {
  isAuthenticated: boolean;
  loading: boolean;
  login: (password: string) => Promise<void>;
  logout: () => void;
  verify: () => Promise<boolean>;
}

const AuthContext = createContext<AuthCtx | null>(null);
const STORAGE_KEY = "sa_auth";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setAuth] = useState<boolean>(
    () => typeof window !== "undefined" && localStorage.getItem(STORAGE_KEY) === "1",
  );
  const [loading, setLoading] = useState(false);

  const login = useCallback(async (password: string) => {
    await api.login(password);
    localStorage.setItem(STORAGE_KEY, "1");
    setAuth(true);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setAuth(false);
  }, []);

  const verify = useCallback(async () => {
    setLoading(true);
    try {
      await api.getStats();
      localStorage.setItem(STORAGE_KEY, "1");
      setAuth(true);
      return true;
    } catch (e) {
      if (e instanceof ApiError && e.status === 401) {
        localStorage.removeItem(STORAGE_KEY);
        setAuth(false);
      }
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const value = useMemo(
    () => ({ isAuthenticated, loading, login, logout, verify }),
    [isAuthenticated, loading, login, logout, verify],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}