# 🔭 The 2 a.m. Observatory — Portfolio

> *"I chart software problems the way an astronomer charts stars, usually after midnight with strong black coffee."*

A nocturnal, astronomy-themed personal portfolio built with **React 19**, **Vite**, **Tailwind CSS 4**, and **Framer Motion**. The application visualizes software architecture and engineering experience as a celestial night sky.

---

## 🌌 Concept & Story

No envelopes, wax seals, or postal themes. The entire portfolio is modeled after an astronomical observatory:
- **Night Sky Canvas**: A dynamic, drifting starfield with constellation lines following pointer proximity and interactive star placement that cluster with amber lines.
- **Telescopic Focus Lens**: An achromatic telescope objective with an 80-second calibration dial and an interactive focal aperture revealing a high-resolution portrait beneath soft astrophotography haze.
- **Constellation Projects**: Key software projects rendered as vector constellations that trace their connecting paths upon inspection.
- **Orbital Instruments**: Technical competencies arranged in 3 celestial orbits around a central caffeine core, with counter-rotating gyroscopic pill stabilization.
- **Clean Sheet Résumé**: A cream paper transcript engineered with a dedicated `@media print` stylesheet for pixel-perfect PDF export via `window.print()`.

---

## 🛠 Tech Stack

- **Framework**: React 19
- **Build Tool**: Vite 8
- **Styling**: Tailwind CSS v4 (`@tailwindcss/vite`) with customized CSS variables
- **Routing**: React Router v7
- **Typography**: Google Fonts (*Instrument Serif* for celestial display headers, *Bricolage Grotesque* for readable body text)
- **Icons**: React Icons (Feather)
- **Animation**: CSS hardware-accelerated animations & canvas rendering with full `prefers-reduced-motion` compliance

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v20+ recommended)
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/Gkoushikgalla/The-2-a.m.-Observatory_Portfolio.git

# Navigate to project directory
cd The-2-a.m.-Observatory_Portfolio

# Install dependencies
npm install

# Start local development server
npm run dev
```

The app will be accessible at `http://localhost:5173`.

### Production Build

```bash
npm run build
npm run preview
```

---

## 📂 Project Structure

```
The-2-a.m.-Observatory_Portfolio/
├── public/
│   ├── favicon.svg          # Observatory telescope SVG icon
│   ├── koushik.jpg          # High-resolution portrait photo
│   └── Koushik_CV.pdf       # Downloadable PDF curriculum vitae
├── src/
│   ├── components/
│   │   ├── CertList.jsx          # Ruled calibrations list
│   │   ├── ConstellationCard.jsx # Animated vector constellation cards
│   │   ├── ContactForm.jsx       # Underlined input form with ping status & links
│   │   ├── LogEntry.jsx          # Timeline nodes & 1,024 coffee count-up chip
│   │   ├── Nav.jsx               # Horizontal mobile-friendly sticky nav
│   │   ├── OrbitDiagram.jsx      # 3-tier orbital tools model with unspin pills
│   │   ├── PhotoLens.jsx         # Achromatic telescope lens with focal circle
│   │   ├── ResumePaper.jsx       # Print-isolated cream résumé document
│   │   ├── SkillSheet.jsx        # Indexable technical skills matrix
│   │   └── SkyCanvas.jsx         # Full-viewport interactive starry canvas
│   ├── data/
│   │   └── resume.js             # Single source of truth for all content
│   ├── App.jsx                   # Single-page observatory layout & legacy route redirects
│   ├── index.css                 # Dark/daylight design tokens & print media query
│   └── main.jsx                  # React application entry point
├── index.html                    # SEO meta tags, Open Graph, and Google Fonts
├── vite.config.js                # Vite configuration with Tailwind CSS v4 plugin
├── package.json
└── README.md
```

---

## ⚙️ Customization & Updating Content

### 1. Update CV Data
All personal details, employment history, education, projects, skills, and certifications are stored in:
`src/data/resume.js`

To update:
- **Social & Contact Links**: Edit the `LINKS` object (`github`, `linkedin`, `portfolio`, `email`, `phone`).
- **Projects**: Edit `projects` array. Adjust `points` array (5-6 coordinate pairs `[x, y]` between 0 and 100) to customize constellation shapes.
- **Experience & Education**: Modify `experience` and `education` arrays.
- **Orbits & Tools**: Add or reorder skills in `orbit` (inner: 90s, middle: 140s, outer: 210s).

### 2. Update Portrait
Replace `public/koushik.jpg` with your photo.
- The `PhotoLens` component automatically handles the dual-layer focus and clipping.
- If the image fails to load or is missing, it will gracefully fall back to a "KG" celestial monogram without layout shifts or broken image symbols.

### 3. Update Downloadable CV
Place your CV PDF at `public/Koushik_CV.pdf`.
- If the file is not present, the "Download CV" button automatically hides, while the "Save as PDF" print button continues to work seamlessly.

---

## 🌐 Deployment Notes

- Default Vite base is `/`.
- If deploying to **GitHub Pages** under a subpath (e.g. `https://<user>.github.io/<repo>/`), update `base` in `vite.config.js` to `'/The-2-a.m.-Observatory_Portfolio/'`.
- If deploying to **Vercel**, **Netlify**, or **Cloudflare Pages**, the default configuration works out of the box with zero modifications.

---

## 📄 License

MIT License © 2026 Gnana Sri Koushik Galla
