import { createContext, useContext, useEffect, useState } from 'react'

const STORAGE_KEY = 'calculator-theme'

const ThemeContext = createContext({
  isDark: true,
  toggleTheme: () => {},
})

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved !== null) return saved === 'dark'
    } catch (_) {}
    return true
  })

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, isDark ? 'dark' : 'light')
    } catch (_) {}
    if (isDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDark])

  const toggleTheme = () => setIsDark((prev) => !prev)

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}
