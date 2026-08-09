import { Link } from 'react-router-dom'
import { ChevronRight, Home } from 'lucide-react'

/**
 * items: [{ label: 'Jobs', to: '/jobs' }, { label: 'Store Manager' }]
 * Last item (no `to`) renders as plain text (current page).
 */
export function Breadcrumb({ items = [] }) {
  return (
    <nav className="flex items-center gap-1.5 text-sm text-muted-foreground flex-wrap" aria-label="Breadcrumb">
      <Link to="/" className="flex items-center hover:text-foreground transition-colors">
        <Home size={14} />
      </Link>
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1.5">
          <ChevronRight size={13} className="opacity-50" />
          {item.to ? (
            <Link to={item.to} className="hover:text-foreground transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-foreground font-medium">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  )
}
