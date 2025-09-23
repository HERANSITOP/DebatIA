"use client";
import { useEffect, useState } from "react";

interface Profile {
  email: string;
  name: string;
  picture: string;
}

export default function PerfilPage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(
          "https://debatiabackend-production.up.railway.app/profile",
          {
            credentials: "include",
          }
        );
        if (res.ok) {
          const data = await res.json();
          setProfile(data);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        Cargando perfil...
      </div>
    );
  if (!profile)
    return (
      <div className="flex items-center justify-center min-h-screen">
        No hay datos de perfil.
      </div>
    );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <img
        src={profile.picture}
        alt="Foto de perfil"
        className="rounded-full w-24 h-24 mb-4"
      />
      <h1 className="text-2xl font-bold mb-2">{profile.name}</h1>
      <h1 className="text-2xl font-bold mb-2">{profile.email}</h1>
    </div>
    
    {/* Footer con Copyright */}
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 mt-12">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            © 2025 DebatIA. Todos los derechos reservados.
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
            Plataforma de debates inteligentes desarrollada con Next.js, React y tecnologías de IA
          </p>
          <div className="mt-3">
            <a 
              href="/creditos" 
              className="text-sm text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300 transition-colors"
            >
              Ver Créditos del Proyecto
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
