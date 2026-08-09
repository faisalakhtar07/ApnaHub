import { stats } from '@/data/mockData'
import { useCountUp } from '@/hooks/useCountUp'

function StatCounter({ value, label }) {
  const { ref, value: animated } = useCountUp(value)
  return (
    <div ref={ref} className="text-center">
      <p className="font-display font-bold text-4xl sm:text-5xl text-white tabular-nums">
        {animated.toLocaleString()}+
      </p>
      <p className="text-sm text-white/60 mt-2">{label}</p>
    </div>
  )
}

export default function StatsSection() {
  return (
    <section className="bg-[hsl(230,30%,10%)] py-16">
      <div className="section grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((s) => (
          <StatCounter key={s.id} value={s.value} label={s.label} />
        ))}
      </div>
    </section>
  )
}
