#!/usr/bin/env python3
"""
Aéroports Services — verified coverage map builder.

INPUTS (all produced by other steps; none hardcoded here):
  coverage-source.json  — canonical location list, mechanically extracted from the
                          archived original page by extract_coverage.py.
  coordinates.json      — coordinate ENRICHMENT, built by build_coordinates.py.
  sources.lock.json     — pinned geographic datasets + SHA-256, by download_sources.py.
  france.geojson        — pinned outline, Corsica included.
  ne50.geojson          — pinned neighbour context.

WHAT THE ASSERTIONS DO AND DO NOT PROVE
  They DO prove: the set of locations reaching the map is exactly the set extracted
  from the archive — same members, same categories, no additions, no omissions,
  no duplicates. That is an archive-to-map comparison, not a self-check.

  They DO NOT prove that any coordinate is correct. A latitude/longitude envelope
  shows only that a coordinate is geographically plausible for this region. Whether
  a coordinate points at the right facility is recorded per location in
  coordinates.json as verificationStatus, and 14 of 29 are currently provisional.

Run order:  download_sources.py → extract_coverage.py → build_coordinates.py → build_map.py
"""
import json, math, sys, pathlib

HERE = pathlib.Path(__file__).parent

def need(name, how):
    p = HERE / name
    if not p.exists():
        sys.exit(f"missing input: {name}\n  produce it with: {how}")
    return p

need("sources.lock.json", "python3 download_sources.py")
need("france.geojson",    "python3 download_sources.py")
need("ne50.geojson",      "python3 download_sources.py")
need("coverage-source.json", "python3 extract_coverage.py")
need("coordinates.json",     "python3 build_coordinates.py")

SRC   = json.loads((HERE / "coverage-source.json").read_text(encoding="utf-8"))
COORD = json.loads((HERE / "coordinates.json").read_text(encoding="utf-8"))
LOCK  = json.loads((HERE / "sources.lock.json").read_text(encoding="utf-8"))

# ---------------------------------------------------------------------------
# 1+2. ARCHIVE-TO-MAP COMPARISON
#      The map's input is coordinates.json. The authority is coverage-source.json,
#      extracted from the archived page. Compare the two by exact set equality.
# ---------------------------------------------------------------------------
def keyset(records):
    return set((r["raw"], r["category"]) for r in records)

def assert_matches_archive():
    archive = keyset(SRC["locations"])
    mapped  = keyset(COORD["locations"])

    assert len(archive) == len(SRC["locations"]), "duplicate (raw, category) in the archive extraction"
    assert len(mapped)  == len(COORD["locations"]), "duplicate (raw, category) in the coordinate layer"

    invented = mapped - archive
    dropped  = archive - mapped
    assert not invented, f"location(s) present on the map but NOT in the archive: {sorted(invented)}"
    assert not dropped,  f"archived location(s) missing from the map: {sorted(dropped)}"
    assert archive == mapped, "set equality failed"

    ca, cm = {}, {}
    for r in SRC["locations"]:   ca[r["category"]] = ca.get(r["category"], 0) + 1
    for r in COORD["locations"]: cm[r["category"]] = cm.get(r["category"], 0) + 1
    assert ca == cm, f"category counts differ — archive {ca} vs map {cm}"

    print("Archive-to-map comparison:")
    print(f"  archive : {SRC['archiveFile']}")
    print(f"  sha256  : {SRC['archiveSha256'][:32]}…")
    print(f"  ✔ exact set equality — {len(archive)} locations, 0 invented, 0 dropped")
    print(f"  ✔ category equality  — {ca}")
    print(f"  ✔ no duplicate (raw, category) on either side")
    return ca

def report_coordinate_confidence():
    st = {}
    for e in COORD["locations"]:
        st[e["verificationStatus"]] = st.get(e["verificationStatus"], 0) + 1
    src = {}
    for e in COORD["locations"]:
        src[e["coordinateSource"]] = src.get(e["coordinateSource"], 0) + 1
    print("Coordinate provenance (NOT a correctness proof):")
    print(f"  ✔ {src.get('OurAirports airports.csv', 0)} derived mechanically from OurAirports by ICAO ident")
    print(f"  · {src.get('manual', 0)} manual, no authoritative dataset consulted")
    print(f"  · verification status: {st}")
    env = all(41.0 < e["lat"] < 52.0 and -6.0 < e["lon"] < 10.0 for e in COORD["locations"])
    print(f"  · all coordinates inside the regional envelope: {env} "
          f"(plausibility only — does not prove the facility is right)")

CATS = assert_matches_archive()
report_coordinate_confidence()
print()

NOTES = [
    "Mulhouse (aéroport) et Bâle (limitrophe) désignent le MÊME site : le jeu de "
    "données OurAirports résout les deux vers LFSB, « EuroAirport Basel–Mulhouse–"
    "Freiburg ». L'archive les classe dans deux catégories différentes. Les deux "
    "sont rendus : la coïncidence est réelle et vérifiée mécaniquement.",
    "Marseille figure deux fois volontairement : comme aéroport (LFML) et comme "
    "gare maritime (Grand Port). Coordonnées distinctes, les deux issues de l'archive.",
    "Les 6 « gares ferroviaires françaises » sont toutes parisiennes. L'archive élide "
    "le mot « Gare » (« Gare du Nord / de l'Est / de Lyon »). Les jetons bruts sont "
    "conservés tels quels ; l'expansion est une interprétation, enregistrée séparément.",
    "14 des 29 coordonnées sont provisoires : 3 interprétations d'aéroport (V21) et "
    "les 10 sites maritimes et ferroviaires (V22), sans jeu de données de référence.",
]

# ---------------------------------------------------------------------------
# 3. PROJECTION — Lambert-93 / EPSG:2154, ellipsoidal LCC on GRS80
# ---------------------------------------------------------------------------
A, F = 6378137.0, 1 / 298.257222101          # GRS80
E = math.sqrt(2 * F - F * F)
LAT0, LON0 = math.radians(46.5), math.radians(3.0)
LAT1, LAT2 = math.radians(44.0), math.radians(49.0)
X0, Y0 = 700000.0, 6600000.0

def _m(p):  return math.cos(p) / math.sqrt(1 - E * E * math.sin(p) ** 2)
def _t(p):  return math.tan(math.pi / 4 - p / 2) / \
                   ((1 - E * math.sin(p)) / (1 + E * math.sin(p))) ** (E / 2)

_N = (math.log(_m(LAT1)) - math.log(_m(LAT2))) / (math.log(_t(LAT1)) - math.log(_t(LAT2)))
_F = _m(LAT1) / (_N * _t(LAT1) ** _N)
_R0 = A * _F * _t(LAT0) ** _N

def project(lat, lon):
    """lat/lon (degrees) -> Lambert-93 easting/northing (metres)."""
    p, l = math.radians(lat), math.radians(lon)
    r = A * _F * _t(p) ** _N
    th = _N * (l - LON0)
    return X0 + r * math.sin(th), Y0 + _R0 - r * math.cos(th)

# ---------------------------------------------------------------------------
# 4. GEOMETRY — simplify in projected space
# ---------------------------------------------------------------------------
def rdp(pts, eps):
    if len(pts) < 3: return pts
    x1, y1 = pts[0]; x2, y2 = pts[-1]
    dx, dy = x2 - x1, y2 - y1
    n = math.hypot(dx, dy)
    imax, dmax = 0, 0.0
    for i in range(1, len(pts) - 1):
        x, y = pts[i]
        d = abs(dy * x - dx * y + x2 * y1 - y2 * x1) / n if n else math.hypot(x - x1, y - y1)
        if d > dmax: imax, dmax = i, d
    if dmax > eps:
        return rdp(pts[:imax + 1], eps)[:-1] + rdp(pts[imax:], eps)
    return [pts[0], pts[-1]]

def rings_from(geom):
    if geom["type"] == "Polygon":   return [geom["coordinates"][0]]
    if geom["type"] == "MultiPolygon": return [p[0] for p in geom["coordinates"]]
    return []

def prep(rings, eps, min_pts=8, min_area=None):
    out = []
    for ring in rings:
        pr = [project(lat, lon) for lon, lat in ring]
        s = rdp(pr, eps)
        if len(s) < min_pts: continue
        if min_area:
            a = abs(sum(s[i][0] * s[i-1][1] - s[i-1][0] * s[i][1] for i in range(len(s)))) / 2
            if a < min_area: continue
        out.append(s)
    return out

sys.setrecursionlimit(100000)
print("Geometry:")
fr = json.load((HERE / "france.geojson").open(encoding="utf-8"))
fr_geom = fr["geometry"] if fr.get("type") == "Feature" else fr["features"][0]["geometry"]
france = prep(rings_from(fr_geom), eps=1800, min_pts=10, min_area=8e7)
print(f"  ✔ France: {len(france)} rings kept (mainland + Corsica + major islands), "
      f"{sum(len(r) for r in france)} points after simplification")

ne = json.load((HERE / "ne50.geojson").open(encoding="utf-8"))
CONTEXT = ["Belgium", "Germany", "Switzerland", "Italy", "Spain",
           "Luxembourg", "United Kingdom", "Netherlands", "Andorra"]
def prep_context(rings):
    """Country outlines at map scale.

    A single tolerance drops micro-states: Andorra is ~25 km across, so RDP at
    4.5 km left fewer than min_pts vertices and the country silently became an
    empty path. Retry finer rather than emitting `d=""` and then asserting the
    country is present.
    """
    for eps, min_pts, min_area in ((4500, 8, 3e8), (900, 5, 5e7)):
        out = prep(rings, eps=eps, min_pts=min_pts, min_area=min_area)
        if out:
            return out
    return []

context = {}
for feat in ne["features"]:
    nm = feat["properties"].get("NAME")
    if nm in CONTEXT:
        context[nm] = prep_context(rings_from(feat["geometry"]))
missing = sorted(n for n in CONTEXT if not context.get(n))
assert not missing, f"context country produced no geometry: {missing}"
print(f"  ✔ Context: {', '.join(sorted(context))} (all non-empty)")

# ---------------------------------------------------------------------------
# 5. VIEWBOX — from projected node extent plus margin, clip context to it
# ---------------------------------------------------------------------------
nodes = []
for e in COORD["locations"]:
    x, y = project(e["lat"], e["lon"])
    nodes.append({"id": f'{e["category"]}:{e["raw"]}', "name": e["display"],
                  "raw": e["raw"], "cat": e["category"], "lat": e["lat"], "lon": e["lon"],
                  "facility": e["interpretedFacility"], "status": e["verificationStatus"],
                  "x": x, "y": y})
assert len(nodes) == len(SRC["locations"]), "node count diverged from the archive"

xs = [n["x"] for n in nodes] + [p[0] for r in france for p in r]
ys = [n["y"] for n in nodes] + [p[1] for r in france for p in r]
PAD = 90000
minx, maxx = min(xs) - PAD, max(xs) + PAD
miny, maxy = min(ys) - PAD, max(ys) + PAD
W, H = maxx - minx, maxy - miny

SVGW = 1000.0
SCALE = SVGW / W
SVGH = H * SCALE

def to_svg(x, y):
    # Lambert northing increases north; SVG y increases down -> flip
    return round((x - minx) * SCALE, 2), round((maxy - y) * SCALE, 2)

def path_of(rings, close=True):
    out = []
    for r in rings:
        pts = [to_svg(x, y) for x, y in r]
        pts = [p for i, p in enumerate(pts) if i == 0 or p != pts[i-1]]
        if len(pts) < 3: continue
        d = "M" + " L".join(f"{x},{y}" for x, y in pts) + ("Z" if close else "")
        out.append(d)
    return " ".join(out)

def clip(rings):
    keep = []
    for r in rings:
        if any(minx - 400000 < x < maxx + 400000 and miny - 400000 < y < maxy + 400000 for x, y in r):
            keep.append(r)
    return keep

for n in nodes:
    n["sx"], n["sy"] = to_svg(n["x"], n["y"])

print(f"  ✔ viewBox 0 0 {SVGW:.0f} {SVGH:.0f}  (Lambert-93 extent {W/1000:.0f}×{H/1000:.0f} km)")

# every node must land inside the viewBox
for n in nodes:
    assert 0 <= n["sx"] <= SVGW and 0 <= n["sy"] <= SVGH, f"{n['name']} projected outside viewBox"
print("  ✔ all 29 nodes land inside the viewBox")

# ---------------------------------------------------------------------------
# 6. LABELS — cluster coincident sites, then greedy collision avoidance
#
#    Four genuine coincidences exist in the source data and must be handled,
#    not drawn over each other:
#      · Paris      — Orly, Roissy, Le Bourget + all 6 SNCF termini
#      · Bâle       — identical coordinates to Mulhouse (one EuroAirport)
#      · Marseille  — airport and maritime station, ~15 km apart
#      · Monaco     — close to Nice
#    Every node is still RENDERED; clustering applies to LABELS only.
# ---------------------------------------------------------------------------
# One constant, shared with every renderer via map.json. Placement geometry and
# drawn geometry MUST use the same size or the maths validates a different picture
# than the one on screen — which is exactly what the first rendered check caught.
LABEL_SIZE = 15.0                 # SVG user units
CH_W = 0.600 * LABEL_SIZE         # IBM Plex Mono advance is 0.6 em
LH   = 1.150 * LABEL_SIZE
CLUSTER_R = 26.0                  # SVG units

def clusters():
    remaining = list(nodes)
    groups = []
    while remaining:
        seed = remaining.pop(0)
        grp = [seed]
        again = True
        while again:
            again = False
            for n in list(remaining):
                if any(math.hypot(n["sx"] - g["sx"], n["sy"] - g["sy"]) <= CLUSTER_R for g in grp):
                    grp.append(n); remaining.remove(n); again = True
        groups.append(grp)
    return groups

def compose(grp):
    if len(grp) == 1:
        return grp[0]["name"]
    names = [g["name"] for g in grp]
    cats = {}
    for g in grp: cats[g["cat"]] = cats.get(g["cat"], 0) + 1
    # Paris: 3 airports + 6 termini
    if cats.get("rail", 0) >= 3:
        return f"Paris · {cats.get('airport',0)} aéroports · {cats['rail']} gares"
    # same place name repeated (Marseille airport + port)
    if len(set(names)) == 1:
        return names[0]
    return " · ".join(dict.fromkeys(names))

def place():
    groups = clusters()
    targets = []
    for grp in groups:
        cx = sum(g["sx"] for g in grp) / len(grp)
        cy = sum(g["sy"] for g in grp) / len(grp)
        prio = 0 if any(g["cat"] == "airport" for g in grp) else 1
        # radius that encloses every member mark, so a renderer can size one
        # hit target for the whole cluster instead of stacking 9 of them.
        spread = max(math.hypot(g["sx"] - cx, g["sy"] - cy) for g in grp)
        targets.append({"id": "+".join(g["id"] for g in grp), "text": compose(grp),
                        "memberIds": [g["id"] for g in grp],
                        "cats": sorted({g["cat"] for g in grp}),
                        "x": round(cx, 2), "y": round(cy, 2),
                        "r": round(spread, 2),
                        "n": len(grp), "prio": prio,
                        "cat": grp[0]["cat"]})
    CANDS = [(13, 5, "start"), (-13, 5, "end"), (0, -13, "middle"), (0, 19, "middle"),
             (13, -10, "start"), (-13, -10, "end"), (13, 19, "start"), (-13, 19, "end"),
             (0, -27, "middle"), (0, 33, "middle"), (26, 5, "start"), (-26, 5, "end"),
             (0, -41, "middle"), (0, 47, "middle")]
    placed, boxes = [], []
    for t in sorted(targets, key=lambda t: (t["prio"], -t["n"], t["x"])):
        w = len(t["text"]) * CH_W
        chosen = None
        for dx, dy, anchor in CANDS:
            x, y = t["x"] + dx, t["y"] + dy
            x0 = x if anchor == "start" else (x - w if anchor == "end" else x - w / 2)
            box = (x0 - 3, y - LH + 2, x0 + w + 3, y + 5)
            if box[0] < 3 or box[2] > SVGW - 3 or box[1] < 3 or box[3] > SVGH - 3:
                continue
            if any(not (box[2] < b[0] or box[0] > b[2] or box[3] < b[1] or box[1] > b[3]) for b in boxes):
                continue
            # keep clear of every node mark, not just other labels
            if any(box[0] - 5 < n["sx"] < box[2] + 5 and box[1] - 5 < n["sy"] < box[3] + 5
                   for n in nodes if math.hypot(n["sx"] - t["x"], n["sy"] - t["y"]) > CLUSTER_R):
                continue
            chosen = (x, y, anchor, box, dx, dy); break
        if chosen:
            x, y, anchor, box, dx, dy = chosen
            boxes.append(box)
            far = abs(dx) > 13 or abs(dy) > 20
            placed.append({**t, "lx": round(x, 1), "ly": round(y, 1), "anchor": anchor,
                           "leader": far})
        else:
            placed.append({**t, "lx": None, "leader": False})
    return placed

labels = place()
ok = [l for l in labels if l["lx"] is not None]
print(f"  ✔ label groups: {len(labels)} (from 29 nodes, coincident sites clustered)")
print(f"  ✔ placed without collision: {len(ok)}/{len(labels)}")
assert len(ok) == len(labels), "LABEL COLLISION: some labels could not be placed"

# verify no two placed label boxes overlap
bb = []
for l in ok:
    w = len(l["text"]) * CH_W
    x0 = l["lx"] if l["anchor"] == "start" else (l["lx"] - w if l["anchor"] == "end" else l["lx"] - w/2)
    bb.append((x0, l["ly"] - LH, x0 + w, l["ly"] + 4, l["text"]))
for i in range(len(bb)):
    for j in range(i + 1, len(bb)):
        a, b = bb[i], bb[j]
        assert a[2] < b[0] or a[0] > b[2] or a[3] < b[1] or a[1] > b[3], \
            f"overlap: {a[4]} / {b[4]}"
print("  ✔ verified: zero label-box overlaps")

# every node belongs to exactly one cluster — the interactive layer uses
# clusters as controls, so a node outside one would be unreachable.
_members = [i for l in labels for i in l["memberIds"]]
assert sorted(_members) == sorted(n["id"] for n in nodes), \
    "cluster membership does not partition the node set"
assert len(_members) == len(set(_members)), "a node appears in two clusters"
print(f"  ✔ clusters partition all {len(nodes)} nodes ({len(labels)} controls, none orphaned)")

# ---------------------------------------------------------------------------
# 7. EMIT
# ---------------------------------------------------------------------------
# Mobile: a genuinely simplified geometry, not a shrunken desktop SVG.
# Coarser simplification, no neighbour context, no labels — the complete
# structured coverage list carries the detail on small screens.
france_mobile = prep(rings_from(fr_geom), eps=9000, min_pts=8, min_area=2e9)
print(f"  ✔ mobile geometry: {len(france_mobile)} rings, "
      f"{sum(len(r) for r in france_mobile)} points "
      f"(vs {sum(len(r) for r in france)} desktop)")

out = {
    "franceMobilePath": path_of(france_mobile),
    "viewBox": f"0 0 {round(SVGW,1)} {round(SVGH,1)}",
    "labelSize": LABEL_SIZE,
    "width": round(SVGW, 1), "height": round(SVGH, 1),
    "projection": "Lambert-93 (EPSG:2154), GRS80, SP 44°N/49°N, origin 46.5°N/3°E",
    "francePath": path_of(france),
    "contextPaths": {k: path_of(clip(v)) for k, v in context.items()},
    "nodes": [{k: n[k] for k in ("id", "name", "raw", "cat", "lat", "lon", "sx", "sy",
                                 "facility", "status")} for n in nodes],
    "labels": labels,
    "counts": {k: sum(1 for n in nodes if n["cat"] == k) for k in CATS},
    "footnote": SRC["footnote"],
    "categoryLabels": SRC["categoryLabels"],
    "archiveSha256": SRC["archiveSha256"],
    "sources": {k: {"url": v["url"], "sha256": v["sha256"], "licence": v["licence"]} for k, v in LOCK.items()},
    "notes": NOTES,
}
json.dump(out, (HERE / "map.json").open("w", encoding="utf-8"), ensure_ascii=False, indent=1)
print(f"\n  ✔ map.json written — france path {len(out['francePath'])} chars, "
      f"{len(out['contextPaths'])} context countries")

# ---------------------------------------------------------------------------
# 8. EMIT THE TYPED CONTENT MODULE
#
# src/content/coverage.ts used to carry a "GENERATED by build_map.py" header
# while nothing generated it. It is generated here now, so re-running the
# pipeline really does update the app and the header is true.
# ---------------------------------------------------------------------------
TS_OUT = (HERE / ".." / ".." / ".." / "src" / "content" / "coverage.ts").resolve()

def ts(v):
    return json.dumps(v, ensure_ascii=False)

# Truncations of the source names, for layouts too narrow for the full string.
# NOT archive wording. No component may present these as source content.
SHORT = {
    "airport":  "Aéroports français",
    "maritime": "Gares maritimes",
    "rail":     "Gares ferroviaires",
    "border":   "Aéroports limitrophes",
}

NODE_KEYS = ("id", "raw", "name", "cat", "x", "y", "facility", "status")

def node_lines():
    rows = []
    for n in nodes:
        d = {"id": n["id"], "raw": n["raw"], "name": n["name"], "cat": n["cat"],
             "x": n["sx"], "y": n["sy"], "facility": n["facility"], "status": n["status"]}
        rows.append("  { " + ", ".join(f"{k}: {ts(d[k])}" for k in NODE_KEYS) + " },")
    return "\n".join(rows)

CLUSTER_KEYS = ("id", "text", "memberIds", "cats", "x", "y", "r",
                "lx", "ly", "anchor", "leader")

def cluster_lines():
    rows = []
    for l in labels:
        body = "\n".join(f"    {k}: {ts(l[k])}," for k in CLUSTER_KEYS)
        rows.append("  {\n" + body + "\n  },")
    return "\n".join(rows)

NL = chr(10)
_src_labels = NL.join(f"  {k}: {ts(v)}," for k, v in out["categoryLabels"].items())
_short_labels = NL.join(f"  {k}: {ts(v)}," for k, v in SHORT.items())

TS = f'''// GENERATED by .design/aeroports-services-redesign/map-pipeline/build_map.py
// Do not edit by hand - re-run the pipeline (see map-pipeline/README.md).
//
// Source of truth: the archived original page,
//   sha256 {SRC["archiveSha256"]}
// Projection: Lambert-93 (EPSG:2154), GRS80, SP 44N/49N, origin 46.5N/3E
// {len(nodes)} locations, verified by exact set equality against coverage-source.json.
// {len(labels)} geographic clusters partition those locations. The interactive map
// uses clusters as controls; the coverage list carries every individual name.

export type Category = 'airport' | 'maritime' | 'rail' | 'border';

export interface CoverageNode {{
  id: string;
  /** The archive's own token, unaltered. */
  raw: string;
  name: string;
  cat: Category;
  x: number;
  y: number;
  /** Interpreted facility. Provisional entries are flagged by `status` (V21/V22). */
  facility: string;
  status: 'confirmed' | 'provisional';
}}

/** One geographic cluster - the interactive unit on the map. */
export interface MapCluster {{
  id: string;
  text: string;
  memberIds: string[];
  cats: Category[];
  /** Cluster centroid, SVG user units. */
  x: number;
  y: number;
  /** Radius enclosing every member mark. */
  r: number;
  /** Label anchor point. */
  lx: number;
  ly: number;
  anchor: 'start' | 'middle' | 'end';
  /** True when the label sits far enough out to need a leader line. */
  leader: boolean;
}}

export const MAP_VIEWBOX = {ts(out["viewBox"])};
export const MAP_LABEL_SIZE = {out["labelSize"]};

export const FRANCE_PATH = {ts(out["francePath"])};

/** Genuinely coarser geometry for < 768px - not a shrunken desktop path. */
export const FRANCE_PATH_MOBILE = {ts(out["franceMobilePath"])};

export const CONTEXT_PATHS: string[] = {ts([v for v in out["contextPaths"].values()])};

/** Category names verbatim from the archived page. Canonical content. */
export const CATEGORY_LABEL_SOURCE: Record<Category, string> = {{
{_src_labels}
}};

/**
 * Truncations of the source names, for layouts too narrow for the full string.
 * NOT archive wording - never present these as source content.
 */
export const CATEGORY_LABEL_SHORT: Record<Category, string> = {{
{_short_labels}
}};

/**
 * Readings the archive does not state. Surfaced in the UI as interpretation,
 * never as verified fact.
 */
export const INTERPRETATION_NOTES: Partial<Record<Category, string>> = {{
  rail:
    'Les six gares listees par l\\u2019archive sont lues comme des gares parisiennes. '
    + 'L\\u2019archive ne le precise pas (V22).',
  border:
    'Mulhouse et Bale designent un seul site, l\\u2019EuroAirport Bale-Mulhouse-Fribourg. '
    + 'L\\u2019archive les classe dans deux categories (V21).',
}};

export const COVERAGE_NODES: CoverageNode[] = [
{node_lines()}
];

export const MAP_CLUSTERS: MapCluster[] = [
{cluster_lines()}
];

/** Verbatim from the archive, capitalisation included. Case is a CSS concern. */
export const COVERAGE_FOOTNOTE = {ts(out["footnote"])};

export const COVERAGE_COUNTS: Record<Category, number> = {ts(out["counts"])};
'''

TS_OUT.parent.mkdir(parents=True, exist_ok=True)
TS_OUT.write_text(TS, encoding="utf-8")
print(f"  ✔ src/content/coverage.ts generated — {len(nodes)} nodes, {len(labels)} clusters")
print("  ✔ PIPELINE COMPLETE")
