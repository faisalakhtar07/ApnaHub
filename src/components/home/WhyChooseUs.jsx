import * as Icons from 'lucide-react'
import { motion } from 'framer-motion'
import { whyChooseUs } from '@/data/mockData'

export default function WhyChooseUs() {
  return (
    <section className="section py-16">
      <div className="text-center mb-10">
        <h2 className="text-2xl sm:text-3xl font-bold">Why choose APNAHUB</h2>
        <p className="text-muted-foreground mt-1 text-sm">Built for trust, speed, and your neighbourhood.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-5">
        {whyChooseUs.map((item, i) => {
          const Icon = Icons[item.icon] ?? Icons.Sparkles
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="text-center flex flex-col items-center gap-3 p-5 rounded-2xl hover:bg-muted/50 transition-colors"
            >
              <div className="h-12 w-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                <Icon size={22} />
              </div>
              <div>
                <p className="font-semibold text-sm">{item.title}</p>
                <p className="text-xs text-muted-foreground mt-1 leading-snug">{item.description}</p>
              </div>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
