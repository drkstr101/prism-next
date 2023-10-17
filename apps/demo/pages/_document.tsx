import { Head, Html, Main, NextScript } from 'next/document';

/**
 * Load Adobe Clean fonts from typekit CDN
 * @returns
 */
const FontLinks = () => (
  <>
    <link
      rel="preload"
      as="font"
      href="https://use.typekit.net/af/eaf09c/000000000000000000017703/27/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3"
      crossOrigin=""
    />
    <link
      rel="preload"
      as="font"
      href="https://use.typekit.net/af/cb695f/000000000000000000017701/27/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n4&v=3"
      crossOrigin=""
    />
    <link
      rel="preload"
      as="font"
      href="https://use.typekit.net/af/505d17/00000000000000003b9aee44/27/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n9&v=3"
      crossOrigin=""
    />
    <link
      rel="preload"
      as="font"
      href="https://use.typekit.net/af/74ffb1/000000000000000000017702/27/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=i4&v=3"
      crossOrigin=""
    />
  </>
);

export default function Document() {
  return (
    <Html lang="en" className="spectrum">
      <Head>
        <FontLinks />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
