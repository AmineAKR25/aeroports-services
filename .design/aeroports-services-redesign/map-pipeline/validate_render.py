#!/usr/bin/env python3
"""
Rendered label-collision validation.

The mathematical check in build_map.py uses an ESTIMATED character advance. This
one measures the truth: it renders the real SVG in a real browser, waits for
document.fonts.ready, then reads each <text> element's actual getBoundingClientRect
and tests every pair for overlap.

Widths tested are the widths the map is actually used at, not arbitrary ones:
  · coverage-1440  1272 px — /couverture content width at a 1440 viewport
  · hero-1440       700 px — the homepage hero column at a 1440 viewport
  · mobile-375      347 px — 375 viewport minus page padding
  · zoom-400        360 px — 1440 reflowed at 400% zoom (WCAG 1.4.10)
"""
import json, pathlib, subprocess, sys, re, base64

HERE = pathlib.Path(__file__).parent
M = json.loads((HERE / "map.json").read_text(encoding="utf-8"))
BRAVE = "/Applications/Brave Browser.app/Contents/MacOS/Brave Browser"

def marks(nodes, s=1.0):
    out = []
    for n in nodes:
        x, y, c = n["sx"], n["sy"], n["cat"]
        col = {"airport": "#01547A", "maritime": "#0180B9",
               "rail": "#016998", "border": "#3D4852"}[c]
        if c == "airport":
            out.append(f'<circle cx="{x}" cy="{y}" r="{5.5*s:.1f}" fill="{col}"/>')
        elif c == "maritime":
            h = 5.0*s
            out.append(f'<rect x="{x-h:.1f}" y="{y-h:.1f}" width="{2*h:.1f}" height="{2*h:.1f}" fill="{col}"/>')
        elif c == "rail":
            w, h = 6.0*s, 2.75*s
            out.append(f'<rect x="{x-w:.1f}" y="{y-h:.1f}" width="{2*w:.1f}" height="{2*h:.1f}" rx="1" fill="{col}"/>')
        else:
            r = 6.2*s
            out.append(f'<polygon points="{x:.1f},{y-r:.1f} {x+r*.92:.1f},{y+r*.72:.1f} '
                       f'{x-r*.92:.1f},{y+r*.72:.1f}" fill="none" stroke="{col}" stroke-width="{2.1*s:.1f}"/>')
    return "".join(out)

def labels(size):
    return "".join(
        f'<text data-l="{i}" x="{l["lx"]}" y="{l["ly"]}" text-anchor="{l["anchor"]}" '
        f'font-family="IBM Plex Mono, monospace" font-size="{size}" fill="#26303A" '
        f'stroke="#FAFAFA" stroke-width="{size*0.24:.1f}" stroke-linejoin="round" '
        f'paint-order="stroke fill">{l["text"]}</text>'
        for i, l in enumerate(M["labels"]) if l["lx"] is not None)

CTX = "".join(f'<path d="{p}" fill="#E6EAEE" stroke="#CBD3DA" stroke-width="1"/>'
              for p in M["contextPaths"].values())

def page(width, label_size, mobile=False):
    if mobile:
        body = (f'<path d="{M["franceMobilePath"]}" fill="#F1F4F6" stroke="#01547A" stroke-width="3"/>'
                + marks(M["nodes"], 1.9))
    else:
        body = (CTX + f'<path d="{M["francePath"]}" fill="#F4F7F9" stroke="#01547A" stroke-width="1.6"/>'
                + marks(M["nodes"]) + labels(label_size))
    return f'''<!doctype html><html lang="fr"><head><meta charset="utf-8">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&display=swap">
<style>html,body{{margin:0;background:#FAFAFA}}#w{{width:{width}px}}svg{{display:block;width:100%;height:auto}}
#out{{font:11px/1.4 monospace;white-space:pre-wrap;word-break:break-all;padding:6px;max-width:100%}}</style></head><body>
<div id="w"><svg viewBox="{M['viewBox']}">{body}</svg></div><pre id="out">pending</pre>
<script>
document.fonts.ready.then(()=>{{
  const t=[...document.querySelectorAll('text')];
  const boxes=t.map(e=>{{const r=e.getBoundingClientRect();
    return {{i:+e.dataset.l,txt:e.textContent,x:r.x,y:r.y,w:r.width,h:r.height}};}});
  const hits=[];
  for(let a=0;a<boxes.length;a++)for(let b=a+1;b<boxes.length;b++){{
    const A=boxes[a],B=boxes[b];
    if(!(A.x+A.w<B.x||B.x+B.w<A.x||A.y+A.h<B.y||B.y+B.h<A.y))
      hits.push([A.txt,B.txt]);
  }}
  const sw=document.getElementById('w').getBoundingClientRect();
  const tiny=boxes.filter(b=>b.h>0&&b.h<12).map(b=>b.txt);
  document.title='RESULT'+JSON.stringify({{
    width:{width}, rendered:boxes.length, overlaps:hits.length, pairs:hits.slice(0,8),
    minFontPx:+Math.min(...boxes.map(b=>b.h),999).toFixed(1),
    tinyLabels:tiny, svgWidth:+sw.width.toFixed(1),
    containerScrollW:document.getElementById('w').scrollWidth,
    svgOverflows: (+sw.width.toFixed(1)) > {width}+1,
    docScrollW:document.documentElement.scrollWidth, viewport:{width}
  }});
  document.getElementById('out').textContent=document.title;
}});
</script></body></html>'''

LS = M["labelSize"]     # the SAME size the placement maths used
CASES = [
    ("coverage-1440", 1272, LS, False),   # /couverture content width — must be fully labelled
    ("heroB-1440",     700, LS, False),   # Direction B hero column
    ("mobile-375",     347, LS, True),    # simplified, no labels
    ("zoom-400",       360, LS, True),    # 1440 reflowed at 400% — WCAG 1.4.10
]
READABLE_PX = 12.0      # minimum rendered label box height we accept

print("Rendered label-collision validation (real browser, fonts loaded)\n")
results, failed = [], False
for name, width, size, mobile in CASES:
    f = HERE / f"_v_{name}.html"
    f.write_text(page(width, size, mobile), encoding="utf-8")
    out = subprocess.run(
        [BRAVE, "--headless", "--disable-gpu", "--hide-scrollbars",
         f"--window-size={max(width,360)},1200", "--virtual-time-budget=6000",
         "--dump-dom", str(f)],
        capture_output=True, text=True, timeout=120).stdout
    m = re.search(r"RESULT(\{.*?\})</title>", out, re.S)
    if not m:
        print(f"  ✘ {name}: could not read measurement"); failed = True; continue
    r = json.loads(m.group(1)); r["case"] = name; results.append(r)
    # NB: headless Chrome/Brave clamps --window-size to a 500px minimum, so
    # documentElement.scrollWidth is useless below that. Measure the map's own
    # container instead: the map must not exceed the width it is given.
    no_overflow = (r["containerScrollW"] <= width + 1) and not r["svgOverflows"]
    ok = r["overlaps"] == 0 and no_overflow
    failed |= not ok
    if mobile:
        print(f"  {'✔' if ok else '✘'} {name:14} width {r['svgWidth']:>6.0f}px  "
              f"simplified map, {r['rendered']} labels  ·  fits its container: {no_overflow}")
    else:
        print(f"  {'✔' if ok else '✘'} {name:14} width {r['svgWidth']:>6.0f}px  "
              f"{r['rendered']:2} labels rendered  ·  overlaps: {r['overlaps']}  ·  "
              f"smallest label {r['minFontPx']}px")
        if r["overlaps"]:
            for a, b in r["pairs"]:
                print(f"      ✘ «{a}» ↔ «{b}»")
        if r["minFontPx"] < READABLE_PX:
            print(f"      ! labels below {READABLE_PX}px box height — the hero must drop "
                  f"labels at this width and rely on marks + legend")

(HERE / "render-validation.json").write_text(json.dumps(results, ensure_ascii=False, indent=1))
print(f"\n  render-validation.json written")
sys.exit(1 if failed else 0)
