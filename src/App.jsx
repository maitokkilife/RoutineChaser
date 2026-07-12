import { useState, useEffect } from 'react'
import { Activity } from 'lucide-react'
import Home from './components/Home'
import MealCapture from './components/MealCapture'
import SleepLog from './components/SleepLog'
import WeeklyReport from './components/WeeklyReport'
import MonthlyRetro from './components/MonthlyRetro'
import Settings from './components/Settings'
import { NAV_ITEMS } from './components/NavItems'
import { mealSlotLabel } from './mealConfig'
import { formatDateFull } from './dateUtils'
import { getTodayDayKr } from './weekConfig'
import * as storage from './storage'

const TODAY_LABEL = formatDateFull()
const HEADER_TABS = ['home', 'weekly', 'monthly', 'sleep']

export default function App() {
  const [tab, setTab] = useState('home')
  const [medications, setMedications] = useState(() => storage.loadAll().medications)
  const [mealSlots, setMealSlots] = useState(() => storage.loadAll().mealSlots)
  const [timeline, setTimeline] = useState(() => storage.loadAll().timeline)
  const [retros, setRetros] = useState(() => storage.loadAll().retros)
  const [weeklyPatternLog, setWeeklyPatternLog] = useState(() => storage.loadAll().weeklyPatternLog)
  const [weeklyMealTimeLog, setWeeklyMealTimeLog] = useState(() => storage.loadAll().weeklyMealTimeLog)
  const [sleepLog, setSleepLog] = useState(() => storage.loadAll().sleepLog)
  const [pendingSleepStart, setPendingSleepStart] = useState(() => storage.loadAll().pendingSleepStart)
  const [goal, setGoal] = useState(() => storage.loadAll().goal)
  const [mealPrefillSlot, setMealPrefillSlot] = useState(null)
  const [mealCaptureKey, setMealCaptureKey] = useState(0)

  useEffect(() => {
    storage.saveAll({
      medications,
      mealSlots,
      timeline,
      retros,
      weeklyPatternLog,
      weeklyMealTimeLog,
      sleepLog,
      pendingSleepStart,
      goal,
    })
  }, [medications, mealSlots, timeline, retros, weeklyPatternLog, weeklyMealTimeLog, sleepLog, pendingSleepStart, goal])

  function switchTab(id) {
    setTab(id)
    if (id !== 'meal') setMealPrefillSlot(null)
  }

  function goToMealSlot(slotId) {
    setMealPrefillSlot(slotId)
    setMealCaptureKey((k) => k + 1)
    setTab('meal')
  }

  function toggleMedication(medId, timeId) {
    let newTimelineEntry = null
    setMedications((prev) =>
      prev.map((med) => {
        if (med.id !== medId) return med
        return {
          ...med,
          times: med.times.map((t) => {
            if (t.id !== timeId) return t
            const nextDone = !t.done
            if (nextDone) {
              const now = new Date()
              const doneAt = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`
              newTimelineEntry = {
                id: `tl-${Date.now()}-med-${timeId}`,
                type: 'medication',
                time: doneAt,
                title: `${med.name} 복용 완료`,
                subtitle: t.label,
              }
              return { ...t, done: true, doneAt }
            }
            return { ...t, done: false, doneAt: null }
          }),
        }
      }),
    )
    if (newTimelineEntry) setTimeline((prevTl) => [newTimelineEntry, ...prevTl])
  }

  function addTimelineEntry(entry) {
    setTimeline((prev) => [entry, ...prev])
  }

  function logMeal({ slotId, menuName, image, time }) {
    addTimelineEntry({
      id: `tl-${Date.now()}-meal`,
      type: 'meal',
      time,
      title: `${mealSlotLabel(slotId)} 식사 기록`,
      subtitle: menuName,
      meta: { image: !!image, imageUrl: image },
    })
    if (['breakfast', 'lunch', 'dinner'].includes(slotId)) {
      setMealSlots((prev) =>
        prev.map((s) => (s.id === slotId ? { ...s, done: true, doneAt: time, menu: menuName } : s)),
      )
      const day = getTodayDayKr()
      setWeeklyMealTimeLog((prev) => ({ ...prev, [day]: { ...(prev[day] || {}), [slotId]: time } }))
    }
  }

  function toggleWeeklyPatternCell(day, hour, mode) {
    setWeeklyPatternLog((prev) => {
      const dayLog = { ...(prev[day] || {}) }
      if (dayLog[hour] === mode) {
        delete dayLog[hour]
      } else {
        dayLog[hour] = mode
      }
      return { ...prev, [day]: dayLog }
    })
  }

  function checkInSleep() {
    setPendingSleepStart(new Date().toISOString())
  }

  function checkOutSleep() {
    if (!pendingSleepStart) return
    const start = new Date(pendingSleepStart)
    const end = new Date()
    const durationMin = Math.max(0, Math.round((end - start) / 60000))
    const bedTime = `${String(start.getHours()).padStart(2, '0')}:${String(start.getMinutes()).padStart(2, '0')}`
    const wakeTime = `${String(end.getHours()).padStart(2, '0')}:${String(end.getMinutes()).padStart(2, '0')}`
    setSleepLog((prev) => ({ ...prev, [getTodayDayKr(end)]: { bedTime, wakeTime, durationMin } }))
    setPendingSleepStart(null)
  }

  function addMedication(med) {
    setMedications((prev) => [...prev, med])
  }

  function removeMedication(medId) {
    setMedications((prev) => prev.filter((m) => m.id !== medId))
  }

  function addRetro(retro) {
    setRetros((prev) => [retro, ...prev])
  }

  return (
    <div className="min-h-screen bg-[#f4f6f5] text-slate-900">
      <div className="mx-auto flex min-h-screen w-full max-w-6xl md:gap-6 md:px-6 md:py-6">
        {/* 데스크톱 사이드바 */}
        <aside className="sticky top-6 hidden h-fit w-56 flex-shrink-0 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm md:block">
          <div className="mb-6 flex items-center gap-2 px-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-forest-700 text-white">
              <Activity className="h-4 w-4" />
            </div>
            <span className="text-base font-extrabold tracking-tight text-slate-800">RoutineChaser</span>
          </div>
          <nav className="space-y-1">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon
              const active = tab === item.id
              return (
                <button
                  key={item.id}
                  onClick={() => switchTab(item.id)}
                  className={`flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-semibold transition ${
                    active ? 'bg-forest-700 text-white' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </button>
              )
            })}
          </nav>
        </aside>

        {/* 메인 컨텐츠 */}
        <main className="mx-auto w-full max-w-md flex-1 px-4 pb-24 pt-6 md:max-w-2xl md:px-0 md:pb-6">
          <header className="mb-5 flex items-center justify-between md:hidden">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-forest-700 text-white">
                <Activity className="h-4 w-4" />
              </div>
              <span className="text-lg font-extrabold tracking-tight text-slate-800">RoutineChaser</span>
            </div>
          </header>

          {!HEADER_TABS.includes(tab) && (
            <header className="mb-5 hidden md:block">
              <h1 className="text-xl font-extrabold tracking-tight text-slate-800">
                {NAV_ITEMS.find((n) => n.id === tab)?.label}
              </h1>
            </header>
          )}

          {tab === 'home' && (
            <Home
              medications={medications}
              onToggleMedication={toggleMedication}
              mealSlots={mealSlots}
              onGoToMealSlot={goToMealSlot}
              timeline={timeline}
              onAddTimelineEntry={addTimelineEntry}
              todayLabel={TODAY_LABEL}
              sleepLog={sleepLog}
              pendingSleepStart={pendingSleepStart}
              onCheckInSleep={checkInSleep}
              onCheckOutSleep={checkOutSleep}
              goal={goal}
              onSetGoal={setGoal}
            />
          )}
          {tab === 'meal' && <MealCapture key={mealCaptureKey} prefillSlot={mealPrefillSlot} onSave={logMeal} />}
          {tab === 'sleep' && (
            <SleepLog sleepLog={sleepLog} pendingSleepStart={pendingSleepStart} onCheckIn={checkInSleep} onCheckOut={checkOutSleep} />
          )}
          {tab === 'weekly' && (
            <WeeklyReport
              medications={medications}
              weeklyPatternLog={weeklyPatternLog}
              onTogglePatternCell={toggleWeeklyPatternCell}
              sleepLog={sleepLog}
              weeklyMealTimeLog={weeklyMealTimeLog}
            />
          )}
          {tab === 'monthly' && (
            <MonthlyRetro retros={retros} onAddRetro={addRetro} medications={medications} timeline={timeline} />
          )}
          {tab === 'settings' && (
            <Settings medications={medications} onAddMedication={addMedication} onRemoveMedication={removeMedication} />
          )}
        </main>
      </div>

      {/* 모바일 하단 탭바 */}
      <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-100 bg-white/95 backdrop-blur md:hidden">
        <div className="mx-auto flex max-w-md items-stretch justify-between px-1 py-1.5">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon
            const active = tab === item.id
            return (
              <button
                key={item.id}
                onClick={() => switchTab(item.id)}
                className={`flex flex-1 flex-col items-center gap-1 rounded-xl py-1.5 text-[10px] font-semibold transition ${
                  active ? 'text-forest-700' : 'text-slate-400'
                }`}
              >
                <Icon className={`h-5 w-5 ${active ? 'text-forest-700' : 'text-slate-400'}`} strokeWidth={active ? 2.5 : 2} />
                {item.label}
              </button>
            )
          })}
        </div>
      </nav>
    </div>
  )
}
