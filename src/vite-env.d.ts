/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_USER_ROLE: 'admin' | 'user' | 'writer'; 
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}