import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Briefcase, Store, Tag, ShieldCheck, Sparkles, TrendingUp } from 'lucide-react'
import { SearchBar } from '@/components/shared/SearchBar'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { CITY } from '@/data/mockData'

const CTA_BUTTONS = [
  { label: 'Find Jobs', to: '/jobs', icon: Briefcase },
  { label: 'Browse Businesses', to: '/businesses', icon: Store },
  { label: 'Buy & Sell', to: '/buy-sell', icon: Tag },
]

const FLOATING_CARDS = [
  { icon: Sparkles, title: 'New job posted', detail: 'Store Manager · 2m ago', top: '4%', left: '58%', delay: 0.2 },
  { icon: TrendingUp, title: 'Listed for sale', detail: 'Honda Activa · ₹58,000', top: '38%', left: '78%', delay: 0.4 },
  { icon: ShieldCheck, title: 'Business verified', detail: 'Annapurna Bhandar', top: '68%', left: '54%', delay: 0.6 },
]

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-16 pb-24 sm:pt-24 sm:pb-32">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary/[0.06] via-secondary/[0.03] to-transparent" />
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-primary/10 blur-3xl -z-10" />
      <div className="absolute top-40 -left-24 w-72 h-72 rounded-full bg-secondary/10 blur-3xl -z-10" />

      <div className="section relative grid lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <Badge variant="seal">Live in {CITY}</Badge>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight mt-5">
            Everything Local,
            <br />
            All in <span className="text-primary">One Place.</span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-lg">
            Find trusted local businesses, the latest jobs, and buy &amp; sell
            listings in Aurangabad — verified by your neighbours.
          </p>

          <div className="mt-8">
            <SearchBar variant="hero" />
          </div>

          <div className="flex flex-wrap gap-3 mt-6">
            {CTA_BUTTONS.map((btn) => (
              <Button key={btn.label} variant="outline" size="sm" asChild>
                <Link to={btn.to}>
                  <btn.icon size={15} /> {btn.label}
                </Link>
              </Button>
            ))}
          </div>
        </motion.div>

        {/* Floating illustration cards */}
        <div className="relative hidden lg:block h-[420px]">
          {FLOATING_CARDS.map((card) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: card.delay, ease: [0.16, 1, 0.3, 1] }}
              className="absolute w-64"
              style={{ top: card.top, left: card.left }}
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: card.delay }}
                className="glass rounded-2xl p-4 shadow-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <card.icon size={16} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold truncate">{card.title}</p>
                    <p className="text-xs text-muted-foreground truncate">{card.detail}</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
          {/* Center anchor illustration */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-56 w-56 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 blur-2xl" />
          </div>
        </div>
      </div>
    </section>
  )
}
