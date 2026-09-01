# Design Review: Aéroports Services Homepage V3

Reviewed against: `DESIGN_BRIEF.md` and its V3 amendment
Philosophy: Documentary Operations — French aviation precision with human warmth
Date: 1 September 2026
Review status: **MapTiler vector basemap verified in the normal browser; Codex in-app Browser unavailable; structural P2 deferred**
Verdict: **The coverage map now renders a genuine MapTiler vector geography locally, preserves the 29-coordinate interaction model and retains an honest accessible fallback when the provider is unavailable.**
Score: **68/100 (original review score retained; structural P2 was not rescored)**

## Screenshots Captured

| Screenshot | Breakpoint/state | Description |
| --- | --- | --- |
| `screenshots/review-v3-viewport-desktop-1280.png` | 1280×800 | Clean desktop first viewport |
| `screenshots/review-v3-viewport-tablet-768.png` | 768×1024 | Clean tablet first viewport |
| `screenshots/review-v3-viewport-mobile-375.png` | 375×812 | Clean mobile first viewport |
| `screenshots/review-v3-map-markers-desktop-1280.png` | 1280×800, coverage map | Live map and marker positions |
| `screenshots/review-v3-quote-workspace-desktop-1280.png` | 1280×800, quote open | Quote workspace and initial focus |
| `screenshots/review-v3-mobile-menu-375.png` | 375×812, menu open | Mobile navigation and persistent actions |
| `screenshots/review-v3-homepage-desktop-1280.png` | 1280 full page | Browser full-page capture |
| `screenshots/review-v3-homepage-tablet-768.png` | 768 full page | Browser full-page capture |
| `screenshots/review-v3-homepage-mobile-375.png` | 375 full page | Browser full-page capture |
| `screenshots/p0-homepage-desktop-1280.png` | 1280 full page | Fresh P0 regression capture |
| `screenshots/p0-homepage-tablet-768.png` | 768 full page | Fresh P0 regression capture |
| `screenshots/p0-homepage-mobile-375.png` | 375 full page | Fresh P0 regression capture |
| `screenshots/p0-homepage-narrow-320.png` | 320 full page | Fresh narrow-layout capture |
| `screenshots/p0-map-markers-1280.png` | 1280×800, coverage map | OpenFreeMap overview with geographic markers and dense groups |
| `screenshots/p0-map-density-panel-1280.png` | 1280×800, Paris detail | Paris dense-location panel after cluster activation |
| `screenshots/p0-map-viewport-1280.png` | 1280, map component | Tight map capture with attribution |
| `screenshots/live-map-complaint-1280.png` | 1280×800, coverage controls | Fresh live coverage-section inspection |
| `screenshots/live-map-complaint-map-1280.png` | 1280×800, map viewport | Blank basemap with markers and clusters floating on the bootstrap background |
| `screenshots/live-map-complaint-map-late-1280.png` | 1280×800, map after additional wait | Basemap still blank after six additional seconds |
| `screenshots/maptiler-fallback-1280.png` | 1280×800, map viewport | Honest missing-key fallback with the coverage directory retained |
| `screenshots/maptiler-map-1280.png` | 1280×560, successful MapTiler render | France, Corsica, water, borders, roads, cities, airport labels and neighbouring countries visible |
| `screenshots/maptiler-map-density-1280.png` | 1280×560, Paris cluster activated | Restrained dense-location control replaced by an accessible detail panel |
| `screenshots/maptiler-tablet-768-debug.png` | 768×560, successful MapTiler render | Tablet map with geographic labels, attribution and synchronized markers |
| `screenshots/maptiler-reduced-motion-1280.png` | 1280×560, reduced motion | Successful map render with static hero/marquee behavior and zero overflow |
| `screenshots/maptiler-fallback-1280-key-failure.png` | 1280×560, provider failure | Honest MapTiler error state with the complete directory retained |
| `screenshots/p0-mobile-menu-375.png` | 375×812, menu open | Focus-contained mobile navigation |
| `screenshots/p0-quote-handoff-1280.png` | 1280×800, step 4 | Honest prepared/email/reception handoff state |
| `screenshots/p1-hero-desktop-1280.png` | 1280×800 | Desktop hero with quote launcher fully visible |
| `screenshots/p1-homepage-desktop-1280.png` | 1280 full page | P1 desktop regression capture |
| `screenshots/p1-homepage-tablet-768.png` | 768 full page | P1 tablet regression capture |
| `screenshots/p1-homepage-mobile-375.png` | 375 full page | P1 mobile regression capture |
| `screenshots/p1-homepage-narrow-320.png` | 320 full page | P1 narrow-layout regression capture |
| `screenshots/p1-quote-handoff-1280.png` | 1280×800, step 4 | Fresh completed quote handoff capture |
| `screenshots/p1-reduced-motion-430.png` | 430, reduced motion | Static hero/marquee reduced-motion capture |
| `screenshots/runtime-p0-hydrated-desktop-1280.png` | 1280×800 | Runtime recovery baseline after hydration is restored |
| `screenshots/runtime-p2-after-desktop-1280.png` | 1280×800 | Focused motion-pass desktop result |
| `screenshots/runtime-p2-final-desktop-1280.png` | 1280×800 | Settled post-motion desktop hero and launcher |
| `screenshots/runtime-p2-after-interaction-desktop-1280.png` | 1280 full page | Desktop after interaction and scroll choreography |
| `screenshots/runtime-p2-dense-location-1280.png` | 1280×800 | Dense Paris detail panel and selected location |
| `screenshots/runtime-p2-quote-handoff-1280.png` | 1280×800, step 4 | Completed four-step quote handoff |
| `screenshots/runtime-p2-after-mobile-menu-375.png` | 375×812, menu open/closed test | Mobile menu interaction regression capture |
| `screenshots/runtime-p2-mobile-menu-open-375.png` | 375×812, menu open | Settled open mobile navigation state |
| `screenshots/runtime-p2-responsive-768.png` | 768 full page | Focused motion-pass tablet capture |
| `screenshots/runtime-p2-responsive-375.png` | 375 full page | Focused motion-pass mobile capture |
| `screenshots/runtime-p2-responsive-320.png` | 320 full page | Focused motion-pass narrow capture |
| `screenshots/runtime-p2-reduced-motion-375.png` | 375, reduced motion | Static hero and non-animated marquee result |
| `screenshots/page@7036514f417702f23d59c770bfcec123.webm` | 1280×800, short recording | Hero control, quote workspace and service-section transition sequence |

The browser's full-page stitching repeated sticky/animated regions. DOM inspection confirmed exactly one instance of every section, so those repetitions are capture artifacts rather than application duplication. Clean viewport captures and the project's earlier full-page captures were used for visual judgment.

## Review Scope and Verification Boundaries

The review covered the live homepage at desktop, tablet and mobile widths; the light-only visual system; hero sequence; service navigator; coverage map and directory; history and organisation sections; partner marquee; footer; mobile menu; quote workspace; focus entry; reduced-motion implementation; responsive overflow; relevant source code; and the current design brief.

Verified directly:

- desktop, tablet and 375/320 px mobile visual composition;
- zero horizontal page overflow at 1280, 768, 375 and 320 px;
- mobile menu open state and page scroll lock;
- quote workspace open state, initial focus on its close control and page scroll lock;
- reduced-motion behavior in source;
- hero controls, service interaction and partner animation behavior;
- the MapTiler missing-key fallback, visible attribution and preserved coverage directory;
- the 1280×800 first viewport with the quote launcher fully visible;
- 12 px minimum desktop navigation and OPS text;
- deterministic eager hero loading and conditional collapsed service-image mounting;
- restored coordinate provenance from the audited project pipeline;
- fresh P1 screenshots at 1280, 768, 375 and 320 px, plus quote handoff and reduced-motion states;
- React hydration at the unambiguous local URL `http://127.0.0.1:3000/`;
- visible state changes for header/footer quote actions, hero controls and automatic rotation, launcher validation, service tabs and quote buttons, coverage search/filter/location selection, map synchronization, dense-location detail, mobile menu, four-step quote flow, timeline progression and marquee pause/resume;
- mouse, touch-equivalent and keyboard activation paths for representative controls;
- authored section-entry choreography, directional service and quote transitions, scroll-linked history emphasis, navigation state movement and resumable partner motion;
- complete reduced-motion equivalents with a static first hero image, no marquee animation and zero overflow;
- runtime diagnostics with no console errors, page errors or non-mailto failed requests;
- the relevant component, style, data and brief source files;
- absence of the two browser image warnings described in the previous review.

Not fully verified, and therefore not claimed as passing:

- complete keyboard traversal and focus order through every homepage control;
- screen-reader announcements, accessible descriptions and dynamic-state feedback;
- 200% and 400% zoom/reflow behavior;
- mechanical color-contrast measurement for every text and interactive state;
- automated WCAG 2.2 audit, because the configured accessibility runner was unavailable;
- successful server-backed quote submission and recoverable server failure states, because this prototype intentionally retains a `mailto:` handoff;
- successful MapTiler style/tile rendering and visual proof of the geographic layer set, because the local key is absent;
- production map-provider reliability, licensing policy or service-level guarantees;
- operational correctness of all provisional coordinates.

The in-app Browser runtime was unavailable in this environment (`agent.browsers.list()` returned no sessions). The live URL was therefore exercised with the installed Playwright browser fallback; the limitation is recorded rather than treated as an in-app Browser pass.

This review does **not** establish WCAG 2.2 AA conformance.

## Score Breakdown

| Category | Score | Assessment |
| --- | ---: | --- |
| Visual hierarchy and art direction | 14/20 | The P1 desktop composition now keeps the image, headline and functional launcher in the 1280×800 first viewport; the original score is retained and P2 was not rescored. |
| Brand and aesthetic fidelity | 16/20 | Authentic logo, operational palette and supplied photography; substantially less generic than V2. |
| Responsive and mobile composition | 15/20 | Genuine recomposition and no horizontal overflow at 1280, 768, 375 and 320 px; the original score is retained and P2 was not rescored. |
| Interaction and component states | 12/20 | Original score retained; P0 quote handoff and dense-map interactions are now corrected, while P2 was not rescored. |
| Accessibility and technical integrity | 11/20 | Original score retained; P0 focus exposure, map positioning and P1 image loading are corrected, while full conformance remains unverified. |
| **Total** | **68/100** | **Promising working prototype; P2 and full accessibility approval remain open.** |

## P0 Correction Results

| P0 blocker | Status | Demonstrated evidence |
| --- | --- | --- |
| MapLibre geographic marker positioning | **Passed** | 29 real-coordinate marker elements use MapLibre `position: absolute`; Orly, Lyon and Brest transforms changed across five zoom levels in the local browser run. |
| Dense Paris and overlapping facilities | **Passed** | Two deliberate clusters are present at overview zoom. The Paris cluster is keyboard-activated, opens a six-item detail panel, moves focus to its heading and reveals individual markers at detail zoom; Bâle/Mulhouse has its own two-item cluster. |
| Always-on OSM raster fallback | **Passed (provider migration)** | Raster fallback code and `tile.openstreetmap.org` source are removed. The former OpenFreeMap path is also removed; the current map requests only the configured MapTiler vector style. |
| Closed/desktop mobile navigation exposure | **Passed** | At 1280 px the mobile navigation is `hidden`, `aria-hidden="true"`, `display: none` and absent from the accessibility snapshot. At 768/375 px open-state Tab remains contained, Escape returns focus to the menu button, and scroll lock releases. |
| Honest quote handoff | **Passed** | The workspace now exposes four steps. Validated data reaches step 4, which distinguishes “Demande préparée”, “E-mail envoyé — Non vérifiable ici” and “Réception par l’équipe — Non vérifiable ici”; no delivery claim is made. |

These passes are limited to the evidence above. Automated WCAG scanning remains unavailable because no Chrome/Chromium binary is installed in the environment; P2 items remain deferred.

## P1 Presentation Readiness Results

| P1 item | Status | Demonstrated evidence |
| --- | --- | --- |
| Desktop first-viewport composition | **Passed** | At 1280×800, the hero occupies `78–799px` and the quote launcher occupies `674–799px`; the launcher is fully visible without removing the hero image or headline hierarchy. |
| Essential navigation and OPS type floor | **Passed** | Local browser inspection reports `12px` for desktop navigation, OPS availability text and the compact OPS label. |
| Next.js hero and service image warnings | **Passed** | The active hero sequence uses deterministic eager loading with the first image at high fetch priority. Collapsed service panels do not mount their `fill` image. Final browser diagnostics reported `imageWarnings: []`, no page errors and no non-mailto failed requests. |
| Per-location coordinate provenance | **Passed with explicit provisional records** | The 29 records were restored from the audited project pipeline in commit `22c21eb`: 19 airport records retain the pinned OurAirports CSV checksum and ICAO derivation; 10 manual/interpreted records remain explicitly provisional. No new source or confirmation was invented. |
| Footer prototype copy | **Passed** | “Document de travail V3” is absent from the rendered footer and source footer composition. |
| V2/V3 hero brief contradiction | **Passed** | The old “hero is not a carousel” sentence is marked superseded in `DESIGN_BRIEF.md` by the approved V3 controlled supplied-image sequence. |

These P1 passes preserve the completed P0 behavior and the existing art direction. The score above is intentionally not re-rated because P2 items were not implemented.

## Runtime Interaction Re-audit — 1 September 2026

**Passed after correction.** The runtime defect was caused by the Aéroports Services development server being bound broadly to port 3000 while the unrelated Café Lounge project owned the IPv6 `localhost:3000` binding. Next.js consequently blocked client chunks requested from the reviewed `127.0.0.1` origin.

The Aéroports Services `dev` and `dev:review` commands now bind explicitly to `127.0.0.1:3000`, and `next.config.ts` allowlists `127.0.0.1` for development resources. Café Lounge was not stopped or modified. The Aéroports server was restarted cleanly and prints:

`Local: http://127.0.0.1:3000`

Fresh live verification at that URL proved hydration and visible state changes rather than DOM presence alone:

- header and footer quote buttons opened the quote workspace;
- hero touch-equivalent, keyboard and next/previous controls changed the active image; automatic rotation advanced from slide 1 to slide 2 after the six-second interval; pause feedback changed the control label/state;
- empty quote-launcher submission exposed three inline errors and focused the first invalid field;
- service mouse selection changed the selected tab and panel, keyboard ArrowDown moved the tab focus, and the service quote button opened the workspace;
- coverage search narrowed the directory to Orly, the rail filter showed six locations, and Lyon selection updated the directory, map toolbar, selected marker and provenance popup;
- the Paris dense cluster opened a six-location detail panel and selecting Gare du Nord synchronized the directory and popup;
- the mobile menu opened via touch-equivalent activation, contained Tab focus, locked scroll and returned focus on Escape;
- the complete four-step quote flow reached “Transmission à vérifier” with `Confirmée par le site` for preparation and `Non vérifiable ici` for sending/reception;
- the history progress moved from `0%` to `100%` during scroll and the active year changed;
- the partner marquee entered, paused on hover/focus and resumed after pointer exit;
- no console errors, page errors or non-mailto request failures were recorded.

The focused interaction/motion pass was run after runtime recovery. The earlier inert-control screenshots remain historical evidence of the defect; the fresh passing captures are listed above.

## Focused Interaction and Motion Pass — 1 September 2026

This was an interaction/motion pass only. Structural P2 refactoring and deployment were not performed.

- Section entries now use one native IntersectionObserver and shared motion tokens. Direction follows the composition: left/right reveal, clipped rail, image-side reveal and vertical timeline progression are used where they explain the section’s reading order.
- The hero keeps one controlled copy entrance, restrained crossfade/scale choreography and visible control feedback. Manual image selection still stops automatic rotation; reduced motion holds the first image while preserving manual controls.
- Service changes retain spatial continuity with forward/back panel motion and matching image reveals. Quote steps use the same directional language when moving through the workspace.
- Header scroll treatment, active navigation underline movement and selected map/directory states provide cause-and-effect feedback without decorative bouncing or glow effects.
- The partner line pauses without losing its animation position on hover/focus and resumes when released. The marquee remains static and wrapping under reduced motion.
- Every tested breakpoint remained at zero horizontal overflow after motion was enabled: 1280, 768, 375 and 320 px.
- The reduced-motion run kept the hero on slide 1 after 6.5 seconds, reported a `0.00001s` transition duration and no partner animation.

## MapTiler Basemap Re-audit — 1 September 2026

**Passed in the normal browser; Codex in-app Browser unavailable.** The former OpenFreeMap style and raster-fallback path are removed. The map now uses MapLibre with the MapTiler `streets-v4-pastel` vector style URL and reads the public credential only from `NEXT_PUBLIC_MAPTILER_KEY` in the ignored local environment file.

The component validates the fetched style and its MapTiler vector TileJSON before applying it, requiring water/coastline, national-boundary, road, place-label and airport layer families. The same-origin MapLibre worker and shared module are served from `public/` so Next/Turbopack and Netlify do not resolve the worker to the document root. MapLibre marker and dense-control elements are created hidden, then exposed only after the intended style reaches `style.load`, the geographic layer check passes, and the map is idle with tiles loaded. A bootstrap background can no longer report the map as ready. Cluster controls are 48px restrained operational buttons; activating a cluster closes any location popup before opening the accessible detail panel.

In the normal Playwright browser, the successful style, TileJSON, sprite, font and vector-tile requests returned successfully; the map reached ready state and the captured render visibly includes French land, Corsica, coastlines, water, national borders, major roads, cities, airport labels and neighbouring countries. All 29 real-coordinate marker elements remain present, with 21 visible overview markers plus the Paris and Bâle/Mulhouse dense controls. Lyon directory selection updated the toolbar, popup and selected marker; keyboard activation of the Paris cluster opened its six-location detail panel, moved focus to the panel heading, removed the popup and revealed individual markers at detail zoom.

The success smoke run covered 1280, 768, 375 and 320px viewports with zero horizontal overflow and no page/console errors. The 768/375/320 map runs opened through the structured directory control and rendered the same vector geography, markers and attribution. Reduced motion kept the first hero image static, disabled the partner animation, preserved the map and reported zero overflow. A forced provider failure rendered the honest accessible MapTiler error state, retained the directory, and did not load an OSM raster fallback; `screenshots/maptiler-fallback-1280-key-failure.png` records that state. The existing P0 browser evidence remains the regression reference for filters and the full coordinate data; this provider pass does not alter that data or interaction model.

`npm run lint` and `npm run build` both pass after the migration. A local `next start` smoke run on port 3001 also reached ready state with the same 29 markers, zero overflow, no errors and the worker served from `/maplibre-gl-worker.mjs`; that temporary production server was stopped after verification. The Aéroports Services development server remains available at `http://127.0.0.1:3000/`; the unrelated Café Lounge listener was not stopped or modified.

The in-app Browser remained unavailable (`agent.browsers.list()` returned no sessions), so the Codex-browser visual check could not be completed. MapTiler plan, domain restrictions, attribution, usage limits and production hosting requirements remain operational review items. Netlify must provide `NEXT_PUBLIC_MAPTILER_KEY` as a site environment variable at build/runtime; the key is not in source control.

## Summary

V3 is a material improvement over the 46/100 transfer. The P0, P1 and runtime interaction passes preserve its credible operational voice, authentic logo, supplied imagery, responsive recomposition, locally verified MapTiler geographic map path and restrained motion system while repairing geographic marker positioning, dense-location access, navigation isolation, quote handoff, first-viewport density, image loading, provenance traceability and client hydration.

The client-hydration defect and primary control interactions are corrected at the explicit local URL. The MapTiler geographic layer render is verified in a normal browser with the supplied local environment key, while the in-app-browser and deployed Netlify render remain unverified in this environment.

## Must Fix

1. **Repeat the success-path visual check in the in-app Browser and on the deployed host when deployment is authorized.** The normal-browser MapTiler render is demonstrated locally; the remaining check is environment coverage, not an unimplemented map path.

## Should Fix

1. **P2 maintainability:** `site-shell.tsx` still centralizes the page regions and interactive flows. Extract substantial regions before another large feature round, while preserving behavior.

2. **P2 visual polish:** Continue tuning the desktop hero and coverage split after a dedicated review; this pass only made the approved 1280×800 launcher requirement demonstrably pass.

3. **Full accessibility and operational validation:** Complete 200%/400% zoom, screen-reader announcements, mechanical contrast checks, automated WCAG scanning and operational review of provisional coordinates before production approval.

## Could Improve

1. If another polish round is approved, continue tuning headline scale and documentary-image breathing room without regressing the demonstrated first-viewport launcher.
2. The coverage directory is visually clear but tall. Consider a wider desktop directory/map split so users can see both text selection and its map consequence without scrolling through the entire list first.
3. Preserve the restrained amber usage. The current operational rule accents are effective; do not expand amber into decorative glows or generic status dots.
4. Refine the already restrained active-state transitions between directory and map selection as a P2 polish item. Motion should communicate selection and orientation rather than decorate every element.

## Checklist Closure

| Review dimension | Status | Conclusion |
| --- | --- | --- |
| Visual hierarchy | **Pass for P1** | Strong section structure and proof hierarchy; the quote launcher is fully visible in the 1280×800 first viewport while the image and headline remain present. |
| Consistency | **Pass with corrections** | Palette, spacing language, imagery and squared operational geometry are coherent; footer prototype copy is removed and essential header labels now meet the 12 px floor. |
| Aesthetic fidelity | **Pass with caveat** | The result reads as operational aviation with human reassurance and avoids the earlier generic luxury treatment; the giant hero is the remaining anti-reference. |
| Component quality | **Mixed** | Quote workspace, service navigator and mobile menu are visually composed; `site-shell.tsx` remains over-centralized as a P2 maintainability item. |
| States and interactions | **Pass locally with explicit prototype boundary** | The reviewed `127.0.0.1:3000` page hydrates and all requested primary controls produced visible state changes through mouse, touch-equivalent and keyboard paths; quote handoff remains an intentional mailto prototype. |
| Responsive behavior | **Pass for P0/P1** | Desktop/tablet/mobile recompose with zero overflow at 1280, 768, 375 and 320 px; P2 polish remains open. |
| Accessibility | **P0 corrected; not fully approved** | Closed navigation isolation, focus containment/return and keyboard dense-map access are demonstrated; zoom, contrast, screen-reader output and automated WCAG validation remain incomplete. |
| Typography | **Pass for P1 floor** | Humanist sans direction and hierarchy remain intact; essential navigation and OPS text are now at least 12 px and the desktop hero is tightened for first-viewport density. |
| Theme handling | **Pass** | Light-only direction is consistently implemented; no unintended dark-mode branch was observed. |
| Mobile-first composition | **Pass** | Content genuinely recomposes, controls are generally touch-friendly, no overflow was found at the requested widths, and closed mobile controls are removed from interaction. |

## What Works Well

- The archived logo is used clearly without a reconstructed lockup.
- The light-only navy/blue/mineral palette feels operational and consistent.
- Desktop, tablet and mobile genuinely recompose; live inspection found zero horizontal overflow at 375 px.
- The mobile menu is clear, full-width and touch-friendly, with prominent OPS and quote actions.
- The quote workspace is the strongest interactive component: it is visually composed, uses persistent labels, opens as a focused side task, locks page scrolling, and correctly moves initial focus to the close control.
- Service presentation is substantially less generic and uses the supplied imagery effectively.
- The history, human-operations section, partner marquee and footer now belong to one visual language.
- Reduced-motion CSS removes animation duration and makes the partner list static/wrapping.
- The 1280×800 hero keeps the quote launcher visible without weakening the supplied image sequence or stable headline hierarchy.
- Coordinate records are traceable to the audited project data, with unresolved records explicitly marked provisional rather than presented as confirmed.
- No dark-mode regression, reconstructed logo, glassmorphism, gradient blob, fake pagination or glowing yellow marker field was observed.

## Implementation Priority

### P0 — Approval Blockers (current status)

1. **Passed:** Repair MapLibre marker positioning and dense-location interaction.
2. **Passed:** Remove the always-on public OSM layer.
3. **Passed:** Make the closed/desktop mobile navigation non-interactive and absent from the accessibility tree.
4. **Passed:** Align the quote implementation and brief around an honest submission/confirmation contract.
5. **Passed:** Restore hydration at the explicit review URL and re-demonstrate every primary interaction.
6. **Passed in normal browser; in-app Browser pending:** The MapTiler vector path, geographic layer render and explicit failure state are demonstrated locally with the supplied key; the in-app browser remains unavailable.

### P1 — Presentation Readiness (resolved in this pass)

1. **Passed:** Keep the quote launcher visible in the 1280×800 first viewport.
2. **Passed:** Correct essential type sizes and both image warnings.
3. **Passed with provisional records:** Restore defensible coordinate provenance from the existing audited project data.
4. **Passed:** Remove internal footer copy and resolve the carousel contradiction in the brief.

### P2 — Maintainability and Polish

1. Extract major page regions from `site-shell.tsx`.
2. Rebalance the desktop hero and coverage split.
3. Refine selection motion only after the interaction model is correct.

## Approval Gate

Primary controls are hydrated and the MapTiler success path is demonstrated in the normal browser. Remaining approval requires:

1. **Demonstrated in the normal browser:** a real visible France basemap with land, water, boundaries, roads and labels;
2. **Demonstrated:** an honest accessible failure state when MapTiler is not configured;
3. P2 extraction of the monolithic page component and deeper visual polish;
4. 200%/400% zoom and full screen-reader verification;
5. automated accessibility scan when the required browser is available;
6. operational review of the ten provisional coordinates and production map-provider reliability/licensing policy.

Until the in-app Browser and deployed hosting environment are checked, this build should be described as an **interactive local V3 interface with a locally verified MapTiler coverage map**, not a fully production-approved map integration.
