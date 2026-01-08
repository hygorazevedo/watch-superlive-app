import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'superlive',
      filename: 'remoteEntry.js',
      exposes: {
        './SuperliveApp': './src/SuperliveApp.tsx',
        './SuperliveStreamList': './src/components/StreamList.tsx',
        './SuperlivePlayer': './src/components/AgoraPlayer.tsx'
      },
      shared: ['react', 'react-dom', 'react-router-dom']
    })
  ],
  build: {
    target: 'esnext',
    minify: false
  },
  server: {
    host: true,
    port: 5175,
    proxy: {
      '/spl': {
        target: 'https://api.spl-web.link',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/spl/, '')
      },
    }
  }
})
