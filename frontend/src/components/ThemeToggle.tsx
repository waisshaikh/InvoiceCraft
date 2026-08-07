import { Moon, Sun } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
export function ThemeToggle() { const {theme,toggleTheme}=useAppStore(); return <button onClick={toggleTheme} className="btn-soft grid h-10 w-10 place-items-center p-0" aria-label="Toggle color theme">{theme==='light'?<Moon size={18}/>:<Sun size={18}/>}</button>; }
