# Design plan: tahat.dev redesign

## Point of view

Taha builds the plumbing behind real-time systems: telemetry streams, caches, query
plans, traces. The site should read like a well-made engineering tool. It should be
quiet, precise, and dense where density helps, and it should take its visual language from a
trace viewer: a shared time axis, spans with durations, and log lines under each span.
It uses one such device, carried out properly, and plain typography everywhere else.

## The one memorable element: the career trace

The Experience section is drawn as a **trace waterfall**.

- A single time axis runs from Jan 2025 to Aug 2027, with year gridlines.
- Each internship is a span on that axis, at its real position and length, with a
  duration label beside it in the same style a tracer uses for `160ms`: `4 mo`.
- The bullets sit directly under each span, like log entries under a span. Every
  bullet is visible, with no tabs or clicks.
- A thin `now` cursor marks today on the axis. JS moves it to the real current date,
  and the static HTML places it at Sep 2026.
- The top row is **Next**: two dashed, unfilled spans for Winter 2027 (Jan–Apr) and
  Summer 2027 (May–Aug), labelled "open". Availability is stated in the hero and
  then shown in the same visual language as the work history. The page doesn't use
  a separate "available for work" badge.
- Rows go most recent first, which is what recruiters expect. Because the axis runs left to right in
  time, the spans step down and to the left, and that shape shows the progression at a
  glance.
- Motion: spans grow from their start point once, the first time the section
  scrolls into view (400 ms, ease-out). This is the only scroll-linked motion on the page.
  It is off under `prefers-reduced-motion`, and with JS disabled the spans are simply drawn.

Mobile: the label column stacks above the track, and the track spans the full width. Every
row uses the same track width, so spans still line up vertically.

## Type

Two families from one superfamily, self-hosted (no third-party requests):

- **IBM Plex Sans** (variable, weight 400–700, width 85–100%) for everything you read.
  The name uses the condensed width (`font-stretch: 88%`) at 600. That gives it a
  display voice without adding a third family.
- **IBM Plex Mono** (400/500) only for data: dates, durations, metrics, stack
  lists, hostnames, and axis labels. Mono marks "this is a measurement", and it stays out of body text.

I dropped Space Grotesk. Three families was one too many, and the Plex pair gives a
consistent engineering-document voice.

Scale (fluid): name 44–76px, h2 28px, h3 19px, body 17px/1.6, meta 13–14px mono.
The measure is capped at 64ch for body and 68ch for bullets (under 75 characters).

## Color (6 tokens, both themes AA)

| token   | light     | dark      | use                        | contrast on bg (L / D) |
|---------|-----------|-----------|----------------------------|------------------------|
| bg      | `#F3F5F7` | `#0F131A` | page                       | n/a                    |
| ink     | `#101826` | `#E3E7ED` | text                       | 16.3 / 15.0            |
| muted   | `#4B5565` | `#9AA4B2` | secondary text, axis       | 6.9 / 7.4              |
| rule    | `#D3D9E0` | `#283040` | hairlines, tracks (decor.) | n/a                    |
| accent  | `#2346C8` | `#8EA4FF` | spans, links, focus        | 6.9 / 7.9              |
| signal  | `#17784A` | `#5AC98F` | "open" availability only   | 5.0 / 9.0              |

Cool gray paper with navy ink and a single cobalt accent (periwinkle in dark), in the
spirit of a technical drawing. Green appears only where availability is meant.

## Wireframes

Desktop (1280, content column 1120 max):

```
Taha Tarkhani                         Experience  Projects  Skills   Resume  [theme]
─────────────────────────────────────────────────────────────────────────────────────
                                                                   ┌──────────┐
Taha Tarkhani                         (condensed, huge)            │ portrait │
Software engineering student building backend systems,             │  3:4     │
from defense space-operations infrastructure to distributed        │          │
tracing tools.                                                     │          │
Two internships at National Defence Canada ... NRC ... uOttawa.    └──────────┘
▌Open to Summer 2027 and Winter 2027 software internships and co-ops.
▌Ottawa, Toronto/GTA, or remote in Canada.
[ Resume ]  ttarkhani111@gmail.com [Copy]   GitHub   LinkedIn

709ms to under 100ms      1,800ms to 210ms          6.5 min to 95 s
p99 latency, Redis cache  peak query, partitioning  12K-record ingest
─────────────────────────────────────────────────────────────────────────────────────
Experience
                         2025           │2026           │2027          now┊
Next                     ·              │               │          ┊ [- -][- -] open
National Defence Canada  ·              │        [████] 4 mo       ┊
Software Engineer Intern                  • bullet ... (68ch)
May–Aug 2026              • bullet ...
National Defence Canada  ·        [████]│ 4 mo
...
National Research Council [████] 4 mo
...
─────────────────────────────────────────────────────────────────────────────────────
Projects
Lifts                                      ┌────────────────────────────┐
2nd place, MLH Hack the Hill III           │ desktop screenshot         │
what it is (1–2 lines)                     │                   ┌──────┐ │
• result  • result                         │                   │mobile│ │
Next.js · TypeScript · ...                 └───────────────────└──────┘─┘
Live demo   Code                           lifts-mbjt.onrender.com
─────── (hairline) ─── Request Tracer ─── Orbit Tracker ─── Cost Monitor (no image)
─────────────────────────────────────────────────────────────────────────────────────
Skills (dl: Languages / Frameworks / Databases / Tools) │ Education
─────────────────────────────────────────────────────────────────────────────────────
Contact: one sentence + email [Copy] + Resume + GitHub + LinkedIn
footer: © 2026 Taha Tarkhani · Ottawa, ON
```

Mobile (375):

```
Taha Tarkhani          Resume [theme]
──────────────────────────────────
Taha                     ┌──────┐
Tarkhani                 │photo │
                         └──────┘
Headline (20px)
Bio
▌Open to ... (signal rule)
[ Resume ] [ Copy email ]
GitHub  LinkedIn
Results: stacked 3 rows
──────────────────────────────────
Experience
2025 │2026 │2027   (full-width axis)
National Defence Canada
Software Engineer Intern · May–Aug 2026
[track ········[██]·····]  4 mo
• bullets
...
Projects: title, meta, screenshot (desktop shot), text, links
Skills, Education, Contact
```

## Other decisions

- **No tabs anywhere.** All experience and all four projects are visible, because recruiters skim.
- **Project previews:** real Playwright screenshots of each live app (desktop 1440×900
  and mobile 390×844), saved as WebP with `width`/`height`, `loading="lazy"`, and alt text
  describing what is on screen. For Lifts, the preview shows the no-login `/demo/board`.
  Cost Monitor has no live deployment, so it gets no fake preview. It is a shorter, text-only
  entry marked "Code only".
- **Frames:** screenshots sit in a 1px `rule` border with square corners. The hostname appears in mono as
  the figcaption, so you can see where "Live demo" goes. The page draws no browser chrome.
- **Resume:** native `<dialog>` (focus handling and Esc for free) with an iframe, plus Download
  and "Open in new tab" links. The PDF also works as a plain link with JS off.
- **Email:** the address is a visible `mailto:` link, next to a separate Copy button that
  announces "Copied" through `aria-live`. Without JS, the button stays hidden.
- **Theme:** `prefers-color-scheme` by default, with a toggle that persists to localStorage. An
  inline head script prevents a flash. The toggle is hidden without JS.
- **Portrait:** the existing photo (pointing at the sky over the water) at 3:4 and
  uncropped, because a square crop would lose the gesture. It is re-encoded to WebP at 2 sizes.
- **SEO:** title, description, canonical, OG/Twitter with a generated 1200×630 PNG,
  and JSON-LD `Person`.

## Checked against the avoid list (what changed)

1. My first draft of the dark theme used an **amber accent on near-black**. That is too close to
   "black + neon", so it became a desaturated periwinkle on blue-black.
2. I had planned a **tracked all-caps "SELECTED RESULTS" eyebrow**. It is now a sentence-case
   `h2`, visually hidden, because the numbers explain themselves.
3. **Project cards** (rounded, shadowed, in a grid) became full-width rows split by hairlines,
   with the screenshot as the only framed object.
4. **"01 / 02 / 03" project numbers** were cut, because the projects aren't a sequence.
5. **"Live ↗"-style links** became plain underlined words ("Live demo", "Code").
6. An **orbital hero animation** was cut. It would compete with the trace, and the
   one-element rule wins. The portrait already points at the sky.
7. I had considered an accent-colored **"backend"** in the headline. It is now all one color.
8. A **pulsing green "available" pill** would be a template tell. Availability appears as a plain
   sentence with a thin signal-colored rule, and as the dashed "Next" spans in the trace.
9. The Unicode **arrow between before/after metrics** (`709ms → 100ms`) became the word
   "to". That keeps the wording close to the source, and it also avoids a glyph outside the font subset.
