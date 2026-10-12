# Algoryx Landing Page

A modern, responsive, scroll-animated landing page built for **Task 2** of the Algoryx Frontend Internship.

**Live demo:** _

## 💻 Tech stack
React 18 (Vite), Tailwind CSS, Framer Motion, Lucide React icons, React Hooks (`useState`, `useEffect`, `useRef`, `useCallback`)

## 🚀 Features
- Responsive navbar with scroll-spy highlight, scroll progress bar, dark / light toggle and mobile menu
- Animated hero with status pill, rotating headline words, animated logo mark and a cursor-reactive particle background
- Technology ticker that pauses on hover
- Scroll-lit manifesto band (words brighten as you scroll)
- About section with scroll-reveal cards
- Interactive services cards (3D tilt, expand, **Ask about this** pre-fills the contact form)
- Animated counters with a parallax marquee
- Process timeline whose line fills as you scroll, beside an animated terminal "ship log"
- **Start a project** button opens the official Algoryx website in a new tab
- Testimonials carousel (auto-advance, arrows and dots)
- FAQ accordion
- Validated contact form (name, email and message rules, success state)
- Log in / Sign up modal (front-end demo only, no backend)
- Footer with working links and back-to-top button
- Dark / Light theme that is saved and follows the system default
- Respects `prefers-reduced-motion`
- Fully responsive: mobile, tablet, desktop

## Screenshots

### **Hero (Light)**  :


### **Hero (Dark)**  :


### **Process and Terminal**  :


### **Mobile View**  :



## 📂 Folder structure
```
src/
  components/   Navbar, Hero, RotatingWord, LogoMark, Particles, Ticker, Manifesto,
                About, Services, Counters, Timeline, Terminal, Testimonials, FAQ,
                Contact, Footer, AuthModal, Section
  config/       site.js
  hooks/        useTheme.js
  lib/          cx.js
  App.jsx
  main.jsx
```

## Run locally
```
npm install
npm run dev
```
Build for production: `npm run build`

## Author
Aman Kumar Raman