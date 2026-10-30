import { createContext } from "react";

export type AuthContextValue = {
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
};

export const AuthContext = createContext<AuthContextValue | null>(null);