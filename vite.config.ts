import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'Form',
      filename: 'remoteEntry.js',
      exposes: {
        './Form': './src/App.tsx',
      },
      shared: ['react', 'react-dom', 'react-router-dom','react-redux','@reduxjs/toolkit'],
    }),
  ],
  server: {
     cors: true,
    proxy: {
      '/api': {
        target: 'https://jsonplaceholder.typicode.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  build: {
    modulePreload: false,
    target: "esnext",
    minify: false,
    // cssCodeSplit: true
  },
})
