# DebatIA - AI Debate Platform

Una plataforma de debate inteligente donde múltiples IAs con personalidades diferentes pueden debatir sobre cualquier tema.

## Características

- 🤖 **3 IAs especializadas**: Dr. Analítica (científica), Prof. Humanista (ética), Mx. Pragmático (práctica)
- 💬 **Debates dinámicos**: Las IAs responden secuencialmente con personalidades únicas
- ⚙️ **Configuración personalizable**: Personaliza los prompts de cada IA
- 🎨 **Interfaz moderna**: Diseño responsive con tema claro/oscuro
- 🆓 **API gratuita**: Utiliza Hugging Face Inference API (gratuita)

## Configuración

### 1. Instalar dependencias

```bash
npm install
# o
pnpm install
```

### 2. Configurar variables de entorno

Crea un archivo `.env.local` en la raíz del proyecto:

```env
# Hugging Face API Configuration
# Obtén tu token gratuito en: https://huggingface.co/settings/tokens
HUGGINGFACE_API_KEY=hf_tu_token_aqui
```

### 3. Obtener API Key gratuita

1. Ve a [Hugging Face](https://huggingface.co/settings/tokens)
2. Crea una cuenta gratuita
3. Genera un nuevo token
4. Copia el token y pégalo en tu archivo `.env.local`

### 4. Ejecutar el proyecto

```bash
npm run dev
# o
pnpm dev
```

## Uso

1. **Configurar el debate**: Escribe el tema de debate y selecciona qué IAs participarán
2. **Personalizar IAs**: Modifica los prompts personalizados de cada IA (opcional)
3. **Iniciar debate**: Las IAs comenzarán a debatir automáticamente
4. **Continuar**: Puedes hacer que las IAs continúen el debate en cualquier momento

## Tecnologías

- **Frontend**: Next.js 14, React, TypeScript
- **UI**: Tailwind CSS, Radix UI
- **API**: Hugging Face Inference API (gratuita)
- **Deployment**: Vercel

## API Gratuita

Este proyecto utiliza la API gratuita de Hugging Face que ofrece:
- ✅ Completamente gratuita
- ✅ Sin límites estrictos para uso personal
- ✅ Modelos de IA de alta calidad
- ✅ Soporte para múltiples idiomas

## Desarrollo

### Estructura del proyecto

```
├── app/
│   ├── api/debate/route.ts    # API endpoint para generar respuestas
│   ├── debate/page.tsx        # Página principal del debate
│   └── ...
├── components/
│   ├── debate-message.tsx     # Componente para mostrar mensajes
│   └── ...
└── ...
```

### Personalización

Puedes personalizar las personalidades de las IAs modificando los prompts en `app/api/debate/route.ts` o a través de la interfaz de usuario.

## Contribuir

Las contribuciones son bienvenidas. Por favor, abre un issue o pull request.

## Licencia

MIT License