import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { Menu, X, Sun, Moon, LayoutDashboard, LogOut, ShoppingCart } from "lucide-react";
import Btn from "../ui/Btn";
import NotificationBell from "../NotificationBell";
import { goToPostAd as sharedGoToPostAd } from "../../lib/postAdFlow";
import { userAuthApi } from "../../lib/api";
import { cart } from "../../lib/cart";

const LINKS = [
  { label: "Home", to: "/" },
  { label: "Businesses", to: "/businesses" },
  { label: "Jobs", to: "/jobs" },
  { label: "Buy & Sell", to: "/buy-sell" },
  { label: "Categories", to: "/categories" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

export default function Navbar({ dark, toggleTheme }) {
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [loggedIn, setLoggedIn] = useState(userAuthApi.isLoggedIn());
  const [cartCount, setCartCount] = useState(cart.count());
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => cart.subscribe((items) => setCartCount(items.length)), []);

  // Navbar persists across client-side route changes, so it won't automatically
  // notice a login/logout that happened on another page — re-check whenever the
  // route changes (login/register/logout all navigate somewhere right after).
  useEffect(() => {
    setLoggedIn(userAuthApi.isLoggedIn());
  }, [location.pathname]);

  const user = userAuthApi.currentUser();

  // Post an Ad now opens the subscription-based advertising system (not the older
  // guest Buy & Sell posting flow at /post-ad, which stays reachable from Buy & Sell itself).
  const goToPostAd = () => sharedGoToPostAd(navigate);

  const handleLogout = () => {
    userAuthApi.logout();
    setLoggedIn(false);
    setProfileOpen(false);
    setOpen(false);
    navigate("/");
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const linkClass = ({ isActive }) =>
    `px-3.5 py-2 rounded-full text-sm font-medium transition-colors ${
      isActive
        ? "text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10"
        : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5"
    }`;

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 dark:bg-[#0B1120]/80 backdrop-blur-xl border-b border-slate-200/70 dark:border-white/[0.06] shadow-sm"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
        <button onClick={() => navigate("/")} className="flex items-center gap-2 shrink-0">
          <span className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-600 to-indigo-400 flex items-center justify-center shadow-md shadow-indigo-500/30">
            <span className="font-display font-bold text-white text-sm">A</span>
          </span>
          <span className="font-display font-bold text-lg tracking-tight text-slate-900 dark:text-white">
            Apna<span className="text-indigo-600 dark:text-indigo-400">Hub</span>
          </span>
        </button>

        <nav className="hidden lg:flex items-center gap-1">
          {LINKS.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.to === "/"} className={linkClass}>
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="w-9 h-9 rounded-full flex items-center justify-center text-slate-500 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
          >
            {dark ? <Sun size={17} /> : <Moon size={17} />}
          </button>

          {loggedIn && <NotificationBell />}

          <button
            onClick={() => navigate("/cart")}
            aria-label="Cart"
            className="relative w-9 h-9 rounded-full flex items-center justify-center text-slate-500 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
          >
            <ShoppingCart size={17} />
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 min-w-[16px] h-4 px-1 rounded-full bg-indigo-600 text-white text-[10px] font-bold flex items-center justify-center">
                {cartCount > 9 ? "9+" : cartCount}
              </span>
            )}
          </button>

          <div className="hidden md:flex items-center gap-2 ml-1">
            <Btn variant="marigold" size="sm" onClick={goToPostAd}>Post an Ad</Btn>
            {!loggedIn && (
              <>
                <Btn variant="ghost" size="sm" onClick={() => navigate("/login")}>Log in</Btn>
                <Btn variant="primary" size="sm" onClick={() => navigate("/register")}>Register</Btn>
              </>
            )}
          </div>

          {loggedIn && (
            <div className="relative hidden md:block">
              <button
                onClick={() => setProfileOpen((p) => !p)}
                className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-indigo-400 flex items-center justify-center ml-1 hover:ring-2 ring-indigo-400/40 transition-all font-display font-bold text-white text-sm"
              >
                {(user?.name || "U").charAt(0).toUpperCase()}
              </button>
              {profileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-[#131B2E] border border-slate-100 dark:border-white/10 rounded-2xl shadow-xl py-2 animate-fadeUp">
                  <div className="px-4 py-2 border-b border-slate-100 dark:border-white/10 mb-1">
                    <p className="text-sm font-medium text-slate-800 dark:text-white truncate">{user?.name || "Account"}</p>
                    <p className="text-xs text-slate-400 truncate">{user?.phone}</p>
                  </div>
                  <button
                    onClick={() => { setProfileOpen(false); navigate("/my-account"); }}
                    className="w-full flex items-center gap-2 text-left px-4 py-2 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5"
                  >
                    <LayoutDashboard size={14} /> Dashboard
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 text-left px-4 py-2 text-sm text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10"
                  >
                    <LogOut size={14} /> Log out
                  </button>
                </div>
              )}
            </div>
          )}

          <button onClick={() => setOpen((o) => !o)} className="lg:hidden w-9 h-9 flex items-center justify-center text-slate-700 dark:text-white">
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden bg-white dark:bg-[#0B1120] border-t border-slate-100 dark:border-white/10 px-5 py-4 animate-fadeUp">
          <div className="flex flex-col gap-1">
            {LINKS.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === "/"}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `text-left px-3 py-2.5 rounded-xl text-sm font-medium ${isActive ? "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400" : "text-slate-600 dark:text-slate-300"}`
                }
              >
                {l.label}
              </NavLink>
            ))}
            <Btn variant="marigold" className="mt-1" onClick={() => { goToPostAd(); setOpen(false); }}>Post an Ad</Btn>
            {loggedIn ? (
              <>
                <Btn variant="outline" className="mt-2" icon={LayoutDashboard} onClick={() => { navigate("/my-account"); setOpen(false); }}>Dashboard</Btn>
                <Btn variant="ghost" className="mt-2 !text-rose-500" icon={LogOut} onClick={handleLogout}>Log out</Btn>
              </>
            ) : (
              <div className="flex gap-2 mt-3">
                <Btn variant="outline" className="flex-1" onClick={() => { navigate("/login"); setOpen(false); }}>Log in</Btn>
                <Btn variant="primary" className="flex-1" onClick={() => { navigate("/register"); setOpen(false); }}>Register</Btn>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
