import { DAYS_KR } from '../weekConfig'

const PLACEHOLDER_COLOR = '#d1d5db'

export default function TimeOfDayChart({
  title,
  color = '#0d4d25',
  valuesByDay,
  formatValue,
  height = 90,
  showCarryForward = false,
}) {
  const width = 200
  const padding = 18

  let lastKnown = null
  const points = DAYS_KR.map((day, i) => {
    const x = padding + (i / (DAYS_KR.length - 1)) * (width - padding * 2)
    const real = valuesByDay[day]
    if (real != null) {
      lastKnown = real
      return { day, x, value: real, isPlaceholder: false }
    }
    if (showCarryForward && lastKnown != null) {
      return { day, x, value: lastKnown, isPlaceholder: true }
    }
    return { day, x, value: null, isPlaceholder: false }
  }).filter((p) => p.value != null)

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

  const segments = scaled
    .slice(1)
    .map((b, i) => ({ a: scaled[i], b, isPlaceholderSegment: scaled[i].isPlaceholder || b.isPlaceholder }))
  const lastReal = [...scaled].reverse().find((p) => !p.isPlaceholder)

  return (
    <div>
      <p className="mb-1 text-[11px] font-semibold text-slate-500">{title}</p>
      <svg viewBox={`0 0 ${width} ${height + 14}`} className="w-full">
        {segments.map((seg, i) => (
          <line
            key={i}
            x1={seg.a.x}
            y1={seg.a.y}
            x2={seg.b.x}
            y2={seg.b.y}
            stroke={seg.isPlaceholderSegment ? PLACEHOLDER_COLOR : color}
            strokeWidth="2"
            strokeDasharray={seg.isPlaceholderSegment ? '4 3' : undefined}
            strokeLinecap="round"
          />
        ))}
        {scaled.map((p) => (
          <g key={p.day}>
            <circle
              cx={p.x}
              cy={p.y}
              r="3"
              fill="white"
              stroke={p.isPlaceholder ? PLACEHOLDER_COLOR : color}
              strokeWidth="2"
            />
            <text x={p.x} y={height + 12} textAnchor="middle" fontSize="9" fill="#94a3b8">
              {p.day}
            </text>
          </g>
        ))}
        {lastReal && (
          <text x={lastReal.x} y={lastReal.y - 8} textAnchor="middle" fontSize="9" fontWeight="600" fill={color}>
            {formatValue ? formatValue(lastReal.value) : lastReal.value}
          </text>
        )}
      </svg>
    </div>
  )
}
