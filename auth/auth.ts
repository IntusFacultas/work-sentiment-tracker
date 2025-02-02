import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/prisma/client"
// import { AdapterUser} from '@auth/core/src/adapters'

export const { handlers, auth, signIn, signOut } = NextAuth({
  debug: !!process.env.AUTH_DEBUG,
  theme: { logo: "https://authjs.dev/img/logo-sm.png" },
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHub,
  ],
  basePath: "/api/auth",
  session: { strategy: "database" },
  callbacks: {
    authorized({ request, auth }) {
      const { pathname } = request.nextUrl
      if (pathname === "/middleware-example") return !!auth
      return true
    },
    async session({ session, user }) {
      return session
    },
  },
  experimental: { enableWebAuthn: true },
})


declare module "next-auth" {
  interface Session {
    accessToken?: string
  }
}

