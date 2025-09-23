/*
import { withAuth } from "next-auth/middleware"

export default withAuth(
  function middleware(req) {
    // Add any additional middleware logic here
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  },
)

export const config = {
  matcher: ["/debate/:path*"],
}
*/

// Middleware deshabilitado - acceso libre a todas las rutas
export function middleware() {
  // Sin restricciones de autenticación
}

export const config = {
  matcher: [],
}
