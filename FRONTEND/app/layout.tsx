import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider } from '@/components/theme-provider'
import { NoScrollProvider } from '@/components/no-scroll-provider'
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
          <NoScrollProvider>
            <div className="min-h-screen flex flex-col">
              <main className="flex-1">
                {children}
              </main>
            </div>
          </NoScrollProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
