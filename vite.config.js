import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// Lets `npm run dev` run the Vercel function in /api/contact.js locally
// (reads variables from .env.local). In production Vercel runs it directly.
function localApi() {
  return {
    name: 'local-api',
    configureServer(server) {
      const env = loadEnv('development', process.cwd(), '')
      Object.assign(process.env, env)

      server.middlewares.use('/api/contact', async (req, res) => {
        try {
          const { POST } = await server.ssrLoadModule('/api/contact.js')
          if (req.method !== 'POST') {
            res.statusCode = 405
            return res.end()
          }
          const chunks = []
          for await (const chunk of req) chunks.push(chunk)
          const request = new Request('http://localhost/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: Buffer.concat(chunks),
          })
          const response = await POST(request)
          res.statusCode = response.status
          res.setHeader('Content-Type', 'application/json')
          res.end(await response.text())
        } catch (err) {
          console.error(err)
          res.statusCode = 500
          res.end(JSON.stringify({ ok: false, error: 'dev_error' }))
        }
      })
    },
  }
}

export default defineConfig({
  plugins: [react(), localApi()],
})
