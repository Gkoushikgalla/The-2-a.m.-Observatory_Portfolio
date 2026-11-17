import React, { useEffect, useRef, useState } from 'react'

export function CoffeeStatChip() {
  const [count, setCount] = useState(0)
  const [hasTriggered, setHasTriggered] = useState(false)
  const containerRef = useRef(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reducedMotion) {
      setCount(1024)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        if (entry.isIntersecting && !hasTriggered) {
          setHasTriggered(true)
          const target = 1024
          const duration = 1600
          const startTime = performance.now()

          const animate = (now) => {
            const elapsed = now - startTime
            const progress = Math.min(1, elapsed / duration)
            // Ease out cubic
            const easeOut = 1 - Math.pow(1 - progress, 3)
            setCount(Math.floor(easeOut * target))
            if (progress < 1) {
              requestAnimationFrame(animate)
            } else {
              setCount(target)
            }
          }
          requestAnimationFrame(animate)
        }
      },
      { threshold: 0.6 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [hasTriggered])

  return (
    <div
      ref={containerRef}
      className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full text-sm font-medium transition-all"
      style={{
        backgroundColor: 'rgba(240, 169, 79, 0.1)',
        border: '1px solid rgba(240, 169, 79, 0.25)',
        color: 'var(--ink)',
      }}
    >
      <span className="text-base" role="img" aria-label="Coffee cup">
        ☕
      </span>
      <span>
        <strong className="text-[var(--accent)] font-semibold">
          {count.toLocaleString('en-IN')}
        </strong>{' '}
        cups of strong black coffee logged (a generous estimate)
      </span>
    </div>
  )
}

export default function LogEntry({ date, title, org, bullets }) {
  return (
    <div className="relative pl-7 sm:pl-9 pb-10 last:pb-2 group">
      {/* Vertical line connecting entries */}
      <div
        className="absolute left-[7px] sm:left-[9px] top-3 bottom-0 w-[1px]"
        style={{ backgroundColor: 'var(--line)' }}
        aria-hidden="true"
      />

      {/* Amber ring dot */}
      <div
        className="absolute left-0 sm:left-[2px] top-1.5 w-3.5 h-3.5 rounded-full transition-transform group-hover:scale-125"
        style={{
          border: '2px solid var(--accent)',
          backgroundColor: 'var(--bg)',
          boxShadow: '0 0 10px rgba(240, 169, 79, 0.4)',
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="space-y-1.5">
        <span
          className="text-xs font-semibold tracking-wider uppercase font-body"
          style={{ color: 'var(--accent)' }}
        >
          {date}
        </span>
        <h3 className="text-lg font-medium text-[var(--ink)] leading-snug">
          {title}
        </h3>
        <p className="text-sm text-[var(--muted)] font-normal">{org}</p>
        {bullets && bullets.length > 0 && (
          <ul className="mt-3 space-y-1.5 text-sm text-[var(--muted)] list-disc pl-4">
            {bullets.map((b, i) => (
              <li key={i} className="leading-relaxed">
                {b}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
