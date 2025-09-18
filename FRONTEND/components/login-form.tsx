"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, EyeOff, Mail, Lock } from "lucide-react"

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false)

  const handleGoogleLogin = async () => {
    setIsLoading(true)
    // Add Google login logic here
    try {
      console.log("Initiating Google login...")
      // Simulate login delay
      await new Promise((resolve) => setTimeout(resolve, 1000))
    } catch (error) {
      console.error("Google login error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-white/20 dark:border-gray-800">
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-2xl font-bold text-balance text-gray-900 dark:text-white">Bienvenido</CardTitle>
        <CardDescription className="text-sm text-gray-600 dark:text-gray-400">
          Inicia sesiónn con tu cuenta de Googlee para continuar
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-2 bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 shadow-sm"
            disabled={isLoading}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-5 h-5">
              <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
              <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
              <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/>
              <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
            </svg>
            {isLoading ? "Iniciando sesión..." : "Iniciar sesión con Google"}
          </Button>
          
          <div className="text-center text-sm text-gray-500 dark:text-gray-400">
            Al continuar, aceptas nuestros{" "}
            <a href="#" className="text-green-600 hover:text-green-700 dark:text-green-500 dark:hover:text-green-400 underline">
              Términos de servicio
            </a>{" "}
            y{" "}
            <a href="#" className="text-green-600 hover:text-green-700 dark:text-green-500 dark:hover:text-green-400 underline">
              Política de privacidad
            </a>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
