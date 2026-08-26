# Content migration matrix

Phase 3 companion deliverable. Instruction 4: a proposed redirect and content-migration mapping for
**all 27 captured URLs**.

> **Reconciliation, rev. 2.** This table is generated from
> `reference/original-aeroports-services/inventory/crawl-manifest.json` and asserted against it:
> 27 rows, 27 unique paths, exact set match — the script fails if any URL is missing, duplicated or
> invented. Rev. 1 omitted `/flightshotel/` and carried `/hello-world/` twice. Both are fixed.
>
> **Status codes corrected.** Rev. 1 specified 301/302. The installed Next.js 16 documentation
> (`node_modules/next/dist/docs/.../redirects.md`) is explicit: `redirects()` emits **308** for
> `permanent: true` and **307** for `permanent: false`, deliberately, to preserve the request
> method. See §2 for the full implementation and testing plan.

Status key — **KEEP** content survives · **REBUILD** topic survives, content sourced elsewhere ·
**RETIRE** no content survives (demo residue)

---

## 1. Page redirect map — all 27 URLs

### 1a. Genuine content — migrated (7 pages)

| # | Legacy URL | Status | New route | Status code | Content disposition |
|---|---|---|---|---|---|
| 1 | `/` | KEEP | `/` | **200** | Positioning line, motto, group history, 4 stats, culture, coverage lists. History → /a-propos; coverage → /couverture. |
| 2 | `/services/` | KEEP | `/prestations` | **308** | All four service families verbatim and complete, every bullet. |
| 3 | `/about-us/` | KEEP | `/a-propos` | **308** | Missions, Visions, 4 Valeurs, 4 Atouts, DGAC agrément — verbatim. |
| 4 | `/sample-page/` | KEEP | `/clients-partenaires` | **308** | 6 category headings + 34 marks. Slug was an unrenamed WordPress default. |
| 5 | `/contact/` | KEEP | `/contact` | **200** | Address, email, OPS, tel, fax verbatim. Form rebuilt. |
| 6 | `/flightshotel/` | KEEP | `/devis` | **308** | **The quote page.** Form fields migrate verbatim: Civilité, Nom, Prénom, Email, Tel portable, Date du voyage, Message. Legacy slug "Flights+Hotel" is a Kallyas artifact; the form is real. |
| 7 | `/condition-generale/` | KEEP | `/conditions-generales` | **308** | All 9 clauses A–I verbatim. IBAN/BIC block held pending V11/SEC2. Slug pluralised to match the visible label. |

### 1b. Business-titled, demo content — topic rebuilt or retired (6 pages)

| # | Legacy URL | Status | New route | Status code | Content disposition |
|---|---|---|---|---|---|
| 8 | `/global-coverage/` | REBUILD | `/couverture` | **308** | Legacy 80-country lorem list discarded. Topic rebuilt from the real coverage lists on Accueil. |
| 9 | `/our-history/` | REBUILD | `/a-propos` | **308** | Legacy lorem timeline discarded — it also contradicts the 2006 founding stated on Accueil. Topic rebuilt from Accueil. |
| 10 | `/our-fleet/` | RETIRE | `/clients-partenaires` | **308** | The archive contains no verified fleet information; the page held only Kallyas testimonials. Nothing to migrate. |
| 11 | `/gallery/` | RETIRE | `/clients-partenaires` | **308** | "63 comfortable rooms" hotel copy + 10× kallyas_sample.png discarded. |
| 12 | `/careers/` | RETIRE | `/contact` | **308** | 5 lorem job posts discarded. Returns when the owner supplies real openings. |
| 13 | `/homepage/` | RETIRE | `/` | **308** | Duplicate demo homepage. |

### 1c. Theme demo, WordPress archive, lorem posts (14 pages)

| # | Legacy URL | Status | New route | Status code | Content disposition |
|---|---|---|---|---|---|
| 14 | `/agency/` | RETIRE | `/` | **308** | "DISCOVER BOTSWANA" safari demo |
| 15 | `/alternative/` | RETIRE | `/` | **308** | "SANTORINI SUITES" hotel demo |
| 16 | `/multiple-rooms-booking/` | RETIRE | `/` | **308** | "SANTORINI SUITES" booking demo |
| 17 | `/portfolio/` | RETIRE | `/` | **308** | Empty theme portfolio scaffolding |
| 18 | `/portfolio/portfolio-1-2/` | RETIRE | `/` | **308** | Empty portfolio entry |
| 19 | `/project_category/category/` | RETIRE | — | **410** | Empty WP taxonomy archive |
| 20 | `/category/logistic/` | RETIRE | — | **410** | WP category archive over lorem posts |
| 21 | `/category/uncategorized/` | RETIRE | — | **410** | WP category archive |
| 22 | `/author/aeroports-services/` | RETIRE | — | **410** | WP author archive |
| 23 | `/hello-world/` | RETIRE | — | **410** | WP default first post |
| 24 | `/quickly-myocardinate-enterprise-wide/` | RETIRE | — | **410** | Lorem post, 10 Nov 2016 |
| 25 | `/distinctively-promote-real-time-strategic-theme-areas/` | RETIRE | — | **410** | Lorem post, 14 Nov 2016 |
| 26 | `/seamlessly-initiate-distinctive-niches-without/` | RETIRE | — | **410** | Lorem post, 14 Nov 2016 |
| 27 | `/continually-engage-distributed-infrastructures/` | RETIRE | — | **410** | Lorem post, 14 Nov 2016 |


**Verified programmatically:** 27 rows · 27 unique paths · exact match to the manifest's page set.
7 genuine + 6 business-titled-demo + 14 demo/archive = 27.

**Why 308 for some and 410 for others.** A redirect to unrelated content is a soft-404: search
engines may decline to honour it. Rows 14–18 are theme demos that sat in the sitemap and may hold
trivial link equity, and `/` is a defensible destination for a human who lands there. Rows 19–27
are WordPress infrastructure and lorem posts with no human audience and no plausible destination —
**410 Gone** de-indexes them in one pass. Five of them (#23–27) are in the legacy `sitemap.xml` and
will be recrawled, so the distinction matters.

**Trailing slashes.** Every legacy URL carried one. Both forms are handled — see §2.

---

## 2. Redirect and 410 implementation plan

Corrected against the installed documentation, not from recall. Two findings changed the plan:

### 2a. `redirects()` returns 308/307, not 301/302

From `node_modules/next/dist/docs/01-app/03-api-reference/05-config/01-next-config-js/redirects.md`:

> `permanent` `true` or `false` — if `true` will use the 308 status code […] if `false` will use
> the 307 status code […] Next.js uses the 307 temporary redirect, and 308 permanent redirect
> status codes to explicitly preserve the request method used.

**Decision: use `permanent: true` (308).** It is the correct modern permanent redirect, search
engines treat it equivalently to 301 for consolidation, and it preserves the request method. The
docs note a `statusCode` property as an alternative for older HTTP clients — *"you can use the
`statusCode` property instead of the `permanent` property, but not both"* — and that a `Refresh`
header is automatically added for 308 to cover IE11. **`statusCode: 301` is available but not
recommended here**; there is no legacy-client requirement that justifies giving up method
preservation.

```ts
// next.config.ts  — shape only; written in Phase 6
async redirects() {
  return [
    { source: '/services',  destination: '/prestations', permanent: true },
    { source: '/services/', destination: '/prestations', permanent: true },
    // …one pair per row of §1 with a destination
  ]
}
```

Both slash forms are enumerated rather than relying on `trailingSlash` normalisation, so the
behaviour is explicit and testable.

### 2b. 410 Gone cannot come from `next.config.ts` — it comes from `proxy.ts`

`redirects()` only redirects; it has no mechanism to return a 410. **In Next.js 16, Middleware has
been renamed Proxy** (`node_modules/next/dist/docs/01-app/01-getting-started/16-proxy.md`):

> Starting with Next.js 16, Middleware is now called Proxy to better reflect its purpose. The
> functionality remains the same.

The file is `proxy.ts` at the project root or in `src/`, alongside `app/`. The docs' **Producing a
response** section confirms a `Response` may be returned directly, and the documented execution
order places Proxy at step 3, **before filesystem routes at step 5** — so it intercepts the gone
paths before Next.js attempts to resolve them.

```ts
// proxy.ts  — shape only; written in Phase 6
const GONE = new Set([ /* the 9 paths marked 410 in §1, both slash forms */ ])

export function proxy(request: NextRequest) {
  if (GONE.has(new URL(request.url).pathname)) {
    return new Response(null, { status: 410 })
  }
}

export const config = { matcher: [ /* only the gone paths + wp-* classes */ ] }
```

Notes carried from the docs: Proxy runs on the Node.js runtime and the `runtime` config option is
**not available** (setting it throws). Only one `proxy.ts` per project is supported. The matcher
must be narrow — Proxy is otherwise invoked for every route.

### 2c. How every redirect and 410 will be tested

Three layers, because the unit-level helpers are experimental and do not exercise `next.config.ts`:

1. **Config-level table test.** Import the `redirects()` array from `next.config.ts` and assert,
   against a fixture generated from `crawl-manifest.json`, that every row of §1 with a destination
   has both slash forms present, `permanent: true`, and the expected destination. This catches
   omissions and duplicates — the exact class of defect found in rev. 1 — at build time.
2. **Proxy matcher tests** using `next/experimental/testing/server`, documented in the proxy
   reference as available since 15.1: `unstable_doesProxyMatch({ config, nextConfig, url })` to
   assert the matcher covers each gone path and *excludes* every live route, and direct invocation
   of `proxy(new NextRequest(url))` asserting `response.status === 410`. Flagged experimental; if
   the API shifts, layer 3 is the backstop.
3. **End-to-end status assertions — the authoritative layer.** `next build && next start`, then a
   script walks all 27 legacy URLs (both slash forms) plus the §3 path classes and asserts the
   actual HTTP status and `Location` header against the table. This is the only layer that proves
   real responses, and it is the gate for launch.

**No test runner is currently installed.** Layer 3 needs only a shell script and `curl`; layers 1–2
require adding a runner. That installation is a task in `TASKS.md`, not an assumption.

---

## 3. Non-page path classes

| Path class | Count | Response | Mechanism |
|---|---|---|---|
| `/wp-content/uploads/**` — retained assets | 34 | 308 | `redirects()` → new `/assets/**` path |
| `/wp-content/uploads/**` — discarded assets | 51 | 410 | `proxy.ts` |
| `/wp-content/themes/**`, `/wp-includes/**`, `/wp-content/plugins/**` | 61 | 410 | `proxy.ts` |
| `/wp-login.php`, `/wp-admin/**`, `/xmlrpc.php` | — | 410 | `proxy.ts` — linked 6× from the legacy footer |
| `/feed/`, `/comments/feed/`, `/wp-json/**` | — | 410 | `proxy.ts` |
| `/2016/11/`, `/2017/03/` | 2 | 308 → `/` | `redirects()` |
| `/?s=` search | — | 308 → `/` | `redirects()` |
| `http://localhost/**` | 21 refs | **n/a** | Never resolved on the public domain. Not redirectable. Listed for auditability; repaired by construction. |

---

## 4. Content element migration

Every genuine content element from the audit, traced to its destination. Nothing real is dropped.

| Element | Source | Destination | Treatment |
|---|---|---|---|
| Positioning line *Premier Réseau Français d'Assistance aux passagers* | `/` H1 | `/` hero | Verbatim, display scale |
| Motto *Chaque jour, chaque nuit…* | `/` H3 | `/` hero | Verbatim |
| Group founding — 2006, 4 founders, 4 constituent companies | `/` H4 | `/a-propos` | Verbatim. Founder names pending V18 consent. |
| Staff split — 15 Paris / 25 province | `/` | `/a-propos` | **Unpublished pending V4.** Undated in the archive. |
| 4 statistics | `/` | — | **Unpublished pending V1–V4.** See §4a. |
| Culture text | `/` H3 NOTRE CULTURE | `/a-propos` | Verbatim |
| 14 French airports · 4 maritime · 6 rail · 5 border | `/` | `/couverture` + map nodes | Verbatim. Pending V9. |
| `**` footnote *PRESENT SUR AUTRES AEROPORTS…* | `/` | `/couverture` | Verbatim — it qualifies every coverage claim |
| DGAC / ADP / CCI / Vinci authorisations | `/`, `/about-us/` | `/` + `/a-propos` | Verbatim. Pending V5, V6. |
| Service families 1–4, all 19 bullets | `/services/` | `/prestations#…` | Verbatim, complete |
| Missions · Visions · 4 Valeurs · 4 Atouts | `/about-us/` | `/a-propos` | Verbatim |
| 6 client categories | `/sample-page/` | `/clients-partenaires` | Verbatim. Verified independently of the marks — they carry the page. |
| 34 client marks | `/sample-page/` | **stays in `reference/`** | See §5. Not copied to `public/` until individually approved. |
| Quote form fields | `/flightshotel/` | `/devis` | Field set migrates verbatim; see §4b for the interaction change. |
| Address, email, OPS, tel, fax | `/contact/` | `/contact` + footer + drawer | Verbatim. Numbers become `tel:` links. Pending V10. |
| CGV clauses A–I | `/condition-generale/` | `/conditions-generales` | Verbatim, anchored. Pending V11–V13. |
| Twitter, LinkedIn | footer | Footer | Pending V15 |
| `© 2017 SAS DIGIAPP` | footer | Footer | **Not carried forward as-is.** Pending V14. |

### 4a. The four statistics — unpublished until verified

**No reporting year is assigned to any statistic.** The archive establishes none: the capture date
(2026), the upload directory (`2017/05/`) and the footer copyright year (2017) are properties of
files and pages, not of the measurements. Labelling them *"chiffres 2017"* would assert a
reporting year the archive does not support, which is the same class of error as inventing the
figure.

Handling, per correction 3:

- The four figures live in `src/content/stats.ts` with `status: 'unverified'` and **no year field
  invented**. Verbatim source strings are retained so nothing is lost.
- **Unverified statistics are excluded from public output.** No component renders them. There is no
  "chiffres 2017" label and no placeholder year anywhere in the UI.
- `StatFigure` accepts only entries with `status: 'verified'` plus an owner-supplied
  `reportingYear` and `basis` (annual | cumulative). The type makes the unverified case
  unrenderable rather than relying on discipline.
- The home and `/a-propos` layouts are composed so the statistics band is **optional** — the pages
  read as complete without it. It is not a hole waiting to be filled.
- When the owner verifies a figure, publishing it is a data edit, not a layout change.

### 4b. The quote form — no false submit affordance

Per correction 9, while no backend exists the form does **not** present a normal submit-then-success
interaction. See `REQUIREMENTS.md` D4 (rev. 2) and `TASKS.md` T14 for the designed behaviour:
online submission is visibly marked unavailable and the working telephone and email actions are
given primary weight. There is no simulated success state.

### Content deliberately not carried forward

3 YouTube links (V16) · FedEx Germany link (V17) · 16 social share endpoints incl. defunct Google
Plus · `mailto:youremail@address.com` · 317 bare `#` links · 3 newsletter signups · WP search,
comments and feeds.

---

## 5. Asset migration — verification gate

**Correction 8 governs this section.** `reference/` is read-only and remains the holding area.
**No mark and no photograph enters `public/` or the content data layer until it is individually
approved by the owner.**

### 5a. Approved for `public/` now

| New path | Source | Basis |
|---|---|---|
| `public/brand/logo-aeroports-services.png` | `brand/logo-aeroports-services.png` | The company's own mark. **Unmodified**, 184×72. |
| `public/brand/logo-aeroports-services-150x72.png` | `brand/…-150x72.png` | Favicon source. Unmodified. |

That is the entire list. Everything else waits.

### 5b. Held in `reference/` pending individual approval

| Asset group | Count | Gate | Why held |
|---|---|---|---|
| Client marks | 34 | **V7 / B3** — per-mark written approval | Third-party trademarks implying live commercial relationships. 5 known stale (Carlson Wagonlit → CWT 2019, HRG acquired 2018, Havas, Selectour, Air France wordmark). |
| Partner marks | 4 | **V7 / V8** | Includes `brokair.jpg`, whose contents are The Aviation Factory's mark, not Brokair's. |
| `430.jpg`, `PHOTOAS1`, `PHOTOAS11` | 3 | **V20** — rights and provenance | No EXIF authorship, credit or licence evidence in the archive. Suitable on quality grounds; ownership unestablished. |
| `PHOTOAS6.jpg` | 1 | **V20** + location identification | Terminal architecture does not match any airport on the coverage list. |
| `PHOTOAS2/3/12/14` | 4 | — | Rejected on quality grounds regardless of rights. Not proposed for use. |

**Mechanism.** `src/content/clients.ts` carries every mark with `approved: false` and **no image
path**. A mark cannot reference a file that is not in `public/`, so an unapproved mark cannot render
even by mistake. Approval is a two-step commit: copy the file to `public/`, flip the flag. The
build fails if a mark has `approved: true` and no resolvable asset.

**Design consequence, already absorbed.** `ClientWall` reads correctly from roughly 12 marks
upward and the six verified categories carry the page structure on their own — so
`/clients-partenaires` ships and reads as finished with zero marks cleared, and improves as they
land. It is not blocked on B3.

**Not migrated at all:** 13 Kallyas placeholders, 100 remote `sample-data.kallyas.net` references,
2 gravatars, `passenger-train-front-view-2.png` (74×96), and `carte-as.png` (346×306) — the
coverage map is drawn fresh as inline SVG. *That is a new asset, not a modification of the logo;
instruction 1 does not apply to it.*

**Alt text:** every published image needs new alt text. The archive supplied 27 useful attributes
across 329 tags and all 27 were the logo.

---

## 6. Verification register

20 items from the audit, plus one raised during IA. **These are verification items for the owner or
qualified counsel — not findings, conclusions or advice.**

| # | Item | Blocks |
|---|---|---|
| V1–V4 | The four statistics: reporting year and basis unknown for each | Publication of any figure — held unpublished per §4a |
| V5–V6 | DGAC / ADP / CCI / Vinci authorisations current | Launch |
| V7 | 34 client + 4 partner marks; 5 known stale | Marks entering `public/` |
| V8 | `brokair.jpg` contains The Aviation Factory's mark | The Brokair category |
| V9 | Coverage lists still accurate | `/couverture` |
| V10 | Contact details, incl. `.com` email against a `.fr` site | Launch |
| V11 | IBAN/BIC republication — owner and counsel judgement | `/conditions-generales` |
| V12 | 12% late-payment clause and Art. L441-6 reference — **counsel** | `/conditions-generales` |
| V13 | 20% VAT clause and its footnote — **counsel or accountant** | `/conditions-generales` |
| V14 | `© 2017 SAS DIGIAPP` — current operating entity | Footer |
| V15 | Twitter / LinkedIn accounts active | Footer |
| V16 | 3 YouTube videos | Nothing — dropped |
| V17 | FedEx link | Nothing — dropped |
| V18 | Founder names — consent to publish | `/a-propos` |
| V19 | **`mentions légales` content** — publisher identity, SIRET/RCS, capital, publication director, host. Absent from the entire archive. **Whether and in what form this is required is a question for counsel**; this plan records only that the archive contains none. | Reserved route |
| V20 | **Photography rights and provenance** — no EXIF authorship, credit or licence evidence for any of the 8 files. Also identify the airport in `PHOTOAS6.jpg`. | Photography entering `public/` |
| SEC1 | Two exposed Google Maps API keys — rotate and restrict | Independent of the redesign |
| SEC2 | Confirm intent to republish bank coordinates | `/conditions-generales` |
