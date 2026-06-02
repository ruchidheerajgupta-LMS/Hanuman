import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          ui: ['lucide-react'],
        },
      },
    },
  },
  server: {
    port: 3000,
    host: '0.0.0.0',  // ✓ Listen on all interfaces for Docker
    proxy: {
      '/api': {
        target: 'http://nginx:80',  // ✓ Use service name in Docker network
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
