export default function TrendChart({ data, dataKey, unit, color = '#0d4d25', height = 120 }) {
  const width = 320
  const padding = 16
  const values = data.map((d) => d[dataKey])
  const min = Math.min(...values)
  const max = Math.max(...values)
  const range = max - min || 1

  const points = data.map((d, i) => {
    const x = padding + (i / (data.length - 1)) * (width - padding * 2)
    const y = height - padding - ((d[dataKey] - min) / range) * (height - padding * 2)
    return { x, y, value: d[dataKey], label: d.day }
  })

  const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ')
  const areaPath = `${linePath} L ${points[points.length - 1].x} ${height - padding} L ${points[0].x} ${height - padding} Z`

  return (
    <svg viewBox={`0 0 ${width} ${height + 20}`} className="w-full">
      <path d={areaPath} fill={color} opacity="0.08" />
      <path d={linePath} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {points.map((p, i) => (
        <g key={i}>
          <circle cx={p.x} cy={p.y} r="3" fill="white" stroke={color} strokeWidth="2" />
          <text x={p.x} y={height + 16} textAnchor="middle" fontSize="9" fill="#94a3b8">
            {p.label}
          </text>
        </g>
      ))}
      <text x={points[points.length - 1].x} y={points[points.length - 1].y - 10} textAnchor="middle" fontSize="10" fontWeight="600" fill={color}>
        {points[points.length - 1].value}{unit}
      </text>
    </svg>
  )
}
