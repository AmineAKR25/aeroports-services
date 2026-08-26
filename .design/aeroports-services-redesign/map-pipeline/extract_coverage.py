#!/usr/bin/env python3
"""
Mechanically extract the coverage location list from the ARCHIVED original page.

This produces the canonical source of truth: `coverage-source.json`.
It is derived from the archive by parsing, never retyped. `build_map.py` compares
its own input against this file by exact set equality, so a location that is not
in the archive cannot reach the map, and a location in the archive cannot be
silently dropped.

Original spelling is preserved verbatim. Where the source elides a word
("Gare du Nord / de l'Est / de Lyon"), the raw token is kept AS IS — expanding it
is an interpretation and belongs in the coordinate enrichment layer, not here.
"""
import re, json, hashlib, pathlib, html as htmlmod

ARCHIVE = pathlib.Path(
    "/Users/Macbook/aeroports-services/reference/original-aeroports-services/raw/pages/accueil.html")
SOURCE_URL = "https://aeroports-services.fr/"

raw = ARCHIVE.read_bytes()
SHA = hashlib.sha256(raw).hexdigest()
doc = raw.decode("utf-8")

def clean(s):
    s = re.sub(r"<[^>]+>", "", s)
    s = htmlmod.unescape(s).replace("\xa0", " ")
    return re.sub(r"\s+", " ", s).strip()

# --- Selector 1: the three "grid-ibx" cards (title + description) -----------
CARD = re.compile(
    r'<h4 class="grid-ibx__title[^"]*"[^>]*>(?P<title>.*?)</h4>'
    r'.*?<p class="grid-ibx__desc">(?P<desc>.*?)</p>',
    re.S)

CARD_CATEGORIES = {
    "Aéroports Français":            ("airport",  ","),
    "Gares maritimes":               ("maritime", ","),
    "Gares ferroviaires françaises": ("rail",     "/"),
}

# --- Selector 2: the border-airport sentence in the zn_text_box -------------
BORDER = re.compile(
    r"aéroports limitrophes aux frontières françaises\s*:\s*(?P<list>.*?)<br",
    re.S)

records, provenance = [], []

for m in CARD.finditer(doc):
    title = clean(m.group("title"))
    if title not in CARD_CATEGORIES:
        continue
    cat, sep = CARD_CATEGORIES[title]
    desc_raw = m.group("desc")
    desc = clean(desc_raw)
    # the trailing "**" is the footnote marker, not a location
    body = desc.replace("**", "").strip().rstrip(",").strip()
    tokens = [t.strip() for t in body.split(sep)]
    tokens = [t for t in tokens if t]
    for t in tokens:
        records.append({"raw": t, "category": cat, "categoryLabel": title})
    provenance.append({
        "category": cat, "categoryLabel": title,
        "selector": 'h4.grid-ibx__title + … p.grid-ibx__desc',
        "separator": sep,
        "excerpt": desc,
        "count": len(tokens),
    })

mb = BORDER.search(doc)
assert mb, "border-airport sentence not found in the archived page"
border_txt = clean(mb.group("list"))
border_tokens = [t.strip() for t in border_txt.split("/") if t.strip()]
for t in border_tokens:
    records.append({"raw": t, "category": "border", "categoryLabel": "Aéroports limitrophes"})
provenance.append({
    "category": "border", "categoryLabel": "Aéroports limitrophes",
    "selector": 'div.zn_text_box p span — sentence "aéroports limitrophes aux frontières françaises :"',
    "separator": "/",
    "excerpt": clean(mb.group(0)).rstrip("<br").strip(),
    "count": len(border_tokens),
})

# --- The footnote is content, not a location -------------------------------
# The archive splits this sentence across two <span> elements:
#   ** : PRESENT SUR AUTRES AEROPORTS</span><span …>&nbsp;ET/OU GARES SUR DEMANDE</span>
# A [^<]* capture stops at the first tag and silently drops half the sentence —
# which is exactly what happened before. Capture to the closing </p>, then strip
# the tags, so the qualifier survives whole.
fn = re.search(r"(\*\*\s*:\s*.*?)</p>", doc, re.S)
footnote = clean(fn.group(1)) if fn else None
assert footnote and footnote.endswith("ET/OU GARES SUR DEMANDE"), \
    f"footnote truncated or not found: {footnote!r}"

counts = {}
for r in records:
    counts[r["category"]] = counts.get(r["category"], 0) + 1

# structural sanity only — NOT a correctness proof of the map
assert len(records) == len(set((r["raw"], r["category"]) for r in records)), \
    "the archive itself contains a duplicate (raw, category) pair"

# Category names exactly as the archived page words them. The UI may shorten a
# label for display, but the canonical string is this one.
category_labels = {p["category"]: p["categoryLabel"] for p in provenance}

out = {
    "$comment": "Canonical coverage source. Mechanically extracted from the archived "
                "original page. Do not hand-edit — re-run extract_coverage.py.",
    "categoryLabels": category_labels,
    "sourcePage": SOURCE_URL,
    "archiveFile": str(ARCHIVE.relative_to("/Users/Macbook/aeroports-services")),
    "archiveSha256": SHA,
    "extractedBy": "extract_coverage.py",
    "footnote": footnote,
    "counts": counts,
    "total": len(records),
    "provenance": provenance,
    "locations": records,
}
pathlib.Path(__file__).with_name("coverage-source.json").write_text(
    json.dumps(out, ensure_ascii=False, indent=1), encoding="utf-8")

print("Extracted from the archived page — no retyping:")
print(f"  archive : {out['archiveFile']}")
print(f"  sha256  : {SHA}")
for p in provenance:
    print(f"  {p['categoryLabel']:32} {p['count']:2}  «{p['excerpt'][:64]}…»")
print(f"  TOTAL   : {out['total']}  {counts}")
print(f"  footnote: {footnote}")
