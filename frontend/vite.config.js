import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    allowedHosts: ['fb99bdd4dac5.ngrok-free.app'], // Add your ngrok domain here
    host: true, // Allow access from external devices (like ngrok)
    port: 5173, // You can change this if needed
  },
})
