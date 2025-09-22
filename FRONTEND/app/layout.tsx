import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider } from '@/components/theme-provider'
import './globals.css'

export const metadata: Metadata = {
  title: 'DebatIA - Plataforma de Debates Inteligentes',
  description: 'DebatIA es una plataforma innovadora que facilita debates estructurados y análisis inteligente de argumentos usando tecnología de inteligencia artificial.',
  generator: 'DebatIA Team',
  authors: [{ name: 'Equipo DebatIA' }],
  keywords: ['debate', 'inteligencia artificial', 'argumentación', 'análisis', 'discusión'],
  openGraph: {
    title: 'DebatIA - Plataforma de Debates Inteligentes',
    description: 'Plataforma innovadora para debates estructurados con IA',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <ThemeProvider>
          <div className="min-h-screen flex flex-col">
            <main className="flex-1">
              {children}
            </main>
            {/* Footer con Copyright */}
            <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
              <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    © 2025 DebatIA. Todos los derechos reservados.
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                    Plataforma de debates inteligentes desarrollada con Next.js, React y tecnologías de IA
                  </p>
                  <div className="mt-3">
                    <a 
                      href="/creditos" 
                      className="text-sm text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300 transition-colors"
                    >
                      Ver Créditos del Proyecto
                    </a>
                  </div>
                </div>
              </div>
            </footer>
          </div>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
