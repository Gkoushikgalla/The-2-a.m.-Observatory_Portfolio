import React from 'react'

export default function Nav() {
  const links = [
    { label: 'Work', href: '#projects' },
    { label: 'Log', href: '#logbook' },
    { label: 'Tools', href: '#instruments' },
    { label: 'Certs', href: '#certs' },
    { label: 'Résumé', href: '#resume' },
    { label: 'Contact', href: '#contact' },
  ]

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-colors duration-300"
      style={{
        backgroundColor: 'var(--panel)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid var(--line)',
      }}
      aria-label="Primary navigation"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Brand */}
        <a
          href="#hero"
          className="text-lg tracking-tight font-display text-[var(--ink)] hover:text-[var(--accent)] transition-colors flex items-center gap-1.5 shrink-0"
          aria-label="K. Galla, back to hero"
        >
          <span>✦ Koushik Galla</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] inline-block"></span>
        </a>

        {/* Links - scrolls horizontally on mobile, no hamburger needed */}
        <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto py-1 scrollbar-none text-sm text-[var(--muted)]">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-3 py-1.5 rounded-full whitespace-nowrap hover:text-[var(--ink)] hover:bg-[var(--line)] transition-all"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  )
}
