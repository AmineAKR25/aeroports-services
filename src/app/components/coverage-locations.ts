export type CoverageCategory = 'airports' | 'rail' | 'maritime' | 'borders'

export type CoordinateStatus = 'provisional'

export type CoverageLocation = {
  id: string
  name: string
  category: CoverageCategory
  longitude: number
  latitude: number
  coordinateStatus: CoordinateStatus
  coordinateSource: string
}

const provisionalSource = 'Repère géographique provisoire à valider dans le dossier d’exploitation.'

/**
 * Coverage published in the archived Aéroports Services content.
 *
 * The previous V2 map used presentation-only x/y values. These points are
 * real-world longitude/latitude facility centroids for the V3 prototype, but
 * remain explicitly provisional until the operations team validates each one.
 */
export const coverageLocations: CoverageLocation[] = [
  { id: 'orly', name: 'Orly', category: 'airports', longitude: 2.3652, latitude: 48.7272, coordinateStatus: 'provisional', coordinateSource: provisionalSource },
  { id: 'roissy', name: 'Roissy', category: 'airports', longitude: 2.5479, latitude: 49.0097, coordinateStatus: 'provisional', coordinateSource: provisionalSource },
  { id: 'le-bourget', name: 'Le Bourget', category: 'airports', longitude: 2.4414, latitude: 48.9694, coordinateStatus: 'provisional', coordinateSource: provisionalSource },
  { id: 'lyon', name: 'Lyon', category: 'airports', longitude: 5.0908, latitude: 45.7256, coordinateStatus: 'provisional', coordinateSource: provisionalSource },
  { id: 'bordeaux', name: 'Bordeaux', category: 'airports', longitude: -0.7156, latitude: 44.8283, coordinateStatus: 'provisional', coordinateSource: provisionalSource },
  { id: 'nice', name: 'Nice', category: 'airports', longitude: 7.2159, latitude: 43.6653, coordinateStatus: 'provisional', coordinateSource: provisionalSource },
  { id: 'marseille-air', name: 'Marseille', category: 'airports', longitude: 5.2214, latitude: 43.4367, coordinateStatus: 'provisional', coordinateSource: provisionalSource },
  { id: 'toulouse', name: 'Toulouse', category: 'airports', longitude: 1.3786, latitude: 43.6293, coordinateStatus: 'provisional', coordinateSource: provisionalSource },
  { id: 'mulhouse', name: 'Mulhouse', category: 'airports', longitude: 7.5299, latitude: 47.5896, coordinateStatus: 'provisional', coordinateSource: provisionalSource },
  { id: 'nantes', name: 'Nantes', category: 'airports', longitude: -1.6074, latitude: 47.1532, coordinateStatus: 'provisional', coordinateSource: provisionalSource },
  { id: 'metz', name: 'Metz', category: 'airports', longitude: 6.1319, latitude: 49.0717, coordinateStatus: 'provisional', coordinateSource: provisionalSource },
  { id: 'strasbourg', name: 'Strasbourg', category: 'airports', longitude: 7.6282, latitude: 48.5818, coordinateStatus: 'provisional', coordinateSource: provisionalSource },
  { id: 'lille', name: 'Lille', category: 'airports', longitude: 3.0894, latitude: 50.5619, coordinateStatus: 'provisional', coordinateSource: provisionalSource },
  { id: 'brest', name: 'Brest', category: 'airports', longitude: -4.4185, latitude: 48.4470, coordinateStatus: 'provisional', coordinateSource: provisionalSource },
  { id: 'gare-du-nord', name: 'Gare du Nord', category: 'rail', longitude: 2.3553, latitude: 48.8809, coordinateStatus: 'provisional', coordinateSource: provisionalSource },
  { id: 'gare-est', name: "Gare de l’Est", category: 'rail', longitude: 2.3588, latitude: 48.8761, coordinateStatus: 'provisional', coordinateSource: provisionalSource },
  { id: 'gare-lyon', name: 'Gare de Lyon', category: 'rail', longitude: 2.3730, latitude: 48.8443, coordinateStatus: 'provisional', coordinateSource: provisionalSource },
  { id: 'gare-austerlitz', name: "Gare d’Austerlitz", category: 'rail', longitude: 2.3646, latitude: 48.8422, coordinateStatus: 'provisional', coordinateSource: provisionalSource },
  { id: 'gare-bercy', name: 'Gare de Bercy', category: 'rail', longitude: 2.3857, latitude: 48.8390, coordinateStatus: 'provisional', coordinateSource: provisionalSource },
  { id: 'montparnasse', name: 'Montparnasse', category: 'rail', longitude: 2.3211, latitude: 48.8408, coordinateStatus: 'provisional', coordinateSource: provisionalSource },
  { id: 'le-havre', name: 'Le Havre', category: 'maritime', longitude: 0.1070, latitude: 49.4900, coordinateStatus: 'provisional', coordinateSource: provisionalSource },
  { id: 'monaco', name: 'Monaco', category: 'maritime', longitude: 7.4246, latitude: 43.7350, coordinateStatus: 'provisional', coordinateSource: provisionalSource },
  { id: 'marseille-port', name: 'Marseille', category: 'maritime', longitude: 5.3610, latitude: 43.3080, coordinateStatus: 'provisional', coordinateSource: provisionalSource },
  { id: 'cherbourg', name: 'Cherbourg', category: 'maritime', longitude: -1.6200, latitude: 49.6420, coordinateStatus: 'provisional', coordinateSource: provisionalSource },
  { id: 'bruxelles', name: 'Bruxelles', category: 'borders', longitude: 4.4844, latitude: 50.9010, coordinateStatus: 'provisional', coordinateSource: provisionalSource },
  { id: 'francfort', name: 'Francfort', category: 'borders', longitude: 8.5706, latitude: 50.0330, coordinateStatus: 'provisional', coordinateSource: provisionalSource },
  { id: 'bale', name: 'Bâle', category: 'borders', longitude: 7.5299, latitude: 47.5896, coordinateStatus: 'provisional', coordinateSource: provisionalSource },
  { id: 'geneve', name: 'Genève', category: 'borders', longitude: 6.1090, latitude: 46.2380, coordinateStatus: 'provisional', coordinateSource: provisionalSource },
  { id: 'zurich', name: 'Zurich', category: 'borders', longitude: 8.5555, latitude: 47.4580, coordinateStatus: 'provisional', coordinateSource: provisionalSource },
]
