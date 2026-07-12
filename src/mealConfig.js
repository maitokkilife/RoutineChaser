export const MEAL_SLOT_OPTIONS = [
  { id: 'breakfast', label: '아침' },
  { id: 'lunch', label: '점심' },
  { id: 'dinner', label: '저녁' },
  { id: 'other', label: '기타' },
]

export function defaultMealSlotByHour() {
  const hour = new Date().getHours()
  if (hour < 10) return 'breakfast'
  if (hour < 15) return 'lunch'
  return 'dinner'
}

export function mealSlotLabel(slotId) {
  return MEAL_SLOT_OPTIONS.find((opt) => opt.id === slotId)?.label ?? '기타'
}
