'use client';

import { useId, useState } from 'react';
import { CONTACT, SERVICE_FAMILIES } from '@/content/services';

/**
 * The four service families as a physical stack.
 *
 * The two planes behind the active panel are the other families, offset far
 * enough that their lit top edges are visible above it — so the depth reads in
 * a still screenshot, not only in motion. That is the difference between this
 * and a dashboard tab strip, and the previous build failed it by hiding the
 * ghosts entirely behind an opaque panel of the same size.
 *
 * Under prefers-reduced-motion the ghosts are removed and the panel arrives in
 * its final state. The information is identical; only the staging goes.
 */
export function ServiceScene() {
  const [active, setActive] = useState(0);
  const base = useId();
  const family = SERVICE_FAMILIES[active];

  function onKey(event: React.KeyboardEvent) {
    const step =
      event.key === 'ArrowDown' || event.key === 'ArrowRight'
        ? 1
        : event.key === 'ArrowUp' || event.key === 'ArrowLeft'
          ? -1
          : 0;
    if (!step) return;
    event.preventDefault();
    const next = (active + step + SERVICE_FAMILIES.length) % SERVICE_FAMILIES.length;
    setActive(next);
    document.getElementById(`${base}-tab-${next}`)?.focus();
  }

  return (
    <section className="scene scene--deep srv" aria-labelledby={`${base}-h`} id="prestations">
      <div className="scene__light" aria-hidden="true" />
      <div className="scene__grain" aria-hidden="true" />
      <div className="shell">
        <p className="eyebrow">Prestations · 4 familles</p>
        <h2 id={`${base}-h`} className="scene__title">
          Ce que nous prenons en charge
        </h2>

        <div className="srv__grid">
          <div className="srv__side">
            <div
              className="rail"
              role="tablist"
              aria-orientation="vertical"
              aria-label="Familles de prestations"
            >
              {SERVICE_FAMILIES.map((f, i) => (
                <button
                  key={f.id}
                  id={`${base}-tab-${i}`}
                  className="rail__btn"
                  role="tab"
                  type="button"
                  aria-selected={i === active}
                  aria-controls={`${base}-panel`}
                  tabIndex={i === active ? 0 : -1}
                  onClick={() => setActive(i)}
                  onKeyDown={onKey}
                >
                  <span className="rail__num mono">{f.index}</span>
                  <span className="rail__name">{f.title}</span>
                  <span className="rail__count mono">{f.items.length}</span>
                </button>
              ))}
            </div>

            {/* Fills what used to be dead space with the one thing an operations
                buyer actually needs at 03:00, rather than with padding. */}
            <a className="srv__ops" href={`tel:${CONTACT.ops.tel}`}>
              <span className="srv__ops-label">{CONTACT.ops.label}</span>
              <span className="srv__ops-num mono">{CONTACT.ops.display}</span>
              <span className="srv__ops-note">Une question sur une prestation&nbsp;?</span>
            </a>
          </div>

          <div className="well3d">
            <div className="ghost ghost--2" aria-hidden="true" />
            <div className="ghost ghost--1" aria-hidden="true" />

            <div
              className="panel"
              id={`${base}-panel`}
              role="tabpanel"
              aria-labelledby={`${base}-tab-${active}`}
              tabIndex={0}
            >
              {/* keyed so the entrance replays on change, not on scroll */}
              <div className="panel__body" key={family.id}>
                <p className="panel__eyebrow mono">{family.index} · Famille de prestations</p>
                <h3 className="panel__title">{family.title}</h3>
                <p className="panel__audience">{family.audience}</p>
                <ul className="panel__list">
                  {family.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
