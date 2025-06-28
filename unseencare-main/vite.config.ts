import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  assetsInclude: ['**/*.mp4', '**/*.png', '**/*.svg', '**/*.jpg', '**/*.jpeg'],
  optimizeDeps: {
    exclude: ['lucide-react'],
    
  },
});
