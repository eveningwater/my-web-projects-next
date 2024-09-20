import { UserConfig, defineConfig, loadEnv } from "vite";
import { miniWebsiteViteConfig } from "./packages/50-mini-web-website/vite.config";
import path from "path";

export default defineConfig((options) => {
  const { mode } = options;
  const { VITE_MINI_WEBSITE_PROJECT, VITE_HOME_PROJECT } = loadEnv(
    mode,
    process.cwd()
  );
  if (VITE_MINI_WEBSITE_PROJECT === "50-website") {
    return {
      ...(miniWebsiteViteConfig as UserConfig),
    };
  }
  return {
    base: "./",
    resolve: {
      alias: [
        { find: "~", replacement: path.resolve(__dirname, "src/assets") },
        { find: "@", replacement: path.resolve(__dirname, "src") },
      ],
    },
    server: {
      port: 3001,
    },
  };
});
