import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import path from "path"

// Vite configuration for React + TypeScript
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 3000,
    open: true,
  },
})
