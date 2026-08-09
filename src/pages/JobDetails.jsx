import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Briefcase, MapPin, Clock, GraduationCap, Wallet, Bookmark, Share2 } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Breadcrumb } from '@/components/ui/breadcrumb'
import { jobs } from '@/data/mockData'
import { useToast } from '@/components/ui/toast'

export default function JobDetails() {
  const { id } = useParams()
  const { toast } = useToast()
  const [saved, setSaved] = useState(false)
  const job = jobs.find((j) => j.id === id) ?? jobs[0]

  return (
    <div className="section py-8">
      <Breadcrumb items={[{ label: 'Jobs', to: '/jobs' }, { label: job.title }]} />

      <div className="grid lg:grid-cols-3 gap-8 mt-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-start gap-4">
            <div className="h-14 w-14 rounded-2xl bg-secondary/10 text-secondary flex items-center justify-center font-display font-bold text-lg shrink-0">
              {job.company.charAt(0)}
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold">{job.title}</h1>
              <p className="text-muted-foreground mt-1">{job.company}</p>
              <div className="flex flex-wrap items-center gap-3 mt-3 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5"><MapPin size={14} /> {job.location}</span>
                <span className="flex items-center gap-1.5"><Clock size={14} /> {job.type}</span>
                <span className="flex items-center gap-1.5"><GraduationCap size={14} /> {job.experience}</span>
              </div>
            </div>
          </div>

          <Card className="p-6">
            <h2 className="font-semibold mb-3">Job Description</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {job.company} is hiring a {job.title.toLowerCase()} for their {job.location} location. Full role
              descriptions, requirements, and qualification details will connect to the API in a later phase.
            </p>
          </Card>

          <Card className="p-6">
            <h2 className="font-semibold mb-3">Qualification</h2>
            <p className="text-sm text-muted-foreground">10th / 12th pass or graduate, depending on role. Local candidates preferred.</p>
          </Card>
        </div>

        <div>
          <Card className="p-5 sticky top-24">
            <div className="flex items-center gap-2 text-lg font-stamp font-bold text-primary mb-1">
              <Wallet size={18} /> {job.salary}
            </div>
            <p className="text-xs text-muted-foreground mb-4">Posted {job.postedMins < 60 ? `${job.postedMins}m ago` : `${Math.floor(job.postedMins / 60)}h ago`}</p>
            <div className="space-y-2.5">
              <Button className="w-full"><Briefcase size={15} /> Apply Now</Button>
              <Button variant={saved ? 'secondary' : 'outline'} className="w-full" onClick={() => { setSaved(!saved); toast({ title: saved ? 'Removed from saved' : 'Job saved', variant: 'success' }) }}>
                <Bookmark size={15} fill={saved ? 'currentColor' : 'none'} /> {saved ? 'Saved' : 'Save Job'}
              </Button>
              <Button variant="ghost" className="w-full" onClick={() => toast({ title: 'Link copied', variant: 'success' })}>
                <Share2 size={15} /> Share
              </Button>
            </div>
            {job.applyLink && <Badge variant="outline" className="mt-4 w-full justify-center">External application</Badge>}
          </Card>
        </div>
      </div>
    </div>
  )
}
