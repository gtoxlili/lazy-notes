import {defineConfig, splitVendorChunkPlugin} from 'vite'
import react from '@vitejs/plugin-react'
import windiCSS from 'vite-plugin-windicss'
import tsConfigPath from 'vite-tsconfig-paths'
import jotaiDebugLabel from 'jotai/babel/plugin-debug-label'
import jotaiReactRefresh from 'jotai/babel/plugin-react-refresh'
import viteCompression from 'vite-plugin-compression'
import {VitePWA} from "vite-plugin-pwa";
// https://vitejs.dev/config/
export default defineConfig(env => ({
    plugins: [
        // only use react-fresh
        env.mode === 'development' && react({
            babel: {plugins: [jotaiDebugLabel, jotaiReactRefresh]},
        }),
        windiCSS(),
        tsConfigPath(),
        splitVendorChunkPlugin(),
        viteCompression({
            threshold: 10240,
            // verbose: false,
            deleteOriginFile: true,
        }), VitePWA({
            registerType: 'autoUpdate', // 自动更新
            injectRegister: 'inline', // 注入到html中
            manifest: {
                icons: [{
                    src: '//cdn.jsdelivr.net/gh/gtoxlili/lazy-notes/src/assets/logo.png',
                    sizes: '512x512',
                    type: 'image/png',
                }],
                start_url: '/',
                short_name: 'Lazy Notes',
                name: 'Lazy Notes',
            },
        })
    ],
    base: './',
    build: {reportCompressedSize: false},
}))
