import { Link } from 'react-router-dom'
import Button from './Button.jsx'

// Reusable pricing tier card. price is the already-resolved number for the active period.
export default function PricingCard({ name, blurb, price, period, features, featured, cta = 'Select plan' }) {
  return (
    <div className={`price-card ${featured ? 'price-featured' : ''}`}>
      {featured && <span className="price-tag">Most popular</span>}
      <h3 className="heading-sm">{name}</h3>
      <p className="price-blurb">{blurb}</p>
      <div className="price-amount">
        <span className="num">${price.toLocaleString()}</span>
        <span className="per">/{period === 'annually' ? 'mo, billed yearly' : 'month'}</span>
      </div>
      <Button as={Link} to="/book" variant={featured ? 'pill' : 'outline'}>{cta}</Button>
      <ul className="price-features">
        {features.map((f) => <li key={f}>✓ {f}</li>)}
      </ul>
    </div>
  )
}
