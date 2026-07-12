import { useState } from 'react'
import { Plus, Trash2, Pill } from 'lucide-react'

const TIME_PRESETS = [
  { id: 'fasting', label: '아침 공복', time: '07:30' },
  { id: 'morning', label: '아침 식후 30분', time: '08:30' },
  { id: 'lunch', label: '점심 식후 30분', time: '12:30' },
  { id: 'dinner', label: '저녁 식후 30분', time: '19:30' },
  { id: 'bedtime', label: '취침 전', time: '22:30' },
  { id: 'custom', label: '직접 시간 입력', time: '' },
]

let slotKeySeq = 0
function makeSlot() {
  slotKeySeq += 1
  return { key: slotKeySeq, presetId: 'morning', customTime: '09:00' }
}

export default function Settings({ medications, onAddMedication, onRemoveMedication }) {
  const [name, setName] = useState('')
  const [type, setType] = useState('rx')
  const [slots, setSlots] = useState([makeSlot()])

  function updateSlot(key, patch) {
    setSlots((prev) => prev.map((s) => (s.key === key ? { ...s, ...patch } : s)))
  }

  function addSlot() {
    setSlots((prev) => [...prev, makeSlot()])
  }

  function removeSlot(key) {
    setSlots((prev) => (prev.length > 1 ? prev.filter((s) => s.key !== key) : prev))
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!name) return

    const id = `med-${Date.now()}`
    const times = slots.map((slot, idx) => {
      const preset = TIME_PRESETS.find((p) => p.id === slot.presetId)
      const isCustom = slot.presetId === 'custom'
      const target = isCustom ? slot.customTime || '09:00' : preset.time
      const label = isCustom ? `직접 지정 (${target})` : preset.label
      return { id: `${id}-slot-${idx}`, label, target, done: false, doneAt: null }
    })

    onAddMedication({
      id,
      name,
      type,
      category: type === 'rx' ? '전문의약품' : '영양제',
      cycleLabel: times.map((t) => t.label).join(' · '),
      times,
    })

    setName('')
    setType('rx')
    setSlots([makeSlot()])
  }

  return (
    <div className="space-y-5">
      <form onSubmit={handleSubmit} className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
        <h2 className="flex items-center gap-1.5 text-sm font-bold text-slate-700">
          <Plus className="h-4 w-4 text-forest-700" /> 새 약/영양제 등록
        </h2>
        <div className="mt-3 space-y-3">
          <div>
            <label className="text-xs font-bold text-slate-600">이름</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="예: 마그네슘"
              className="mt-1 w-full rounded-lg border border-slate-200 px-2.5 py-2 text-sm focus:border-forest-500 focus:outline-none focus:ring-1 focus:ring-forest-500"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-600">종류</label>
            <div className="mt-1 grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setType('rx')}
                className={`rounded-lg border px-3 py-2 text-sm font-semibold transition ${
                  type === 'rx'
                    ? 'border-sky-300 bg-sky-50 text-sky-700'
                    : 'border-slate-200 text-slate-500 hover:border-sky-200'
                }`}
              >
                전문의약품
              </button>
              <button
                type="button"
                onClick={() => setType('supplement')}
                className={`rounded-lg border px-3 py-2 text-sm font-semibold transition ${
                  type === 'supplement'
                    ? 'border-forest-300 bg-forest-50 text-forest-700'
                    : 'border-slate-200 text-slate-500 hover:border-forest-200'
                }`}
              >
                영양제
              </button>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-600">복용 시간 (하루 여러 번 가능)</label>
              <button
                type="button"
                onClick={addSlot}
                className="flex items-center gap-1 rounded-full border border-forest-200 px-2 py-1 text-[11px] font-semibold text-forest-700 hover:bg-forest-50"
              >
                <Plus className="h-3 w-3" /> 시간 추가
              </button>
            </div>
            <div className="mt-2 space-y-2">
              {slots.map((slot) => (
                <div key={slot.key} className="flex items-center gap-2">
                  <select
                    value={slot.presetId}
                    onChange={(e) => updateSlot(slot.key, { presetId: e.target.value })}
                    className="w-full rounded-lg border border-slate-200 px-2.5 py-2 text-sm focus:border-forest-500 focus:outline-none focus:ring-1 focus:ring-forest-500"
                  >
                    {TIME_PRESETS.map((preset) => (
                      <option key={preset.id} value={preset.id}>
                        {preset.label}
                      </option>
                    ))}
                  </select>
                  {slot.presetId === 'custom' && (
                    <input
                      type="time"
                      value={slot.customTime}
                      onChange={(e) => updateSlot(slot.key, { customTime: e.target.value })}
                      className="flex-shrink-0 rounded-lg border border-slate-200 px-2.5 py-2 text-sm focus:border-forest-500 focus:outline-none focus:ring-1 focus:ring-forest-500"
                    />
                  )}
                  {slots.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeSlot(slot.key)}
                      className="flex-shrink-0 rounded-lg p-2 text-slate-300 hover:bg-rose-50 hover:text-rose-500"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="mt-4 w-full rounded-lg bg-forest-700 py-2.5 text-sm font-semibold text-white hover:bg-forest-800"
        >
          등록하기
        </button>
      </form>

      <section>
        <h2 className="mb-2 text-sm font-bold text-slate-700">등록된 약/영양제 ({medications.length})</h2>
        <div className="space-y-2">
          {medications.map((med) => (
            <div
              key={med.id}
              className="flex items-center justify-between rounded-xl border border-slate-100 bg-white p-3 shadow-sm"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full ${
                    med.type === 'rx' ? 'bg-sky-50 text-sky-700' : 'bg-forest-50 text-forest-700'
                  }`}
                >
                  <Pill className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-slate-800">{med.name}</p>
                  <p className="text-xs text-slate-400">
                    {med.category} · {med.cycleLabel}
                  </p>
                </div>
              </div>
              <button
                onClick={() => onRemoveMedication(med.id)}
                className="flex-shrink-0 rounded-full p-2 text-slate-300 hover:bg-rose-50 hover:text-rose-500"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
