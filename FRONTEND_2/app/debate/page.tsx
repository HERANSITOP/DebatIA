"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { MessageSquare, Users, Sparkles, Send, RotateCcw, Settings, FlaskConical, Heart, Wrench } from "lucide-react"
import { DebateMessage } from "@/components/debate-message"
import { ThemeToggle } from "@/components/theme-toggle"
import { HelpModal } from "@/components/help-modal"

interface Message {
  id: string
  role: "user" | "ai-1" | "ai-2" | "ai-3"
  content: string
  timestamp: Date
  aiName?: string
}

interface AIConfig {
  id: string
  name: string
  icon: any
  color: string
  description: string
  enabled: boolean
  customPrompt: string
  defaultPrompt: string
}

export default function DebatePage() {
  const [topic, setTopic] = useState("")
  const [messages, setMessages] = useState<Message[]>([])
  const [isDebating, setIsDebating] = useState(false)
  const [currentTopic, setCurrentTopic] = useState("")
  const [showConfig, setShowConfig] = useState(true)

  const [aiConfigs, setAiConfigs] = useState<AIConfig[]>([
    {
      id: "ai-1",
      name: "Dr. Analítica",
      icon: FlaskConical,
      color: "ai-1-bubble",
      description: "Enfoque científico y basado en datos",
      enabled: true,
      customPrompt: "",
      defaultPrompt:
        "Eres Dr. Analítica. Enfócate en evidencia empírica, análisis riguroso y metodología científica. Siempre busca datos concretos y estudios que respalden los argumentos.",
    },
    {
      id: "ai-2",
      name: "Prof. Humanista",
      icon: Heart,
      color: "ai-2-bubble",
      description: "Perspectiva humanística y ética",
      enabled: true,
      customPrompt: "",
      defaultPrompt:
        "Eres Prof. Humanista. Te enfocas en el impacto humano, valores morales y consideraciones éticas. Analiza cómo las decisiones afectan a las personas y la sociedad.",
    },
    {
      id: "ai-3",
      name: "Mx. Pragmático",
      icon: Wrench,
      color: "ai-3-bubble",
      description: "Enfoque práctico y realista",
      enabled: true,
      customPrompt: "",
      defaultPrompt:
        "Eres Mx. Pragmático. Buscas soluciones viables, consideras limitaciones reales y te enfocas en la implementación práctica. Analiza qué es realmente factible en el mundo real.",
    },
  ])

  const canStartDebate = () => {
    const enabledAIs = aiConfigs.filter((ai) => ai.enabled)
    return topic.trim() && enabledAIs.length >= 2
  }

  const updateAIConfig = (id: string, field: keyof AIConfig, value: any) => {
    setAiConfigs((prev) => prev.map((ai) => (ai.id === id ? { ...ai, [field]: value } : ai)))
  }

  const startDebate = async () => {
    if (!canStartDebate()) return

    setIsDebating(true)
    setCurrentTopic(topic)
    setShowConfig(false)

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: `Tema de debate: "${topic}"`,
      timestamp: new Date(),
    }

    setMessages([userMessage])

    // Start the debate with AI responses
    await generateDebateRound(topic, [userMessage])
  }

  const generateDebateRound = async (debateTopic: string, currentMessages: Message[]) => {
    const enabledAIs = aiConfigs
      .filter((ai) => ai.enabled)
      .map((ai) => ({
        role: ai.id as "ai-1" | "ai-2" | "ai-3",
        name: ai.name,
        perspective: ai.customPrompt || ai.defaultPrompt,
      }))

    // Generate responses for each enabled AI in sequence
    for (let i = 0; i < enabledAIs.length; i++) {
      const ai = enabledAIs[i]

      try {
        const response = await fetch("/api/debate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            topic: debateTopic,
            aiPersonality: ai,
            previousMessages: currentMessages,
            round: Math.floor(currentMessages.length / 4) + 1,
          }),
        })

        if (response.ok) {
          const data = await response.json()
          const aiMessage: Message = {
            id: `${Date.now()}-${i}`,
            role: ai.role,
            content: data.response,
            timestamp: new Date(),
            aiName: ai.name,
          }

          setMessages((prev) => [...prev, aiMessage])
          currentMessages.push(aiMessage)

          // Add a small delay between AI responses for better UX
          await new Promise((resolve) => setTimeout(resolve, 1500))
        }
      } catch (error) {
        console.error(`Error generating response for ${ai.name}:`, error)
      }
    }

    setIsDebating(false)
  }

  const continueDebate = async () => {
    if (messages.length === 0) return

    setIsDebating(true)
    await generateDebateRound(currentTopic, messages)
  }

  const resetDebate = () => {
    setMessages([])
    setCurrentTopic("")
    setIsDebating(false)
    setTopic("")
    setShowConfig(true)
  }

  return (
    <div className="h-screen bg-background overflow-hidden">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm z-10 rounded-b-3xl">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 flex-1">
              <div className="p-1.5 bg-primary/10 dark:bg-white rounded-3xl">
                <img 
                  src="/unal-logo.png" 
                  alt="UNAL Logo" 
                  className="h-14 w-14 rounded-2xl object-cover"
                />
              </div>
            </div>
            <div className="text-center flex-1">
              <h1 className="text-2xl font-bold text-balance">DebatIA</h1>
              <p className="text-sm text-muted-foreground">Configura y debate con IAs personalizadas</p>
            </div>
            <div className="flex items-center gap-4 flex-1 justify-end">
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="gap-1">
                  <Users className="h-3 w-3" />
                  {aiConfigs.filter((ai) => ai.enabled).length} IAs activas
                </Badge>
                <Badge variant="outline" className="gap-1">
                  <Sparkles className="h-3 w-3" />
                  Debate personalizado
                </Badge>
              </div>
              <HelpModal>
                <Button variant="outline" size="sm" className="gap-2">
                  <MessageSquare className="h-4 w-4" />
                  Ayuda
                </Button>
              </HelpModal>
              <ThemeToggle />

              {/* <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={session?.user?.image || ""} alt={session?.user?.name || ""} />
                      <AvatarFallback>
                        <User className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      {session?.user?.name && <p className="font-medium">{session.user.name}</p>}
                      {session?.user?.email && (
                        <p className="w-[200px] truncate text-sm text-muted-foreground">{session.user.email}</p>
                      )}
                    </div>
                  </div>
                  <Separator />
                  <DropdownMenuItem onClick={handleSignOut} className="gap-2 cursor-pointer">
                    <LogOut className="h-4 w-4" />
                    Cerrar sesión
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu> */}
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-4 max-w-6xl h-[calc(100vh-10rem)] overflow-hidden">
        {showConfig ? (
          <div className="h-full flex flex-col space-y-4">
            {/* Topic Input */}
            <Card className="p-4 flex-shrink-0 rounded-[36px] config-card">
              <h2 className="text-lg font-semibold mb-3 text-balance">¿Sobre qué tema quieres que debatan las IAs?</h2>
              <div className="flex gap-3 items-center">
                <Input
                  placeholder="Ej: ¿Es la inteligencia artificial beneficiosa para la humanidad?"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="text-base flex-1"
                  disabled={isDebating}
                />
                <Button onClick={startDebate} disabled={!canStartDebate() || isDebating} size="lg" className="gap-2 px-6 flex-shrink-0">
                  <Send className="h-4 w-4" />
                  Iniciar Debate
                </Button>
              </div>
            </Card>

            {/* AI Configuration */}
            <Card className="p-4 flex-1 overflow-hidden rounded-[36px] config-card">
              <div className="flex items-center gap-2 mb-4">
                <Settings className="h-4 w-4" />
                <h2 className="text-lg font-semibold">Configurar Participantes</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 h-full pb-12">
                {aiConfigs.map((ai) => {
                  const Icon = ai.icon
                  return (
                    <Card key={ai.id} className={`p-3 pb-2 flex flex-col bg-white/60 dark:bg-slate-800/60 unal:bg-green-50/70 backdrop-blur-lg border border-white/20 dark:border-slate-700/30 unal:border-green-200/30 rounded-3xl shadow-lg ${ai.enabled ? "ring-2 ring-primary/20" : "opacity-60"}`}>
                      <div className="space-y-2 flex-1 flex flex-col">
                        {/* AI Header */}
                        <div className="flex items-start gap-3 flex-shrink-0">
                          <Checkbox
                            checked={ai.enabled}
                            onCheckedChange={(checked) => updateAIConfig(ai.id, "enabled", checked)}
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <div className={`p-1.5 rounded-2xl ${ai.color}`}>
                                <Icon className="h-4 w-4" />
                              </div>
                              <h3 className="font-medium text-sm">{ai.name}</h3>
                            </div>
                            <p className="text-xs text-muted-foreground text-pretty">{ai.description}</p>
                          </div>
                        </div>

                        {/* Custom Prompt */}
                        {ai.enabled && (
                          <div className="space-y-2 flex-1 flex flex-col">
                            <label className="text-xs font-medium">Prompt personalizado (opcional):</label>
                            <Textarea
                              placeholder={`Deja vacío para usar el prompt por defecto de ${ai.name}`}
                              value={ai.customPrompt}
                              onChange={(e) => updateAIConfig(ai.id, "customPrompt", e.target.value)}
                              className="min-h-[50px] text-xs"
                              rows={2}
                            />
                            <div className="text-xs text-muted-foreground flex-1 overflow-hidden">
                              <p className="font-medium mb-1">
                                {ai.customPrompt ? "Prompt por defecto (reemplazado):" : "Prompt por defecto:"}
                              </p>
                              <p className={`text-xs leading-relaxed line-clamp-4 ${ai.customPrompt ? "opacity-60 line-through" : ""}`}>
                                {ai.defaultPrompt}
                              </p>
                              
                              {/* AI Logos - Solo cuando están habilitadas */}
                              {ai.enabled && (
                                <div className="mt-3 flex justify-center">
                                  {ai.id === "ai-1" && (
                                    <div className="relative">
                                      <img 
                                        src="/Dr. Analítica.png" 
                                        alt="Dr. Analítica Logo" 
                                        className="w-48 h-auto [filter:drop-shadow(0_0_20px_rgba(0,0,0,0.8))_drop-shadow(0_0_40px_rgba(0,0,0,0.6))] dark:[filter:drop-shadow(0_0_20px_rgba(255,255,255,0.8))_drop-shadow(0_0_40px_rgba(255,255,255,0.6))]"
                                      />
                                    </div>
                                  )}
                                  {ai.id === "ai-2" && (
                                    <div className="relative">
                                      <img 
                                        src="/Prof. Humanista.png" 
                                        alt="Prof. Humanista Logo" 
                                        className="w-48 h-auto [filter:drop-shadow(0_0_20px_rgba(0,0,0,0.8))_drop-shadow(0_0_40px_rgba(0,0,0,0.6))] dark:[filter:drop-shadow(0_0_20px_rgba(255,255,255,0.8))_drop-shadow(0_0_40px_rgba(255,255,255,0.6))]"
                                      />
                                    </div>
                                  )}
                                  {ai.id === "ai-3" && (
                                    <div className="relative">
                                      <img 
                                        src="/Mx. Pragmático.png" 
                                        alt="Mx. Pragmático Logo" 
                                        className="w-48 h-auto [filter:drop-shadow(0_0_20px_rgba(0,0,0,0.8))_drop-shadow(0_0_40px_rgba(0,0,0,0.6))] dark:[filter:drop-shadow(0_0_20px_rgba(255,255,255,0.8))_drop-shadow(0_0_40px_rgba(255,255,255,0.6))]"
                                      />
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </Card>
                  )
                })}
              </div>
            </Card>
          </div>
        ) : (
          <Card className="h-full debate-card">
            {/* Current Topic Display */}
            <div className="p-5 border-b bg-muted/100 debate-header">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Tema actual:</p>
                  <p className="font-medium text-pretty">{currentTopic}</p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={continueDebate}
                    disabled={isDebating}
                    className="gap-1 bg-transparent"
                  >
                    <MessageSquare className="h-3 w-3" />
                    Continuar
                  </Button>
                  <Button variant="outline" size="sm" onClick={resetDebate} className="gap-1 bg-transparent">
                    <RotateCcw className="h-3 w-3" />
                    Nuevo
                  </Button>
                </div>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 p-4 overflow-hidden">
              <div className="space-y-4 h-full flex flex-col">
                {messages.map((message, index) => (
                  <div key={message.id} className="flex-shrink-0">
                    <DebateMessage message={message} />
                    {index < messages.length - 1 && <Separator className="my-4 opacity-30" />}
                  </div>
                ))}

                {isDebating && (
                  <div className="flex items-center justify-center py-8 flex-shrink-0">
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary border-t-transparent"></div>
                      <span className="text-sm">Las IAs están debatiendo...</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Card>
        )}
      </div>

      {/* Footer with credits link - fixed position */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-gray-50/90 dark:bg-gray-900/90 backdrop-blur-sm border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto py-3 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-xs text-gray-600 dark:text-gray-400">
              © 2025 DebatIA. Todos los derechos reservados.
            </p>
            <div className="mt-1">
              <a 
                href="/creditos" 
                className="text-xs text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300 transition-colors"
              >
                Ver Créditos del Proyecto
              </a>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}
