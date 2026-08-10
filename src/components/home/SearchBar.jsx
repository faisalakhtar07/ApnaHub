import { useState } from 'react'
import { Search, MapPin } from 'lucide-react'

/**
 * Global search across Businesses, Jobs, and Buy & Sell. Category acts as
 * a scope filter; in the connected app this maps to a `type` query param
 * sent to GET /api/search.
 */
export default function SearchBar({ variant = 'hero' }) {
  const [query, setQuery] = useState('')
  const [scope, setScope] = useState('all')

  const handleSubmit = (e) => {
    e.preventDefault()
    // TODO: navigate to /search?q=...&type=...
    console.log('Search:', { query, scope })
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex flex-col sm:flex-row items-stretch gap-2 p-2 rounded-2xl sm:rounded-full
        ${variant === 'hero' ? 'bg-white dark:bg-indigo-800 shadow-xl shadow-indigo-900/10' : 'bg-white dark:bg-indigo-800 border border-black/10 dark:border-white/10'}`}
    >
      <select
        value={scope}
        onChange={(e) => setScope(e.target.value)}
        className="bg-transparent text-sm font-medium px-4 py-2.5 rounded-full outline-none border-r border-black/10 dark:border-white/10 sm:border-r"
        aria-label="Search category"
      >
        <option value="all">All</option>
        <option value="businesses">Businesses</option>
        <option value="jobs">Jobs</option>
        <option value="buy-sell">Buy & Sell</option>
      </select>

      <div className="flex items-center flex-1 gap-2 px-3">
        <Search size={18} className="text-ink/40 dark:text-white/40 shrink-0" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search shops, jobs, bikes, mobiles..."
          className="w-full bg-transparent text-sm py-2.5 outline-none placeholder:text-ink/40 dark:placeholder:text-white/40"
        />
      </div>

      <div className="hidden lg:flex items-center gap-1.5 px-3 text-sm text-ink/50 dark:text-white/50 border-l border-black/10 dark:border-white/10">
        <MapPin size={15} />
        Aurangabad
      </div>

      <button type="submit" className="btn-primary shrink-0">
        <Search size={16} />
        <span className="hidden sm:inline">Search</span>
      </button>
    </form>
  )
}
