import { Link } from 'react-router-dom'

const COLUMNS = [
  ['Product', [['Pricing', '/pricing'], ['Our work', '/work'], ['Services', '/services'], ['How it works', '/#how']]],
  ['Company', [['About us', '/about'], ['Blog', '/blog'], ['Love', '/love'], ['Careers', '/apply']]],
  ['Resources', [['Book a demo', '/book'], ['Contact us', '/work#contact'], ['Log in', '/login'], ['Privacy', '/privacy'], ['Terms', '/terms']]],
]

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-brand">
          <Link to="/" className="logo">Simpedu<span>:</span></Link>
          <p>Simpedu LLP — a software company born in education, now building across fields. Less manual. More impact.</p>
        </div>
        {COLUMNS.map(([title, links]) => (
          <div key={title} className="footer-col">
            <h3>{title}</h3>
            {links.map(([t, href]) => <Link key={t} to={href}>{t}</Link>)}
          </div>
        ))}
      </div>
      <div className="footer-bottom">
        <span>© 2026 Simpedu. All rights reserved.</span>
        <div className="footer-social">
          <a href="https://www.instagram.com/simpedu_/" target="_blank" rel="noreferrer" aria-label="Instagram">◎</a>
        </div>
      </div>
    </footer>
  )
}
