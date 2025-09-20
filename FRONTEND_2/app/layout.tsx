import type React from "react"
import { DM_Sans } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
// import { SessionProvider } from "next-auth/react"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["400", "500", "700"],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <head>
        <title>DebatIA - IAs Debatiendo</title>
        <meta
          name="description"
          content="Una aplicación donde 3 IAs con diferentes perspectivas debaten sobre cualquier tema que propongas"
        />
      </head>
      <body className={`font-sans ${dmSans.variable}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="unal"
          enableSystem={false}
          themes={["light", "dark", "unal"]}
        >
          {/* <SessionProvider> */}
          <Suspense fallback={null}>{children}</Suspense>
          {/* </SessionProvider> */}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}

export const metadata = {
      generator: 'v0.app'
    };
