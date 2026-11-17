import React, { useState, useEffect } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Nav from './components/Nav'
import SkyCanvas from './components/SkyCanvas'
import PhotoLens from './components/PhotoLens'
import ConstellationCard from './components/ConstellationCard'
import LogEntry, { CoffeeStatChip } from './components/LogEntry'
import OrbitDiagram from './components/OrbitDiagram'
import SkillSheet from './components/SkillSheet'
import CertList from './components/CertList'
import ResumePaper from './components/ResumePaper'
import ContactForm from './components/ContactForm'
import { projects, experience, education } from './data/resume'

// Live Hyderabad 24h clock hook
function useHyderabadTime() {
  const [timeStr, setTimeStr] = useState('')

  useEffect(() => {
    const formatter = new Intl.DateTimeFormat('en-IN', {
      timeZone: 'Asia/Kolkata',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    })

    const updateTime = () => {
      setTimeStr(formatter.format(new Date()))
    }
    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  return timeStr
}

function PortfolioPage() {
  const [placedStarCount, setPlacedStarCount] = useState(0)
  const hyderabadTime = useHyderabadTime()
  const location = useLocation()

  // Handle hash scrolling on initial load or route transition
  useEffect(() => {
    if (location.hash) {
      const el = document.querySelector(location.hash)
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth' })
        }, 100)
      }
    }
  }, [location])

  return (
    <div className="relative min-h-screen text-[var(--ink)] overflow-x-hidden">
      {/* Background Fixed Sky Canvas */}
      <SkyCanvas onStarCountChange={setPlacedStarCount} />

      {/* Top Fixed Navigation */}
      <Nav />

      <main className="relative z-10 pt-16">
        {/* ======================================================== */}
        {/* 3.1 Hero Section (id="hero") */}
        {/* ======================================================== */}
        <section
          id="hero"
          className="min-h-[calc(100vh-4rem)] max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16 flex flex-col justify-between"
        >
          {/* Main Hero Grid: Two columns on desktop (text left, photo right), under 860px stack photo first */}
          <div className="grid grid-cols-1 min-[860px]:grid-cols-12 gap-8 sm:gap-12 items-center my-auto">
            {/* Photo Lens: order-1 on mobile/tablet (< 860px), order-2 on desktop */}
            <div className="order-1 min-[860px]:order-2 min-[860px]:col-span-5 flex justify-center">
              <PhotoLens />
            </div>

            {/* Text Content: order-2 on mobile/tablet, order-1 on desktop */}
            <div className="order-2 min-[860px]:order-1 min-[860px]:col-span-7 flex flex-col items-center min-[860px]:items-start text-center min-[860px]:text-left">
              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.08] tracking-tight text-[var(--ink)]">
                Software, charted like a{' '}
                <span className="italic" style={{ color: 'var(--accent)' }}>
                  night sky.
                </span>
              </h1>

              <p className="mt-6 text-base sm:text-lg text-[var(--muted)] leading-relaxed max-w-2xl font-body">
                I'm Gnana Sri Koushik Galla, an AI-focused software engineer in
                Hyderabad. I build intelligent applications: LLM orchestration,
                machine learning systems and full-stack products. Usually after
                midnight, always with strong black coffee.
              </p>

              {/* CTAs */}
              <div className="mt-8 flex flex-wrap gap-4 justify-center min-[860px]:justify-start">
                <a
                  href="#projects"
                  className="px-6 py-3 rounded-full text-sm font-semibold transition-all hover:scale-105 shadow-md cursor-pointer"
                  style={{
                    backgroundColor: 'var(--accent)',
                    color: '#070b1f',
                  }}
                >
                  Read the night's log
                </a>
                <a
                  href="#resume"
                  className="px-6 py-3 rounded-full text-sm font-medium transition-all hover:bg-[var(--line)] border cursor-pointer"
                  style={{
                    borderColor: 'var(--line)',
                    color: 'var(--ink)',
                  }}
                >
                  See the résumé
                </a>
              </div>
            </div>
          </div>

          {/* Hero Bottom Bar */}
          <div
            className="mt-12 pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[var(--muted)]"
            style={{ borderColor: 'var(--line)' }}
          >
            <div className="flex items-center gap-2">
              <span
                className="w-2 h-2 rounded-full inline-block animate-pulse"
                style={{ backgroundColor: 'var(--accent)' }}
              />
              <span>
                Tap the sky to place a star.{' '}
                <strong className="text-[var(--accent)] font-semibold">
                  {placedStarCount} placed
                </strong>
              </span>
            </div>

            <div className="flex items-center gap-2 font-mono">
              <span>Hyderabad</span>
              <span>•</span>
              <span className="text-[var(--ink)] font-medium">
                {hyderabadTime || '00:00:00'}
              </span>
            </div>
          </div>
        </section>

        {/* ======================================================== */}
        {/* 3.3 Projects Section (id="projects") */}
        {/* ======================================================== */}
        <section
          id="projects"
          className="max-w-6xl mx-auto px-4 sm:px-6 py-20 sm:py-28"
        >
          <div className="text-center sm:text-left mb-12">
            <h2 className="font-display text-3xl sm:text-4xl text-[var(--ink)] tracking-tight">
              Stars I've charted
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[var(--muted)]">
              Each project is a small constellation. Hover one to draw it.
            </p>
          </div>

          {/* Projects Grid: min column 330px */}
          <div
            className="grid gap-6"
            style={{
              gridTemplateColumns: 'repeat(auto-fill, minmax(330px, 1fr))',
            }}
          >
            {projects.map((project, i) => (
              <ConstellationCard key={i} project={project} />
            ))}
          </div>
        </section>

        {/* ======================================================== */}
        {/* 3.4 Log Section (id="logbook") */}
        {/* ======================================================== */}
        <section
          id="logbook"
          className="max-w-4xl mx-auto px-4 sm:px-6 py-20 sm:py-28"
        >
          <div className="text-center sm:text-left mb-12">
            <h2 className="font-display text-3xl sm:text-4xl text-[var(--ink)] tracking-tight">
              The night log
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[var(--muted)]">
              Three internships in a row, newest first, then where I studied.
            </p>
          </div>

          {/* Coffee Count-up Stat Chip */}
          <div className="mb-10 text-center sm:text-left">
            <CoffeeStatChip />
          </div>

          {/* Experience Timeline */}
          <div className="relative mb-14">
            {experience.map((entry, idx) => (
              <LogEntry
                key={idx}
                date={entry.dates}
                title={entry.title}
                org={entry.org}
                bullets={entry.bullets}
              />
            ))}
          </div>

          {/* Education Sub-heading & Entries */}
          <div className="pt-4 border-t border-[var(--line)]">
            <h3 className="font-display text-2xl text-[var(--ink)] mb-8 mt-6">
              Where I studied
            </h3>
            <div className="relative">
              {education.map((edu, idx) => (
                <LogEntry
                  key={idx}
                  date={edu.dates}
                  title={edu.title}
                  org={edu.org}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ======================================================== */}
        {/* 3.5 Tools / Instruments Section (id="instruments") */}
        {/* ======================================================== */}
        <section
          id="instruments"
          className="max-w-6xl mx-auto px-4 sm:px-6 py-20 sm:py-28"
        >
          <div className="text-center sm:text-left mb-12">
            <h2 className="font-display text-3xl sm:text-4xl text-[var(--ink)] tracking-tight">
              Instruments on the bench
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[var(--muted)]">
              Three celestial orbits around continuous caffeine. Hover to pause.
            </p>
          </div>

          {/* Orbit Diagram */}
          <OrbitDiagram />

          {/* Technical Skill Sheet */}
          <SkillSheet />
        </section>

        {/* ======================================================== */}
        {/* 3.6 Certifications Section (id="certs") */}
        {/* ======================================================== */}
        <section
          id="certs"
          className="max-w-4xl mx-auto px-4 sm:px-6 py-20 sm:py-28"
        >
          <div className="text-center sm:text-left mb-12">
            <h2 className="font-display text-3xl sm:text-4xl text-[var(--ink)] tracking-tight">
              Calibrations
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[var(--muted)]">
              Formal credentials, industry certifications, and coursework.
            </p>
          </div>

          <CertList />
        </section>

        {/* ======================================================== */}
        {/* 3.7 Résumé Section (id="resume") */}
        {/* ======================================================== */}
        <section
          id="resume"
          className="max-w-5xl mx-auto px-4 sm:px-6 py-20 sm:py-28"
        >
          <div className="no-print text-center sm:text-left mb-12">
            <h2 className="font-display text-3xl sm:text-4xl text-[var(--ink)] tracking-tight">
              Clean sheet
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[var(--muted)]">
              A printable transcript formatted for review. Click Save as PDF to print.
            </p>
          </div>

          <ResumePaper />
        </section>

        {/* ======================================================== */}
        {/* 3.8 Contact Section (id="contact") */}
        {/* ======================================================== */}
        <section
          id="contact"
          className="max-w-4xl mx-auto px-4 sm:px-6 py-20 sm:py-28"
        >
          <div className="text-center mb-10">
            <h2 className="font-display text-3xl sm:text-4xl text-[var(--ink)] tracking-tight">
              Send a signal
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[var(--muted)]">
              Got a problem worth solving? Tell me about it. I reply to every message.
            </p>
          </div>

          <ContactForm />
        </section>
      </main>
    </div>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<PortfolioPage />} />
      {/* Backward-compatible anchors for old portfolio links */}
      <Route path="/letter" element={<Navigate to="/#hero" replace />} />
      <Route path="/about" element={<Navigate to="/#hero" replace />} />
      <Route path="/projects" element={<Navigate to="/#projects" replace />} />
      <Route path="/skills" element={<Navigate to="/#instruments" replace />} />
      <Route path="/experience" element={<Navigate to="/#logbook" replace />} />
      <Route path="/certifications" element={<Navigate to="/#certs" replace />} />
      <Route path="/contact" element={<Navigate to="/#contact" replace />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
