'use client'
import * as React from 'react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'

interface Props {
  children: React.ReactNode;
}

export function ThemeToggleButton() {
  const [mounted, setMounted] = React.useState(false)
  const [mode, setMode] = React.useState('light')
  const [isUnal, setIsUnal] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
    // Recuperar el tema guardado
    const savedMode = localStorage.getItem('theme-mode') || 'light'
    const savedUnal = localStorage.getItem('unal-mode') === 'true'
    setMode(savedMode)
    setIsUnal(savedUnal)
    document.documentElement.classList.toggle('dark', savedMode === 'dark')
    document.documentElement.classList.toggle('unal', savedUnal)
  }, [])

  const toggleDarkMode = () => {
    const newMode = mode === 'light' ? 'dark' : 'light'
    setMode(newMode)
    localStorage.setItem('theme-mode', newMode)
    document.documentElement.classList.toggle('dark', newMode === 'dark')
  }

  const toggleUnalMode = () => {
    const newUnal = !isUnal
    setIsUnal(newUnal)
    localStorage.setItem('unal-mode', String(newUnal))
    document.documentElement.classList.toggle('unal', newUnal)
  }

  const buttonBaseClasses = "px-4 py-2 rounded-lg shadow-lg backdrop-blur-sm transition-all duration-200 fixed top-4";

  return (
    <>
      {/* Light/Dark toggle */}
      <button
        onClick={toggleDarkMode}
        className={`${buttonBaseClasses} right-4 
                  bg-white/90 dark:bg-gray-800
                  text-gray-900 dark:text-white
                  hover:bg-white dark:hover:bg-gray-700`}
      >
        {mode === 'dark' ? 'Modo Claro' : 'Modo Oscuro'}
      </button>

      {/* Normal/UNAL mode toggle */}
      <button
        onClick={toggleUnalMode}
        className={`${buttonBaseClasses} left-4
                  ${isUnal ? 'bg-white/90 hover:bg-white/100' : 'bg-green-600/90 hover:bg-green-500'}
                  ${isUnal ? 'text-gray-900' : 'text-white'}`}
      >
        {isUnal ? 'Modo Normal' : 'Modo UNAL'}
      </button>
    </>
  );
}

export function ThemeProvider({ children }: Props) {
  return (
    <NextThemesProvider 
      attribute="data-theme"
      defaultTheme="light"
      enableSystem={false}
      themes={['light', 'dark', 'unal-light', 'unal-dark']}
    >
      {children}
    </NextThemesProvider>
  )
}
