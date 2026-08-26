# Design Brief: Aéroports Services — site redesign

Phase 2 of the design flow. **Rev. 2** — the aesthetic direction is reopened and the theme default
is no longer prescribed. Reads `CONTENT_AUDIT.md`, `REQUIREMENTS.md`; resolves into
`VISUAL_DIRECTIONS.md`, where the owner chooses between two directions before implementation.

---

## Problem

A traveller is stranded at Orly at 23:40 with a missed connection, a wheelchair booking that never
arrived, and a group of forty behind them. Somebody has to be standing there. Aéroports Services
employs the people who are — across 14 French airports, four maritime terminals and six Paris
stations, every night of the year.

You would not know it from their website.

The site says *Premier Réseau Français d'Assistance aux passagers* and then, four clicks later,
offers you 63 comfortable hotel rooms and a safari in Botswana. Its quote page exists — a real
form, with real fields — but **every button pointing at it has pointed at `http://localhost/` for
years**, so no public visitor has ever reached it. Its contact form posts to `#` and discards what
you type. Its history page describes a company founded in 2000 with 150 vehicles; the founding
narrative on its own homepage says 2006. Of 329 image tags, 27 carry alt text and all 27 are the
same logo.

The friction is not that the site is ugly. It is that **the site cannot be trusted, and cannot be
used.** An operations manager at a charter broker, deciding at 09:00 whether to put a Nice
turnaround in these hands, finds lorem ipsum where the credentials should be and a dead link where
the quote form should be. They close the tab and call somebody else. The company's real asset — a
specific, hard-to-replicate French network with DGAC authorisation — is invisible behind theme
demo content.

## Solution

A site that behaves like the operation it represents: precise, staffed, and awake at 03:00.

The redesign puts the network itself at the centre. Not a stock photo of an aeroplane — the actual
map: fourteen airports, four maritime terminals, six Paris stations, five border airports, built as
a network object you can read, probe and interrogate. It is the one thing on the site no competitor
can copy, because it is a fact about this company rather than a claim. It also needs no rights
clearance, which matters given that every photograph in the archive has unverified provenance.

Around it, the four service families are presented with dimension and weight rather than as a flat
list — the reference's lesson about staging content as scenes, applied to a services business. The
credentials are stated plainly and once. The client wall is a wall. Every phone number is a link
you can press at 23:40 with one thumb.

## Experience Principles

**1. Specificity over reassurance** — Every generic claim is replaced by a checkable fact or cut.
Not "global coverage" but *Orly, Roissy, Le Bourget, Lyon, Bordeaux, Nice, Marseille, Toulouse,
Mulhouse, Nantes, Metz, Strasbourg, Lille, Brest*. When a fact cannot be verified it is withheld,
never softened into adjectives and never given a date it does not have. This is what the old site
failed hardest, and it resolves the tension between *sounding* credible and *being* credible.

**2. Staged, not decorated** — Depth, light, perspective and motion are used to **stage** content:
to establish where you are, what matters in this scene, and where the story goes next. The test for
any effect is whether removing it costs the visitor information or orientation. An effect that
survives only because it looks good does not survive. This resolves the tension between the
reference's cinematic confidence and an operations business's need to be legible — and it permits
depth rather than prohibiting it.

**3. Reachable at 03:00 over beautiful at 15:00** — Every contact affordance works on a phone,
one-handed, in a terminal, on a bad connection. Phone numbers are `tel:` links. The persistent
contact affordance is real and always present. Nothing critical is behind a hover, a carousel
position, or JavaScript that has not loaded. Cinematic presentation is layered *on top of* a site
that already works without it.

## Aesthetic Direction

### Two layers, not a prohibition [rev. 2]

Rev. 1 committed to flat Swiss orthodoxy and banned shadows, gradients and perspective everywhere
outside three dark bands. That overcorrected — it discarded most of what the VIP Chauffeur
reference was selected for. The corrected structure separates two concerns:

| Layer | Governed by | What it decides |
|---|---|---|
| **Information** | Airport-signage discipline | Typography, grid, hierarchy, colour-as-meaning, label systems, tabular data, reading measure. Rigorous, unglamorous, unchanged. |
| **Presentation** | Cinematic staging | Depth, elevation, light, perspective, scene transitions, motion, dimensional composition. Permitted and encouraged where it serves the story. |

The discipline governs *what you read*. The staging governs *how you arrive at it*. Neither
overrides the other; the information layer sets the constraints the staging works inside.

**Grounded, not borrowed.** In 1968 Adrian Frutiger was commissioned to design the signage for
Aéroport Roissy–Charles-de-Gaulle; the typeface he cut, derived from his Univers, became Frutiger
and the default voice of airport wayfinding worldwide. **Roissy is on Aéroports Services' coverage
list.** The signage discipline is not an aesthetic imported onto this subject — it is the visual
language of the buildings these people work in.

- **Tone**: Authoritative, awake, unsentimental. The register of a good briefing. Never salesy,
  never luxurious, never apologetic.
- **Signature element**: **The network map.** Promoted from a 346×306 px raster buried on the old
  homepage to the site's memorable object.
- **Reference points**: French airport signage; departure-board typography and tabular numerals;
  Swiss transport diagrams; and from the VIP Chauffeur recording — scroll-led scene sequencing,
  layered entrance reveals, edge-anchored light staging content against dark, a persistent contact
  affordance, and motion concentrated in high-impact moments rather than attached to everything.
- **Anti-references**:
  - **VIP Chauffeur's identity** — no emerald or turquoise, no monogram, no name, no copy, no
    client logos, no vehicles, no service taxonomy, and no reproduction of its exact compositions.
    Method transfers; appearance does not.
  - **The Kallyas travel theme** the old site wore — stock-photo hero carousels, testimonial cards,
    "STAY IN THE LOOP" newsletter blocks, icon-and-lorem feature triplets.
  - **Generic AI defaults** — cream with high-contrast serif and terracotta; near-black with acid
    green; purple gradients; Inter; predictable three-card grids.
  - **Luxury-travel gloss.** This company staffs counters at 03:00. It is not a concierge brand.

### The two directions [rev. 2]

The brief no longer prescribes a single visual answer. `VISUAL_DIRECTIONS.md` specifies:

- **Direction A — Dark cinematic aviation.** Dark default, light alternate. The map as a
  perspective-tilted luminous plane; volumetric blue light; dimensional service presentation;
  scroll-driven scene transitions.
- **Direction B — Light editorial document with cinematic dark scenes.** Light default, dark
  alternate. Editorial grid and reading-first hierarchy; depth expressed through controlled
  elevation; cinematic staging concentrated in full-bleed dark scenes.

Both honour the two-layer structure, both keep aviation blue, both are fully designed in light and
dark. **The owner chooses one before implementation.**

### Typography

| Role | Face | Why |
|---|---|---|
| Display | **Archivo** variable, width expanded (`wdth` 110–125), 600–700 | A grotesque in the Univers/Frutiger structural lineage. Expanding the width axis is the signature typographic move — illuminated signage and departure-board lettering, without imitating any airport's proprietary type. |
| Body / UI | **Archivo** variable, normal width (`wdth` 100), 400/500 | Same superfamily. The display/body distinction is carried by *width* rather than a second personality — more disciplined and more distinctive than a two-family pairing. |
| Data / eyebrow | **IBM Plex Mono** 400/500 | Tabular figures for coverage counts, phone numbers and category eyebrows. Flight-board texture, and functional: the numbers align. |

Rejected: Inter and Roboto (generic defaults), Instrument Sans (a second family the width axis makes
unnecessary), Frutiger itself (proprietary — imitating it would borrow an airport's identity rather
than speak its language).

### Colour

Aviation blue is the identity. Three blues appear in the archive; two have provenance:

| Source | Value | Status |
|---|---|---|
| Logo primary | `#0180B9` | **Authoritative.** 1,463 px in the logo file. Anchors the ramp. |
| Logo deep | `#004A7F` | **Authoritative.** 313 px in the logo file. |
| Meta `theme-color` | `#0d5195` | **Not adopted.** Identical on all 27 pages including the Botswana and Santorini demos — evidence of a Kallyas/Elementor theme default rather than a brand decision. |

### Contrast — canonical figures [rev. 2]

**Rev. 1 stated the logo blue measures "roughly 3.5:1" on white. That was wrong.** Every ratio
below is computed (WCAG 2.x relative luminance) and is the single source of truth; the token file
matches these exactly.

| Pair | Ratio | Level |
|---|---|---|
| `#0180B9` on pure white `#FFFFFF` | **4.38:1** | AA-large / UI only |
| `#0180B9` on light ground `#FAFAFA` | **4.20:1** | AA-large / UI only |
| `#0180B9` on dark ground `#080B0F` | **4.50:1** | AA-large / UI only |
| `#0180B9` on scene ground `#0B1219` | **4.30:1** | AA-large / UI only |
| `#01547A` (blue-700) on `#FAFAFA` | **7.89:1** | AAA — the light-theme link/accent |
| `#6ECDF7` (blue-300) on `#080B0F` | **11.02:1** | AAA — the dark-theme link/accent |
| White on `#01547A` | **8.23:1** | AAA — solid action fill |
| `#0B0F14` on `#FAFAFA` | **18.41:1** | AAA — light body text |
| `#E8EDF2` on `#080B0F` | **16.74:1** | AAA — dark body text |

**The operative consequence:** the exact logo blue clears 4.5:1 on none of the four grounds, so it
is **never body text** in either theme. It is used for large display type, borders, map node marks
and the focus ring — and it earns the focus-ring role specifically because it is the only value in
the system clearing 3:1 against *all* grounds (4.20 / 4.50 / 4.30).

## Existing Patterns

Bare `create-next-app` scaffold. Nothing to extend.

- **Typography**: Geist Sans + Geist Mono. **Replaced** — generic, and unrelated to the subject.
- **Colours**: `--background`/`--foreground` with a `prefers-color-scheme` override. **Replaced.**
- **Spacing / components**: none.
- **Conventions to respect**: Tailwind v4 CSS-first (`@theme` in `globals.css`, no
  `tailwind.config.ts`), App Router, TypeScript strict, `LayoutProps<"/">`. Per `AGENTS.md`, read
  `node_modules/next/dist/docs/` before writing code — two API changes have already been found this
  way (Proxy, 308).
- **Must change regardless**: `<html lang="en">` → `lang="fr"`.

## Component Inventory

| Component | Status | Notes |
|---|---|---|
| `SiteHeader` | New | Logo (original PNG, unmodified) + 5 nav items + one primary action. Light plate behind the logo when the ground is dark. |
| `MobileNav` | New | Drawer, focus-trapped, contact block pinned at the bottom. |
| `Scene` | New | The staging primitive. Owns ground, depth planes, light and entrance choreography. Replaces rev. 1's `SceneBand`, which only did dark bands. |
| `NetworkMap` | New | **Signature.** Inline SVG, 29 nodes in 4 categories, ignition animation, hover/focus, full keyboard operation, text-table peer view. |
| `CoverageTable` | New | The accessible peer view. Replaces the map below 768px. |
| `StatFigure` | New | **Renders only verified, owner-dated figures.** Cannot compile without `reportingYear` + `basis`. Unpublished until then. |
| `ServiceFamily` | New | One of four. Dimensional presentation per the chosen direction. |
| `CredentialRow` | New | DGAC / ADP / CCI / Vinci, stated once. |
| `ClientWall` | New | Six verified categories carry the structure; marks appear only once individually approved. Reads correctly from ~12 marks up, and from zero. |
| `ContactCard` | New | Address, two `tel:` links, fax, email. Must never fail. |
| `QuoteForm` | New | **No submit affordance while unwired.** Fields designed and disabled; phone and email are the primary actions. |
| `LegalDocument` | New | CGV clauses A–I, anchored, long-form measure. |
| `FloatingContact` | New | Persistent phone affordance. Works without JavaScript. |
| `ThemeToggle` | New | Honours system preference; manual choice persists. |
| `Footer` | New | Map motif, legal links, real social links, entity attribution pending V14. |

Fifteen new components, zero reused.

## Key Interactions

**Scene sequencing.** Each major section arrives as a composed scene — heading, then supporting
content, then controls — once per section, never replayed. Transferred from the reference's observed
behaviour. Depth and parallax participate where the chosen direction calls for it.

**The map ignites.** The outline draws, then nodes illuminate in four category waves. Hover or
focus raises a node and dims its siblings. Nodes are real controls: tab order, arrow-key movement,
accessible names, 44px hit targets. The `CoverageTable` is always present — a list of fourteen
airports is genuinely useful, not a fallback.

**Light is authored, not reactive.** Blooms and light sources are anchored to composition, static
per scene. No cursor-tracking glow — the most common way this effect gets cheapened.

**The quote page is honest before you invest effort.** Unavailability of online submission is
stated at the top, and the phone and email actions carry primary weight. There is no submit
button and no simulated success.

**Every phone number is one tap.** `tel:` on all three numbers, in the drawer, the contact card,
the floating affordance and the footer. The old site had zero across 27 pages.

## Responsive Behavior

Mobile-first, 375px baseline, `min-width` queries only.

| Breakpoint | Behaviour |
|---|---|
| 375–767 | Single column. Nav → drawer. **The map swaps component, not size**: interactive SVG → grouped coverage list. A 29-node SVG is unusable at 375px. Depth effects reduce to a single plane; parallax off. |
| 768–1023 | Two columns. Map returns as SVG at reduced label density. Client wall 3-up. |
| 1024–1439 | Full grid, full label density, wall 5-up, scenes at full depth. |
| 1440+ | Grid caps at 1440; scenes bleed full-width while content stays gridded. |

Touch targets ≥ 44×44. Body ≥ 16px on mobile. Line length 45–75 characters at every breakpoint.

## Accessibility Requirements

- **Contrast**: body ≥ 7:1 both themes, verified against the canonical table above. Large display
  and UI boundaries ≥ 3:1. The logo blue is never body text.
- **Zoom**: `maximum-scale=1` removed — the old site blocked pinch-zoom on all 27 pages. Reflow to
  320px at 400%.
- **Keyboard**: every control reachable and visibly focused with a designed ring. Skip link first
  in tab order. Drawer traps and restores focus. Map nodes are real controls.
- **Screen reader**: the map has an accessible name and a described structure, with the coverage
  table as its text equivalent. Every image gets written alt text — all of it new.
- **Motion**: `prefers-reduced-motion: reduce` disables scene sequencing, map ignition, parallax
  and transitions. Content appears in final state. A switch, not a dial. **This constraint grows in
  importance as the visual direction adds depth** — it is a gate on Direction A, not a footnote.
- **Forms**: labels visible and associated, required marked in text not colour, errors linked with
  `aria-describedby`. The disabled preview state is announced, not merely styled.
- **Language**: `lang="fr"`.

## Out of Scope

- **A backend of any kind.** No route handlers, no database, no email provider. B1 is a launch
  blocker.
- **A CMS.** Content is typed data in the repo.
- **English or any second language** (D1).
- **A blog, news or article system.**
- **Careers as a real page** (D5).
- **Any modification to the logo.** P1 is a proposal awaiting approval, not scheduled work.
- **Verifying V1–V20.** Flagged and gated; owned by the project owner, and V12/V13/V19 by counsel.
- **Any legal or regulatory assessment.** This package records what the archive contains and what
  requires checking. It is not legal advice.
- **Clearing client trademarks** (D6). Marks stay in `reference/` until individually approved.
- **Rotating the exposed Google Maps API keys** (SEC1).
- **Redirect implementation.** Specified in the matrix; written in Phase 6.
