// Reusable button. variant: "pill" (dark CTA) | "outline" (ghost)
export default function Button({ variant = 'pill', as = 'button', className = '', children, ...rest }) {
  const Tag = as
  return <Tag className={`btn btn-${variant} ${className}`} {...rest}>{children}</Tag>
}
