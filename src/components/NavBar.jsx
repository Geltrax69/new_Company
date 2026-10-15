import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import Button from './Button.jsx'

const WORK_MENU = [
  ['Web & product', '/work'],
  ['Graphic design', '/work'],
]
const SERVICES_MENU = [
  ['Design', '/services'],
  ['No-code development', '/services'],
  ['Marketing', '/services'],
  ['Software development', '/services'],
]

function Dropdown({ label, to, items }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="nav-dd" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <NavLink to={to} className="nav-dd-trigger">{label}</NavLink>
      <button
        type="button"
        className="nav-dd-toggle"
        aria-expanded={open}
        aria-label={`Show ${label} submenu`}
        onClick={() => setOpen(!open)}
      >
        <span className="caret" aria-hidden="true">⌄</span>
      </button>
      <div className={`nav-dd-menu ${open ? 'is-open' : ''}`}>
        {items.map(([t, href]) => <Link key={t} to={href}>{t}</Link>)}
      </div>
    </div>
  )
}

export default function NavBar() {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)
  return (
    <header className="nav">
      <Link to="/" className="logo" onClick={close}>Simpedu<span>:</span></Link>

      <nav className={`nav-links ${open ? 'is-open' : ''}`}>
        <Dropdown label="Our work" to="/work" items={WORK_MENU} />
        <Dropdown label="Services & solutions" to="/services" items={SERVICES_MENU} />
        <NavLink to="/about" onClick={close}>About us</NavLink>
        <NavLink to="/blog" onClick={close}>Blog</NavLink>
        <NavLink to="/love" className="nav-love" onClick={close}>♥ Love</NavLink>
        <NavLink to="/apply" onClick={close}>Careers</NavLink>
        <div className="nav-mobile-cta">
          <Button as={Link} to="/book" onClick={close}>Book demo</Button>
        </div>
      </nav>

      <div className="nav-right">
        <Button as={Link} to="/book">Book demo</Button>
      </div>

      <button className="nav-burger" aria-label="Menu" aria-expanded={open} onClick={() => setOpen((v) => !v)}>
        <span /><span /><span />
      </button>
    </header>
  )
}
