import { defineConfig } from "umi";

export default defineConfig({
  nodeModulesTransform: {
    type: "none",
  },
  layout: {
    title: "LACI",
    logo: "/coronavirus.svg",
    layout: "top",
  },
  locale: {
    default: "en-US",
  },
  routes: [{ path: "/", component: "@/pages/index" }],
  fastRefresh: {},
  mfsu: {},
  webpack5: {},
});
