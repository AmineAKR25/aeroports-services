# Map geometry — verified

The signature element rebuilt on verified geographic data. Answers corrections 1–10 of the
styleframe review. Reproducible: `map-pipeline/` contains the whole chain and re-running
`build_map.py` re-derives everything and fails loudly if any assertion breaks.

---

## 1. What was wrong

The rev. 2 map was a **hand-drawn 28-vertex polygon in an invented 0–100 coordinate space**, with
node positions placed by eye to look plausible. It rendered **20 nodes against a claimed 29**, and
its category split did not match the archive's 14/4/6/5. It had no Corsica. It was, correctly,
rejected.

Nothing from it survives. The geometry, the projection, the coordinates and the node set are all
new and all derived.

## 2. Sources

| Layer | Source | Licence |
|---|---|---|
| France métropolitaine, **Corsica included** | `france-geojson` (Grégoire David), derived from IGN / OpenStreetMap | Open data |
| Neighbouring context — Belgium, Germany, Switzerland, Italy, Spain, Luxembourg, Netherlands, Andorra | Natural Earth 1:50m admin-0 | Public domain |
| The 29 locations | `CONTENT_AUDIT.md` §3 — verbatim from the archive's Accueil page | — |
| Coordinates for those locations | Public reference geodata | See V21 |

Neighbouring context is included specifically so the five *aéroports limitrophes* — Bruxelles,
Francfort, Bâle, Genève, Zurich — sit in real countries rather than floating outside an outline.

## 3. Projection — one, consistently applied

**Lambert-93 (EPSG:2154)** — France's official national projection. Ellipsoidal Lambert Conformal
Conic on GRS80, standard parallels 44°N and 49°N, origin 46.5°N / 3°E, false easting 700 000 m,
false northing 6 600 000 m.

Every coordinate goes through the same `project(lat, lon)` function: the France outline, the
context countries, and all 29 nodes. Douglas–Peucker simplification runs **in projected metres**,
never in degrees — simplifying in degrees distorts differentially with latitude and is the usual
way a map like this goes subtly wrong.

## 4. The 29 locations

Names verbatim from the archive. Coordinates added as reference data.

| Category | n | Locations |
|---|---|---|
| Aéroports français | **14** | Orly · Roissy · Le Bourget · Lyon · Bordeaux · Nice · Marseille · Toulouse · Mulhouse · Nantes · Metz · Strasbourg · Lille · Brest |
| Gares maritimes | **4** | Le Havre · Monaco · Marseille · Cherbourg |
| Gares ferroviaires | **6** | Gare du Nord · Gare de l'Est · Gare de Lyon · Gare d'Austerlitz · Gare de Bercy · Montparnasse |
| Aéroports limitrophes | **5** | Bruxelles · Francfort · Bâle · Genève · Zurich |
| | **29** | |

## 5. Assertions — the build fails rather than draws something wrong

```
✔ 29 locations · 14 airports · 4 maritime · 6 rail · 5 border
✔ all ids unique, all coordinates within the plausible envelope
✔ France: 3 rings kept (mainland + Corsica + major islands), 833 points
✔ Context: Andorra, Belgium, Germany, Italy, Luxembourg, Netherlands, Spain,
            Switzerland, United Kingdom  (all non-empty — asserted)
✔ viewBox 0 0 1000 956  (Lambert-93 extent 1298×1240 km)
✔ all 29 nodes land inside the viewBox
✔ label groups: 18 (from 29 nodes, coincident sites clustered)
✔ placed without collision: 18/18
✔ verified: zero label-box overlaps
✔ mobile geometry: 2 rings, 159 points (vs 833 desktop)
```

Specifically asserted: total count, per-category counts, id uniqueness (so no location can appear
twice), coordinate plausibility (so no location can be invented outside the region), every node
landing inside the frame, and — computed pairwise after placement — **zero overlap between any two
label boxes**.

## 6. Four real coincidences in the source data

These are properties of the archive, not bugs, and the map handles them explicitly rather than
drawing marks on top of each other:

- **Mulhouse and Bâle are the same facility** — EuroAirport Bâle-Mulhouse-Fribourg, 47.5896 N /
  7.5299 E. The archive lists one as a French airport and the other as a neighbouring airport.
  Both are rendered at that single point; the shared label reads *Mulhouse · Bâle*.
- **Marseille appears twice** — as an airport (Marignane) and as a maritime station (Grand Port),
  ~15 km apart. Two nodes, two shapes, one label.
- **All six SNCF stations are Paris termini.** At national scale they and the three Paris airports
  occupy one point. All nine are rendered; the label reads *Paris · 3 aéroports · 6 gares*.
- **Monaco is close to Nice** — clustered into one label.

Clustering applies to **labels only**. All 29 nodes are always drawn. The complete list of
individual names is carried by the coverage list, which is present on every viewport.

## 7. Accessibility of the encoding

Category is carried by **shape first**, colour second — correction 7:

| Category | Shape |
|---|---|
| Aéroport français | filled **circle** |
| Gare maritime | filled **square** |
| Gare SNCF | horizontal **bar** |
| Aéroport limitrophe | hollow **triangle** |

The legend shows the shapes at the same size they appear on the map. The flat reference map carries
an `aria-label` naming all four categories and their counts; the perspective hero map is
`aria-hidden` because it is a presentation of data the coverage list states in text.

## 8. Flat first, perspective derived

Correction 9. The flat map is built and validated first. The cinematic hero applies a **CSS
transform to that same SVG** — `perspective(900px) rotateX(49deg) rotateZ(-6deg) scale(1.06)`.

There is no second geometry, no separate coordinate set, and no hand-adjusted "hero version". If
the data changes, both views change together. If a keyboard user or reduced-motion user needs the
flat view, it is the *same* map with the transform removed.

## 9. Mobile is a different geometry, not a smaller one

Correction 10. The mobile map is re-simplified from the source at a coarser tolerance:
**159 points across 2 rings** versus 833 across 3 — a genuinely simpler shape, with neighbouring
countries and all labels dropped, and node marks scaled up 1.9×. It is followed by the **complete
structured coverage list**: all four categories, every one of the 29 names, and the
`** Présent sur autres aéroports et/ou gares sur demande` footnote verbatim.

## 10. New verification item

| # | Item | Blocks |
|---|---|---|
| **V21** | **Interpretation of two archive place-names.** "Roissy" is read as Paris-CDG and "Metz" as Metz-Nancy-Lorraine. Both are the obvious readings, neither is stated in the archive. Confirm before launch. Also confirm that "Mulhouse" and "Bâle" being one facility is intended rather than an error in the original list. | Map accuracy |


---

## 11. Corrections applied in Phase V-bis (2026-08-26)

| # | Was | Now |
|---|---|---|
| Andorra | The single 4.5 km simplification tolerance dropped every vertex of a 25 km-wide country, so `contextPaths["Andorra"]` was `""` and the map shipped a literal `<path d="">` while the assertion still listed nine countries. | `prep_context()` retries at a finer tolerance, and the build asserts no context country is empty. Nine countries, nine real paths. |
| Footnote | `extract_coverage.py` captured with `[^<]*`, which stopped at the first tag and silently dropped `ET/OU GARES SUR DEMANDE` — half the qualifier. | Captures to `</p>` and strips tags. The build asserts the string ends with `ET/OU GARES SUR DEMANDE`. Stored and rendered verbatim, capitalisation included. |
| Category names | The UI said "Gares SNCF", which is not the archive's wording. | `CATEGORY_LABEL_SOURCE` carries the archive's own "Gares ferroviaires françaises"; `CATEGORY_LABEL_SHORT` holds truncations for tight layouts and is documented as not being source wording. "SNCF" appears nowhere. |
| "parisiennes" | Asserted as fact in the map's accessible name. | Moved to `INTERPRETATION_NOTES` and rendered under an explicit *Interprétation* tag (V22). |
| `coverage.ts` | Header claimed "GENERATED by build_map.py" while nothing generated it. | `build_map.py` emits it, including the 18 clusters with their member ids. The header is now true. |
| Clusters | Only labels were clustered; the interactive layer stacked 29 controls, nine of them on one point. | `map.json` and `coverage.ts` carry the 18 clusters with `memberIds`, centroid, radius and label anchor. The build asserts the clusters partition all 29 nodes with none orphaned. |
