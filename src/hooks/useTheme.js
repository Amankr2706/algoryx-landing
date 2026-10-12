import { useEffect, useState } from 'react'

const readInitialTheme = () => {
  try {
    const saved = localStorage.getItem('theme')
    if (saved) return saved === 'dark'
  } catch {
    // Storage blocked: fall through to the system preference.
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

export default function useTheme() {
  const [dark, setDark] = useState(readInitialTheme)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    try {
      localStorage.setItem('theme', dark ? 'dark' : 'light')
    } catch {
    }
  }, [dark])

  return [dark, () => setDark((d) => !d)]
}
