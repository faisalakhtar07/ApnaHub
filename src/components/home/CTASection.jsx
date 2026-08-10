import { Link } from 'react-router-dom'
import { Megaphone } from 'lucide-react'

export default function CTASection() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="relative overflow-hidden rounded-card bg-indigo-900 text-white px-8 py-14 sm:px-16 text-center">
        <div className="absolute -top-10 -right-10 w-56 h-56 rounded-full bg-sindoor/20 blur-3xl" />
        <div className="absolute -bottom-10 -left-10 w-56 h-56 rounded-full bg-peacock/20 blur-3xl" />

        <div className="relative">
          <span className="stamp-gold inline-flex mb-5" style={{ transform: 'rotate(-2deg)' }}>
            <Megaphone size={12} strokeWidth={2.5} /> It's free
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold max-w-xl mx-auto leading-tight">
            Got a shop, a job, or something to sell?
          </h2>
          <p className="text-white/70 mt-4 max-w-md mx-auto">
            List it on APNAHUB and reach thousands of people right here in Aurangabad.
          </p>
          <Link to="/signup" className="btn-primary mt-8 text-base px-8 py-3.5">
            Post your first listing
          </Link>
        </div>
      </div>
    </section>
  )
}
