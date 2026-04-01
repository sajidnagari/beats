# beats

Modern, dark SaaS-style landing page for a TikTok Analytics product, built with **Next.js App Router** and **Tailwind CSS**.

[![Live Demo](https://img.shields.io/badge/Live_Demo-beats--peach.vercel.app-06B6D4?style=for-the-badge)](https://beats-peach.vercel.app/)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-149ECA?logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5+-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

## Live Demo

**https://beats-peach.vercel.app/**

## Preview

> Add your screenshot at `public/preview.png` to render this section nicely.

![Project Preview](./public/preview.png)

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **UI**: React 19 + Tailwind CSS
- **Language**: TypeScript
- **Animations**:
  - Canvas-based particle background
  - Scroll reveal transitions
  - Animated stat counters
  - Interactive FAQ accordion

## Implemented Sections

- Navbar with mobile menu
- Hero with dashboard preview mockup
- Features + Advanced Features
- Animated stats
- Testimonials with avatars
- Pricing with plan feature lists
- Integrations with icon badges
- Use Cases
- FAQ accordion
- Final CTA
- Contact footer with form + social icons

## Folder Structure

```text
beats/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── cta-modal.tsx
│   ├── dashboard-preview.tsx
│   ├── faq-accordion.tsx
│   ├── footer.tsx
│   ├── hero.tsx
│   ├── navbar.tsx
│   ├── particle-background.tsx
│   ├── reveal.tsx
│   ├── social-icon.tsx
│   └── stat-counter.tsx
├── lib/
│   ├── data.ts
│   ├── modal-types.ts
│   └── styles.ts
├── eslint.config.mjs
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── tailwind.config.ts
└── tsconfig.json
```

## Getting Started

1. Install dependencies:
   `npm install`
2. Run development server:
   `npm run dev`
3. Open:
   `http://localhost:3000`

## Scripts

- `npm run dev` – start local dev server
- `npm run build` – create production build
- `npm run start` – run production server
- `npm run lint` – run ESLint

## Deploy on Vercel

1. Push this repo to GitHub.
2. Import the project in [Vercel](https://vercel.com/).
3. Deploy with default Next.js settings.

## Customization Guide

- **Content and section layout**: `lib/data.ts` and `app/page.tsx`
- **Global styles and tokens**: `app/globals.css` and `tailwind.config.ts`
- **Modal forms**: `components/cta-modal.tsx`
- **Reveal animation behavior**: `components/reveal.tsx`
- **Particle effect behavior**: `components/particle-background.tsx`
