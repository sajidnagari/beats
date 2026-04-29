# beats

Modern, dark SaaS-style landing page for a TikTok Analytics product, built with **Next.js App Router** and **Tailwind CSS**.

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-149ECA?logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5+-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

## Preview

> Add your screenshot at `public/preview.png` to render this section nicely.

![Project Preview](./public/preview.png)

Optional links:
- Live demo: `https://beats-peach.vercel.app/`
- Portfolio case study: `https://your-portfolio-url`

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **UI**: React 19 + Tailwind CSS
- **Language**: TypeScript
- **Animations**:
  - Canvas-based particle background (`components/particle-background.tsx`)
  - Scroll reveal animation (`components/reveal.tsx`)

## Implemented Sections

The landing page in `app/page.tsx` includes:

- **Navbar**
- **Hero** with particle background and CTAs
- **Features**
- **Advanced Features**
- **Stats**
- **Testimonials**
- **Pricing**
- **Integrations** (TikTok Ads, GA4, Slack, Notion)
- **Use Cases** (Creator, Agency, Brand)
- **FAQ**
- **Final CTA**
- **Footer**

## Folder Structure

```text
beats/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── particle-background.tsx
│   └── reveal.tsx
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

### Option 1: Vercel Dashboard (recommended)

1. Push this repo to GitHub.
2. Go to [Vercel](https://vercel.com/) and click **Add New Project**.
3. Import the GitHub repository.
4. Keep defaults (Framework auto-detected as Next.js).
5. Click **Deploy**.

### Option 2: Vercel CLI

1. Install CLI:
   `npm i -g vercel`
2. Login:
   `vercel login`
3. Deploy:
   `vercel`
4. For production deployment:
   `vercel --prod`

## Customization Guide

- **Content and section layout**: `app/page.tsx`
- **Global styles and tokens**: `app/globals.css` and `tailwind.config.ts`
- **Reveal animation behavior**: `components/reveal.tsx`
- **Particle effect behavior**: `components/particle-background.tsx`
