import { useMemo, useState } from 'react'
import { CalendarDays, Moon, UtensilsCrossed } from 'lucide-react'
import WeeklyPatternGrid from './WeeklyPatternGrid'
import TimeOfDayChart from './TimeOfDayChart'
import { DAYS_KR, timeToHourDecimal, hourDecimalToTimeLabel } from '../weekConfig'

function buildTimeByDay(log, day) {
  return timeToHourDecimal(log?.[day])
}

export default function WeeklyReport({ medications, weeklyPatternLog, onTogglePatternCell, sleepLog, weeklyMealTimeLog }) {
  const [paintMode, setPaintMode] = useState(null) // 'meal' | 'med' | null

  function handleCellClick(day, hour) {
    if (!paintMode) return
    onTogglePatternCell(day, hour, paintMode)
  }

  const wakeTimeByDay = useMemo(() => {
    const out = {}
    DAYS_KR.forEach((day) => {
      const v = timeToHourDecimal(sleepLog[day]?.wakeTime)
      if (v != null) out[day] = v
    })
    return out
  }, [sleepLog])

  const bedTimeByDay = useMemo(() => {
    const out = {}
    DAYS_KR.forEach((day) => {
      const v = timeToHourDecimal(sleepLog[day]?.bedTime)
      if (v != null) out[day] = v
    })
    return out
  }, [sleepLog])

  const sleepDurationByDay = useMemo(() => {
    const out = {}
    DAYS_KR.forEach((day) => {
      const rec = sleepLog[day]
      if (rec?.durationMin != null) out[day] = rec.durationMin / 60
    })
    return out
  }, [sleepLog])

  const breakfastByDay = useMemo(() => {
    const out = {}
    DAYS_KR.forEach((day) => {
      const v = buildTimeByDay(weeklyMealTimeLog[day], 'breakfast')
      if (v != null) out[day] = v
    })
    return out
  }, [weeklyMealTimeLog])

  const lunchByDay = useMemo(() => {
    const out = {}
    DAYS_KR.forEach((day) => {
      const t = weeklyMealTimeLog[day]?.lunch
      const v = timeToHourDecimal(t)
      if (v != null) out[day] = v
    })
    return out
  }, [weeklyMealTimeLog])

  const dinnerByDay = useMemo(() => {
    const out = {}
    DAYS_KR.forEach((day) => {
      const t = weeklyMealTimeLog[day]?.dinner
      const v = timeToHourDecimal(t)
      if (v != null) out[day] = v
    })
    return out
  }, [weeklyMealTimeLog])

  return (
    <div className="space-y-5">
      <div className="pt-1">
        <h1 className="text-2xl font-extrabold text-slate-800">주간 통계</h1>
        <p className="mt-0.5 text-sm text-slate-400">이번 주 활동 현황</p>
      </div>

      <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
        <div className="flex items-center gap-2 text-sm font-bold text-slate-700">
          <CalendarDays className="h-4 w-4 text-forest-700" /> 식사 패턴
        </div>
        <p className="mt-1 text-xs text-slate-400">
          아침 6시부터 자정까지의 시간표예요. 아래 버튼으로 기록 종류를 고른 뒤 칸을 눌러 칠해보세요.
        </p>
        <div className="mt-4">
          <WeeklyPatternGrid log={weeklyPatternLog} paintMode={paintMode} onToggleCell={handleCellClick} />
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2">
          <button
            onClick={() => setPaintMode((m) => (m === 'meal' ? null : 'meal'))}
            className={`rounded-lg border px-3 py-2 text-sm font-semibold transition ${
              paintMode === 'meal'
                ? 'border-orange-500 bg-orange-500 text-white'
                : 'border-orange-200 bg-orange-50 text-orange-700 hover:bg-orange-100'
            }`}
          >
            식사
          </button>
          <button
            onClick={() => setPaintMode((m) => (m === 'med' ? null : 'med'))}
            className={`rounded-lg border px-3 py-2 text-sm font-semibold transition ${
              paintMode === 'med'
                ? 'border-emerald-600 bg-emerald-600 text-white'
                : 'border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
            }`}
          >
            약
          </button>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
        <div className="flex items-center gap-1.5 text-sm font-bold text-slate-700">
          <Moon className="h-4 w-4 text-indigo-600" /> 이번 주 수면 그래프
        </div>
        <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <TimeOfDayChart title="기상 시각" color="#4338ca" valuesByDay={wakeTimeByDay} formatValue={hourDecimalToTimeLabel} />
          <TimeOfDayChart title="취침 시각" color="#0369a1" valuesByDay={bedTimeByDay} formatValue={hourDecimalToTimeLabel} />
          <TimeOfDayChart
            title="총 수면 시간"
            color="#0d4d25"
            valuesByDay={sleepDurationByDay}
            formatValue={(v) => `${v.toFixed(1)}시간`}
          />
        </div>
      </div>

      <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
        <div className="flex items-center gap-1.5 text-sm font-bold text-slate-700">
          <UtensilsCrossed className="h-4 w-4 text-amber-600" /> 이번 주 식사 시각 그래프
        </div>
        <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <TimeOfDayChart title="아침" color="#b45309" valuesByDay={breakfastByDay} formatValue={hourDecimalToTimeLabel} />
          <TimeOfDayChart title="점심" color="#0d4d25" valuesByDay={lunchByDay} formatValue={hourDecimalToTimeLabel} />
          <TimeOfDayChart title="저녁" color="#7c2d12" valuesByDay={dinnerByDay} formatValue={hourDecimalToTimeLabel} />
        </div>
      </div>

      <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
        <h2 className="text-sm font-bold text-slate-700">오늘 복약 이행 현황</h2>
        <p className="mt-0.5 text-xs text-slate-400">오늘 먹어야 하는 횟수 대비 실제로 먹은 횟수예요.</p>
        <div className="mt-3 space-y-2">
          {medications.map((med) => {
            const taken = med.times.filter((t) => t.done).length
            const required = med.times.length
            return (
              <div key={med.id} className="flex w-full items-center justify-between rounded-lg bg-slate-50 px-3 py-2">
                <span className="text-sm font-medium text-slate-700">{med.name}</span>
                <span className="text-sm font-bold text-slate-600">
                  {taken}/{required}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
