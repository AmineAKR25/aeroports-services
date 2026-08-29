# Design Review: Aéroports Services Homepage

Reviewed against: the user-supplied direction, the preserved original-site archive, the live transferred redesign, and the interaction/responsiveness standard set by [VIP Chauffeur](https://www.my-vip-chauffeur.com/).

Reference sources:

- `reference/original-aeroports-services/README.md`
- `reference/original-aeroports-services/CONTENT_INDEX.md`
- `reference/original-aeroports-services/inventory/CONTENT_REPORT.md`

Review date: 2026-08-29  
Application reviewed: `http://localhost:3000/`  
Viewport coverage: desktop 1280×800, tablet 768×1024, mobile 375×812, each in light and dark mode  
Capture method: installed local Brave/Chromium via CDP, using the authorized `design-review` fallback; no dependencies were installed.

## Verdict

**46/100.**

This is visually competent in light mode at desktop width, but it does not yet feel like a distinctive, credible French airport-operations company. It feels like an editorial luxury template applied to aviation content. The strongest business proof is understated or absent, the design language is familiar from AI-generated premium landing pages, responsive behavior breaks at 375 px, and dark mode has severe contrast failures.

The user’s 30/100 assessment is directionally justified: the gap is not primarily polish. The brand proposition, typography, hero, service model, proof hierarchy, responsive composition, and dark-theme logic need a coordinated redesign.

## Score Breakdown

| Category | Score | Assessment |
| --- | ---: | --- |
| Art direction and distinctiveness | 6/20 | Polished but strongly resembles a generic editorial/premium landing-page system. |
| Brand identity and original-content fidelity | 11/20 | Real photography, history, map, contacts, and partner material are present; the rendered lockup is not the archived master, and important source-of-truth claims are missing. |
| Operational credibility and conversion | 6/15 | Service categories and OPS phone are useful, but credentials, 24/7/365 proof, process, and a genuine quotation path are absent. |
| Typography, hierarchy, and composition | 10/15 | Strong desktop drama and rhythm; excessive display typography, tiny utility copy, and broken mobile/tablet heading composition reduce clarity. |
| Imagery, shapes, cards, map, and decoration | 6/10 | Authentic assets help, but their treatment is generic or inconsistent; the map and logo wall feel pasted into a template. |
| Responsive and mobile behavior | 3/10 | Tablet is mostly stable, but the services intro collapses into a narrow column; mobile has 19 px horizontal overflow and clipped headings. |
| Interaction and animation | 3/5 | Menu, theme toggle, focus ring, and reveal mechanics work; motion is repetitive and several visuals imply interactions that do not exist. |
| Dark mode and accessibility | 1/5 | Semantic structure is good, but core dark-mode bands fail contrast catastrophically. |
| **Total** | **46/100** | **Redesign the system; do not optimize the current art direction in place.** |

## Screenshots Captured

| Screenshot | Breakpoint/state | What it demonstrates |
| --- | --- | --- |
| [`screenshots/review-homepage-desktop-1280.png`](screenshots/review-homepage-desktop-1280.png) | Desktop, light, 1280×800 | Full-page hierarchy, section rhythm, service grid, map, partners, and contact. |
| [`screenshots/review-homepage-tablet-768.png`](screenshots/review-homepage-tablet-768.png) | Tablet, light, 768×1024 | Mobile header, two-column service cards, and malformed services-heading note placement. |
| [`screenshots/review-homepage-mobile-375.png`](screenshots/review-homepage-mobile-375.png) | Mobile, light, 375×812 | Full-page mobile reflow, 19 px document overflow, clipped partners headline, and long card stack. |
| [`screenshots/review-homepage-dark-mode-desktop-1280.png`](screenshots/review-homepage-dark-mode-desktop-1280.png) | Desktop, dark, 1280×800 | Dark token application and low-contrast cyan coverage/contact bands. |
| [`screenshots/review-homepage-dark-mode-tablet-768.png`](screenshots/review-homepage-dark-mode-tablet-768.png) | Tablet, dark, 768×1024 | Dark-mode contrast failure and tablet composition. |
| [`screenshots/review-homepage-dark-mode-mobile-375.png`](screenshots/review-homepage-dark-mode-mobile-375.png) | Mobile, dark, 375×812 | Dark contrast failure, headline clipping, and mobile section length. |
| [`screenshots/review-homepage-desktop-service-hover.png`](screenshots/review-homepage-desktop-service-hover.png) | Desktop service-card hover | The functional but generic tint/border/translate response. |
| [`screenshots/review-homepage-desktop-focus.png`](screenshots/review-homepage-desktop-focus.png) | Desktop keyboard focus | Visible amber focus treatment on the header CTA. |
| [`screenshots/review-homepage-mobile-menu-375.png`](screenshots/review-homepage-mobile-menu-375.png) | Mobile menu open, light | Clear menu hierarchy and adequate targets. |
| [`screenshots/review-homepage-dark-mode-mobile-menu-375.png`](screenshots/review-homepage-dark-mode-mobile-menu-375.png) | Mobile menu open, dark | Correct menu state, but a low-contrast cyan primary action. |

The small circular “N” in the lower-left of some captures is the Next.js development indicator, not part of the product, and is excluded from the score.

## Evidence Summary

- All required images loaded in the corrected capture pass.
- All reveal items were exercised and visible before each full-page capture.
- Desktop and tablet produced no horizontal document overflow.
- At a 375 px viewport, `documentElement.scrollWidth` is 394 px: **19 px of overflow**.
- The overflow is caused by the mobile two-column `.section-heading` primitive. Its 90 px label column and 26 px gap leave only 219 px for headings. `#partners-title` needs 258 px and `#services-title` needs 231 px, so both overrun the viewport.
- In dark mode, white on the remapped `--blue-deep: #b9e7f8` measures only **1.33:1**; the 76%-opacity body text composites to approximately **1.24:1**. White on the dark-theme CTA blue `#55b9e5` measures **2.22:1**.

## 1. What Makes It Look AI-Generated or Generic

1. **A recognizable premium-template sequence.** The page follows a highly familiar pattern: full-bleed photographic hero, oversized serif slogan, dual CTA, statistics strip, origin story, split image/text band, four service cards, map card on a color band, logo wall, contact band, multi-column footer. The sequence is orderly but interchangeable with hospitality, consultancy, or chauffeur brands.

2. **The Cormorant-plus-Montserrat formula.** Giant high-contrast serif headlines paired with tiny, widely tracked uppercase sans text are now a default “premium” generator aesthetic. It signals editorial luxury more strongly than airport operations.

3. **Decorative numbering without information value.** The repeated `00`–`06` labels make every section look like the same template module. The hero’s `01 / 04` suggests a carousel or sequence that does not exist (`site-shell.tsx:284-287`).

4. **Generic aspirational copy replacing specific proof.** “La maîtrise du passage,” “Une chaîne de service qui reste en mouvement,” “La France comme terrain d’action,” and “Des interlocuteurs qui connaissent le terrain” are polished but nonspecific. They delay the concrete reasons to trust this operator.

5. **Inert plus icons.** Each service card carries a plus sign but is an unclickable `<article>` with no expandable detail (`site-shell.tsx:367-373`). This is a familiar generated-card affordance with no behavioral meaning.

6. **Decoration that implies a system without embodying one.** The hero grid, thin rules, indices, amber dots, and repeated line icons create atmosphere, but no real operational grammar—airport codes, status, dispatch, handoff stages, service-level proof, or accreditation—emerges from them.

## 2. What Weakens the Brand Identity

1. **The displayed logo is not the archived source-of-truth file.** The reference archive explicitly requires the original logo and forbids a substitute lockup. The component renders `logo-aeroport.png` / `logo-aeroport-dark.png` at 799×312 (`site-shell.tsx:155-165`), while the byte-identical archived master is `public/assets/logo-aeroports-sevices.png` at 184×72. Even if the reconstructed lockup looks cleaner, it needs explicit brand approval.

2. **The visual tone is boutique-luxury, not premium operations.** The serif, cinematic silhouette hero, poetic language, and generous whitespace communicate lounge, concierge, hotel, or chauffeur service. Aéroports Services needs calm authority, response readiness, procedural control, human competence, and national coverage.

3. **The authentic blue is present but not owned.** Blue and amber are coherent, yet the layout offers no distinctive branded behavior or motif. Amber is used as a generic luxury accent rather than as a narrowly defined operational state.

4. **The most credible source content is missing or demoted.** The preserved site contains “Premier Réseau Français d’Assistance aux passagers,” 24h/24 and 7j/7 all year, DGAC authorization, airport-manager authorizations, reserved-zone access, qualified personnel, and explicit process capabilities. The redesign keeps history and broad service categories but omits most of this trust architecture.

5. **The CTA promise is incomplete.** “Demander un devis” repeatedly jumps to a contact section whose only action is a `mailto:` link (`site-shell.tsx:423-435`). The original site had a request/reservation flow and specific sub-24-hour instructions. For an operational buyer, this feels like a brochure, not a service interface.

6. **Claims and partner marks are undated.** The four statistics are inherited from historical content but shown as current facts (`site-shell.tsx:28-33`). The archive itself says potentially stale facts and partners should be verified. Add dates/source context or obtain owner confirmation before presenting them as live proof.

## 3. Typography, Composition, Spacing, and Hierarchy

### Typography

- Desktop headline craft is strong: the hero has immediate impact and the display face is well rendered.
- The display face is overused. Nearly every major heading becomes a luxury-editorial poster, so none of the sections gains a distinct informational role.
- Heading tracking of `-0.045em` and line-height `0.9` (`globals.css:388-401`) is dramatic but fragile, particularly with long French words.
- Navigation, labels, captions, card bullets, and footer copy frequently sit at 10–12 px (`globals.css:177-184`, `832-838`, `937-943`, `1164-1173`). This is visually delicate rather than operationally legible.
- The body copy is often 14–15 px even on mobile. A premium service should not require reduced text size to look refined.
- The remote Google Fonts `@import` at `globals.css:1` makes the core layout depend on a third-party stylesheet; fallback metrics materially change this composition.

### Composition and spacing

- Desktop composition is disciplined: the group copy/timeline offset, the culture split, and the 2×2 services grid create credible pacing.
- The page is too long for its information density: approximately 8,334 px at desktop and 10,619 px at mobile. Service cards alone occupy about 2,282 px on mobile.
- The same indexed heading pattern is repeated even when content demands a different structure. Consistency becomes sameness.
- At tablet and mobile, `.section-heading` remains a 90 px + 1fr grid (`globals.css:589-593`). The third services-note paragraph falls into a 90 px column, producing an almost word-by-word vertical strip visible in the tablet and mobile captures.
- At 375 px, the same primitive clips the partners heading and creates 19 px of page overflow.
- At the 960 px navigation breakpoint, the full desktop header appears abruptly. The 46 px theme target shrinks to about 32 px to make everything fit, below the intended 44 px minimum, while it remains 46 px at 959 px.

## 4. Shapes, Cards, Gradients, Maps, and Decorative Visuals

1. **What works:** square geometry, restrained shadows, thin rules, and avoidance of glassmorphism or pill-heavy UI are good choices. The page is cleaner than the average generated landing page.

2. **Hero treatment:** the dark overlay is functional, but the grid and `01 / 04` layer turn authentic airport photography into a generic cinematic hero. The photograph shows an airport mood more than the company’s staff or service.

3. **Service cards:** the flat 2×2 grid is readable on desktop, but it is a generic capability-card solution. The plus icon is misleading, every card receives the same weight, and mobile becomes a very long undifferentiated stack.

4. **Coverage map:** using the original map preserves provenance, but placing the low-resolution legacy artwork inside a white “map card” makes it look like an old brochure pasted into a modern theme. In dark mode its labels use pale cyan on white and nearly disappear.

5. **Partner wall:** the authentic marks help credibility, but rigid white boxes expose inconsistent source dimensions and optical sizes. Two-column mobile groups leave a single orphan card on the last row. The section needs curation and verified partner status, not more box styling.

6. **Gradients:** the page avoids decorative gradient blobs, which is worth preserving. The only major gradient—the hero legibility overlay—has a clear functional purpose.

## 5. Animation and Interaction

### Weak or excessive

- Almost every animated element uses the same opacity-plus-22-pixel reveal for 700 ms (`globals.css:1191-1212`). The repeated preset feels generated and does not help explain the service.
- Staggers are limited to 80/150/220 ms. They produce polish, not narrative or operational confidence.
- Card and partner hover behavior is only tint/border/translate (`globals.css:783-795`, `986-1001`). It is functional but generic.
- Theme changes are abrupt across large surfaces; there is no considered theme transition.
- `01 / 04` and service plus icons imply richer interactions than the implementation provides.

### Worth preserving

- The mobile menu’s 280 ms grid-row transition is controlled and clear.
- Focus indication is visible and consistent in the captured CTA state.
- `prefers-reduced-motion` is explicitly handled (`globals.css:1389-1407`).
- The theme preference persists and is set before the app renders (`layout.tsx:10-17`), which avoids a major flash.

### Compared with VIP Chauffeur

VIP Chauffeur uses motion to recompose the experience: section-specific transitions, dimensional media behavior, persistent contact/booking access, and confident mobile adaptation. This page animates components after they enter the viewport but does not change the information model. The benchmark lesson is not “add more animation”; it is to give motion a job—show handoffs, reveal operational coverage, maintain contact access, and make service selection feel responsive.

## 6. Mobile and Responsive Problems

1. **Must fix: 375 px overflow and clipping.** The page is 394 px wide inside a 375 px viewport. The partners headline visibly clips on the right. Root cause: fixed 90 px section-label column, 26 px gap, and large unbreakable serif words.

2. **Must fix: services note placement.** At both 768 px and 375 px the supporting paragraph is auto-placed into the first 90 px grid column. It appears as a thin vertical ribbon unrelated to the heading.

3. **Breakpoint discontinuity at 960 px.** The layout jumps from a compact menu to the complete desktop header. At exactly 960 px, flex shrink reduces the theme button to about 32 px.

4. **Mobile is mostly a shrink/stack strategy.** The hero, stats, timeline, cards, map, logos, contact details, and footer are all serialized. The information priority does not change for an on-the-go user.

5. **Mobile page length is excessive.** The 10,619 px document makes the contact outcome expensive to reach despite the sticky header.

6. **Typography becomes poster-like rather than readable.** Large serif headlines occupy narrow 219 px columns and force awkward line breaks. Several utility labels remain 10–12 px.

7. **The menu itself is a relative success.** Its open state is legible, targets are at least 50 px tall, controls are labelled, and light/dark variants are coherent apart from the dark CTA contrast.

## 7. What Should Be Preserved

Preserve the following as inputs, not necessarily as finished modules:

- The authentic historical content: founding names, company lineage, dates, service categories, locations, contacts, and “Chaque jour, chaque nuit” language.
- The original airport photography and coverage material, with better selection and treatment.
- The core Aéroports blue and limited amber signal color, after verifying exact approved brand values.
- The square, disciplined geometry and lack of glass, blobs, gratuitous rounded cards, or decorative gradients.
- The history timeline as a content model.
- The grouping of services into four recognizable business families.
- The mobile menu mechanism, accessible labels, semantic landmarks, meaningful image alt text, skip link, focus treatment, and reduced-motion support.
- The persistent OPS phone cue, but give it more operational meaning and mobile prominence.
- The implementation’s simple data-driven content arrays and semantic section structure.

Do **not** automatically preserve the current reconstructed logo files; preserve the authentic logo asset and obtain an approved high-resolution/dark variant.

## 8. What Requires Complete Redesign

These areas should not receive incremental polish first:

1. **Overall art direction.** Move from “luxury editorial landing page” to “premium French airport operations”: precise, calm, human, procedural, nationally connected, and credible under pressure.

2. **Hero and proof hierarchy.** Replace the cinematic slogan-first hero with a business proposition, qualification proof, 24/7 availability, coverage, and a real operational CTA. Remove fake `01 / 04` unless a genuine, controllable sequence is built.

3. **Typography system.** Rebuild the type hierarchy around legibility and authority. Limit any serif to a restrained brand moment—or remove it—rather than making every section a fashion spread.

4. **Responsive section-heading primitive.** Mobile and tablet need a true single-column or deliberately re-authored composition. This is not a one-off `overflow: hidden` fix.

5. **Service presentation.** Replace inert capability cards with an operational service model: passenger stage, responsible team, deliverables, response conditions, and an actual path to request that service.

6. **Conversion flow.** “Demander un devis” needs a real request path—at minimum service, airport/station, date/time, passenger/group context, and urgency—with explicit phone instructions for urgent requests.

7. **Coverage visualization.** Rebuild the map/presence experience from verified location data. Keep the archived map as evidence, not the final interface.

8. **Dark mode.** Either remove it from scope or rebuild its semantic tokens. The current inversion makes the most important conversion/proof bands unreadable.

9. **Motion language.** Replace the global reveal preset with a small purposeful system tied to navigation, service selection, coverage, and operational handoffs.

## Prioritized Redesign Brief

### Objective

Create a premium French operational-services homepage that feels trustworthy to airlines, brokers, agencies, group organizers, and airport stakeholders within seconds. Premium should mean control, readiness, precision, and human competence—not generic luxury.

### Audience and primary decisions

The page should help a professional buyer answer, in this order:

1. Can this company cover my airport/station and operating window?
2. Is it authorized, experienced, and equipped to handle irregular operations?
3. Which service matches my need?
4. How quickly can I reach OPS or request a quote?
5. What evidence supports the claims?

### P0 — Establish the right direction before visual production

1. **Approve an art-direction statement:** “French aviation operations desk with documentary warmth.” Reference airport wayfinding, dispatch documents, operational timetables, French infrastructure graphics, and real field teams. Exclude boutique-hotel, limousine, fashion-editorial, and generic SaaS landing-page cues.

2. **Run a brand/source-of-truth pass:** use the exact approved logo master; verify color values, current statistics, partner relationships, locations, phone numbers, DGAC wording, authorizations, and 24/7 claims. Date quantitative proof.

3. **Define the conversion model:** urgent OPS call, standard quote request, and service exploration must be separate actions with clear expectations.

4. **Decide whether dark mode has a user need.** If not, remove it. If retained, build a semantic dark palette with tested contrast rather than swapping deep blue for pale cyan.

### P1 — Redesign the core experience

1. **Hero:** approved logo, specific proposition (“Premier réseau…” only if verified), service coverage, 24/7 status, DGAC/authorization proof, one primary quote action, one urgent OPS action, and authentic people-at-work photography. No fake carousel index.

2. **Proof strip:** replace generic oversized stats with dated, attributable proof and operational credentials. Make authorizations and availability at least as visible as historical volume.

3. **Services:** organize by user need and journey. Each service should expose scope, typical requester, deliverables, and a request action. On mobile, use progressive disclosure only if controls truly expand.

4. **Coverage:** build a precise responsive network view with airport/station names or codes, region grouping, and an accessible text equivalent. Avoid a decorative “map card.”

5. **People and process:** use real team imagery and a concise handoff/process narrative to substantiate “100% issu du milieu aérien,” multilingual capacity, real-time information, and irregularity handling.

6. **Partners:** verify, normalize optically, and contextualize the marks. Avoid generic white-card tiling and mobile orphan rows.

7. **Quote/contact:** create a credible request panel or flow, retain the visible OPS phone, and include urgent-request guidance from the original conditions where still valid.

### P1 — Responsive and type-system requirements

- Design at 375 px first; no fixed side-label column below tablet landscape.
- No horizontal overflow at 320–430 px.
- Body text should default to at least 16 px on mobile; labels should not carry essential content at 10 px.
- Build explicit header states for compact mobile, tablet, intermediate desktop, and wide desktop. Never allow controls to flex below 44×44 px.
- Recompose, do not merely stack: prioritize urgent contact, services, coverage, and proof earlier on mobile.
- Set practical French-language line lengths and test long words such as “interlocuteurs,” “aéroportuaire,” and “représentation.”

### P2 — Motion and interaction

- Keep the clear mobile-menu transition, focus treatment, persisted theme preference (if retained), and reduced-motion behavior.
- Use section-specific motion sparingly: service-stage progression, network activation, and operational handoff are appropriate; repeated fade-up is not.
- Every plus, chevron, counter, or pagination marker must correspond to a real interaction.
- Borrow VIP Chauffeur’s confidence in persistent contact and responsive re-composition, not its chauffeur/luxury styling.

### Success criteria for the next review

- The first viewport communicates operator, coverage, availability, credential, and action without relying on poetic interpretation.
- The exact approved Aéroports Services identity is visible and unmodified.
- A professional buyer can select a service and start a meaningful quote request.
- Light and dark (if retained) meet WCAG AA for all essential text and controls.
- Desktop, tablet, 375 px mobile, and the 960 px transition range show no clipping, accidental narrow columns, or undersized controls.
- Motion clarifies service or navigation state and remains fully usable with reduced motion.
- The result cannot be mistaken for a chauffeur, hotel, consultancy, or generic AI-generated premium landing page.

## Must Fix Before Any Polish Pass

1. Dark-mode coverage/contact contrast.
2. 375 px overflow and clipped partners/services headings.
3. Tablet/mobile services-note grid placement.
4. Authentic/approved logo usage.
5. Real quote conversion path and operational proof hierarchy.
6. Misleading `01 / 04` and inert plus affordances.

## What Works Well

The light desktop view has disciplined alignment, a compelling first impression, good use of genuine source photography, a readable company-history structure, clear service grouping, and consistent square geometry. The semantic implementation is stronger than the aesthetic verdict: landmarks, heading labels, alt text, mobile navigation state, theme labels, keyboard focus, skip navigation, and reduced-motion support are already present. Those foundations should be carried into the redesign rather than discarded.
