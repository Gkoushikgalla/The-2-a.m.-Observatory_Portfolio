import React, { useState, useRef } from 'react'

export default function PhotoLens() {
  const [isFocused, setIsFocused] = useState(false)
  const [imgError, setImgError] = useState(false)
  const [coords, setCoords] = useState({ x: 190, y: 190 })
  const frameRef = useRef(null)

  const handlePointerMove = (e) => {
    if (!frameRef.current) return
    const rect = frameRef.current.getBoundingClientRect()
    const x = Math.max(0, Math.min(rect.width, e.clientX - rect.left))
    const y = Math.max(0, Math.min(rect.height, e.clientY - rect.top))
    setCoords({ x, y })
    if (!isFocused) setIsFocused(true)
  }

  const handlePointerDown = (e) => {
    handlePointerMove(e)
    setIsFocused(true)
  }

  const handlePointerLeave = () => {
    setIsFocused(false)
  }

  const handlePointerUp = () => {
    // On touch devices, remove focus on release
    if (window.matchMedia('(hover: none)').matches) {
      setIsFocused(false)
    }
  }

  return (
    <div
      data-photo-lens
      className="flex flex-col items-center select-none"
      aria-label="Telescope lens focusing on Koushik Galla"
    >
      <div className="relative flex items-center justify-center p-6">
        {/* Slowly rotating SVG dial */}
        <div
          className="absolute inset-0 pointer-events-none flex items-center justify-center lens-dial"
          style={{ animation: 'dial-spin 80s linear infinite' }}
          aria-hidden="true"
        >
          <svg
            className="w-full h-full max-w-[430px] max-h-[430px]"
            viewBox="0 0 440 440"
            fill="none"
          >
            {/* Outer calibration dashed circle */}
            <circle
              cx="220"
              cy="220"
              r="210"
              stroke="var(--line)"
              strokeWidth="1.2"
              strokeDasharray="3 8"
            />
            {/* Fine secondary ring */}
            <circle
              cx="220"
              cy="220"
              r="204"
              stroke="var(--line)"
              strokeWidth="0.8"
              opacity="0.5"
            />
            {/* 3 Amber calibration dots at 0, 120, 240 deg */}
            <circle cx="220" cy="10" r="3.5" fill="var(--accent)" />
            <circle cx="395" cy="320" r="3.5" fill="var(--accent)" />
            <circle cx="45" cy="320" r="3.5" fill="var(--accent)" />
          </svg>
        </div>

        {/* Circular Telescope Lens Frame */}
        <div
          ref={frameRef}
          onPointerMove={handlePointerMove}
          onPointerDown={handlePointerDown}
          onPointerLeave={handlePointerLeave}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          className="relative rounded-full overflow-hidden w-[260px] h-[260px] sm:w-[320px] sm:h-[320px] md:w-[380px] md:h-[380px] shrink-0 touch-none md:cursor-none"
          style={{
            border: '1.5px solid var(--accent)',
            boxShadow: '0 0 35px rgba(240, 169, 79, 0.22), inset 0 0 30px rgba(7, 11, 31, 0.7)',
            backgroundColor: 'var(--bg2)',
            '--mx': `${coords.x}px`,
            '--my': `${coords.y}px`,
          }}
        >
          {!imgError ? (
            <>
              {/* Layer 1: Base blurry tinted photo */}
              <img
                src="/koushik.jpg"
                alt="Portrait of Koushik Galla"
                width={380}
                height={380}
                onError={() => setImgError(true)}
                className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                style={{
                  filter: 'grayscale(100%) contrast(1.15) brightness(0.85) blur(3px)',
                  transform: 'scale(1.04)',
                }}
              />

              {/* Tint Overlay on base photo */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'linear-gradient(160deg, #2b3d99, #f0a94f)',
                  mixBlendMode: 'color',
                  opacity: 0.75,
                }}
              />

              {/* Layer 2: Sharp full-colour photo clipped by circle */}
              <img
                src="/koushik.jpg"
                alt=""
                aria-hidden="true"
                width={380}
                height={380}
                className="absolute inset-0 w-full h-full object-cover pointer-events-none transition-[clip-path] duration-350 ease-out"
                style={{
                  clipPath: isFocused
                    ? `circle(84px at var(--mx) var(--my))`
                    : `circle(0px at var(--mx) var(--my))`,
                }}
              />
            </>
          ) : (
            /* Fallback KG Monogram */
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-[radial-gradient(circle_at_center,var(--bg2)_0%,var(--bg)_100%)]">
              <span className="font-display text-7xl text-[var(--accent)] tracking-tight">
                KG
              </span>
              <span className="text-xs text-[var(--muted)] mt-2 font-mono tracking-widest uppercase">
                2 a.m. Observatory
              </span>
            </div>
          )}

          {/* Layer 3: Amber reticle ring following pointer (168px diameter = 84px radius) */}
          <div
            className="absolute pointer-events-none rounded-full transition-opacity duration-300"
            style={{
              width: '168px',
              height: '168px',
              border: '1px solid var(--accent)',
              boxShadow: '0 0 16px rgba(240, 169, 79, 0.45)',
              transform: `translate(calc(var(--mx) - 84px), calc(var(--my) - 84px))`,
              opacity: isFocused ? 1 : 0,
            }}
          >
            {/* Center crosshair notches */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 border-t border-[var(--accent)]"></div>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 border-b border-[var(--accent)]"></div>
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 border-l border-[var(--accent)]"></div>
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 border-r border-[var(--accent)]"></div>
          </div>
        </div>
      </div>

      {/* Caption below lens */}
      <p className="mt-3 text-xs sm:text-sm text-[var(--muted)] text-center tracking-wide font-body">
        Move over the lens to bring me into focus.
      </p>
    </div>
  )
}
