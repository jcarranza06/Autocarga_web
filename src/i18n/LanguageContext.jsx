import { createContext, useContext } from 'react'
import en from './en.js'
import es from './es.js'

export const DICTIONARIES = { en, es }

const LanguageContext = createContext(null)

// lang/page come from the URL (see App.jsx); navigate changes the URL.
export function LanguageProvider({ lang, page, navigate, children }) {
  const value = { lang, page, navigate, t: DICTIONARIES[lang] }
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLang() {
  return useContext(LanguageContext)
}

// Replace {placeholders} in a string, e.g. fill('Why {brand}', { brand: 'X' })
export function fill(text, values) {
  return text.replace(/\{(\w+)\}/g, (_, k) => values[k] ?? '')
}
