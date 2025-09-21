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
  );
}
