# Algoryx  Scroll-Based Animated Landing Page

A modern, responsive, scroll-animated landing page built for **Task 2** of the Algoryx Frontend Internship.

**Live demo:** https://algoryx-landing-ten.vercel.app

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
<img width="1770" height="866" alt="Hero Light" src="https://github.com/user-attachments/assets/846d8bcd-6ca6-45e3-9a59-2afea861845e" />


### **Hero (Dark)**  :
<img width="1835" height="868" alt="Hero Dark" src="https://github.com/user-attachments/assets/b8130daf-fc4d-44b1-9031-6e13495b223f" />


### **Process and Terminal**  :
<img width="1755" height="862" alt="Process" src="https://github.com/user-attachments/assets/20e6c31e-9bb9-4e53-80d1-da6c66051cc5" />


### **Mobile View**  :
<img width="752" height="598" alt="Mobile View" src="https://github.com/user-attachments/assets/183da4d2-e65c-454a-aab2-7ea7ae58cb7a" />



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
**Aman Kumar Raman**

Frontend Developer Intern, Algoryx Technologies
