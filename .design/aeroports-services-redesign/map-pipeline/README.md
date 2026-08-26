# Map pipeline — reproducible from a clean checkout

    python3 download_sources.py     # pinned datasets + SHA-256 verification
    python3 extract_coverage.py     # canonical list, parsed from the archived page
    python3 build_coordinates.py    # coordinate enrichment + provenance
    python3 build_map.py            # projection, geometry, labels, assertions
    python3 validate_render.py      # rendered collision check in a real browser

No manual preparation. `download_sources.py` fetches every input and refuses to
continue on a checksum mismatch.

## What the assertions prove — and what they don't

**Proved:** the location set reaching the map is *exactly* the set extracted from
the archived page — same members, same categories, none invented, none dropped,
no duplicates. `build_map.py` compares `coordinates.json` against
`coverage-source.json` by set equality in both directions. Negative-tested:
injecting a plausible extra location (Perpignan, inside the lat/lon envelope) and
removing a real one (Brest) both fail the build.

**Not proved:** that any coordinate is correct. The lat/lon envelope shows only
geographic plausibility. Per-location confidence is in `coordinates.json`:
19 of 29 derived mechanically from OurAirports by ICAO ident; 10 manual.
15 confirmed, 14 provisional (V21 airport interpretations, V22 maritime/rail).

## Sources

| File | Pin | Licence |
|---|---|---|
| `france.geojson` | commit `45daa2d0` | Licence Ouverte (Etalab); IGN + OpenStreetMap (ODbL) |
| `ne50.geojson` | commit `9380cca8` | Public domain — Natural Earth |
| `airports.csv` | SHA-256 (rolling branch) | Public domain — OurAirports |

Projection: Lambert-93 / EPSG:2154, ellipsoidal LCC on GRS80, SP 44°N/49°N.
