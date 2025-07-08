// lib/authOptions.ts
import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import axios from 'axios';

const getGoogleCredentials = () => {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error('Missing Google credentials');
  }

  return { clientId, clientSecret };
};

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: getGoogleCredentials().clientId,
      clientSecret: getGoogleCredentials().clientSecret,
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account?.id_token) {
        try {
          const res = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
            { idToken: account.id_token },
            { headers: { 'Content-Type': 'application/json' } }
          );

          const userId = res.data.userId;
          console.log("✅ 서버 응답에서 받은 userId:", userId);
          token.userId = userId;
        } catch (error) {
          console.error('❌ 로그인 서버 오류:', error);
        }
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user && token.userId) {
        (session.user as any).id = token.userId;
      }
      return session;
    },

    async signIn({ account }) {
      return !!account?.id_token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

