/** Rating shown as a filled bar plus a numeral — more instrument than star. */
export default function StarRating({ value = 0, reviews, showValue = false, className = '' }) {
  const pct = Math.max(0, Math.min(100, (value / 5) * 100))
  return (
    <div className={`flex items-center gap-3 ${className}`} aria-label={`Rated ${value} out of 5`}>
      <div className="h-[3px] w-16 bg-line">
        <div className="h-full bg-signal" style={{ width: `${pct}%` }} />
      </div>
      {showValue && (
        <span className="font-mono text-[11px] font-light tabular-nums text-concrete">
          {value.toFixed(1)}{reviews != null && ` · ${reviews}`}
        </span>
      )}
    </div>
  )
}
