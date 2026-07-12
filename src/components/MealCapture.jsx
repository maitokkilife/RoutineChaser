import { useState, useRef, useEffect } from 'react'
import { Camera, ImagePlus, Check } from 'lucide-react'
import { MEAL_SLOT_OPTIONS, defaultMealSlotByHour } from '../mealConfig'

function nowTime() {
  const d = new Date()
  return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`
}

export default function MealCapture({ prefillSlot, onSave }) {
  const [image, setImage] = useState(null)
  const [skipPhoto, setSkipPhoto] = useState(false)
  const [slot, setSlot] = useState(prefillSlot || defaultMealSlotByHour())
  const [menuName, setMenuName] = useState('')
  const [saved, setSaved] = useState(false)
  const cameraInputRef = useRef(null)
  const galleryInputRef = useRef(null)

  useEffect(() => {
    if (prefillSlot) setSlot(prefillSlot)
  }, [prefillSlot])

  function handleFile(e) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => setImage(reader.result)
    reader.readAsDataURL(file)
    e.target.value = ''
  }

  function resetForNext() {
    setImage(null)
    setSkipPhoto(false)
    setMenuName('')
    setSlot(defaultMealSlotByHour())
    setSaved(false)
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!menuName) return
    onSave({ slotId: slot, menuName, image, time: nowTime() })
    setSaved(true)
  }

  if (saved) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-forest-100 bg-forest-50 px-6 py-12 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-forest-700 text-white">
          <Check className="h-6 w-6" strokeWidth={3} />
        </div>
        <p className="mt-3 text-sm font-bold text-forest-800">식사 기록이 저장됐어요!</p>
        <button
          onClick={resetForNext}
          className="mt-4 rounded-lg bg-forest-700 px-4 py-2 text-sm font-semibold text-white hover:bg-forest-800"
        >
          다음 식사 기록하기
        </button>
      </div>
    )
  }

  if (!image && !skipPhoto) {
    return (
      <div className="space-y-3">
        <p className="text-sm text-slate-500">사진으로 오늘 식사를 바로 기록해보세요.</p>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => cameraInputRef.current?.click()}
            className="flex flex-col items-center gap-2 rounded-2xl border-2 border-dashed border-forest-300 bg-forest-50 py-10 text-forest-700 transition hover:bg-forest-100"
          >
            <Camera className="h-8 w-8" />
            <span className="text-sm font-bold">사진 촬영</span>
          </button>
          <button
            onClick={() => galleryInputRef.current?.click()}
            className="flex flex-col items-center gap-2 rounded-2xl border-2 border-dashed border-slate-300 bg-white py-10 text-slate-600 transition hover:border-forest-300 hover:text-forest-700"
          >
            <ImagePlus className="h-8 w-8" />
            <span className="text-sm font-bold">사진 첨부</span>
          </button>
        </div>
        <input
          ref={cameraInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          className="hidden"
          onChange={handleFile}
        />
        <input ref={galleryInputRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
        <button
          onClick={() => setSkipPhoto(true)}
          className="w-full text-center text-xs font-medium text-slate-400 underline underline-offset-2"
        >
          사진 없이 텍스트로만 기록할게요
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {image ? (
        <div className="relative overflow-hidden rounded-2xl border border-slate-100">
          <img src={image} alt="식사 사진" className="h-56 w-full object-cover" />
          <button
            type="button"
            onClick={() => setImage(null)}
            className="absolute right-2 top-2 rounded-full bg-black/50 px-2.5 py-1 text-xs font-semibold text-white"
          >
            다시 촬영
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setSkipPhoto(false)}
          className="flex h-24 w-full items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 text-sm text-slate-400 transition hover:border-forest-300 hover:text-forest-600"
        >
          + 사진 추가하기
        </button>
      )}

      <div>
        <label className="text-xs font-bold text-slate-600">어떤 식사인가요?</label>
        <div className="mt-1.5 grid grid-cols-4 gap-2">
          {MEAL_SLOT_OPTIONS.map((opt) => (
            <button
              type="button"
              key={opt.id}
              onClick={() => setSlot(opt.id)}
              className={`rounded-lg border px-2 py-2 text-xs font-semibold transition ${
                slot === opt.id
                  ? 'border-forest-300 bg-forest-50 text-forest-700'
                  : 'border-slate-200 text-slate-500 hover:border-forest-200'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="text-xs font-bold text-slate-600">메뉴명</label>
        <input
          value={menuName}
          onChange={(e) => setMenuName(e.target.value)}
          placeholder="예: 현미밥, 두부구이, 나물"
          className="mt-1 w-full rounded-lg border border-slate-200 px-2.5 py-2 text-sm focus:border-forest-500 focus:outline-none focus:ring-1 focus:ring-forest-500"
        />
      </div>
      <p className="text-xs text-slate-400">기록 시각: {nowTime()} (자동 기록)</p>
      <button
        type="submit"
        className="w-full rounded-lg bg-forest-700 py-2.5 text-sm font-semibold text-white hover:bg-forest-800"
      >
        저장하기
      </button>
    </form>
  )
}
