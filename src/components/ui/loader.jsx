import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

export function Loader({ className, label = 'Loading...' }) {
  return (
    <div className={cn('flex flex-col items-center justify-center gap-3 py-16 text-muted-foreground', className)}>
      <Loader2 size={28} className="animate-spin text-primary" />
      <p className="text-sm">{label}</p>
    </div>
  )
}
