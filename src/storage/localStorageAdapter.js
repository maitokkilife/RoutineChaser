export function load(key) {
  const raw = localStorage.getItem(key)
  if (raw === null) return null
  try {
    return JSON.parse(raw)
  } catch {
    console.warn(`storage: failed to parse "${key}", ignoring`)
    return null
  }
}

export function save(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (err) {
    console.warn(`storage: failed to save "${key}"`, err)
  }
}
