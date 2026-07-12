import { Moon, Sun } from 'lucide-react'
import { DAYS_KR, getTodayDayKr } from '../weekConfig'

export default function SleepLog({ sleepLog, pendingSleepStart, onCheckIn, onCheckOut }) {
  const isSleeping = !!pendingSleepStart
  const todayRecord = sleepLog[getTodayDayKr()]

  return (
    <div className="space-y-5">
      <div className="pt-1">
        <h1 className="text-2xl font-extrabold text-slate-800">수면 기록</h1>
        <p className="mt-0.5 text-sm text-slate-400">체크인/체크아웃으로 수면 시간을 기록하세요</p>
      </div>

      <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
        <h2 className="text-sm font-bold text-slate-700">오늘 수면 체크</h2>
        <p className="mt-0.5 text-xs text-slate-400">잠자리에 들 때 체크인, 일어나면 체크아웃을 눌러주세요.</p>
        <div className="mt-4 grid grid-cols-2 gap-2">
          <button
            onClick={onCheckIn}
            disabled={isSleeping}
            className={`flex flex-col items-center gap-1.5 rounded-xl border py-4 text-sm font-semibold transition ${
              isSleeping
                ? 'cursor-not-allowed border-slate-100 bg-slate-50 text-slate-300'
                : 'border-indigo-200 bg-indigo-50 text-indigo-700 hover:bg-indigo-100'
            }`}
          >
            <Moon className="h-5 w-5" />
            체크인 (취침)
          </button>
          <button
            onClick={onCheckOut}
            disabled={!isSleeping}
            className={`flex flex-col items-center gap-1.5 rounded-xl border py-4 text-sm font-semibold transition ${
              !isSleeping
                ? 'cursor-not-allowed border-slate-100 bg-slate-50 text-slate-300'
                : 'border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-100'
            }`}
          >
            <Sun className="h-5 w-5" />
            체크아웃 (기상)
          </button>
        </div>
        {isSleeping && (
          <p className="mt-3 text-xs font-semibold text-indigo-600">
            {new Date(pendingSleepStart).toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })}부터 취침
            중이에요.
          </p>
        )}
        {!isSleeping && todayRecord && (
          <p className="mt-3 text-xs text-slate-400">
            오늘 기록: {todayRecord.bedTime} 취침 · {todayRecord.wakeTime} 기상 · 총{' '}
            {(todayRecord.durationMin / 60).toFixed(1)}시간
          </p>
        )}
      </div>

      <section>
        <h2 className="mb-2 text-sm font-bold text-slate-700">이번 주 수면 기록</h2>
        <div className="space-y-2">
          {DAYS_KR.map((day) => {
            const rec = sleepLog[day]
            return (
              <div
                key={day}
                className="flex items-center justify-between rounded-xl border border-slate-100 bg-white p-3 shadow-sm"
              >
                <span className="text-sm font-semibold text-slate-700">{day}요일</span>
                {rec ? (
                  <span className="text-xs text-slate-500">
                    {rec.bedTime} → {rec.wakeTime} · {(rec.durationMin / 60).toFixed(1)}시간
                  </span>
                ) : (
                  <span className="text-xs text-slate-300">기록 없음</span>
                )}
              </div>
            )
          })}
        </div>
      </section>
    </div>
  )
}
