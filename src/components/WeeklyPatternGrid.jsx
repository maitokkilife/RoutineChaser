import { DAYS_KR } from '../weekConfig'

const HOURS = Array.from({ length: 18 }, (_, i) => i + 6) // 06시 ~ 23시 (자정 전까지)

const CELL_STYLES = {
  meal: 'bg-orange-500 border-orange-500',
  med: 'bg-emerald-500 border-emerald-500',
}

export default function WeeklyPatternGrid({ log, paintMode, onToggleCell }) {
  return (
    <div className="overflow-x-auto">
      <div className="min-w-[420px]">
        <div className="grid grid-cols-[2.5rem_repeat(7,1fr)] gap-1">
          <div />
          {DAYS_KR.map((day) => (
            <div key={day} className="text-center text-xs font-semibold text-slate-500">
              {day}
            </div>
          ))}
          {HOURS.map((hour) => (
            <div key={hour} className="contents">
              <div className="flex items-center justify-end pr-1 text-[10px] tabular-nums text-slate-400">
                {String(hour).padStart(2, '0')}시
              </div>
              {DAYS_KR.map((day) => {
                const value = log[day]?.[hour]
                return (
                  <button
                    key={`${day}-${hour}`}
                    type="button"
                    onClick={() => onToggleCell(day, hour)}
                    disabled={!paintMode}
                    title={`${day}요일 ${hour}시`}
                    className={`h-6 w-full rounded border transition ${
                      value ? CELL_STYLES[value] : 'border-slate-100 bg-slate-50'
                    } ${paintMode ? 'cursor-pointer hover:opacity-80' : 'cursor-not-allowed'}`}
                  />
                )
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
