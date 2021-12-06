import { wrapperEnv } from "./build/utils";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
// ElementPlus 手动导入, 便于 Tree Shaking
import ElementPlus from "unplugin-element-plus/vite";
import { ConfigEnv, loadEnv, UserConfigExport } from "vite";
import { viteMockServe } from "vite-plugin-mock";
import viteSvgIcons from "vite-plugin-svg-icons";

const pathResolve = (dir: string): string => {
  return resolve(__dirname, ".", dir);
};
const alias: Record<string, string> = {
  "@": pathResolve("src"),
  "@build": pathResolve("build"),
  "@mocks": pathResolve("mocks"),
  "@typings": pathResolve("typings"),
};

const root = process.cwd();
export default ({ command, mode }: ConfigEnv): UserConfigExport => {
  const { VITE_PORT, VITE_PUBLIC_PATH, VITE_PROD_MOCK } = wrapperEnv(
    loadEnv(mode, root)
  );

  if (mode === "development") {
    alias["vue-i18n"] = "vue-i18n/dist/vue-i18n.cjs.js";
  }
  return {
    base: VITE_PUBLIC_PATH,
    root,
    resolve: {
      alias,
    },
    server: {
      port: VITE_PORT,
      open: true,
    },
    build: {
      sourcemap: false,
      minify: "esbuild",
      brotliSize: false,
      chunkSizeWarningLimit: 2000,
    },
    plugins: [
      vue(),
      ElementPlus(),
      viteSvgIcons({
        iconDirs: [resolve(__dirname, "./src/assets/svg")],
        symbolId: "icon-[name]",
      }),
      viteMockServe({
        mockPath: "mocks",
        localEnabled: command === "serve",
        prodEnabled: command !== "serve" && VITE_PROD_MOCK,
        injectCode: `import { setupProdMockServer } from './mockProdServer';
setupProdMockServer();
`,
      }),
    ],
  };
};
