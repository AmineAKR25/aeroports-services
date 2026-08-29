export type Service = {
  id: string
  index: string
  title: string
  shortTitle: string
  audience: string
  scope: string
  deliverables: string[]
  image: string
  imageAlt: string
  imagePosition: string
}

import { coverageLocations, type CoverageCategory, type CoverageLocation } from './coverage-locations'

export type { CoverageCategory, CoverageLocation }
export type Location = CoverageLocation

export const services: Service[] = [
  {
    id: 'passagers',
    index: '01',
    title: 'Assistance aux passagers',
    shortTitle: 'Assistance passagers',
    audience: 'Passagers individuels, groupes, agences et organisateurs.',
    scope:
      'Une présence en aéroport ou en gare au départ, à l’arrivée et en transit, avec un interlocuteur qui reste mobilisé lorsque le parcours change.',
    deliverables: [
      'Billets, documents, enregistrement et bagages',
      'Accueil VIP et accompagnement des groupes',
      'Gestion des retards, imprévus et réacheminements',
    ],
    image: '/assets/redesign/service-a.webp',
    imageAlt: 'Avion stationné au point de contact, entouré par les équipes au sol',
    imagePosition: '56% center',
  },
  {
    id: 'representation',
    index: '02',
    title: 'Représentation aéroportuaire',
    shortTitle: 'Représentation',
    audience: 'Agences, tour-opérateurs et autocaristes.',
    scope:
      'Une représentation opérationnelle auprès des gestionnaires d’aéroports, des compagnies et des parties prenantes du passage.',
    deliverables: [
      'Représentation auprès d’ADP, CCI et compagnies',
      'Accueil et traitement des groupes',
      'Gestion des vols charters',
    ],
    image: '/assets/redesign/service-b.webp',
    imageAlt: 'Agente accompagnant une passagère dans un terminal',
    imagePosition: '50% center',
  },
  {
    id: 'compagnies',
    index: '03',
    title: 'Compagnies aériennes — brokers',
    shortTitle: 'Compagnies & brokers',
    audience: 'Compagnies aériennes, brokers et opérateurs de vols.',
    scope:
      'Un relais de terrain pour préparer, superviser et contrôler l’escale, des procédures à la qualité de service.',
    deliverables: [
      'Mise en place d’escale et contrôle des procédures',
      'Supervision vol, passagers, rampe, PNT et PNC',
      'Audit de qualité',
    ],
    image: '/assets/redesign/service-c.webp',
    imageAlt: 'Équipe en réunion pour préparer une opération',
    imagePosition: '52% center',
  },
  {
    id: 'conseil',
    index: '04',
    title: 'Force de vente conseil',
    shortTitle: 'Force de vente conseil',
    audience: 'Acteurs qui souhaitent structurer leur démarche commerciale.',
    scope:
      'Une approche fondée sur la confiance, l’écoute active et le suivi de la relation pour transformer un besoin en plan d’action.',
    deliverables: [
      'Écoute active et suivi relationnel',
      'Méthodes SPANCO, SONCAS et CAP',
      'Méthode de présentation SIMAC',
    ],
    image: '/assets/redesign/service-d.webp',
    imageAlt: 'Avion et véhicules de service sur le tarmac',
    imagePosition: '70% center',
  },
]

export const locations: Location[] = coverageLocations

export const categoryLabels: Record<CoverageCategory, string> = {
  airports: 'Aéroports français',
  rail: 'Gares ferroviaires',
  maritime: 'Gares maritimes',
  borders: 'Aéroports limitrophes',
}

export const partnerGroups = [
  {
    name: 'Compagnies aériennes',
    logos: [
      { name: 'Novair', src: '/assets/novair.jpg' },
      { name: 'Air France', src: '/assets/air-france.jpg' },
      { name: 'Corsair', src: '/assets/corsair.jpg' },
    ],
  },
  {
    name: 'Réseaux et acteurs du voyage',
    logos: [
      { name: 'Havas Voyages', src: '/assets/havas-voyages.jpg' },
      { name: 'Selectour', src: '/assets/selectour.jpg' },
      { name: 'Carlson Wagonlit Travel', src: '/assets/carlson-wagonlit.jpg' },
    ],
  },
  {
    name: 'Brokers et affrètement',
    logos: [
      { name: 'Air Charter Service', src: '/assets/air-charter-service.png' },
      { name: 'Pro Sky', src: '/assets/pro-sky.jpg' },
      { name: 'Brokair', src: '/assets/brokair.jpg' },
    ],
  },
]

export const stats = [
  { value: '1,8 million', label: 'de passagers ont bénéficié des services' },
  { value: '20', label: 'aéroports couverts' },
  { value: '+ 40 000', label: 'assistances' },
  { value: '40', label: 'collaborateurs' },
]

export const history = [
  { year: '1991', title: 'Assist Concep', text: 'Création à Lyon par Gilbert Laine.' },
  { year: '1999', title: 'Air Assistance Services', text: 'Création de l’entreprise individuelle.' },
  { year: '2000', title: 'ARC', text: 'Création d’un second socle métier.' },
  {
    year: '2006',
    title: 'Aéroports Services',
    text: 'Sami Ben Rabiaa, Eric Larroque, Michael Leonardo et Alexandre Rossi fondent le réseau intégré français.',
  },
]
