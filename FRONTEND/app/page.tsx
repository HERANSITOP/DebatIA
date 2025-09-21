"use client";

import { useEffect, useState } from "react";
import { redirect, useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut, User } from "lucide-react";

interface UserProfile {
  name: string;
  email: string;
  picture: string;
  sub: string;
}

export default function HomePage() {
  const router = useRouter();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is authenticated
    const accessToken = localStorage.getItem("access_token");
    const userProfile = localStorage.getItem("user_profile");

    if (!accessToken || !userProfile) {
      router.push("/login");
      return;
    }

    try {
      const parsedUser = JSON.parse(userProfile);
      setUser(parsedUser);
    } catch (error) {
      console.error("Error parsing user profile:", error);
      router.push("/login");
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect to login
  }
  const handleLogout = () => {
    redirect("https://debatiabackend-production.up.railway.app/auth/google");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            DebatIA Dashboard
          </h1>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="flex items-center gap-2"
          >
            <LogOut className="h-4 w-4" />
            Cerrar sesión
          </Button>
        </div>

        {/* Welcome Card */}
        <Card className="mb-8 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-white/20 dark:border-gray-800">
          <CardHeader>
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={user.picture} alt={user.name} />
                <AvatarFallback>
                  <User className="h-8 w-8" />
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-2xl text-gray-900 dark:text-white">
                  ¡Bienvenido, {user.name}!
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400">
                  {user.email}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 dark:text-gray-300">
              Has iniciado sesión correctamente con Auth0. Tu sesión está activa
              y puedes comenzar a usar la aplicación.
            </p>
          </CardContent>
        </Card>

        {/* Features Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-white/20 dark:border-gray-800">
            <CardHeader>
              <CardTitle className="text-lg text-gray-900 dark:text-white">
                Debates
              </CardTitle>
              <CardDescription>
                Participa en debates inteligentes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                Ver Debates
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-white/20 dark:border-gray-800">
            <CardHeader>
              <CardTitle className="text-lg text-gray-900 dark:text-white">
                Perfil
              </CardTitle>
              <CardDescription>
                Gestiona tu información personal
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">
                Ver Perfil
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-white/20 dark:border-gray-800">
            <CardHeader>
              <CardTitle className="text-lg text-gray-900 dark:text-white">
                Configuración
              </CardTitle>
              <CardDescription>Ajusta tus preferencias</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">
                Configurar
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
