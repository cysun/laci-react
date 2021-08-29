import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  layout: {
    title: 'LA County Covid Info',
    logo: '/coronavirus.svg',
    layout: 'top',
  },
  routes: [{ path: '/', component: '@/pages/index' }],
  fastRefresh: {},
  mfsu: {},
  webpack5: {},
});
