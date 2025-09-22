# Guía de Integración de API Externa

Este documento explica cómo agregar una API LLM externa al sistema de debate.

## Configuración Actual

El sistema actualmente usa **respuestas locales mejoradas** que funcionan perfectamente. Las respuestas son:
- Dinámicas y contextuales
- Específicas para cada personalidad de IA
- Adaptadas al tema del debate
- Diferentes según el round del debate

## Cómo Agregar una API Externa

### Paso 1: Configurar Variables de Entorno

Crea o edita el archivo `.env.local` en la raíz del proyecto:

```bash
# Para OpenAI
OPENAI_API_KEY=tu_api_key_aqui

# Para Groq
GROQ_API_KEY=tu_api_key_aqui

# Para Anthropic
ANTHROPIC_API_KEY=tu_api_key_aqui

# Para Cohere
COHERE_API_KEY=tu_api_key_aqui
```

### Paso 2: Descomentar la Función de API Externa

En `app/api/debate/route.ts`, descomenta la función `generateTextWithExternalAPI` y configura la API que quieras usar:

```typescript
async function generateTextWithExternalAPI(prompt: string): Promise<string> {
  try {
    // Ejemplo con OpenAI:
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 200,
        temperature: 0.7,
      }),
    });
    const data = await response.json();
    return data.choices[0].message.content.trim();
  } catch (error) {
    console.error('Error con API externa:', error);
    throw error;
  }
}
```

### Paso 3: Activar la API Externa

En la función POST, cambia la configuración:

```typescript
const USE_EXTERNAL_API = true; // Cambiar a true para usar API externa
```

Y descomenta la línea que llama a la API externa:

```typescript
text = await generateTextWithExternalAPI(prompt);
```

### Paso 4: Probar la Integración

1. Inicia el servidor: `npm run dev`
2. Prueba la API: `curl -X POST http://localhost:3000/api/debate -H "Content-Type: application/json" -d '{"topic":"Test","aiPersonality":{"role":"ai-1","name":"Dr. Analítica","perspective":"Test"},"previousMessages":[],"round":1}'`

## APIs Soportadas

### OpenAI
- **Modelo recomendado**: `gpt-3.5-turbo`
- **Costo**: Pago por uso
- **Calidad**: Excelente

### Hugging Face
- **Modelo recomendado**: `microsoft/DialoGPT-medium`
- **Costo**: Gratuito con límites
- **Calidad**: Buena

### Groq
- **Modelo recomendado**: `llama3-8b-8192`
- **Costo**: Gratuito con límites
- **Calidad**: Muy buena

## Fallback Automático

El sistema tiene un fallback automático:
- Si la API externa falla, automáticamente usa las respuestas locales
- Si `USE_EXTERNAL_API = false`, usa respuestas locales
- Las respuestas locales siempre están disponibles como respaldo

## Notas Importantes

1. **Las respuestas locales son muy buenas** y no necesitas una API externa para que el sistema funcione perfectamente
2. **Siempre prueba primero** con respuestas locales antes de agregar una API externa
3. **Mantén el fallback** para que el sistema siga funcionando si la API externa falla
4. **Las personalidades están optimizadas** para las respuestas locales actuales

## Troubleshooting

### Error 401 (Unauthorized)
- Verifica que la API key esté correcta
- Asegúrate de que la API key tenga los permisos necesarios

### Error 429 (Rate Limited)
- Espera un momento antes de hacer otra petición
- Considera usar un modelo más barato

### Error 500 (Server Error)
- Verifica que la URL de la API sea correcta
- Revisa los logs del servidor para más detalles

### La API externa no responde
- El sistema automáticamente usará las respuestas locales
- Revisa la conexión a internet
- Verifica que la API esté funcionando
