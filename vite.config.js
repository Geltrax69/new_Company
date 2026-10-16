import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath } from 'node:url'
import { createEmailHandler } from './server/email.js'

export default defineConfig(({ mode }) => {
  const env = { ...loadEnv(mode, process.cwd(), ''), ...process.env }
  const emailApi = {
    name: 'local-inquiry-api',
    configureServer(server) {
      const handler = createEmailHandler(env)
      server.middlewares.use('/api/send-email', async (req, res) => {
        let body = ''
        try {
          for await (const chunk of req) {
            body += chunk
            if (Buffer.byteLength(body) > 16384) { res.statusCode = 413; res.setHeader('Content-Type', 'application/json'); res.end(JSON.stringify({ error: 'Request is too large.' })); return }
          }
          req.body = body ? JSON.parse(body) : {}
        } catch { res.statusCode = 400; res.setHeader('Content-Type', 'application/json'); res.end(JSON.stringify({ error: 'Invalid request.' })); return }
        await handler(req, res)
      })
    },
  }
  return {
    plugins: [react(), tailwindcss(), emailApi],
    resolve: { alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) } },
  }
})
