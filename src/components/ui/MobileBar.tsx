import { Home, Info, LayoutGrid, Mail, Moon, Sun } from 'lucide-react';
import { useTheme } from '../../lib/theme/ThemeProvider';
import { scrollShowroomToTop } from '../../lib/scroll';

// Mobile bottom navigation bar.
export function MobileBar() {
  const { isDark, toggle } = useTheme();

  return (
    <div className="lg:hidden absolute bottom-6 left-6 right-6 z-50 glass-panel rounded-[32px] h-[72px] flex items-center px-4 pointer-events-auto shadow-2xl">
      <div className="flex items-center justify-between flex-1">
        <button
          type="button"
          aria-label="Home"
          onClick={scrollShowroomToTop}
          className="w-11 h-11 rounded-full flex items-center justify-center bg-white shadow-sm dark:bg-white/20 text-gray-900 dark:text-white transition-all"
        >
          <Home className="w-[20px] h-[20px]" />
        </button>
        <button type="button" aria-label="Info" className="w-11 h-11 rounded-full flex items-center justify-center text-gray-900/70 hover:text-gray-900 hover:bg-black/5 dark:text-white/70 dark:hover:text-white dark:hover:bg-white/10 transition-all">
          <Info className="w-[20px] h-[20px]" />
        </button>
        <button type="button" aria-label="Collections" className="w-11 h-11 rounded-full flex items-center justify-center text-gray-900/70 hover:text-gray-900 hover:bg-black/5 dark:text-white/70 dark:hover:text-white dark:hover:bg-white/10 transition-all">
          <LayoutGrid className="w-[20px] h-[20px]" />
        </button>
        <button type="button" aria-label="Messages" className="w-11 h-11 rounded-full flex items-center justify-center text-gray-900/70 hover:text-gray-900 hover:bg-black/5 dark:text-white/70 dark:hover:text-white dark:hover:bg-white/10 transition-all">
          <Mail className="w-[20px] h-[20px]" />
        </button>
        <button
          type="button"
          aria-label="Toggle Theme"
          onClick={toggle}
          className="w-11 h-11 rounded-full flex items-center justify-center text-gray-900/70 hover:text-gray-900 hover:bg-black/5 dark:text-white/70 dark:hover:text-white dark:hover:bg-white/10 transition-all"
        >
          {isDark ? <Moon className="w-[20px] h-[20px]" /> : <Sun className="w-[20px] h-[20px]" />}
        </button>
      </div>
    </div>
  );
}
