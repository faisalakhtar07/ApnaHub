import * as Icons from 'lucide-react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { categories } from '@/data/mockData'

export default function CategoriesSection() {
  return (
    <section className="section py-16">
      <div className="mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold">Browse by category</h2>
        <p className="text-muted-foreground mt-1 text-sm">Everything happening in Aurangabad, organized.</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {categories.map((cat, i) => {
          const Icon = Icons[cat.icon] ?? Icons.Grid2x2
          const content = (
            <Card hover={!cat.comingSoon} className="p-5 h-full flex flex-col gap-3 relative overflow-hidden">
              {cat.comingSoon && (
                <Badge variant="outline" className="absolute top-4 right-4 text-[10px]">Soon</Badge>
              )}
              <div className={`p-3 rounded-xl w-fit ${cat.comingSoon ? 'bg-muted text-muted-foreground' : 'bg-primary/10 text-primary'}`}>
                <Icon size={20} />
              </div>
              <div>
                <p className="font-semibold text-sm">{cat.name}</p>
                <p className="text-xs text-muted-foreground mt-1 leading-snug">
                  {cat.comingSoon ? cat.description : `${cat.description} · ${cat.count} listed`}
                </p>
              </div>
            </Card>
          )
          return (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              {cat.comingSoon ? (
                <div className="opacity-70 cursor-default">{content}</div>
              ) : (
                <Link to={`/categories/${cat.id}`}>{content}</Link>
              )}
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
