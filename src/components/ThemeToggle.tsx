'use client';

import { useSyncExternalStore } from 'react';
import { applyTheme, readTheme, serverTheme, subscribeTheme } from '@/lib/theme';

/**
 * The rendered theme is `data-theme` on <html>. This component reads that
 * attribute through useSyncExternalStore rather than keeping a parallel copy,
 * and a MutationObserver feeds any change back — so the switch position, the
 * visible label, the accessible name and the actual theme are all derived from
 * one value and cannot disagree.
 *
 * The accessible name states the action and contains the visible text, so
 * "Label in Name" (WCAG 2.5.3) holds for speech-input users.
 */
export function ThemeToggle({ className = '' }: { className?: string }) {
  const theme = useSyncExternalStore(subscribeTheme, readTheme, serverTheme);
  const isDark = theme === 'dark';

  const visible = isDark ? 'Clair' : 'Sombre';
  const accessibleName = isDark ? 'Activer le thème Clair' : 'Activer le thème Sombre';

  return (
    <button
      type="button"
      className={`tgl ${className}`.trim()}
      onClick={() => applyTheme(isDark ? 'light' : 'dark')}
      aria-label={accessibleName}
      title={accessibleName}
    >
      <span className="tgl__sw" data-on={isDark ? 'true' : 'false'} aria-hidden="true">
        <span className="tgl__knob" />
      </span>
      <span className="tgl__label">{visible}</span>
    </button>
  );
}
