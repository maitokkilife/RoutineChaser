import { useState } from 'react'
import { TrendingUp, Pill, UtensilsCrossed, Droplet, ThumbsUp, AlertOctagon, Rocket } from 'lucide-react'
import { monthlySummary } from '../mockData'

export default function MonthlyRetro({ retros, onAddRetro }) {
  const [keep, setKeep] = useState('')
  const [problem, setProblem] = useState('')
  const [action, setAction] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    if (!keep && !problem && !action) return
    onAddRetro({
      id: `retro-${Date.now()}`,
      monthLabel: monthlySummary.monthLabel,
      keep,
      problem,
      action,
    })
    setKeep('')
    setProblem('')
    setAction('')
  }

  return (
    <div className="space-y-5">
      <div className="rounded-2xl bg-forest-700 p-4 text-white shadow-sm">
        <div className="flex items-center gap-1.5 text-sm font-bold text-forest-100">
          <TrendingUp className="h-4 w-4" /> {monthlySummary.monthLabel} 요약
        </div>
        <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div className="rounded-xl bg-white/10 p-3">
            <Droplet className="h-4 w-4 text-sky-200" />
            <p className="mt-1 text-lg font-bold">{monthlySummary.avgGlucose}</p>
            <p className="text-[11px] text-forest-100">평균 혈당 mg/dL</p>
          </div>
          <div className="rounded-xl bg-white/10 p-3">
            <TrendingUp className="h-4 w-4 text-forest-100" />
            <p className="mt-1 text-lg font-bold">{monthlySummary.avgWeight}kg</p>
            <p className="text-[11px] text-forest-100">평균 체중</p>
          </div>
          <div className="rounded-xl bg-white/10 p-3">
            <Pill className="h-4 w-4 text-forest-100" />
            <p className="mt-1 text-lg font-bold">{monthlySummary.medicationRate}%</p>
            <p className="text-[11px] text-forest-100">복약 이행률</p>
          </div>
          <div className="rounded-xl bg-white/10 p-3">
            <UtensilsCrossed className="h-4 w-4 text-amber-100" />
            <p className="mt-1 text-lg font-bold">{monthlySummary.mealLogCount}</p>
            <p className="text-[11px] text-forest-100">식사 기록 수</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
        <h2 className="text-sm font-bold text-slate-700">이번 달 회고 작성 (KPT)</h2>
        <div className="mt-3 space-y-3">
          <div>
            <label className="flex items-center gap-1.5 text-xs font-bold text-emerald-700">
              <ThumbsUp className="h-3.5 w-3.5" /> Keep · 잘 관리해서 유지할 점
            </label>
            <textarea
              value={keep}
              onChange={(e) => setKeep(e.target.value)}
              placeholder="예: 주간 식사 시간을 일정하게 유지함"
              rows={2}
              className="mt-1 w-full rounded-lg border border-slate-200 px-2.5 py-2 text-sm focus:border-forest-500 focus:outline-none focus:ring-1 focus:ring-forest-500"
            />
          </div>
          <div>
            <label className="flex items-center gap-1.5 text-xs font-bold text-rose-700">
              <AlertOctagon className="h-3.5 w-3.5" /> Problem · 잘못 관리해서 고칠 점
            </label>
            <textarea
              value={problem}
              onChange={(e) => setProblem(e.target.value)}
              placeholder="예: 배고플 때 간식으로 초콜릿 먹음"
              rows={2}
              className="mt-1 w-full rounded-lg border border-slate-200 px-2.5 py-2 text-sm focus:border-forest-500 focus:outline-none focus:ring-1 focus:ring-forest-500"
            />
          </div>
          <div>
            <label className="flex items-center gap-1.5 text-xs font-bold text-sky-700">
              <Rocket className="h-3.5 w-3.5" /> Action · 다음 달 행동 계획
            </label>
            <textarea
              value={action}
              onChange={(e) => setAction(e.target.value)}
              placeholder="예: 회사 모니터 옆에 견과류 통 상시 배치하기"
              rows={2}
              className="mt-1 w-full rounded-lg border border-slate-200 px-2.5 py-2 text-sm focus:border-forest-500 focus:outline-none focus:ring-1 focus:ring-forest-500"
            />
          </div>
        </div>
        <button
          type="submit"
          className="mt-4 w-full rounded-lg bg-forest-700 py-2.5 text-sm font-semibold text-white hover:bg-forest-800"
        >
          회고 저장
        </button>
      </form>

      <section>
        <h2 className="mb-2 text-sm font-bold text-slate-700">지난 회고 기록</h2>
        <div className="space-y-3">
          {retros.map((retro) => (
            <div key={retro.id} className="rounded-xl border border-slate-100 bg-white p-3 shadow-sm">
              <p className="text-xs font-bold text-forest-700">{retro.monthLabel}</p>
              <dl className="mt-2 space-y-1.5 text-xs text-slate-600">
                {retro.keep && (
                  <div className="flex gap-1.5">
                    <dt className="flex-shrink-0 font-semibold text-emerald-700">Keep</dt>
                    <dd>{retro.keep}</dd>
                  </div>
                )}
                {retro.problem && (
                  <div className="flex gap-1.5">
                    <dt className="flex-shrink-0 font-semibold text-rose-700">Problem</dt>
                    <dd>{retro.problem}</dd>
                  </div>
                )}
                {retro.action && (
                  <div className="flex gap-1.5">
                    <dt className="flex-shrink-0 font-semibold text-sky-700">Action</dt>
                    <dd>{retro.action}</dd>
                  </div>
                )}
              </dl>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
