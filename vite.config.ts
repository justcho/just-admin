import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import compression from "vite-plugin-compression";
import path from "path";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import Components from "unplugin-vue-components/vite";
import { AntDesignVueResolver } from "unplugin-vue-components/resolvers";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/just-admin/",
  plugins: [
    vue(),
    Components({
      resolvers: [
        AntDesignVueResolver({
          importStyle: false, // css in js
        }),
      ],
    }),
    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), "src/assets/icons")],
      symbolId: "icon-[dir]-[name]",
    }),
    compression({
      // 使用gzip压缩
      ext: ".gz",
      deleteOriginFile: false,
      // 使用brotli压缩
      // ext: '.br',
      // algorithm: 'brotliCompress',
      // deleteOriginFile: false
    }),
  ],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  // vite 相关配置
  server: {
    // port: 80,
    // host: true,
    // open: true,
    proxy: {
      // https://cn.vitejs.dev/config/#server-proxy
      "/dev-api": {
        target: "https://api.apiopen.top",
        changeOrigin: true,
        rewrite: (p) => p.replace(/^\/dev-api/, ""),
      },
      "/prod-api": {
        target: "https://api.apiopen.top",
        changeOrigin: true,
        rewrite: (p) => p.replace(/^\/dev-api/, ""),
      },
    },
  },
});
