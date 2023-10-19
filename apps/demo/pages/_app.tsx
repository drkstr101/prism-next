import { ApplicationFrame } from '@prism-next/ui';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';

// Import global styles with side-effects
import '@prism-next/theme';

function DemoApp({ Component, pageProps }: AppProps) {
  // Inject a client-side router to delegate navigation after fully hydrated
  const router = useRouter();
  return (
    <ApplicationFrame router={{ navigate: router.push }}>
      <Component {...pageProps} />
    </ApplicationFrame>
  );
}

export default DemoApp;
