import NextAuth from "next-auth"
import { authOptions } from "@/FRONTEND SEGUNDA PARTE/lib/auth"

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
