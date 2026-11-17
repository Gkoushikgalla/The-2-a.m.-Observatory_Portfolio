import React, { useState } from 'react'
import { LINKS } from '../data/resume'
import {
  FiMail,
  FiPhone,
  FiGithub,
  FiLinkedin,
  FiGlobe,
  FiSend,
  FiCheckCircle,
} from 'react-icons/fi'

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState(null) // 'sending' | 'success' | 'error'
  const [statusMessage, setStatusMessage] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    setStatus('sending')

    try {
      const subject = `Portfolio message from ${formData.name}`
      const body = `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      const mailtoUrl = `mailto:${LINKS.email}?subject=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(body)}`

      // Open mailto link
      window.location.href = mailtoUrl

      setTimeout(() => {
        setStatus('success')
        setStatusMessage(
          `Your email client is opening! If it didn't launch automatically, please email me directly at ${LINKS.email}.`
        )
        setFormData({ name: '', email: '', message: '' })
      }, 600)
    } catch {
      setStatus('error')
      setStatusMessage(
        `Could not open email client. Please send your message directly to ${LINKS.email}.`
      )
    }
  }

  // Links row with conditional rendering
  const socialLinks = [
    {
      id: 'email',
      label: 'Email',
      value: LINKS.email,
      href: `mailto:${LINKS.email}`,
      icon: <FiMail className="text-base" />,
    },
    {
      id: 'phone',
      label: 'Phone',
      value: `+91 ${LINKS.phone}`,
      href: `tel:+91${LINKS.phone}`,
      icon: <FiPhone className="text-base" />,
    },
    {
      id: 'github',
      label: 'GitHub',
      value: 'Gkoushikgalla',
      href: LINKS.github,
      icon: <FiGithub className="text-base" />,
      external: true,
    },
    {
      id: 'linkedin',
      label: 'LinkedIn',
      value: 'LinkedIn',
      href: LINKS.linkedin,
      icon: <FiLinkedin className="text-base" />,
      external: true,
    },
    {
      id: 'portfolio',
      label: 'E-Portfolio',
      value: 'Portfolio',
      href: LINKS.portfolio,
      icon: <FiGlobe className="text-base" />,
      external: true,
    },
  ].filter((item) => typeof item.href === 'string' && item.href.trim().length > 0)

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center">
      {/* Form Card */}
      <form
        onSubmit={handleSubmit}
        className="w-full p-6 sm:p-10 rounded-2xl mb-12"
        style={{
          backgroundColor: 'var(--panel)',
          border: '1px solid var(--line)',
        }}
      >
        <div className="space-y-6">
          {/* Underlined Name Input */}
          <div>
            <label
              htmlFor="contact-name"
              className="block text-xs uppercase tracking-wider text-[var(--muted)] mb-2 font-body"
            >
              Your Name
            </label>
            <input
              id="contact-name"
              type="text"
              required
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="e.g. Eleanor Vance"
              className="w-full bg-transparent border-0 border-b-2 border-[var(--line)] py-2.5 text-base text-[var(--ink)] placeholder-[rgba(142,154,203,0.4)] focus:border-[var(--accent)] outline-none transition-colors"
            />
          </div>

          {/* Underlined Email Input */}
          <div>
            <label
              htmlFor="contact-email"
              className="block text-xs uppercase tracking-wider text-[var(--muted)] mb-2 font-body"
            >
              Your Email
            </label>
            <input
              id="contact-email"
              type="email"
              required
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              placeholder="e.g. eleanor@example.com"
              className="w-full bg-transparent border-0 border-b-2 border-[var(--line)] py-2.5 text-base text-[var(--ink)] placeholder-[rgba(142,154,203,0.4)] focus:border-[var(--accent)] outline-none transition-colors"
            />
          </div>

          {/* Underlined Message Input */}
          <div>
            <label
              htmlFor="contact-message"
              className="block text-xs uppercase tracking-wider text-[var(--muted)] mb-2 font-body"
            >
              Message
            </label>
            <textarea
              id="contact-message"
              required
              rows={4}
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              placeholder="Tell me about the software problem you're looking to solve..."
              className="w-full bg-transparent border-0 border-b-2 border-[var(--line)] py-2.5 text-base text-[var(--ink)] placeholder-[rgba(142,154,203,0.4)] focus:border-[var(--accent)] outline-none transition-colors resize-y min-h-[100px]"
            />
          </div>

          {/* Status Message */}
          {statusMessage && (
            <div
              className={`p-4 rounded-xl text-sm flex items-start gap-2.5 ${
                status === 'error'
                  ? 'bg-red-950/40 text-red-200 border border-red-800/40'
                  : 'bg-[rgba(240,169,79,0.12)] text-[var(--ink)] border border-[var(--accent)]'
              }`}
            >
              <FiCheckCircle className="text-[var(--accent)] text-lg shrink-0 mt-0.5" />
              <span>{statusMessage}</span>
            </div>
          )}

          {/* Submit Button with Ping Animation */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={status === 'sending'}
              className="relative group inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-sm font-semibold transition-transform hover:scale-105 active:scale-95 disabled:opacity-50 cursor-pointer overflow-visible"
              style={{
                backgroundColor: 'var(--accent)',
                color: '#070b1f',
                boxShadow: '0 4px 20px rgba(240, 169, 79, 0.35)',
              }}
            >
              {/* Expanding ring ping animation on submit / focus */}
              {status === 'sending' && (
                <span
                  className="absolute inset-0 rounded-full border-2 border-[var(--accent)] pointer-events-none"
                  style={{ animation: 'ping-ring 1.2s ease-out infinite' }}
                  aria-hidden="true"
                />
              )}
              <span>{status === 'sending' ? 'Sending signal...' : 'Send message'}</span>
              <FiSend className="text-base" />
            </button>
          </div>
        </div>
      </form>

      {/* Social Links Row */}
      <div className="w-full flex flex-wrap justify-center items-center gap-3 sm:gap-4 mb-16">
        {socialLinks.map((link) => (
          <a
            key={link.id}
            href={link.href}
            target={link.external ? '_blank' : undefined}
            rel={link.external ? 'noopener noreferrer' : undefined}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-colors hover:text-[var(--ink)] hover:border-[var(--accent)]"
            style={{
              backgroundColor: 'var(--panel)',
              color: 'var(--muted)',
              border: '1px solid var(--line)',
            }}
          >
            {link.icon}
            <span>{link.label}</span>
          </a>
        ))}
      </div>

      {/* Footer */}
      <footer className="text-center text-xs text-[var(--muted)] pb-12 font-body">
        <p>Built by Koushik under a lot of stars.</p>
        <p className="mt-1 text-[11px] opacity-75">
          The 2 a.m. Observatory • {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  )
}
