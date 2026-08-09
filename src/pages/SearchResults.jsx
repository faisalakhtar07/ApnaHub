import { useMemo } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { Search, MapPin, Briefcase, Store, Tag } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Breadcrumb } from '@/components/ui/breadcrumb'
import { SearchBar } from '@/components/shared/SearchBar'
import { jobs, businesses, listings } from '@/data/mockData'

export default function SearchResults() {
  const [params] = useSearchParams()
  const q = params.get('q') ?? ''
  const type = params.get('type') ?? 'all'

  const results = useMemo(() => {
    const lower = q.toLowerCase()
    const matchJobs = jobs.filter((j) => j.title.toLowerCase().includes(lower) || j.company.toLowerCase().includes(lower))
    const matchBiz = businesses.filter((b) => b.name.toLowerCase().includes(lower) || b.category.toLowerCase().includes(lower))
    const matchListings = listings.filter((l) => l.title.toLowerCase().includes(lower))
    return { jobs: matchJobs, businesses: matchBiz, listings: matchListings }
  }, [q])

  const total = results.jobs.length + results.businesses.length + results.listings.length

  return (
    <div className="section py-8">
      <Breadcrumb items={[{ label: 'Search Results' }]} />
      <h1 className="text-3xl font-bold mt-4">Search results for "{q}"</h1>
      <p className="text-muted-foreground mt-1 text-sm mb-6">{total} results found</p>

      <SearchBar variant="page" className="mb-10 max-w-2xl" />

      {total === 0 ? (
        <div className="text-center py-20">
          <Search size={36} className="mx-auto text-muted-foreground/40 mb-4" />
          <p className="font-semibold">No results found</p>
          <p className="text-sm text-muted-foreground mt-1">Try a different keyword or browse categories instead.</p>
        </div>
      ) : (
        <div className="space-y-10">
          {results.jobs.length > 0 && (
            <ResultGroup icon={Briefcase} title="Jobs" items={results.jobs.map((j) => ({ id: j.id, title: j.title, sub: j.company, to: `/jobs/${j.id}` }))} />
          )}
          {results.businesses.length > 0 && (
            <ResultGroup icon={Store} title="Businesses" items={results.businesses.map((b) => ({ id: b.id, title: b.name, sub: b.category, to: `/businesses/${b.id}` }))} />
          )}
          {results.listings.length > 0 && (
            <ResultGroup icon={Tag} title="Buy & Sell" items={results.listings.map((l) => ({ id: l.id, title: l.title, sub: l.price, to: `/buy-sell/${l.id}` }))} />
          )}
        </div>
      )}
    </div>
  )
}

function ResultGroup({ icon: Icon, title, items }) {
  return (
    <div>
      <h2 className="flex items-center gap-2 font-semibold mb-4"><Icon size={16} className="text-primary" /> {title}</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item) => (
          <Link key={item.id} to={item.to}>
            <Card className="p-4">
              <p className="font-semibold text-sm">{item.title}</p>
              <p className="text-xs text-muted-foreground mt-1">{item.sub}</p>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
