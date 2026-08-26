# Content audit — aeroports-services.fr archive

Phase 0 of the design flow. Source of record: `reference/original-aeroports-services/inventory/CONTENT_REPORT.md`
(5,756 lines) and `inventory/crawl-manifest.json` (2.04 MB). Capture date 25 August 2026.

Nothing in the archive was modified. Every figure below was derived programmatically from the
manifest and cross-checked against the readable report.

---

## 1. Coverage ledger

Every captured entity, counted and dispositioned.

| Entity | Captured | Accounted for | Method |
|---|---|---|---|
| Pages | 27 | 27 | All HTTP 200. Per-page census in §2 — **7 genuine + 6 demo-content + 14 demo/archive = 27**, reconciled programmatically against `crawl-manifest.json`. |
| Sitemap seed URLs | 27 | 27 | 1:1 with pages; no seed unresolved. |
| Text blocks | 27 page bodies | 27 | Every page's `text` read; boilerplate separated from unique content. |
| Headings | 375 | 375 | Counted per page; genuine vs. demo classified in §2. |
| Image tags | 329 (72 unique URLs) | 72 | Classified in §4. |
| Logos | 1 unique (`logo-aeroports-sevices.png`) | 1 | Present on all 27 pages. |
| Links | 1,069 (57 unique internal + 54 external) | 111 unique | Classified in §5. |
| Forms | 15 | 15 | Enumerated in §6. |
| Metadata entries | 438 (23 distinct keys) | 438 | Enumerated in §7. |
| Legal items | 1 page, 9 clauses (A–I) | 9 | Enumerated in §8. |
| Same-origin assets | 133 | 133 | 72 image / 35 stylesheet / 16 script / 7 font / 3 other. All HTTP 200. |
| Linked non-page downloads | 34 | 34 | 32 JPEG + 2 PNG; all gallery/client-logo full-size targets. |
| External URLs | 54 | 54 | Classified in §5. |
| Unresolved `localhost` images | 13 | 13 | Listed in §4. |
| Inline SVGs | 27 | 27 | All on demo/archive pages (theme decoration); none carries business content. |

**Nothing in the capture is unaccounted for.**

---

## 2. Page census and classification

`txt` = characters of rendered text. `uniq` = non-boilerplate lines (nav/footer removed).

### 2a. Genuine business pages (7)

| Page | URL | txt | Headings | Verdict |
|---|---|---|---|---|
| Accueil | `/` | 3,289 | 16 | **Real.** Group history, founders, stats, culture, coverage lists. |
| Prestations | `/services/` | 1,141 | 10 | **Real.** Four service families, fully itemised. |
| Equipe | `/about-us/` | 2,119 | 18 | **Real.** Missions, vision, values, atouts, DGAC agrément. |
| Clients / Partenaires | `/sample-page/` | 313 | 8 | **Real but thin.** 6 category headings + 34 client logos, zero prose. |
| Contact | `/contact/` | 442 | 7 | **Real.** Address, email, 3 phone/fax numbers, form. |
| Conditions générales | `/condition-generale/` | 4,558 | 2 | **Real.** 9 legal clauses incl. bank details. |
| Demande de devis | `/flightshotel/` | 324 | 2 | **Real structure, no prose.** The quote form — Civilité, Nom, Prénom, Email, Tel portable, Date du voyage, Message. Legacy slug is a Kallyas artifact ("Flights+Hotel"); the *form* is the business's real quote intake. Reachable only via `http://localhost/…` links, so no public visitor could ever load it. |

### 2b. Business-titled pages whose content is demo residue (6)

These sit in the current navigation or sitemap under credible names but contain no Aéroports
Services content. Instruction 3 applies: the *page* is obsolete, but check each for unique content
before dropping. Result of that check is in the last column.

| Page | URL | What it actually contains | Unique real content? |
|---|---|---|---|
| Galerie | `/gallery/` | "63 LARGE & COMFORTABLE ROOMS", hotel-room copy; 10× `kallyas_sample.png` | **None** |
| Notre flotte | `/our-fleet/` | "Kallyas Cargo" testimonials (Marry M. Keller, Darren Lawrence), BROCHURE 01.pdf, lorem | **None** |
| Notre histoire | `/our-history/` | Timeline 2000–2014 with lorem ipsum; "150 VEHICLES ON OUR FLEET" | **None** — and it contradicts the real 2006 founding date on Accueil |
| Carrières | `/careers/` | 5 lorem job posts (Cargo Commercial, Cargo Operations, Corporate Services, Cargo Marketing, Cargo Business Development) | **None** |
| Couverture géographique | `/global-coverage/` | Corporate-ipsum paragraph + 80-country worldwide list | **None** — and it contradicts the real French-network coverage on Accueil |
| Homepage (legacy) | `/homepage/` | "start a blog, sell shit online" developer-pitch demo copy | **None** |

> The real coverage data lives on **Accueil**, not on `/global-coverage/`. The real founding
> history lives on **Accueil**, not on `/our-history/`. Both demo pages can be retired without
> content loss, but the *topics* deserve real pages — see the IA phase.

### 2c. Theme demo, WordPress archive and placeholder pages (14)

Scanned all 15 for the markers `AEROPORTS SERVICES`, `Aéroport`, `assistance aux passagers`,
`DGAC`, `Chilly`, `Raspail`, `resaparis`, founder surnames, `Orly`, `Roissy`, `passagers`.
**Zero markers matched in any of the 15.** No unique business content to rescue.

| Page | Content |
|---|---|
| `/agency/` | "DISCOVER BOTSWANA" safari demo |
| `/alternative/` | "SANTORINI SUITES" hotel demo |
| `/multiple-rooms-booking/` | "SANTORINI SUITES" room booking demo |
| `/portfolio/`, `/portfolio/portfolio-1-2/` | Empty theme portfolio scaffolding |
| `/project_category/category/` | Empty taxonomy archive |
| `/category/logistic/`, `/category/uncategorized/` | WP category archives over the lorem posts |
| `/author/aeroports-services/` | WP author archive |
| `/hello-world/` | WP default first post |
| `/quickly-myocardinate-enterprise-wide/` | Lorem post, 10 Nov 2016 |
| `/distinctively-promote-real-time-strategic-theme-areas/` | Lorem post, 14 Nov 2016 |
| `/seamlessly-initiate-distinctive-niches-without/` | Lorem post, 14 Nov 2016 |
| `/continually-engage-distributed-infrastructures/` | Lorem post, 14 Nov 2016 |

---

## 3. The real content, extracted

Everything below is verbatim fact from the archive. Nothing here is invented; nothing is rewritten.

### Identity
- Legal/site name: **AEROPORTS SERVICES** (logo wordmark: *AÉROPORTS SERVICES*)
- Positioning line: **"Premier Réseau Français d'Assistance aux passagers"**
- Motto: **"Chaque jour, chaque nuit, partout en France le service est notre métier, le sourire du passager notre satisfaction."**
- Footer attribution: *Copyright © 2017 SAS DIGIAPP — All rights reserved.*

### Group history (Accueil)
Founded **2006** by **Sami BEN RABIAA** (Air Assistance Service), **Eric LARROQUE**,
**Michael LEONARDO** and **Alexandre ROSSI** (ARC). Built from: Air Assistance Services (est. 1999),
ARC (est. 2000), acquisition of **ASSIST CONCEP** Lyon (est. 1991 by **Gilbert LAINE**), acquisition
of **Bienvenue Airport Services** (est. 2006, groupe Avico). Structure: **15 employees in Paris,
25 in the regions**.

### Stated figures (Accueil)
| Figure | Claim |
|---|---|
| 1.8 MILLIONS | passengers served |
| 20 | airports covered |
| + 40 000 | assistances |
| 40 | collaborators |

### Services taxonomy (Prestations) — four families
1. **ASSISTANCE AUX PASSAGERS** — departure/arrival/transit reception at airports and stations; ticket and travel-document handover; check-in formality assistance; baggage irregularity handling; VIP handling; disruption management (delay, reprotection).
2. **REPRÉSENTATION AÉROPORTUAIRE** — travel agencies / tour operators / coach operators; representation with airport stakeholders (ADP, CCI, airlines); group reception and handling; charter flight management.
3. **COMPAGNIES AÉRIENNES – BROKERS** — station set-up; procedure control and application; flight management and passenger supervision; ramp, PNT/PNC reception; quality audit.
4. **FORCE DE VENTE CONSEIL** — trust relationship; relational follow-up; active listening; methods SPANCO / SONCAS / CAP / SIMAC.

### Coverage (Accueil — the authoritative list)
- **Aéroports français**: Orly, Roissy, Le Bourget, Lyon, Bordeaux, Nice, Marseille, Toulouse, Mulhouse, Nantes, Metz, Strasbourg, Lille, Brest
- **Gares maritimes**: Le Havre, Monaco, Marseille, Cherbourg
- **Gares ferroviaires**: Gare du Nord, de l'Est, de Lyon, d'Austerlitz, de Bercy, Montparnasse
- **Aéroports limitrophes**: Bruxelles, Francfort, Bâle, Genève, Zurich
- Footnote: `** : PRESENT SUR AUTRES AEROPORTS ET/OU GARES SUR DEMANDE`

### Authorisations (Accueil + Equipe)
Holds **DGAC** (Direction Générale de l'Aviation Civile) authorisations for national station
assistance, plus activity authorisations from French airport operators (**ADP, CCI, Vinci, etc.**).
Access to public and restricted airport zones.

### Contact block (Contact + CGV)
| Field | Value |
|---|---|
| Siège social | 2 Rue Emile Raspail, 91380 CHILLY MAZARIN |
| Email | resaparis@aeroports-services.com |
| OPS 7/7 | +33 (6) 60 47 59 16 |
| Tél | +33 (0) 1 81 87 17 02 |
| Fax | +33 (0)1 75 83 43 14 |
| Twitter | https://twitter.com/AEROPORTSERVICE?lang=fr |
| LinkedIn | https://www.linkedin.com/company-beta/2825395/ |

> Note the email domain is **.com** while the website is **.fr**.

### Client / partner roster (Clients-Partenaires, 6 categories, 34 marks)
| Category | Marks identified from the captured images |
|---|---|
| Autocaristes (A1–A6) | Girardot Voyages, Dunois (Groupe RATP), Michel Voyages, Richou, Voyages Rive Gauche, Simplon Voyages |
| Réseaux (R1, R2, 02) | Havas Voyages, Selectour, Air Partner |
| Compagnies Aériennes (CA1–CA6) | Nouvelair, Air France, Air Caraïbes, American Airlines, AtlasJet, Corsair |
| Événementiel (E1–E5) | Publicis Groupe, HRG, Tapis Rouge, Connect Factory, Ourbook |
| Groupistes (G1–G9) | Pangaea Voyages, CE Evasion, Sea Voyages, Ambiances Vacances, Capitales Tours, Pangaea Sports, Amplitudes, SPVA, Le Monde en Direct |
| Brokair | *(file `brokair.jpg` actually shows **The Aviation Factory / Aviation Factory France**)* |
| Separate `partners/` set | Air Charter Service (ACS), PRO SKY, Carlson Wagonlit Travel, "brokair" (= Aviation Factory) |

### Legal — Conditions générales, clauses A–I
A) Commande de service (24h booking rule; under 24h requires phone then mail/fax confirmation) ·
B) Annulation (cancellation <24h billed; optional cancellation insurance) ·
C) Conditions tarifaire (prices include VAT) ·
D) Modalités de règlement (cheque or transfer; **full bank coordinates published**: Code banque
30004, guichet 00725, compte 000100473147, clé 66, IBAN FR76 3000 4007 2500 0100 4731 766,
BIC BNPAFRPPXXX) · E) Délais de règlement (payable on receipt) · F) Contestation (30 days) ·
G) Retard de paiement (**12%** late interest, Art. L441-6 Code de commerce; acceleration clause;
contract resolution; general provisions) · H) Droit de propriété intellectuelle ·
I) Droit applicable (French law, courts of the registered office) ·
Footnote: **VAT rate applied 20%**.

---

## 4. Image inventory — 72 unique URLs

| Class | Count | Disposition |
|---|---|---|
| **Brand logo** | 1 | `logo-aeroports-sevices.png` (184×72) + `-150x72` favicon variant. Keep — see §9. |
| **Client/partner marks** | 34 | Real, reusable subject to §9 verification. |
| **Operational photography** | 8 | See caveat below. |
| **Coverage map** | 1 | `2017/06/carte-as.png`, **346×306 px** — too small for any modern layout. |
| **Pictogram** | 1 | `2017/04/passenger-train-front-view-2.png`, 74×96. |
| **Kallyas theme placeholders** | 13 | `kallyas_placeholder*.png` — archive artifacts, discard. |
| **Remote theme demo images** | 100 tags | `sample-data.kallyas.net` / `kallyas.net` — never self-hosted, discard. |
| **Gravatar** | 2 | WP author avatar, discard. |
| **Broken `localhost` refs** | 13 | Unresolvable; listed below. |

### Operational photography caveat — material finding

The eight `PHOTOAS*` / `430.jpg` files were inspected visually. The **What it shows** column
describes the image; the **Suitability** column is a design judgement about fitness for this
redesign. Neither column asserts ownership — see the provenance note below.

| File | Resolution | What it shows | Suitability |
|---|---|---|---|
| `430.jpg` | 2000×1333 | Ground handler walking beside aircraft airstairs | Strongest in the set — subject matches the business exactly |
| `PHOTOAS1.jpg` | 1204×824 | Terminal silhouette at sunset, backlit passengers | Usable as supporting texture; lowest resolution of the four |
| `PHOTOAS11.jpg` | 2074×1383 | Departures hall, travellers with luggage, motion blur | Usable as supporting texture |
| `PHOTOAS6.jpg` | 2063×1375 | Large airport at night, wide exterior | **Location not identified.** The terminal architecture does not match any airport on the coverage list. Using it to illustrate a French network would make an unsupported claim. |
| `PHOTOAS2.jpg` | 2160×1292 | Suited man + "Concept" circle diagram, AS logo overlaid | Unsuitable — composite graphic, not photography of the operation |
| `PHOTOAS3.jpg` | 4963×3509 | "SERVICE / QUALITY / PERFORMANCE" chalk word-cloud | Unsuitable — illustration |
| `PHOTOAS12.jpg` | 2160×1440 | Plane + train + bus + luggage on a globe, AS logo overlaid | Unsuitable — composite graphic |
| `PHOTOAS14.jpg` | 2496×1312 | "VISION MISSION GOAL STRATEGY ACTION PLAN" dial | Unsuitable — illustration |

> **Ownership and provenance of the available photography are unverified.** None of these files
> carries EXIF authorship, a credit line, a licence record or any other evidence in the archive
> that establishes who shot them or under what terms. Four are visually consistent with commercial
> stock or clip-art libraries; the archive does not confirm this either way. What can be stated is
> narrower and sufficient for planning: **the redesign cannot rely on this imagery until the owner
> confirms rights and provenance**, and four of the eight are unsuitable on quality grounds
> regardless of who owns them. This is question Q3 in the grill phase, and verification item
> **V20**.

### The 13 unresolved `localhost` image references
`2016/06/icon1–icon6.png` (6) · `2016/10/kallyas_placeholder.png` · `2016/12/kallyas_placeholder.png` ·
`2016/11/33-40x40.jpg` · `2016/11/81-40x40.jpg` · `sites/35/2016/11/ph.png` ·
`2017/07/JANCARTHIER.png` · `2017/05/PHOTOAS1.jpg` (https variant).

Of these, **only two matter**: `JANCARTHIER.png` is a client mark that never renders (a 35th client
lost to the broken path), and the `PHOTOAS1` https-localhost variant duplicates a file we already
hold. The rest are theme icons and placeholders.

### Alt-text finding
**27 of 329 image tags carry alt text — and all 27 are the same logo.** Every other image on the
site, including all 34 client marks and all operational photography, ships with `alt=""`.
The redesign starts from zero usable alt text; all of it must be written.

---

## 5. Link inventory

### Internal (57 unique)
22 point to real pages, 4 to WordPress feeds/archives (`/feed/`, `/comments/feed/`, `/2016/11/`,
`/2017/03/`), 6 to `wp-login.php`, and 30 direct to upload JPEGs (the client-logo lightbox targets).

### Broken and placeholder — the operative finding
| Kind | Count | Detail |
|---|---|---|
| Bare `#` links | **317** | Every social icon, "HAUT" back-to-top, and several nav items resolve to nothing. |
| `localhost` page links | **56** | `flightshotel` ×28, `condition-generale` ×27, `contact` ×1 |
| Placeholder mailto | 1 | `mailto:youremail@address.com` — never replaced |
| `tel:` links | **0** | Three phone numbers exist as plain text only; none is dialable. |

> **The two most commercially important destinations on the site are unreachable.** Every
> "DEMANDER UN DEVIS" / "FAIRE UNE DEMANDE" button on every page points at
> `http://localhost/aeroports-services.fr/flightshotel/`, and every footer "Conditions générales"
> link points at `http://localhost/aeroports-services.fr/condition-generale/`. A public visitor
> cannot reach the quote form or the terms of sale by clicking.

### External (54 unique)
| Group | Count | Keep? |
|---|---|---|
| Real business profiles | 2 | Twitter `@AEROPORTSERVICE`, LinkedIn `company-beta/2825395` (deprecated URL form) |
| FedEx Germany | 1 | `http://www.fedex.com/de/` — unexplained, appears on a demo page |
| YouTube videos | 3 | `_ptePcnGEHs`, `tYgnc4hHdGo`, `wD0Xiq9aWQQ` — provenance unverified |
| Social share endpoints | 16 | Facebook/Twitter/Pinterest/**Google Plus** (defunct since 2019) — all on lorem posts |
| Kallyas demo host | 5 | Discard |
| `localhost` | 15 | Discard/repair |
| Google Fonts / Maps / reCAPTCHA | 6 | Open Sans + Montserrat; **two different exposed Maps API keys**; reCAPTCHA |
| Gravatar, WordPress.org | 6 | Discard |

> **Security flag:** two Google Maps JavaScript API keys were exposed in the archived page
> source. Their values are intentionally omitted from this audit and must not be copied into
> the redesign. They should be revoked/rotated and HTTP-referrer restricted in Google Cloud
> regardless of what the redesign does.

---

## 6. Forms — all 15

| Form | Page | Action | Verdict |
|---|---|---|---|
| Demande de devis | `/flightshotel/` | `#` | **Does not submit.** Fields: Civilité (Mr/Mme), Nom, Prénom, Email, Tel portable, Date du voyage, Message. No field is `required`. |
| Contact | `/contact/` | `#` | **Does not submit.** Fields: Name, Email, Phone, Message. No field is `required`. |
| Demo contact | `/homepage/` | `#` | Demo page — discard |
| Newsletter ×3 | careers, our-fleet, our-history | self-post | Demo pages — discard, but see Q5 |
| WP search ×8 | archive/lorem pages | GET `/?s=` | Discard |
| WP comment ×1 | `/hello-world/` | wp-comments-post | Discard |

> **Neither business form has a working destination and neither validates a single field.** The
> site is currently incapable of receiving a quote request. Contact-Form-7 and reCAPTCHA are loaded
> on every page but are not wired to these forms.

---

## 7. Metadata — 438 entries, 23 distinct keys

Constant across all 27 pages: `charset=UTF-8` · `robots=index, follow, max-image-preview:large,
max-snippet:-1, max-video-preview:-1` · `og:locale=fr_FR` · `og:site_name=Aeroports-Services` ·
`twitter:card=summary_large_image` · `twitter:widgets:csp=on` · `viewport=width=device-width,
initial-scale=1, maximum-scale=1` · `msapplication-TileImage`= the 184×72 logo ·
`generator`= WordPress 7.1 + Elementor 4.2.3.

**`theme-color = #0d5195` on all 27 pages.** This is a third documented blue, distinct from the two
in the logo file — reconciled in the tokens phase.

Per-page: `og:title` ×27, `og:url` ×27, `og:description` ×22 (5 missing), `og:image` ×5,
`article:published_time` ×5, `article:modified_time` ×1, `author` ×5, `twitter:label1`/`data1` ×5.

Issues carried forward: `maximum-scale=1` **blocks pinch-zoom** (WCAG 1.4.4 failure); `og:description`
values are single words ("Home", "Services"); no `description` meta on any page; no structured data.

---

## 8. Facts flagged for owner verification

Per instruction 5, none of these is rewritten — each needs the owner's answer before it ships.

| # | Item | Why it is doubtful |
|---|---|---|
| V1 | 1.8 million passengers | **Undated.** The archive establishes no reporting year for this figure. The capture date (2026), the upload directory (`2017/05/`) and the footer copyright year (2017) are all properties of *files and pages*, not of the measurement — none of them dates the statistic. Reporting year and basis (annual / cumulative) both unknown. |
| V2 | 20 airports covered | Accueil's own list names **14** French airports, plus 4 maritime terminals, 6 rail stations and 5 border airports. The stated count and the stated list are not obviously reconcilable. Undated, like V1. |
| V3 | +40 000 assistances | **Undated.** Per year or cumulative is unstated, and the archive supplies no reporting year. |
| V4 | 40 collaborators | Internally consistent with the "15 Paris + 25 province" split stated on the same page. **Neither figure carries a date in the archive.** |
| V5 | DGAC authorisation | Must still be valid and correctly named. |
| V6 | ADP / CCI / Vinci authorisations | Airport operators have changed since 2017. |
| V7 | 34 client logos | Trademarked third-party marks implying live commercial relationships. Several are stale brands: **Carlson Wagonlit** → CWT (2019), **HRG** → acquired by AmEx GBT (2018), **Havas Voyages** ownership changed, **Selectour** rebranded, **Air France** wordmark updated. Written permission per mark should be confirmed. |
| V8 | `brokair.jpg` = Aviation Factory | Filename and content disagree. Which company belongs in the "Brokair" category? |
| V9 | Coverage lists | 14 airports / 4 ports / 6 stations / 5 border airports — still accurate? |
| V10 | Contact details | Address, three numbers, and the `.com` email against a `.fr` site. |
| V11 | Bank coordinates in CGV | Full IBAN and BIC appear on a public page. **Whether to republish them is a commercial and legal judgement for the owner or their counsel** — this audit records the fact and takes no position on the risk. Confirm intent before republication. |
| V12 | 12% late-payment interest | The clause cites a fixed 12% rate and Art. L441-6 of the Code de commerce, unchanged since the 2017-era capture. **Whether the rate and the article reference remain correct is a question for qualified counsel** — this audit does not assess compliance, only that the clause has not been revisited. |
| V13 | 20% VAT | The clause states 20% with a footnote anticipating legislative change. **Confirm with counsel or the accountant** that the rate and the footnote's wording remain correct for the services billed. |
| V14 | © 2017 SAS DIGIAPP | Is DIGIAPP still the operating entity? Which legal entity owns the new site? |
| V15 | Twitter / LinkedIn | `company-beta/` is a deprecated LinkedIn URL form; both accounts need activity confirmation. |
| V16 | 3 YouTube videos | Provenance and ownership unverified. |
| V17 | FedEx Germany link | Unexplained relationship. |
| V18 | Founder names | Four named individuals plus Gilbert LAINE. Confirm current consent to publish personal names. |
| **V20** | **Photography rights and provenance** | None of the 8 image files carries EXIF authorship, credit or licence evidence in the archive. Confirm who owns each image and on what terms before any of it is published. Also identify the airport in `PHOTOAS6.jpg`. |

---

## 9. Logo — planning-stage position

Per instruction 1, the original PNG is used as-is throughout planning. **No redraw, vectorisation,
recolour or knockout has been produced.** Measured facts only:

- `brand/logo-aeroports-services.png` — 184 × 72 px, RGBA, 9,470 of 13,248 pixels fully transparent.
- Palette: **`#0180B9`** (primary blue, 1,463 px) · **`#004A7F`** (deep blue, 313 px) ·
  **`#000000`** (the word *SERVICES*, 453 px) · plus antialiasing tones `#1B6EB0`, `#1C6FB0`, `#2072B1`.
- Composition: stylised aircraft-tail glyph forming the **A**, "ÉROPORTS" in blue, "SERVICES" in black.

Two constraints follow, stated as **proposals requiring approval**, not decisions:

- **P1 — Resolution.** 184 px cannot serve a modern header, retina display, favicon set, or social
  card. *Proposal:* redraw faithfully as SVG from the original outlines. Requires approval.
- **P2 — Dark surfaces.** The word "SERVICES" is pure black and disappears on any dark background.
  If the tokens phase selects a dark default, a light-surface variant is unavoidable.
  *Proposal:* either a knockout rendering, or reserve a light plate behind the logo in the header.
  Requires approval. Choosing a light default theme avoids the problem entirely — question Q2.

---

## 10. Migration inputs

All 27 URLs are carried into `CONTENT_MIGRATION_MATRIX.md` in Phase 3 with a proposed disposition
(keep / merge / retire+redirect) and a target route. No URL is dropped from that matrix.

## 11. Open questions for the grill phase

Q1 language · Q2 default theme · Q3 photography · Q4 quote-form destination · Q5 retired-topic pages ·
Q6 client-logo clearance. Carried into `REQUIREMENTS.md`.
