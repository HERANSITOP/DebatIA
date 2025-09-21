"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CallbackPage() {
  const router = useRouter();

  useEffect(() => {
    const handleCallback = async () => {
      const params = new URLSearchParams(window.location.search);
      const code = params.get("code");
      if (!code) return;
      // Llama a tu backend para procesar el callback
      try {
        const res = await fetch(
          `https://debatiabackend-production.up.railway.app/auth/google/callback?code=${code}`,
          { credentials: "include" }
        );
        if (res.ok) {
          router.push("/perfil");
        }
      } catch (e) {
        // Manejar error
      }
    };
    handleCallback();
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Procesando autenticación...</h1>
    </div>
  );
}
