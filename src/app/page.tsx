import { SiteHeader } from '@/components/SiteHeader';
import { ServiceScene } from '@/components/ServiceScene';
import { CoverageMap, CoverageMapMobile, HeroMapPlane, LegendMark } from '@/components/NetworkMap';
import { Reveal } from '@/components/Reveal';
import { CONTACT, MOTTO, POSITIONING } from '@/content/services';
import {
  CATEGORY_LABEL_SHORT,
  CATEGORY_LABEL_SOURCE,
  COVERAGE_COUNTS,
  COVERAGE_FOOTNOTE,
  COVERAGE_NODES,
  INTERPRETATION_NOTES,
  MAP_CLUSTERS,
  type Category,
} from '@/content/coverage';

const CATS: Category[] = ['airport', 'maritime', 'rail', 'border'];
const TOTAL = CATS.reduce((n, c) => n + COVERAGE_COUNTS[c], 0);

/**
 * PHASE V-BIS PROTOTYPE — not the finished site.
 *
 * Scope: header with real sticky behaviour and mobile navigation, theme
 * control, hero, one complete service scene, the map treatment in both its
 * desktop and mobile forms, and a closing contact band so the navigation has
 * somewhere honest to point. No other routes, no forms, no statistics
 * (V1–V4 remain unpublished), no client marks (D6).
 */
export default function PhaseV() {
  return (
    <>
      <SiteHeader />

      <main id="contenu">
        {/* ---- HERO ---------------------------------------------------- */}
        <section className="scene hero" aria-labelledby="hero-h">
          <div className="scene__light" aria-hidden="true" />
          <div className="scene__vignette" aria-hidden="true" />
          <div className="scene__grain" aria-hidden="true" />

          <div className="shell">
            <div className="hero__grid">
              <Reveal className="hero__copy">
                <p className="eyebrow">Réseau national · {TOTAL} points du réseau</p>
                <h1 id="hero-h" className="hero__title">
                  Premier Réseau Français <em>d’Assistance</em> aux passagers
                </h1>
                <p className="hero__motto">{MOTTO}</p>
                <div className="hero__acts">
                  <a className="btn btn--primary btn--lg" href="#devis">
                    Demander un devis
                  </a>
                  <a className="tlink" href="#couverture">
                    <span>Voir la couverture</span>
                    <span aria-hidden="true">→</span>
                  </a>
                </div>
              </Reveal>

              <Reveal delay={2} className="hero__stage">
                <div className="stage">
                  <div className="stage__plane">
                    <HeroMapPlane />
                  </div>
                </div>
              </Reveal>
            </div>
          </div>

          <div className="opstrip">
            {CATS.map((c) => (
              <div className="opstrip__cell" key={c}>
                <span className="opstrip__n mono">{String(COVERAGE_COUNTS[c]).padStart(2, '0')}</span>
                <span className="opstrip__l">{CATEGORY_LABEL_SHORT[c]}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ---- SERVICE SCENE ------------------------------------------- */}
        <ServiceScene />

        {/* ---- COVERAGE ------------------------------------------------ */}
        <section className="cov" id="couverture" aria-labelledby="cov-h">
          <div className="shell">
            <Reveal>
              <div className="cov__head">
                <p className="cov__eyebrow mono">Couverture</p>
                <h2 id="cov-h" className="cov__title">
                  Là où nous sommes, chaque jour et chaque nuit
                </h2>
                <p className="cov__intro">
                  {POSITIONING}. Chaque point est un lieu où nos agents interviennent. La carte et
                  la liste ci-dessous portent exactement la même information.
                </p>
              </div>
            </Reveal>

            <div className="cov__grid">
              <Reveal delay={1} className="cov__mapcol">
                {/* Below 768px this is display:none and the simplified map takes
                    over — a different geometry, not a shrunken one. */}
                <div className="cov__map cov__map--desktop">
                  <CoverageMap />
                </div>
                <div className="cov__map cov__map--mobile">
                  <CoverageMapMobile />
                </div>

                <ul className="legend">
                  {CATS.map((c) => (
                    <li key={c}>
                      <LegendMark cat={c} />
                      <span className="legend__name">{CATEGORY_LABEL_SOURCE[c]}</span>
                      <b className="mono">{COVERAGE_COUNTS[c]}</b>
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Reveal delay={2} className="cov__listcol">
                <ul className="cvglist">
                  {CATS.map((c) => (
                    <li className="cvglist__grp" key={c}>
                      <div className="cvglist__h">
                        <LegendMark cat={c} />
                        <span className="cvglist__name">{CATEGORY_LABEL_SOURCE[c]}</span>
                        <b className="mono">{COVERAGE_COUNTS[c]}</b>
                      </div>
                      <p className="cvglist__names">
                        {COVERAGE_NODES.filter((n) => n.cat === c)
                          .map((n) => n.name)
                          .join(' · ')}
                      </p>
                      {INTERPRETATION_NOTES[c] ? (
                        <p className="cvglist__interp">
                          <span className="cvglist__interp-tag">Interprétation</span>
                          {INTERPRETATION_NOTES[c]}
                        </p>
                      ) : null}
                    </li>
                  ))}
                </ul>
                <p className="cvglist__note">{COVERAGE_FOOTNOTE}</p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ---- CLOSING CONTACT ----------------------------------------- */}
        <section className="scene closing" id="contact" aria-labelledby="closing-h">
          <div className="scene__light" aria-hidden="true" />
          <div className="scene__grain" aria-hidden="true" />
          <div className="shell">
            <div className="closing__grid">
              <div>
                <p className="eyebrow">Nous joindre</p>
                <h2 id="closing-h" className="scene__title" tabIndex={-1}>
                  Une demande, un imprévu, un vol à couvrir
                </h2>
                <p className="closing__note" id="devis">
                  La demande de devis en ligne n’est pas encore active sur cette maquette. Le
                  téléphone et le courriel sont les canaux réels, disponibles maintenant.
                </p>
              </div>
              <ul className="closing__acts">
                <li>
                  <a className="actcard" href={`tel:${CONTACT.ops.tel}`}>
                    <span className="actcard__label">{CONTACT.ops.label}</span>
                    <span className="actcard__value mono">{CONTACT.ops.display}</span>
                  </a>
                </li>
                <li>
                  <a className="actcard" href={`tel:${CONTACT.office.tel}`}>
                    <span className="actcard__label">{CONTACT.office.label}</span>
                    <span className="actcard__value mono">{CONTACT.office.display}</span>
                  </a>
                </li>
                <li>
                  <a className="actcard actcard--wide" href={`mailto:${CONTACT.email}`}>
                    <span className="actcard__label">Courriel</span>
                    <span className="actcard__value">{CONTACT.email}</span>
                  </a>
                </li>
              </ul>
            </div>
            <p className="closing__addr">{CONTACT.address}</p>
          </div>
        </section>
      </main>

      <footer className="foot">
        <div className="shell">
          <p>
            Maquette Phase V — {MAP_CLUSTERS.length} groupes géographiques, {TOTAL} lieux issus de
            l’archive. Contenu non vérifié signalé comme tel.
          </p>
        </div>
      </footer>
    </>
  );
}
