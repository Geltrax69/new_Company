import test from 'node:test'
import assert from 'node:assert/strict'
import { createEmailHandler } from '../server/email.js'
const env = { RESEND_API_KEY: 'test-key', EMAIL_SEND: 'sender@example.com', EMAIL_SEND_MULTIPLE: 'one@example.com,two@example.com' }
const request = async (body, send, configuration = env, method = 'POST') => {
  const res = { headers: {}, setHeader(name, value) { this.headers[name] = value }, end(value) { this.body = JSON.parse(value) } }
  await createEmailHandler(configuration, send)({ body, method }, res)
  return res
}
test('demo sends a validated Resend payload and acknowledges its reference', async () => {
  let payload
  const res = await request({ type: 'demo', name: '<Ada & team>', email: 'reply@example.com', company: 'School', about: 'A dashboard' }, async (url, options) => {
    assert.equal(url, 'https://api.resend.com/emails')
    payload = JSON.parse(options.body)
    assert.match(options.headers.Authorization, /^Bearer /)
    return { ok: true, json: async () => ({ id: 'verified-test-reference' }) }
  })
  assert.equal(res.statusCode, 200)
  assert.equal(res.body.id, 'verified-test-reference')
  assert.deepEqual(payload.to, ['one@example.com', 'two@example.com'])
  assert.equal(payload.reply_to, 'reply@example.com')
  assert.match(payload.html, /&lt;Ada &amp; team&gt;/)
})
test('invalid enquiries never contact the provider', async () => {
  const never = () => { throw new Error('Provider must not be called') }
  for (const body of [{ type: 'demo', email: 'bad' }, { type: 'demo', email: 'valid@example.com' }, { type: 'other', email: 'valid@example.com' }, { type: 'careers', name: 'A', email: 'valid@example.com', portfolio: 'javascript:bad' }]) {
    assert.equal((await request(body, never)).statusCode, 400)
  }
})
test('missing credentials return an actionable unavailable response', async () => {
  const res = await request({ type: 'lead', email: 'reply@example.com' }, () => { throw new Error('No provider') }, {})
  assert.equal(res.statusCode, 503)
})
test('provider rejection and network failure cannot produce success', async () => {
  const body = { type: 'lead', email: 'reply@example.com' }
  for (const send of [async () => ({ ok: false, status: 403 }), async () => { throw new Error('network') }, async () => ({ ok: true, json: async () => ({}) })]) {
    const res = await request(body, send)
    assert.equal(res.statusCode, 502)
    assert.equal(res.body.ok, undefined)
  }
})
test('non-POST requests return JSON 405', async () => {
  assert.equal((await request({}, () => {}, env, 'GET')).statusCode, 405)
})
