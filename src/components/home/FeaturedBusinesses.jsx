import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Store, MapPin, Star, Phone, MessageCircle, ArrowUpRight, ImageOff } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { businesses } from '@/data/mockData'

export default function FeaturedBusinesses() {
  return (
    <section className="bg-muted/40 py-16">
      <div className="section">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold">Featured businesses</h2>
            <p className="text-muted-foreground mt-1 text-sm">Trusted shops and services near you.</p>
          </div>
          <Link to="/businesses" className="text-sm font-semibold text-primary flex items-center gap-1 hover:gap-1.5 transition-all">
            View all <ArrowUpRight size={15} />
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {businesses.slice(0, 4).map((biz, i) => (
            <motion.div
              key={biz.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
            >
              <Card className="overflow-hidden flex flex-col h-full">
                <div className="h-32 bg-muted flex items-center justify-center text-muted-foreground/40 relative">
                  <ImageOff size={26} />
                  <Badge variant={biz.open ? 'success' : 'destructive'} className="absolute top-3 left-3">
                    {biz.open ? 'Open' : 'Closed'}
                  </Badge>
                </div>
                <div className="p-4 flex flex-col flex-1">
                  <div className="flex items-start justify-between mb-1">
                    <h3 className="font-semibold text-sm leading-snug pr-2">{biz.name}</h3>
                    {biz.verified && <Badge variant="seal" className="shrink-0">Verified</Badge>}
                  </div>
                  <p className="text-xs text-muted-foreground">{biz.category}</p>
                  <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><MapPin size={12} /> {biz.location}</span>
                    <span className="flex items-center gap-1 font-semibold text-amber-500"><Star size={12} fill="currentColor" /> {biz.rating}</span>
                  </div>
                  <div className="mt-4 pt-4 border-t border-border flex items-center gap-2">
                    <Button size="icon" variant="outline" className="h-8 w-8" aria-label="Call business"><Phone size={14} /></Button>
                    <Button size="icon" variant="outline" className="h-8 w-8 text-secondary border-secondary/30" aria-label="Message on WhatsApp"><MessageCircle size={14} /></Button>
                    <Button size="sm" variant="ghost" className="flex-1 justify-center text-xs" asChild>
                      <Link to={`/businesses/${biz.id}`}>View Details</Link>
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
