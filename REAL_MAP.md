# Real map implementation

The coverage explorer uses MapLibre GL JS with the OpenFreeMap Positron style:

- Primary style: `https://tiles.openfreemap.org/styles/positron`
- Primary vector TileJSON: `https://tiles.openfreemap.org/planet`
- Renderer: `maplibre-gl`
- Visible attribution: OpenFreeMap, OpenMapTiles, and OpenStreetMap

The component resolves the OpenFreeMap TileJSON into an explicit vector `tiles`
array before passing the style to MapLibre. A muted OpenStreetMap raster layer
is also inserted beneath the style as a resilience underlay. It keeps the map
geographic and usable if the vector source is unavailable in a browser/runtime;
it is not a replacement for the OpenFreeMap Positron style when the vector
source renders normally.

The raster fallback uses `https://tile.openstreetmap.org/{z}/{x}/{y}.png` and
has a separate provider attribution. Before production launch, review both
OpenFreeMap hosting/provider requirements and the OpenStreetMap tile usage
policy, including capacity and caching expectations. No map credential is
stored in source control.

Coverage coordinates live separately in
`src/app/components/coverage-locations.ts`. They are real longitude/latitude
facility-centroid points marked provisional until the operations team validates
them.
