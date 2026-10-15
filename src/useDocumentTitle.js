import { useEffect } from 'react'

// Sets <title> and <meta name="description"> for the current page.
// ponytail: native DOM over react-helmet — a SPA only needs document.title + one meta tag.
export default function useDocumentTitle(title, description) {
  useEffect(() => {
    document.title = title ? `${title} — Simpedu LLP` : 'Simpedu LLP — Less manual. More impact'
    if (description) {
      let tag = document.querySelector('meta[name="description"]')
      if (!tag) {
        tag = document.createElement('meta')
        tag.setAttribute('name', 'description')
        document.head.appendChild(tag)
      }
      tag.setAttribute('content', description)
    }
  }, [title, description])
}
