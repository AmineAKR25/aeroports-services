# Build Tasks: Aéroports Services — site redesign

Generated from `.design/aeroports-services-redesign/DESIGN_BRIEF.md`. **Rev. 2.**
Also reads: `CONTENT_AUDIT.md`, `REQUIREMENTS.md`, `VISUAL_DIRECTIONS.md`,
`INFORMATION_ARCHITECTURE.md`, `CONTENT_MIGRATION_MATRIX.md`, `DESIGN_TOKENS.css`
Date: 2026-08-26 · **rev. 4** — Phase V + Phase V-bis built; awaiting owner approval

**Codebase state (rev. 4):** Phase V-bis is built. `src/app/` holds `layout.tsx`, `page.tsx`,
`globals.css`, `favicon.ico`; `src/components/` holds `SiteHeader`, `MobileNav`, `ThemeToggle`,
`ServiceScene`, `NetworkMap`, `Reveal`; `src/content/` holds `services.ts` and the generated
`coverage.ts`; `src/lib/theme.ts` owns the theme. **Six of the fifteen components exist; the
other nine are still new work.**
Conventions: App Router, TypeScript strict, Tailwind v4 CSS-first, PascalCase components in
`src/components/`, kebab-case route folders. No test runner is installed — T0 adds one.

> **Read `node_modules/next/dist/docs/` before the first line of code.** Per `AGENTS.md` this
> version has breaking changes from training data. Two are already confirmed and have changed this
> plan: **Middleware is now `proxy.ts`**, and **`redirects()` emits 308/307, not 301/302**.

---

## Gate 0 — blocked until the owner acts

- [x] ~~**G1 — Choose a visual direction.**~~ Direction A «Nuit» selected as the preferred
      conceptual direction.
- [x] ~~**G1b — Approve the revised styleframes.**~~ Superseded: the owner approved building
      Phase V directly, and Phase V-bis rebuilt it against the audit findings. Rev. 2's styleframes were rejected: hand-drawn
      France, 20 of 29 nodes, wrong category split, unreadable service stack, generic hero,
      postage-stamp logo, no charset declaration. **Rev. 3 rebuilds all of it on verified
      Lambert-93 geometry** — see `MAP_GEOMETRY.md`.
- [ ] **G1c — Confirm V21.** *Provisional and non-blocking for Phase V: provisional
      coordinates are flagged in the UI as interpretations rather than asserted.* "Roissy" = Paris-CDG, "Metz" = Metz-Nancy-Lorraine, and Mulhouse/Bâle
      being one facility.

<details><summary>Original G1 (resolved)</summary>

- **G1 — Choose a visual direction.** A (Nuit) or B (Jour). **Resolved: Direction A.** See
      `VISUAL_DIRECTIONS.md` and `styleframes.html`. The prototype uses the owner-resolved light
      first-visit default; the map treatment, service presentation and header/logo treatment are
      implemented in Phase V-bis.

</details>

---

## Phase V — Visual validation — **BUILT** *(Phase V-bis applied the audit corrections)*

> **Phase V-bis, 2026-08-26.** An independent audit of the first Phase V build found the map
> unusable by keyboard (a dead CSS selector left 29 controls with no focus ring), the sub-768px
> map swap unimplemented, the header clipped on every phone width and non-sticky below the hero,
> and the theme toggle able to disagree with the rendered theme. All are fixed. The map's
> interactive unit is now the 18 verified geographic clusters rather than 29 stacked marks;
> `build_map.py` now generates `src/content/coverage.ts`, so its GENERATED header is true.

Required by correction 12. **Four components, one page, no routes beyond the home shell.** The
purpose is to judge the chosen direction against real type, real content and real motion before
anything else is built on top of it.

- [x] **V1 — Tokens and typography.** Install `DESIGN_TOKENS.css` into `src/app/globals.css`,
      applying the **DEFAULT SWITCH** for the chosen direction. Wire Archivo (variable, `wght` +
      `wdth`) and IBM Plex Mono via `next/font/google`, replacing Geist. `<html lang="fr">`, remove
      `maximum-scale=1`, add the light/dark `theme-color` pair. _New._
- [x] **V2 — `SiteHeader` + logo treatment.** Per the chosen direction: floating translucent pill
      with the light logo plate (A), or solid light bar with the PNG untreated (B). Nav, primary
      action, scroll condensation. **The logo file is used unmodified in both cases.** _Depends on V1._
- [x] **V3 — Hero.** The full hero composition for the direction — including the depth planes,
      light and entrance choreography. This is where the direction either works or does not. _Depends on V1._
- [x] **V4 — One service scene.** The depth stack (A) or the receding 2×2 grid (B), with real
      content from all four families. Proves the dimensional presentation at real text lengths. _Depends on V1._
- [x] **V5 — `NetworkMap` treatment.** *Geometry is already built and verified in
      `map-pipeline/`; V5 ports it into React rather than re-deriving it.* The perspective plane (A) or flat schematic (B), with all 29
      real nodes. **Includes the reduced-motion path and full keyboard operation from the start** —
      these are Gates 1 and 2 in `VISUAL_DIRECTIONS.md`, not follow-up work. If the map cannot be
      operated by keyboard in perspective, it flattens. _Depends on V1, V3._
- [x] **V6 — Screenshot review.** Capture desktop (1440) and mobile (375) for the hero, the service
      scene and the map, in **both themes** and with **reduced-motion forced on**. Save to
      `.design/aeroports-services-redesign/screenshots/`.

> ### ■ STOP — approval gate
> Present the screenshots. **Do not continue to any other page until the direction is approved.**
> If it is rejected, revise within the direction or switch to the other one; either way the cost is
> four components, not sixteen.

---

## Foundation *(after Phase V approval)*

- [ ] **T0 — Add a test runner.** Vitest + a `curl`-based HTTP status harness. Required by T16's
      three-layer redirect test plan; currently nothing is installed. _New._
- [ ] **T1 — Copy approved assets into `public/`.** **Only the logo, both sizes, unmodified.**
      Everything else — 34 client marks, 4 partner marks, all photography — **stays in `reference/`
      until individually approved** (correction 8; matrix §5). Add `public/ATTRIBUTION.md`. Done:
      `reference/` unchanged, and `public/` contains no unverified third-party asset. _New._
- [ ] **T2 — Content data layer.** Typed modules in `src/content/`: `services.ts` (4 families, all
      19 bullets verbatim), `coverage.ts` (29 nodes with category and coordinates), `clients.ts`
      (34 marks, **`approved: false` and no image path** — a mark cannot reference a file absent
      from `public/`, so it cannot render by mistake), `stats.ts` (4 figures,
      **`status: 'unverified'`, no invented year**), `contact.ts`, `legal.ts` (clauses A–I verbatim).
      Done: no business string is hardcoded in a component; the build fails on `approved: true`
      with no resolvable asset. _New._
- [ ] **T3 — Root layout, drawer, theme toggle.** `MobileNav` with focus trap and restoration,
      skip-to-content first in tab order, `ThemeToggle` using light on first visit and persisting
      manual choice with no flash on load. Done: keyboard-only navigation reaches every route. _Depends on V1, V2._

## Core UI

- [ ] **T4 — `CoverageTable`.** Four categories, `**` footnote verbatim. A peer view of the map,
      and its **replacement** below 768px. Done: complete and readable with JavaScript disabled. _Depends on T2._
- [ ] **T5 — `ServiceFamily` and `/prestations`.** All four families, every bullet, anchors
      `#assistance` `#representation` `#compagnies` `#force-de-vente`, plus the buyer-type mapping.
      **Document treatment** on this route per the recommendation. Done: all 19 bullets present;
      deep links land correctly. _Depends on V4, T2._
- [ ] **T6 — `StatFigure` and `CredentialRow`.** `StatFigure` accepts only `status: 'verified'`
      entries with `reportingYear` and `basis`; **it currently renders nothing** and the layouts
      omit the band cleanly (V1–V4). No "chiffres 2017" label exists anywhere in the codebase.
      `CredentialRow` states DGAC / ADP / CCI / Vinci once. Done: no undated figure can reach the
      DOM. _Depends on V1, T2._
- [ ] **T7 — `ClientWall` and `/clients-partenaires`.** Six verified categories carry the
      structure; marks render only when `approved: true`. **Must read as finished at zero approved
      marks**, and correctly from ~12 upward. Done: layout holds at 0, 12, 20 and 34. _Depends on V1, T2._
- [ ] **T8 — Home `/`.** Assembles the hierarchy from the IA: hero → map → condensed services →
      credentials → *(statistics band omitted)* → client wall → closing scene. Done: matches the
      content priority order; reads as complete with no statistics and no approved marks. _Depends on V3, V4, V5, T5, T6, T7._
- [ ] **T9 — `/couverture` and `/a-propos`.** Coverage: full-density map + table + footnote.
      À propos: missions, the real 2006 founding narrative, 4 values, 4 atouts, authorisations;
      document treatment. Done: every string traced to these routes in matrix §4 is present
      verbatim. _Depends on V5, T4, T6._
- [ ] **T10 — `ContactCard`, `FloatingContact`, `/contact`.** Address, **two `tel:` links**, fax,
      email. `FloatingContact` on all 8 routes at every scroll position, a phone action.
      **Must work with JavaScript disabled** — this is the 23:40 flow. Done: three taps from any
      page to a dialled call. _Depends on V1, T2._
- [ ] **T11 — `QuoteForm` and `/devis`.** Per correction 9 and D4: **online submission is visibly
      marked unavailable at the top of the page**, telephone and email are the primary full-weight
      actions, and the field set renders in a **disabled preview state with no submit button and no
      simulated success**. Typed `QuoteRequest`; one `submitQuoteRequest()` adapter, unimplemented.
      Done: no code path accepts input it will discard, and no path implies delivery. _Depends on V1, T2._
- [ ] **T12 — `LegalDocument` and `/conditions-generales`.** Clauses A–I verbatim, anchored, 65ch,
      document treatment. **IBAN/BIC block behind a flag pending V11/SEC2.** Reserve
      `/mentions-legales` with the component built and a placeholder naming what the owner must
      supply (V19). Done: all nine clauses individually linkable. _Depends on V1, T2._
- [ ] **T13 — `Footer`.** Map motif, legal links, real social links (LinkedIn URL modernised from
      `company-beta/`), **entity attribution left as a flagged placeholder pending V14**. _Depends on T2._

## Interactions & States

- [ ] **T14 — Scene sequencing.** `IntersectionObserver` + CSS: heading → content → controls at
      `--stagger-step`, once per section, never replayed. Parallax across the depth planes where
      the direction calls for it. No animation library — nothing is installed and nothing should be.
      Done: scrolling back does not re-trigger; reduced-motion renders final state. _Depends on V3._
- [ ] **T15 — Map interaction states.** Idle, hover, keyboard focus, selected, dimmed siblings,
      igniting, ignited, reduced-motion, and touch (tap to label, tap-away to dismiss). Done: every
      state reachable by keyboard alone. _Depends on V5._
- [ ] **T16 — Redirects, 410s and their tests.** `next.config.ts` `redirects()` with
      `permanent: true` (**308**) for every row of matrix §1 with a destination, **both slash
      forms**. `proxy.ts` returning `new Response(null, { status: 410 })` for the 9 gone paths and
      the wp-* classes, with a narrow matcher. Then all three test layers from matrix §2c:
      config-table test against a manifest-generated fixture, proxy matcher tests via
      `next/experimental/testing/server`, and the authoritative `build && start` + curl status
      sweep over all 27 legacy URLs. Done: every row of the matrix verified by an executing test. _Depends on T0, T2._
- [ ] **T17 — Form states.** Unavailable (current default), and — behind the flag, ready for B1 —
      empty, focused, filled, invalid-on-blur, valid, submitting, submitted. Plus the JS-disabled
      fallback surfacing phone and email. Done: no state conveys meaning by colour alone; the
      disabled preview is announced, not merely styled. _Depends on T11._

## Responsive & Polish

- [ ] **T18 — Responsive pass.** 375 / 768 / 1024 / 1440. **Load-bearing case: below 768px
      `NetworkMap` swaps to `CoverageTable`** — it does not shrink. Depth reduces to a single plane
      and parallax switches off on mobile. Done: no horizontal scroll at 320px; 45–75ch at every
      breakpoint; touch targets ≥44px. _Depends on T8–T13._
- [ ] **T19 — Alt text and image optimisation.** Write alt text for **every** published image — all
      of it new, since the archive supplied 27 useful attributes across 329 tags and all were the
      logo. Decorative texture gets `alt=""` + `aria-hidden`. `next/image` with correct sizes.
      Currently applies to the logo only; extends as assets are approved. _Depends on T1, T8._
- [ ] **T20 — Accessibility pass.** Verify against the canonical contrast table: body ≥7:1 both
      themes, and **`#0180B9` never used as body text**. Reflow to 320px at 400% zoom. Designed
      focus ring on every control. Skip link, drawer trap and restoration, map nodes announced,
      form labels associated, `lang="fr"`, reduced-motion switch verified across every motion
      system added in T14/T15. Run `/accesslint:accessibility-scan` against the dev server. Done:
      no automated violations; keyboard-only completion of flows 1–4. _Depends on T18._
- [ ] **T21 — Metadata and SEO.** Per-page `title` and real `description` (the legacy site had
      single-word `og:description` values and no `description` meta at all). `og:locale=fr_FR`,
      canonicals, `sitemap.ts` covering the 8 real routes only, `robots.ts`, favicon set from the
      unmodified logo. Done: no legacy URL appears in the new sitemap. _Depends on T16._

---

## Launch blockers — owner-owned, not polish

- [ ] **B1 — Wire the quote form.** Until this lands the site has no online quote intake. Route
      handler + transactional email to `resaparis@aeroports-services.com`, implement
      `submitQuoteRequest()`, flip the availability flag, enable the fields, add the submit button
      and a real confirmation. **The site should not go public without this or a deliberate
      decision to launch phone-and-email only.**
- [ ] **B2 — Verify V1–V20** (matrix §6). Statistics (still unpublished), coverage lists,
      authorisations, contact details, founder-name consent, footer entity, **photography rights
      and provenance (V20)**.
- [ ] **B3 — Approve client and partner marks individually (V7, V8).** Each approval is: copy the
      file to `public/`, set `approved: true`. Replace or drop the five known-stale marks. Resolve
      the `brokair.jpg` / Aviation Factory discrepancy.
- [ ] **B4 — `mentions légales` (V19).** The archive contains no publisher identity. **Whether the
      page is required and what it must contain is a question for the owner or counsel** — this
      plan takes no position. Route reserved and component built in T12.
- [ ] **B5 — SEC2: confirm IBAN/BIC republication** before the CGV block is unflagged.
- [ ] **SEC1 — Rotate the two exposed Google Maps API keys** and add referrer restrictions.
      Independent of the redesign; do it anyway.
- [ ] **P1 — SVG redraw of the logo** for retina and favicon quality. **Proposal awaiting
      approval — not scheduled.** The build ships the original PNG unmodified either way.

## Review

- [ ] **Design review**: `/designer-skills:design-review` against the brief once T8–T13 are built.
- [ ] **Accessibility audit**: `/accesslint:accessibility-audit` across the 8 routes before launch.

---

## Build order rationale

**The direction is validated before it is scaled.** Phase V builds four components and stops. Rev. 1
went straight from tokens to eleven pages; a visual direction that only reveals itself as wrong at
page nine costs the whole build. Four components is a cheap thing to throw away.

**The two gates on Direction A are built into Phase V, not deferred.** The reduced-motion path and
keyboard operation of the map ship in V5 alongside the motion itself, because both are the kind of
work that never survives being scheduled after the thing it constrains.

**Nothing unverified reaches `public/`.** T1 copies the logo and stops. The wall, the photography
and the statistics are all designed to read as finished in their empty state, so the site is
never blocked on someone else's homework — it improves as approvals land.

**Honesty is structural, not editorial.** `stats.ts` cannot express an undated figure; `clients.ts`
cannot reference an unapproved file; `QuoteForm` has no submit path while unwired. These are type
and build constraints rather than reminders, because reminders are what produced a site whose quote
button pointed at `localhost` for nine years.
