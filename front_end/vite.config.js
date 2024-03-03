import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/static/', // Adjust based on your Django STATIC_URL
  plugins: [react()],
});

