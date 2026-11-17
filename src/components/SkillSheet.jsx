import React from 'react'
import { skillSheet } from '../data/resume'

export default function SkillSheet() {
  return (
    <div className="w-full mt-12">
      <h3 className="text-xl font-display text-[var(--ink)] mb-6 text-center sm:text-left">
        Technical Skills Index
      </h3>
      <div
        className="grid gap-4 sm:gap-5"
        style={{
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        }}
      >
        {skillSheet.map(([category, items]) => {
          const list = items.split(',').map((s) => s.trim())
          return (
            <div
              key={category}
              className="p-5 rounded-xl transition-colors hover:border-[var(--accent)]"
              style={{
                backgroundColor: 'var(--panel)',
                border: '1px solid var(--line)',
              }}
            >
              <h4
                className="text-sm font-semibold tracking-wide uppercase mb-3"
                style={{ color: 'var(--accent)' }}
              >
                {category}
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {list.map((item) => (
                  <span
                    key={item}
                    className="text-xs px-2.5 py-1 rounded-md text-[var(--ink)] font-normal"
                    style={{
                      backgroundColor: 'rgba(223, 232, 255, 0.06)',
                      border: '1px solid var(--line)',
                    }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
