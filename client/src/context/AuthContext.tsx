import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import * as authApi from "@/api/auth";
import {
  clearStoredToken,
  clearStoredUser,
  getStoredToken,
  getStoredUser,
  setStoredToken,
  setStoredUser,
} from "@/api/client";
import type { User } from "@/api/types";

type AuthContextValue = {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => (getStoredToken() ? getStoredUser() : null));

  function applySession(token: string, user: User) {
    setStoredToken(token);
    setStoredUser(user);
    setUser(user);
  }

  function logout() {
    clearStoredToken();
    clearStoredUser();
    setUser(null);
  }

  // El interceptor de axios dispara este evento cuando el token expira o es
  // rechazado por el backend, sin importar desde qué llamada vino.
  useEffect(() => {
    window.addEventListener("auth:unauthorized", logout);
    return () => window.removeEventListener("auth:unauthorized", logout);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isAuthenticated: user !== null,
      login: (email, password) =>
        authApi.login(email, password).then(({ token, user }) => applySession(token, user)),
      register: (name, email, password) =>
        authApi.register(name, email, password).then(({ token, user }) => applySession(token, user)),
      logout,
    }),
    [user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth debe usarse dentro de AuthProvider.");
  return context;
}
