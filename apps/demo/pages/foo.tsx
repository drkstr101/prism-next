import { Heading, Link } from '@adobe/react-spectrum';
import Head from 'next/head';

import styles from './index.module.css';

export function Index() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Spectrum Design System Demo</title>
        <meta name="description" content="Spectrum Design System Demo" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Heading level={1}>Foo Page</Heading>
        <Link href="/">Back to demo</Link>
      </main>
    </div>
  );
}

export default Index;
