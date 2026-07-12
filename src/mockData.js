// 리포트 화면용 통계 목(mock) 데이터 — 실제 기록 기반 집계는 이번 범위 밖

// 요일 x 시간대 식사 기록 히트맵 (0~23시)
export const weeklyMealHeatmap = {
  월: [7, 8, 12, 18, 19],
  화: [7, 8, 13, 15, 19, 20],
  수: [8, 12, 13, 19],
  목: [7, 8, 12, 19, 20, 22],
  금: [8, 12, 13, 18, 19],
  토: [9, 10, 14, 19, 20],
  일: [9, 13, 18],
}

// 요일 x 시간대 복약 기록 (약 id별) — 이번 주 실제 복용 시각
export const weeklyMedicationLog = {
  'med-1': { 월: [8, 19], 화: [8, 19], 수: [8, 19], 목: [8, 19], 금: [8, 19], 토: [8, 19], 일: [8] },
  'med-2': { 월: [8], 화: [8], 수: [8], 목: [8], 금: [8], 토: [8], 일: [8] },
  'med-3': { 월: [8], 화: [8], 목: [8], 금: [8], 토: [8] },
  'med-4': { 화: [19], 목: [19] },
  'med-5': { 월: [22], 화: [22], 수: [22], 목: [22], 금: [22], 토: [22], 일: [22] },
}

export const weeklyTrend = [
  { day: '월', glucose: 108, weight: 71.6 },
  { day: '화', glucose: 101, weight: 71.5 },
  { day: '수', glucose: 112, weight: 71.4 },
  { day: '목', glucose: 98, weight: 71.3 },
  { day: '금', glucose: 104, weight: 71.3 },
  { day: '토', glucose: 96, weight: 71.2 },
  { day: '일', glucose: 102, weight: 71.2 },
]

export const monthlySummary = {
  monthLabel: '2026년 7월',
  avgGlucose: 103,
  avgWeight: 71.3,
  medicationRate: 92,
  mealLogCount: 58,
}
