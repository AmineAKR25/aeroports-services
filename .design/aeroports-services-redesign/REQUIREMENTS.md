# Requirements — grill summary

Phase 1 of the design flow. **Rev. 2** — revised after owner review of the rev. 1 package.
Changes from rev. 1 are marked **[rev. 2]**.

---

## Resolved by exploring the codebase (not asked)

| Question | Answer | Evidence |
|---|---|---|
| Framework | Next.js **16.3.2**, App Router | `package.json` |
| React | **19.2.8** | `package.json` |
| Styling | **Tailwind v4**, CSS-first `@theme` | `package.json`, `src/app/globals.css` |
| Language | TypeScript 5, strict | `tsconfig.json` |
| Existing tokens | None beyond `create-next-app` defaults | `src/app/globals.css` |
| Existing components | None. Scaffold is `layout.tsx` + `page.tsx` only | `find src -type f` |
| Current `<html lang>` | `"en"` — wrong for this site, fix regardless | `src/app/layout.tsx` |
| Fonts loaded | Geist Sans + Geist Mono via `next/font/google` | `src/app/layout.tsx` |
| Old site fonts | Open Sans 300/400 + Montserrat 400/700 | archive metadata |
| **Middleware API** **[rev. 2]** | **Renamed `proxy.ts` in Next.js 16.** Node runtime only; `runtime` config throws. | `node_modules/next/dist/docs/01-app/01-getting-started/16-proxy.md` |
| **Redirect status codes** **[rev. 2]** | **`redirects()` emits 308/307, not 301/302.** `statusCode` available but mutually exclusive with `permanent`. | `…/05-config/01-next-config-js/redirects.md` |
| Framework caveat | `AGENTS.md`: read `node_modules/next/dist/docs/` before writing code. `LayoutProps<"/">` already in use. | `AGENTS.md`, `layout.tsx` |

---

## D1 — Language: French only

All genuine content in the archive is French. The English page names on the old site
(`About Us`, `Our Fleet`, `Global Coverage`, `Careers`, `Flights+Hotel`) were Kallyas theme
artifacts — every one of those pages is demo content.

**Consequences:** no i18n routing, no locale switcher, no translation of the CGV. French slugs.
`<html lang="fr">`. `og:locale=fr_FR`. The route structure accepts a `/en` segment later without
restructuring.

---

## D2 — Theme default: **RESOLVED — light on a first visit** [rev. 3]

> **Owner decision A14, 2026-08-26. This supersedes everything below in this section and
> condition 2 of `VISUAL_DIRECTIONS.md`.**
>
> **The site uses LIGHT on a first visit, regardless of the operating-system preference.**
> Resolution order:
> 1. an explicit `?theme=light|dark` override, for deterministic testing and capture (not persisted);
> 2. a valid stored manual preference;
> 3. otherwise light.
>
> `prefers-color-scheme` is not consulted anywhere. After the visitor toggles, the choice
> persists and is applied before first paint, so there is no flash. The toggle controls the
> surrounding document surfaces; **Direction A's cinematic scenes stay dark in both themes**
> and take their ink from scene-local tokens, so their contrast cannot change with the theme.
>
> Rev. 2's "system preference is honoured on first visit" is **withdrawn**.

**Rev. 1 recorded "light default" as an owner decision. That was wrong** — the owner accepts either
light or dark, and the question was put before there was anything visual to judge it against. The
claim is withdrawn.

**How it is now resolved:** Direction A was selected for the Phase V-bis prototype. The prototype
ships both themes, with light as the first-visit default and a manual toggle; the operating-system
preference is deliberately not consulted. The dark scenes remain cinematic in either document
theme, and the alternate theme is a real alternate rather than an afterthought.

**The logo constraint, restated accurately.** The wordmark "SERVICES" is pure black
(`#000000`, 453 px) and disappears on dark grounds. This does **not** block a dark default:
Direction A resolves it with a **light plate behind the logo in the header** — a surface decision
that leaves the PNG untouched, so instruction 1 holds and no approval is blocked. **P1** (SVG
redraw for retina and favicon quality) remains a proposal awaiting approval and is not scheduled
work under either direction.

---

## D3 — Imagery: photography-light, and photography is gated [rev. 2]

**Rev. 1 stated "the archive has no proprietary photography." That conclusion is withdrawn** — the
archive establishes no ownership either way, and absence of evidence in a website capture is not
evidence about the business.

**What is actually established:** none of the eight image files carries EXIF authorship, a credit
line or a licence record in the archive. **Ownership and provenance are unverified (V20).**
Separately, four of the eight are unsuitable on quality grounds regardless of who owns them
(composite graphics and illustrations, not photography of the operation), and one shows a terminal
that does not match any airport on the coverage list.

**Consequences:**
- **No photograph enters `public/` until V20 is answered** (correction 8 applied to imagery as well
  as marks). The three quality-suitable files stay in `reference/`.
- The visual system is therefore designed to **carry the site without photography** — typography,
  aviation-blue light, depth, motion, and the coverage map as the signature object. Photography
  slots exist and improve the design when filled, but nothing depends on them.
- This is a design strength rather than only a constraint: the map is a fact about this company
  that no competitor can copy, and it does not need a rights clearance.
- If the owner commissions a shoot, the slots are typed and ready.

---

## D4 — Quote form: no false submit affordance while the backend is absent [rev. 2]

**Rev. 1 designed a normal submit interaction ending in a "success" state that disclaimed itself in
copy. That is withdrawn** — a form that behaves like it submits, then explains that it did not, is
still a false affordance, and correction 9 rules it out.

**Designed behaviour while no backend exists:**
- **Online submission is visibly unavailable before the user invests any effort** — stated at the
  top of `/devis`, not discovered after filling seven fields.
- **Telephone and email are the primary actions on the page**, at full weight: the OPS number and
  `resaparis@aeroports-services.com` as large, tappable controls. This matches how the business
  actually takes bookings — the CGV itself names phone, mail and fax as the confirmation channels.
- The field set is still **designed and built** — typed `QuoteRequest`, real labels, real
  validation — but rendered in a **disabled/preview state** with no submit button and no simulated
  success. Nothing accepts input it will discard.
- One `submitQuoteRequest()` adapter exists with no live implementation. Wiring it later is a
  one-file change plus flipping the availability flag.

**When the backend lands (B1),** the availability flag flips, the fields enable, the submit button
appears, and the confirmation states a real response channel and timeframe.

**Stated risk:** the site launches without online quote intake. That is a deliberate scope choice,
not an oversight, and B1 is a launch blocker rather than a backlog item.

---

## D5 — Retired pages: retire five, redirect to real equivalents

`/our-history/`, `/our-fleet/`, `/careers/`, `/global-coverage/`, `/gallery/` contain no Aéroports
Services content and are retired. No empty shells, no invented content.

**[rev. 2] Wording corrected.** Rev. 1 justified retiring `/our-fleet/` with "no fleet exists."
**That was an unsupported conclusion about the business drawn from missing website content.** The
supportable statement: **the archive contains no verified fleet information** — the page held only
Kallyas demo testimonials, so there is nothing to migrate. Whether the company operates vehicles is
not established by this archive and is not a question the redesign needs to answer. If the owner
has fleet information, the topic can return as a real page.

| Retired page | Redirect (308) | What carries the topic |
|---|---|---|
| `/our-history/` | `/a-propos` | The real 2006 founding narrative from Accueil |
| `/global-coverage/` | `/couverture` | The real airport/port/station lists from Accueil |
| `/our-fleet/` | `/clients-partenaires` | Nothing to migrate — no verified fleet information in the archive |
| `/gallery/` | `/clients-partenaires` | The only real images are the client marks |
| `/careers/` | `/contact` | No genuine job content; returns when real openings exist |

---

## D6 — Client and partner marks: designed, but gated at the asset boundary [rev. 2]

**Rev. 1 planned to copy all 34 marks into `public/` and flag them for later verification. That is
withdrawn** — correction 8 requires unverified marks to stay inside `reference/`.

**Revised:**
- **No mark enters `public/` or the content data layer until individually approved.** `reference/`
  remains the holding area.
- `src/content/clients.ts` lists every mark with `approved: false` and **no image path**, so an
  unapproved mark cannot render even by mistake. Approval is a two-step commit: copy the file,
  flip the flag. The build fails on `approved: true` with no resolvable asset.
- **The six categories are verified independently of the marks** and carry the page structure on
  their own. `/clients-partenaires` therefore ships and reads as finished with **zero** marks
  cleared, and improves as they land. The page is not blocked on B3.
- `ClientWall` reads correctly from roughly 12 marks upward — a layout that only works at 34 would
  be a trap, since the cleared count will be lower.

Known-stale marks needing replacement or removal: Carlson Wagonlit (→ CWT, 2019), HRG (acquired by
AmEx GBT, 2018), Havas Voyages, Selectour, Air France wordmark. Known defect: `brokair.jpg`
contains The Aviation Factory's mark (V8).

---

## D7 — Visual direction: reopened, two directions to choose between [rev. 2]

**New decision, replacing rev. 1's single prescribed direction.**

Rev. 1 committed to flat Swiss restraint with atmospheric light "quarantined" to three dark bands,
and explicitly prohibited shadows, gradients and perspective everywhere else. **That overcorrected**
— it removed most of what the owner selected the VIP Chauffeur reference for.

**Retained as non-negotiable:**
- Aviation-blue identity, derived from the logo's own measured colours.
- Information clarity — every claim checkable, nothing decorative pretending to be informative.
- Airport-signage discipline in typography, grid and hierarchy.
- Accessibility and operational usability, including the 03:00 phone flow.

**No longer prohibited:**
- Layered depth and z-axis composition.
- Controlled shadows and elevation.
- Perspective and dimensional presentation, including for the service families.
- Cinematic transitions between scenes and routes.
- Advanced motion where it serves the story.

**Still excluded — reference boundaries, unchanged:** VIP Chauffeur's emerald and turquoise, its
monogram, its name, its copy, its client logos, its vehicles, its service taxonomy, and its exact
compositions. What transfers is method — staging, lighting discipline, motion restraint — not
appearance.

**Resolution:** `VISUAL_DIRECTIONS.md` specifies Direction A and Direction B in full, with
styleframes at desktop and mobile. **The owner picks one before implementation.** A recommendation
is given there, derived from the two directions rather than asserted in advance.

---

## Non-negotiables carried into every later phase

1. The original PNG logo is used unmodified. Any treatment is a proposal requiring approval.
2. Aviation blue is the identity. VIP Chauffeur's emerald is never transferred.
3. **No fact, statistic, accreditation, partner or coverage claim is invented, dated or silently
   rewritten.** Undated statistics stay unpublished (§D3 of the matrix). **[rev. 2]**
4. **No business-existence conclusion is drawn from missing website content.** The archive
   evidences what the website contained, nothing more. **[rev. 2]**
5. **Legal and regulatory questions are verification items for the owner or qualified counsel.**
   Nothing in this package is legal advice or a compliance assessment. **[rev. 2]**
6. Genuine content is separated from demo residue; no unique content is deleted because its host
   page is obsolete.
7. All 27 captured URLs appear in the migration matrix exactly once, reconciled programmatically.
   **[rev. 2]**
8. `reference/` is read-only, and is the holding area for every unverified asset. **[rev. 2]**
9. Accessibility is a floor, not a phase. The old site shipped 27 useful alt attributes across 329
   image tags and blocked pinch-zoom sitewide; both are fixed by construction.

---

## Open items owned by the project owner

- **V1–V20** — verification items (migration matrix §6). V12, V13 and V19 are for counsel.
- **Visual direction A or B** — blocks implementation.
- **P1** — SVG redraw of the logo. Proposal, awaiting approval, not scheduled.
- **SEC1** — two exposed Google Maps API keys; rotate and restrict regardless of the redesign.
- **SEC2** — confirm intent to republish bank coordinates.
