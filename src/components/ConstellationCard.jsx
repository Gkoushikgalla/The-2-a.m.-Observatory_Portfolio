import React, { useState } from 'react'
import { FiExternalLink, FiGithub, FiFileText } from 'react-icons/fi'

export default function ConstellationCard({ project }) {
  const [isHovered, setIsHovered] = useState(false)

  const pointsString = project.points.map(([x, y]) => `${x},${y}`).join(' ')

  const getLinkIcon = (name) => {
    const lower = name.toLowerCase()
    if (lower.includes('github') || lower.includes('gitlab')) return <FiGithub className="inline mr-1.5" />
    if (lower.includes('paper') || lower.includes('ieee')) return <FiFileText className="inline mr-1.5" />
    return <FiExternalLink className="inline mr-1.5" />
  }

  // Filter links with actual URLs provided
  const validLinks = Object.entries(project.links || {}).filter(
    ([, url]) => typeof url === 'string' && url.trim().length > 0
  )

  return (
    <article
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative flex flex-col justify-between p-6 rounded-[18px] transition-all duration-300"
      style={{
        backgroundColor: 'var(--panel)',
        border: `1px solid ${isHovered ? 'var(--accent)' : 'var(--line)'}`,
        transform: isHovered ? 'translateY(-4px)' : 'none',
        boxShadow: isHovered
          ? '0 12px 30px rgba(7, 11, 31, 0.4), 0 0 15px rgba(240, 169, 79, 0.15)'
          : '0 4px 15px rgba(0, 0, 0, 0.15)',
      }}
    >
      <div>
        {/* SVG Constellation Header */}
        <div className="w-full h-24 mb-4 flex items-center justify-center overflow-hidden rounded-lg bg-[rgba(7,11,31,0.3)]">
          <svg
            viewBox="0 0 100 80"
            className="w-full h-full max-h-20"
            aria-hidden="true"
          >
            {/* Constellation line drawing */}
            <polyline
              points={pointsString}
              fill="none"
              stroke="var(--accent)"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              pathLength="1"
              style={{
                strokeDasharray: 1,
                strokeDashoffset: isHovered ? 0 : 1,
                transition: 'stroke-dashoffset 1.2s ease-in-out',
                opacity: isHovered ? 0.9 : 0.4,
              }}
            />

            {/* Constellation stars (the third point is larger and amber) */}
            {project.points.map(([x, y], idx) => {
              const isThird = idx === 2
              return (
                <g key={idx}>
                  {isThird && (
                    <circle
                      cx={x}
                      cy={y}
                      r="4.5"
                      fill="var(--accent)"
                      opacity="0.3"
                    />
                  )}
                  <circle
                    cx={x}
                    cy={y}
                    r={isThird ? 3 : 1.8}
                    fill={isThird ? 'var(--accent)' : 'var(--star)'}
                    className="transition-transform duration-300"
                  />
                </g>
              )
            })}
          </svg>
        </div>

        {/* Badge */}
        <div className="flex items-center justify-between gap-2 mb-2.5">
          <span
            className="px-2.5 py-0.5 text-xs rounded-full font-medium tracking-wide"
            style={{
              backgroundColor: 'rgba(240, 169, 79, 0.12)',
              color: 'var(--accent)',
              border: '1px solid rgba(240, 169, 79, 0.25)',
            }}
          >
            {project.badge}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-display text-[var(--ink)] mb-1 leading-snug">
          {project.title}
        </h3>

        {/* Tech Stack */}
        <p
          className="text-xs font-medium tracking-wide mb-3"
          style={{ color: 'var(--accent)' }}
        >
          {project.stack}
        </p>

        {/* Bullets (top 3) */}
        <ul className="space-y-1.5 text-sm text-[var(--muted)] mb-4 list-disc pl-4">
          {project.bullets.slice(0, 3).map((bullet, i) => (
            <li key={i} className="leading-relaxed">
              {bullet}
            </li>
          ))}
        </ul>
      </div>

      {/* Conditional Link Buttons (only if links provided) */}
      {validLinks.length > 0 && (
        <div className="pt-3 border-t border-[var(--line)] flex flex-wrap gap-2 mt-auto">
          {validLinks.map(([name, url]) => (
            <a
              key={name}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-xs px-3 py-1.5 rounded-full font-medium transition-colors"
              style={{
                backgroundColor: 'rgba(223, 232, 255, 0.08)',
                color: 'var(--ink)',
                border: '1px solid var(--line)',
              }}
            >
              {getLinkIcon(name)}
              {name}
            </a>
          ))}
        </div>
      )}
    </article>
  )
}
