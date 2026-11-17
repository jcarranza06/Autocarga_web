export default function Logo({ size = 34 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" aria-hidden="true">
      <rect width="40" height="40" rx="11" fill="var(--accent)" />
      <path d="M22.5 7 11 22.5h8l-1.5 10.5L29 17.5h-8L22.5 7z" fill="var(--ink)" />
    </svg>
  )
}
