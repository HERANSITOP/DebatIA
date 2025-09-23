import { OpenAI } from "openai";

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

// ============================================================================
// API EXTERNA - AQUÍ SE PUEDE AGREGAR UNA API LLM EXTERNA
// ============================================================================
// Para agregar una API externa, descomenta y configura la función siguiente:

async function generateTextWithExternalAPI(prompt: string): Promise<string> {
  try {
    const apiKey = process.env.HUGGINGFACE_API_KEY;
    console.log('🔍 Debug - API Key:', apiKey ? `${apiKey.substring(0, 10)}...` : 'undefined');
    
    if (!apiKey || apiKey === 'hf_tu_token_aqui') {
      throw new Error('No Hugging Face API key provided');
    }

    const client = new OpenAI({
      baseURL: "https://router.huggingface.co/v1",
      apiKey: apiKey,
    });

    const chatCompletion = await client.chat.completions.create({
      model: "deepseek-ai/DeepSeek-R1:novita",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      max_tokens: 200,
      temperature: 0.7,
    });

    console.log('Hugging Face router response:', chatCompletion);
    
    if (chatCompletion.choices && chatCompletion.choices[0] && chatCompletion.choices[0].message) {
      let content = chatCompletion.choices[0].message.content?.trim() || '';
      
      // Limpiar etiquetas <think> del modelo DeepSeek-R1
      content = content.replace(/<think>[\s\S]*?<\/think>/g, '');
      content = content.replace(/<think>[\s\S]*$/g, ''); // Para etiquetas sin cerrar
      
      // Limpiar espacios extra y saltos de línea
      content = content.trim();
      
      return content;
    }
    
    throw new Error('No se pudo generar texto con Hugging Face router');
  } catch (error) {
    console.error('Error con API externa:', error);
    throw error;
  }
}

// ============================================================================
// RESPUESTAS LOCALES MEJORADAS (FUNCIONANDO)
// ============================================================================
// Enhanced local responses with dynamic content
function generateLocalResponse(prompt: string): string {
  // Extract topic from prompt
  const topicMatch = prompt.match(/Tema del debate: "([^"]+)"/);
  const topic = topicMatch ? topicMatch[1] : "este tema";
  
  // Extract round from prompt
  const roundMatch = prompt.match(/round > (\d+)/);
  const round = roundMatch ? parseInt(roundMatch[1]) : 1;
  
  const responses = {
    "Dr. Analítica": [
      `Como científica de datos, debo señalar que ${topic} requiere un análisis metodológicamente riguroso. Los estudios peer-reviewed muestran correlaciones estadísticamente significativas (p<0.05) que merecen investigación adicional. Sin embargo, debemos considerar los sesgos de selección y las limitaciones de los datos disponibles.`,
      `Desde una perspectiva cuantitativa, ${topic} presenta patrones interesantes en los datos. Los meta-análisis sugieren un efecto moderado (Cohen's d = 0.3-0.5), pero necesitamos estudios longitudinales para establecer causalidad. La evidencia empírica actual es prometedora pero preliminar.`,
      `La evidencia experimental sobre ${topic} es mixta. Mientras que los estudios controlados aleatorizados muestran resultados positivos, los estudios observacionales presentan limitaciones metodológicas significativas. Necesitamos más investigación con muestras representativas y controles adecuados.`,
      `Analizando ${topic} desde un enfoque científico, los datos disponibles indican una relación no lineal con múltiples variables de confusión. Los modelos de regresión sugieren que el efecto principal está mediado por factores socioeconómicos. Se requieren estudios de replicación.`,
      `Como investigadora, debo ser cautelosa con las afirmaciones sobre ${topic}. Los datos muestran heterogeneidad significativa entre estudios, sugiriendo que el efecto depende de variables contextuales. Necesitamos análisis de subgrupos más detallados.`
    ],
    "Prof. Humanista": [
      `Como filósofa ética, me preocupa profundamente cómo ${topic} afecta a los más vulnerables de nuestra sociedad. Cada decisión tiene rostros humanos detrás, y debemos preguntarnos: ¿cómo preservamos la dignidad humana en este contexto?`,
      `Desde una perspectiva humanística, ${topic} trasciende los números para tocar la esencia de nuestra humanidad compartida. Debemos considerar no solo la eficiencia, sino la justicia, la compasión y el respeto por los derechos fundamentales.`,
      `La sabiduría de las tradiciones humanísticas nos enseña que ${topic} debe evaluarse considerando su impacto en la realización humana. ¿Cómo contribuye esto al florecimiento de las personas y las comunidades? La respuesta requiere reflexión ética profunda.`,
      `Como defensora de la justicia social, analizo ${topic} preguntándome: ¿quién se beneficia y quién se perjudica? Debemos asegurar que las decisiones respeten la equidad, la inclusión y los valores democráticos que sostienen nuestra sociedad.`,
      `La experiencia humana nos muestra que ${topic} tiene dimensiones emocionales y espirituales que no pueden ignorarse. Debemos abordar esto con empatía, reconociendo que cada persona tiene una historia única y merece ser tratada con dignidad y respeto.`
    ],
    "Mx. Pragmático": [
      `Como consultor estratégico, debo ser directo: ${topic} necesita un plan de implementación realista. Con un presupuesto limitado de X millones y un plazo de 18 meses, necesitamos priorizar las iniciativas de mayor impacto y menor riesgo.`,
      `Analizando ${topic} desde la perspectiva operativa, veo tres obstáculos principales: recursos limitados, resistencia al cambio organizacional, y restricciones regulatorias. Propongo un enfoque por fases con hitos medibles cada 6 meses.`,
      `La realidad es que ${topic} tiene un ROI cuestionable en el corto plazo. Sin embargo, podemos justificar la inversión si enfocamos en los casos de uso de mayor valor y establecemos métricas claras de éxito. Necesitamos un MVP en 90 días.`,
      `Desde mi experiencia implementando proyectos similares, ${topic} requiere un cambio cultural organizacional que toma 2-3 años. Propongo empezar con un piloto en un departamento, medir resultados, y escalar gradualmente. El costo estimado es de $500K el primer año.`,
      `La viabilidad de ${topic} depende de tres factores críticos: aprobación ejecutiva, recursos técnicos disponibles, y voluntad política. Mi recomendación es un enfoque incremental: 30% de implementación en el primer año, 50% en el segundo, y 20% en el tercero.`
    ]
  }

  // Determine which AI personality is responding
  let personality = "Dr. Analítica"
  if (prompt.includes("Prof. Humanista")) {
    personality = "Prof. Humanista"
  } else if (prompt.includes("Mx. Pragmático")) {
    personality = "Mx. Pragmático"
  }

  // Get a random response for the personality
  const personalityResponses = responses[personality as keyof typeof responses]
  const randomIndex = Math.floor(Math.random() * personalityResponses.length)
  
  let response = personalityResponses[randomIndex]
  
  // Add round-specific content
  if (round > 1) {
    const roundAdditions = {
      "Dr. Analítica": " Los datos presentados anteriormente requieren validación estadística adicional, pero confirman las tendencias que observé inicialmente. Necesitamos más estudios para establecer causalidad.",
      "Prof. Humanista": " Los argumentos previos me recuerdan la importancia de mantener el foco en la dignidad humana. Debemos asegurar que ninguna propuesta comprometa los valores fundamentales que sostienen nuestra sociedad.",
      "Mx. Pragmático": " Las propuestas anteriores son interesantes, pero necesito ver los números concretos y el plan de implementación. ¿Cuál es el presupuesto real y los plazos factibles?"
    }
    response += roundAdditions[personality as keyof typeof roundAdditions]
  }
  
  return response
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
        "ai-1": `Eres Dr. Analítica, una científica de datos especializada en análisis cuantitativo y metodología de investigación. Tu perspectiva es: ${personality.perspective}

Características distintivas de tu personalidad:
- Eres extremadamente rigurosa con la evidencia empírica y los datos
- Siempre buscas estudios peer-reviewed y fuentes académicas confiables
- Utilizas terminología científica precisa y metodología estadística
- Eres escéptica de afirmaciones sin respaldo científico
- Prefieres análisis cuantitativos y métricas objetivas
- Tu lenguaje es técnico pero accesible
- Siempre mencionas limitaciones y sesgos en los datos

Tema del debate: "${topic}"

${context ? `Contexto de la conversación anterior:\n${context}\n\n` : ""}

           Como Dr. Analítica, analiza este tema desde una perspectiva estrictamente científica. ${round > 1 ? "Evalúa críticamente los argumentos previos desde un punto de vista metodológico y aporta evidencia adicional." : "Presenta tu análisis inicial basado en evidencia empírica y datos cuantitativos."} Usa un tono académico pero comprensible. Máximo 100 palabras.`,

        "ai-2": `Eres Prof. Humanista, una filósofa ética y especialista en estudios humanísticos con décadas de experiencia en análisis de impacto social. Tu perspectiva es: ${personality.perspective}

Características distintivas de tu personalidad:
- Eres profundamente empática y siempre consideras el impacto humano
- Utilizas un lenguaje cálido, compasivo y filosófico
- Siempre mencionas la dignidad humana y los derechos fundamentales
- Analizas las implicaciones éticas desde múltiples perspectivas culturales
- Eres defensora de la justicia social y la equidad
- Tu enfoque es holístico, considerando aspectos emocionales y espirituales
- Siempre preguntas "¿cómo afecta esto a las personas más vulnerables?"

Tema del debate: "${topic}"

${context ? `Contexto de la conversación anterior:\n${context}\n\n` : ""}

           Como Prof. Humanista, analiza este tema desde una perspectiva ética y humanística profunda. ${round > 1 ? "Responde a los argumentos previos considerando sus implicaciones morales y el impacto en la dignidad humana." : "Presenta tu análisis inicial enfocándote en los valores humanos, la justicia social y las consideraciones éticas."} Usa un tono empático, reflexivo y filosófico. Máximo 100 palabras.`,

        "ai-3": `Eres Mx. Pragmático, un consultor estratégico y especialista en implementación de proyectos con amplia experiencia en el mundo empresarial y gubernamental. Tu perspectiva es: ${personality.perspective}

Características distintivas de tu personalidad:
- Eres extremadamente práctico y orientado a resultados
- Siempre consideras el presupuesto, tiempo y recursos disponibles
- Tu lenguaje es directo, claro y sin rodeos
- Evalúas todo desde la perspectiva de "¿funcionará en la vida real?"
- Siempre propones planes de acción específicos y medibles
- Eres realista sobre las limitaciones políticas y burocráticas
- Prefieres soluciones incrementales y sostenibles
- Tu mantra es "perfecto es enemigo de lo bueno"

Tema del debate: "${topic}"

${context ? `Contexto de la conversación anterior:\n${context}\n\n` : ""}

           Como Mx. Pragmático, analiza este tema desde una perspectiva estrictamente práctica y orientada a la implementación. ${round > 1 ? "Evalúa la viabilidad real de las propuestas anteriores y ofrece alternativas concretas y factibles." : "Presenta tu análisis inicial enfocándote en la implementación práctica, costos reales y viabilidad operativa."} Usa un tono directo, profesional y orientado a resultados. Máximo 100 palabras.`,
      }

      return basePrompts[personality.role]
    }

    const prompt = getPersonalityPrompt(aiPersonality, topic, conversationContext, round)

    // ============================================================================
    // CONFIGURACIÓN DE API - CAMBIAR AQUÍ PARA USAR API EXTERNA
    // ============================================================================
    const USE_EXTERNAL_API = true; // Cambiar a true para usar API externa
    
    let text: string;
    
    if (USE_EXTERNAL_API) {
      try {
        // Usar API externa de Hugging Face
        text = await generateTextWithExternalAPI(prompt);
        console.log("✅ Usando API externa de Hugging Face");
      } catch (error) {
        console.error("Error con API externa, usando respuestas locales:", error);
        text = generateLocalResponse(prompt);
      }
    } else {
      // Usar respuestas locales mejoradas
      text = generateLocalResponse(prompt);
      console.log("🔄 Usando respuestas locales mejoradas");
    }

    return Response.json({ response: text })
  } catch (error) {
    console.error("Error in debate API:", error)
    return Response.json({ error: "Error generating debate response" }, { status: 500 })
  }
}