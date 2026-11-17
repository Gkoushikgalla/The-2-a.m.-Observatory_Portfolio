import React from 'react'
import { orbit } from '../data/resume'

export default function OrbitDiagram() {
  const legendItems = [
    { label: 'Inner: daily drivers', period: '90s', color: 'var(--accent)' },
    { label: 'Middle: AI and vision', period: '140s', color: 'var(--star)' },
    { label: 'Outer: cloud and foundations', period: '210s', color: 'var(--muted)' },
  ]

  return (
    <div className="flex flex-col items-center w-full">
      {/* Orbit Container */}
      <div
        className="orbit-system relative mx-auto select-none overflow-hidden flex items-center justify-center rounded-full"
        style={{
          width: 'min(600px, 92vw)',
          height: 'min(600px, 92vw)',
          maxWidth: '600px',
          maxHeight: '600px',
        }}
        aria-label="Orbiting instruments diagram"
      >
        {/* Background Radial Glow */}
        <div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            background:
              'radial-gradient(circle at 50% 50%, rgba(240, 169, 79, 0.12) 0%, rgba(7, 11, 31, 0) 70%)',
          }}
        />

        {/* Orbit Rings and Rotating Groups */}
        {orbit.map((layer, layerIdx) => {
          // diameter as percentage of container
          const diameterPct = layer.radius * 2 * 100
          const radiusPct = layer.radius * 100

          return (
            <React.Fragment key={layerIdx}>
              {/* Static Dashed Ring Line */}
              <div
                className="absolute rounded-full pointer-events-none"
                style={{
                  width: `${diameterPct}%`,
                  height: `${diameterPct}%`,
                  border: '1px dashed var(--line)',
                  left: `${50 - radiusPct}%`,
                  top: `${50 - radiusPct}%`,
                }}
              />

              {/* Rotating Ring Container */}
              <div
                className="orbit-ring absolute inset-0 pointer-events-none"
                style={{
                  animation: `spin-cw ${layer.seconds}s linear infinite`,
                }}
              >
                {layer.items.map((item, itemIdx) => {
                  const angle = (360 / layer.items.length) * itemIdx
                  const rad = (angle * Math.PI) / 180
                  // Calculate percentage coordinates from center (50%)
                  const left = 50 + radiusPct * Math.cos(rad)
                  const top = 50 + radiusPct * Math.sin(rad)

                  return (
                    <div
                      key={item}
                      className="absolute pointer-events-auto"
                      style={{
                        left: `${left}%`,
                        top: `${top}%`,
                        transform: 'translate(-50%, -50%)',
                      }}
                    >
                      {/* Counter-rotating pill so text stays upright */}
                      <div
                        className="orbit-pill whitespace-nowrap rounded-full border shadow-sm transition-transform hover:scale-110 cursor-default"
                        style={{
                          animation: `unspin ${layer.seconds}s linear infinite`,
                          backgroundColor: 'var(--panel)',
                          borderColor:
                            layerIdx === 0
                              ? 'var(--accent)'
                              : layerIdx === 1
                              ? 'var(--star)'
                              : 'var(--line)',
                          color: 'var(--ink)',
                          padding: '4px 10px',
                          fontSize: 'clamp(10px, 2.2vw, 12px)',
                          fontWeight: 500,
                          backdropFilter: 'blur(8px)',
                          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
                        }}
                      >
                        {item}
                      </div>
                    </div>
                  )
                })}
              </div>
            </React.Fragment>
          )
        })}

        {/* Center: Coffee Cup Core Glow */}
        <div
          className="relative z-10 flex flex-col items-center justify-center rounded-full pointer-events-none"
          style={{
            width: '64px',
            height: '64px',
            backgroundColor: 'rgba(240, 169, 79, 0.16)',
            border: '1.5px solid var(--accent)',
            boxShadow: '0 0 25px rgba(240, 169, 79, 0.35)',
          }}
        >
          <span className="text-2xl" role="img" aria-label="Coffee cup core">
            ☕
          </span>
        </div>
      </div>

      {/* Legend below the orbit */}
      <div className="mt-6 flex flex-wrap justify-center gap-4 sm:gap-6 text-xs text-[var(--muted)]">
        {legendItems.map((legend, i) => (
          <div key={i} className="flex items-center gap-2">
            <span
              className="w-2.5 h-2.5 rounded-full inline-block"
              style={{ backgroundColor: legend.color }}
            />
            <span>{legend.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
