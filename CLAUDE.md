# CLAUDE.md — Portfolio Project Reference

## Tech Stack

- **React 19** + **Vite 7** (no Next.js, no SSR)
- **Tailwind CSS v4** via `@tailwindcss/vite` plugin
- **Three.js** — used only in `Principles.jsx` for 3D card-curl animation
- No router library — custom history-API routing in `App.jsx`

## Routing

Routing is done via `useState` + `window.history.pushState` + `popstate` listener in `App.jsx`. To add a new page:
1. Add a new state value (e.g., `'zebra'`)
2. Update `navigate()` to map paths to state values
3. Add the conditional render branch in `App.jsx`

## Styling Approach

Tailwind CSS v4. Design tokens are defined in the `@theme {}` block in `src/index.css` — there is **no** `tailwind.config.js`. Arbitrary values (e.g., `text-[64px]`, `px-[120px]`) are used freely throughout.

## Design Tokens (`src/index.css`)

```css
--font-instrument-serif: 'Instrument Serif', serif;
--font-dm-sans: 'DM Sans', sans-serif;
--color-cream: #fffdf9;
--color-sage: #78b299;
--color-forest: #15261d;
--color-ink: #120000;       /* primary text */
--color-olive: #52480a;
--color-pine: #335744;
--color-terra: #624932;
```

Additional colors used via inline/arbitrary values (not in theme):
- `#f8f8f8` — section backgrounds
- `#4c863c` — Deserto case study green
- `#f3ece8` — tag background
- `#3a0b0b` — tag text
- `#93948c` — muted labels
- `#5d5d5d` — secondary body text
- `#6a5959` — card subtitles

## Typography

Fonts loaded from Google Fonts in `index.html`:
- **Instrument Serif** (regular + italic) — display headings, italic accents
- **DM Sans** (optical size 9–40, weights 300/400/500) — all body, UI, labels

Common patterns:
- Section headings: `font-instrument-serif text-[64px] tracking-[-1.28px]`
- Body large: `font-dm-sans font-normal text-[20px] tracking-[-0.4px]`
- Body small: `font-dm-sans font-light text-[16px] tracking-[-0.32px] leading-6`
- Labels/caps: `font-dm-sans font-medium text-[16px] tracking-[-0.32px] uppercase text-[#93948c]`
- Always include `style={{ fontVariationSettings: "'opsz' 14" }}` on DM Sans elements

## Container / Max-Width Pattern

Standard full-bleed section with centered content:
```jsx
<div className={`w-full max-w-[1440px] mx-auto ${PX}`}>
```

Where `PX = 'px-[120px]'` (120px horizontal padding on Deserto).

Other pages use `maxWidth` inline styles:
- Work: `maxWidth: 942`
- About: `maxWidth: 1125`

## Spacing Scale

No fixed grid — arbitrary pixel values used throughout. Common values:

| Tailwind class | px  | Usage |
|---------------|-----|-------|
| `gap-4`       | 16px | tight inline gaps |
| `gap-6`       | 24px | within-card gaps |
| `gap-8`       | 32px | intra-section |
| `gap-12`      | 48px | section outer gap (Deserto standard) |
| `gap-16`      | 64px | larger section gaps |
| `gap-24`      | 96px | DO NOT USE for section gaps — too large |
| `py-12`       | 48px | standard section vertical padding |
| `py-16`       | 64px | larger vertical padding |
| `py-24`       | 96px | DO NOT USE for section padding — too large |

## Deserto Case Study (`src/pages/Deserto.jsx`)

Constants at top of file:
```js
const PX = 'px-[120px]';  // horizontal padding
const GREEN = '#4c863c';   // accent green
```

Page wrapper (line ~596):
```jsx
<div className="flex flex-col gap-16 py-12">
```
- `gap-16` = 64px between top-level sections
- `py-12` = 48px top/bottom padding

Sections follow this template:
```jsx
<SectionComponent className={`w-full max-w-[1440px] mx-auto ${PX} flex flex-col gap-12`}>
```
- Outer section gap: `gap-12` (48px) unless Figma specifies otherwise
- Within section: `gap-6` (24px) to `gap-16` (64px) depending on content density

`HRule` uses `max-w-[1440px] mx-auto` wrapper to stay within the content column.

## Scroll Fade-In Animations

Hook: `src/hooks/useFadeIn.js` — IntersectionObserver, threshold 0.12, fires once.
CSS classes in `index.css`: `.fade-section` (hidden) → `.fade-section.visible` (shown).
Wrapper component in Deserto: `<Fade>` applies both the ref and the class.

## Navbar

- Fixed, `z-30`, height ~80px
- `px-12 py-5`
- Logo: Instrument Serif 48px
- Links: DM Sans 24px, `gap-10`
- Paper texture backdrop slides in on scroll-up

## Images

All Deserto images are in `public/images/deserto/`. Served as static assets — reference as `/images/deserto/filename.png` in JSX.

## Icons

Using `react-icons/md` (Google Material Icons). Icon names come directly from the Figma layer name, converted to PascalCase with `Md` prefix. Examples: layer `conversation` → `MdConversation`, `account_tree` → `MdAccountTree`, `back_hand` → `MdBackHand`. Import once per file, reuse as needed. Render as a component: `<MdConversation size={24} />`. Never use Figma asset URLs for icons.

## Git

- Branch: `main`
- Remote: origin (GitHub)
- Git identity: `yayyu.design@gmail.com` / `YaYing Yu` (repo-scoped config)
