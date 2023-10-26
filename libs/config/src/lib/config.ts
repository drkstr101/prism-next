import c from 'config';
import { PrismOptions } from './config.types';

(function init() {
  console.log('Initializing config with global side affects...');
  // TODO - do not depend on workspace-level config files as it is not very portable
})();

export default {
  db: c.get<{ url: string }>('db'),
  demo: c.get<{ path: string; url: string }>('demo-client'),
} as PrismOptions;
