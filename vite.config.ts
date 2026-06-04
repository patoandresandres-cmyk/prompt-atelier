import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  // Relative base so the build works on GitHub Pages, Netlify, Vercel or any static host.
  base: './',
  plugins: [react(), tailwindcss()],
})
