'use client'
import * as React from 'react'
import { ThemeProvider as NextThemesProvider, useTheme } from 'next-themes'

interface Props {
  children: React.ReactNode;
}

export function ThemeToggleButton() {
  const [mounted, setMounted] = React.useState(false)
  const [isUnal, setIsUnal] = React.useState(false)
  const { theme, setTheme } = useTheme()

  React.useEffect(() => {
    setMounted(true)
    // Recuperar el modo UNAL guardado
    const savedUnal = localStorage.getItem('unal-mode') === 'true'
    setIsUnal(savedUnal)
    document.documentElement.classList.toggle('unal', savedUnal)
  }, [])

  const toggleDarkMode = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  const toggleUnalMode = () => {
    const newUnal = !isUnal
    setIsUnal(newUnal)
    localStorage.setItem('unal-mode', String(newUnal))
    document.documentElement.classList.toggle('unal', newUnal)
  }

  const buttonBaseClasses = "px-4 py-2 rounded-lg shadow-lg backdrop-blur-sm transition-all duration-200";

  if (!mounted) {
    return null
  }

  return (
    <>
      {/* Light/Dark toggle */}
      <button
        onClick={toggleDarkMode}
        className={`${buttonBaseClasses} 
                  bg-white/90 dark:bg-gray-800
                  text-gray-900 dark:text-white
                  hover:bg-white dark:hover:bg-gray-700`}
      >
        {theme === 'dark' ? 'Modo UNAL' : 'Modo Oscuro'}
      </button>

      {/* Normal/UNAL mode toggle */}
    </>
  );
}

export function ThemeProvider({ children }: Props) {
  return (
    <NextThemesProvider 
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      themes={['light', 'dark']}
    >
      {children}
    </NextThemesProvider>
  )
}
