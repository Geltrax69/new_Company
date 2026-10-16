import { useEffect } from 'react'

const DEFAULT_DESCRIPTION = 'Simpedu LLP — a software company born in education, now building across fields. School management systems, sports portals and live scoring platforms. Less manual. More impact.'

// Sets <title> and <meta name="description"> for the current page.
// Always writes a description (explicit or default) so route changes
// never leak the previous page's description into the meta tag.
export default function useDocumentTitle(title, description = DEFAULT_DESCRIPTION) {
  useEffect(() => {
    document.title = title ? `${title} — Simpedu LLP` : 'Simpedu LLP — Less manual. More impact'
    let tag = document.querySelector('meta[name="description"]')
    if (!tag) {
      tag = document.createElement('meta')
      tag.setAttribute('name', 'description')
      document.head.appendChild(tag)
    }
    tag.setAttribute('content', description)
  }, [title, description])
}
