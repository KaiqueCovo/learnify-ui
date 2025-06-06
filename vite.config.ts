import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Otimizações de build
    rollupOptions: {
      output: {
        manualChunks: {
          // Separar vendor chunks para melhor cache
          vendor: ['react', 'react-dom'],
          ui: ['@radix-ui/react-dialog', '@radix-ui/react-toast', '@radix-ui/react-avatar'],
          routing: ['react-router-dom'],
          query: ['@tanstack/react-query'],
          icons: ['lucide-react'],
        },
      },
    },
    // Aumentar limite de chunk size warning
    chunkSizeWarningLimit: 600,
    // Otimizar para production
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
  // Preview configuration
  preview: {
    port: 8080,
    host: "::",
  },
  // Otimizações de desenvolvimento
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', '@tanstack/react-query'],
  },
});
