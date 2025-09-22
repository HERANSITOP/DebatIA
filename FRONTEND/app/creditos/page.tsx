"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Code, Palette, Database, Brain, Shield, Globe } from "lucide-react";
import { useRouter } from "next/navigation";
import { HelpModal } from "@/components/help-modal";

export default function CreditosPage() {
  const router = useRouter();

  const tecnologias = [
    {
      categoria: "Frontend",
      icon: <Code className="h-6 w-6" />,
      tecnologias: [
        { nombre: "Next.js 14", descripcion: "Framework de React para aplicaciones web" },
        { nombre: "React 18", descripcion: "Biblioteca de JavaScript para interfaces de usuario" },
        { nombre: "TypeScript", descripcion: "Superset tipado de JavaScript" },
        { nombre: "Tailwind CSS", descripcion: "Framework de CSS utilitario" },
        { nombre: "Radix UI", descripcion: "Componentes de interfaz accesibles" },
        { nombre: "Lucide React", descripcion: "Iconos SVG para React" }
      ]
    },
    {
      categoria: "Backend & Base de Datos",
      icon: <Database className="h-6 w-6" />,
      tecnologias: [
        { nombre: "Node.js", descripcion: "Entorno de ejecución de JavaScript" },
        { nombre: "Express.js", descripcion: "Framework web para Node.js" },
        { nombre: "MongoDB", descripcion: "Base de datos NoSQL" },
        { nombre: "Railway", descripcion: "Plataforma de despliegue en la nube" }
      ]
    },
    {
      categoria: "Autenticación & Seguridad",
      icon: <Shield className="h-6 w-6" />,
      tecnologias: [
        { nombre: "Auth0", descripcion: "Plataforma de autenticación y autorización" },
        { nombre: "JWT", descripcion: "JSON Web Tokens para autenticación" },
        { nombre: "OAuth 2.0", descripcion: "Protocolo de autorización estándar" }
      ]
    },
    {
      categoria: "Inteligencia Artificial",
      icon: <Brain className="h-6 w-6" />,
      tecnologias: [
        { nombre: "OpenAI API", descripcion: "API para modelos de lenguaje GPT" },
        { nombre: "Análisis de Sentimientos", descripcion: "Procesamiento de lenguaje natural" },
        { nombre: "Generación de Contenido", descripcion: "IA para crear argumentos estructurados" }
      ]
    },
    {
      categoria: "Despliegue & DevOps",
      icon: <Globe className="h-6 w-6" />,
      tecnologias: [
        { nombre: "Vercel", descripcion: "Plataforma de despliegue para frontend" },
        { nombre: "Railway", descripcion: "Plataforma de despliegue para backend" },
        { nombre: "Git", descripcion: "Control de versiones" },
        { nombre: "GitHub", descripcion: "Repositorio de código fuente" }
      ]
    }
  ];

  const equipo = [
    {
      rol: "Desarrollador Full-Stack",
      nombre: "Hernán Darío Tapias Martínez",
      email: "htapias@unal.edu.co",
      telefono: "315 351 2929",
      descripcion: "Desarrollo de la plataforma completa de debates inteligentes"
    },
    {
      rol: "Desarrollador Full-Stack",
      nombre: "Miguel Ángel Ramírez Pedrozo",
      email: "miramirezpe@unal.edu.co",
      telefono: "324 626 6576",
      descripcion: "Desarrollo de la plataforma completa de debates inteligentes"
    },
    {
      rol: "Desarrollador Full-Stack",
      nombre: "Samuel Muñoz del Río",
      email: "samumunoz@unal.edu.co",
      telefono: "313 754 6390",
      descripcion: "Desarrollo de la plataforma completa de debates inteligentes"
    },
    {
      rol: "Desarrollador Full-Stack",
      nombre: "Sebastián Sepúlveda García",
      email: "sesepulvedag@unal.edu.co",
      telefono: "321 831 7348",
      descripcion: "Desarrollo de la plataforma completa de debates inteligentes"
    }
  ];

  const caracteristicas = [
    "Autenticación segura con Auth0",
    "Interfaz moderna y responsiva",
    "Análisis inteligente de argumentos",
    "Sistema de debates estructurados",
    "Tema claro y oscuro",
    "Despliegue en la nube"
  ];

  return (
    <div className="bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <Button
            onClick={() => router.back()}
            variant="outline"
            className="mb-4 flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver
          </Button>
          
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Créditos del Proyecto
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              DebatIA - Plataforma de Debates Inteligentes
            </p>
            <div className="mt-4 p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg backdrop-blur-sm">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                © 2025 DebatIA. Todos los derechos reservados.
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                Desarrollado con ❤️ para fomentar el debate constructivo y el pensamiento crítico
              </p>
            </div>
          </div>
        </div>

        {/* Información del Proyecto */}
        <Card className="mb-8 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-white/20 dark:border-gray-800">
          <CardHeader>
            <CardTitle className="text-2xl text-gray-900 dark:text-white flex items-center gap-2">
              <Palette className="h-6 w-6" />
              Acerca del Proyecto
            </CardTitle>
            <CardDescription>
              DebatIA es una plataforma innovadora que utiliza inteligencia artificial para facilitar debates estructurados y análisis de argumentos.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Características Principales</h3>
                <ul className="space-y-2">
                  {caracteristicas.map((caracteristica, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      {caracteristica}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Objetivos</h3>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li>• Fomentar el debate constructivo</li>
                  <li>• Mejorar las habilidades de argumentación</li>
                  <li>• Utilizar IA para análisis objetivo</li>
                  <li>• Crear una comunidad de pensadores críticos</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Equipo de Desarrollo */}
        <Card className="mb-8 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-white/20 dark:border-gray-800">
          <CardHeader>
            <CardTitle className="text-2xl text-gray-900 dark:text-white">Equipo de Desarrollo</CardTitle>
            <CardDescription>
              Conoce al equipo detrás de DebatIA
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              {equipo.map((miembro, index) => (
                <div key={index} className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                  <h3 className="font-semibold text-gray-900 dark:text-white text-lg">{miembro.rol}</h3>
                  <p className="text-green-600 dark:text-green-400 font-medium text-xl mt-2">{miembro.nombre}</p>
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Email:</span>
                      <a 
                        href={`mailto:${miembro.email}`}
                        className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        {miembro.email}
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Teléfono:</span>
                      <a 
                        href={`tel:${miembro.telefono.replace(/\s/g, '')}`}
                        className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        {miembro.telefono}
                      </a>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">{miembro.descripcion}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Tecnologías Utilizadas */}
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-8">
            Tecnologías Utilizadas
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tecnologias.map((categoria, index) => (
              <Card key={index} className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-white/20 dark:border-gray-800">
                <CardHeader>
                  <CardTitle className="text-lg text-gray-900 dark:text-white flex items-center gap-2">
                    {categoria.icon}
                    {categoria.categoria}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {categoria.tecnologias.map((tech, techIndex) => (
                      <div key={techIndex} className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <h4 className="font-semibold text-gray-900 dark:text-white text-sm">
                          {tech.nombre}
                        </h4>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                          {tech.descripcion}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Información de Contacto */}
        <Card className="mt-8 bg-gradient-to-r from-green-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 border-green-200 dark:border-gray-600">
          <CardContent className="pt-6">
            <div className="text-center">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                ¿Tienes preguntas o sugerencias?
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Estamos siempre abiertos a mejorar y expandir DebatIA
              </p>
              <div className="flex justify-center">
                <HelpModal>
                  <Button className="bg-green-600 hover:bg-green-700 text-white">
                    Contactar Equipo / Reportar Bug
                  </Button>
                </HelpModal>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer adicional */}
        <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-500">
          <p>Última actualización: Septiembre 2025</p>
          <p className="mt-2">
            Desarrollado con Next.js, React, TypeScript y mucho ☕
          </p>
        </div>
      </div>
      
    </div>
  );
}
