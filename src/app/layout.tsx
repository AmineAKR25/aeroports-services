import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Aéroports Services — Assistance aux passagers en France',
  description:
    'Aéroports Services accompagne passagers, groupes, agences, compagnies et brokers dans les aéroports et gares en France.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  )
}
