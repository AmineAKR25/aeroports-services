import type { Metadata, Viewport } from "next";
import { Archivo, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  axes: ["wdth"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Aéroports Services — Premier Réseau Français d’Assistance aux passagers",
  description:
    "Assistance aux passagers, représentation aéroportuaire, escale et force de vente. " +
    "Réseau national : 14 aéroports français, 4 gares maritimes, 6 gares ferroviaires " +
    "françaises, 5 aéroports limitrophes.",
};

// maximum-scale is deliberately absent: the legacy site set maximum-scale=1 on all
// 27 pages, which blocks pinch-zoom and fails WCAG 1.4.4.
//
// themeColor carries no media query — the site does not follow the OS preference,
// so the browser chrome should not either. Light is the default (A14).
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

/**
 * Runs before first paint, so the stored choice never flashes.
 *
 * Theme priority (owner decision A14):
 *   1. ?theme=light|dark — deterministic override for testing and capture,
 *      deliberately NOT persisted
 *   2. a valid stored manual preference
 *   3. otherwise light — prefers-color-scheme is not consulted anywhere
 *
 * data-theme is always written, so the CSS needs no media-query fallback and a
 * visitor without JavaScript gets the light theme from :root.
 */
const THEME_BOOTSTRAP = `(function(){var t='light';try{
var q=new URLSearchParams(location.search).get('theme');
if(q==='dark'||q==='light'){t=q;}else{var s=localStorage.getItem('as-theme');
if(s==='dark'||s==='light'){t=s;}}}catch(e){}
document.documentElement.setAttribute('data-theme',t);
var m=document.querySelector('meta[name="theme-color"]');
if(m){m.setAttribute('content',t==='dark'?'#080B0F':'#FAFAFA');}})();`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fr"
      data-theme="light"
      className={`${archivo.variable} ${plexMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <meta name="theme-color" content="#FAFAFA" />
        <script dangerouslySetInnerHTML={{ __html: THEME_BOOTSTRAP }} />
      </head>
      <body>
        <a className="skip-link" href="#contenu">
          Aller au contenu
        </a>
        {children}
      </body>
    </html>
  );
}
