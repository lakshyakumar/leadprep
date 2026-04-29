// Inline SVG version of the CRACKED logo.
// Used in nav and anywhere the brand mark appears alongside text.
// Source of truth for shape; /public/favicon.svg mirrors this for browser tabs.
export default function LogoMark({ size = 22, withGradient = true, className = '' }) {
  if (withGradient) {
    const gradId = `cracked-mark-grad-${size}`
    return (
      <svg
        className={className}
        width={size}
        height={size}
        viewBox="0 0 64 64"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#7c6aff" />
            <stop offset="1" stopColor="#00d4aa" />
          </linearGradient>
        </defs>
        <rect width="64" height="64" rx="14" fill={`url(#${gradId})`} />
        <path
          d="M 47 21 A 15 15 0 1 0 47 43"
          stroke="#ffffff"
          strokeWidth="7"
          strokeLinecap="round"
          fill="none"
        />
        <line
          x1="36" y1="20" x2="22" y2="44"
          stroke="#0a0a0f"
          strokeWidth="2.5"
          strokeLinecap="round"
          opacity="0.32"
        />
      </svg>
    )
  }
  // Monochrome variant — inherits color via currentColor.
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 64 64" aria-hidden="true">
      <path
        d="M 47 21 A 15 15 0 1 0 47 43"
        stroke="currentColor" strokeWidth="7" strokeLinecap="round" fill="none"
      />
      <line
        x1="36" y1="20" x2="22" y2="44"
        stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" opacity="0.45"
      />
    </svg>
  )
}
