#!/usr/bin/env python3
"""
Fetch the pinned geographic source datasets.

Every source is pinned to an immutable commit SHA (GitHub raw) or verified by
SHA-256 checksum. Re-running this from a clean checkout reproduces byte-identical
inputs, or fails loudly. There is no undocumented manual preparation step.

    python3 download_sources.py            # download + verify
    python3 download_sources.py --record   # (re)write the checksums file

Licences are recorded in SOURCES below and reproduced in sources.lock.json.
"""
import hashlib, json, pathlib, sys, urllib.request

HERE = pathlib.Path(__file__).parent
LOCK = HERE / "sources.lock.json"

SOURCES = {
    "france.geojson": {
        "description": "France métropolitaine outline, Corsica included",
        "repo": "gregoiredavid/france-geojson",
        "commit": "45daa2d069a8da3ec4efb6672388fc3dc02e36e2",
        "commitDate": "2018-08-01T12:59:50Z",
        "path": "metropole.geojson",
        "url": "https://raw.githubusercontent.com/gregoiredavid/france-geojson/"
               "45daa2d069a8da3ec4efb6672388fc3dc02e36e2/metropole.geojson",
        "licence": "Licence Ouverte / Open Licence (Etalab). Derived from IGN GEOFLA "
                   "and OpenStreetMap contributors (ODbL).",
        "attribution": "© les contributeurs d'OpenStreetMap · IGN · "
                       "france-geojson (Grégoire David)",
        "sha256": "d1f4aec3fbc274d4af3f5930302a342d3efe0ea1daf410fbeef535346167bf0c",
    },
    "ne50.geojson": {
        "description": "Natural Earth 1:50m admin-0 countries — neighbouring context",
        "repo": "nvkelso/natural-earth-vector",
        "commit": "9380cca83db5f9aef52d5e762765100745f84b27",
        "commitDate": "2022-05-13T05:33:10Z",
        "path": "geojson/ne_50m_admin_0_countries.geojson",
        "url": "https://raw.githubusercontent.com/nvkelso/natural-earth-vector/"
               "9380cca83db5f9aef52d5e762765100745f84b27/geojson/"
               "ne_50m_admin_0_countries.geojson",
        "licence": "Public domain (Natural Earth terms of use).",
        "attribution": "Made with Natural Earth.",
        "sha256": "3e458fc036ad0a66411f2c1e6cac49c5d7bfb81cb1123bc513b22511a2b7fdeb",
    },
    "airports.csv": {
        "description": "OurAirports global airport database — coordinate source "
                       "for the 19 airport locations",
        "repo": "davidmegginson/ourairports-data",
        "commit": None,
        "commitDate": None,
        "path": "airports.csv",
        "url": "https://davidmegginson.github.io/ourairports-data/airports.csv",
        "licence": "Public domain (OurAirports).",
        "attribution": "Data from OurAirports (ourairports.com), public domain.",
        "sha256": "d4bc9389e90a3adb17b50e3deb361beb3bffe9d232e9bca204c13527d5292643",
        "mutable": True,
        "note": "Published from a rolling branch, so this one is pinned by checksum "
                "rather than by commit. A checksum mismatch means upstream changed — "
                "re-record deliberately and re-verify the matched rows.",
        "recordHistory": [
            {"sha256": "4e56f700c184c586fe26d897082d176829840574c360ace0e38590f7e69489fa",
             "recorded": "2026-08-25",
             "reason": "initial pin"},
            {"sha256": "d4bc9389e90a3adb17b50e3deb361beb3bffe9d232e9bca204c13527d5292643",
             "recorded": "2026-08-26",
             "reason": "upstream rolling branch advanced (85,946 -> 85,954 rows). "
                       "Re-recorded only after verifying that all 18 ICAO idents "
                       "consumed by build_coordinates.py (19 locations; Mulhouse and "
                       "Bale share LFSB) are byte-identical between the two versions, "
                       "so no coordinate changes. Verified fields: ident, name, "
                       "latitude_deg, longitude_deg, iso_country, type."},
        ],
    },
}


def sha256(p: pathlib.Path) -> str:
    h = hashlib.sha256()
    with p.open("rb") as f:
        for chunk in iter(lambda: f.read(1 << 20), b""):
            h.update(chunk)
    return h.hexdigest()


def fetch(name, spec):
    dest = HERE / name
    if not dest.exists():
        print(f"  ↓ {name} … ", end="", flush=True)
        req = urllib.request.Request(spec["url"],
                                     headers={"User-Agent": "aeroports-services-map-build"})
        data = urllib.request.urlopen(req, timeout=180).read()
        dest.write_bytes(data)
        print(f"{len(data):,} bytes")
    return dest


def main():
    record = "--record" in sys.argv
    lock = json.loads(LOCK.read_text()) if LOCK.exists() else {}
    ok = True
    print("Pinned geographic sources\n")
    for name, spec in SOURCES.items():
        dest = fetch(name, spec)
        digest = sha256(dest)
        expected = (lock.get(name, {}) or {}).get("sha256") or spec.get("sha256")
        if record or not expected:
            spec["sha256"] = digest
            print(f"  ✔ {name:16} {digest[:16]}…  recorded  ({dest.stat().st_size:,} B)")
        elif digest == expected:
            spec["sha256"] = digest
            print(f"  ✔ {name:16} {digest[:16]}…  checksum OK")
        else:
            ok = False
            print(f"  ✘ {name:16} CHECKSUM MISMATCH\n"
                  f"      expected {expected}\n      got      {digest}")
    if not ok:
        print("\nRefusing to continue: a source no longer matches its recorded checksum.")
        sys.exit(1)
    LOCK.write_text(json.dumps(SOURCES, ensure_ascii=False, indent=1), encoding="utf-8")
    print(f"\n  sources.lock.json written — {len(SOURCES)} sources, licences recorded")


if __name__ == "__main__":
    main()
