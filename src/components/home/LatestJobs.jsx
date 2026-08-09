import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Briefcase, MapPin, ArrowUpRight, Bookmark } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { jobs } from '@/data/mockData'

function timeAgo(mins) {
  if (mins < 60) return `${mins}m ago`
  return `${Math.floor(mins / 60)}h ago`
}

export default function LatestJobs() {
  const [saved, setSaved] = useState(new Set())
  const toggleSave = (id) => setSaved((prev) => {
    const next = new Set(prev)
    next.has(id) ? next.delete(id) : next.add(id)
    return next
  })

  return (
    <section className="section py-16">
      <div className="flex items-end justify-between mb-8">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold">Latest jobs</h2>
          <p className="text-muted-foreground mt-1 text-sm">Fresh openings from local employers.</p>
        </div>
        <Link to="/jobs" className="text-sm font-semibold text-primary flex items-center gap-1 hover:gap-1.5 transition-all">
          View all <ArrowUpRight size={15} />
        </Link>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {jobs.slice(0, 4).map((job, i) => (
          <motion.div
            key={job.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
          >
            <Card className="p-5 flex flex-col h-full">
              <div className="flex items-start justify-between mb-3">
                <div className="h-10 w-10 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center font-display font-bold text-sm shrink-0">
                  {job.company.charAt(0)}
                </div>
                <div className="flex items-center gap-1.5">
                  {job.isNew && <Badge variant="seal">New</Badge>}
                  <button
                    onClick={() => toggleSave(job.id)}
                    aria-label="Save job"
                    className={`p-1.5 rounded-full transition-colors ${saved.has(job.id) ? 'text-primary' : 'text-muted-foreground hover:text-primary'}`}
                  >
                    <Bookmark size={16} fill={saved.has(job.id) ? 'currentColor' : 'none'} />
                  </button>
                </div>
              </div>
              <h3 className="font-semibold leading-snug">{job.title}</h3>
              <p className="text-sm text-muted-foreground mt-0.5">{job.company}</p>

              <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground mt-3">
                <span className="flex items-center gap-1"><MapPin size={12} /> {job.location}</span>
                <span>{job.type}</span>
                <span>{job.experience}</span>
              </div>

              <div className="mt-4 pt-4 border-t border-border flex items-center justify-between gap-2">
                <span className="font-stamp text-xs font-semibold text-primary">{job.salary}</span>
                <span className="text-xs text-muted-foreground">{timeAgo(job.postedMins)}</span>
              </div>
              <Button size="sm" className="w-full mt-3" asChild>
                <Link to={`/jobs/${job.id}`}>
                  <Briefcase size={14} /> Apply Now
                </Link>
              </Button>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
