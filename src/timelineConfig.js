import { Pill, UtensilsCrossed, Cookie, AlertTriangle, Activity } from 'lucide-react'

export const TIMELINE_TYPE_CONFIG = {
  medication: { icon: Pill, color: 'text-forest-700', bg: 'bg-forest-50', ring: 'ring-forest-200' },
  meal: { icon: UtensilsCrossed, color: 'text-amber-700', bg: 'bg-amber-50', ring: 'ring-amber-200' },
  hunger: { icon: Cookie, color: 'text-orange-700', bg: 'bg-orange-50', ring: 'ring-orange-200' },
  symptom: { icon: AlertTriangle, color: 'text-rose-700', bg: 'bg-rose-50', ring: 'ring-rose-200' },
  vital: { icon: Activity, color: 'text-sky-700', bg: 'bg-sky-50', ring: 'ring-sky-200' },
}

export function sortByTimeDesc(entries) {
  return [...entries].sort((a, b) => (a.time < b.time ? 1 : -1))
}
