import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

/**
 * Numbered pagination with ellipsis collapsing for large page counts.
 * Controlled component: parent owns `page` state.
 */
export function Pagination({ page, totalPages, onChange }) {
  if (totalPages <= 1) return null

  const pages = getPageList(page, totalPages)

  return (
    <nav className="flex items-center justify-center gap-1.5" aria-label="Pagination">
      <button
        onClick={() => onChange(Math.max(1, page - 1))}
        disabled={page === 1}
        className="h-9 w-9 flex items-center justify-center rounded-full border border-border disabled:opacity-40 hover:bg-foreground/5 transition"
        aria-label="Previous page"
      >
        <ChevronLeft size={16} />
      </button>

      {pages.map((p, i) =>
        p === '...' ? (
          <span key={`dots-${i}`} className="px-1.5 text-sm text-muted-foreground">…</span>
        ) : (
          <button
            key={p}
            onClick={() => onChange(p)}
            className={cn(
              'h-9 w-9 flex items-center justify-center rounded-full text-sm font-medium transition',
              p === page ? 'bg-primary text-primary-foreground' : 'hover:bg-foreground/5'
            )}
            aria-current={p === page ? 'page' : undefined}
          >
            {p}
          </button>
        )
      )}

      <button
        onClick={() => onChange(Math.min(totalPages, page + 1))}
        disabled={page === totalPages}
        className="h-9 w-9 flex items-center justify-center rounded-full border border-border disabled:opacity-40 hover:bg-foreground/5 transition"
        aria-label="Next page"
      >
        <ChevronRight size={16} />
      </button>
    </nav>
  )
}

function getPageList(current, total) {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)
  if (current <= 4) return [1, 2, 3, 4, 5, '...', total]
  if (current >= total - 3) return [1, '...', total - 4, total - 3, total - 2, total - 1, total]
  return [1, '...', current - 1, current, current + 1, '...', total]
}
