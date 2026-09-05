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
    DigitalTwin.tsx AI chat panel (launcher, transcript, streaming, errors)
  lib/
    data.ts         all page content
    twin-context.ts system prompt + career dossier for the chat
  app/api/chat/route.ts   streaming Groq proxy
public/
  Ahmed_Yaseen_Resume.pdf   served at /Ahmed_Yaseen_Resume.pdf
```

## Digital twin (AI chat)

A floating chat panel in the bottom-right corner answers questions about the
career shown on the page. It is a client component (`src/components/DigitalTwin.tsx`)
talking to a streaming route handler (`src/app/api/chat/route.ts`), which calls
**Groq** server-side — the API key never reaches the browser.

**Configuration** (`.env` in the project root):

```bash
GROQ_API_KEY=gsk_...                   # required
GROQ_MODEL=openai/gpt-oss-120b         # optional, this is the default
GROQ_BASE_URL=...                      # optional, for a proxy or a test stub
```

**Grounding.** The system prompt is assembled in `src/lib/twin-context.ts` from
the same `src/lib/data.ts` the page renders, so the twin cannot drift from the
résumé. It is told to answer only from that dossier, to use exact figures, and
to redirect to email for anything it does not know. Edit `data.ts` and the twin
updates with it. Suggested opening questions live in `suggestedQuestions`.

**Safeguards.** The route caps history at 12 turns and 1200 characters per
message, drops any non user/assistant role from the client (so the browser
cannot inject a system prompt), and rate-limits to 20 requests per minute per
client. Transient 429/5xx responses are retried, honouring Groq's `retry-after`.

**Reasoning model.** `openai/gpt-oss-120b` streams its private chain of thought
in a separate `delta.reasoning` field. The route forwards **only**
`delta.content`, so reasoning never reaches the browser. `reasoning_effort` is
set to `low` so answers start quickly.

### Rate limits

Groq's free tier allows 1000 requests/day but only **8000 tokens per minute**,
and the whole dossier (~2200 tokens) is resent every turn — so roughly three
questions per minute before it throttles. When that happens the panel says how
many seconds to wait and offers a Try again button. If you need more headroom,
upgrade the Groq account or point `GROQ_MODEL` at a smaller model.

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
