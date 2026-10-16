import test from 'node:test'
import assert from 'node:assert/strict'
import { submitInquiry } from '../src/lib/submitInquiry.js'

test('a static HTML fallback cannot masquerade as accepted email', async t => {
  t.mock.method(globalThis, 'fetch', async () => ({ ok: true, json: async () => { throw new Error('HTML') } }))
  await assert.rejects(submitInquiry({ email: 'audit@example.com' }), /confirm delivery/)
})
test('a real JSON acceptance returns the provider reference', async t => {
  t.mock.method(globalThis, 'fetch', async () => ({ ok: true, json: async () => ({ ok: true, id: 'provider-reference' }) }))
  assert.equal((await submitInquiry({ email: 'audit@example.com' })).id, 'provider-reference')
})
test('provider errors and network failures stay recoverable', async t => {
  const mocked = t.mock.method(globalThis, 'fetch', async () => ({ ok: false, json: async () => ({ error: 'Please retry delivery.' }) }))
  await assert.rejects(submitInquiry({ email: 'audit@example.com' }), /Please retry delivery/)
  mocked.mock.mockImplementation(async () => { throw new Error('offline') })
  await assert.rejects(submitInquiry({ email: 'audit@example.com' }), /retry or email/)
})
