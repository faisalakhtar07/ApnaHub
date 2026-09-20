import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Linkedin } from "lucide-react";

const QUICK_LINKS = [
  ["Home", "/"], ["Businesses", "/businesses"], ["Jobs", "/jobs"], ["Buy & Sell", "/buy-sell"], ["About", "/about"],
];

export default function Footer() {
  return (
    <footer className="bg-[#0B1120] text-slate-300 pt-16 pb-8 mt-24">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-600 to-indigo-400 flex items-center justify-center">
                <span className="font-display font-bold text-white text-sm">A</span>
              </span>
              <span className="font-display font-bold text-lg text-white">Apna<span className="text-indigo-400">Hub</span></span>
            </div>
            <p className="text-sm text-slate-400 max-w-xs leading-relaxed">
              Everything local, all in one place. Starting in Aurangabad, Bihar — built to grow across every district in India.
            </p>
            <div className="flex gap-3 mt-5">
              {[Facebook, Instagram, Twitter, Linkedin].map((Icon, i) => (
                <button key={i} className="w-9 h-9 rounded-full bg-white/5 hover:bg-indigo-500/20 hover:text-indigo-400 flex items-center justify-center transition-colors">
                  <Icon size={15} />
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display font-semibold text-white text-sm mb-4">Quick Links</h4>
            <ul className="space-y-2.5 text-sm">
              {QUICK_LINKS.map(([l, to]) => (
                <li key={to}><Link to={to} className="text-slate-400 hover:text-indigo-400 transition-colors">{l}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-white text-sm mb-4">Categories</h4>
            <ul className="space-y-2.5 text-sm">
              {["Electronics", "Cars", "Bikes", "Property", "Blood Donor"].map((l) => (
                <li key={l}><Link to="/categories" className="text-slate-400 hover:text-indigo-400 transition-colors">{l}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-white text-sm mb-4">Company</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/contact" className="text-slate-400 hover:text-indigo-400 transition-colors">Contact Us</Link></li>
              <li><button className="text-slate-400 hover:text-indigo-400 transition-colors">Privacy Policy</button></li>
              <li><button className="text-slate-400 hover:text-indigo-400 transition-colors">Terms of Service</button></li>
              <li><a href={import.meta.env.VITE_ADMIN_URL || "http://localhost:5174"} className="text-slate-500 hover:text-indigo-400 transition-colors text-xs">Admin login</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-500">© {new Date().getFullYear()} APNAHUB. All rights reserved. Made for Aurangabad, Bihar.</p>
          <p className="text-xs text-slate-500 font-mono">v1.0 · Aurangabad → Bihar → India</p>
        </div>
      </div>
    </footer>
  );
}
