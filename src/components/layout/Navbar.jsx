import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, Sun, Moon, Menu, X, ChevronDown, User, Heart, ListChecks, LogOut } from 'lucide-react'
import { useTheme } from '@/context/ThemeContext'
import { CITY } from '@/data/mockData'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from '@/components/ui/dropdown-menu'

const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Businesses', to: '/businesses' },
  { label: 'Jobs', to: '/jobs' },
  { label: 'Buy & Sell', to: '/buy-sell' },
  { label: 'Categories', to: '/categories' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
]

// Flip to true to preview the logged-in profile dropdown state (UI only, no auth wired up yet).
const IS_LOGGED_IN = false

export default function Navbar() {
  const { theme, toggleTheme } = useTheme()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 glass">
      <nav className="section h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <span className="font-display font-bold text-xl tracking-tight">
            APNA<span className="text-primary">HUB</span>
          </span>
        </Link>

        <button className="hidden lg:flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-primary transition-colors mx-4">
          <MapPin size={16} className="text-primary shrink-0" />
          <span className="truncate max-w-[140px]">{CITY}</span>
          <ChevronDown size={14} />
        </button>

        <div className="hidden lg:flex items-center gap-6 flex-1 justify-center">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors ${isActive ? 'text-primary' : 'text-foreground/80 hover:text-primary'}`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-2">
          <button
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
            className="p-2 rounded-full hover:bg-foreground/5 transition-colors"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {IS_LOGGED_IN ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="h-9 w-9 rounded-full bg-primary/10 text-primary font-semibold text-sm flex items-center justify-center">
                  RK
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild><Link to="/profile"><User size={15} /> Profile</Link></DropdownMenuItem>
                <DropdownMenuItem asChild><Link to="/profile"><ListChecks size={15} /> My Listings</Link></DropdownMenuItem>
                <DropdownMenuItem asChild><Link to="/profile"><Heart size={15} /> Favorites</Link></DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive"><LogOut size={15} /> Log out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/login">Login</Link>
              </Button>
              <Button size="sm" asChild>
                <Link to="/register">Register</Link>
              </Button>
            </>
          )}
        </div>

        <button className="lg:hidden p-2" onClick={() => setMobileOpen((v) => !v)} aria-label="Toggle menu" aria-expanded={mobileOpen}>
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden overflow-hidden border-t border-border bg-background"
          >
            <div className="px-4 py-4 space-y-4">
              <div className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground">
                <MapPin size={16} className="text-primary" /> {CITY}
              </div>
              {NAV_LINKS.map((link) => (
                <Link key={link.to} to={link.to} onClick={() => setMobileOpen(false)} className="block text-sm font-medium py-1">
                  {link.label}
                </Link>
              ))}
              <div className="flex items-center gap-3 pt-2">
                <button onClick={toggleTheme} className="p-2 rounded-full border border-border">
                  {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                </button>
                <Button variant="outline" className="flex-1" asChild>
                  <Link to="/login">Login</Link>
                </Button>
                <Button className="flex-1" asChild>
                  <Link to="/register">Register</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
