import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// TODO: FIX THE GITHUB PAGES(LOWEST PRIORITY)

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: 'group-6-', // repo name
})
