import { defineConfig, PluginOption, UserConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import qiankun from "vite-plugin-qiankun";
import path from "path";

export const miniWebsiteViteConfig: UserConfig = {
  plugins: [
    qiankun("50-mini-website", { useDevMode: true }),
    vue(),
    vueJsx() as PluginOption,
  ],
  esbuild: {
    jsxFactory: "h",
    jsxFragment: "Fragment",
  },
  base: "./",
  server: {
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    cors: true,
    port: 3000,
  },
  resolve: {
    alias: [
      { find: "~", replacement: path.resolve(__dirname, "src/assets") },
      { find: "@", replacement: path.resolve(__dirname, "src") },
    ],
  },
  build: {
    assetsInlineLimit: 0,
    cssTarget: "chrome61",
    /**
    * This options allows users to set a different browser target for CSS minification from the one used for JavaScript transpilation.
      It should only be used when you are targeting a non-mainstream browser. 
      One example is Android WeChat WebView, which supports most modern JavaScript features but not the #RGBA hexadecimal color 
      notation in CSS.
       In this case, you need to set build.cssTarget to `chrome61` to prevent vite from transform rgba() colors into #RGBA 
       hexadecimal notations.Take a look at the doc:https://vitejs.dev/config/#build-csstarget
    */
  },
  css: {
    preprocessorOptions: {
      less: {
        additionalData: `@import "@/style/variable.less";@import "@/style/common.less";`,
      },
    },
  },
};
// https://vitejs.dev/config/
export default defineConfig(miniWebsiteViteConfig);
