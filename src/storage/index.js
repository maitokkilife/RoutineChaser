import { load, save } from './localStorageAdapter'
import { MEAL_SLOT_OPTIONS } from '../mealConfig'

const KEYS = {
  medications: 'routine-chaser:medications',
  mealSlots: 'routine-chaser:mealSlots',
  timeline: 'routine-chaser:timeline',
  retros: 'routine-chaser:retros',
  weeklyPatternLog: 'routine-chaser:weeklyPatternLog',
  weeklyMealTimeLog: 'routine-chaser:weeklyMealTimeLog',
  sleepLog: 'routine-chaser:sleepLog',
  pendingSleepStart: 'routine-chaser:pendingSleepStart',
}

const DEFAULT_MEAL_SLOTS = MEAL_SLOT_OPTIONS.filter((opt) => opt.id !== 'other').map((opt) => ({
  id: opt.id,
  label: opt.label,
  done: false,
  doneAt: null,
  menu: null,
}))

export function loadAll() {
  return {
    medications: load(KEYS.medications) ?? [],
    mealSlots: load(KEYS.mealSlots) ?? DEFAULT_MEAL_SLOTS,
    timeline: load(KEYS.timeline) ?? [],
    retros: load(KEYS.retros) ?? [],
    weeklyPatternLog: load(KEYS.weeklyPatternLog) ?? {},
    weeklyMealTimeLog: load(KEYS.weeklyMealTimeLog) ?? {},
    sleepLog: load(KEYS.sleepLog) ?? {},
    pendingSleepStart: load(KEYS.pendingSleepStart) ?? null,
  }
}

export function saveAll({
  medications,
  mealSlots,
  timeline,
  retros,
  weeklyPatternLog,
  weeklyMealTimeLog,
  sleepLog,
  pendingSleepStart,
}) {
  save(KEYS.medications, medications)
  save(KEYS.mealSlots, mealSlots)
  save(KEYS.timeline, timeline)
  save(KEYS.retros, retros)
  save(KEYS.weeklyPatternLog, weeklyPatternLog)
  save(KEYS.weeklyMealTimeLog, weeklyMealTimeLog)
  save(KEYS.sleepLog, sleepLog)
  save(KEYS.pendingSleepStart, pendingSleepStart)
}
