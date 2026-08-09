import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Facebook, Instagram, Mail, MapPin, Send, Apple, Smartphone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/toast'

const QUICK_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'About Us', to: '/about' },
  { label: 'Contact', to: '/contact' },
  { label: 'Post a Listing', to: '/register' },
]
const CATEGORY_LINKS = [
  { label: 'Local Businesses', to: '/businesses' },
  { label: 'Jobs', to: '/jobs' },
  { label: 'Buy & Sell', to: '/buy-sell' },
  { label: 'All Categories', to: '/categories' },
]
const LEGAL_LINKS = [
  { label: 'Privacy Policy', to: '/privacy' },
  { label: 'Terms of Service', to: '/terms' },
]

export default function Footer() {
  const [email, setEmail] = useState('')
  const { toast } = useToast()

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (!email) return
    toast({ title: 'Subscribed!', description: "You'll hear from us soon.", variant: 'success' })
    setEmail('')
  }

  return (
    <footer className="bg-[hsl(230,30%,8%)] text-white/80 mt-20">
      {/* Newsletter */}
      <div className="border-b border-white/10">
        <div className="section py-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-white font-display font-bold text-xl">Stay in the loop</h3>
            <p className="text-sm text-white/60 mt-1">New listings, jobs, and businesses — straight to your inbox.</p>
          </div>
          <form onSubmit={handleSubscribe} className="flex w-full md:w-auto gap-2">
            <Input
              type="email"
              required
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white/5 border-white/15 text-white placeholder:text-white/40 md:w-72"
            />
            <Button type="submit"><Send size={15} /> Subscribe</Button>
          </form>
        </div>
      </div>

      <div className="section py-14 grid grid-cols-2 md:grid-cols-5 gap-10">
        <div className="col-span-2">
          <span className="font-display font-bold text-xl text-white">
            APNA<span className="text-primary">HUB</span>
          </span>
          <p className="mt-3 text-sm leading-relaxed max-w-xs">
            Starting in Aurangabad, Bihar — built to grow with every town that
            needs one hub for local business, jobs, and buy &amp; sell.
          </p>
          <div className="flex items-center gap-2 mt-4 text-sm">
            <MapPin size={15} className="text-primary shrink-0" />
            Aurangabad, Bihar, India
          </div>
          <div className="flex items-center gap-4 mt-5">
            <a href="#" aria-label="Facebook" className="p-2 rounded-full bg-white/10 hover:bg-primary transition-colors"><Facebook size={16} /></a>
            <a href="#" aria-label="Instagram" className="p-2 rounded-full bg-white/10 hover:bg-primary transition-colors"><Instagram size={16} /></a>
            <a href="mailto:hello@apnahub.in" aria-label="Email" className="p-2 rounded-full bg-white/10 hover:bg-primary transition-colors"><Mail size={16} /></a>
          </div>
        </div>

        <div>
          <h4 className="text-white font-semibold text-sm mb-4">Quick Links</h4>
          <ul className="space-y-2.5">
            {QUICK_LINKS.map((l) => <li key={l.label}><Link to={l.to} className="text-sm hover:text-primary transition-colors">{l.label}</Link></li>)}
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold text-sm mb-4">Categories</h4>
          <ul className="space-y-2.5">
            {CATEGORY_LINKS.map((l) => <li key={l.label}><Link to={l.to} className="text-sm hover:text-primary transition-colors">{l.label}</Link></li>)}
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold text-sm mb-4">Get the App</h4>
          <div className="space-y-2.5">
            <div className="flex items-center gap-2 text-sm text-white/50"><Smartphone size={15} /> Android — Coming Soon</div>
            <div className="flex items-center gap-2 text-sm text-white/50"><Apple size={15} /> iPhone — Coming Soon</div>
          </div>
          <ul className="space-y-2.5 mt-5">
            {LEGAL_LINKS.map((l) => <li key={l.label}><Link to={l.to} className="text-sm hover:text-primary transition-colors">{l.label}</Link></li>)}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="section py-5 text-xs text-white/50 flex flex-col sm:flex-row justify-between gap-2">
          <span>© {new Date().getFullYear()} APNAHUB. All rights reserved.</span>
          <span>Made for Bihar, built for India.</span>
        </div>
      </div>
    </footer>
  )
}
