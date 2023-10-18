import { ClientProvider } from '@prism-next/ui';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';

// Import global styles from theme
import '@prism-next/theme';

function DemoApp({ Component, pageProps }: AppProps) {
  // Inject a client-side router to delegate navigation
  const router = useRouter();
  return (
    <ClientProvider router={{ navigate: router.push }}>
      <Component {...pageProps} />
    </ClientProvider>
  );
}

export default DemoApp;
