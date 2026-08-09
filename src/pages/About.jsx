import { motion } from 'framer-motion'
import { MapPin, Target, Users2 } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Breadcrumb } from '@/components/ui/breadcrumb'
import { stats } from '@/data/mockData'

export default function About() {
  return (
    <div className="section py-8">
      <Breadcrumb items={[{ label: 'About' }]} />

      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="max-w-2xl mt-6">
        <h1 className="text-3xl sm:text-4xl font-bold">Built for Aurangabad, by people who live here.</h1>
        <p className="text-muted-foreground mt-4 leading-relaxed">
          APNAHUB started with a simple idea: every town deserves one place to find its shops, its jobs, and
          its second-hand market — without scrolling through listings from cities hundreds of kilometres away.
          We're starting in Aurangabad, Bihar, and building toward every district in the state, then the country.
        </p>
      </motion.div>

      <div className="grid sm:grid-cols-3 gap-5 mt-12">
        <Card className="p-6">
          <Target className="text-primary mb-3" size={22} />
          <h3 className="font-semibold mb-1">Our Mission</h3>
          <p className="text-sm text-muted-foreground">Make local commerce and opportunity as easy to find as a search bar.</p>
        </Card>
        <Card className="p-6">
          <MapPin className="text-primary mb-3" size={22} />
          <h3 className="font-semibold mb-1">Hyperlocal First</h3>
          <p className="text-sm text-muted-foreground">Every listing is tied to a real neighbourhood, not a distant city.</p>
        </Card>
        <Card className="p-6">
          <Users2 className="text-primary mb-3" size={22} />
          <h3 className="font-semibold mb-1">Community Verified</h3>
          <p className="text-sm text-muted-foreground">Businesses are reviewed before they go live, so trust comes built-in.</p>
        </Card>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-14 pt-14 border-t border-border">
        {stats.map((s) => (
          <div key={s.id} className="text-center">
            <p className="font-display font-bold text-3xl">{s.value.toLocaleString()}+</p>
            <p className="text-sm text-muted-foreground mt-1">{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
