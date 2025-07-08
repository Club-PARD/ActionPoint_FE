// /lib/authOptions.ts

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
    async signIn({ account }) {
      const BASE_URL = process.env.NEXT_PUBLIC_API_URL?.replace(/\/+$/, '') || '';
      const LOGIN_URL = `${BASE_URL}/auth/login`;

      const idToken = account?.id_token; // ✅ 올바르게 추출

      console.log('🟢 signIn 시작 - ID Token:', idToken);

      if (!idToken) {
        console.error('❌ ID token 없음');
        return false;
      }

      try {
        const response = await axios.post(
          LOGIN_URL,
          { idToken },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        console.log('✅ 서버 응답:', response.data);

        return true;
      } 
     catch (error: unknown) {
  if (axios.isAxiosError(error)) {
    console.error('❌ 서버 응답 실패:', {
      status: error.response?.status,
      data: error.response?.data,
    });
  } else if (error instanceof Error) {
    console.error('❌ 요청 실패:', error.message);
  } else {
    console.error('❌ 알 수 없는 에러 발생');
  }

        return false;
      }
    },
  },
};
