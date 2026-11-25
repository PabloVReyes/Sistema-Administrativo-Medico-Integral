import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface User {
  id: string;
  username: string;
  name: string;
  role: string;
  area?: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
  reload: () => void;
}

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isLoading: true,
      login: (token: string, user: User) => {
        localStorage.setItem("sami_token", token);
        localStorage.setItem("sami_user", JSON.stringify(user));
        set({ user, token, isLoading: false });
      },
      logout: () => {
        localStorage.removeItem("sami_token");
        localStorage.removeItem("sami_user");
        set({ user: null, token: null, isLoading: false });
      },
      reload: () => {
        set({ isLoading: true });
      },
    }),
    {
      name: "sami-auth",
      storage: createJSONStorage(() => localStorage),
    }
  )
);