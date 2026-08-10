import { Link } from 'react-router-dom'
import { ImageOff, MapPin, ArrowUpRight, MessageCircle } from 'lucide-react'
import { listings } from '../../data/mockData'

export default function LatestListings() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="flex items-end justify-between mb-8">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-indigo-900 dark:text-white">
            Buy &amp; Sell
          </h2>
          <p className="text-ink/60 dark:text-white/60 mt-1 text-sm">
            Bikes, mobiles, furniture and more — straight from your neighbourhood.
          </p>
        </div>
        <Link to="/buy-sell" className="text-sm font-semibold text-sindoor flex items-center gap-1 hover:gap-1.5 transition-all">
          View all <ArrowUpRight size={15} />
        </Link>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {listings.map((item) => (
          <div key={item.id} className="card overflow-hidden flex flex-col">
            <div className="h-36 bg-indigo-900/5 dark:bg-white/5 flex items-center justify-center text-ink/20 dark:text-white/20">
              <ImageOff size={28} />
            </div>
            <div className="p-4 flex flex-col flex-1">
              <span className="stamp-gold self-start mb-2" style={{ transform: 'rotate(-2deg)' }}>
                {item.category}
              </span>
              <h3 className="font-semibold text-sm text-indigo-900 dark:text-white leading-snug">
                {item.title}
              </h3>
              <div className="flex items-center gap-1 text-xs text-ink/50 dark:text-white/40 mt-2">
                <MapPin size={12} /> {item.location}
              </div>

              <div className="mt-4 pt-4 border-t border-black/5 dark:border-white/10 flex items-center justify-between">
                <span className="font-stamp font-bold text-indigo-900 dark:text-white">{item.price}</span>
                <button
                  aria-label="Contact seller on WhatsApp"
                  className="p-2 rounded-full bg-peacock/10 text-peacock hover:bg-peacock hover:text-white transition-colors"
                >
                  <MessageCircle size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
