'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { ThemeToggle } from './ThemeToggle';
import { MobileNav } from './MobileNav';

// Phase V builds three sections, so the nav names three. "À propos" and
// "Clients" join it when those routes exist — pointing them at nothing now
// would repeat the legacy site's defining defect.
const NAV = [
  ['Prestations', '#prestations'],
  ['Couverture', '#couverture'],
  ['Contact', '#contact'],
] as const;

/**
 * Sticky in the real sense: the header is a sibling of the scenes, never a
 * child of one. A `position: sticky` element inside an `overflow: hidden`
 * ancestor sticks to that ancestor's scroll box and scrolls away with it — the
 * previous build lost the header, the nav and the primary action for the whole
 * page below the hero.
 *
 * The logo file is used unmodified: original PNG, original 184×72 aspect,
 * rendered at 40px tall so it downscales rather than blurs. The light plate
 * behind it is a surface, not an edit to the mark.
 */
export function SiteHeader() {
  const [condensed, setCondensed] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;
    const observer = new IntersectionObserver(
      ([entry]) => setCondensed(!entry.isIntersecting),
      { rootMargin: '-8px 0px 0px 0px', threshold: 0 },
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div ref={sentinelRef} className="hdr__sentinel" aria-hidden="true" />
      <header className="hdr" data-condensed={condensed ? 'true' : 'false'}>
        <div className="shell">
          <div className="hdr__bar">
            <a className="hdr__logo" href="#contenu" aria-label="Aéroports Services — accueil">
              <Image
                src="/brand/logo-aeroports-services.png"
                alt="Aéroports Services"
                width={184}
                height={72}
                priority
              />
            </a>

            <nav className="hdr__nav" aria-label="Navigation principale">
              {NAV.map(([label, href]) => (
                <a key={label} href={href}>
                  {label}
                </a>
              ))}
            </nav>

            <div className="hdr__right">
              <ThemeToggle />
              <a className="btn btn--primary btn--compact hdr__cta" href="#devis">
                Demander un devis
              </a>
              <button
                type="button"
                ref={triggerRef}
                className="hdr__menu"
                aria-label="Ouvrir la navigation"
                aria-expanded={menuOpen}
                aria-haspopup="dialog"
                onClick={() => setMenuOpen(true)}
              >
                <span className="hdr__burger" aria-hidden="true" />
                <span className="hdr__menu-text">Menu</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <MobileNav
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        nav={NAV}
        triggerRef={triggerRef}
      />
    </>
  );
}
