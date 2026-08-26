# Visual Directions — decided

> ## ▶ PHASE V-BIS BUILT — awaiting approval
>
> Direction A is the selected direction. **Phase V and the Phase V-bis corrections are
> built**: `src/app/page.tsx` plus `SiteHeader`, `MobileNav`, `ThemeToggle`, `ServiceScene`,
> `NetworkMap` and `Reveal`. One route (`/`), no other pages.
>
> **Theme (owner decision A14, supersedes condition 2 and D2):** light is the first-visit
> default whatever the operating system prefers. Priority is `?theme=` > stored choice >
> light. `prefers-color-scheme` is not consulted. Scenes stay dark in both themes.
>
> **What was wrong with rev. 2's styleframes:** France was a hand-drawn polygon; only 20 nodes were
> rendered against a claimed 29; the category distribution did not match 14/4/6/5; the service
> stack was unreadable decorative rectangles; the hero used the generic centred-headline-plus-two-
> pills composition; the logo was a postage stamp; the document had no charset declaration.
>
> **Rev. 3 corrected the geometry** — see `MAP_GEOMETRY.md`. Rev. 4 (Phase V-bis) corrected the
> build: real sticky header, mobile drawer, 18 cluster controls with visible focus, the genuine
> sub-768px map swap, scene-local contrast tokens, and the light-default theme.
>
> ## Direction A «Nuit» — selected conceptual direction; Phase V-bis prototype built
>
> Selected as the visual direction, **subject to eight conditions**. This is **not** approval of the
> styleframes as a final design, and **not** authorisation to build the complete site beyond this
> reviewable Phase V-bis prototype.
>
> **Condition 2 overrides this document's coupling of direction to theme.** Direction A no longer
> implies a dark default:
> - **Light is the site's initial default theme**, with a clearly visible toggle to dark.
> - Manual preference persists; no flash of the wrong theme on load.
> - **Direction A's cinematic scenes stay dark and atmospheric in both themes** — they are
>   constants, not theme-dependent surfaces. In light they are staged insets; in dark they merge
>   with the ground.
>
> Other conditions: valid UTF-8 standalone styleframes (done); `ThemeToggle` moved into Phase V/V2
> and present in every screenshot; the logo used unmodified but **legible and properly
> proportioned**, with a light supporting surface permitted in dark scenes; the hero composition
> **refined away from the centred-headline-plus-two-pills pattern** toward an asymmetric
> aviation/operations composition; the map built with the **real 29 locations**, perspective for
> the hero but accuracy and legibility prioritised for interactive coverage, flattening to a
> complete list on mobile, keyboard difficulty or reduced motion; and validation at 1440 and 375
> in light, dark and reduced-motion.
>
> Sections below are retained as the record of the choice. Where this document says Direction A
> means a dark default, **condition 2 supersedes it**.

---

# Visual Directions — the two candidates

New deliverable, rev. 2. Required by correction 5. The owner picks **A** or **B**; that choice also
settles the theme default (correction 6), which rev. 1 wrongly recorded as already decided.

Both directions share, without negotiation: the aviation-blue identity derived from the logo's own
measured colours, airport-signage discipline in the information layer, the network map as the
signature element, the canonical contrast figures in `DESIGN_BRIEF.md`, and full operational
accessibility. Both are designed in light **and** dark; the difference is which is default and how
the cinematic register is distributed.

Neither copies VIP Chauffeur's emerald, monogram, name, copy, client logos, vehicles, service
taxonomy or exact compositions. What is taken is method: scroll-led scene sequencing, layered
entrance reveals, edge-anchored light staging content, a persistent contact affordance, and motion
concentrated in high-impact moments.

Styleframes: `styleframes.html` in this folder (published as an artifact for review).

---

# Direction A — «Nuit» · Dark cinematic aviation

**Default dark, light alternate.** The register of an operations room at night: instrumentation,
depth, and light that means something.

### Hero composition
Full-viewport dark stage. **The map is the hero, rendered as a perspective plane** — France tilted
back roughly 55° and receding toward a horizon, its outline drawn in thin luminous blue, each of
the 29 network points rising off the plane as a short vertical light column. The horizon carries a
soft blue glow; the plane fades into it.

The positioning line sits above the plane in oversized expanded Archivo, white, with the motto
below in mono. Two actions, ranked: solid blue *Demander un devis*, ghost *Voir la couverture*.

The composition is native to the subject — it reads as an air-traffic display or an approach chart,
not as a product on a plinth. That distinction matters: it is what keeps this from being VIP
Chauffeur's vehicle stage with a map substituted in.

### Typography
Display Archivo `wdth` 118 / `wght` 700, up to 132px, tracking −0.03em, pure white. Eyebrows in IBM
Plex Mono, uppercase, `0.2em` tracking, in `#6ECDF7`. Body Archivo `wdth` 100 / 400 in `#E8EDF2`
(16.74:1). Data and coordinates in Plex Mono with tabular figures. Scale contrast is extreme by
design: 132px display against 17px body.

### Lighting
A volumetric wash from upper-left, falling across the map plane. Node glow: each point is a small
radial bloom plus its light column. A horizon band behind the plane. A vignette closing the frame.
Film grain at ~3% to stop the gradients banding and to give the dark ground a physical quality.
Light is authored per scene and static — no cursor tracking.

### Service presentation
**A depth stack.** The four families are z-ordered panels: the active one forward at full scale and
opacity, the other three receding behind it at 0.94 / 0.90 / 0.86 scale with progressive blur and
dimming. Advancing deals the stack forward. Each panel carries a lit top edge and its own itemised
list.

Deliberately *not* a horizontal rotating carousel with vertical labels — that is the reference's
exact composition. A depth stack is dimensional in a different axis and reads as a set of briefing
cards rather than a showroom.

### Map treatment
Hero: the perspective plane described above. `/couverture`: the same geometry rotated to near
top-down for full label legibility, all 29 nodes labelled, four category filters. Ignition animates
by category wave (airports → maritime → rail → border). Hovering or focusing a node raises its
column, brightens it, and dims siblings to 40%.

### Motion behaviour
Scroll-driven scene transitions — sections arrive as camera moves rather than as fades. Parallax
across three depth planes (light, map, type). Node ignition once. Route changes use view
transitions. Slow ambient drift on the hero plane. Motion is concentrated: the hero, the map, and
the service stack. Everything else is still.

**Under `prefers-reduced-motion`: parallax off, drift off, ignition off, transitions off, map
renders fully drawn.** Not reduced — switched off. This is a gate on the direction, not a footnote.

### Header and logo
Floating translucent dark pill with backdrop blur, condensing on scroll. The **unmodified PNG logo
sits on a light plate** — a small `#FAFAFA` rounded rectangle. This is a surface decision, not a
logo edit: instruction 1 holds and no approval is blocked. Nav in Archivo 500; primary action a
solid `#24B7F9` pill.

### Trade-offs
Strongest expression of what the reference was selected for. Highest motion budget and the most
demanding reduced-motion and keyboard work. Reading-heavy pages are weaker in dark — mitigated
below. The light alternate is real design work rather than a token flip.

---

# Direction B — «Jour» · Light editorial document, cinematic dark scenes

**Default light, dark alternate.** The register of a well-made technical document, punctuated by
three moments of full cinema.

### Hero composition
Light ground `#FAFAFA`. Asymmetric editorial split: seven columns of oversized expanded Archivo
headline in near-black, over a thin blue rule and a mono eyebrow; five columns holding **the map as
a precise flat schematic** — hairline outline, solid blue nodes, printed-diagram clarity. Beneath,
a hairline-separated row of tabular coverage counts in mono.

Restrained, confident, immediately readable. The hero's job here is comprehension, not atmosphere.

### Typography
Same families and the same width-axis move, but tuned for reading: display Archivo `wdth` 112 / 700
at up to 96px in `#0B0F14` (18.41:1), generous editorial rhythm, body at a 65–72ch measure.
Eyebrows in Plex Mono `#01547A` (7.89:1). The type does more of the work because the ground does
less.

### Lighting
The light document is flat and precise — signage discipline visible. Depth is expressed through
**controlled elevation**: short-throw shadows on lifted surfaces and a 1px light-catching top
border, never a glow.

Then **two or three full-bleed dark scenes punctuate the document** — the service families, the
client wall, the closing call. Inside those, the full cinematic treatment from Direction A applies:
volumetric blue, node glow, depth planes, vignette, grain. The contrast between flat document and
lit scene is the direction's whole effect.

### Service presentation
Inside the first dark scene. Four families on a **shallow receding grid** — a 2×2 arrangement
tilted slightly in perspective, each panel lifting toward the viewer on hover or focus with a real
shadow and a lit leading edge. Dimensional, but laid out rather than stacked, so all four remain
visible and comparable at once.

### Map treatment
Two registers. In the light document: a precise flat schematic — accurate, labelled, print-like,
the primary reference view on `/couverture`. In the dark closing scene: the same geometry rendered
luminous as a motif. The map is the signature element in both, doing a different job in each.

### Motion behaviour
Restrained in the document: fade plus 16px lift, staggered heading → content → controls, once per
section. Cinematic motion is reserved for **entering a dark scene** — a light sweep, depth
resolving, node ignition. Route changes cross-fade. Reduced-motion switches all of it off; the
light document loses almost nothing, which makes this direction the more robust of the two under
that constraint.

### Header and logo
Solid light bar, hairline bottom rule, condensing on scroll. **The logo needs no treatment at all**
— the original PNG sits directly on the light ground exactly as drawn. Nav in Archivo 500 ink;
primary action a solid `#01547A` pill (8.23:1 with white).

### Trade-offs
Best reading experience, zero logo treatment, most robust under reduced motion, and the safest for
long legal and service content. The cinematic quality is concentrated rather than pervasive, which
is either discipline or a shortfall depending on what the owner wants the site to feel like on
first load.

---

## Comparison

| | **A — Nuit** | **B — Jour** |
|---|---|---|
| Default theme | Dark | Light |
| First impression | Atmosphere, depth, instrumentation | Clarity, authority, craft |
| Map | Perspective plane, luminous | Flat schematic, plus a luminous motif |
| Services | Depth stack, one forward | Receding 2×2 grid, all visible |
| Depth expressed by | Volumetric light and z-planes | Controlled elevation, then full scenes |
| Cinematic register | Pervasive | Concentrated in 2–3 scenes |
| Logo treatment | Light plate behind PNG | None |
| Motion budget | High | Moderate |
| Reduced-motion robustness | Requires deliberate work | Loses very little |
| Long-form reading | Weaker — mitigated below | Strongest |
| Risk | Motion and keyboard complexity | Reads as less bold than the reference implied |

---

## Recommendation: **Direction A, with document mode on reading-heavy routes**

Derived from the two directions rather than asserted in advance, as correction 6 requires.

**Why A.** The reference was selected for cinematic atmosphere, layered depth, lighting and staged
transitions, and the rev. 1 brief was rejected for removing them. A delivers that; B admits it in
three places. There is also a subject argument: this is a business whose defining claim is *chaque
jour, chaque nuit* — it staffs airports through the night, and an operations-room register is
truthful to it rather than merely stylish. And the practical objection to dark — the logo — is
fully resolved by the light plate, with no modification and no approval needed.

**The condition.** Adopt B's document treatment *within* A for the reading-heavy routes:
`/conditions-generales`, `/prestations` detail, `/a-propos`. Dark cinema for `/`, `/couverture`,
`/clients-partenaires`, `/devis`; light document where people read paragraphs and legal clauses.
This makes A a superset rather than a compromise, and it is why the token system carries both
grounds as first-class rather than treating one as an inversion of the other.

**Two gates on A, both verifiable in the validation phase:**
1. The reduced-motion path must be built alongside the motion, not after it.
2. The map must be fully operable by keyboard *in perspective* — if it is not, the map flattens.

**Choose B instead if** the site's most valuable visitor is someone reading service specifications
and terms rather than forming a first impression, or if the motion budget is a concern for
maintenance.

---

## What happens after the choice

Per correction 12, implementation does not begin with all pages. The next step builds **only** the
header, hero, one service scene and the map treatment in the chosen direction, captures desktop and
mobile screenshots, and stops for approval. See `TASKS.md` → **Phase V**.
