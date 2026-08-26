'use client';

import { useCallback, useId, useMemo, useRef, useState } from 'react';
import {
  CATEGORY_LABEL_SHORT,
  CATEGORY_LABEL_SOURCE,
  CONTEXT_PATHS,
  COVERAGE_COUNTS,
  COVERAGE_NODES,
  FRANCE_PATH,
  FRANCE_PATH_MOBILE,
  MAP_CLUSTERS,
  MAP_LABEL_SIZE,
  MAP_VIEWBOX,
  type Category,
  type CoverageNode,
  type MapCluster,
} from '@/content/coverage';

/**
 * Hit radius in SVG user units.
 *
 * The two closest cluster centroids (Mulhouse·Bâle and Zurich) are 60.8 units
 * apart, so 30 is the largest radius that never overlaps a neighbouring
 * control. At the width the coverage map is given on a 1440 viewport that is
 * comfortably past 44 CSS px; on narrower desktops it degrades to roughly 36px
 * rather than to the 25px the previous build shipped.
 */
const HIT_R = 30;

/** Category is carried by SHAPE first, colour second. */
function Mark({ node, scale = 1 }: { node: CoverageNode; scale?: number }) {
  const { x, y, cat } = node;
  const common = { vectorEffect: 'non-scaling-stroke' as const };
  if (cat === 'airport') {
    return <circle cx={x} cy={y} r={5.5 * scale} fill="var(--map-node)" {...common} />;
  }
  if (cat === 'maritime') {
    const h = 5 * scale;
    return (
      <rect x={x - h} y={y - h} width={2 * h} height={2 * h} fill="var(--map-node)" {...common} />
    );
  }
  if (cat === 'rail') {
    const w = 6 * scale;
    const h = 2.75 * scale;
    return (
      <rect
        x={x - w}
        y={y - h}
        width={2 * w}
        height={2 * h}
        rx="1"
        fill="var(--map-node)"
        {...common}
      />
    );
  }
  const r = 6.2 * scale;
  return (
    <polygon
      points={`${x},${y - r} ${x + r * 0.92},${y + r * 0.72} ${x - r * 0.92},${y + r * 0.72}`}
      fill="none"
      stroke="var(--map-node)"
      strokeWidth={2.1 * scale}
      {...common}
    />
  );
}

export function LegendMark({ cat }: { cat: Category }) {
  const c = 'var(--map-node)';
  const box = { width: 14, height: 14, viewBox: '0 0 14 14', 'aria-hidden': true } as const;
  if (cat === 'airport') {
    return (
      <svg {...box}>
        <circle cx="7" cy="7" r="5" fill={c} />
      </svg>
    );
  }
  if (cat === 'maritime') {
    return (
      <svg {...box}>
        <rect x="2.5" y="2.5" width="9" height="9" fill={c} />
      </svg>
    );
  }
  if (cat === 'rail') {
    return (
      <svg {...box}>
        <rect x="1" y="4.6" width="12" height="4.8" rx="1" fill={c} />
      </svg>
    );
  }
  return (
    <svg {...box}>
      <polygon points="7,1.6 12.5,11 1.5,11" fill="none" stroke={c} strokeWidth="1.9" />
    </svg>
  );
}

const COUNT_SENTENCE =
  `${COVERAGE_COUNTS.airport} ${CATEGORY_LABEL_SOURCE.airport.toLowerCase()}, ` +
  `${COVERAGE_COUNTS.maritime} ${CATEGORY_LABEL_SOURCE.maritime.toLowerCase()}, ` +
  `${COVERAGE_COUNTS.rail} ${CATEGORY_LABEL_SOURCE.rail.toLowerCase()} ` +
  `et ${COVERAGE_COUNTS.border} ${CATEGORY_LABEL_SOURCE.border.toLowerCase()}`;

const MAP_DESCRIPTION = `Réseau Aéroports Services : ${COUNT_SENTENCE}. La liste complète des lieux figure sous la carte.`;

const NODES_BY_ID = new Map(COVERAGE_NODES.map((n) => [n.id, n]));

function membersOf(cluster: MapCluster): CoverageNode[] {
  return cluster.memberIds
    .map((id) => NODES_BY_ID.get(id))
    .filter((n): n is CoverageNode => Boolean(n));
}

/** Reading order: rough rows top to bottom, then west to east within a row. */
const ORDERED_CLUSTERS = [...MAP_CLUSTERS].sort(
  (a, b) => Math.round(a.y / 60) - Math.round(b.y / 60) || a.x - b.x,
);

function clusterName(cluster: MapCluster): string {
  const members = membersOf(cluster);
  const names = members.map((m) => m.name).join(', ');
  const cats = cluster.cats.map((c) => CATEGORY_LABEL_SHORT[c].toLowerCase()).join(' et ');
  return members.length === 1
    ? `${names} — ${CATEGORY_LABEL_SHORT[members[0].cat]}`
    : `${cluster.text} : ${names} — ${cats}`;
}

/**
 * The cinematic hero plane. Presentation only, and aria-hidden: the interactive
 * map and the coverage list below state the same data in operable, readable
 * form. Under reduced motion the CSS removes the transform.
 */
export function HeroMapPlane() {
  const gid = useId();
  return (
    <svg viewBox={MAP_VIEWBOX} aria-hidden="true" focusable="false">
      <defs>
        <radialGradient id={`${gid}-glow`}>
          <stop offset="0%" stopColor="#6ECDF7" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#6ECDF7" stopOpacity="0" />
        </radialGradient>
      </defs>
      {CONTEXT_PATHS.map((d, i) => (
        <path key={i} d={d} fill="#0D141B" stroke="#1B2731" strokeWidth="1" />
      ))}
      <path
        className="draw"
        d={FRANCE_PATH}
        fill="rgb(1 128 185 / 0.16)"
        stroke="#5CC8F5"
        strokeWidth="3.2"
        strokeLinejoin="round"
      />
      {COVERAGE_NODES.map((n) => (
        <circle
          key={`g-${n.id}`}
          cx={n.x}
          cy={n.y}
          r="20"
          fill={`url(#${gid}-glow)`}
          className={`ignite ignite--${n.cat}`}
        />
      ))}
      <g style={{ ['--map-node' as string]: '#6ECDF7' }}>
        {COVERAGE_NODES.map((n) => (
          <g key={n.id} className={`ignite ignite--${n.cat}`}>
            <Mark node={n} scale={1.35} />
          </g>
        ))}
      </g>
    </svg>
  );
}

/**
 * The accurate, operable coverage map.
 *
 * All 29 locations are drawn. The interactive units are the 18 verified
 * geographic clusters, not the 29 marks — nine of the marks sit on one point at
 * national scale, and stacking nine controls there would be a keyboard trap
 * that says "Paris" nine times. Each cluster is one control; activating it pins
 * its locations into the detail panel, which is the authoritative per-location
 * interface together with the coverage list.
 */
export function CoverageMap() {
  const [hovered, setHovered] = useState<string | null>(null);
  const [pinned, setPinned] = useState<string | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const baseId = useId();
  const titleId = `${baseId}-title`;
  const panelId = `${baseId}-detail`;

  const activeId = pinned ?? hovered;
  const active = useMemo(
    () => (activeId ? (MAP_CLUSTERS.find((c) => c.id === activeId) ?? null) : null),
    [activeId],
  );

  const focusCluster = useCallback((id: string) => {
    svgRef.current?.querySelector<SVGGElement>(`[data-cluster="${CSS.escape(id)}"]`)?.focus();
  }, []);

  const onKeyDown = useCallback(
    (event: React.KeyboardEvent, cluster: MapCluster) => {
      const { key } = event;
      if (key === 'Enter' || key === ' ' || key === 'Spacebar') {
        event.preventDefault();
        setPinned((current) => (current === cluster.id ? null : cluster.id));
        return;
      }
      if (key === 'Escape') {
        if (pinned) {
          event.preventDefault();
          setPinned(null);
        }
        return;
      }
      const step =
        key === 'ArrowRight' || key === 'ArrowDown'
          ? 1
          : key === 'ArrowLeft' || key === 'ArrowUp'
            ? -1
            : 0;
      if (!step) return;
      event.preventDefault();
      const i = ORDERED_CLUSTERS.findIndex((c) => c.id === cluster.id);
      const next = ORDERED_CLUSTERS[(i + step + ORDERED_CLUSTERS.length) % ORDERED_CLUSTERS.length];
      focusCluster(next.id);
    },
    [focusCluster, pinned],
  );

  return (
    <div className="map" role="group" aria-labelledby={titleId}>
      <p id={titleId} className="sr-only">
        {MAP_DESCRIPTION} Carte interactive : {ORDERED_CLUSTERS.length} points géographiques,
        parcourus avec les flèches, ouverts avec Entrée ou Espace.
      </p>

      <div className="map__frame">
        <svg ref={svgRef} viewBox={MAP_VIEWBOX} className="map__svg">
          {CONTEXT_PATHS.map((d, i) => (
            <path key={i} d={d} fill="var(--map-context)" stroke="var(--map-context-line)" strokeWidth="1" />
          ))}
          <path
            d={FRANCE_PATH}
            fill="var(--map-land)"
            stroke="var(--map-outline)"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />

          {/* connectors: every label that sits clear of its own cluster gets one */}
          {MAP_CLUSTERS.map((c) => {
            const dx = c.lx - c.x;
            const dy = c.ly - 4 - c.y;
            const dist = Math.hypot(dx, dy);
            if (dist <= c.r + 12) return null;
            const t = (c.r + 7) / dist;
            return (
              <line
                key={`lead-${c.id}`}
                className="map__leader"
                x1={c.x + dx * t}
                y1={c.y + dy * t}
                x2={c.lx + (c.anchor === 'start' ? -3 : c.anchor === 'end' ? 3 : 0)}
                y2={c.ly - 4}
              />
            );
          })}

          {/* all 29 locations, always drawn */}
          {COVERAGE_NODES.map((n) => (
            <Mark key={n.id} node={n} />
          ))}

          {/* 18 clusters, the interactive layer */}
          {ORDERED_CLUSTERS.map((c) => {
            const isActive = activeId === c.id;
            const isPinned = pinned === c.id;
            return (
              <g
                key={c.id}
                data-cluster={c.id}
                className={`cl${isActive ? ' cl--active' : ''}${isPinned ? ' cl--pinned' : ''}`}
                role="button"
                tabIndex={0}
                aria-expanded={isPinned}
                aria-controls={panelId}
                aria-label={clusterName(c)}
                onMouseEnter={() => setHovered(c.id)}
                onMouseLeave={() => setHovered((h) => (h === c.id ? null : h))}
                onFocus={() => setHovered(c.id)}
                onBlur={() => setHovered((h) => (h === c.id ? null : h))}
                onClick={() => setPinned((p) => (p === c.id ? null : c.id))}
                onKeyDown={(e) => onKeyDown(e, c)}
              >
                {/* halo sits under the marks so it never hides them */}
                <circle className="cl__halo" cx={c.x} cy={c.y} r={c.r + 13} />
                {/* Permanent grouping ring wherever one label covers several
                    locations — Paris carries nine marks on one point, and
                    proximity alone did not say which label owned them. */}
                {c.memberIds.length > 1 ? (
                  <circle className="cl__group" cx={c.x} cy={c.y} r={c.r + 10} />
                ) : null}
                <circle className="cl__ring" cx={c.x} cy={c.y} r={c.r + 13} />
                <circle className="cl__hit" cx={c.x} cy={c.y} r={HIT_R} />
              </g>
            );
          })}

          {MAP_CLUSTERS.map((c) => (
            <text
              key={`t-${c.id}`}
              className={`map__label${activeId === c.id ? ' map__label--active' : ''}`}
              x={c.lx}
              y={c.ly}
              textAnchor={c.anchor}
              fontSize={MAP_LABEL_SIZE}
              aria-hidden="true"
            >
              {c.text}
            </text>
          ))}
        </svg>
      </div>

      <div className="map__detail" id={panelId} aria-live="polite">
        {active ? (
          <>
            <p className="map__detail-head">
              <span className="map__detail-name">{active.text}</span>
              <span className="map__detail-count mono">
                {active.memberIds.length}
                {active.memberIds.length > 1 ? ' lieux' : ' lieu'}
              </span>
            </p>
            <ul className="map__detail-list">
              {membersOf(active).map((n) => (
                <li key={n.id}>
                  <LegendMark cat={n.cat} />
                  <span className="map__detail-loc">{n.name}</span>
                  <span className="map__detail-cat">{CATEGORY_LABEL_SHORT[n.cat]}</span>
                  {n.status === 'provisional' ? (
                    <span className="map__detail-flag" title="Position à confirmer (V21/V22)">
                      position à confirmer
                    </span>
                  ) : null}
                </li>
              ))}
            </ul>
            {pinned ? (
              <button type="button" className="map__detail-clear" onClick={() => setPinned(null)}>
                Fermer le détail
              </button>
            ) : null}
          </>
        ) : (
          <p className="map__detail-idle">
            Survolez ou sélectionnez un point pour en voir le détail. Flèches pour parcourir,
            Entrée ou Espace pour ouvrir.
          </p>
        )}
      </div>
    </div>
  );
}

/**
 * Below 768px this replaces CoverageMap entirely — a genuinely coarser geometry
 * (159 points across 2 rings against 833 across 3), no neighbour context, no
 * labels, marks scaled up. It is presentation: the structured coverage list
 * underneath carries every name and is the operable interface at this width.
 */
export function CoverageMapMobile() {
  return (
    <svg viewBox={MAP_VIEWBOX} className="map__svg map__svg--mobile" role="img" aria-label={MAP_DESCRIPTION}>
      <path
        d={FRANCE_PATH_MOBILE}
        fill="var(--map-land)"
        stroke="var(--map-outline)"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      {COVERAGE_NODES.map((n) => (
        <Mark key={n.id} node={n} scale={1.9} />
      ))}
    </svg>
  );
}
