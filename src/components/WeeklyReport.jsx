import { useMemo, useState } from 'react'
import { CalendarDays, Droplet, Scale, X } from 'lucide-react'
import ActivityHeatmap from './ActivityHeatmap'
import TrendChart from './TrendChart'
import { weeklyMealHeatmap, weeklyMedicationLog, weeklyTrend } from '../mockData'

function mergeMedicationLogs(log) {
  const merged = {}
  Object.values(log).forEach((dayMap) => {
    Object.entries(dayMap).forEach(([day, hours]) => {
      merged[day] = Array.from(new Set([...(merged[day] || []), ...hours]))
    })
  })
  return merged
}

export default function WeeklyReport({ medications }) {
  const [selectedMedId, setSelectedMedId] = useState(null)

  const combinedMedHeatmap = useMemo(() => mergeMedicationLogs(weeklyMedicationLog), [])
  const medHeatmapData = selectedMedId ? weeklyMedicationLog[selectedMedId] || {} : combinedMedHeatmap
  const selectedMed = medications.find((m) => m.id === selectedMedId)

  return (
    <div className="space-y-5">
      <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm font-bold text-slate-700">
            <CalendarDays className="h-4 w-4 text-forest-700" /> 이번 주 식사 · 복약 히트맵
          </div>
          {selectedMed && (
            <button
              onClick={() => setSelectedMedId(null)}
              className="flex items-center gap-1 rounded-full bg-forest-50 px-2.5 py-1 text-xs font-semibold text-forest-700"
            >
              {selectedMed.name}만 보는 중 <X className="h-3 w-3" />
            </button>
          )}
        </div>
        <p className="mt-1 text-xs text-slate-400">
          주황색은 식사 기록, 초록색은 복약 기록이에요. 아래 목록에서 약을 클릭하면 해당 약의 복약 기록만 볼 수 있어요.
        </p>
        <div className="mt-4">
          <ActivityHeatmap mealData={weeklyMealHeatmap} medData={medHeatmapData} />
        </div>
      </div>

      <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
        <h2 className="text-sm font-bold text-slate-700">이번 주 복약 이행 현황</h2>
        <p className="mt-0.5 text-xs text-slate-400">이번 주 총 먹어야 하는 횟수 대비 실제로 먹은 횟수예요.</p>
        <div className="mt-3 space-y-2">
          {medications.map((med) => {
            const log = weeklyMedicationLog[med.id] || {}
            const taken = Object.values(log).reduce((sum, hours) => sum + hours.length, 0)
            const required = med.times.length * 7
            const selected = selectedMedId === med.id
            return (
              <button
                key={med.id}
                onClick={() => setSelectedMedId(selected ? null : med.id)}
                className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left transition ${
                  selected ? 'bg-forest-50 ring-1 ring-inset ring-forest-300' : 'bg-slate-50 hover:bg-slate-100'
                }`}
              >
                <span className="text-sm font-medium text-slate-700">{med.name}</span>
                <span className={`text-sm font-bold ${selected ? 'text-forest-700' : 'text-slate-600'}`}>
                  {taken}/{required}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
          <div className="flex items-center gap-1.5 text-sm font-bold text-slate-700">
            <Droplet className="h-4 w-4 text-sky-600" /> 혈당 추이 (mg/dL)
          </div>
          <div className="mt-2">
            <TrendChart data={weeklyTrend} dataKey="glucose" unit="" color="#0369a1" />
          </div>
        </div>
        <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
          <div className="flex items-center gap-1.5 text-sm font-bold text-slate-700">
            <Scale className="h-4 w-4 text-forest-700" /> 체중 추이 (kg)
          </div>
          <div className="mt-2">
            <TrendChart data={weeklyTrend} dataKey="weight" unit="kg" color="#0d4d25" />
          </div>
        </div>
      </div>
    </div>
  )
}
