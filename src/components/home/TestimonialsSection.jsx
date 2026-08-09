import { Quote, Star } from 'lucide-react'
import { Carousel } from '@/components/ui/carousel'
import { testimonials } from '@/data/mockData'

function TestimonialSlide({ t }) {
  return (
    <div className="bg-card border border-border rounded-2xl p-8 sm:p-10 text-center max-w-2xl mx-auto">
      <Quote className="text-primary/20 mx-auto" size={36} />
      <p className="text-base sm:text-lg leading-relaxed mt-4">"{t.quote}"</p>
      <div className="flex items-center justify-center gap-1 mt-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} size={14} className={i < t.rating ? 'text-amber-500' : 'text-muted'} fill="currentColor" />
        ))}
      </div>
      <div className="mt-4">
        <div className="h-11 w-11 rounded-full bg-primary/10 text-primary font-semibold flex items-center justify-center mx-auto mb-2">
          {t.name.charAt(0)}
        </div>
        <p className="font-semibold text-sm">{t.name}</p>
        <p className="text-xs text-muted-foreground">{t.role}</p>
      </div>
    </div>
  )
}

export default function TestimonialsSection() {
  return (
    <section className="bg-muted/40 py-16">
      <div className="section">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold">From the neighbourhood</h2>
          <p className="text-muted-foreground mt-1 text-sm">Real people, real results, right here in Aurangabad.</p>
        </div>
        <Carousel className="max-w-2xl mx-auto">
          {testimonials.map((t) => <TestimonialSlide key={t.id} t={t} />)}
        </Carousel>
      </div>
    </section>
  )
}
