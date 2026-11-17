import React, { useState, useEffect } from 'react'
import {
  summary,
  experience,
  education,
  projects,
  skillSheet,
  certifications,
  LINKS,
} from '../data/resume'
import { FiPrinter, FiDownload } from 'react-icons/fi'

export default function ResumePaper() {
  const [cvExists, setCvExists] = useState(true)

  useEffect(() => {
    // Check if Koushik_CV.pdf is reachable
    fetch('/Koushik_CV.pdf', { method: 'HEAD' })
      .then((res) => {
        if (!res.ok) setCvExists(false)
      })
      .catch(() => setCvExists(false))
  }, [])

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="w-full flex flex-col items-center">
      {/* Top Action Controls */}
      <div className="no-print flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-6">
        <button
          onClick={handlePrint}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all shadow-sm hover:scale-105 cursor-pointer"
          style={{
            backgroundColor: 'var(--accent)',
            color: '#070b1f',
          }}
          aria-label="Save as PDF or print résumé"
        >
          <FiPrinter className="text-base" />
          <span>Save as PDF</span>
        </button>

        {cvExists && (
          <a
            href="/Koushik_CV.pdf"
            download="Koushik_Galla_CV.pdf"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all hover:bg-[var(--line)] border"
            style={{
              borderColor: 'var(--line)',
              color: 'var(--ink)',
            }}
          >
            <FiDownload className="text-base" />
            <span>Download CV</span>
          </a>
        )}
      </div>

      {/* Cream Paper Panel (Max 760px) */}
      <div
        id="resume-paper"
        className="w-full max-w-[760px] p-6 sm:p-10 md:p-12 rounded-xl text-left transition-all shadow-xl"
        style={{
          backgroundColor: '#faf6ee',
          color: '#1a1917',
          border: '1px solid #e2d9c8',
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.35)',
        }}
      >
        {/* Header */}
        <header className="border-b border-[#ded4c0] pb-6 mb-6">
          <h2 className="font-display text-3xl sm:text-4xl text-[#111110] tracking-tight">
            Gnana Sri Koushik Galla
          </h2>
          <p className="text-sm font-semibold tracking-wide text-[#b8650a] mt-1">
            AI-focused Software Engineer
          </p>
          <div className="flex flex-wrap items-center gap-y-1 gap-x-3 text-xs text-[#524e46] mt-3">
            <span>Hyderabad, India</span>
            <span>•</span>
            <a
              href={`mailto:${LINKS.email}`}
              className="underline hover:text-[#b8650a]"
            >
              {LINKS.email}
            </a>
            <span>•</span>
            <a
              href={`tel:+91${LINKS.phone}`}
              className="underline hover:text-[#b8650a]"
            >
              +91 {LINKS.phone}
            </a>
            <span>•</span>
            <a
              href={LINKS.github}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-[#b8650a]"
            >
              github.com/Gkoushikgalla
            </a>
          </div>
        </header>

        {/* Summary */}
        <section className="mb-6">
          <h3 className="text-xs font-bold uppercase tracking-widest text-[#8a7f6c] mb-2">
            Professional Summary
          </h3>
          <p className="text-sm text-[#2e2c28] leading-relaxed">{summary}</p>
        </section>

        {/* Experience */}
        <section className="mb-6">
          <h3 className="text-xs font-bold uppercase tracking-widest text-[#8a7f6c] mb-3">
            Experience
          </h3>
          <div className="space-y-4">
            {experience.map((exp, i) => (
              <div key={i}>
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                  <h4 className="text-sm font-bold text-[#111110]">
                    {exp.title}
                  </h4>
                  <span className="text-xs font-mono text-[#736b5c]">
                    {exp.dates}
                  </span>
                </div>
                <p className="text-xs font-medium text-[#b8650a] mb-1.5">
                  {exp.org}
                </p>
                <ul className="list-disc pl-4 space-y-1 text-xs text-[#383530] leading-relaxed">
                  {exp.bullets.slice(0, 3).map((bullet, idx) => (
                    <li key={idx}>{bullet}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Projects */}
        <section className="mb-6">
          <h3 className="text-xs font-bold uppercase tracking-widest text-[#8a7f6c] mb-3">
            Selected Projects
          </h3>
          <div className="space-y-3.5">
            {projects.map((proj, i) => (
              <div key={i}>
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                  <h4 className="text-sm font-bold text-[#111110]">
                    {proj.title}
                  </h4>
                  <span className="text-xs font-medium text-[#8a7f6c]">
                    {proj.badge}
                  </span>
                </div>
                <p className="text-xs text-[#b8650a] font-mono mb-1">
                  {proj.stack}
                </p>
                <ul className="list-disc pl-4 space-y-0.5 text-xs text-[#383530] leading-relaxed">
                  {proj.bullets.slice(0, 2).map((b, idx) => (
                    <li key={idx}>{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Education */}
        <section className="mb-6">
          <h3 className="text-xs font-bold uppercase tracking-widest text-[#8a7f6c] mb-3">
            Education
          </h3>
          <div className="space-y-2">
            {education.map((edu, i) => (
              <div
                key={i}
                className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 text-xs"
              >
                <div>
                  <strong className="text-[#111110] font-semibold">
                    {edu.title}
                  </strong>
                  <span className="text-[#524e46]"> — {edu.org}</span>
                </div>
                <span className="font-mono text-[#736b5c] shrink-0">
                  {edu.dates}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Skills */}
        <section className="mb-6">
          <h3 className="text-xs font-bold uppercase tracking-widest text-[#8a7f6c] mb-2">
            Technical Skills
          </h3>
          <div className="space-y-1 text-xs text-[#2e2c28]">
            {skillSheet.map(([category, items]) => (
              <p key={category} className="leading-relaxed">
                <strong className="font-semibold text-[#111110]">
                  {category}:
                </strong>{' '}
                {items}
              </p>
            ))}
          </div>
        </section>

        {/* Certifications */}
        <section>
          <h3 className="text-xs font-bold uppercase tracking-widest text-[#8a7f6c] mb-2">
            Certifications
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-[#2e2c28]">
            {certifications.map((cert, i) => (
              <div key={i} className="flex items-baseline justify-between gap-2">
                <span>
                  • {cert.name}{' '}
                  <span className="text-[#736b5c]">({cert.issuer})</span>
                </span>
                <span className="font-mono text-[#736b5c] shrink-0">
                  {cert.year}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
