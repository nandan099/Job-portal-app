import { create } from "zustand";
import type { User, AuthState } from "../types";

interface AuthStore extends AuthState {
  login: (user: User) => void;
  logout: () => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isLoading: false,
  error: null,
  isAuthenticated: false,

  login: (user: User) => {
    set({
      user,
      isAuthenticated: true,
      error: null,
    });
    localStorage.setItem("user", JSON.stringify(user));
  },

  logout: () => {
    set({
      user: null,
      isAuthenticated: false,
      error: null,
    });
    localStorage.removeItem("user");
  },

  setLoading: (isLoading: boolean) => {
    set({ isLoading });
  },

  setError: (error: string | null) => {
    set({ error });
  },
}));
