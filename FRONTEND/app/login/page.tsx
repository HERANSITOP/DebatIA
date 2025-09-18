import { LoginForm } from "@/components/login-form"
import { ThemeToggleButton } from "@/components/theme-provider"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col relative
                 bg-[#f0f2f5] dark:bg-gray-900
                 unal:bg-[url('/unal-medellin.jpg')] unal:bg-cover unal:bg-fixed unal:bg-center
                 before:content-[''] before:absolute before:inset-0 unal:before:bg-black/30">
      <ThemeToggleButton />
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="bg-gradient-to-br from-green-400 to-green-600 
                    dark:from-green-600 dark:to-green-800 
                    unal:from-green-600/90 unal:to-green-800/90 
                    p-8 rounded-3xl shadow-2xl 
                    dark:shadow-green-900/30 unal:shadow-green-900/50 
                    max-w-6xl w-full mx-auto flex gap-8 items-center backdrop-blur-sm">
          {/* Left side - Login Form */}
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-md">
                <span className="text-accent-foreground font-bold">
                  <img 
                    src="https://purina.com.pe/sites/default/files/2022-10/Que_debes_saber_antes_de_adoptar_un_gatito.jpg" 
                    alt="Logo" 
                    className="w-10 h-10 object-cover rounded-lg"
                  />
                </span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">DebatIA</h1>
                <p className="text-green-50">Accede a tu cuenta con el correo de la universidad</p>
              </div>
            </div>
            <LoginForm />
          </div>

          {/* Right side - Illustration/Background */}
          <div className="flex-1 hidden lg:block">
            <img 
              src="/background-img.png" 
              alt="Background illustration" 
              className="w-full h-auto object-contain max-h-[500px]"
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="p-6 text-center text-sm text-gray-600 dark:text-gray-400">
        © 2025 DebatIA. Todos los derechos reservados.
      </footer>
    </div>
  )
}
