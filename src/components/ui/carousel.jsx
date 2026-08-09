import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

/**
 * Minimal, dependency-free carousel with slide animation and dot
 * indicators. `children` is an array of slide nodes; one shown at a time
 * on mobile, `perView` at once on larger screens (visual only — the
 * animated transition always steps one full "page" of `perView`).
 */
export function Carousel({ children, className }) {
  const slides = Array.isArray(children) ? children : [children]
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(1)

  const go = (dir) => {
    setDirection(dir)
    setIndex((i) => (i + dir + slides.length) % slides.length)
  }

  return (
    <div className={cn('relative', className)}>
      <div className="overflow-hidden rounded-2xl">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={index}
            custom={direction}
            initial={{ opacity: 0, x: direction * 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -direction * 40 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            {slides[index]}
          </motion.div>
        </AnimatePresence>
      </div>

      <button
        onClick={() => go(-1)}
        className="absolute left-2 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full glass flex items-center justify-center shadow-md"
        aria-label="Previous slide"
      >
        <ChevronLeft size={16} />
      </button>
      <button
        onClick={() => go(1)}
        className="absolute right-2 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full glass flex items-center justify-center shadow-md"
        aria-label="Next slide"
      >
        <ChevronRight size={16} />
      </button>

      <div className="flex items-center justify-center gap-1.5 mt-4">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => { setDirection(i > index ? 1 : -1); setIndex(i) }}
            className={cn('h-1.5 rounded-full transition-all', i === index ? 'w-6 bg-primary' : 'w-1.5 bg-foreground/20')}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
