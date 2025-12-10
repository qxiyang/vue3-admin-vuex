import vue from '@vitejs/plugin-vue';
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from 'unplugin-vue-components/resolvers';

export default {
  server: {
    port: 8080,
  },
  plugins: [
    vue(),
    Components({
      resolvers: [VantResolver()],
    }),
  ],
};
