import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { HelpCircle, MessageCircle, Users, Heart, ExternalLink } from "lucide-react"

interface HelpModalProps {
  children: React.ReactNode
}

export function HelpModal({ children }: HelpModalProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center text-gray-900 dark:text-white">Centro de Ayuda</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Instructions Section */}
          <Card className="config-card bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
                <HelpCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                Cómo usar DebatIA
              </CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-300">
                Guía paso a paso para utilizar la plataforma
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center text-sm font-bold">1</div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Escribe tu tema</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Ingresa el tema sobre el que quieres que debatan las IAs en el campo "Sobre qué tema quieres que debatan las IAs"</p>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center text-sm font-bold">2</div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Configura los participantes</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Personaliza los prompts de IA 1 e IA 2 para definir sus personalidades y enfoques de debate</p>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center text-sm font-bold">3</div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Inicia el debate</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Haz clic en "Iniciar Debate" para comenzar la conversación automática entre las IAs</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center text-sm font-bold">4</div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Observa el debate</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Las IAs debatirán automáticamente, mostrando diferentes perspectivas sobre el tema</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center text-sm font-bold">5</div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Personaliza la experiencia</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Cambia entre los modos UNAL y Dark usando el botón superior derecho</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* WhatsApp Links Section */}
          <Card className="config-card bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
                <MessageCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                Contacto por WhatsApp
              </CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-300">
                Conéctate con nuestro equipo de soporte a través de WhatsApp
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button 
                  className="w-full justify-start gap-3 h-12 bg-green-500 hover:bg-green-600 text-white"
                  onClick={() => window.open('https://wa.me/573153512929', '_blank')}
                >
                  <MessageCircle className="h-5 w-5" />
                  <div className="text-left">
                    <div className="font-semibold">Hernán Darío Tapias</div>
                    <div className="text-sm opacity-90">Soporte Técnico</div>
                  </div>
                  <ExternalLink className="h-4 w-4 ml-auto" />
                </Button>
                
                <Button 
                  className="w-full justify-start gap-3 h-12 bg-green-500 hover:bg-green-600 text-white"
                  onClick={() => window.open('https://wa.me/573246266576', '_blank')}
                >
                  <Users className="h-5 w-5" />
                  <div className="text-left">
                    <div className="font-semibold">Miguel Ángel Ramírez</div>
                    <div className="text-sm opacity-90">Consultas Generales</div>
                  </div>
                  <ExternalLink className="h-4 w-4 ml-auto" />
                </Button>
                
                <Button 
                  className="w-full justify-start gap-3 h-12 bg-green-500 hover:bg-green-600 text-white"
                  onClick={() => window.open('https://wa.me/573218317348', '_blank')}
                >
                  <Heart className="h-5 w-5" />
                  <div className="text-left">
                    <div className="font-semibold">Sebastián Sepúlveda</div>
                    <div className="text-sm opacity-90">Feedback y Sugerencias</div>
                  </div>
                  <ExternalLink className="h-4 w-4 ml-auto" />
                </Button>
                
                <Button 
                  className="w-full justify-start gap-3 h-12 bg-green-500 hover:bg-green-600 text-white"
                  onClick={() => window.open('https://wa.me/573137546390', '_blank')}
                >
                  <HelpCircle className="h-5 w-5" />
                  <div className="text-left">
                    <div className="font-semibold">Samuel Muñoz</div>
                    <div className="text-sm opacity-90">Desarrollador Frontend</div>
                  </div>
                  <ExternalLink className="h-4 w-4 ml-auto" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Credits Section */}
          <Card className="config-card bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
                <Heart className="h-5 w-5 text-red-500 dark:text-red-400" />
                Créditos
              </CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-300">
                Reconocimiento a quienes hicieron posible este proyecto
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* UNeural Logo */}
              <div className="flex justify-center mb-6">
                <div className="bg-black p-8 rounded-2xl relative overflow-hidden">
                  {/* Neural Network Background */}
                  <div className="absolute inset-0 opacity-30">
                    <svg width="100%" height="100%" viewBox="0 0 200 80" className="absolute inset-0">
                      {/* Neural network nodes and connections */}
                      <defs>
                        <linearGradient id="neuralGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#1e40af" />
                          <stop offset="50%" stopColor="#7c3aed" />
                          <stop offset="100%" stopColor="#a855f7" />
                        </linearGradient>
                      </defs>
                      
                      {/* Network connections */}
                      <line x1="20" y1="25" x2="50" y2="35" stroke="url(#neuralGradient)" strokeWidth="1" opacity="0.6"/>
                      <line x1="50" y1="35" x2="80" y2="20" stroke="url(#neuralGradient)" strokeWidth="1" opacity="0.6"/>
                      <line x1="80" y1="20" x2="110" y2="40" stroke="url(#neuralGradient)" strokeWidth="1" opacity="0.6"/>
                      <line x1="110" y1="40" x2="140" y2="25" stroke="url(#neuralGradient)" strokeWidth="1" opacity="0.6"/>
                      <line x1="140" y1="25" x2="170" y2="35" stroke="url(#neuralGradient)" strokeWidth="1" opacity="0.6"/>
                      <line x1="30" y1="45" x2="60" y2="55" stroke="url(#neuralGradient)" strokeWidth="1" opacity="0.6"/>
                      <line x1="60" y1="55" x2="90" y2="45" stroke="url(#neuralGradient)" strokeWidth="1" opacity="0.6"/>
                      <line x1="90" y1="45" x2="120" y2="60" stroke="url(#neuralGradient)" strokeWidth="1" opacity="0.6"/>
                      <line x1="120" y1="60" x2="150" y2="50" stroke="url(#neuralGradient)" strokeWidth="1" opacity="0.6"/>
                      <line x1="150" y1="50" x2="180" y2="55" stroke="url(#neuralGradient)" strokeWidth="1" opacity="0.6"/>
                      
                      {/* Network nodes */}
                      <circle cx="20" cy="25" r="2" fill="url(#neuralGradient)" opacity="0.8"/>
                      <circle cx="50" cy="35" r="2.5" fill="url(#neuralGradient)" opacity="0.8"/>
                      <circle cx="80" cy="20" r="2" fill="url(#neuralGradient)" opacity="0.8"/>
                      <circle cx="110" cy="40" r="3" fill="url(#neuralGradient)" opacity="0.8"/>
                      <circle cx="140" cy="25" r="2" fill="url(#neuralGradient)" opacity="0.8"/>
                      <circle cx="170" cy="35" r="2.5" fill="url(#neuralGradient)" opacity="0.8"/>
                      <circle cx="30" cy="45" r="2" fill="url(#neuralGradient)" opacity="0.8"/>
                      <circle cx="60" cy="55" r="2.5" fill="url(#neuralGradient)" opacity="0.8"/>
                      <circle cx="90" cy="45" r="2" fill="url(#neuralGradient)" opacity="0.8"/>
                      <circle cx="120" cy="60" r="3" fill="url(#neuralGradient)" opacity="0.8"/>
                      <circle cx="150" cy="50" r="2" fill="url(#neuralGradient)" opacity="0.8"/>
                      <circle cx="180" cy="55" r="2.5" fill="url(#neuralGradient)" opacity="0.8"/>
                    </svg>
                  </div>
                  
                  <div className="text-center relative z-10">
                    <div className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-purple-500 bg-clip-text text-transparent mb-2 drop-shadow-lg">
                      UNeural
                    </div>
                    <div className="text-sm text-gray-300 font-medium">Diversidad en Debate</div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-lg mb-3 text-primary">Desarrollo</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• <strong>Frontend:</strong> Next.js + TypeScript</li>
                    <li>• <strong>UI/UX:</strong> Tailwind CSS + shadcn/ui</li>
                    <li>• <strong>IA Integration:</strong> OpenAI API</li>
                    <li>• <strong>Deployment:</strong> Vercel</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-lg mb-3 text-primary">Colaboradores</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• <strong>Grupo Estudiantil:</strong> UNeural - UNAL Medellín</li>
                    <li>• <strong>Equipo UNAL:</strong> Universidad Nacional de Colombia - Sede Medellín</li>
                    <li>• <strong>Diseño:</strong> Inspirado en los colores de la UNAL</li>
                    <li>• <strong>Concepto:</strong> UNeural - Diversidad en Debate</li>
                    <li>• <strong>Fecha:</strong> 23 de septiembre 2025</li>
                  </ul>
                </div>
              </div>

              <div className="pt-4 border-t">
                <p className="text-sm text-black dark:text-white text-center">
                  "La U que soñamos cuida y celebra lo que somos" - Universidad Nacional de Colombia
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  )
}