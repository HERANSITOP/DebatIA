import { LoginForm } from "@/components/login-form"

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="p-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
            <span className="text-accent-foreground font-bold text-sm">A</span>
          </div>
          <div>
            <h1 className="font-bold text-foreground">Mi Aplicación</h1>
            <p className="text-sm text-muted">Accede a tu cuenta</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-6">
        <LoginForm />
      </main>

      {/* Footer */}
      <footer className="p-6 text-center">
        <p className="text-sm text-muted">© 2024 Mi Aplicación. Todos los derechos reservados.</p>
      </footer>
    </div>
  )
}
