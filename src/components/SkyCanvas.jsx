import React, { useEffect, useRef, useState } from 'react'

export default function SkyCanvas({ onStarCountChange }) {
  const canvasRef = useRef(null)
  const [starCount, setStarCount] = useState(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId
    let width = window.innerWidth
    let height = window.innerHeight
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    // Check prefers-reduced-motion
    const mediaQueryReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    let reducedMotion = mediaQueryReducedMotion.matches

    // Get color tokens from CSS
    function getCssColors() {
      const style = getComputedStyle(document.documentElement)
      return {
        star: style.getPropertyValue('--star').trim() || '#dfe8ff',
        accent: style.getPropertyValue('--accent').trim() || '#f0a94f',
        line: style.getPropertyValue('--line').trim() || 'rgba(190, 205, 255, 0.18)',
      }
    }
    let colors = getCssColors()

    // Background Stars setup
    let bgStars = []
    function initBgStars() {
      const count = Math.max(25, Math.floor((width * height) / 9000))
      bgStars = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: 0.3 + Math.random() * 1.3,
        baseAlpha: 0.25 + Math.random() * 0.65,
        twinkleSpeed: 0.001 + Math.random() * 0.003,
        twinklePhase: Math.random() * Math.PI * 2,
        driftSpeed: 0.05 + Math.random() * 0.15,
      }))
    }

    // Placed amber stars (page coords)
    const placedStars = []

    function resize() {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.scale(dpr, dpr)
      initBgStars()
      if (reducedMotion) {
        drawStatic()
      }
    }

    resize()
    window.addEventListener('resize', resize)

    // Color scheme listener
    const colorSchemeQuery = window.matchMedia('(prefers-color-scheme: light)')
    const onColorChange = () => {
      colors = getCssColors()
      if (reducedMotion) drawStatic()
    }
    colorSchemeQuery.addEventListener('change', onColorChange)

    // Pointer state
    const pointer = { x: -9999, y: -9999, active: false }

    const onPointerMove = (e) => {
      pointer.x = e.clientX
      pointer.y = e.clientY
      pointer.active = true
      if (reducedMotion) {
        drawStatic()
      }
    }

    const onPointerLeave = () => {
      pointer.active = false
      if (reducedMotion) {
        drawStatic()
      }
    }

    window.addEventListener('pointermove', onPointerMove)
    document.addEventListener('pointerleave', onPointerLeave)

    // Hero click to place amber star
    const onWindowClick = (e) => {
      // Ignore clicks on interactive items or lens
      if (e.target.closest('a, button, label, input, textarea, [data-photo-lens]')) {
        return
      }

      // Check if click was inside #hero
      const heroEl = document.getElementById('hero')
      if (!heroEl) return
      const heroRect = heroEl.getBoundingClientRect()

      if (
        e.clientX >= heroRect.left &&
        e.clientX <= heroRect.right &&
        e.clientY >= heroRect.top &&
        e.clientY <= heroRect.bottom
      ) {
        const pageX = e.clientX
        const pageY = e.clientY + window.scrollY

        if (placedStars.length >= 40) {
          placedStars.shift()
        }
        placedStars.push({
          x: pageX,
          y: pageY,
          phase: Math.random() * Math.PI * 2,
          radius: 2.2 + Math.random() * 0.8,
        })

        const count = placedStars.length
        setStarCount(count)
        if (onStarCountChange) {
          onStarCountChange(count)
        }

        if (reducedMotion) {
          drawStatic()
        }
      }
    }

    window.addEventListener('pointerdown', onWindowClick)

    // Drawing
    function render(time = 0) {
      ctx.clearRect(0, 0, width, height)
      const scrollY = window.scrollY

      // 1. Draw and drift background stars
      for (let i = 0; i < bgStars.length; i++) {
        const s = bgStars[i]
        if (!reducedMotion) {
          s.x = (s.x + s.driftSpeed) % width
        }
        const alpha = reducedMotion
          ? s.baseAlpha
          : Math.max(0.1, Math.min(1, s.baseAlpha + 0.3 * Math.sin(time * s.twinkleSpeed + s.twinklePhase)))

        ctx.fillStyle = colors.star
        ctx.globalAlpha = alpha
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fill()
      }

      // 2. Cursor connection lines to background stars within 140px
      if (pointer.active) {
        for (let i = 0; i < bgStars.length; i++) {
          const s = bgStars[i]
          const dx = s.x - pointer.x
          const dy = s.y - pointer.y
          const dist = Math.hypot(dx, dy)
          if (dist < 140) {
            const lineAlpha = (1 - dist / 140) * 0.28
            ctx.strokeStyle = colors.star
            ctx.globalAlpha = lineAlpha
            ctx.lineWidth = 0.8
            ctx.beginPath()
            ctx.moveTo(pointer.x, pointer.y)
            ctx.lineTo(s.x, s.y)
            ctx.stroke()
          }
        }
      }

      // 3. Draw Placed Amber Stars & Links within 260px (offset by scrollY)
      const activePlaced = placedStars
        .map((star) => ({
          ...star,
          screenX: star.x,
          screenY: star.y - scrollY,
        }))
        .filter((star) => star.screenY >= -50 && star.screenY <= height + 50)

      // Draw links between placed amber stars
      for (let i = 0; i < activePlaced.length; i++) {
        for (let j = i + 1; j < activePlaced.length; j++) {
          const s1 = activePlaced[i]
          const s2 = activePlaced[j]
          const dist = Math.hypot(s1.screenX - s2.screenX, s1.screenY - s2.screenY)
          if (dist < 260) {
            const lineAlpha = (1 - dist / 260) * 0.45
            ctx.strokeStyle = colors.accent
            ctx.globalAlpha = lineAlpha
            ctx.lineWidth = 1.0
            ctx.beginPath()
            ctx.moveTo(s1.screenX, s1.screenY)
            ctx.lineTo(s2.screenX, s2.screenY)
            ctx.stroke()
          }
        }
      }

      // Draw placed amber star bodies (pulse gently)
      for (let i = 0; i < activePlaced.length; i++) {
        const s = activePlaced[i]
        const pulse = reducedMotion ? 0.8 : 0.65 + 0.35 * Math.sin(time * 0.003 + s.phase)

        // Outer glow
        ctx.fillStyle = colors.accent
        ctx.globalAlpha = pulse * 0.3
        ctx.beginPath()
        ctx.arc(s.screenX, s.screenY, s.radius * 2.4, 0, Math.PI * 2)
        ctx.fill()

        // Inner core
        ctx.globalAlpha = pulse
        ctx.beginPath()
        ctx.arc(s.screenX, s.screenY, s.radius, 0, Math.PI * 2)
        ctx.fill()
      }

      ctx.globalAlpha = 1
    }

    function drawStatic() {
      render(0)
    }

    function loop(time) {
      if (!reducedMotion) {
        render(time)
        animationFrameId = requestAnimationFrame(loop)
      }
    }

    if (!reducedMotion) {
      animationFrameId = requestAnimationFrame(loop)
    } else {
      drawStatic()
    }

    // Scroll listener so placed stars update positions smoothly
    const onScroll = () => {
      if (reducedMotion) {
        drawStatic()
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    const onMotionChange = (e) => {
      reducedMotion = e.matches
      if (reducedMotion) {
        cancelAnimationFrame(animationFrameId)
        drawStatic()
      } else {
        animationFrameId = requestAnimationFrame(loop)
      }
    }
    mediaQueryReducedMotion.addEventListener('change', onMotionChange)

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('pointermove', onPointerMove)
      document.removeEventListener('pointerleave', onPointerLeave)
      window.removeEventListener('pointerdown', onWindowClick)
      colorSchemeQuery.removeEventListener('change', onColorChange)
      mediaQueryReducedMotion.removeEventListener('change', onMotionChange)
    }
  }, [onStarCountChange])

  return (
    <canvas
      id="sky-canvas"
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      aria-hidden="true"
    />
  )
}
