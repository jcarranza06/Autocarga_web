// Shows the picture when a src is set in config.js,
// otherwise a styled placeholder with a description.
export default function ImageSlot({ image, alt, label, className = '' }) {
  if (image?.src) {
    return (
      <img
        className={`img-slot ${className}`}
        src={image.src}
        width={image.width}
        height={image.height}
        alt={alt}
        loading="lazy"
        decoding="async"
      />
    )
  }
  return (
    <div className={`img-slot img-slot--empty ${className}`} role="img" aria-label={alt}>
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <circle cx="9" cy="10" r="2" />
        <path d="m21 16-5-5-9 9" />
      </svg>
      <span>{label}</span>
    </div>
  )
}
