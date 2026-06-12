import { Home, Info, LayoutGrid, Mail, Moon, Sun } from 'lucide-react';
import { useTheme } from '../../lib/theme/ThemeProvider';

// Desktop spatial navigation rail. Feels attached to space, not the browser edge.
export function Sidebar() {
  const { isDark, toggle } = useTheme();

  return (
    <div className="hidden lg:flex w-[88px] h-[640px] glass-panel rounded-[44px] flex-col items-center py-6 justify-between relative shadow-2xl shrink-0 pointer-events-auto">
      <div className="flex flex-col items-center">
        <button
          type="button"
          aria-label="Reload — back to start"
          onClick={() => window.location.reload()}
          className="w-[52px] h-[52px] rounded-full flex items-center justify-center hover:scale-105 active:scale-95 transition-transform bg-transparent"
        >
          <img
            src="https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=180,h=180,fit=crop,f=png/AR011XeLz8S08XZD/favi-mp84bX6L2wtL0M02.png"
            alt="Logo"
            className="w-full h-full object-contain rounded-full"
          />
        </button>
      </div>

      <div className="flex flex-col gap-4 items-center">
        <button type="button" aria-label="Home" className="glass-button w-14 h-14 rounded-full flex items-center justify-center bg-white shadow-md dark:bg-transparent dark:shadow-lg transition-all hover:scale-105 active:scale-95">
          <Home className="w-6 h-6 text-gray-900 dark:text-white" />
        </button>
        <button type="button" aria-label="Info" className="w-14 h-14 rounded-full flex items-center justify-center text-gray-900/70 hover:text-gray-900 hover:bg-black/5 dark:text-white/70 dark:hover:text-white dark:hover:bg-white/10 transition-all">
          <Info className="w-6 h-6" />
        </button>
        <button type="button" aria-label="Collections" className="w-14 h-14 rounded-full flex items-center justify-center text-gray-900/70 hover:text-gray-900 hover:bg-black/5 dark:text-white/70 dark:hover:text-white dark:hover:bg-white/10 transition-all">
          <LayoutGrid className="w-6 h-6" />
        </button>
        <button type="button" aria-label="Messages" className="w-14 h-14 rounded-full flex items-center justify-center text-gray-900/70 hover:text-gray-900 hover:bg-black/5 dark:text-white/70 dark:hover:text-white dark:hover:bg-white/10 transition-all">
          <Mail className="w-6 h-6" />
        </button>
      </div>

      <div className="flex flex-col items-center">
        <button
          type="button"
          aria-label="Toggle Theme"
          onClick={toggle}
          className="w-14 h-14 rounded-full flex items-center justify-center text-gray-900/70 hover:text-gray-900 hover:bg-black/5 dark:text-white/70 dark:hover:text-white dark:hover:bg-white/10 transition-all"
        >
          {isDark ? <Moon className="w-6 h-6" /> : <Sun className="w-6 h-6" />}
        </button>
      </div>
    </div>
  );
}
