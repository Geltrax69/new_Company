import { useEffect, useId, useRef, useState } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import Button from './Button.jsx'

const WORK_MENU = [['Web & product', '/work'], ['Graphic design', '/work']]
const SERVICES_MENU = [['Design', '/services'], ['No-code development', '/services'], ['Marketing', '/services'], ['Software development', '/services']]

function Dropdown({ label, to, items, onNavigate }) {
  const [open, setOpen] = useState(false)
  const toggleRef = useRef(null)
  const id = useId()
  const { pathname } = useLocation()
  useEffect(() => setOpen(false), [pathname])

  return (
    <div className="nav-dd" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}
      onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false) }}
      onKeyDown={(event) => {
        if (event.key === 'Escape') {
          event.stopPropagation()
          setOpen(false)
          toggleRef.current?.focus()
        }
      }}>
      <NavLink to={to} className="nav-dd-trigger" onClick={onNavigate}>{label}</NavLink>
      <button ref={toggleRef} type="button" className="nav-dd-toggle" aria-expanded={open} aria-controls={id}
        aria-label={`Show ${label} submenu`} onClick={() => setOpen((value) => !value)}>
        <span className="caret" aria-hidden="true" />
      </button>
      <div id={id} className={`nav-dd-menu ${open ? 'is-open' : ''}`}>
        {items.map(([title, href]) => <Link key={title} to={href} onClick={() => { setOpen(false); onNavigate() }}>{title}</Link>)}
      </div>
    </div>
  )
}

export default function NavBar() {
  const [open, setOpen] = useState(false)
  const burgerRef = useRef(null)
  const { pathname } = useLocation()
  const close = () => setOpen(false)
  useEffect(close, [pathname])
  useEffect(() => {
    if (!open) return
    const escape = (event) => {
      if (event.key === 'Escape') { setOpen(false); burgerRef.current?.focus() }
    }
    document.addEventListener('keydown', escape)
    return () => document.removeEventListener('keydown', escape)
  }, [open])

  return (
    <header className="nav">
      <Link to="/" className="logo" onClick={close}>Simpedu<span>:</span></Link>
      <nav id="primary-navigation" aria-label="Main navigation" className={`nav-links ${open ? 'is-open' : ''}`}>
        <Dropdown label="Our work" to="/work" items={WORK_MENU} onNavigate={close} />
        <Dropdown label="Services & solutions" to="/services" items={SERVICES_MENU} onNavigate={close} />
        <NavLink to="/about" onClick={close}>About us</NavLink>
        <NavLink to="/blog" onClick={close}>Blog</NavLink>
        <NavLink to="/love" className="nav-love" onClick={close}>♥ Love</NavLink>
        <NavLink to="/apply" onClick={close}>Careers</NavLink>
        <div className="nav-mobile-cta"><Button as={Link} to="/book" onClick={close}>Book demo</Button></div>
      </nav>
      <div className="nav-right"><Button as={Link} to="/book">Book demo</Button></div>
      <button ref={burgerRef} type="button" className="nav-burger" aria-label="Menu" aria-controls="primary-navigation" aria-expanded={open} onClick={() => setOpen((value) => !value)}>
        <span /><span /><span />
      </button>
    </header>
  )
}
