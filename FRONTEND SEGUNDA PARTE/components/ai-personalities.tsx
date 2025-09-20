import { Card, CardContent, CardHeader, CardTitle } from "@/FRONTEND SEGUNDA PARTE/components/ui/card"
import { Badge } from "@/FRONTEND SEGUNDA PARTE/components/ui/badge"
import { FlaskConical, Heart, Wrench } from "lucide-react"

export function AIPersonalities() {
  const personalities = [
    {
      name: "Dr. Analítica",
      icon: FlaskConical,
      color: "ai-1-bubble",
      description: "Enfoque científico y basado en datos",
      traits: ["Evidencia empírica", "Análisis riguroso", "Metodología científica"],
      style: "Busca siempre datos concretos y estudios que respalden los argumentos.",
    },
    {
      name: "Prof. Humanista",
      icon: Heart,
      color: "ai-2-bubble",
      description: "Perspectiva humanística y ética",
      traits: ["Impacto humano", "Valores morales", "Consideraciones éticas"],
      style: "Se enfoca en cómo las decisiones afectan a las personas y la sociedad.",
    },
    {
      name: "Mx. Pragmático",
      icon: Wrench,
      color: "ai-3-bubble",
      description: "Enfoque práctico y realista",
      traits: ["Soluciones viables", "Limitaciones reales", "Implementación práctica"],
      style: "Considera qué es realmente factible en el mundo real.",
    },
  ]

  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h2 className="text-lg font-semibold mb-2">Participantes del Debate</h2>
        <p className="text-sm text-muted-foreground text-pretty">
          Cada IA tiene una perspectiva única y complementaria
        </p>
      </div>

      {personalities.map((ai, index) => {
        const Icon = ai.icon
        return (
          <Card key={index} className="relative overflow-hidden">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <div className={`p-2 rounded-lg ${ai.color}`}>
                  <Icon className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <CardTitle className="text-sm">{ai.name}</CardTitle>
                  <p className="text-xs text-muted-foreground text-pretty">{ai.description}</p>
                </div>
              </div>
            </CardHeader>

            <CardContent className="pt-0">
              <div className="space-y-3">
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-2">Enfoque principal:</p>
                  <div className="flex flex-wrap gap-1">
                    {ai.traits.map((trait, i) => (
                      <Badge key={i} variant="outline" className="text-xs">
                        {trait}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-1">Estilo de debate:</p>
                  <p className="text-xs text-muted-foreground text-pretty">{ai.style}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
