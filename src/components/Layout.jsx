import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import NavBar from './NavBar.jsx'
import Footer from './Footer.jsx'

// Scrolls to top on route change (or to a hash target if present).
function ScrollManager() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(decodeURIComponent(hash.slice(1)))
      if (el) { el.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' }); return }
    }
    window.scrollTo({ top: 0 })
  }, [pathname, hash])
  return null
}

export default function Layout() {
  return (
    <>
      <ScrollManager />
      <a className="skip-link" href="#main-content">Skip to content</a>
      <NavBar />
      <main id="main-content" tabIndex={-1}>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
