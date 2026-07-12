import { load, save } from './localStorageAdapter'
import { MEAL_SLOT_OPTIONS } from '../mealConfig'

const KEYS = {
  medications: 'routine-chaser:medications',
  mealSlots: 'routine-chaser:mealSlots',
  timeline: 'routine-chaser:timeline',
  retros: 'routine-chaser:retros',
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
  }
}

export function saveAll({ medications, mealSlots, timeline, retros }) {
  save(KEYS.medications, medications)
  save(KEYS.mealSlots, mealSlots)
  save(KEYS.timeline, timeline)
  save(KEYS.retros, retros)
}
