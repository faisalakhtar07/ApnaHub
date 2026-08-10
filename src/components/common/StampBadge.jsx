import { ShieldCheck, Sparkles, Flame } from 'lucide-react'

const VARIANTS = {
  verified: { className: 'stamp-teal', icon: ShieldCheck, label: 'Verified' },
  new: { className: 'stamp-gold', icon: Sparkles, label: 'New' },
  hot: { className: 'stamp-sindoor', icon: Flame, label: 'Popular' },
}

/**
 * The rubber-stamp badge is APNAHUB's signature visual device: a rotated,
 * dashed-border tag echoing the physical seals used on shop bills and
 * office paperwork across Bihar. Used sparingly — verified listings,
 * "new" markers, and popular tags only, never as generic decoration.
 */
export default function StampBadge({ variant = 'verified', label, tilt = -3 }) {
  const config = VARIANTS[variant] ?? VARIANTS.verified
  const Icon = config.icon

  return (
    <span
      className={config.className}
      style={{ transform: `rotate(${tilt}deg)` }}
    >
      <Icon size={12} strokeWidth={2.5} />
      {label ?? config.label}
    </span>
  )
}
