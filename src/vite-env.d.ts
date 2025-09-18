// vite-env.d.ts
/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_API_BASE_URL: string;
    readonly VITE_API_KEY: string;
    readonly VITE_AUTH_SECRET: string;
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }