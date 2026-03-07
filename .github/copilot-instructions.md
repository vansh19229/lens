# UI Style Guide — Lens Master

## Design Level
Premium startup — Apple + Stripe + Vercel quality

## Color Palette
- Background: `#0a0a0a` (near-black)
- Surface: `#111111` / `#1a1a1a`
- Border: `rgba(255,255,255,0.08)`
- Primary: `#2563eb` (blue-600)
- Accent: `#7c3aed` (violet-600)
- Highlight: `#06b6d4` (cyan-500)
- Text Primary: `#f8fafc`
- Text Secondary: `rgba(248,250,252,0.6)`

## Typography
- Font: `Inter` (primary), `Poppins` (display/headings)
- Heading: `font-bold` or `font-extrabold`, tracking tight
- Body: `font-normal` or `font-medium`

## Corner Radius
- Cards: `rounded-2xl` (16px) or `rounded-3xl` (24px)
- Buttons: `rounded-xl` (12px) or `rounded-full`
- Inputs: `rounded-xl` (12px)

## Glassmorphism
```css
background: rgba(255, 255, 255, 0.04);
backdrop-filter: blur(20px);
border: 1px solid rgba(255, 255, 255, 0.08);
```

## Shadows & Glows
- Card shadow: `0 0 40px rgba(0,0,0,0.4)`
- Glow blue: `0 0 30px rgba(37,99,235,0.3)`
- Glow purple: `0 0 30px rgba(124,58,237,0.3)`

## Animations
- Use Framer Motion for all animations
- Card hover: `translateY(-8px)` + glow shadow
- Button hover: scale 1.02 + glow
- Fade-in sections: `opacity: 0 → 1` with `translateY: 20 → 0`
- Duration: `0.3–0.6s`, easing: `easeOut`

## Layout
- Max width: `max-w-7xl`
- Spacing: generous padding (`py-24`, `px-6`)
- Grid: responsive with `gap-6` or `gap-8`

## Components
- Always dark-first
- Glassmorphism sidebar for filters
- Glowing CTA buttons
- Premium product cards with image hover zoom
- Dark glass navbar (sticky)
- Split layout for auth pages

## Tech Stack
- React 19 + Vite
- Tailwind CSS v4
- Framer Motion
- React Icons (Feather set)
