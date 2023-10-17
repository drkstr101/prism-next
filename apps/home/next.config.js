//@ts-check

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { composePlugins, withNx } = require('@nx/next');
const config = require('config');

const DEMO_URL = config.get('demo-client.url');

/**
 * Forward paths to any mounted sub apps.
 *
 * @returns NextJs path rewrites
 */
async function rewrites() {
  return [
    {
      source: '/:path*',
      destination: `/:path*`,
    },
    {
      source: '/demo',
      destination: `${DEMO_URL}/demo`,
    },
    {
      source: '/demo/:path*',
      destination: `${DEMO_URL}/demo/:path*`,
    },
  ];
}

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  nx: {
    // Set this to true if you would like to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: false,
  },
  rewrites,
};

const plugins = [
  // Add more Next.js plugins to this list if needed.
  withNx,
];

module.exports = composePlugins(...plugins)(nextConfig);
