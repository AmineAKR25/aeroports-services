#!/usr/bin/env python3
"""Compose the revised styleframes page from the VERIFIED map geometry."""
import json, base64, html

M = json.load(open("map.json"))
LOGO = "data:image/png;base64," + base64.b64encode(
    open("/Users/Macbook/aeroports-services/reference/original-aeroports-services/"
         "brand/logo-aeroports-services.png", "rb").read()).decode()

VB, MW, MH = M["viewBox"], M["width"], M["height"]
CATS = [("airport", "Aéroports français", 14),
        ("maritime", "Gares maritimes", 4),
        ("rail", "Gares SNCF", 6),
        ("border", "Aéroports limitrophes", 5)]

# --- category marks: SHAPE carries the distinction, colour reinforces it -----
def mark(n, s=1.0, dark=False):
    x, y, c = n["sx"], n["sy"], n["cat"]
    col = {"airport": "#6ECDF7" if dark else "#01547A",
           "maritime": "#24B7F9" if dark else "#0180B9",
           "rail": "#9FD9F6" if dark else "#016998",
           "border": "#E8EDF2" if dark else "#3D4852"}[c]
    if c == "airport":
        return f'<circle cx="{x}" cy="{y}" r="{5.5*s:.1f}" fill="{col}"/>'
    if c == "maritime":
        h = 5.0 * s
        return f'<rect x="{x-h:.1f}" y="{y-h:.1f}" width="{2*h:.1f}" height="{2*h:.1f}" fill="{col}"/>'
    if c == "rail":
        w, h = 6.0 * s, 2.75 * s
        return f'<rect x="{x-w:.1f}" y="{y-h:.1f}" width="{2*w:.1f}" height="{2*h:.1f}" rx="1" fill="{col}"/>'
    r = 6.2 * s
    return (f'<polygon points="{x:.1f},{y-r:.1f} {x+r*0.92:.1f},{y+r*0.72:.1f} '
            f'{x-r*0.92:.1f},{y+r*0.72:.1f}" fill="none" stroke="{col}" stroke-width="{2.1*s:.1f}"/>')

def legend_mark(c, dark=False):
    col = {"airport": "#6ECDF7" if dark else "#01547A",
           "maritime": "#24B7F9" if dark else "#0180B9",
           "rail": "#9FD9F6" if dark else "#016998",
           "border": "#E8EDF2" if dark else "#3D4852"}[c]
    if c == "airport":  return f'<svg width="14" height="14" viewBox="0 0 14 14"><circle cx="7" cy="7" r="5" fill="{col}"/></svg>'
    if c == "maritime": return f'<svg width="14" height="14" viewBox="0 0 14 14"><rect x="2.5" y="2.5" width="9" height="9" fill="{col}"/></svg>'
    if c == "rail":     return f'<svg width="14" height="14" viewBox="0 0 14 14"><rect x="1" y="4.6" width="12" height="4.8" rx="1" fill="{col}"/></svg>'
    return f'<svg width="14" height="14" viewBox="0 0 14 14"><polygon points="7,1.6 12.5,11 1.5,11" fill="none" stroke="{col}" stroke-width="1.9"/></svg>'

def leader(l, dark=False):
    if not l.get("leader"): return ""
    ax = l["lx"] + (4 if l["anchor"] == "start" else (-4 if l["anchor"] == "end" else 0))
    return (f'<line x1="{l["x"]:.1f}" y1="{l["y"]:.1f}" x2="{ax:.1f}" y2="{l["ly"]-4:.1f}" '
            f'stroke="{"rgba(110,205,247,.45)" if dark else "#A9B4C0"}" stroke-width="1"/>')

def labels(dark=False, size=12):
    col = "#CFE6F5" if dark else "#26303A"
    halo = "#0B1219" if dark else "#FAFAFA"
    return "".join(
        leader(l, dark) +
        f'<text x="{l["lx"]}" y="{l["ly"]}" text-anchor="{l["anchor"]}" '
        f'font-family="IBM Plex Mono,monospace" font-size="{size}" fill="{col}" '
        f'stroke="{halo}" stroke-width="{size*0.24:.1f}" stroke-linejoin="round" '
        f'paint-order="stroke fill">{html.escape(l["text"])}</text>'
        for l in M["labels"] if l["lx"] is not None)

CTX_LIGHT = "".join(f'<path d="{p}" fill="#E6EAEE" stroke="#CBD3DA" stroke-width="1"/>'
                    for p in M["contextPaths"].values())
CTX_DARK = "".join(f'<path d="{p}" fill="#0E151C" stroke="#1E2A35" stroke-width="1"/>'
                   for p in M["contextPaths"].values())
NODES_LIGHT = "".join(mark(n) for n in M["nodes"])
NODES_DARK = "".join(mark(n, dark=True) for n in M["nodes"])
GLOW = "".join(f'<circle cx="{n["sx"]}" cy="{n["sy"]}" r="20" fill="url(#nodeGlow)"/>' for n in M["nodes"])

# ---- flat, verified reference map (light) ----------------------------------
FLAT_LIGHT = f'''<svg viewBox="{VB}" class="mapsvg" role="img"
 aria-label="Réseau Aéroports Services : 14 aéroports français, 4 gares maritimes, 6 gares SNCF parisiennes, 5 aéroports limitrophes.">
{CTX_LIGHT}<path d="{M['francePath']}" fill="#F4F7F9" stroke="#01547A" stroke-width="1.6"/>
{NODES_LIGHT}{labels()}</svg>'''

FLAT_HERO = f'''<svg viewBox="{VB}" class="mapsvg" role="img"
 aria-label="Réseau Aéroports Services : 14 aéroports français, 4 gares maritimes, 6 gares SNCF parisiennes, 5 aéroports limitrophes.">
{CTX_LIGHT}<path d="{M['francePath']}" fill="#F4F7F9" stroke="#01547A" stroke-width="2"/>
{"".join(mark(n, s=1.3) for n in M["nodes"])}{labels(size=17)}</svg>'''

# ---- cinematic perspective: SAME geometry, CSS transform only --------------
PERSPECTIVE = f'''<svg viewBox="{VB}" class="mapsvg" aria-hidden="true" focusable="false">
<defs><radialGradient id="nodeGlow"><stop offset="0%" stop-color="#6ECDF7" stop-opacity=".55"/>
<stop offset="100%" stop-color="#6ECDF7" stop-opacity="0"/></radialGradient>
<linearGradient id="frFill" x1="0" y1="0" x2="0" y2="1">
<stop offset="0%" stop-color="#1E86BC" stop-opacity=".30"/>
<stop offset="100%" stop-color="#0180B9" stop-opacity=".10"/></linearGradient></defs>
{CTX_DARK}<path d="{M['francePath']}" fill="rgba(1,128,185,.16)" stroke="#5CC8F5" stroke-width="3.2"
 stroke-linejoin="round" paint-order="stroke"/>
{GLOW}{"".join(mark(n, s=1.35, dark=True) for n in M["nodes"])}</svg>'''

# ---- mobile: genuinely simplified geometry, no labels ----------------------
MOBILE_MAP = f'''<svg viewBox="{VB}" class="mapsvg" aria-hidden="true" focusable="false">
<path d="{M['franceMobilePath']}" fill="rgba(1,128,185,.10)" stroke="#2FA8DC" stroke-width="3.4"/>
{"".join(mark(n, s=1.9, dark=True) for n in M["nodes"])}</svg>'''
MOBILE_MAP_LIGHT = f'''<svg viewBox="{VB}" class="mapsvg" aria-hidden="true" focusable="false">
<path d="{M['franceMobilePath']}" fill="#F1F4F6" stroke="#01547A" stroke-width="3"/>
{"".join(mark(n, s=1.9) for n in M["nodes"])}</svg>'''

def legend(dark=False):
    return '<ul class="legend">' + "".join(
        f'<li>{legend_mark(c, dark)}<span>{lab}</span><b>{n}</b></li>' for c, lab, n in CATS) + '</ul>'

# ---- the complete structured coverage list (mobile + a11y peer view) -------
GROUPS = {c: [n["name"] for n in M["nodes"] if n["cat"] == c] for c, _, _ in CATS}
def coverage_list(compact=False):
    rows = ""
    for c, lab, n in CATS:
        names = GROUPS[c]
        rows += (f'<div class="cvg-grp"><div class="cvg-h">{legend_mark(c, True)}'
                 f'<span>{lab}</span><b>{n}</b></div>'
                 f'<p class="cvg-l">{" · ".join(names)}</p></div>')
    return f'<div class="cvg">{rows}<p class="cvg-note">** Présent sur autres aéroports et/ou gares sur demande</p></div>'

SERVICES = [
    ("01", "Assistance aux passagers", [
        "Accueil et assistance de passagers au départ / à l'arrivée / en transit sur les aéroports et gares",
        "Remise de billets et documents de voyages",
        "Aide aux formalités d'enregistrement",
        "Traitement des irrégularités bagages",
        "Traitement VIP",
        "Gestion de l'imprévu (retard, reprotection, …)"]),
    ("02", "Représentation aéroportuaire", [
        "Agences de voyages / Tours opérateurs / Autocaristes",
        "Représentation auprès des différents acteurs aéroportuaires (ADP, CCI, compagnies, …)",
        "Accueil et traitement groupes",
        "Gestion de vols affrétés"]),
    ("03", "Compagnies aériennes — Brokers", [
        "Mise en place d'escale",
        "Contrôle et application des procédures",
        "Gestion des vols et supervision passager",
        "Piste, accueil PNT / PNC",
        "Audit de qualité"]),
    ("04", "Force de vente conseil", [
        "Relation de confiance",
        "Le travail de suivi relationnel",
        "L'écoute active",
        "Les méthodes : SPANCO / SONCAS / CAP / SIMAC"]),
]

def tabrail(active=0, dark=True):
    out = ""
    for i, (num, name, items) in enumerate(SERVICES):
        cls = "srv-tab on" if i == active else "srv-tab"
        out += (f'<div class="{cls}"><span class="srv-num">{num}</span>'
                f'<span class="srv-nm">{name}</span><span class="srv-ct">{len(items)}</span></div>')
    return f'<div class="srv-rail">{out}</div>'

def panel(i, cls="srv-panel"):
    num, name, items = SERVICES[i]
    lis = "".join(f"<li>{html.escape(x)}</li>" for x in items)
    return (f'<div class="{cls}"><div class="srv-eyebrow">{num} · Famille de prestations</div>'
            f'<h4 class="srv-title">{name}</h4><ul class="srv-list">{lis}</ul></div>')

open("frames_parts.json", "w").write(json.dumps({
    "LOGO": LOGO, "FLAT_LIGHT": FLAT_LIGHT, "FLAT_HERO": FLAT_HERO, "PERSPECTIVE": PERSPECTIVE,
    "MOBILE_MAP": MOBILE_MAP, "MOBILE_MAP_LIGHT": MOBILE_MAP_LIGHT,
    "LEGEND_LIGHT": legend(False), "LEGEND_DARK": legend(True),
    "COVERAGE": coverage_list(),
    "RAIL": tabrail(0), "PANEL0": panel(0), "PANEL1": panel(1),
    "PANEL2": panel(2), "PANEL3": panel(3),
    "PANELS_ALL": "".join(panel(i, "srv-card") for i in range(4)),
    "VB": VB, "MW": MW, "MH": MH,
    "counts": M["counts"], "notes": M["notes"], "projection": M["projection"],
}, ensure_ascii=False))
print("frames_parts.json written")
print("  nodes:", len(M["nodes"]), "| labels:", len([l for l in M['labels'] if l['lx']]))
