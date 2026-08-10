import { Link, Outlet, useLocation } from 'react-router-dom';
import { Logo } from '../components/Logo';
import { ThemeToggle } from '../components/ThemeToggle';
import { AdBanner } from '../components/AdBanner';
import { GeneratorSeoContent } from '../components/GeneratorSeoContent';

export function PublicLayout() {
  const location = useLocation();
  const isGenerator = location.pathname.endsWith('-generator');

  return (
    <div className="min-h-screen bg-[#f7f8fa] dark:bg-[#111318]">
      <header className="no-print sticky top-0 z-40 border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-[#15181d]">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5">
          <Link to="/" aria-label="InvoicePilot home"><Logo /></Link>
          <nav aria-label="Main navigation" className="hidden items-center gap-7 text-sm font-medium text-zinc-600 md:flex dark:text-zinc-300">
            <Link className="hover:text-blue-700" to="/free-invoice-generator">Free Invoice</Link>
            <Link className="hover:text-blue-700" to="/free-quotation-generator">Free Quotation</Link>
            <Link className="hover:text-blue-700" to="/gst-invoice-generator">GST Invoice</Link>
            <Link className="hover:text-blue-700" to="/receipt-generator">Receipt</Link>
          </nav>
          <div className="flex items-center gap-3">
            <span className="hidden rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700 sm:inline">100% free</span>
            <ThemeToggle />
          </div>
        </div>
      </header>
      <AdBanner slot={import.meta.env.VITE_ADSENSE_TOP_SLOT} />
      <Outlet />
      {isGenerator && <GeneratorSeoContent />}
      <footer className="no-print mt-16 border-t border-zinc-200 bg-white dark:border-zinc-800 dark:bg-[#15181d]">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 md:grid-cols-[1fr_auto]">
          <div><Logo /><p className="mt-3 max-w-md text-sm leading-6 text-zinc-500">Free business document tools that work in your browser. No account, no subscription, and no cloud upload required.</p></div>
          <nav aria-label="Footer navigation" className="grid grid-cols-2 gap-x-8 gap-y-3 text-sm text-zinc-600 dark:text-zinc-400">
            <Link to="/about">About</Link><Link to="/contact">Contact</Link>
            <Link to="/privacy-policy">Privacy policy</Link><Link to="/terms">Terms of use</Link>
          </nav>
        </div>
        <div className="border-t border-zinc-200 py-4 text-center text-xs text-zinc-400 dark:border-zinc-800">© {new Date().getFullYear()} InvoicePilot. Free tools for small businesses.</div>
      </footer>
    </div>
  );
}
