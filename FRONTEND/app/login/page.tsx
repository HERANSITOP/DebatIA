"use client"

import { LoginForm } from "@/components/login-form"
import { ThemeToggleButton } from "@/components/theme-provider"
import { HelpModal } from "@/components/help-modal"
import { Button } from "@/components/ui/button"
import { MessageSquare } from "lucide-react"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col relative
                 bg-[#f0f2f5] dark:bg-gray-900
                 unal:bg-[url()] unal:bg-cover unal:bg-fixed unal:bg-center
                 before:content-[''] before:absolute before:inset-0 unal:before:bg-black/30">
      
      {/* Header with theme toggle and help button */}
      <div className="fixed top-4 right-4 z-50 flex items-center gap-3">
        <HelpModal>
          <Button variant="outline" size="sm" className="gap-2">
            <MessageSquare className="h-4 w-4" />
            Ayuda
          </Button>
        </HelpModal>
        <ThemeToggleButton />
      </div>
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="bg-gradient-to-br from-green-400 to-green-10000000 
                    dark:from-green-600 dark:to-green-10000000 
                    unal:from-green-600/90 unal:to-green-800/90 
                    p-8 px-8 rounded-3xl shadow-2xl 
                    dark:shadow-green-900/30 unal:shadow-green-900/50 
                    max-w-100 w-full mx-auto flex gap-8 items-center backdrop-blur-sm">
          {/* Left side - Login Form */}
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-8">
                  <div>
              <div className="  flex items-center justify-center" >
                <div className="text-accent-foreground font-bold">
                  <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Escudo_de_la_Universidad_Nacional_de_Colombia_%282016%29.svg/1596px-Escudo_de_la_Universidad_Nacional_de_Colombia_%282016%29.svg.png" 
                    alt="Logo" 
                    className="w-35 h-45 object-cover my-3"
                  />
                </div>
              </div>
                <h1 className="text-2xl font-bold text-white text-center">DebatIA</h1>
                <p className="text-green-50 text-center">Accede a tu cuenta con el correo de la universidad</p>
              </div>
            </div>
            <LoginForm />
          </div>

          {/* Right side - Illustration/Background */}
          
        </div>
      </div>


    </div>
  )
}
