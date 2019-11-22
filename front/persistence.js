export function recovery(key) {
  const val = localStorage.getItem(key)
  if (!val) return
  try {
    return JSON.parse(val)
  } catch (e) {
    return val
  }
}

export function persist(key, value) {
  const val = typeof value === 'object' ? JSON.stringify(value) : value
  if (key) {
    localStorage.setItem(key, val)
  }
}
