import { TIMELINE_TYPE_CONFIG, sortByTimeDesc } from '../timelineConfig'
import { ImageIcon } from 'lucide-react'

export default function Timeline({ entries }) {
  const sorted = sortByTimeDesc(entries)

  if (sorted.length === 0) {
    return (
      <div className="py-10 text-center text-sm text-slate-400">
        오늘 기록된 항목이 없어요.
      </div>
    )
  }

  return (
    <ol className="relative space-y-1 pl-2">
      {sorted.map((entry, idx) => {
        const config = TIMELINE_TYPE_CONFIG[entry.type]
        const Icon = config.icon
        const isLast = idx === sorted.length - 1
        return (
          <li key={entry.id} className="relative flex gap-3 pb-4">
            {!isLast && (
              <span className="absolute left-[15px] top-8 h-full w-px bg-slate-200" aria-hidden="true" />
            )}
            <div
              className={`relative z-10 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full ring-4 ring-white ${config.bg}`}
            >
              <Icon className={`h-4 w-4 ${config.color}`} strokeWidth={2.25} />
            </div>
            <div className="min-w-0 flex-1 rounded-xl border border-slate-100 bg-white px-3 py-2 shadow-sm">
              <div className="flex items-center justify-between gap-2">
                <p className="truncate text-sm font-semibold text-slate-800">{entry.title}</p>
                <span className="flex-shrink-0 text-xs font-medium tabular-nums text-slate-400">{entry.time}</span>
              </div>
              {entry.subtitle && <p className="mt-0.5 text-xs text-slate-500">{entry.subtitle}</p>}
              {entry.meta?.imageUrl ? (
                <img
                  src={entry.meta.imageUrl}
                  alt={entry.title}
                  className="mt-2 h-16 w-16 rounded-lg object-cover"
                />
              ) : (
                entry.meta?.image && (
                  <div className="mt-2 flex h-16 w-16 items-center justify-center rounded-lg bg-slate-100 text-slate-300">
                    <ImageIcon className="h-6 w-6" />
                  </div>
                )
              )}
            </div>
          </li>
        )
      })}
    </ol>
  )
}
