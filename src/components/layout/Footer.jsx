import { Link } from 'react-router-dom'
import { Facebook, Instagram, Mail, MapPin } from 'lucide-react'

const COLUMNS = [
  {
    title: 'Explore',
    links: [
      { label: 'Local Businesses', to: '/businesses' },
      { label: 'Jobs', to: '/jobs' },
      { label: 'Buy & Sell', to: '/buy-sell' },
      { label: 'Post a Listing', to: '/dashboard/new' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About APNAHUB', to: '/about' },
      { label: 'Contact Us', to: '/contact' },
      { label: 'Terms of Service', to: '/terms' },
      { label: 'Privacy Policy', to: '/privacy' },
    ],
  },
  {
    title: 'Coming Soon',
    links: [
      { label: 'Property', to: '#' },
      { label: 'Blood Donors', to: '#' },
      { label: 'Local Services', to: '#' },
      { label: 'Student Hub', to: '#' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="bg-indigo-900 text-white/80 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid grid-cols-2 md:grid-cols-5 gap-10">
        <div className="col-span-2">
          <span className="font-display font-bold text-xl text-white">
            APNA<span className="text-sindoor-light">HUB</span>
          </span>
          <p className="mt-3 text-sm leading-relaxed max-w-xs">
            Starting in Aurangabad, Bihar — built to grow with every town that
            needs one hub for local business, jobs, and buy &amp; sell.
          </p>
          <div className="flex items-center gap-2 mt-4 text-sm">
            <MapPin size={15} className="text-sindoor-light shrink-0" />
            Aurangabad, Bihar, India
          </div>
          <div className="flex items-center gap-4 mt-5">
            <a href="#" aria-label="Facebook" className="p-2 rounded-full bg-white/10 hover:bg-sindoor transition-colors">
              <Facebook size={16} />
            </a>
            <a href="#" aria-label="Instagram" className="p-2 rounded-full bg-white/10 hover:bg-sindoor transition-colors">
              <Instagram size={16} />
            </a>
            <a href="mailto:hello@apnahub.in" aria-label="Email" className="p-2 rounded-full bg-white/10 hover:bg-sindoor transition-colors">
              <Mail size={16} />
            </a>
          </div>
        </div>

        {COLUMNS.map((col) => (
          <div key={col.title}>
            <h4 className="text-white font-semibold text-sm mb-4">{col.title}</h4>
            <ul className="space-y-2.5">
              {col.links.map((link) => (
                <li key={link.label}>
                  <Link to={link.to} className="text-sm hover:text-sindoor-light transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 text-xs text-white/50 flex flex-col sm:flex-row justify-between gap-2">
          <span>© {new Date().getFullYear()} APNAHUB. All rights reserved.</span>
          <span>Made for Bihar, built for India.</span>
        </div>
      </div>
    </footer>
  )
}
