const DAYS = ['월', '화', '수', '목', '금', '토', '일']
const HOURS = Array.from({ length: 24 }, (_, i) => i)

export default function ActivityHeatmap({ mealData, medData }) {
  return (
    <div className="overflow-x-auto">
      <div className="min-w-[420px]">
        <div className="grid grid-cols-[2.5rem_repeat(7,1fr)] gap-1">
          <div />
          {DAYS.map((day) => (
            <div key={day} className="text-center text-xs font-semibold text-slate-500">
              {day}
            </div>
          ))}
          {HOURS.map((hour) => (
            <div key={hour} className="contents">
              <div className="flex items-center justify-end pr-1 text-[10px] tabular-nums text-slate-400">
                {hour % 3 === 0 ? `${hour}시` : ''}
              </div>
              {DAYS.map((day) => {
                const meal = mealData[day]?.includes(hour)
                const med = medData[day]?.includes(hour)
                return (
                  <div key={`${day}-${hour}`} className="flex items-center justify-center gap-0.5">
                    <span
                      className={`h-2.5 w-1.5 rounded-sm ${meal ? 'bg-amber-500' : 'bg-slate-100'}`}
                      title={meal ? `${day}요일 ${hour}시 식사 기록` : undefined}
                    />
                    <span
                      className={`h-2.5 w-1.5 rounded-sm ${med ? 'bg-forest-600' : 'bg-slate-100'}`}
                      title={med ? `${day}요일 ${hour}시 복약 기록` : undefined}
                    />
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-slate-400">
        <span className="flex items-center gap-1">
          <span className="h-2.5 w-2.5 rounded-sm bg-amber-500" /> 식사 기록
        </span>
        <span className="flex items-center gap-1">
          <span className="h-2.5 w-2.5 rounded-sm bg-forest-600" /> 복약 기록
        </span>
      </div>
    </div>
  )
}
