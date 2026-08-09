import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Briefcase, MapPin, Bookmark, SlidersHorizontal } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Breadcrumb } from '@/components/ui/breadcrumb'
import { Pagination } from '@/components/ui/pagination'
import { CardSkeleton } from '@/components/ui/skeleton'
import { jobs as allJobs } from '@/data/mockData'

const PAGE_SIZE = 6

export default function Jobs() {
  const [loading] = useState(false)
  const [type, setType] = useState('all')
  const [page, setPage] = useState(1)
  const [saved, setSaved] = useState(new Set())

  const jobs = useMemo(() => {
    const list = [...allJobs, ...allJobs]
    return type === 'all' ? list : list.filter((j) => j.type === type)
  }, [type])

  const totalPages = Math.max(1, Math.ceil(jobs.length / PAGE_SIZE))
  const pageItems = jobs.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const toggleSave = (id) => setSaved((prev) => {
    const next = new Set(prev)
    next.has(id) ? next.delete(id) : next.add(id)
    return next
  })

  return (
    <div className="section py-8">
      <Breadcrumb items={[{ label: 'Jobs' }]} />

      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mt-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold">Latest Jobs</h1>
          <p className="text-muted-foreground mt-1 text-sm">{jobs.length} openings in Aurangabad, Bihar</p>
        </div>
        <div className="flex items-center gap-2">
          <SlidersHorizontal size={15} className="text-muted-foreground" />
          <select
            value={type}
            onChange={(e) => { setType(e.target.value); setPage(1) }}
            className="text-sm bg-card border border-border rounded-full px-4 py-2 outline-none"
          >
            <option value="all">All Types</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
          </select>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
        {loading
          ? Array.from({ length: 6 }).map((_, i) => <CardSkeleton key={i} />)
          : pageItems.map((job, i) => (
              <Card key={`${job.id}-${i}`} className="p-5 flex flex-col">
                <div className="flex items-start justify-between mb-3">
                  <div className="h-10 w-10 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center font-display font-bold text-sm">
                    {job.company.charAt(0)}
                  </div>
                  <button onClick={() => toggleSave(`${job.id}-${i}`)} className={`p-1.5 rounded-full ${saved.has(`${job.id}-${i}`) ? 'text-primary' : 'text-muted-foreground hover:text-primary'}`}>
                    <Bookmark size={16} fill={saved.has(`${job.id}-${i}`) ? 'currentColor' : 'none'} />
                  </button>
                </div>
                <h3 className="font-semibold leading-snug">{job.title}</h3>
                <p className="text-sm text-muted-foreground mt-0.5">{job.company}</p>
                <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground mt-3">
                  <span className="flex items-center gap-1"><MapPin size={12} /> {job.location}</span>
                  <span>{job.type}</span>
                  <span>{job.experience}</span>
                </div>
                <div className="mt-4 pt-4 border-t border-border">
                  <span className="font-stamp text-xs font-semibold text-primary">{job.salary}</span>
                </div>
                <Button size="sm" className="w-full mt-3" asChild>
                  <Link to={`/jobs/${job.id}`}><Briefcase size={14} /> Apply Now</Link>
                </Button>
              </Card>
            ))}
      </div>

      <Pagination page={page} totalPages={totalPages} onChange={setPage} />
    </div>
  )
}
