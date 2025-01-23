/// <reference types="vite/client" />

interface ImportMetaEnv {
  /**
   * A comma separated list of target origins to allow
   */
  readonly VITE_TARGET_ORIGINS?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
