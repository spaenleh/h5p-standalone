import { UserConfigExport, defineConfig, loadEnv } from "vite";

export default ({ mode }: { mode: string }): UserConfigExport => {
  process.env = {
    VITE_BUILD_TIMESTAMP: new Date().toISOString(),
    ...process.env,
    ...loadEnv(mode, process.cwd()),
  };

  return defineConfig({
    publicDir: "vendor/h5p",
    base: "/h5p-integration",
  });
};
