/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_MY_ENV: string;
  readonly VITE_API_BASE_URL: string;
  readonly VITE_TOMTOM_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
