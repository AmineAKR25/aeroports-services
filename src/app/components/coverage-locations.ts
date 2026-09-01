export type CoverageCategory = 'airports' | 'rail' | 'maritime' | 'borders'

export type CoordinateStatus = 'confirmed' | 'provisional'

export type CoordinateProvenance = {
  source: string
  identifier: string | null
  url: string | null
  sha256: string | null
  derivation: string
  note: string | null
}

export type CoverageLocation = {
  id: string
  name: string
  category: CoverageCategory
  longitude: number
  latitude: number
  interpretedFacility: string
  coordinateStatus: CoordinateStatus
  coordinateProvenance: CoordinateProvenance
}

export const coverageSource = {
  page: 'https://aeroports-services.fr/',
  archiveFile: 'reference/original-aeroports-services/raw/pages/accueil.html',
  archiveSha256: 'af9940882ec975daa6b6149ab72b421d188647583c8935ab3ad5be7e705bad03',
  extraction: 'Audited project pipeline: .design/aeroports-services-redesign/map-pipeline/coverage-source.json',
} as const

const ourAirportsSource = {
  source: 'OurAirports airports.csv',
  url: 'https://davidmegginson.github.io/ourairports-data/airports.csv',
  sha256: 'd4bc9389e90a3adb17b50e3deb361beb3bffe9d232e9bca204c13527d5292643',
  derivation: 'Mécanique — correspondance par identifiant ICAO, coordonnées copiées telles quelles.',
} as const

const manualSource = {
  source: 'manual',
  identifier: null,
  url: null,
  sha256: null,
  derivation: 'Manuel — position approximative du lieu nommé ; aucune base ouverte faisant autorité n’a été consultée.',
} as const

type AirportRecord = {
  id: string
  name: string
  category: 'airports' | 'borders'
  longitude: number
  latitude: number
  interpretedFacility: string
  identifier: string
  status: CoordinateStatus
  note?: string
}

function airport(record: AirportRecord): CoverageLocation {
  return {
    id: record.id,
    name: record.name,
    category: record.category,
    longitude: record.longitude,
    latitude: record.latitude,
    interpretedFacility: record.interpretedFacility,
    coordinateStatus: record.status,
    coordinateProvenance: {
      source: ourAirportsSource.source,
      identifier: record.identifier,
      url: ourAirportsSource.url,
      sha256: ourAirportsSource.sha256,
      derivation: ourAirportsSource.derivation,
      note: record.note ?? null,
    },
  }
}

type ManualRecord = {
  id: string
  name: string
  category: Exclude<CoverageCategory, 'airports' | 'borders'>
  longitude: number
  latitude: number
  interpretedFacility: string
  note: string
}

function manual(record: ManualRecord): CoverageLocation {
  return {
    id: record.id,
    name: record.name,
    category: record.category,
    longitude: record.longitude,
    latitude: record.latitude,
    interpretedFacility: record.interpretedFacility,
    coordinateStatus: 'provisional',
    coordinateProvenance: { ...manualSource, note: record.note },
  }
}

/**
 * Canonical coverage is the 29-location set extracted from the archived page.
 * Coordinates and statuses are restored from the audited project pipeline
 * preserved in commit 22c21eb (.design/aeroports-services-redesign/map-pipeline/coordinates.json).
 * Confirmed means a coordinate was mechanically matched to the pinned
 * OurAirports checksum; it does not confirm that Aéroports Services currently
 * operates at that facility. All manual interpretations remain provisional.
 */
export const coverageLocations: CoverageLocation[] = [
  airport({ id: 'orly', name: 'Orly', category: 'airports', longitude: 2.358963, latitude: 48.729499, interpretedFacility: 'Paris-Orly Airport', identifier: 'ident=LFPO icao=LFPO iata=ORY', status: 'confirmed' }),
  airport({ id: 'roissy', name: 'Roissy', category: 'airports', longitude: 2.554117, latitude: 49.00896, interpretedFacility: 'Charles de Gaulle International Airport', identifier: 'ident=LFPG icao=LFPG iata=CDG', status: 'provisional', note: "V21 — « Roissy » est interprété comme Paris-Charles-de-Gaulle (LFPG). La commune de Roissy-en-France accueille CDG ; l’archive ne l’explicite pas." }),
  airport({ id: 'le-bourget', name: 'Le Bourget', category: 'airports', longitude: 2.436539, latitude: 48.962276, interpretedFacility: 'Paris-Le Bourget International Airport', identifier: 'ident=LFPB icao=LFPB iata=LBG', status: 'confirmed' }),
  airport({ id: 'lyon', name: 'Lyon', category: 'airports', longitude: 5.090139, latitude: 45.725996, interpretedFacility: 'Lyon Saint-Exupéry Airport', identifier: 'ident=LFLL icao=LFLL iata=LYS', status: 'confirmed' }),
  airport({ id: 'bordeaux', name: 'Bordeaux', category: 'airports', longitude: -0.715356, latitude: 44.82865, interpretedFacility: 'Bordeaux–Mérignac Airport', identifier: 'ident=LFBD icao=LFBD iata=BOD', status: 'confirmed' }),
  airport({ id: 'nice', name: 'Nice', category: 'airports', longitude: 7.21587, latitude: 43.658401, interpretedFacility: "Nice-Côte d'Azur Airport", identifier: 'ident=LFMN icao=LFMN iata=NCE', status: 'confirmed' }),
  airport({ id: 'marseille-air', name: 'Marseille', category: 'airports', longitude: 5.2125, latitude: 43.438088, interpretedFacility: 'Marseille Provence Airport', identifier: 'ident=LFML icao=LFML iata=MRS', status: 'confirmed' }),
  airport({ id: 'toulouse', name: 'Toulouse', category: 'airports', longitude: 1.36382, latitude: 43.629101, interpretedFacility: 'Toulouse-Blagnac Airport', identifier: 'ident=LFBO icao=LFBO iata=TLS', status: 'confirmed' }),
  airport({ id: 'mulhouse', name: 'Mulhouse', category: 'airports', longitude: 7.521117, latitude: 47.60068, interpretedFacility: 'EuroAirport Basel–Mulhouse–Freiburg', identifier: 'ident=LFSB icao=LFSB iata=BSL', status: 'provisional', note: "V21 — même installation que l’entrée « Bâle » de la liste limitrophe." }),
  airport({ id: 'nantes', name: 'Nantes', category: 'airports', longitude: -1.61073, latitude: 47.153198, interpretedFacility: 'Nantes Atlantique Airport', identifier: 'ident=LFRS icao=LFRS iata=NTE', status: 'confirmed' }),
  airport({ id: 'metz', name: 'Metz', category: 'airports', longitude: 6.25132, latitude: 48.982101, interpretedFacility: 'Metz-Nancy-Lorraine Airport', identifier: 'ident=LFJL icao=LFJL iata=ETZ', status: 'provisional', note: "V21 — « Metz » est interprété comme Metz-Nancy-Lorraine (LFJL), ce que l’archive ne précise pas." }),
  airport({ id: 'strasbourg', name: 'Strasbourg', category: 'airports', longitude: 7.62823, latitude: 48.5383, interpretedFacility: 'Strasbourg Airport', identifier: 'ident=LFST icao=LFST iata=SXB', status: 'confirmed' }),
  airport({ id: 'lille', name: 'Lille', category: 'airports', longitude: 3.102429, latitude: 50.566564, interpretedFacility: 'Lille Airport', identifier: 'ident=LFQQ icao=LFQQ iata=LIL', status: 'confirmed' }),
  airport({ id: 'brest', name: 'Brest', category: 'airports', longitude: -4.41854, latitude: 48.447899, interpretedFacility: 'Brest Bretagne airport', identifier: 'ident=LFRB icao=LFRB iata=BES', status: 'confirmed' }),
  manual({ id: 'le-havre', name: 'Le Havre', category: 'maritime', longitude: 0.1077, latitude: 49.4839, interpretedFacility: 'Terminal croisière du Havre', note: 'Les terminaux maritimes ne sont pas couverts par le jeu airport.csv. Confirmer avec une source faisant autorité avant mise en production.' }),
  manual({ id: 'monaco', name: 'Monaco', category: 'maritime', longitude: 7.4197, latitude: 43.7355, interpretedFacility: 'Port Hercule, Monaco', note: 'Les terminaux maritimes ne sont pas couverts par le jeu airport.csv. Confirmer avec une source faisant autorité avant mise en production.' }),
  manual({ id: 'marseille-port', name: 'Marseille', category: 'maritime', longitude: 5.366, latitude: 43.307, interpretedFacility: 'Grand Port Maritime de Marseille', note: 'Les terminaux maritimes ne sont pas couverts par le jeu airport.csv. Confirmer avec une source faisant autorité avant mise en production.' }),
  manual({ id: 'cherbourg', name: 'Cherbourg', category: 'maritime', longitude: -1.622, latitude: 49.645, interpretedFacility: 'Port de Cherbourg', note: 'Les terminaux maritimes ne sont pas couverts par le jeu airport.csv. Confirmer avec une source faisant autorité avant mise en production.' }),
  manual({ id: 'gare-du-nord', name: 'Gare du Nord', category: 'rail', longitude: 2.3553, latitude: 48.8809, interpretedFacility: 'Gare du Nord, Paris', note: 'Les six gares sont lues comme des gares parisiennes ; l’archive ne précise pas ce rattachement.' }),
  manual({ id: 'gare-est', name: 'Gare de l’Est', category: 'rail', longitude: 2.359, latitude: 48.8768, interpretedFacility: 'Gare de l’Est, Paris', note: 'Les six gares sont lues comme des gares parisiennes ; l’archive ne précise pas ce rattachement.' }),
  manual({ id: 'gare-lyon', name: 'Gare de Lyon', category: 'rail', longitude: 2.3743, latitude: 48.8443, interpretedFacility: 'Gare de Lyon, Paris', note: 'Les six gares sont lues comme des gares parisiennes ; l’archive ne précise pas ce rattachement.' }),
  manual({ id: 'gare-austerlitz', name: 'Gare d’Austerlitz', category: 'rail', longitude: 2.366, latitude: 48.8422, interpretedFacility: 'Gare d’Austerlitz, Paris', note: 'Les six gares sont lues comme des gares parisiennes ; l’archive ne précise pas ce rattachement.' }),
  manual({ id: 'gare-bercy', name: 'Gare de Bercy', category: 'rail', longitude: 2.3824, latitude: 48.839, interpretedFacility: 'Gare de Bercy, Paris', note: 'Les six gares sont lues comme des gares parisiennes ; l’archive ne précise pas ce rattachement.' }),
  manual({ id: 'montparnasse', name: 'Montparnasse', category: 'rail', longitude: 2.3208, latitude: 48.8412, interpretedFacility: 'Gare Montparnasse, Paris', note: 'Les six gares sont lues comme des gares parisiennes ; l’archive ne précise pas ce rattachement.' }),
  airport({ id: 'bruxelles', name: 'Bruxelles', category: 'borders', longitude: 4.48444, latitude: 50.901402, interpretedFacility: 'Brussels Airport', identifier: 'ident=EBBR icao=EBBR iata=BRU', status: 'confirmed' }),
  airport({ id: 'francfort', name: 'Francfort', category: 'borders', longitude: 8.55835, latitude: 50.026706, interpretedFacility: 'Frankfurt Main Airport', identifier: 'ident=EDDF icao=EDDF iata=FRA', status: 'confirmed' }),
  airport({ id: 'bale', name: 'Bâle', category: 'borders', longitude: 7.521117, latitude: 47.60068, interpretedFacility: 'EuroAirport Basel–Mulhouse–Freiburg', identifier: 'ident=LFSB icao=LFSB iata=BSL', status: 'provisional', note: "V21 — même installation que l’entrée « Mulhouse » de la liste française." }),
  airport({ id: 'geneve', name: 'Genève', category: 'borders', longitude: 6.10895, latitude: 46.238098, interpretedFacility: 'Geneva International Airport', identifier: 'ident=LSGG icao=LSGG iata=GVA', status: 'confirmed' }),
  airport({ id: 'zurich', name: 'Zurich', category: 'borders', longitude: 8.548056, latitude: 47.458056, interpretedFacility: 'Zürich Airport', identifier: 'ident=LSZH icao=LSZH iata=ZRH', status: 'confirmed' }),
]
