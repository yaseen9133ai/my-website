# Ahmed Yaseen — Personal Site

A single-page professional site — about, career journey, research and projects,
a portfolio section reserved for upcoming case studies, capabilities/stack,
credentials and contact — plus a **digital twin**: an AI chat panel that answers
questions about the career shown on the page.

Built with Next.js 16 (App Router), TypeScript, Tailwind CSS v4, Motion, and
Groq for the chat.

## Run it locally

```bash
npm install
cp .env.example .env   # then add your Groq key
npm run dev
```

Then open <http://localhost:3000>.

The site itself renders without any configuration. The chat panel needs
`GROQ_API_KEY` in `.env` — without it the panel loads but every question returns
"The digital twin is not configured". See [Digital twin](#digital-twin-ai-chat).

`.env*` is git-ignored; keep your key out of commits.

Other scripts:

```bash
npm run build   # production build
npm run start   # serve the production build
npm run lint    # eslint
```

## Where the content lives

Everything on the page is driven by one typed file: **`src/lib/data.ts`**.
Edit that to change copy — no component surgery required.

| Export               | Drives                                        |
| -------------------- | --------------------------------------------- |
| `profile`            | Name, roles, status pill, contact links        |
| `stats`              | The four counters under the hero               |
| `impact`             | "AI Impact" cards                              |
| `journey`            | Career timeline entries                        |
| `projects`           | Research & projects (first item is featured)   |
| `researchInterests`  | Tags in the About section                      |
| `skills`             | The stack matrix                               |
| `capabilities`       | The three capability statements                |
| `education`          | Credentials — education column                 |
| `certifications`     | Credentials — certifications column            |
| `marquee`            | The scrolling technology strip                 |
| `suggestedQuestions` | Opening prompts in the digital twin panel      |
| `sections`           | Nav links and their anchor ids                 |

Three things live outside `data.ts`:

- Portfolio slots (the "in build" cards) — `src/components/Portfolio.tsx`.
  Swap a slot for a real link once a case study ships.
- The "at a glance" numbers beside the timeline — top of
  `src/components/Journey.tsx`.
- The chat's system prompt and rules — `src/lib/twin-context.ts`.

## Structure

```
src/
  app/
    layout.tsx            fonts, metadata, theme colour
    page.tsx              section composition
    globals.css           design tokens + custom utilities
    icon.svg              favicon
    api/chat/route.ts     streaming Groq proxy for the digital twin
  components/
    Nav.tsx               sticky nav, scroll progress, active-section tracking
    Hero.tsx              identity block, research console, stat bar
    GraphField.tsx        animated knowledge-graph canvas behind the hero
    Marquee.tsx           scrolling technology strip
    About.tsx             narrative + three pillars
    Impact.tsx            production-AI cards
    Journey.tsx           career timeline with scroll-linked rail
    Research.tsx          featured project + secondary projects
    Portfolio.tsx         reserved case-study slots
    SlotGlyph.tsx         schematic glyphs for those slots
    Capabilities.tsx      capability statements + skill matrix
    Credentials.tsx       education and certifications
    Contact.tsx           email, copy-to-clipboard, channels
    Footer.tsx
    DigitalTwin.tsx       AI chat panel (launcher, transcript, streaming, retry)
    MotionProvider.tsx    MotionConfig wrapper honouring prefers-reduced-motion
    primitives.tsx        Reveal, Section, SectionHeading, Tag, SpotlightCard,
                          CountUp, buttons
  lib/
    data.ts               all page content
    twin-context.ts       system prompt + career dossier for the chat
public/
  Ahmed_Yaseen_Resume.pdf served at /Ahmed_Yaseen_Resume.pdf
```

## Digital twin (AI chat)

A floating panel in the bottom-right corner answers questions about the career
shown on the page. `src/components/DigitalTwin.tsx` (client) streams from
`src/app/api/chat/route.ts` (server), which calls **Groq** — the API key stays
server-side and never reaches the browser.

**Configuration** (`.env` in the project root):

```bash
GROQ_API_KEY=gsk_...                   # required
GROQ_MODEL=openai/gpt-oss-120b         # optional, this is the default
GROQ_BASE_URL=...                      # optional, for a proxy or a test stub
```

### Grounding

The system prompt is assembled in `src/lib/twin-context.ts` from the same
`src/lib/data.ts` the page renders, so the twin cannot drift from the résumé. It
is told to answer only from that dossier, to use exact figures, and to redirect
to email for anything it does not know. It states plainly that it is an AI
representation if asked whether it is the real Ahmed.

**Gotcha:** the dossier deliberately omits `impact` and `capabilities` — both
restate facts already covered by `journey`, `projects` and `skills`, and the
whole prompt is resent every turn, so the duplication cost questions-per-minute
(see Rate limits). Editing those two exports changes the page but **not** what
the twin knows. Every other export feeds both.

### Safeguards

- History capped at 12 turns, 1200 characters per message.
- Any role other than `user`/`assistant` sent by the browser is dropped, so the
  client cannot inject its own system prompt.
- 20 requests per minute per client, in-process.
- Transient 429/5xx retried, honouring Groq's `retry-after`.

### Reasoning model

`openai/gpt-oss-120b` streams its private chain of thought in a separate
`delta.reasoning` field. The route forwards **only** `delta.content`, so
reasoning never reaches the browser. `reasoning_effort` is set to `low` so
answers start quickly rather than spending the token budget on thinking.

The model emits light markdown despite being told not to, so the panel renders a
small safe subset — `- ` bullets and `**bold**` — as real elements. No HTML is
ever interpreted.

### Rate limits

Groq's free tier allows 1000 requests/day but only **8000 tokens per minute**,
and the dossier (~2200 tokens) is resent every turn — so roughly three questions
per minute before it throttles. When that happens the panel shows how many
seconds to wait and offers a Try again button that resends the question. For
more headroom, upgrade the Groq account or point `GROQ_MODEL` at a smaller
model.

## Design notes

- **Palette** — near-black `#06070a` ground, hairline `rgba(255,255,255,.08)`
  borders, mint `#3df2c0` as the single signal colour, violet `#7b61ff` as a
  secondary accent. Tokens are defined once in `globals.css` under `:root` and
  exposed to Tailwind via `@theme inline`.
- **Type** — Space Grotesk for display, Inter for body, JetBrains Mono for
  labels and metadata.
- **Motion** — scroll reveals, a scroll-linked timeline rail, a cursor-tracking
  spotlight on cards, and the hero graph canvas. `MotionProvider` sets
  `reducedMotion="user"`, so transforms are dropped under
  `prefers-reduced-motion: reduce` while content still appears.

## Before going public

- Update `metadataBase` in `src/app/layout.tsx` from `http://localhost:3000` to
  the live domain, so Open Graph URLs resolve correctly.
- The chat's rate limiter keeps counts in process memory. That is fine locally
  and on a single long-lived instance, but it does not hold across serverless
  instances — move it to a shared store (Redis, Upstash) if you deploy that way.
- Set `GROQ_API_KEY` as a secret in your host's environment, not in a committed
  file.
