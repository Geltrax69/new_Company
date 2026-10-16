import { createEmailHandler } from '../server/email.js'

// Vercel provides these server-side environment variables at runtime.
export default async function handler(req, res) {
  return createEmailHandler(process.env)(req, res)
}
