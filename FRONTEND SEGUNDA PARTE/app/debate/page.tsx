"use client"

import { useState } from "react"
import { Button } from "@/FRONTEND SEGUNDA PARTE/components/ui/button"
import { Input } from "@/FRONTEND SEGUNDA PARTE/components/ui/input"
import { Card } from "@/FRONTEND SEGUNDA PARTE/components/ui/card"
import { Badge } from "@/FRONTEND SEGUNDA PARTE/components/ui/badge"
import { ScrollArea } from "@/FRONTEND SEGUNDA PARTE/components/ui/scroll-area"
import { Separator } from "@/FRONTEND SEGUNDA PARTE/components/ui/separator"
import { Textarea } from "@/FRONTEND SEGUNDA PARTE/components/ui/textarea"
import { Checkbox } from "@/FRONTEND SEGUNDA PARTE/components/ui/checkbox"
import { MessageSquare, Users, Sparkles, Send, RotateCcw, Settings, FlaskConical, Heart, Wrench } from "lucide-react"
import { DebateMessage } from "@/FRONTEND SEGUNDA PARTE/components/debate-message"

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
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <MessageSquare className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-balance">Debate Chat</h1>
                <p className="text-sm text-muted-foreground">Configura y debate con IAs personalizadas</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
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

      <div className="container mx-auto px-4 py-6 max-w-6xl">
        {showConfig ? (
          <div className="space-y-6">
            {/* Topic Input */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4 text-balance">¿Sobre qué tema quieres que debatan las IAs?</h2>
              <Input
                placeholder="Ej: ¿Es la inteligencia artificial beneficiosa para la humanidad?"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="text-base"
                disabled={isDebating}
              />
            </Card>

            {/* AI Configuration */}
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-6">
                <Settings className="h-5 w-5" />
                <h2 className="text-xl font-semibold">Configurar Participantes</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {aiConfigs.map((ai) => {
                  const Icon = ai.icon
                  return (
                    <Card key={ai.id} className={`p-4 ${ai.enabled ? "ring-2 ring-primary/20" : "opacity-60"}`}>
                      <div className="space-y-4">
                        {/* AI Header */}
                        <div className="flex items-start gap-3">
                          <Checkbox
                            checked={ai.enabled}
                            onCheckedChange={(checked) => updateAIConfig(ai.id, "enabled", checked)}
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <div className={`p-1.5 rounded-lg ${ai.color}`}>
                                <Icon className="h-4 w-4" />
                              </div>
                              <h3 className="font-medium">{ai.name}</h3>
                            </div>
                            <p className="text-sm text-muted-foreground text-pretty">{ai.description}</p>
                          </div>
                        </div>

                        {/* Custom Prompt */}
                        {ai.enabled && (
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Prompt personalizado (opcional):</label>
                            <Textarea
                              placeholder={`Deja vacío para usar el prompt por defecto de ${ai.name}`}
                              value={ai.customPrompt}
                              onChange={(e) => updateAIConfig(ai.id, "customPrompt", e.target.value)}
                              className="min-h-[80px] text-sm"
                              rows={3}
                            />
                            {!ai.customPrompt && (
                              <p className="text-xs text-muted-foreground">Prompt por defecto: {ai.defaultPrompt}</p>
                            )}
                          </div>
                        )}
                      </div>
                    </Card>
                  )
                })}
              </div>
            </Card>

            {/* Start Debate Button */}
            <div className="flex justify-center">
              <Button onClick={startDebate} disabled={!canStartDebate() || isDebating} size="lg" className="gap-2 px-8">
                <Send className="h-5 w-5" />
                Iniciar Debate
              </Button>
            </div>
          </div>
        ) : (
          <Card className="h-[calc(100vh-12rem)]">
            {/* Current Topic Display */}
            <div className="p-4 border-b bg-muted/30">
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
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message, index) => (
                  <div key={message.id}>
                    <DebateMessage message={message} />
                    {index < messages.length - 1 && <Separator className="my-4 opacity-30" />}
                  </div>
                ))}

                {isDebating && (
                  <div className="flex items-center justify-center py-8">
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary border-t-transparent"></div>
                      <span className="text-sm">Las IAs están debatiendo...</span>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>
          </Card>
        )}
      </div>
    </div>
  )
}
