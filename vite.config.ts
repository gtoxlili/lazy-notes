import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import windiCSS from 'vite-plugin-windicss'
import tsConfigPath from 'vite-tsconfig-paths'
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        windiCSS(),
        tsConfigPath(),
    ],
    base: './',
    build: {reportCompressedSize: false},
})
