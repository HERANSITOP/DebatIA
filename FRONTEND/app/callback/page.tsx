"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Loader2, CheckCircle, XCircle } from "lucide-react"

export default function CallbackPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [error, setError] = useState<string>('')

  useEffect(() => {
    const handleCallback = async () => {
      const code = searchParams.get('code')
      const error = searchParams.get('error')
      const errorDescription = searchParams.get('error_description')

      if (error) {
        setStatus('error')
        setError(errorDescription || error)
        return
      }

      if (!code) {
        setStatus('error')
        setError('No authorization code received')
        return
      }

      try {
        // Exchange authorization code for tokens using our secure API route
        const tokenResponse = await fetch('/api/auth/token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ code }),
        })

        if (!tokenResponse.ok) {
          const errorData = await tokenResponse.json()
          throw new Error(errorData.error || 'Token exchange failed')
        }

        const { access_token, id_token, user } = await tokenResponse.json()
        
        // Store tokens and user info securely
        localStorage.setItem('access_token', access_token)
        localStorage.setItem('id_token', id_token)
        localStorage.setItem('user_profile', JSON.stringify(user))
        
        setStatus('success')
        
        // Redirect to main app after successful login
        setTimeout(() => {
          router.push('/')
        }, 2000)

      } catch (err) {
        console.error('Callback error:', err)
        setStatus('error')
        setError('Authentication failed. Please try again.')
      }
    }

    handleCallback()
  }, [searchParams, router])

  const handleRetry = () => {
    router.push('/login')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 p-4">
      <Card className="w-full max-w-md bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-white/20 dark:border-gray-800">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
            {status === 'loading' && 'Procesando autenticación...'}
            {status === 'success' && '¡Autenticación exitosa!'}
            {status === 'error' && 'Error de autenticación'}
          </CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-400">
            {status === 'loading' && 'Por favor espera mientras procesamos tu inicio de sesión'}
            {status === 'success' && 'Serás redirigido automáticamente'}
            {status === 'error' && 'Hubo un problema con tu inicio de sesión'}
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          {status === 'loading' && (
            <div className="flex justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-green-600" />
            </div>
          )}
          
          {status === 'success' && (
            <div className="flex justify-center">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          )}
          
          {status === 'error' && (
            <>
              <div className="flex justify-center">
                <XCircle className="h-8 w-8 text-red-600" />
              </div>
              <p className="text-sm text-red-600 dark:text-red-400">
                {error}
              </p>
              <Button 
                onClick={handleRetry}
                className="w-full bg-green-600 hover:bg-green-700 text-white"
              >
                Intentar de nuevo
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
