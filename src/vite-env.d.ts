/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly PORT: number;
  readonly BASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
