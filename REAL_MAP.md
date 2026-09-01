# Real coverage map

The coverage explorer uses MapLibre GL JS with the MapTiler Streets Pastel v4
vector style. Streets Pastel is the quiet light variant selected for this
operational data layer while retaining roads, airports and geographic labels.

- Renderer: `maplibre-gl`
- Style endpoint: `https://api.maptiler.com/maps/streets-v4-pastel/style.json`
- Browser configuration: `NEXT_PUBLIC_MAPTILER_KEY` from the untracked `.env.local`
- Worker delivery: the pinned MapLibre worker and shared module are served from
  `public/maplibre-gl-worker.mjs` and `public/maplibre-gl-shared.mjs` so the
  Next/Netlify runtime does not resolve the worker to the document root
- Visible attribution: MapTiler and OpenStreetMap contributors, plus the
  MapLibre attribution control returned by the style
- No OpenFreeMap or OpenStreetMap raster fallback is loaded

Provider references: [MapTiler map styles](https://docs.maptiler.com/sdk-js/api/map-styles/)
and [MapTiler’s MapLibre migration example](https://docs.maptiler.com/sdk-js/examples/switch-from-maplibre/).

The public MapTiler key is read at runtime/build time through
`process.env.NEXT_PUBLIC_MAPTILER_KEY`; it is never stored in source control.
For local review, add the credential supplied by the MapTiler project to
`.env.local` and restart the dev server:

```text
NEXT_PUBLIC_MAPTILER_KEY=your-public-maptiler-key
```

For Netlify review, configure the same variable in the site’s environment
settings for the relevant deploy context. Never place the key in source or a
committed `.env` file.

The component fetches and validates the MapLibre style before applying it. It
requires visible water/coastline, boundary, road, place-label and airport
layer families, then waits for the style to be idle and its tiles to be loaded
before exposing markers and reporting the map as ready. While that happens,
markers are hidden. If the key is missing, the style request fails, or the
intended geographic layer set does not render, an honest accessible error
panel is shown and the complete directory remains usable.

The overview uses two deliberate dense-location groups: the six Paris rail
locations and the exact Bâle/Mulhouse overlap. Each group is a restrained
geographic MapLibre marker at the computed coordinate centroid. Activating a
group closes any location popup, opens a keyboard-accessible detail panel and
flies the camera toward the group. Zooming reveals the individual markers at
their own longitude/latitude values.

Coverage coordinates live separately in
`src/app/components/coverage-locations.ts`. The 29-member location set is
traceable to the archived home page (`accueil.html`, SHA-256
`af9940882ec975daa6b6149ab72b421d188647583c8935ab3ad5be7e705bad03`) and the
audited project coordinate enrichment.

The 19 airport records backed by the pipeline use OurAirports `airports.csv`,
matched by ICAO identifier and pinned to SHA-256
`d4bc9389e90a3adb17b50e3deb361beb3bffe9d232e9bca204c13527d5292643`.
Interpretive matches such as Roissy, Metz, Mulhouse and Bâle remain
provisional even when their airport row is identifiable. The 10 rail and
maritime positions remain manual, source-less approximations and are marked
provisional; none is presented as an operational confirmation.

Before production launch, review MapTiler plan, domain restrictions, usage
limits, attribution and hosting/provider requirements. MapTiler’s direct
MapLibre style URL is intentionally used instead of adding its SDK because the
existing MapLibre marker, cluster and keyboard interaction layer is already
working.
