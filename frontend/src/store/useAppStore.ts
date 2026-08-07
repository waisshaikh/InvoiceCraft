import { create } from 'zustand';
import { persist } from 'zustand/middleware';
type User = { id: string; name: string; email: string };
type State = { theme: 'light'|'dark'; token: string|null; user: User|null; toggleTheme: () => void; setSession: (token: string, user: User) => void; logout: () => void };
export const useAppStore = create<State>()(persist((set) => ({ theme: 'light', token: null, user: null, toggleTheme: () => set((s) => ({ theme: s.theme === 'light' ? 'dark' : 'light' })), setSession: (token, user) => set({ token, user }), logout: () => set({ token: null, user: null }) }), { name: 'invoicepilot-session' }));
