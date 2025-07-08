// pages/_app.tsx
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import AuthSync from '@/components/AuthSync';
import '@/styles/globals.css';

export default function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <AuthSync />
      <Component {...pageProps} />
    </SessionProvider>
  );
}
