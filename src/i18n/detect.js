// Used only when someone opens the root URL "/":
// 1) language they picked before, 2) browser language, 3) English.
export const STORAGE_KEY = 'autocarga-lang'

export function detectLanguage(available = ['es', 'en']) {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (available.includes(saved)) return saved
  } catch { /* storage blocked */ }

  const prefs = navigator.languages?.length ? navigator.languages : [navigator.language || 'en']
  for (const tag of prefs) {
    const code = tag.toLowerCase().slice(0, 2)
    if (available.includes(code)) return code
  }
  return 'en'
}

export function saveLanguage(lang) {
  try { localStorage.setItem(STORAGE_KEY, lang) } catch { /* ignore */ }
}
