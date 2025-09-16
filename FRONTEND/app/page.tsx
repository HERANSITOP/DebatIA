import { redirect } from "next/navigation"

export default function HomePage() {
  // Redirigir automáticamente a la página de login
  redirect("/login")
}
