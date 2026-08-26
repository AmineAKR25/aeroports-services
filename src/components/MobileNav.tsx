'use client';

import { useCallback, useEffect, useRef } from 'react';
import { CONTACT } from '@/content/services';

const FOCUSABLE =
  'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';

/**
 * Drawer navigation for narrow viewports. The primary action and the contact
 * block live in here, so nothing the header cannot fit is lost — the phone
 * numbers in particular, which are the 23:40 flow.
 *
 * Focus is trapped while open and restored to the trigger on close.
 */
export function MobileNav({
  open,
  onClose,
  nav,
  triggerRef,
}: {
  open: boolean;
  onClose: () => void;
  nav: readonly (readonly [string, string])[];
  triggerRef: React.RefObject<HTMLButtonElement | null>;
}) {
  const panelRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => {
    onClose();
    triggerRef.current?.focus();
  }, [onClose, triggerRef]);

  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    if (!panel) return;

    panel.querySelector<HTMLElement>(FOCUSABLE)?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        close();
        return;
      }
      if (event.key !== 'Tab') return;
      const items = [...panel.querySelectorAll<HTMLElement>(FOCUSABLE)].filter(
        (el) => el.offsetParent !== null,
      );
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;
      if (event.shiftKey && (active === first || !panel.contains(active))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';

    // Focus restoration is close()'s job alone. Doing it here as well raced
    // with it and left focus on <body> when the two disagreed.
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = overflow;
    };
  }, [open, close]);

  return (
    <div className="drawer" data-open={open ? 'true' : 'false'} aria-hidden={!open}>
      <button
        type="button"
        className="drawer__scrim"
        tabIndex={-1}
        aria-hidden="true"
        onClick={close}
      />
      <div
        className="drawer__panel"
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation"
        inert={!open}
      >
        <div className="drawer__top">
          <p className="drawer__eyebrow">Navigation</p>
          <button type="button" className="drawer__close" onClick={close}>
            <span aria-hidden="true">✕</span>
            <span className="sr-only">Fermer la navigation</span>
          </button>
        </div>

        <nav aria-label="Navigation principale (mobile)">
          <ul className="drawer__nav">
            {nav.map(([label, href]) => (
              <li key={label}>
                <a href={href} onClick={close}>
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <a className="btn btn--primary btn--block" href="#devis" onClick={close}>
          Demander un devis
        </a>

        <div className="drawer__contact">
          <p className="drawer__eyebrow">Nous joindre</p>
          <a className="drawer__tel" href={`tel:${CONTACT.ops.tel}`}>
            <span className="drawer__tel-label">{CONTACT.ops.label}</span>
            <span className="drawer__tel-num mono">{CONTACT.ops.display}</span>
          </a>
          <a className="drawer__tel" href={`tel:${CONTACT.office.tel}`}>
            <span className="drawer__tel-label">{CONTACT.office.label}</span>
            <span className="drawer__tel-num mono">{CONTACT.office.display}</span>
          </a>
          <a className="drawer__mail" href={`mailto:${CONTACT.email}`}>
            {CONTACT.email}
          </a>
          <p className="drawer__addr">{CONTACT.address}</p>
        </div>
      </div>
    </div>
  );
}
