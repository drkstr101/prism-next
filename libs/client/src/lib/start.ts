import { startClient } from '@coko/client';
import defaultRoutes from './routes';
import defaultTheme from './theme';

/**
 * Startup the pubsweet client using the specified routes and theme
 */
export default async (routes = defaultRoutes, theme = defaultTheme) =>
  await startClient(routes, theme);
