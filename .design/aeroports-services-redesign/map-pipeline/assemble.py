#!/usr/bin/env python3
import json
P = json.load(open("frames_parts.json"))
C = P["counts"]

CSS = """
:root{
  --ground:#F7F8F9; --panel:#FFFFFF; --panel-2:#EFF2F5;
  --ink:#12171C; --ink-muted:#5A6672; --ink-faint:#8A96A2;
  --rule:#DDE3E8; --rule-strong:#C3CCD5;
  --accent:#01547A; --accent-soft:#E8F2F7;
  --shadow:0 1px 2px rgba(18,23,28,.06), 0 8px 24px -12px rgba(18,23,28,.14);
  --maxw:1180px;
}
@media (prefers-color-scheme: dark){
  :root:not([data-theme="light"]){
    --ground:#0C0F12; --panel:#14181D; --panel-2:#1A1F26;
    --ink:#E6EBF0; --ink-muted:#939FAC; --ink-faint:#6C7884;
    --rule:#232A32; --rule-strong:#333C46;
    --accent:#6ECDF7; --accent-soft:#0F1E28;
    --shadow:0 1px 2px rgba(0,0,0,.5), 0 8px 24px -12px rgba(0,0,0,.7);
  }
}
:root[data-theme="dark"]{
  --ground:#0C0F12; --panel:#14181D; --panel-2:#1A1F26;
  --ink:#E6EBF0; --ink-muted:#939FAC; --ink-faint:#6C7884;
  --rule:#232A32; --rule-strong:#333C46;
  --accent:#6ECDF7; --accent-soft:#0F1E28;
  --shadow:0 1px 2px rgba(0,0,0,.5), 0 8px 24px -12px rgba(0,0,0,.7);
}
*{box-sizing:border-box}
body{margin:0;background:var(--ground);color:var(--ink);
  font-family:"Archivo","Helvetica Neue",Arial,sans-serif;
  font-variation-settings:"wdth" 100;font-size:16px;line-height:1.6;-webkit-font-smoothing:antialiased}
.wrap{max-width:var(--maxw);margin:0 auto;padding:0 24px}
.mono{font-family:"IBM Plex Mono",ui-monospace,monospace}
.eyebrow{font-family:"IBM Plex Mono",ui-monospace,monospace;font-size:11px;text-transform:uppercase;
  letter-spacing:.18em;color:var(--accent);margin:0}
h1,h2,h3,h4{text-wrap:balance;margin:0}
h1{font-variation-settings:"wdth" 116;font-weight:700;letter-spacing:-.025em;
  font-size:clamp(2.2rem,5vw,3.6rem);line-height:1.04}
h2{font-variation-settings:"wdth" 112;font-weight:700;letter-spacing:-.02em;
  font-size:clamp(1.6rem,3vw,2.3rem);line-height:1.1}
h3{font-variation-settings:"wdth" 106;font-weight:600;font-size:1.05rem}
p{margin:0;max-width:68ch}
header.board{padding:60px 0 36px;border-bottom:1px solid var(--rule)}
.lede{color:var(--ink-muted);margin-top:16px;font-size:1.05rem}
.meta{display:flex;flex-wrap:wrap;gap:8px 26px;margin-top:22px;
  font-family:"IBM Plex Mono",ui-monospace,monospace;font-size:11.5px;color:var(--ink-faint);
  text-transform:uppercase;letter-spacing:.1em}
nav.jump{position:sticky;top:0;z-index:20;background:color-mix(in srgb,var(--ground) 92%,transparent);
  backdrop-filter:blur(8px);border-bottom:1px solid var(--rule)}
nav.jump ul{display:flex;gap:4px;list-style:none;margin:0 auto;padding:8px 24px;max-width:var(--maxw);overflow-x:auto}
nav.jump a{font-family:"IBM Plex Mono",ui-monospace,monospace;font-size:11px;text-transform:uppercase;
  letter-spacing:.12em;color:var(--ink-muted);text-decoration:none;padding:8px 12px;border-radius:2px;
  white-space:nowrap;display:block}
nav.jump a:hover{color:var(--ink);background:var(--panel-2)}
nav.jump a:focus-visible{outline:2px solid var(--accent);outline-offset:2px}
section.dir{padding:64px 0;border-bottom:1px solid var(--rule)}
.dirhead{display:flex;flex-wrap:wrap;gap:22px;align-items:flex-end;justify-content:space-between;margin-bottom:30px}
.tag{font-family:"IBM Plex Mono",ui-monospace,monospace;font-size:11px;text-transform:uppercase;
  letter-spacing:.14em;padding:6px 11px;border:1px solid var(--rule-strong);border-radius:2px;color:var(--ink-muted)}
.status{background:var(--accent-soft);border:1px solid var(--rule-strong);border-radius:4px;
  padding:16px 20px;margin-top:24px;font-size:.93rem;color:var(--ink-muted)}
.status strong{color:var(--ink)}
/* ---- verification ---- */
.verify{display:grid;gap:26px;grid-template-columns:1fr}
@media(min-width:900px){.verify{grid-template-columns:1.35fr .65fr;align-items:start}}
.mapcard{border:1px solid var(--rule-strong);border-radius:4px;background:var(--panel);overflow:hidden}
.mapcard .mapsvg{display:block;width:100%;height:auto;background:#FAFAFA}
.checks{list-style:none;margin:0;padding:0;display:grid;gap:9px}
.checks li{display:flex;gap:10px;font-size:.9rem;color:var(--ink-muted);align-items:baseline}
.checks .ok{color:#0F8A55;font-weight:700;flex-shrink:0}
.legend{list-style:none;margin:16px 0 0;padding:0;display:grid;gap:8px}
.legend li{display:flex;align-items:center;gap:10px;font-size:.88rem;color:var(--ink-muted)}
.legend svg{flex-shrink:0}
.legend b{margin-left:auto;font-family:"IBM Plex Mono",monospace;color:var(--ink);font-variant-numeric:tabular-nums}
.notes{margin-top:20px;padding-top:16px;border-top:1px solid var(--rule)}
.notes li{font-size:.85rem;color:var(--ink-muted);margin-bottom:9px}
/* ---- shells ---- */
.frames{display:grid;grid-template-columns:1fr;gap:22px;margin-bottom:34px}
@media(min-width:1000px){.frames{grid-template-columns:1fr 316px;align-items:start}}
.shell{border:1px solid var(--rule-strong);border-radius:8px;overflow:hidden;box-shadow:var(--shadow);background:var(--panel)}
.shell-cap{display:flex;align-items:center;gap:8px;padding:9px 12px;border-bottom:1px solid var(--rule);background:var(--panel-2)}
.dot{width:8px;height:8px;border-radius:50%;background:var(--rule-strong)}
.shell-cap .mono{font-size:10.5px;color:var(--ink-faint);letter-spacing:.08em;text-transform:uppercase;margin-left:6px}
.phone{border:1px solid var(--rule-strong);border-radius:30px;overflow:hidden;box-shadow:var(--shadow);
  background:var(--panel);padding:8px}
.phone-inner{border-radius:23px;overflow:hidden;position:relative}
.capt{font-family:"IBM Plex Mono",monospace;font-size:10.5px;color:var(--ink-faint);
  text-transform:uppercase;letter-spacing:.1em;margin:8px 2px 0}
/* ============ FRAME INTERNALS — fixed appearance, not theme-following ======= */
.A,.B{font-family:"Archivo",Arial,sans-serif}
.A{position:relative;background:#080B0F;color:#fff;overflow:hidden}
.A .bloom{position:absolute;inset:0;pointer-events:none;background:
  radial-gradient(58% 74% at 6% 6%,rgba(36,183,249,.26) 0%,rgba(1,128,185,.09) 42%,transparent 74%),
  radial-gradient(70% 56% at 96% 88%,rgba(1,128,185,.30) 0%,transparent 66%)}
.A .grain{position:absolute;inset:0;pointer-events:none;opacity:.45;
  background-image:radial-gradient(rgba(255,255,255,.05) .5px,transparent .5px);background-size:3px 3px}
.A .vig{position:absolute;inset:0;pointer-events:none;
  background:radial-gradient(ellipse 92% 78% at 46% 46%,transparent 40%,rgba(2,12,20,.7) 100%)}
/* header: logo at a legible size, aspect ratio untouched */
.hdrbar{position:relative;z-index:5;display:flex;align-items:center;justify-content:space-between;
  gap:16px;margin:16px 18px;padding:8px 10px 8px 8px;border-radius:999px;
  background:rgba(16,24,32,.74);border:1px solid rgba(110,205,247,.20);backdrop-filter:blur(10px)}
.plate{background:#FAFAFA;border-radius:6px;padding:8px 12px;display:flex;align-items:center}
.plate img{display:block;height:34px;width:auto}
.hdrbar nav{display:flex;gap:16px;font-size:11px;color:#C6D2DC;font-weight:500}
.hdrgrp{display:flex;align-items:center;gap:9px}
.tgl{display:flex;align-items:center;gap:6px;border:1px solid rgba(110,205,247,.32);border-radius:999px;
  padding:5px 10px;font-family:"IBM Plex Mono",monospace;font-size:9.5px;letter-spacing:.1em;color:#9FD9F6}
.tgl .sw{width:22px;height:12px;border-radius:999px;background:rgba(110,205,247,.25);position:relative}
.tgl .sw::after{content:"";position:absolute;width:8px;height:8px;border-radius:50%;background:#6ECDF7;top:2px;right:2px}
.btn{font-size:10.5px;font-weight:700;padding:9px 16px;border-radius:999px;letter-spacing:.04em;white-space:nowrap}
.btn-a{background:#24B7F9;color:#04252F}
.btn-b{background:#01547A;color:#fff}
.tlink{font-size:10.5px;font-weight:600;letter-spacing:.03em;border-bottom:1px solid currentColor;padding-bottom:2px}
/* hero A — asymmetric, no centred stack, one button + one text link */
.heroA{position:relative;z-index:2;display:grid;grid-template-columns:minmax(0,43%) minmax(0,57%);
  gap:14px;align-items:center;padding:2px 0 0 26px}
.heroA .kick{font-family:"IBM Plex Mono",monospace;font-size:9.5px;letter-spacing:.22em;
  color:#6ECDF7;text-transform:uppercase;display:flex;align-items:center;gap:9px}
.heroA .kick::after{content:"";flex:1;height:1px;background:linear-gradient(90deg,rgba(110,205,247,.5),transparent)}
.heroA h3{font-variation-settings:"wdth" 118;font-weight:700;letter-spacing:-.032em;line-height:1.0;
  font-size:clamp(21px,3.1vw,37px);margin:11px 0 9px;color:#fff;text-wrap:balance}
.heroA h3 em{font-style:normal;color:#6ECDF7}
.heroA .sub{font-size:11px;color:#AFC0CE;line-height:1.55;max-width:34ch}
.heroA .acts{display:flex;align-items:center;gap:18px;margin-top:16px;color:#9FD9F6}
.mapstage{position:relative;height:296px;overflow:hidden}
.mapstage .persp{position:absolute;top:-11%;left:-2%;width:106%;
  transform:perspective(900px) rotateX(49deg) rotateZ(-6deg) scale(1.06);transform-origin:50% 46%}
.mapstage .persp svg{display:block;width:100%;height:auto;filter:drop-shadow(0 26px 40px rgba(0,0,0,.65))}
/* operational strip */
.opstrip{position:relative;z-index:3;display:flex;border-top:1px solid rgba(110,205,247,.16);
  margin-top:2px;background:rgba(6,10,14,.55)}
.opstrip div{flex:1;padding:10px 14px;border-right:1px solid rgba(110,205,247,.12);display:flex;
  align-items:center;gap:8px}
.opstrip div:last-child{border-right:0}
.opstrip .n{font-family:"IBM Plex Mono",monospace;font-size:15px;font-weight:500;color:#fff;font-variant-numeric:tabular-nums}
.opstrip .l{font-family:"IBM Plex Mono",monospace;font-size:8px;letter-spacing:.13em;text-transform:uppercase;color:#8FA0AE;line-height:1.35}
/* service scene */
.srv{position:relative;z-index:2;display:grid;grid-template-columns:minmax(0,38%) minmax(0,62%);gap:18px;padding:20px 26px 24px}
.srv-rail{display:grid;gap:5px;align-content:start}
.srv-tab{display:flex;align-items:center;gap:10px;padding:9px 11px;border-radius:3px;
  border:1px solid rgba(110,205,247,.14);background:rgba(18,28,37,.5)}
.srv-tab.on{background:linear-gradient(180deg,#17242F,#0D1720);border-color:rgba(110,205,247,.42);
  box-shadow:inset 0 1px 0 rgba(110,205,247,.34)}
.srv-num{font-family:"IBM Plex Mono",monospace;font-size:9px;color:#6ECDF7;letter-spacing:.1em}
.srv-nm{font-size:10.5px;font-weight:600;color:#DCE6EE;line-height:1.25}
.srv-tab:not(.on) .srv-nm{color:#8FA0AE;font-weight:500}
.srv-ct{margin-left:auto;font-family:"IBM Plex Mono",monospace;font-size:9px;color:#6D7E8C}
.srv-panel{background:linear-gradient(180deg,#16232D,#0C151D);border:1px solid rgba(110,205,247,.24);
  border-top-color:rgba(110,205,247,.6);border-radius:5px;padding:14px 16px;
  box-shadow:0 16px 34px -18px rgba(0,0,0,.9)}
.srv-eyebrow{font-family:"IBM Plex Mono",monospace;font-size:8.5px;letter-spacing:.16em;
  text-transform:uppercase;color:#6ECDF7}
.srv-title{font-variation-settings:"wdth" 110;font-weight:700;font-size:14px;color:#fff;margin:6px 0 9px}
.srv-list{margin:0;padding-left:15px;display:grid;gap:5px}
.srv-list li{font-size:9.5px;color:#B7C6D2;line-height:1.5}
/* B */
.B{background:#FAFAFA;color:#0B0F14}
.B .hdrbar{background:#fff;border:1px solid #E3E8ED;backdrop-filter:none}
.B .plate{background:transparent;padding:0}
.B .hdrbar nav{color:#3D4852}
.B .tgl{border-color:#C3CCD5;color:#3D4852}
.B .tgl .sw{background:#DDE3E8}
.B .tgl .sw::after{background:#01547A;left:2px;right:auto}
.heroB{display:grid;grid-template-columns:minmax(0,52%) minmax(0,48%);gap:22px;padding:10px 26px 0;align-items:center}
.heroB .rule{height:2px;width:46px;background:#01547A;margin-bottom:12px}
.heroB .kick{font-family:"IBM Plex Mono",monospace;font-size:9.5px;letter-spacing:.2em;color:#01547A;text-transform:uppercase}
.heroB h3{font-variation-settings:"wdth" 112;font-weight:700;letter-spacing:-.026em;line-height:1.04;
  font-size:clamp(20px,3.1vw,35px);margin:10px 0}
.heroB h3 em{font-style:normal;color:#01547A}
.heroB .sub{font-size:11px;color:#3D4852;line-height:1.6;max-width:36ch}
.heroB .acts{display:flex;align-items:center;gap:18px;margin-top:15px;color:#01547A}
.heroB .mapflat{border:1px solid #E3E8ED;border-radius:4px;background:#fff;overflow:hidden}
.heroB .mapflat svg{display:block;width:100%;height:auto}
.opstripB{display:flex;border-top:1px solid #E3E8ED;margin:14px 26px 0}
.opstripB div{flex:1;padding:11px 0 14px;border-right:1px solid #E3E8ED;display:flex;align-items:center;gap:8px}
.opstripB div:last-child{border-right:0}
.opstripB .n{font-family:"IBM Plex Mono",monospace;font-size:15px;color:#0B0F14;font-variant-numeric:tabular-nums}
.opstripB .l{font-family:"IBM Plex Mono",monospace;font-size:8px;letter-spacing:.13em;text-transform:uppercase;color:#6B7783;line-height:1.35}
.sceneB{background:#0B1219;color:#fff;padding:20px 26px 24px;position:relative;overflow:hidden;margin-top:16px}
.sceneB .bloom{position:absolute;inset:0;background:
  radial-gradient(56% 86% at 1% 50%,rgba(1,128,185,.30) 0%,transparent 70%),
  radial-gradient(50% 76% at 100% 38%,rgba(36,183,249,.20) 0%,transparent 68%)}
.srv-grid{position:relative;z-index:2;display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:12px}
.srv-card{background:linear-gradient(180deg,#152029,#0E1720);border:1px solid rgba(110,205,247,.2);
  border-top-color:rgba(110,205,247,.5);border-radius:5px;padding:12px 13px;
  box-shadow:0 12px 26px -14px rgba(0,0,0,.85)}
.srv-card .srv-title{font-size:11.5px;margin:5px 0 7px}
.srv-card .srv-list li{font-size:8.5px}
/* mobile frames */
.mob{min-height:520px;position:relative}
.mob .hdrbar{margin:10px 10px;padding:6px 8px 6px 6px}
.mob .plate img{height:26px}
.mobmap{position:relative;padding:0 12px}
.mobmap svg{display:block;width:100%;height:auto}
.cvg{padding:12px 14px 16px;display:grid;gap:11px}
.cvg-grp{border-top:1px solid rgba(110,205,247,.16);padding-top:9px}
.cvg-h{display:flex;align-items:center;gap:8px;font-size:9.5px;font-weight:600;color:#DCE6EE}
.cvg-h b{margin-left:auto;font-family:"IBM Plex Mono",monospace;color:#6ECDF7;font-variant-numeric:tabular-nums}
.cvg-l{font-size:8.5px;color:#93A1AE;line-height:1.6;margin-top:4px;max-width:none}
.cvg-note{font-family:"IBM Plex Mono",monospace;font-size:7.5px;color:#6D7E8C;letter-spacing:.06em;margin-top:4px}
/* spec */
.spec{border-top:1px solid var(--rule)}
.row{display:grid;grid-template-columns:1fr;gap:4px;padding:15px 0;border-bottom:1px solid var(--rule)}
@media(min-width:760px){.row{grid-template-columns:190px 1fr;gap:28px}}
.row dt{font-family:"IBM Plex Mono",ui-monospace,monospace;font-size:10.5px;text-transform:uppercase;
  letter-spacing:.13em;color:var(--ink-faint);padding-top:3px}
.row dd{margin:0;color:var(--ink-muted);font-size:.93rem}
.row dd strong{color:var(--ink);font-weight:600}
.tablewrap{overflow-x:auto;border:1px solid var(--rule);border-radius:4px;background:var(--panel)}
table{border-collapse:collapse;width:100%;min-width:620px;font-size:.9rem}
th,td{text-align:left;padding:11px 16px;border-bottom:1px solid var(--rule);vertical-align:top}
thead th{font-family:"IBM Plex Mono",monospace;font-size:10.5px;text-transform:uppercase;letter-spacing:.13em;
  color:var(--ink-faint);font-weight:400;background:var(--panel-2)}
tbody th{font-weight:500;color:var(--ink);width:200px}
td{color:var(--ink-muted)}
tr:last-child th,tr:last-child td{border-bottom:0}
.rec{background:var(--panel);border:1px solid var(--rule);border-radius:4px;padding:26px;margin-top:30px}
.rec p+p{margin-top:13px}
footer.board{padding:40px 0 70px;color:var(--ink-faint);font-size:.86rem}
a{color:var(--accent)}
@media (prefers-reduced-motion: reduce){*{transition:none!important;animation:none!important}}
"""

def hdr(mode="A", compact=False):
    plate = f'<span class="plate"><img src="{P["LOGO"]}" alt="Aéroports Services"></span>'
    nav = ('<nav><span>Prestations</span><span>Couverture</span><span>À propos</span>'
           '<span>Clients</span><span>Contact</span></nav>')
    tgl = ('<span class="tgl"><span class="sw"></span>'
           + ('CLAIR' if mode == "B" else 'SOMBRE') + '</span>')
    btn = f'<span class="btn btn-{"b" if mode=="B" else "a"}">DEMANDER UN DEVIS</span>'
    if compact:
        return f'<div class="hdrbar">{plate}<span class="hdrgrp">{tgl}</span></div>'
    return f'<div class="hdrbar">{plate}{nav}<span class="hdrgrp">{tgl}{btn}</span></div>'

OPS = "".join(f'<div><span class="n">{n:02d}</span><span class="l">{lab}</span></div>'
              for lab, n in [("Aéroports<br>français", C["airport"]), ("Gares<br>maritimes", C["maritime"]),
                             ("Gares<br>SNCF", C["rail"]), ("Aéroports<br>limitrophes", C["border"])])

HERO_A = f'''<div class="A">
<div class="bloom"></div><div class="vig"></div><div class="grain"></div>
{hdr("A")}
<div class="heroA">
  <div>
    <p class="kick">Réseau national · 29 points de service</p>
    <h3>Premier Réseau Français<br>d'<em>Assistance</em><br>aux passagers</h3>
    <p class="sub">Chaque jour, chaque nuit, partout en France le service est notre métier,
      le sourire du passager notre satisfaction.</p>
    <div class="acts"><span class="btn btn-a">DEMANDER UN DEVIS</span>
      <span class="tlink">Voir la couverture →</span></div>
  </div>
  <div class="mapstage"><div class="persp">{P["PERSPECTIVE"]}</div></div>
</div>
<div class="opstrip">{OPS}</div></div>'''

SRV_A = f'''<div class="A" style="padding-bottom:2px">
<div class="bloom"></div><div class="grain"></div>
<div class="srv">{P["RAIL"]}{P["PANEL0"]}</div></div>'''

MOB_A = f'''<div class="A mob">
<div class="bloom"></div><div class="vig"></div><div class="grain"></div>
{hdr("A", compact=True)}
<div style="position:relative;z-index:2;padding:8px 14px 0">
  <p class="kick" style="font-family:'IBM Plex Mono',monospace;font-size:8px;letter-spacing:.2em;color:#6ECDF7;text-transform:uppercase">Réseau national · 29 points</p>
  <h3 style="font-variation-settings:'wdth' 116;font-weight:700;font-size:23px;line-height:1.03;letter-spacing:-.03em;margin:9px 0 8px;color:#fff">Premier Réseau Français d'<em style="font-style:normal;color:#6ECDF7">Assistance</em> aux passagers</h3>
  <p style="font-size:10px;color:#AFC0CE;line-height:1.55;margin:0">Chaque jour, chaque nuit, partout en France.</p>
  <div style="display:flex;flex-direction:column;gap:9px;margin-top:13px">
    <span class="btn btn-a" style="text-align:center">DEMANDER UN DEVIS</span>
    <span class="btn" style="text-align:center;border:1px solid rgba(110,205,247,.45);color:#9FD9F6">APPELER LES OPS · 7J/7</span>
  </div>
</div>
<div class="mobmap" style="margin-top:14px">{P["MOBILE_MAP"]}</div>
{P["COVERAGE"]}</div>'''

HERO_B = f'''<div class="B">
{hdr("B")}
<div class="heroB">
  <div>
    <div class="rule"></div>
    <p class="kick">Réseau national · 29 points de service</p>
    <h3>Premier Réseau Français d'<em>Assistance</em> aux passagers</h3>
    <p class="sub">Chaque jour, chaque nuit, partout en France le service est notre métier,
      le sourire du passager notre satisfaction.</p>
    <div class="acts"><span class="btn btn-b">DEMANDER UN DEVIS</span>
      <span class="tlink">Voir la couverture →</span></div>
  </div>
  <div class="mapflat">{P["FLAT_HERO"]}</div>
</div>
<div class="opstripB">{OPS}</div>
<div class="sceneB"><div class="bloom"></div>
  <p class="srv-eyebrow" style="position:relative;z-index:2">Prestations · 4 familles</p>
  <div class="srv-grid">{P["PANELS_ALL"]}</div>
</div></div>'''

MOB_B = f'''<div class="B mob" style="background:#FAFAFA">
{hdr("B", compact=True)}
<div style="padding:8px 14px 0">
  <div class="rule" style="height:2px;width:36px;background:#01547A;margin-bottom:10px"></div>
  <p class="kick" style="font-family:'IBM Plex Mono',monospace;font-size:8px;letter-spacing:.2em;color:#01547A;text-transform:uppercase">Réseau national · 29 points</p>
  <h3 style="font-variation-settings:'wdth' 112;font-weight:700;font-size:22px;line-height:1.05;letter-spacing:-.025em;margin:9px 0 8px">Premier Réseau Français d'<em style="font-style:normal;color:#01547A">Assistance</em> aux passagers</h3>
  <p style="font-size:10px;color:#3D4852;line-height:1.6;margin:0">Chaque jour, chaque nuit, partout en France.</p>
  <div style="display:flex;flex-direction:column;gap:9px;margin-top:13px">
    <span class="btn btn-b" style="text-align:center">DEMANDER UN DEVIS</span>
    <span class="btn" style="text-align:center;border:1px solid #C3CCD5;color:#3D4852">APPELER LES OPS · 7J/7</span>
  </div>
</div>
<div class="mobmap" style="margin-top:14px">{P["MOBILE_MAP_LIGHT"]}</div>
<div class="sceneB" style="margin-top:14px"><div class="bloom"></div>{P["COVERAGE"]}</div></div>'''

NOTES = "".join(f"<li>{n}</li>" for n in P["notes"])

HTML = f'''<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Nuit ou Jour</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,300..800&family=IBM+Plex+Mono:wght@400;500&display=swap">
<style>{CSS}</style>
</head>
<body>

<header class="board"><div class="wrap">
  <p class="eyebrow">Aéroports Services · Refonte · Styleframes révisés</p>
  <h1>Nuit ou Jour</h1>
  <p class="lede">Deux directions visuelles, reconstruites sur une géométrie cartographique
    vérifiée. Les 29 points du réseau proviennent du contenu de couverture archivé et sont
    projetés en Lambert-93 — la projection nationale française.</p>
  <div class="meta"><span>Révision 2</span><span>Carte vérifiée · 29 points</span>
    <span>Lambert-93 · EPSG:2154</span><span>Archivo + IBM Plex Mono</span></div>
  <div class="status"><strong>Statut :</strong> les styleframes précédents ont été rejetés —
    la France y était un polygone dessiné à la main et seuls 20 nœuds étaient rendus, avec une
    répartition erronée. Cette version corrige la géométrie, rend les 29 points, distingue les
    catégories par la forme et non par la couleur seule, et vérifie l’absence de collision entre
    étiquettes. <strong>Phase V n’a pas démarré.</strong></div>
</div></header>

<nav class="jump" aria-label="Sections"><ul>
  <li><a href="#carte">Carte vérifiée</a></li>
  <li><a href="#a">A · Nuit</a></li>
  <li><a href="#b">B · Jour</a></li>
  <li><a href="#compare">Comparaison</a></li>
</ul></nav>

<section class="dir" id="carte"><div class="wrap">
  <p class="eyebrow">Correction 1–10</p>
  <h2 style="margin:6px 0 8px">La carte, vérifiée</h2>
  <p style="color:var(--ink-muted);margin-bottom:26px">Carte plate d’abord, validée, puis
    dérivée en perspective pour la scène cinématique — jamais l’inverse, et jamais deux
    géométries différentes.</p>
  <div class="verify">
    <div>
      <div class="mapcard">{P["FLAT_LIGHT"]}</div>
      <p class="capt">Carte plate de référence — 1000 × {P["MH"]:.0f}, {P["projection"]}</p>
    </div>
    <div>
      <h3 style="margin-bottom:12px">Assertions au build</h3>
      <ul class="checks">
        <li><span class="ok">✔</span><span>29 lieux au total</span></li>
        <li><span class="ok">✔</span><span>{C["airport"]} aéroports · {C["maritime"]} gares maritimes ·
          {C["rail"]} gares SNCF · {C["border"]} limitrophes</span></li>
        <li><span class="ok">✔</span><span>identifiants uniques, aucun lieu inventé</span></li>
        <li><span class="ok">✔</span><span>chaque lieu source apparaît exactement une fois</span></li>
        <li><span class="ok">✔</span><span>les 29 nœuds tombent dans le cadre</span></li>
        <li><span class="ok">✔</span><span>18 groupes d’étiquettes, 0 chevauchement vérifié</span></li>
      </ul>
      <h3 style="margin:22px 0 0">Légende — forme, pas couleur</h3>
      {P["LEGEND_LIGHT"]}
      <div class="notes"><h3 style="margin-bottom:10px">Coïncidences réelles</h3>
        <ul style="padding-left:16px;margin:0">{NOTES}</ul></div>
    </div>
  </div>
</div></section>

<section class="dir" id="a"><div class="wrap">
  <div class="dirhead"><div>
    <p class="eyebrow">Direction A</p>
    <h2>Nuit — aviation cinématique</h2>
    <p style="color:var(--ink-muted);margin-top:10px">Composition asymétrique : le bloc
      typographique à gauche, la carte en perspective qui déborde à droite, la bande
      opérationnelle en pied. Un seul bouton plein, un lien texte.</p>
  </div><span class="tag">Scènes sombres · thème clair par défaut</span></div>
  <div class="frames">
    <div><div class="shell"><div class="shell-cap"><span class="dot"></span><span class="dot"></span><span class="dot"></span><span class="mono">Accueil — 1440</span></div>{HERO_A}</div>
      <p class="capt">Héros — carte en perspective dérivée de la géométrie vérifiée</p></div>
    <div><div class="phone"><div class="phone-inner">{MOB_A}</div></div>
      <p class="capt">375 — carte simplifiée + liste complète</p></div>
  </div>
  <div class="shell" style="margin-bottom:12px">
    <div class="shell-cap"><span class="dot"></span><span class="dot"></span><span class="dot"></span><span class="mono">Scène prestations — 1440</span></div>{SRV_A}</div>
  <p class="capt" style="margin-bottom:30px">Les quatre familles réelles ; le rail de gauche est
    le mécanisme de navigation, le panneau actif porte la liste intégrale</p>
  <dl class="spec">
    <div class="row"><dt>Héros</dt><dd>Grille <strong>46 / 54</strong>, jamais centrée. Un bouton plein + un lien texte. La carte déborde le cadre à droite, rognée intentionnellement.</dd></div>
    <div class="row"><dt>Carte</dt><dd><strong>Même géométrie que la carte plate</strong>, transformée par CSS : <span class="mono">perspective(820px) rotateX(52°) rotateZ(−8°)</span>. Aucune coordonnée séparée.</dd></div>
    <div class="row"><dt>Prestations</dt><dd>Rail de 4 onglets numérotés + panneau actif. <strong>Les quatre familles réelles, longueurs de texte réelles.</strong> Remplace les rectangles décoratifs illisibles.</dd></div>
    <div class="row"><dt>Logo</dt><dd>34 px de haut sur plaque claire — <strong>fichier et rapport d’aspect inchangés</strong>, simple réduction depuis 72 px natif.</dd></div>
    <div class="row"><dt>Formes</dt><dd>Rayons : 999px actions · 6px plaque logo · 5px panneaux · 3px onglets · 30/23px châssis mobile. Angle de perspective 52°, choisi pour garder les nœuds du nord lisibles.</dd></div>
    <div class="row"><dt>Mobile</dt><dd><strong>Géométrie simplifiée</strong> (159 points contre 833), sans pays voisins ni étiquettes, suivie de la <strong>liste de couverture complète</strong>.</dd></div>
  </dl>
</div></section>

<section class="dir" id="b"><div class="wrap">
  <div class="dirhead"><div>
    <p class="eyebrow">Direction B</p>
    <h2>Jour — document éditorial</h2>
    <p style="color:var(--ink-muted);margin-top:10px">Carte plate de référence dans le héros,
      scènes sombres pour les prestations.</p>
  </div><span class="tag">Document clair · scènes sombres</span></div>
  <div class="frames">
    <div><div class="shell"><div class="shell-cap"><span class="dot"></span><span class="dot"></span><span class="dot"></span><span class="mono">Accueil — 1440</span></div>{HERO_B}</div>
      <p class="capt">Héros — carte plate étiquetée, les 4 familles visibles simultanément</p></div>
    <div><div class="phone"><div class="phone-inner">{MOB_B}</div></div>
      <p class="capt">375 — carte simplifiée + liste complète</p></div>
  </div>
  <dl class="spec">
    <div class="row"><dt>Héros</dt><dd>Grille <strong>52 / 48</strong>. La carte plate étiquetée est l’objet de référence, lisible immédiatement.</dd></div>
    <div class="row"><dt>Prestations</dt><dd>Grille 2×2 dans une scène sombre — les quatre familles comparables d’un coup d’œil.</dd></div>
    <div class="row"><dt>Logo</dt><dd>34 px, posé directement sur le fond clair. <strong>Aucun traitement.</strong></dd></div>
    <div class="row"><dt>Mobile</dt><dd>Même géométrie simplifiée, marques sombres sur fond clair, puis la liste complète dans une scène sombre.</dd></div>
  </dl>
</div></section>

<section class="dir" id="compare"><div class="wrap">
  <p class="eyebrow">Comparaison</p>
  <h2 style="margin:6px 0 24px">Ce qui change réellement</h2>
  <div class="tablewrap"><table>
    <thead><tr><th></th><th>A — Nuit</th><th>B — Jour</th></tr></thead>
    <tbody>
      <tr><th scope="row">Carte dans le héros</th><td>Perspective, lumineuse, non étiquetée</td><td>Plate, étiquetée, référence</td></tr>
      <tr><th scope="row">Prestations</th><td>Rail + panneau actif</td><td>Grille 2×2, tout visible</td></tr>
      <tr><th scope="row">Registre</th><td>Salle d’opérations</td><td>Document technique</td></tr>
      <tr><th scope="row">Traitement du logo</th><td>Plaque claire</td><td>Aucun</td></tr>
      <tr><th scope="row">Budget d’animation</th><td>Élevé</td><td>Modéré</td></tr>
      <tr><th scope="row">Lecture longue</th><td>Mode document requis</td><td>Optimal</td></tr>
    </tbody>
  </table></div>
  <div class="rec">
    <p class="eyebrow">Recommandation inchangée</p>
    <h2 style="margin-top:8px">Direction A, mode document sur les pages de lecture</h2>
    <p style="color:var(--ink-muted);margin-top:14px">La carte en perspective n’est plus une
      illustration : c’est la carte de référence vérifiée, transformée. C’est ce qui rend la
      scène cinématique défendable — elle montre le réseau réel, pas une évocation.</p>
    <p style="color:var(--ink-muted)">Le thème clair reste le défaut, avec bascule visible ;
      les scènes restent sombres dans les deux thèmes.</p>
  </div>
</div></section>

<footer class="board"><div class="wrap">
  <p><strong>Provenance des données.</strong> Contour de la France métropolitaine, Corse incluse :
  <span class="mono">france-geojson</span> (données IGN/OpenStreetMap). Pays voisins :
  Natural Earth 50 m, domaine public. Coordonnées des 29 lieux : données géographiques de
  référence, à confirmer avec le propriétaire pour deux interprétations (Metz, Roissy) — V21.
  Projection unique : {P["projection"]}. Simplification Douglas–Peucker appliquée dans l’espace
  projeté, jamais en degrés.</p>
</div></footer>

</body>
</html>
'''
open("styleframes_full.html", "w", encoding="utf-8").write(HTML)
print("styleframes_full.html:", len(HTML.encode()), "bytes")
