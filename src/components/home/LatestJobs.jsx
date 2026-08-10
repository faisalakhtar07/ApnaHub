import { Link } from 'react-router-dom'
import { Briefcase, MapPin, ArrowUpRight } from 'lucide-react'
import { jobs } from '../../data/mockData'
import StampBadge from '../common/StampBadge'

function timeAgo(mins) {
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  return `${hrs}h ago`
}

export default function LatestJobs() {
  return (
    <section className="bg-indigo-900/[0.03] dark:bg-white/[0.02] py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-indigo-900 dark:text-white">
              Latest jobs
            </h2>
            <p className="text-ink/60 dark:text-white/60 mt-1 text-sm">
              Fresh openings from local employers.
            </p>
          </div>
          <Link to="/jobs" className="text-sm font-semibold text-sindoor flex items-center gap-1 hover:gap-1.5 transition-all">
            View all <ArrowUpRight size={15} />
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {jobs.map((job, i) => (
            <div key={job.id} className="card p-5 flex flex-col">
              <div className="flex items-start justify-between mb-3">
                <div className="p-2.5 rounded-xl bg-peacock/10 text-peacock shrink-0">
                  <Briefcase size={18} />
                </div>
                {i === 0 && <StampBadge variant="new" tilt={-4} />}
              </div>
              <h3 className="font-semibold text-indigo-900 dark:text-white leading-snug">{job.title}</h3>
              <p className="text-sm text-ink/60 dark:text-white/60 mt-0.5">{job.company}</p>

              <div className="flex items-center gap-1 text-xs text-ink/50 dark:text-white/40 mt-3">
                <MapPin size={12} /> {job.location}
              </div>

              <div className="mt-4 pt-4 border-t border-black/5 dark:border-white/10 flex items-center justify-between">
                <span className="font-stamp text-xs font-semibold text-sindoor">{job.salary}</span>
                <span className="text-xs text-ink/40 dark:text-white/30">{timeAgo(job.postedMins)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
