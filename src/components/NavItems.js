import { Home as HomeIcon, Camera, BarChart3, NotebookPen, Moon, Settings as SettingsIcon } from 'lucide-react'

export const NAV_ITEMS = [
  { id: 'home', label: '홈', icon: HomeIcon },
  { id: 'meal', label: '식사 기록', icon: Camera },
  { id: 'sleep', label: '수면 기록', icon: Moon },
  { id: 'weekly', label: '주간 통계', icon: BarChart3 },
  { id: 'monthly', label: '월간 피드백', icon: NotebookPen },
  { id: 'settings', label: '설정', icon: SettingsIcon },
]
