import { useState } from 'react'
import { Check, Plus, Cookie, AlertTriangle, Moon, Sun, Target } from 'lucide-react'
import Timeline from './Timeline'
import Modal from './Modal'
import { formatDateShort } from '../dateUtils'
import { getTodayDayKr } from '../weekConfig'

function nowTime() {
  const d = new Date()
  return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`
}

function getGreeting() {
  const hour = new Date().getHours()
  return hour < 12 ? '안녕하세요. 좋은 아침이에요!' : '안녕하세요. 좋은 저녁이에요!'
}

export default function Home({
  medications,
  onToggleMedication,
  mealSlots,
  onGoToMealSlot,
  timeline,
  onAddTimelineEntry,
  todayLabel,
  sleepLog,
  pendingSleepStart,
  onCheckInSleep,
  onCheckOutSleep,
  goal,
  onSetGoal,
}) {
  const [activeModal, setActiveModal] = useState(null) // 'hunger' | 'symptom' | 'goal' | null
  const isSleeping = !!pendingSleepStart
  const todaySleepRecord = sleepLog[getTodayDayKr()]

  const [symptomText, setSymptomText] = useState('')
  const [goalDraft, setGoalDraft] = useState(goal)

  const mealDoneCount = mealSlots.filter((s) => s.done).length

  function openGoalModal() {
    setGoalDraft(goal)
    setActiveModal('goal')
  }

  function submitGoal(e) {
    e.preventDefault()
    onSetGoal(goalDraft.trim())
    setActiveModal(null)
  }

  function clearGoal() {
    onSetGoal('')
    setGoalDraft('')
    setActiveModal(null)
  }

  function logHungerCoping(choice) {
    onAddTimelineEntry({
      id: `tl-${Date.now()}-hunger`,
      type: 'hunger',
      time: nowTime(),
      title: '배고픔 대처',
      subtitle: choice,
    })
    setActiveModal(null)
  }

  function submitSymptom(e) {
    e.preventDefault()
    if (!symptomText) return
    onAddTimelineEntry({
      id: `tl-${Date.now()}-symptom`,
      type: 'symptom',
      time: nowTime(),
      title: '특이 증상',
      subtitle: symptomText,
    })
    setSymptomText('')
    setActiveModal(null)
  }

  return (
    <div className="space-y-5">
      {/* 제목 */}
      <div className="pt-1">
        <h1 className="text-2xl font-extrabold text-slate-800">오늘의 루틴</h1>
        <p className="mt-0.5 text-sm text-slate-400">{formatDateShort()}</p>
      </div>

      {/* 상단 요약 */}
      <div className="rounded-2xl bg-forest-700 p-5 text-white shadow-sm">
        <p className="text-xs font-medium text-forest-100">{todayLabel}</p>
        <div className="mt-2 flex items-start justify-between gap-3">
          <p className="text-lg font-bold leading-snug">{getGreeting()}</p>
          <button
            onClick={openGoalModal}
            className="flex flex-shrink-0 items-center gap-1 rounded-full bg-white/15 px-3 py-1.5 text-xs font-semibold text-white hover:bg-white/25"
          >
            <Plus className="h-3.5 w-3.5" /> 목표 추가
          </button>
        </div>
        <div className="mt-3 flex items-center gap-2 rounded-xl bg-white/10 px-3 py-2.5">
          <Target className="h-4 w-4 flex-shrink-0 text-forest-100" />
          {goal ? (
            <p className="text-sm font-semibold">{goal}</p>
          ) : (
            <p className="text-sm text-forest-100">아직 설정된 목표가 없어요. 목표를 추가해보세요!</p>
          )}
        </div>
      </div>

      {/* 오늘 식사 기록 */}
      <section className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-slate-700">오늘 식사 기록</h2>
          <span className="text-xs font-bold text-amber-700">
            {mealDoneCount}/{mealSlots.length}
          </span>
        </div>
        <div className="mt-3 grid grid-cols-3 gap-2">
          {mealSlots.map((slot) => (
            <button
              key={slot.id}
              onClick={() => onGoToMealSlot(slot.id)}
              className={`flex flex-col items-center gap-1 rounded-xl border px-2 py-3 transition ${
                slot.done
                  ? 'border-amber-200 bg-amber-50 text-amber-800'
                  : 'border-slate-200 bg-white text-slate-400 hover:border-amber-300 hover:text-amber-700'
              }`}
            >
              <span className="text-sm font-bold">{slot.label}</span>
              {slot.done ? (
                <>
                  <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
                  <span className="truncate text-[10px]">{slot.doneAt}</span>
                </>
              ) : (
                <span className="text-[10px]">미기록 · 탭하기</span>
              )}
            </button>
          ))}
        </div>
      </section>

      {/* 복약 체크리스트 */}
      <section>
        <h2 className="mb-2 text-sm font-bold text-slate-700">오늘의 복약 체크</h2>
        <div className="space-y-2">
          {medications.map((med) => (
            <div key={med.id} className="rounded-xl border border-slate-100 bg-white p-3 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="truncate text-sm font-semibold text-slate-800">{med.name}</p>
                    <span
                      className={`flex-shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                        med.type === 'rx' ? 'bg-sky-50 text-sky-700' : 'bg-forest-50 text-forest-700'
                      }`}
                    >
                      {med.category}
                    </span>
                  </div>
                  <p className="mt-0.5 text-xs text-slate-400">{med.cycleLabel}</p>
                </div>
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {med.times.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => onToggleMedication(med.id, t.id)}
                    className={`flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs font-medium transition ${
                      t.done
                        ? 'border-forest-200 bg-forest-50 text-forest-700'
                        : 'border-slate-200 bg-white text-slate-500 hover:border-forest-300 hover:text-forest-700'
                    }`}
                  >
                    <span
                      className={`flex h-4 w-4 items-center justify-center rounded-full ${
                        t.done ? 'bg-forest-600 text-white' : 'bg-slate-100 text-transparent'
                      }`}
                    >
                      <Check className="h-3 w-3" strokeWidth={3} />
                    </span>
                    {t.label} {t.done ? `· ${t.doneAt}` : `· ${t.target}`}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 퀵 버튼 */}
      <section className="grid grid-cols-2 gap-2">
        <button
          onClick={() => setActiveModal('hunger')}
          className="flex flex-col items-center gap-1.5 rounded-xl border border-slate-100 bg-white py-3 text-xs font-semibold text-slate-600 shadow-sm hover:border-orange-200 hover:text-orange-700"
        >
          <Cookie className="h-5 w-5 text-orange-500" />
          지금 배고파요
        </button>
        <button
          onClick={() => setActiveModal('symptom')}
          className="flex flex-col items-center gap-1.5 rounded-xl border border-slate-100 bg-white py-3 text-xs font-semibold text-slate-600 shadow-sm hover:border-rose-200 hover:text-rose-700"
        >
          <AlertTriangle className="h-5 w-5 text-rose-600" />
          특이 증상 기록
        </button>
      </section>

      {/* 오늘 수면 기록 */}
      <section className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-slate-700">오늘 수면 기록</h2>
          {isSleeping && <span className="text-xs font-semibold text-indigo-600">취침 중</span>}
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2">
          <button
            onClick={onCheckInSleep}
            disabled={isSleeping}
            className={`flex items-center justify-center gap-1.5 rounded-xl border py-2.5 text-xs font-semibold transition ${
              isSleeping
                ? 'cursor-not-allowed border-slate-100 bg-slate-50 text-slate-300'
                : 'border-indigo-200 bg-indigo-50 text-indigo-700 hover:bg-indigo-100'
            }`}
          >
            <Moon className="h-3.5 w-3.5" /> 체크인 (취침)
          </button>
          <button
            onClick={onCheckOutSleep}
            disabled={!isSleeping}
            className={`flex items-center justify-center gap-1.5 rounded-xl border py-2.5 text-xs font-semibold transition ${
              !isSleeping
                ? 'cursor-not-allowed border-slate-100 bg-slate-50 text-slate-300'
                : 'border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-100'
            }`}
          >
            <Sun className="h-3.5 w-3.5" /> 체크아웃 (기상)
          </button>
        </div>
        {!isSleeping && todaySleepRecord && (
          <p className="mt-2 text-xs text-slate-400">
            {todaySleepRecord.bedTime} 취침 · {todaySleepRecord.wakeTime} 기상 · 총{' '}
            {(todaySleepRecord.durationMin / 60).toFixed(1)}시간
          </p>
        )}
      </section>

      {/* 타임라인 */}
      <section>
        <h2 className="mb-2 text-sm font-bold text-slate-700">오늘의 타임라인</h2>
        <Timeline entries={timeline} />
      </section>

      {/* 목표 설정 모달 */}
      {activeModal === 'goal' && (
        <Modal title="목표 설정" onClose={() => setActiveModal(null)}>
          <form onSubmit={submitGoal} className="space-y-3">
            <div>
              <label className="text-xs font-bold text-slate-600">목표</label>
              <input
                value={goalDraft}
                onChange={(e) => setGoalDraft(e.target.value)}
                placeholder="예: 이번 달 3kg 감량하기"
                className="mt-1 w-full rounded-lg border border-slate-200 px-2.5 py-2 text-sm focus:border-forest-500 focus:outline-none focus:ring-1 focus:ring-forest-500"
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-lg bg-forest-700 py-2.5 text-sm font-semibold text-white hover:bg-forest-800"
            >
              저장
            </button>
            {goal && (
              <button
                type="button"
                onClick={clearGoal}
                className="w-full rounded-lg border border-slate-200 py-2.5 text-sm font-semibold text-slate-500 hover:bg-slate-50"
              >
                목표 삭제
              </button>
            )}
          </form>
        </Modal>
      )}

      {/* 배고픔 대처 모달 */}
      {activeModal === 'hunger' && (
        <Modal title="지금 배고프신가요?" onClose={() => setActiveModal(null)}>
          <div className="rounded-xl bg-forest-50 p-3 text-sm text-forest-800">
            배고프실 때는 명심하세요! 과자 대신 준비해둔{' '}
            <span className="font-semibold">견과류</span>를 드세요.
          </div>
          <p className="mb-2 mt-4 text-xs font-semibold text-slate-500">어떻게 대처하셨나요?</p>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => logHungerCoping('견과류 먹음')}
              className="rounded-lg border border-forest-200 bg-forest-50 py-2 text-sm font-semibold text-forest-700 hover:bg-forest-100"
            >
              견과류 먹음
            </button>
            <button
              onClick={() => logHungerCoping('물 마시고 참음')}
              className="rounded-lg border border-slate-200 bg-white py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50"
            >
              물 마시고 참음
            </button>
            <button
              onClick={() => logHungerCoping('다른 간식 먹음')}
              className="rounded-lg border border-slate-200 bg-white py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50"
            >
              다른 간식 먹음
            </button>
            <button
              onClick={() => logHungerCoping('그냥 참음')}
              className="rounded-lg border border-slate-200 bg-white py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50"
            >
              그냥 참음
            </button>
          </div>
        </Modal>
      )}

      {/* 특이 증상 모달 */}
      {activeModal === 'symptom' && (
        <Modal title="특이 증상 기록" onClose={() => setActiveModal(null)}>
          <form onSubmit={submitSymptom} className="space-y-3">
            <div className="flex flex-wrap gap-1.5">
              {['입천장이 까짐', '두통', '식후 피로', '어지러움', '속쓰림'].map((preset) => (
                <button
                  type="button"
                  key={preset}
                  onClick={() => setSymptomText(preset)}
                  className="rounded-full border border-slate-200 px-2.5 py-1 text-xs text-slate-500 hover:border-rose-300 hover:text-rose-600"
                >
                  {preset}
                </button>
              ))}
            </div>
            <textarea
              value={symptomText}
              onChange={(e) => setSymptomText(e.target.value)}
              placeholder="자유롭게 증상을 입력하세요"
              rows={3}
              className="w-full rounded-lg border border-slate-200 px-2.5 py-2 text-sm focus:border-forest-500 focus:outline-none focus:ring-1 focus:ring-forest-500"
            />
            <button
              type="submit"
              className="w-full rounded-lg bg-forest-700 py-2.5 text-sm font-semibold text-white hover:bg-forest-800"
            >
              타임라인에 추가
            </button>
          </form>
        </Modal>
      )}
    </div>
  )
}
