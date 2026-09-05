# Ahmed Yaseen — Personal Site

A single-page professional site: about, career journey, research and projects,
a portfolio section reserved for upcoming case studies, capabilities/stack,
credentials and contact. Built with Next.js (App Router), TypeScript, Tailwind
CSS v4 and Motion.

## Run it locally

```bash
npm install
npm run dev
```

Then open <http://localhost:3000>.

Other scripts:

```bash
npm run build   # production build
npm run start   # serve the production build
npm run lint    # eslint
```

## Where the content lives

Everything on the page is driven by one typed file: **`src/lib/data.ts`**.
Edit that to change copy — no component surgery required.

| Export             | Drives                                        |
| ------------------ | --------------------------------------------- |
| `profile`          | Name, roles, status pill, contact links       |
| `stats`            | The four counters under the hero              |
| `impact`           | "AI Impact" cards                             |
| `journey`          | Career timeline entries                       |
| `projects`         | Research & projects (first item is featured)  |
| `researchInterests`| Tags in the About section                     |
| `skills`           | The stack matrix                              |
| `capabilities`     | The three capability statements               |
| `education`        | Credentials — education column                |
| `certifications`   | Credentials — certifications column           |
| `marquee`          | The scrolling technology strip                |
| `sections`         | Nav links and their anchor ids                |

The portfolio slots (the "in build" cards) live in
`src/components/Portfolio.tsx`; swap a slot for a real link once a case study
ships. The "at a glance" numbers beside the timeline are at the top of
`src/components/Journey.tsx`.

## Structure

```
src/
  app/
    layout.tsx      fonts, metadata, theme colour
    page.tsx        section composition
    globals.css     design tokens + custom utilities
    icon.svg        favicon
  components/
    Nav.tsx         sticky nav, scroll progress, active-section tracking
    Hero.tsx        identity block, research console, stat bar
    GraphField.tsx  animated knowledge-graph canvas behind the hero
    Marquee.tsx     scrolling technology strip
    About.tsx       narrative + three pillars
    Impact.tsx      production-AI cards
    Journey.tsx     career timeline with scroll-linked rail
    Research.tsx    featured project + secondary projects
    Portfolio.tsx   reserved case-study slots
    SlotGlyph.tsx   schematic glyphs for those slots
    Capabilities.tsx capability statements + skill matrix
    Credentials.tsx education and certifications
    Contact.tsx     email, copy-to-clipboard, channels
    Footer.tsx
    primitives.tsx  Reveal, Section, SectionHeading, Tag, SpotlightCard, CountUp, buttons
  lib/data.ts       all content
public/
  Ahmed_Yaseen_Resume.pdf   served at /Ahmed_Yaseen_Resume.pdf
```

## Design notes

- **Palette** — near-black `#06070a` ground, hairline `rgba(255,255,255,.08)`
  borders, mint `#3df2c0` as the single signal colour, violet `#7b61ff` as a
  secondary accent. Tokens are defined once in `globals.css` under `:root` and
  exposed to Tailwind via `@theme inline`.
- **Type** — Space Grotesk for display, Inter for body, JetBrains Mono for
  labels and metadata.
- **Motion** — scroll reveals, a scroll-linked timeline rail, a cursor-tracking
  spotlight on cards, and the hero graph canvas. All of it degrades under
  `prefers-reduced-motion: reduce`.

## Before going public

If you deploy, update `metadataBase` in `src/app/layout.tsx` from
`http://localhost:3000` to the live domain.
