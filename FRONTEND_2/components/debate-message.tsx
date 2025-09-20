import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Brain, FlaskConical, Heart, Wrench } from "lucide-react"

interface Message {
  id: string
  role: "user" | "ai-1" | "ai-2" | "ai-3"
  content: string
  timestamp: Date
  aiName?: string
}

interface DebateMessageProps {
  message: Message
}

export function DebateMessage({ message }: DebateMessageProps) {
  const getAIConfig = (role: string) => {
    switch (role) {
      case "ai-1":
        return {
          name: "Dr. Analítica",
          icon: FlaskConical,
          bubbleClass: "ai-1-bubble",
          badgeVariant: "default" as const,
          description: "Perspectiva Científica",
        }
      case "ai-2":
        return {
          name: "Prof. Humanista",
          icon: Heart,
          bubbleClass: "ai-2-bubble",
          badgeVariant: "secondary" as const,
          description: "Perspectiva Humanística",
        }
      case "ai-3":
        return {
          name: "Mx. Pragmático",
          icon: Wrench,
          bubbleClass: "ai-3-bubble",
          badgeVariant: "outline" as const,
          description: "Perspectiva Práctica",
        }
      default:
        return {
          name: "Usuario",
          icon: Brain,
          bubbleClass: "bg-primary text-primary-foreground",
          badgeVariant: "default" as const,
          description: "Tema propuesto",
        }
    }
  }

  const config = getAIConfig(message.role)
  const Icon = config.icon

  if (message.role === "user") {
    return (
      <div className="flex justify-center">
        <div className="max-w-2xl w-full">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Badge variant="outline" className="gap-1">
              <Icon className="h-3 w-3" />
              {config.description}
            </Badge>
          </div>
          <div className={`p-4 rounded-lg text-center ${config.bubbleClass}`}>
            <p className="font-medium text-pretty">{message.content}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex gap-3">
      <Avatar className="h-10 w-10 shrink-0">
        <AvatarFallback className={config.bubbleClass}>
          <Icon className="h-5 w-5" />
        </AvatarFallback>
      </Avatar>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-2">
          <h4 className="font-semibold text-sm">{config.name}</h4>
          <Badge variant={config.badgeVariant} className="text-xs">
            {config.description}
          </Badge>
          <span className="text-xs text-muted-foreground ml-auto">
            {message.timestamp.toLocaleTimeString("es-ES", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>

        <div className={`p-3 rounded-lg ${config.bubbleClass}`}>
          <p className="text-sm leading-relaxed text-pretty whitespace-pre-wrap">{message.content}</p>
        </div>
      </div>
    </div>
  )
}
