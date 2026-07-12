// 초기 목(mock) 데이터 — 프로토타입 시연용

export const initialMedications = [
  {
    id: 'med-1',
    name: '메트포르민 500mg',
    type: 'rx',
    category: '당뇨약',
    cycleLabel: '아침 식후 30분 · 저녁 식후 30분',
    times: [
      { id: 'med-1-am', label: '아침 식후 30분', target: '08:30', done: true, doneAt: '08:41' },
      { id: 'med-1-pm', label: '저녁 식후 30분', target: '19:30', done: false, doneAt: null },
    ],
  },
  {
    id: 'med-2',
    name: '오메가3',
    type: 'supplement',
    category: '영양제',
    cycleLabel: '아침 식후 30분',
    times: [
      { id: 'med-2-am', label: '아침 식후 30분', target: '08:30', done: true, doneAt: '08:42' },
    ],
  },
  {
    id: 'med-3',
    name: '혈압약 (암로디핀)',
    type: 'rx',
    category: '전문의약품',
    cycleLabel: '아침 공복',
    times: [
      { id: 'med-3-am', label: '아침 공복', target: '07:30', done: false, doneAt: null },
    ],
  },
  {
    id: 'med-4',
    name: '비타민 D',
    type: 'supplement',
    category: '영양제',
    cycleLabel: '저녁 식후 30분',
    times: [
      { id: 'med-4-pm', label: '저녁 식후 30분', target: '19:30', done: false, doneAt: null },
    ],
  },
  {
    id: 'med-5',
    name: '유산균',
    type: 'supplement',
    category: '영양제',
    cycleLabel: '취침 전',
    times: [
      { id: 'med-5-night', label: '취침 전', target: '22:30', done: false, doneAt: null },
    ],
  },
]

export const initialMealSlots = [
  { id: 'breakfast', label: '아침', done: true, doneAt: '08:10', menu: '현미밥, 계란찜, 시금치나물' },
  { id: 'lunch', label: '점심', done: false, doneAt: null, menu: null },
  { id: 'dinner', label: '저녁', done: false, doneAt: null, menu: null },
]

export const initialTimeline = [
  {
    id: 'tl-1',
    type: 'vital',
    time: '07:15',
    title: '혈당 측정',
    subtitle: '102 mg/dL',
    meta: { kind: 'custom', label: '혈당', value: 102, unit: 'mg/dL' },
  },
  {
    id: 'tl-2',
    type: 'medication',
    time: '08:41',
    title: '메트포르민 500mg 복용 완료',
    subtitle: '아침 식후 30분',
  },
  {
    id: 'tl-3',
    type: 'medication',
    time: '08:42',
    title: '오메가3 복용 완료',
    subtitle: '아침 식후 30분',
  },
  {
    id: 'tl-4',
    type: 'meal',
    time: '08:10',
    title: '아침 식사 기록',
    subtitle: '현미밥, 계란찜, 시금치나물',
    meta: { image: true },
  },
  {
    id: 'tl-5',
    type: 'vital',
    time: '07:10',
    title: '몸무게 측정',
    subtitle: '71.2 kg',
    meta: { kind: 'weight', value: 71.2 },
  },
  {
    id: 'tl-6',
    type: 'hunger',
    time: '15:20',
    title: '배고픔 대처',
    subtitle: '견과류 한 줌 먹음',
  },
  {
    id: 'tl-7',
    type: 'symptom',
    time: '13:40',
    title: '특이 증상',
    subtitle: '식후 약간의 피로감',
  },
]

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

export const initialRetros = [
  {
    id: 'retro-1',
    monthLabel: '2026년 5월',
    keep: '주간 식사 시간을 일정하게 유지함',
    problem: '야근 후 배고플 때 초콜릿을 먹는 일이 잦았음',
    action: '회사 서랍에 무가당 견과류를 상시 비치하기',
  },
  {
    id: 'retro-2',
    monthLabel: '2026년 6월',
    keep: '아침 공복 혈당을 매일 같은 시간에 측정함',
    problem: '주말에는 혈압약 복용을 자주 잊음',
    action: '주말용 알림을 평일보다 30분 앞당겨 설정하기',
  },
]
