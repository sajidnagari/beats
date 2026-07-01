"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type User = {
  name: string;
  email: string;
};

type AuthContextValue = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
};

const STORAGE_KEY = "pulsetok_auth";

const AuthContext = createContext<AuthContextValue | null>(null);

const demoUser: User = {
  name: "Sajid Ali",
  email: "demo@pulsetok.io",
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) setUser(JSON.parse(stored) as User);
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    const isValid =
      (email === "demo@pulsetok.io" && password === "demo123") ||
      (email.trim().length > 3 && password.trim().length >= 4);

    if (!isValid) return false;

    const nextUser = email === "demo@pulsetok.io" ? demoUser : { name: email.split("@")[0], email };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nextUser));
    setUser(nextUser);
    return true;
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEY);
    setUser(null);
  };

  return <AuthContext.Provider value={{ user, loading, login, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}

export function useRequireAuth() {
  const auth = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!auth.loading && !auth.user) router.replace("/login");
  }, [auth.loading, auth.user, router]);

  return auth;
}
