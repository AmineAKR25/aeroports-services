export type Theme = 'light' | 'dark';

export const THEME_STORAGE_KEY = 'as-theme';

const THEME_COLORS: Record<Theme, string> = {
  light: '#FAFAFA',
  dark: '#080B0F',
};

/**
 * Theme priority, decided by the owner (A14):
 *   1. an explicit ?theme= override, for deterministic testing and capture
 *   2. a valid stored manual preference
 *   3. otherwise LIGHT — the operating-system preference is deliberately not consulted
 *
 * `document.documentElement[data-theme]` is the single source of truth. The
 * pre-paint script in the root layout sets it before first paint, this module
 * is the only thing that changes it afterwards, and a MutationObserver reports
 * any change back to React. Rendered theme and component state therefore cannot
 * drift apart, whoever did the changing.
 */
export function readTheme(): Theme {
  if (typeof document === 'undefined') return 'light';
  return document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
}

/** The SSR snapshot. Matches rule 3 above, so no-JS visitors get the light theme. */
export function serverTheme(): Theme {
  return 'light';
}

/** Keep the browser chrome in step with the rendered document theme. */
export function syncThemeColor(theme: Theme) {
  if (typeof document === 'undefined') return;
  const meta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
  meta?.setAttribute('content', THEME_COLORS[theme]);
}

export function applyTheme(theme: Theme, persist = true) {
  document.documentElement.setAttribute('data-theme', theme);
  syncThemeColor(theme);
  if (persist) {
    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
      /* private mode — the choice still holds for this page view */
    }
  }
}

export function subscribeTheme(onChange: () => void): () => void {
  const onThemeMutation = () => {
    syncThemeColor(readTheme());
    onChange();
  };
  const observer = new MutationObserver(onThemeMutation);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme'],
  });

  // Another tab changed the stored preference.
  const onStorage = (event: StorageEvent) => {
    if (event.key !== THEME_STORAGE_KEY) return;
    const next = event.newValue;
    if (next === 'light' || next === 'dark') applyTheme(next, false);
  };
  window.addEventListener('storage', onStorage);

  return () => {
    observer.disconnect();
    window.removeEventListener('storage', onStorage);
  };
}
