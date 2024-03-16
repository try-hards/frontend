import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface User {
  username: string;
  isLoggedIn: boolean;
}

interface UserState extends User {
  login: (username: string) => void;
  logout: () => void;
}

export const useUserStore = create<UserState>()(
  devtools((set) => ({
    username: '',
    isLoggedIn: false,
    login: (username) => set({ username, isLoggedIn: true }),
    logout: () => set({ username: '', isLoggedIn: false }),
  })),
);
