import { Quote } from 'lucide-react'
import { testimonials } from '../../data/mockData'

export default function Testimonials() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-10">
        <h2 className="text-2xl sm:text-3xl font-bold text-indigo-900 dark:text-white">
          From the neighbourhood
        </h2>
        <p className="text-ink/60 dark:text-white/60 mt-1 text-sm">
          Real people, real results, right here in Aurangabad.
        </p>
      </div>

      <div className="grid sm:grid-cols-3 gap-6">
        {testimonials.map((t) => (
          <div key={t.id} className="card p-6 relative">
            <Quote className="text-sindoor/20 absolute top-5 right-5" size={32} />
            <p className="text-sm text-ink/80 dark:text-white/80 leading-relaxed relative z-10">
              "{t.quote}"
            </p>
            <div className="mt-5 pt-5 border-t border-black/5 dark:border-white/10">
              <p className="font-semibold text-sm text-indigo-900 dark:text-white">{t.name}</p>
              <p className="text-xs text-ink/50 dark:text-white/40">{t.role}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
