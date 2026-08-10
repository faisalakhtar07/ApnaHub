import { useState } from 'react'
import { Link } from 'react-router-dom'
import { MapPin, Sun, Moon, Menu, X, ChevronDown } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'
import { CITY } from '../../data/mockData'

const NAV_LINKS = [
  { label: 'Businesses', to: '/businesses' },
  { label: 'Jobs', to: '/jobs' },
  { label: 'Buy & Sell', to: '/buy-sell' },
]

export default function Navbar() {
  const { theme, toggleTheme } = useTheme()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 glass">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <span className="font-display font-bold text-xl tracking-tight text-indigo-900 dark:text-white">
            APNA<span className="text-sindoor">HUB</span>
          </span>
        </Link>

        {/* Location selector — desktop */}
        <button className="hidden md:flex items-center gap-1.5 text-sm font-medium text-ink/70 dark:text-white/70 hover:text-sindoor transition-colors mx-4">
          <MapPin size={16} className="text-sindoor shrink-0" />
          <span className="truncate max-w-[160px]">{CITY}</span>
          <ChevronDown size={14} />
        </button>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-8 flex-1 justify-center">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="text-sm font-medium text-ink/80 dark:text-white/80 hover:text-sindoor dark:hover:text-sindoor transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right actions */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
            className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <Link to="/login" className="text-sm font-semibold px-4 py-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
            Log in
          </Link>
          <Link to="/signup" className="btn-primary text-sm px-5 py-2.5">
            Sign up
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-black/5 dark:border-white/10 px-4 py-4 space-y-4 bg-paper dark:bg-paperdark">
          <div className="flex items-center gap-1.5 text-sm font-medium text-ink/70 dark:text-white/70">
            <MapPin size={16} className="text-sindoor" />
            {CITY}
          </div>
          {NAV_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMobileOpen(false)}
              className="block text-sm font-medium py-1"
            >
              {link.label}
            </Link>
          ))}
          <div className="flex items-center gap-3 pt-2">
            <button onClick={toggleTheme} className="p-2 rounded-full border border-black/10 dark:border-white/10">
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <Link to="/login" className="flex-1 text-center text-sm font-semibold py-2.5 rounded-full border border-black/10 dark:border-white/10">
              Log in
            </Link>
            <Link to="/signup" className="flex-1 btn-primary text-sm py-2.5">
              Sign up
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
