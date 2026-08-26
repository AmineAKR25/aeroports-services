// Content verbatim from the archived original /services/ page.
// Source: reference/original-aeroports-services/raw/pages/services.html
// No wording is added, shortened or paraphrased.

export interface ServiceFamily {
  id: string;
  index: string;
  title: string;
  /** Who this family is for — derived from the family's own wording, not invented. */
  audience: string;
  items: string[];
}

export const SERVICE_FAMILIES: ServiceFamily[] = [
  {
    id: 'assistance',
    index: '01',
    title: 'Assistance aux passagers',
    audience: 'Passagers au départ, à l’arrivée et en transit',
    items: [
      'Accueil et assistance de passagers au départ / à l’arrivée / en transit sur les aéroports et gares',
      'Remise de billets et documents de voyages',
      'Aide aux formalités d’enregistrement',
      'Traitement des irrégularités bagages',
      'Traitement VIP',
      'Gestion de l’imprévu (retard, reprotection, …)',
    ],
  },
  {
    id: 'representation',
    index: '02',
    title: 'Représentation aéroportuaire',
    audience: 'Agences, tours opérateurs et autocaristes',
    items: [
      'Agences de voyages / Tours opérateurs / Autocaristes',
      'Représentation auprès des différents acteurs aéroportuaires (ADP, CCI, compagnies, …)',
      'Accueil et traitement groupes',
      'Gestion de vols affrétés',
    ],
  },
  {
    id: 'compagnies',
    index: '03',
    title: 'Compagnies aériennes — Brokers',
    audience: 'Compagnies aériennes et brokers',
    items: [
      'Mise en place d’escale',
      'Contrôle et application des procédures',
      'Gestion des vols et supervision passager',
      'Piste, accueil PNT / PNC',
      'Audit de qualité',
    ],
  },
  {
    id: 'force-de-vente',
    index: '04',
    title: 'Force de vente conseil',
    audience: 'Développement commercial',
    items: [
      'Relation de confiance',
      'Le travail de suivi relationnel',
      'L’écoute active',
      'Les méthodes : SPANCO / SONCAS / CAP / SIMAC',
    ],
  },
];

// Contact details verbatim from the archived /contact/ page. Pending V10.
export const CONTACT = {
  address: '2 Rue Emile Raspail, 91380 Chilly-Mazarin',
  ops: { label: 'OPS 7/7', display: '+33 (0)6 60 47 59 16', tel: '+33660475916' },
  office: { label: 'Tél', display: '+33 (0)1 81 87 17 02', tel: '+33181871702' },
  email: 'resaparis@aeroports-services.com',
} as const;

export const POSITIONING = 'Premier Réseau Français d’Assistance aux passagers';
export const MOTTO =
  'Chaque jour, chaque nuit, partout en France le service est notre métier, ' +
  'le sourire du passager notre satisfaction.';
