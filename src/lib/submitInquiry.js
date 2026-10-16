export async function submitInquiry(data) {
  let response
  try {
    response = await fetch('/api/send-email', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data), signal: AbortSignal.timeout(18000) })
  } catch {
    throw new Error('We couldn’t reach the email service. Please retry or email contact@simpedu.in.')
  }
  const result = await response.json().catch(() => null)
  if (!response.ok || !result?.ok || !result?.id) throw new Error(result?.error || 'We couldn’t confirm delivery. Please retry or email contact@simpedu.in.')
  return result
}
