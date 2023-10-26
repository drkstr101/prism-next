export interface PrismOptions {
  db: DatabaseOptions;
  demo: DemoClientOptions;
}

export interface DatabaseOptions {
  url: string;
}

export interface DemoClientOptions {
  path: string;
  url: string;
}
