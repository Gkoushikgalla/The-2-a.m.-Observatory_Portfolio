import React from 'react'
import { certifications } from '../data/resume'
import { FiExternalLink } from 'react-icons/fi'

export default function CertList() {
  return (
    <div
      className="w-full rounded-2xl overflow-hidden border"
      style={{
        backgroundColor: 'var(--panel)',
        borderColor: 'var(--line)',
      }}
    >
      <ul className="divide-y divide-[var(--line)]">
        {certifications.map((cert, index) => {
          const content = (
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4 p-4 sm:p-5 hover:bg-[rgba(240,169,79,0.04)] transition-colors">
              <div className="flex items-start sm:items-center gap-3">
                <span
                  className="text-lg text-[var(--accent)] shrink-0 select-none mt-0.5 sm:mt-0"
                  aria-hidden="true"
                >
                  ✦
                </span>
                <div>
                  <h3 className="font-display text-lg sm:text-xl text-[var(--ink)] leading-snug">
                    {cert.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-[var(--muted)] font-normal mt-0.5">
                    {cert.issuer}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 self-end sm:self-auto shrink-0 pl-6 sm:pl-0">
                <span className="text-xs sm:text-sm font-mono text-[var(--muted)]">
                  {cert.year}
                </span>
                {cert.link && (
                  <FiExternalLink
                    className="text-[var(--accent)] text-sm"
                    aria-label="View credential"
                  />
                )}
              </div>
            </div>
          )

          return (
            <li key={index}>
              {cert.link ? (
                <a
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
                >
                  {content}
                </a>
              ) : (
                content
              )}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
