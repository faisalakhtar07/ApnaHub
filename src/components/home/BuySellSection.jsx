import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { MapPin, ArrowUpRight, Heart, ImageOff } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { listings } from '@/data/mockData'

export default function BuySellSection() {
  const [favorites, setFavorites] = useState(new Set())
  const toggleFav = (id) => setFavorites((prev) => {
    const next = new Set(prev)
    next.has(id) ? next.delete(id) : next.add(id)
    return next
  })

  return (
    <section className="bg-muted/40 py-16">
      <div className="section">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold">Buy &amp; Sell</h2>
            <p className="text-muted-foreground mt-1 text-sm">Bikes, mobiles, furniture and more — nearby.</p>
          </div>
          <Link to="/buy-sell" className="text-sm font-semibold text-primary flex items-center gap-1 hover:gap-1.5 transition-all">
            View all <ArrowUpRight size={15} />
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {listings.slice(0, 4).map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
            >
              <Card className="overflow-hidden flex flex-col h-full">
                <div className="h-36 bg-muted flex items-center justify-center text-muted-foreground/40 relative">
                  <ImageOff size={26} />
                  <button
                    onClick={() => toggleFav(item.id)}
                    aria-label="Add to favorites"
                    className="absolute top-3 right-3 p-1.5 rounded-full glass"
                  >
                    <Heart size={15} className={favorites.has(item.id) ? 'text-primary' : ''} fill={favorites.has(item.id) ? 'currentColor' : 'none'} />
                  </button>
                </div>
                <Link to={`/buy-sell/${item.id}`} className="p-4 flex flex-col flex-1">
                  <Badge variant="seal" className="self-start mb-2">{item.condition}</Badge>
                  <h3 className="font-semibold text-sm leading-snug">{item.title}</h3>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground mt-2">
                    <MapPin size={12} /> {item.location}
                  </div>
                  <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
                    <span className="font-stamp font-bold">{item.price}</span>
                    <span className="text-xs text-muted-foreground">{item.seller}</span>
                  </div>
                </Link>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
