import NextAuth from 'next-auth';
import GitHub from 'next-auth/providers/github';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from '@/prisma/client';
import crypto from 'crypto';

export const { handlers, auth, signIn, signOut } = NextAuth({
  debug: !!process.env.AUTH_DEBUG,
  theme: { logo: 'https://authjs.dev/img/logo-sm.png' },
  adapter: PrismaAdapter(prisma),
  providers: [GitHub],
  basePath: '/api/auth',
  session: { strategy: 'database' },
  callbacks: {
    authorized({ request, auth }) {
      const { pathname } = request.nextUrl;
      if (pathname === '/middleware-example') return !!auth;
      return true;
    },
    async session({ session, user }) {
      const account = await prisma.account.findFirstOrThrow({
        where: { userId: user.id },
      });
      const userRecord = await prisma.user.findUniqueOrThrow({
        where: { id: user.id },
      });
      if (!userRecord.buddyCode) {
        await prisma.user.update({
          where: { id: user.id },
          data: {
            buddyCode: crypto
              .createHash('sha256')
              .update(user.id)
              .digest('hex'),
          },
        });
      }
      session.buddyCode = userRecord.buddyCode;
      session.accessToken = account.access_token;
      return session;
    },
  },
  experimental: { enableWebAuthn: true },
});

declare module 'next-auth' {
  interface Session {
    accessToken?: string | null;
    buddyCode?: string | null;
  }
}
