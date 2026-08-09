import { create } from 'zustand';
import { persist } from 'zustand/middleware';
type User = { id: string; name: string; email: string };
type State = { theme: 'light'|'dark'; token: string|null; user: User|null; toggleTheme: () => void; setSession: (token: string, user: User) => void; logout: () => void };
export const useAppStore = create<State>()(persist((set) => ({
  theme: 'light', token: null, user: null,
  toggleTheme: () => set((state) => {
    const theme = state.theme === 'light' ? 'dark' : 'light';
    if (typeof document !== 'undefined') {
      document.documentElement.classList.toggle('dark', theme === 'dark');
      document.documentElement.dataset.theme = theme;
    }
    return { theme };
  }),
  setSession: (token, user) => set({ token, user }),
  logout: () => set({ token: null, user: null }),
}), {
  name: 'invoicepilot-session',
  version: 3,
  migrate: (persisted) => ({ ...(persisted as State), theme: 'light' as const }),
  merge: (persisted, current) => ({
    ...current,
    ...(persisted as Partial<State>),
    theme: 'light',
  }),
  onRehydrateStorage: () => (state) => {
    if (state && typeof document !== 'undefined') {
      document.documentElement.classList.remove('dark');
      document.documentElement.dataset.theme = 'light';
    }
  },
}));
