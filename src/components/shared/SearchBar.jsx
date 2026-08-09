import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function SearchBar({ variant = 'hero', className = '' }) {
  const [query, setQuery] = useState('')
  const [scope, setScope] = useState('all')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    navigate(`/search?q=${encodeURIComponent(query)}&type=${scope}`)
  }

  const isHero = variant === 'hero'

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex flex-col sm:flex-row items-stretch gap-2 p-2 rounded-2xl sm:rounded-full
        ${isHero ? 'glass shadow-xl' : 'bg-card border border-border'} ${className}`}
    >
      <select
        value={scope}
        onChange={(e) => setScope(e.target.value)}
        className="bg-transparent text-sm font-medium px-4 py-2.5 rounded-full outline-none border-r border-border"
        aria-label="Search category"
      >
        <option value="all">All</option>
        <option value="businesses">Businesses</option>
        <option value="jobs">Jobs</option>
        <option value="buy-sell">Buy & Sell</option>
      </select>

      <div className="flex items-center flex-1 gap-2 px-3">
        <Search size={18} className="text-muted-foreground shrink-0" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search shops, jobs, bikes, mobiles..."
          className="w-full bg-transparent text-sm py-2.5 outline-none placeholder:text-muted-foreground"
        />
      </div>

      <div className="hidden lg:flex items-center gap-1.5 px-3 text-sm text-muted-foreground border-l border-border">
        <MapPin size={15} />
        Aurangabad
      </div>

      <Button type="submit" className="shrink-0">
        <Search size={16} />
        <span className="hidden sm:inline">Search</span>
      </Button>
    </form>
  )
}
