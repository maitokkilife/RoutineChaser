import { DAYS_KR } from '../weekConfig'

export default function TimeOfDayChart({ title, color = '#0d4d25', valuesByDay, formatValue, height = 90 }) {
  const width = 200
  const padding = 18

  const points = DAYS_KR.map((day, i) => ({
    day,
    x: padding + (i / (DAYS_KR.length - 1)) * (width - padding * 2),
    value: valuesByDay[day],
  })).filter((p) => p.value != null)

  if (points.length === 0) {
    return (
      <div>
        <p className="mb-1 text-[11px] font-semibold text-slate-500">{title}</p>
        <div className="flex h-[90px] items-center justify-center rounded-lg bg-slate-50 text-[11px] text-slate-300">
          기록 없음
        </div>
      </div>
    )
  }

  const values = points.map((p) => p.value)
  const min = Math.min(...values)
  const max = Math.max(...values)
  const range = max - min || 1

  const scaled = points.map((p) => ({
    ...p,
    y: height - padding - ((p.value - min) / range) * (height - padding * 2),
  }))

  const linePath = scaled.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ')
  const last = scaled[scaled.length - 1]

  return (
    <div>
      <p className="mb-1 text-[11px] font-semibold text-slate-500">{title}</p>
      <svg viewBox={`0 0 ${width} ${height + 14}`} className="w-full">
        <path d={linePath} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        {scaled.map((p) => (
          <g key={p.day}>
            <circle cx={p.x} cy={p.y} r="3" fill="white" stroke={color} strokeWidth="2" />
            <text x={p.x} y={height + 12} textAnchor="middle" fontSize="9" fill="#94a3b8">
              {p.day}
            </text>
          </g>
        ))}
        <text x={last.x} y={last.y - 8} textAnchor="middle" fontSize="9" fontWeight="600" fill={color}>
          {formatValue ? formatValue(last.value) : last.value}
        </text>
      </svg>
    </div>
  )
}
