export const DAYS_KR = ['월', '화', '수', '목', '금', '토', '일']

export function getTodayDayKr(date = new Date()) {
  const idx = (date.getDay() + 6) % 7 // JS: 0=일 ... 6=토 → 월=0 ... 일=6
  return DAYS_KR[idx]
}

export function timeToHourDecimal(hhmm) {
  if (!hhmm) return null
  const [h, m] = hhmm.split(':').map(Number)
  return h + m / 60
}

export function hourDecimalToTimeLabel(value) {
  if (value == null) return ''
  const h = Math.floor(value)
  const m = Math.round((value - h) * 60)
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`
}
