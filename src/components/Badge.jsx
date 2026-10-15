// Reusable badge. variant: "yc" (ember) | "dark" | "overlay"
export default function Badge({ variant = 'dark', children, className = '' }) {
  return <span className={`badge badge-${variant} ${className}`}>{children}</span>
}
