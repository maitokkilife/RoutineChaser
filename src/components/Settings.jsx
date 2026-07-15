import { useState } from 'react'
import { Scale, Plus } from 'lucide-react'

const VITAL_UNITS = ['mg/dL', 'mL', 'kg']

function nowTime() {
  const d = new Date()
  return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`
}

export default function Settings({ onAddTimelineEntry }) {
  const [weightValue, setWeightValue] = useState('')
  const [vitalName, setVitalName] = useState('')
  const [vitalValue, setVitalValue] = useState('')
  const [vitalUnit, setVitalUnit] = useState(VITAL_UNITS[0])

  function submitWeight(e) {
    e.preventDefault()
    if (!weightValue) return
    onAddTimelineEntry({
      id: `tl-${Date.now()}-weight`,
      type: 'vital',
      time: nowTime(),
      title: '몸무게 측정',
      subtitle: `${weightValue} kg`,
      meta: { kind: 'weight', value: Number(weightValue) },
    })
    setWeightValue('')
  }

  function submitCustomVital(e) {
    e.preventDefault()
    if (!vitalName || !vitalValue) return
    onAddTimelineEntry({
      id: `tl-${Date.now()}-custom-vital`,
      type: 'vital',
      time: nowTime(),
      title: `${vitalName} 측정`,
      subtitle: `${vitalValue} ${vitalUnit}`,
      meta: { kind: 'custom', label: vitalName, value: vitalValue, unit: vitalUnit },
    })
    setVitalName('')
    setVitalValue('')
    setVitalUnit(VITAL_UNITS[0])
  }

  return (
    <div className="space-y-5">
      <section className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
        <h2 className="flex items-center gap-1.5 text-sm font-bold text-slate-700">
          <Scale className="h-4 w-4 text-forest-700" /> 몸무게 기록
        </h2>
        <form onSubmit={submitWeight} className="mt-3 flex gap-2">
          <input
            type="number"
            step="0.1"
            value={weightValue}
            onChange={(e) => setWeightValue(e.target.value)}
            placeholder="예: 71.2"
            className="w-full rounded-lg border border-slate-200 px-2.5 py-2 text-sm focus:border-forest-500 focus:outline-none focus:ring-1 focus:ring-forest-500"
          />
          <button
            type="submit"
            className="flex-shrink-0 rounded-lg bg-forest-700 px-4 py-2 text-sm font-semibold text-white hover:bg-forest-800"
          >
            기록
          </button>
        </form>
      </section>

      <section className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
        <h2 className="flex items-center gap-1.5 text-sm font-bold text-slate-700">
          <Plus className="h-4 w-4 text-forest-700" /> 다른 수치 기록
        </h2>
        <form onSubmit={submitCustomVital} className="mt-3 space-y-3">
          <div>
            <label className="text-xs font-bold text-slate-600">수치 이름</label>
            <input
              value={vitalName}
              onChange={(e) => setVitalName(e.target.value)}
              placeholder="예: 혈당"
              className="mt-1 w-full rounded-lg border border-slate-200 px-2.5 py-2 text-sm focus:border-forest-500 focus:outline-none focus:ring-1 focus:ring-forest-500"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-600">값</label>
            <input
              type="number"
              step="0.1"
              value={vitalValue}
              onChange={(e) => setVitalValue(e.target.value)}
              placeholder="예: 98"
              className="mt-1 w-full rounded-lg border border-slate-200 px-2.5 py-2 text-sm focus:border-forest-500 focus:outline-none focus:ring-1 focus:ring-forest-500"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-600">단위</label>
            <div className="mt-1 grid grid-cols-3 gap-2">
              {VITAL_UNITS.map((unit) => (
                <button
                  type="button"
                  key={unit}
                  onClick={() => setVitalUnit(unit)}
                  className={`rounded-lg border px-2 py-2 text-sm font-semibold transition ${
                    vitalUnit === unit
                      ? 'border-forest-300 bg-forest-50 text-forest-700'
                      : 'border-slate-200 text-slate-500 hover:border-forest-200'
                  }`}
                >
                  {unit}
                </button>
              ))}
            </div>
          </div>
          <p className="text-xs text-slate-400">기록 시각: {nowTime()} (자동 기록)</p>
          <button
            type="submit"
            className="w-full rounded-lg bg-forest-700 py-2.5 text-sm font-semibold text-white hover:bg-forest-800"
          >
            타임라인에 추가
          </button>
        </form>
      </section>
    </div>
  )
}
