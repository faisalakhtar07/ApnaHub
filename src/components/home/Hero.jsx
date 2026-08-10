import { Users, Store, Briefcase } from 'lucide-react'
import SearchBar from './SearchBar'
import StampBadge from '../common/StampBadge'
import { liveActivity, CITY } from '../../data/mockData'

const STATS = [
  { icon: Store, value: '340+', label: 'Local businesses' },
  { icon: Briefcase, value: '128', label: 'Open jobs' },
  { icon: Users, value: '2,400+', label: 'Active users' },
]

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-14 pb-20 sm:pt-20 sm:pb-28">
      {/* Ambient background wash */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-indigo-900/[0.04] to-transparent dark:from-indigo-900/30" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-center">
        {/* Left: thesis + search */}
        <div className="animate-floatIn">
          <span className="stamp-sindoor mb-6" style={{ transform: 'rotate(-2deg)' }}>
            Live in {CITY}
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight text-indigo-900 dark:text-white mt-5">
            Your city.
            <br />
            One <span className="text-sindoor">hub.</span>
          </h1>
          <p className="mt-6 text-lg text-ink/70 dark:text-white/70 max-w-lg">
            Find trusted local businesses, the latest jobs, and buy &amp; sell
            listings in Aurangabad — all in one place, verified by your neighbours.
          </p>

          <div className="mt-8">
            <SearchBar variant="hero" />
          </div>

          <div className="flex flex-wrap gap-x-8 gap-y-4 mt-10">
            {STATS.map(({ icon: Icon, value, label }) => (
              <div key={label} className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-peacock/10 text-peacock">
                  <Icon size={18} />
                </div>
                <div>
                  <div className="font-display font-bold text-lg leading-none text-indigo-900 dark:text-white">
                    {value}
                  </div>
                  <div className="text-xs text-ink/60 dark:text-white/50 mt-0.5">{label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: staggered "live" activity stamp cards */}
        <div className="relative hidden lg:block h-[420px]">
          {liveActivity.map((item, i) => (
            <div
              key={item.id}
              className="absolute card p-5 w-72 animate-floatIn animate-drift"
              style={{
                '--tilt': `${item.tilt}deg`,
                top: `${i * 130}px`,
                left: i % 2 === 0 ? '10%' : '30%',
                animationDelay: `${i * 0.15}s, ${i * 0.4}s`,
                transform: `rotate(${item.tilt}deg)`,
              }}
            >
              <div className="flex items-center justify-between mb-2">
                <StampBadge
                  variant={i === 0 ? 'new' : i === 1 ? 'hot' : 'verified'}
                  tilt={0}
                />
                <span className="text-xs text-ink/40 dark:text-white/40">{item.mins}m ago</span>
              </div>
              <p className="font-semibold text-sm text-indigo-900 dark:text-white">{item.text}</p>
              <p className="text-xs text-ink/60 dark:text-white/60 mt-0.5">{item.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
