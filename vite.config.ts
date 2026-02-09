import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  base: '/~iliach/react/',
  plugins: [react(), tailwindcss()],
  test: {
    environment: 'happy-dom',
    globals: true,
    setupFiles: './vitest-setup.js',
  },
})
