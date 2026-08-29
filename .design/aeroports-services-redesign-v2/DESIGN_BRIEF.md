# Design Brief: Aéroports Services Homepage Redesign V2

Status: approved V2 direction with V3 refinement amendment, implementation in progress  
Date: 2026-08-29  
Basis: accepted `DESIGN_REVIEW.md`, corrected responsive screenshots, preserved original-site archive, and a ten-question art-direction interview

## Problem

A professional arranging airport assistance needs to establish competence quickly: whether Aéroports Services covers the required location and operating window, whether the company is authorized and experienced, which service applies, and how to reach OPS or submit a complete request.

The current homepage makes that work too hard. It presents authentic content through a generic luxury-editorial landing-page system. Poetic headings, decorative numbering, passive cards, repeated reveal animations, and atmospheric treatment overpower operational evidence. The quote promise resolves to basic contact rather than a credible journey. Mobile mostly stacks the desktop composition, produces overflow, and delays high-value actions. Dark mode damages legibility instead of adding useful atmosphere.

The human friction is uncertainty: “Can this team handle my operation, and can I act now?”

## Solution

Create a light-only, highly responsive homepage that behaves like a calm French aviation operations service—not a brochure and not a dashboard. The experience combines precise operational structure with documentary warmth:

- authentic company identity and verified proof appear immediately;
- urgent OPS contact remains available without dominating the page;
- a compact hero launcher begins a credible quotation journey;
- services are explored through a real responsive navigator;
- coverage is searched and explored through a synchronized map and directory;
- real people, process, history, and partners substantiate the promise;
- layout and interaction genuinely recompose for mobile rather than merely stacking.

The visual result should feel premium because it is controlled, responsive, legible, and exact. It must not use luxury clichés to manufacture status.

## Primary Audience and Jobs to Be Done

### Primary audience

- Airline and broker operations teams
- Travel agencies and tour operators
- Group and event organizers
- Autocarists and transport coordinators
- Airport and station stakeholders

### Primary jobs

1. Confirm coverage for an airport, station, route context, date, and operating need.
2. Confirm authorization, availability, experience, and service scope.
3. Identify the relevant service without interpreting marketing language.
4. Start a complete quotation request with context preserved.
5. Reach OPS immediately when the request is urgent.

Passenger reassurance is important, but the homepage’s primary decision-maker is the professional commissioning or coordinating the service.

## Experience Principles

1. **Actionable clarity over brochure theatre** — Every prominent claim, control, and visual helps the user verify capability, select a service, explore coverage, or begin contact. Decoration never implies nonexistent functionality.
2. **Operational authority with human reassurance** — Precision, authorization, readiness, and process lead; real people and atmospheric airport imagery make that competence feel attentive rather than clinical.
3. **Responsive transformation over stacking** — Mobile changes priority, navigation, density, and interaction models. It is not a compressed desktop page.

## Decisive Aesthetic Direction

### Philosophy

**Documentary Operations — French aviation precision with human warmth.**

This is one direction, not a blend of alternatives. It combines the visual discipline of airport wayfinding and operational documents with authentic field photography and restrained French graphic composition.

### Personality hierarchy

1. Operational authority
2. Human reassurance
3. Premium precision
4. French restraint

Premium must emerge from exact spacing, confident hierarchy, responsive behavior, quality imagery, and excellent interaction feedback. French character must emerge from clarity, civic-infrastructure references, typographic restraint, and composition—not tricolor decoration or luxury-fashion styling.

### Technical/editorial balance

- **70% operational interface:** service selection, proof, coverage exploration, quote progression, urgent contact, clear states, and structured data.
- **30% editorial storytelling:** company history, people, culture, and selected atmospheric image moments.

The page must not look like a software dashboard. Operational structure should remain calm, tactile, and public-facing.

### Tone

- Calm under pressure
- Precise and responsive
- Experienced, direct, and attentive
- Human without being sentimental
- Premium without being luxurious

### Reference points

- French airport and rail wayfinding: legibility, disciplined grids, clear hierarchy, location intelligence
- Aviation operations documents and dispatch boards: status, sequence, handoff, time, and place
- Documentary corporate photography: real staff and real environments
- VIP Chauffeur as a **behavioral** reference only: confident responsive recomposition, persistent contact access, purposeful transitions, and strong interaction feedback

### Anti-references

- Generic luxury-editorial websites
- Chauffeur, hotel, lounge, fashion, or private-jet visual tropes
- Giant serif slogans and tiny uppercase labels
- SaaS dashboards or futuristic “mission control” interfaces
- Glassmorphism, blurred gradient blobs, excessive pills, ornamental cards, and fake metrics
- Decorative section numbering, fake pagination, inert plus icons, and controls without state changes
- Repeated fade-up-on-scroll animation
- AI-generated photography, substitute logos, invented operational data, or unsupported claims

## Brand and Content Rules

These rules are fixed:

- Render the archived master logo exactly. Do not redraw, reconstruct, extend, recolor, or generate a replacement lockup.
- Use only verified company claims, statistics, contacts, partners, locations, and service descriptions from the preserved archive or subsequent owner approval.
- Surface DGAC authorization and genuine operational availability prominently.
- Preserve the authentic “Chaque jour, chaque nuit” language, but do not make poetry the primary proposition.
- Distinguish urgent OPS contact from a standard quotation request.
- Remove fake pagination and inert controls.
- The quotation journey must collect meaningful operational context and provide error, progress, review, and confirmation states.
- Every location shown visually must also exist as accessible verified text.
- Quantitative proof must carry an “as of” date or another approved source context.

## Visual System

### Logo

- Use `public/assets/logo-aeroports-sevices.png`, which is byte-identical to the archived master, or another owner-supplied master proven to be authentic.
- Give the master clear space and sufficient rendered size; do not manufacture a wordmark extension to fill the header.
- Do not create a dark logo variant because this direction is light-only.

### Color

The site has one light theme.

- Mineral white and lightly warm paper surfaces provide the base.
- Deep navy carries primary text and high-authority surfaces.
- The approved Aéroports blue carries brand identity, links, selection, and primary action.
- Amber is a scarce operational signal for live availability, focus, urgency, and meaningful status—not a general luxury accent.
- Neutral blue-grey supports rules, secondary copy, and inactive states.
- Photography may use a restrained dark legibility wash only where text overlays an image. No decorative gradients.
- Every semantic color must be defined for default, hover, focus, active, selected, error, success, and disabled states before components are styled.

### Typography

- Use a serif-free system.
- Select a contemporary humanist grotesk with warmth in the lowercase, strong French diacritics, high legibility, and a useful variable-weight range.
- Use the same family or a deliberately compatible compact cut for operational headings, location codes, dates, and figures.
- Use tabular figures wherever times, counts, or operational data align.
- Avoid ultra-condensed display faces and aggressive tracking.
- Body copy starts at 16 px on mobile with comfortable 1.5–1.65 line height.
- Utility text must remain readable; no essential information below 12 px, and 12 px is reserved for genuinely secondary labels.
- Headings scale by available measure, not viewport spectacle. Long French words must wrap without clipping or forced narrow columns.
- Fonts must be served without a render-blocking remote CSS import and must retain stable fallback metrics.

### Geometry and density

- Use a strong responsive grid, squared modules, crisp rules, and restrained corner radii no greater than 4 px where a tactile control needs differentiation.
- Do not wrap every content group in a card.
- The first two viewport heights should be moderately dense and decision-rich.
- Use breathing room around human stories and major photographs, not as a default substitute for hierarchy.
- Create controlled cinematic breaks with photography at specific moments; do not alternate full-width bands mechanically.
- Keep shadows rare and functional. Prefer contrast, alignment, and rules for structure.

### Photography and image treatment

Target approximately **65% operational evidence / 35% atmosphere**.

Operational evidence includes:

- staff assisting passengers;
- team coordination and real handoffs;
- counters, gates, baggage or document handling where verified and appropriate;
- recognizable airport/station working context;
- visible human attention and professional behavior.

Atmosphere includes:

- terminal scale and movement;
- transport transitions;
- arrival/departure light and place;
- selected quiet moments that reinforce round-the-clock availability.

Treatment rules:

- Prefer authentic archived company material and approved future photography.
- Use natural color with a restrained cool-neutral grade; retain healthy skin tones.
- Art-direct crops separately for desktop, tablet, and mobile.
- Never rely on one center crop for all widths.
- Avoid heavy duotones, generic sunset silhouettes, artificial motion blur, stock-airport clichés, and image cards used only to fill space.
- Atmospheric images may lead a section only when adjacent operational proof keeps the company—not the airport mood—as the subject.

## Information and Page Composition

The homepage follows this order:

1. Responsive header with authentic logo, service/coverage navigation, urgent OPS access, and quote action
2. Operational welcome hero with compact quote launcher
3. Verified trust and readiness rail: DGAC authorization, genuine availability, coverage, and dated quantitative proof
4. Responsive service navigator
5. Coverage explorer
6. People and operational process story
7. Company lineage and history
8. Verified clients and partners
9. Quote/contact continuation and direct OPS details
10. Compact legal and navigation footer

On mobile, urgent OPS access, quote start, services, and coverage stay ahead of longer history and partner material.

## Hero Concept: Operational Welcome

The hero is not a carousel and contains no sequence counter.

### Desktop

- Use one wide atmospheric-but-authentic airport image with a deliberately art-directed focal point.
- Pair it with a compact, high-contrast information field rather than a giant slogan.
- Required first-viewport content:
  - exact archived master logo in the header;
  - specific verified operator proposition;
  - DGAC authorization;
  - genuine operational availability;
  - urgent OPS phone action;
  - quote launcher inputs for service, location, and date/time;
  - a clear continuation action.
- The quote launcher visually belongs to the hero but reads as a functional starting surface, not a booking-widget template.

### Tablet

- Preserve proposition, proof, and launcher without squeezing them over the image.
- Image and functional field may become a balanced vertical sequence before controls become narrow.

### Mobile

- Show proposition, proof, urgent OPS, and quote start before or alongside a shorter image crop.
- Use a compact sticky action bar after the hero with “Appeler OPS” and “Demander un devis.”
- Never place essential copy over a busy crop.

## Functional Quote Journey

The hero launcher collects:

1. Service family
2. Airport or station
3. Date and local time

Continuing opens a focused quote workspace with those choices preserved.

### Desktop behavior

- Open a right-side quote workspace wide enough for one clear task at a time while retaining limited page context.
- Trap focus inside while open, provide an explicit close action, and restore focus to the launcher when closed.

### Mobile behavior

- Open as a full-screen task surface with a compact step header and persistent Back/Continue controls.
- Preserve entered data when the user changes steps or temporarily closes the journey.

### Required steps

1. Operational context: departure/arrival/transit or relevant service context, group/passenger information, flight/train details when applicable, urgency
2. Requester details: organization, contact name, email, phone
3. Review: summarized service, location, schedule, operational context, and contact details
4. Confirmation: reference/receipt state, expected response, OPS escalation guidance for urgent requests

### Required states

- Empty, active, completed, invalid, submitting, success, and recoverable failure
- Clear inline errors tied to fields
- No destructive reset when navigating backward
- Direct urgent-phone escalation when lead time meets the verified urgent threshold
- A visible distinction between submitting a request and receiving final operational confirmation

## Service Presentation

Replace the 2×2 passive card grid with a responsive service navigator using the four verified service families.

### Desktop and wide tablet

- A concise indexed service list controls an adjacent detail panel.
- Selecting a service updates:
  - plain-language scope;
  - intended requester;
  - verified deliverables;
  - one relevant operational image;
  - “Demander cette prestation,” which preselects the service in the quote journey.
- The selected state is visually explicit and announced to assistive technology.

### Mobile

- Transform into a true single-open accordion.
- Controls must be buttons with accurate expanded state.
- Expanded content appears immediately after its control.
- Opening a service should not trigger unexpected page jumps.
- No plus icon appears unless it actually expands content.

## Coverage Presentation

Replace the decorative legacy-map card with a synchronized explorer built from verified locations.

### Desktop

- Pair a precise France/network map with a searchable and region-grouped directory.
- Hover or focus on a location highlights it on the map.
- Selecting a map marker moves focus or selection to the matching directory entry and exposes verified transport/location context.
- Distinguish airports, maritime stations, railway stations, and border-adjacent coverage without relying only on color.

### Tablet

- Keep map and directory connected, but allow the directory to occupy full readable width before the map becomes too small.

### Mobile

- Lead with search and grouped location results.
- Offer the map as an optional expandable overview.
- Do not require map interaction to discover or verify any location.

The historical map remains a source reference, not the final presentation asset.

## Motion and Interaction Principles

Motion is confident and functional, with a small atmospheric allowance.

- Use motion for menu transformation, quote progression, service selection, map/list synchronization, sticky-action changes, validation, and confirmation.
- Allow one restrained hero entrance that establishes hierarchy. Do not replay it on incidental scroll.
- Remove the global fade-up treatment from repeated sections.
- Standard interaction feedback completes within approximately 180–250 ms.
- Larger contextual transitions complete within approximately 250–400 ms.
- Maintain spatial continuity: panels should enter from the control or edge that invoked them; selections should update in place.
- Never animate layout in a way that causes content loss, unexpected scroll jumps, or input displacement.
- Under `prefers-reduced-motion: reduce`, eliminate translation, parallax, and staged entrances while retaining instant state feedback.
- Every icon, chevron, counter, and state marker must correspond to real behavior or information.

## Responsive Behavior

### Global requirements

- Design mobile-first from 320 px upward.
- Zero horizontal overflow at 320, 360, 375, 390, 414, and 430 px.
- Explicitly validate 375×812, 768×1024, the 959/960 px transition, 1024 px, and 1280×800.
- No control may flex below 44×44 px.
- No essential content may rely on hover.
- Use content-driven breakpoints; do not reveal the full desktop header until its contents fit at intended size without shrinking.
- Reorder by task priority on mobile instead of serializing the desktop page unchanged.

### Header

- Wide desktop: full navigation, OPS status/action, quote action.
- Intermediate widths: simplified navigation before controls begin to shrink.
- Mobile/tablet: compact logo, labelled menu control, direct OPS access, and quote action in the open menu or sticky bar.
- Opening the menu controls page-scroll behavior, moves focus intentionally, and returns focus on close.

### Content transformation

- Hero functional field becomes a vertical action sequence on mobile.
- Proof rail becomes a readable two-column or horizontal snap group only if all items remain discoverable without gesture ambiguity.
- Service navigator becomes an accordion.
- Coverage becomes directory-first with optional map.
- History becomes a concise vertical sequence with expandable secondary detail if necessary.
- Partner marks use optically normalized rows with no orphaned card treatment.
- Footer prioritizes OPS, quote, address, and legal information before secondary navigation.

## Theme Behavior

The redesign supports **light mode only**.

- Remove the theme toggle and all dark-mode-specific imagery, tokens, and interface branches from the intended experience.
- Do not respond to `prefers-color-scheme: dark` by changing the page palette.
- Browser form controls must be styled consistently for the light theme.
- High-authority navy sections may appear within the light experience, but they are components—not a dark theme—and must meet contrast requirements.

## What Must Be Preserved

- Archived master logo, used exactly
- Verified company name, history, founding details, service families, locations, contacts, claims, and statistics
- “Chaque jour, chaque nuit” as supporting brand language
- DGAC authorization and genuine operational availability
- Authentic archived photography and partner material, subject to verification and improved art direction
- Genuine OPS phone prominence
- Semantic landmarks and heading structure
- Skip link, meaningful alt text, keyboard focus treatment, and reduced-motion support
- The current mobile menu’s clarity and generous target sizing as a behavioral baseline
- Square geometry, restrained shadows, and the absence of glassmorphism and decorative gradient blobs

## What Must Be Removed or Replaced

- Reconstructed logo lockups and dark logo variant
- Dark-mode toggle and dark-mode palette
- Cormorant display-serif system
- Giant slogan-led hero
- Fake `01 / 04` pagination
- Repeated decorative section indices where they add no meaning
- Inert service plus icons and passive 2×2 card grid
- Decorative legacy-map card
- Generic white-box partner wall
- Repeated fade-up scroll animation
- Tiny essential labels and body copy
- Fixed mobile side-label columns
- CTA links that promise a quote but lead only to email/contact
- Unverified, undated statistics or partner assertions
- Any styling that evokes chauffeur, hotel, private-jet, fashion-editorial, or generic AI landing pages

## Existing Patterns and Codebase Context

The current application is a single Next.js App Router homepage with one client component and global CSS. There is no third-party component system, Storybook library, or separate token package.

- **Typography:** Cormorant Garamond and Montserrat are imported remotely in `src/app/globals.css`; this pairing must be replaced by the serif-free system.
- **Colors:** light/dark CSS custom properties exist in `:root`; retain the idea of semantic tokens but replace the palette with light-only role-based tokens.
- **Spacing:** current layout uses 20/32/48 px container gutters and broad 90/130 px section padding. Retain a consistent scale but reduce default vertical expansion and design density by task.
- **Components:** `src/app/components/site-shell.tsx` contains header, hero, stats, history, culture, services, coverage, partners, contact, and footer in one file. Its data structures and semantic content are useful; most presentation modules require redesign.
- **Existing strengths:** skip navigation, landmark elements, labelled theme/menu controls, meaningful image alt text, persistent theme setup, `IntersectionObserver` fallbacks, and reduced-motion CSS. Preserve the accessibility intent while removing the dark-theme and generic reveal behaviors.
- **UI dependencies:** no interaction or animation library is currently required by the brief; implementation choices remain outside this document.

## Component Inventory

| Component | Status | Direction |
| --- | --- | --- |
| Site header | Modify substantially | Authentic logo, responsive navigation states, direct OPS and quote access; no theme toggle. |
| Mobile navigation | Modify | Preserve clarity and target size; add focus/scroll management and priority actions. |
| Operational welcome hero | New/rebuild | Atmospheric/evidence image, verified proposition, proof, OPS, and quote launcher. |
| Quote launcher | New | Service, location, date/time; persists selections into quote workspace. |
| Quote workspace | New | Accessible multi-step desktop side workspace/mobile full-screen task flow. |
| Readiness/proof rail | New | DGAC, availability, verified coverage, dated statistics. |
| Service navigator | New/rebuild | Selectable desktop detail panel; true mobile accordion; quote prefill. |
| Coverage explorer | New/rebuild | Searchable directory synchronized with precise accessible map. |
| People/process section | Modify | Real team evidence plus concise operational handoff story. |
| Company history | Modify | Preserve facts; simplify and reduce vertical weight on mobile. |
| Partner presentation | Modify | Verified marks, optical normalization, contextual grouping without card wall. |
| OPS/contact continuation | Modify | Direct operational channels plus quote continuation and urgency guidance. |
| Footer | Modify | Compact priority order, verified legal/contact destinations, authentic logo. |
| Theme toggle/dark system | Remove | Light-only direction. |

## Key Interactions

1. **Quote start:** selections in the hero survive into the quote workspace; users can close and resume without losing data.
2. **Urgent escalation:** verified urgency rules surface direct OPS calling without blocking the standard quote path.
3. **Service selection:** changing the selected service updates one adjacent content region, announces state, and can prefill the quote request.
4. **Coverage synchronization:** map, search, and directory share one selected location state and remain keyboard operable.
5. **Responsive contact access:** OPS and quote actions condense into a mobile sticky bar after the hero without covering content or focus targets.
6. **Navigation:** active destinations, open/close state, focus return, and anchor positioning remain clear across sticky-header changes.
7. **Feedback:** hover, focus, active, selected, validating, error, submitting, and success states are visually distinct and never communicated by color alone.

## Accessibility Requirements

- Meet WCAG 2.2 AA for the complete homepage and quote journey.
- Maintain at least 4.5:1 contrast for normal text and 3:1 for large text, graphical objects, focus indicators, and control boundaries where required.
- All interactive targets are at least 44×44 px.
- Body text is at least 16 px on mobile.
- Keyboard users can operate navigation, service selection, accordion panels, coverage search/map equivalents, quote steps, validation, close actions, and urgent contact.
- Quote workspace focus is trapped while open and restored on close; step changes announce their heading and progress.
- Every field has a persistent label, appropriate autocomplete/input purpose, descriptive error, and programmatic relationship to help/error text.
- Service navigator uses an appropriate tab/listbox disclosure pattern on desktop and button/region accordion semantics on mobile; semantics must remain correct when the visual model changes.
- Map information has a complete text alternative and never requires pointer precision.
- Photography has contextual alt text when informative and empty alt text when purely atmospheric.
- Focus indication is visible on every surface and is not obscured by sticky elements.
- Skip navigation remains available.
- Heading order and landmarks remain logical after responsive reordering.
- `prefers-reduced-motion` removes nonessential movement without suppressing state feedback.
- The page remains readable at 200% zoom and reflows at 400% without horizontal two-dimensional scrolling for ordinary content.

## Measurable Acceptance Criteria

### Brand and content

- The rendered logo matches the archived master byte/source asset and has no reconstructed extension.
- Every public claim, statistic, partner, location, and availability statement is marked verified before release.
- DGAC authorization and operational availability are visible in the initial desktop and mobile experience.
- The first viewport answers operator, capability, availability, credential, and next action.

### Interaction and conversion

- A user can start with service/location/date-time, complete every quote step, review the request, submit it, and reach a meaningful confirmation state.
- Closing/reopening or moving backward does not erase completed quote fields.
- Every visible plus, chevron, progress marker, or selection indicator has real behavior or information.
- Service selection and coverage selection work by mouse, touch, and keyboard.
- Urgent OPS contact remains reachable within one action from every responsive state.

### Responsive behavior

- No horizontal overflow at 320, 360, 375, 390, 414, or 430 px.
- No clipped French headings or word-by-word narrow columns.
- At 959 and 960 px, navigation changes without shrinking any target below 44×44 px or overlapping content.
- Required screenshots pass at 375×812, 768×1024, and 1280×800.
- Mobile service and coverage experiences change interaction model as specified, rather than simply stacking desktop panels.

## V3 Amendment — interaction, imagery, and real-map priority

Recorded 29 August 2026 as a refinement of the approved V2 direction. V3 keeps the light-only, factual, archive-led foundation and adds the following implementation requirements:

- The hero may rotate between supplied images when the approved `images-redesign` assets are available. The sequence must use a restrained crossfade, stable copy, explicit previous/next and pause/play controls, hover/focus pause, hidden-tab pause, manual-interaction stop, and a static first image with manual selection under `prefers-reduced-motion`.
- The site should carry substantially more movement and interactivity than V2, borrowing responsiveness and motion confidence from VIP Chauffeur as a behavioral reference only. Motion must remain authored, purposeful, interruptible, performant, and accessible; repetitive generic fade-up treatment and decorative animation remain prohibited.
- The real geographic map is now the highest-priority experience. Replace the invented France SVG and percentage-based placement with MapLibre GL JS, a restrained light vector basemap, actual longitude/latitude data, visible attribution, synchronized directory selection, touch-safe markers, keyboard-accessible text fallback, and a documented failure path.
- Coordinate data must remain separate from presentation, preserve the authentic location spelling and category set, identify any provisional coordinates, and document provider/style and production-hosting considerations.
- The service image sequence must be derived from the files actually present in `images-redesign`; the user’s `a/b/c/b` notation is ambiguous and must not be silently interpreted as a fourth `d` asset. If only three unique files exist, retain the current fourth image temporarily and report the ambiguity.
- The final V3 review must explicitly verify map loading/failure behavior, hero controls and timing, reduced motion, mobile directory-first coverage, marquee pausing, quote focus/validation states, responsive overflow, and the unchanged original archive hash.

### Visual and typography

- No display serif is used.
- Essential copy is never below 12 px; mobile body copy is at least 16 px.
- Photography selection and page area approximate the approved 65% operational evidence / 35% atmosphere balance.
- The page contains no decorative carousel counter, generic card wall, glass effect, gradient blob, or unverified visual data.
- Page length is materially reduced from the reviewed 10,619 px mobile capture while retaining all approved content and complete tasks.

### Accessibility and motion

- Automated and manual contrast checks pass WCAG AA for all normal, interactive, selected, validation, and sticky states.
- The complete quote path and primary homepage interactions are keyboard operable with visible focus.
- No essential information is hover-only or color-only.
- Standard motion completes within 180–250 ms; contextual transitions within 250–400 ms.
- Reduced-motion mode removes translations and staged entrances while leaving instant feedback and task completion intact.

### Theme

- No theme toggle is rendered.
- The page remains light regardless of OS color-scheme preference.
- Navy feature surfaces inside the light theme pass the same contrast and interaction criteria.

## Out of Scope

- Dark mode or automatic system-theme switching
- Reconstructing, modernizing, or generating the Aéroports Services logo
- Inventing or independently changing company facts, service scope, locations, statistics, credentials, contacts, or partners
- Reopening the Next.js/React stack or choosing implementation libraries
- Full redesign of every archived secondary page
- CMS, customer portal, dispatch system, account area, payments, or live flight operations data
- Visual imitation of VIP Chauffeur
- New unverified photography or generated brand imagery
- Implementation work during this brief phase
