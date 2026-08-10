import { Link } from 'react-router-dom'
import { Store, MapPin, Star, ArrowUpRight } from 'lucide-react'
import { businesses } from '../../data/mockData'
import StampBadge from '../common/StampBadge'

export default function FeaturedBusinesses() {
  return (
    <section className="bg-indigo-900/[0.03] dark:bg-white/[0.02] py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-indigo-900 dark:text-white">
              Featured businesses
            </h2>
            <p className="text-ink/60 dark:text-white/60 mt-1 text-sm">
              Trusted shops and services near you.
            </p>
          </div>
          <Link to="/businesses" className="text-sm font-semibold text-sindoor flex items-center gap-1 hover:gap-1.5 transition-all">
            View all <ArrowUpRight size={15} />
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {businesses.map((biz) => (
            <div key={biz.id} className="card p-5 flex flex-col">
              <div className="flex items-start justify-between mb-3">
                <div className="p-2.5 rounded-xl bg-sindoor/10 text-sindoor shrink-0">
                  <Store size={18} />
                </div>
                {biz.verified && <StampBadge variant="verified" tilt={-3} />}
              </div>
              <h3 className="font-semibold text-indigo-900 dark:text-white leading-snug">{biz.name}</h3>
              <p className="text-sm text-ink/60 dark:text-white/60 mt-0.5">{biz.category}</p>

              <div className="flex items-center justify-between mt-4 pt-4 border-t border-black/5 dark:border-white/10">
                <div className="flex items-center gap-1 text-xs text-ink/50 dark:text-white/40">
                  <MapPin size={12} /> {biz.location}
                </div>
                <div className="flex items-center gap-1 text-xs font-semibold text-gold">
                  <Star size={13} fill="currentColor" /> {biz.rating}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
