import { defineConfig } from "umi";
import settings from "./settings.json";

export default defineConfig({
  nodeModulesTransform: {
    type: "none",
  },
  layout: {
    title: "LACI",
    logo: settings.publicPath
      ? `${settings.publicPath}coronavirus.svg`
      : "/coronavirus.svg",
    layout: "top",
  },
  locale: {
    default: "en-US",
  },
  routes: [
    { path: "/", component: "@/pages/index" },
    { path: "/cities/:id", component: "@/pages/city" },
  ],
  fastRefresh: {},
  mfsu: {},
  webpack5: {},
  base: settings.base,
  publicPath: settings.publicPath,
});
