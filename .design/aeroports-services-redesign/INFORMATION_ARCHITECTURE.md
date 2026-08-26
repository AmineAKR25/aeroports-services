# Information Architecture: Aéroports Services

Phase 3 of the design flow. Reads `DESIGN_BRIEF.md`, `REQUIREMENTS.md`, `CONTENT_AUDIT.md`.
Companion document: `CONTENT_MIGRATION_MATRIX.md` (all 27 legacy URLs).

## Structural decisions, derived not asked

Per instruction 6, these were resolvable from the archive and the brief:

| Question | Answer | Derived from |
|---|---|---|
| Primary tasks, by frequency | 1. Request a quote · 2. Check whether AS covers *my* airport · 3. Understand which of the four service families applies · 4. Verify credentials · 5. Reach a human now | The four service families, the coverage lists, and the fact that "DEMANDER UN DEVIS" was the single repeated CTA on all 27 legacy pages |
| Acceptable nav depth | **One level. Flat.** | Seven real pages. Any nesting would be invented hierarchy. |
| Fixed vs. growing content | Effectively all fixed. Only the client roster grows, and slowly. | No blog (D5), no CMS (out of scope), no job posts (D5) |
| Distinct user types | Four buyer types, **one site, one entry point** | The six real client categories collapse into: airlines/brokers, tour & coach operators, event agencies, groupists |
| The 80% page | **Home.** | Legacy site had no other page with meaningful content depth; the network map lives here |

## Site Map

```
Accueil                        /
Prestations                    /prestations
Couverture                     /couverture
À propos                       /a-propos
Clients & partenaires          /clients-partenaires
Contact                        /contact
Demander un devis              /devis
Conditions générales           /conditions-generales
```

Eight routes. Flat — no nesting, no dynamic segments, no route groups beyond a single shared layout.

Two routes are new topics rebuilt from content the archive stranded on Accueil:

- **`/couverture`** — the network. The legacy `/global-coverage/` was an 80-country lorem list;
  the *real* coverage data (14 airports, 4 ports, 6 stations, 5 border airports) was buried at the
  bottom of the homepage. It becomes a page because it is the signature element and the second-most
  common visitor question.
- **`/a-propos`** — the group. Absorbs the real Équipe content (`/about-us/`) and the real founding
  narrative (stranded on Accueil), retiring the lorem `/our-history/`.

### Deliberately absent

- No `/galerie`, `/notre-flotte`, `/carrieres` — retired, zero real content (D5).
- No blog, news or `/actualites`.
- No `/mentions-legales` — **see the legal gap below.**

> **Verification item, not a legal finding.** French sites commonly publish a *mentions légales*
> page identifying the publisher, and the archive **contains no such page and no publisher
> identity** — the only entity string anywhere is the footer `Copyright © 2017 SAS DIGIAPP`.
> **Whether such a page is required here, and what it must contain, is a question for the owner or
> qualified counsel** (item **V19**); this plan takes no position and offers no legal advice. The
> route is reserved and the component is built so that supplying the content is a data edit. No
> legal identity is invented.

## Navigation Model

**Primary navigation — 5 items maximum.**

`Prestations · Couverture · À propos · Clients · Contact`

Plus one high-emphasis action, ranked and visually separated: **`Demander un devis`** → `/devis`.
This mirrors the reference's two-tier action pattern (ghost outline + solid fill) and repairs the
legacy site's single most-broken element — the CTA that pointed at `localhost` on all 27 pages.

`Conditions générales` is **not** in the primary nav. It lives in the footer, where the legacy site
also placed it — correctly.

**Secondary navigation.** None. Eight flat pages need no sidebar, tabs or breadcrumbs. `/prestations`
uses in-page anchors for the four service families (`#assistance`, `#representation`, `#compagnies`,
`#force-de-vente`) so a broker can be linked straight to the relevant family.

**Utility navigation.** Theme toggle (default follows the chosen visual direction — see
`VISUAL_DIRECTIONS.md`), and the persistent `FloatingContact`
affordance — a phone action, present on every page at every scroll position.

**Mobile navigation.** Drawer, opened from a right-aligned trigger. Full height, focus-trapped,
returns focus to the trigger on close. The five primary items, then the `Demander un devis` action
at full width, then the contact block — address and two tappable `tel:` links — pinned at the
bottom. The legacy site had **zero** `tel:` links across 27 pages; putting them at the bottom of
the drawer means one thumb reaches them.

## Content Hierarchy

### Accueil `/`
1. **Hero scene** — the positioning line *Premier Réseau Français d'Assistance aux passagers* at display scale, with the motto beneath. First because it is the one sentence that says what the company is, and the legacy site buried it under a slider.
2. **The network map** — the signature object, immediately after the hero. Second because "do you cover my airport" is the question that decides whether the visitor keeps reading.
3. **Four service families, itemised** — condensed, each linking to its anchor on `/prestations`.
4. **Credentials** — DGAC, ADP, CCI, Vinci. Stated once, flat, no badges.
5. **Statistics — omitted until verified.** The four figures are withheld pending V1–V4; the layout is composed so this band is optional and the page reads as complete without it (see the statistics rule below).
6. **Client wall (scene)** — six verified categories; marks appear only as they are individually approved (D6). The section reads as finished with zero marks cleared.
7. **Closing call (scene)** — quote action and the phone number.

The group history and culture text moves to `/a-propos`. On the legacy homepage it sat above the
coverage data, which inverted the visitor's actual priority.

### Prestations `/prestations`
1. The four families as full entries — eyebrow, title, itemised list, anchor target.
2. Which family fits which buyer — a plain mapping, no persona illustrations.
3. Quote action.

### Couverture `/couverture`
1. The map at full scale and label density.
2. `CoverageTable` — the four categories as a real, readable table. A peer view, not a fallback.
3. The `**` footnote, preserved verbatim: *PRESENT SUR AUTRES AEROPORTS ET/OU GARES SUR DEMANDE*.
4. Quote action.

### À propos `/a-propos`
1. Missions — the 24/7 multilingual statement.
2. The group's formation — 2006, the four founders, the four constituent companies and their dates.
3. Values (4) and Atouts (4).
4. Authorisations, restated.

### Clients & partenaires `/clients-partenaires`
1. The six categories as structure — they are verified and carry the page even if marks are cut.
2. The marks within each, monochrome.
3. Partner set: Air Charter Service, PRO SKY, Carlson Wagonlit, and the mark filed as "Brokair"
   (V8 — the file contains The Aviation Factory's logo). All gated on approval before publication.

### Contact `/contact`
1. `ContactCard` — address, two `tel:` links, fax, email. Above everything.
2. The contact form.
3. Hours framing — *OPS 7/7*, taken from the legacy label.

### Devis `/devis`
1. **Availability of online submission, stated first.** While no backend exists (D4), the page says
   so before the visitor invests any effort — not after seven fields.
2. **Telephone and email as the primary actions**, at full weight: the OPS number and
   `resaparis@aeroports-services.com` as large tappable controls. This is how the business actually
   takes bookings — the CGV names phone, mail and fax as the confirmation channels.
3. The field set, designed and rendered in a disabled preview state. **No submit button and no
   simulated success.** When B1 lands, the flag flips and this becomes the primary path.

### Conditions générales `/conditions-generales`
1. Clauses A–I in order, anchored, verbatim.
2. Long-form reading measure, 65ch. **Document treatment, no scenes** — under either direction this
   route uses the light document mode (`VISUAL_DIRECTIONS.md`, recommendation).

## User Flows

### Flow 1 — Broker qualifies coverage, then requests a quote *(primary)*
1. Lands on `/` from search or a referral.
2. Reads the positioning line; scrolls to the map.
3. Looks for their airport.
   - **Found** → hovers/taps the node, sees the label → continues to services.
   - **Not found** → reads the `**` footnote (*other airports on request*) → continues, does not bounce.
   - **On mobile** → the map is a grouped list, scanned rather than probed.
4. Reads the relevant service family, follows the anchor to `/prestations#compagnies`.
5. Takes `Demander un devis` → `/devis`.
6. Completes the form.
   - **D4 unwired** → success state states no message was sent and surfaces the OPS number.
   - **D4 wired later** → confirmation states the response channel and timeframe.

### Flow 2 — Stranded operations call at 23:40 *(highest urgency, lowest tolerance)*
1. Arrives on any page, on a phone, one-handed.
2. Taps `FloatingContact` — present at every scroll position on every route.
3. Taps the OPS number. Dials. **Three taps, no page load, no form.**
   This flow must survive JavaScript failing to load; the number is a plain `<a href="tel:">`.

### Flow 3 — Tour operator verifies credibility before a first contract
1. Lands on `/` → scrolls past the map to credentials.
2. Follows to `/a-propos` for the group's formation and authorisations.
3. Follows to `/clients-partenaires` to look for peers in *Groupistes* or *Autocaristes*.
4. Exits to `/contact` or `/devis`.

### Flow 4 — Existing client checks the terms
1. Footer → `Conditions générales`.
2. Lands on the clause they need via anchor.
   *(On the legacy site this link pointed at `localhost` from all 27 pages and was unreachable.)*

## Naming Conventions

French throughout (D1). One word per concept, everywhere.

| Concept | Label in UI | Notes |
|---|---|---|
| Service offering | **Prestations** | The company's own word, on the legacy nav. Not "Services" — that duplicates the company name. |
| The four groupings | **Familles de prestations** | "Family" not "category" — category is reserved for clients. |
| Geographic network | **Couverture** | Not "Global Coverage" — the coverage is French and near-border. The legacy English label oversold it. |
| Quote request | **Demander un devis** | Verbatim from the legacy CTA. Recognised by returning visitors. |
| The company | **Aéroports Services** | Accented. The logo is accented; the legacy `<title>` was not. |
| Client groupings | **Catégories** | Six real ones. |
| A served location | **Point du réseau** | Airports, ports and stations are one node type with four subtypes. |
| Legal terms | **Conditions générales** | Verbatim. |
| 24/7 operations line | **OPS 7/7** | Verbatim from the legacy contact page. |
| A verified figure | **Chiffre vérifié** | Only owner-verified, owner-dated figures reach the UI — see below. |

> **The statistics rule [rev. 2].** The four figures are **withheld from public output until the
> owner verifies each one.** The archive establishes no reporting year for any of them — the
> capture date, the upload directory and the footer copyright year are properties of files and
> pages, not of the measurements — so no year is assigned and no *"chiffres 2017"* label appears
> anywhere. `StatFigure` accepts only entries carrying `status: 'verified'` plus an owner-supplied
> `reportingYear` and `basis`; the unverified case is unrenderable by type rather than by
> discipline. The home and `/a-propos` layouts are composed so the statistics band is **optional** —
> both pages read as complete without it, so it is not a visible hole. Publishing a figure later is
> a data edit.

## Component Reuse Map

| Component | Used on | Behaviour differences |
|---|---|---|
| `RootLayout` | All 8 | — |
| `SiteHeader` | All 8 | Transparent over the hero scene band on `/`; solid on all others. |
| `MobileNav` | All 8 | Identical. |
| `FloatingContact` | All 8 | Identical. Never suppressed. |
| `Footer` | All 8 | Compact map motif; `/couverture` omits it to avoid duplicating the full map. |
| `SceneBand` | `/`, `/prestations`, `/couverture`, `/clients-partenaires`, `/devis` | Hero variant on `/` only. Wall variant on `/clients-partenaires` and `/`. Closing variant on all five. Never on `/conditions-generales` — legal text gets no theatre. |
| `NetworkMap` | `/`, `/couverture` | `/` compact, category labels only. `/couverture` full density, all 29 nodes labelled. |
| `CoverageTable` | `/couverture`, and mobile `/` | On `/` at <768px it *replaces* the map. |
| `ServiceFamily` | `/`, `/prestations` | `/` condensed to title + 3 items + link. `/prestations` full itemisation + anchor. |
| `StatFigure` | `/`, `/a-propos` | Identical. Renders only verified, owner-dated figures; currently renders nothing (V1–V4). |
| `ClientWall` | `/`, `/clients-partenaires` | `/` shows categories with a subset; `/clients-partenaires` shows all approved marks. Both render correctly at zero approved marks. |
| `ContactCard` | `/contact`, `MobileNav`, `Footer` | Full on `/contact`; condensed to address + two `tel:` in nav and footer. |
| `QuoteForm` | `/devis` | Single instance. Not embedded elsewhere — one canonical destination. |
| `CredentialRow` | `/`, `/a-propos` | Identical. |
| `LegalDocument` | `/conditions-generales`, and `/mentions-legales` when content exists | — |

## Content Growth Plan

Growth is genuinely minimal, and the IA is sized for that rather than for imagined scale.

| Content | Growth | Accommodation |
|---|---|---|
| Client marks | Slow. Currently 34, of which an unknown subset clears (D6). | `ClientWall` is a flow layout that reads correctly from ~12 marks up. No pagination, no filtering — a wall of 34 logos does not need search. |
| Network nodes | Slow. New airports on request. | Node data is a typed array; adding one is a data edit, not a layout change. The `**` footnote already covers unnamed locations. |
| Service families | Static. Four, unchanged since 2017. | Hardcoded structure. If a fifth appears the grid absorbs it. |
| Statistics | Published only once the owner verifies each figure. | `StatFigure` requires `status: 'verified'` plus `reportingYear` and `basis`. Until then nothing renders and the layout omits the band. |
| Legal clauses | Rare. | Anchored sections in one document. |
| Job posts | Zero today (D5). | Route deliberately unreserved. When real openings exist, a new page is a new decision, not a placeholder waiting. |

**No pagination, filtering, search or archive patterns are designed.** An eight-page site with 34
logos and 29 nodes does not need them, and building them would be architecture serving an imagined
future rather than this business.

## URL Strategy

- **Pattern**: `/{section}` — single flat segment, French, lowercase, hyphenated.
- **No dynamic segments.** Every route is static. No `[slug]`, no catch-alls except the 404.
- **No query parameters.** Nothing is filtered, sorted or paginated. Anchors only:
  `/prestations#assistance`, `/conditions-generales#clause-d`.
- **No trailing slashes.** The legacy site used them; the migration matrix handles both forms.
- **Accents in slugs**: none. `/a-propos` not `/à-propos`, `/couverture` not `/couvertüre`.
  Accents stay in visible labels, never in URLs.
- **`/en` is reserved but unbuilt** (D1). Adding it later means a locale segment above the existing
  flat routes — no route rewriting.

### Legacy path handling [rev. 2 — corrected against the installed Next.js 16 docs]

Two corrections from rev. 1, both verified in `node_modules/next/dist/docs/`:

- **Redirects are 308, not 301.** `redirects()` emits 308 for `permanent: true` and 307 for
  `permanent: false`, deliberately, to preserve the request method.
- **410 responses do not come from `next.config.ts` at all.** They come from `proxy.ts` — Next.js 16
  renamed Middleware to Proxy. Documented execution order places Proxy before filesystem routes, so
  it can serve a 410 for a path that no longer exists.

| Class | Response | Mechanism |
|---|---|---|
| `/wp-content/uploads/**` — retained assets | 308 | `redirects()` → new `/assets/**` path |
| `/wp-content/uploads/**` — discarded | 410 | `proxy.ts` |
| `/wp-content/themes/**`, `/wp-includes/**`, `/wp-content/plugins/**` | 410 | `proxy.ts` |
| `/wp-login.php`, `/wp-admin/**`, `/xmlrpc.php` | 410 | `proxy.ts` — linked 6× from the legacy footer |
| `/feed/`, `/comments/feed/`, `/wp-json/**` | 410 | `proxy.ts` |
| `/2016/11/`, `/2017/03/` | 308 → `/` | `redirects()` |
| `http://localhost/**` | n/a | Never resolved on the public domain; not redirectable. Repaired by construction. |

Full implementation and the three-layer test plan: `CONTENT_MIGRATION_MATRIX.md` §2.
