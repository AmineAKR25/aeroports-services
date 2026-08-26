#!/usr/bin/env python3
"""
Build the coordinate ENRICHMENT layer: coverage-source.json  ->  coordinates.json

This layer maps each archived location token to a real-world facility and a
latitude/longitude. It is deliberately separate from the canonical source:

  · coverage-source.json defines WHICH locations exist.       (from the archive)
  · coordinates.json defines WHERE each one is.               (interpretation)

The enrichment may never add or remove a location. build_map.py enforces that by
exact set equality in both directions.

Coordinate provenance is recorded per location:
  · airports  — derived MECHANICALLY from OurAirports by ICAO ident. The matched
                row's ident, name and coordinates are recorded verbatim.
  · maritime / rail — no authoritative open dataset was used, so these are
                recorded as MANUAL and marked provisional. They are approximate
                positions for the named facility and need confirmation.
"""
import csv, json, pathlib, hashlib

HERE = pathlib.Path(__file__).parent
SRC = json.loads((HERE / "coverage-source.json").read_text(encoding="utf-8"))
LOCK = json.loads((HERE / "sources.lock.json").read_text(encoding="utf-8"))

# ---------------------------------------------------------------------------
# Interpretation table: archived token  ->  facility identifier
# Every entry states how confident the reading is. V21 items stay provisional.
# ---------------------------------------------------------------------------
ICAO = {
    ("Orly", "airport"):        ("LFPO", "confirmed",   None),
    ("Roissy", "airport"):      ("LFPG", "provisional", "V21 — 'Roissy' read as Paris-Charles-de-Gaulle (LFPG). "
                                                        "The commune of Roissy-en-France hosts CDG; the archive does not say so explicitly."),
    ("Le Bourget", "airport"):  ("LFPB", "confirmed",   None),
    ("Lyon", "airport"):        ("LFLL", "confirmed",   None),
    ("Bordeaux", "airport"):    ("LFBD", "confirmed",   None),
    ("Nice", "airport"):        ("LFMN", "confirmed",   None),
    ("Marseille", "airport"):   ("LFML", "confirmed",   None),
    ("Toulouse", "airport"):    ("LFBO", "confirmed",   None),
    ("Mulhouse", "airport"):    ("LFSB", "provisional", "V21 — resolves to EuroAirport Basel-Mulhouse-Freiburg, "
                                                        "the SAME facility as the 'Bâle' entry in the limitrophe list."),
    ("Nantes", "airport"):      ("LFRS", "confirmed",   None),
    ("Metz", "airport"):        ("LFJL", "provisional", "V21 — 'Metz' read as Metz-Nancy-Lorraine (LFJL). "
                                                        "Not stated in the archive."),
    ("Strasbourg", "airport"):  ("LFST", "confirmed",   None),
    ("Lille", "airport"):       ("LFQQ", "confirmed",   None),
    ("Brest", "airport"):       ("LFRB", "confirmed",   None),
    ("Bruxelles", "border"):    ("EBBR", "confirmed",   None),
    ("Francfort", "border"):    ("EDDF", "confirmed",   None),
    ("Bâle", "border"):         ("LFSB", "provisional", "V21 — same facility as the 'Mulhouse' airport entry."),
    ("Genève", "border"):       ("LSGG", "confirmed",   None),
    ("Zurich", "border"):       ("LSZH", "confirmed",   None),
}

# Manual coordinates — no authoritative open dataset consulted. Provisional.
MANUAL = {
    ("Le Havre", "maritime"):     ("Terminal croisière du Havre",        49.4839,  0.1077),
    ("Monaco", "maritime"):       ("Port Hercule, Monaco",               43.7355,  7.4197),
    ("Marseille", "maritime"):    ("Grand Port Maritime de Marseille",   43.3070,  5.3660),
    ("Cherbourg", "maritime"):    ("Port de Cherbourg",                  49.6450, -1.6220),
    ("Gare du Nord", "rail"):     ("Gare du Nord, Paris",                48.8809,  2.3553),
    ("de l'Est", "rail"):         ("Gare de l'Est, Paris",               48.8768,  2.3590),
    ("de Lyon", "rail"):          ("Gare de Lyon, Paris",                48.8443,  2.3743),
    ("d'Austerlitz", "rail"):     ("Gare d'Austerlitz, Paris",           48.8422,  2.3660),
    ("de Bercy", "rail"):         ("Gare de Bercy, Paris",               48.8390,  2.3824),
    ("Montparnasse", "rail"):     ("Gare Montparnasse, Paris",           48.8412,  2.3208),
}

# Display names. The archive elides "Gare" in the rail list; expanding it is an
# interpretation, so the raw token is preserved alongside.
DISPLAY = {
    ("de l'Est", "rail"):     "Gare de l'Est",
    ("de Lyon", "rail"):      "Gare de Lyon",
    ("d'Austerlitz", "rail"): "Gare d'Austerlitz",
    ("de Bercy", "rail"):     "Gare de Bercy",
}

airports = {}
with (HERE / "airports.csv").open(encoding="utf-8") as f:
    for row in csv.DictReader(f):
        if row["ident"] in {v[0] for v in ICAO.values()}:
            airports[row["ident"]] = row

out, missing = [], []
for rec in SRC["locations"]:
    key = (rec["raw"], rec["category"])
    entry = {
        "raw": rec["raw"],
        "category": rec["category"],
        "display": DISPLAY.get(key, rec["raw"]),
    }
    if key in ICAO:
        ident, status, note = ICAO[key]
        row = airports.get(ident)
        if not row:
            missing.append(key); continue
        entry.update({
            "interpretedFacility": row["name"],
            "lat": float(row["latitude_deg"]),
            "lon": float(row["longitude_deg"]),
            "coordinateSource": "OurAirports airports.csv",
            "sourceIdentifier": f"ident={ident} icao={row['icao_code'] or ident} iata={row['iata_code']}",
            "sourceUrl": LOCK["airports.csv"]["url"],
            "sourceSha256": LOCK["airports.csv"]["sha256"],
            "derivation": "mechanical — matched by ICAO ident, coordinates copied verbatim",
            "verificationStatus": status,
            "note": note,
        })
    elif key in MANUAL:
        facility, lat, lon = MANUAL[key]
        entry.update({
            "interpretedFacility": facility,
            "lat": lat, "lon": lon,
            "coordinateSource": "manual",
            "sourceIdentifier": None,
            "sourceUrl": None,
            "sourceSha256": None,
            "derivation": "manual — approximate position of the named facility; "
                          "no authoritative open dataset was consulted",
            "verificationStatus": "provisional",
            "note": "Maritime terminals and SNCF termini are not covered by the airport "
                    "dataset. Confirm against an authoritative source before launch (V22).",
        })
    else:
        missing.append(key); continue
    out.append(entry)

assert not missing, f"no coordinate rule for: {missing}"

by_status = {}
for e in out:
    by_status[e["verificationStatus"]] = by_status.get(e["verificationStatus"], 0) + 1
by_deriv = {}
for e in out:
    k = e["coordinateSource"]
    by_deriv[k] = by_deriv.get(k, 0) + 1

doc = {
    "$comment": "Coordinate ENRICHMENT layer. Does not define which locations exist — "
                "coverage-source.json does. Regenerate with build_coordinates.py.",
    "derivedFrom": {
        "coverageSource": "coverage-source.json",
        "archiveSha256": SRC["archiveSha256"],
    },
    "summary": {"total": len(out), "byCoordinateSource": by_deriv,
                "byVerificationStatus": by_status},
    "locations": out,
}
(HERE / "coordinates.json").write_text(json.dumps(doc, ensure_ascii=False, indent=1),
                                       encoding="utf-8")

print("Coordinate enrichment built")
print(f"  total            : {len(out)}")
print(f"  by source        : {by_deriv}")
print(f"  by status        : {by_status}")
print("  provisional (V21/V22):")
for e in out:
    if e["verificationStatus"] != "confirmed":
        print(f"    · {e['display']:22} {e['interpretedFacility'][:46]}")
