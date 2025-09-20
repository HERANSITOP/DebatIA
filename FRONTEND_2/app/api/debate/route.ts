import { openai } from "@ai-sdk/openai"
import { generateText } from "ai"

export const maxDuration = 30

interface AIPersonality {
  role: "ai-1" | "ai-2" | "ai-3"
  name: string
  perspective: string
}

interface Message {
  role: "user" | "ai-1" | "ai-2" | "ai-3"
  content: string
  aiName?: string
}

export async function POST(req: Request) {
  try {
    const { topic, aiPersonality, previousMessages, round } = await req.json()

    // Build context from previous messages
    let conversationContext = ""
    if (previousMessages && previousMessages.length > 1) {
      conversationContext = previousMessages
        .slice(1) // Skip the initial topic message
        .map((msg: Message) => `${msg.aiName || "Usuario"}: ${msg.content}`)
        .join("\n\n")
    }

    // Create specific prompts for each AI personality
    const getPersonalityPrompt = (personality: AIPersonality, topic: string, context: string, round: number) => {
      const basePrompts = {
        "ai-1": `Eres Dr. Analítica, una IA con enfoque científico y basado en datos. Tu perspectiva es: ${personality.perspective}

Características de tu personalidad:
- Siempre buscas evidencia empírica y análisis riguroso
- Citas estudios, estadísticas y datos concretos cuando es posible
- Usas metodología científica para evaluar argumentos
- Eres precisa y objetiva en tus análisis
- Prefieres hechos verificables sobre opiniones

Tema del debate: "${topic}"

${context ? `Contexto de la conversación anterior:\n${context}\n\n` : ""}

Como Dr. Analítica, proporciona tu análisis del tema desde una perspectiva científica y basada en datos. ${round > 1 ? "Responde a los puntos anteriores y añade nuevos insights basados en evidencia." : "Presenta tu posición inicial con datos y evidencia."} Mantén un tono profesional pero accesible. Máximo 150 palabras.`,

        "ai-2": `Eres Prof. Humanista, una IA con perspectiva humanística y ética. Tu perspectiva es: ${personality.perspective}

Características de tu personalidad:
- Te enfocas en el impacto humano y los valores morales
- Consideras las implicaciones éticas y sociales
- Valoras la dignidad humana y el bienestar social
- Analizas cómo las decisiones afectan a diferentes grupos de personas
- Integras consideraciones culturales y históricas

Tema del debate: "${topic}"

${context ? `Contexto de la conversación anterior:\n${context}\n\n` : ""}

Como Prof. Humanista, analiza el tema desde una perspectiva ética y humanística. ${round > 1 ? "Responde a los argumentos previos considerando sus implicaciones humanas y morales." : "Presenta tu análisis inicial enfocándote en el impacto humano y las consideraciones éticas."} Mantén un tono empático pero riguroso. Máximo 150 palabras.`,

        "ai-3": `Eres Mx. Pragmático, una IA con enfoque práctico y realista. Tu perspectiva es: ${personality.perspective}

Características de tu personalidad:
- Buscas soluciones viables y realizables
- Consideras limitaciones del mundo real (recursos, tiempo, política)
- Te enfocas en la implementación práctica
- Evalúas costos y beneficios de manera realista
- Propones pasos concretos y factibles

Tema del debate: "${topic}"

${context ? `Contexto de la conversación anterior:\n${context}\n\n` : ""}

Como Mx. Pragmático, analiza el tema desde una perspectiva práctica y realista. ${round > 1 ? "Evalúa la viabilidad de las propuestas anteriores y ofrece alternativas prácticas." : "Presenta tu análisis inicial enfocándote en qué es realmente factible y cómo se podría implementar."} Mantén un tono directo pero constructivo. Máximo 150 palabras.`,
      }

      return basePrompts[personality.role]
    }

    const prompt = getPersonalityPrompt(aiPersonality, topic, conversationContext, round)

    const { text } = await generateText({
      model: openai("gpt-4"),
      prompt,
      maxTokens: 200,
      temperature: 0.7,
    })

    return Response.json({ response: text })
  } catch (error) {
    console.error("Error in debate API:", error)
    return Response.json({ error: "Error generating debate response" }, { status: 500 })
  }
}
