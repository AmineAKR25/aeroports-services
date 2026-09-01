'use client'

import {
  Map as MapLibreMapConstructor,
  Marker as MapLibreMarkerConstructor,
  NavigationControl,
  Popup as MapLibrePopupConstructor,
  setWorkerUrl,
  type Map as MapLibreMap,
  type Marker as MapLibreMarker,
  type Popup as MapLibrePopup,
  type StyleSpecification,
} from 'maplibre-gl'
import { useEffect, useMemo, useRef, useState } from 'react'
import type { CoverageLocation } from './coverage-locations'

type RealMapProps = {
  locations: CoverageLocation[]
  selectedLocationId: string
  highlightedLocationId: string | null
  onSelectLocation: (id: string) => void
  onHighlightLocation: (id: string | null) => void
}

type MarkerRecord = { marker: MapLibreMarker; element: HTMLButtonElement }
type DenseGroupDefinition = { id: string; label: string; locationIds: string[] }
type DenseGroup = DenseGroupDefinition & { center: [number, number]; locations: CoverageLocation[] }

// Streets Pastel keeps roads, airports and place labels while staying quiet
// enough for the operational coverage layer.
const mapTilerStyleId = 'streets-v4-pastel'
const mapTilerStyleUrl = (key: string) => `https://api.maptiler.com/maps/${mapTilerStyleId}/style.json?key=${encodeURIComponent(key)}`
// Include metropolitan France, Corsica and the neighbouring airport context
// in the first geographic view rather than cropping the island out.
const franceContextBounds = [[-5.35, 41.15], [10.2, 51.25]] as [[number, number], [number, number]]
const denseRevealZoom = 8.2
const denseGroupDefinitions: DenseGroupDefinition[] = [
  { id: 'paris-rail', label: 'Paris · 6 gares proches', locationIds: ['gare-du-nord', 'gare-est', 'gare-lyon', 'gare-austerlitz', 'gare-bercy', 'montparnasse'] },
  { id: 'bale-mulhouse', label: 'Bâle / Mulhouse · 2 repères', locationIds: ['bale', 'mulhouse'] },
]

const categoryLabels: Record<CoverageLocation['category'], string> = {
  airports: 'Aéroport français',
  borders: 'Aéroport limitrophe',
  maritime: 'Gare maritime',
  rail: 'Gare ferroviaire',
}

const requiredGeographicLayerGroups = [
  ['water', 'ocean', 'marine', 'coast'],
  ['boundary', 'border', 'admin'],
  ['road', 'transportation', 'highway', 'street'],
  ['place', 'city', 'settlement'],
  ['aeroway', 'airport', 'aerodrome'],
] as const

function popupMarkup(location: CoverageLocation) {
  const provenanceLabel = location.coordinateStatus === 'confirmed' ? 'Coordonnée issue du jeu OurAirports' : 'Repère provisoire · à valider'
  return `<strong>${location.name}</strong><span>${categoryLabels[location.category]}</span><small>${provenanceLabel}</small>`
}

function createDenseGroups(locations: CoverageLocation[]): DenseGroup[] {
  return denseGroupDefinitions.flatMap((definition) => {
    const groupLocations = definition.locationIds.flatMap((id) => {
      const location = locations.find((item) => item.id === id)
      return location ? [location] : []
    })
    if (groupLocations.length < 2) return []
    const center = groupLocations.reduce<[number, number]>((total, location) => [total[0] + location.longitude, total[1] + location.latitude], [0, 0]).map((value) => value / groupLocations.length) as [number, number]
    return [{ ...definition, center, locations: groupLocations }]
  })
}

function hasRequiredGeographicLayers(style: StyleSpecification) {
  const layerText = (layer: StyleSpecification['layers'][number]) => `${layer.id} ${'source-layer' in layer ? layer['source-layer'] ?? '' : ''}`.toLowerCase()
  const visibleLayers = style.layers.filter((layer) => !('layout' in layer) || layer.layout?.visibility !== 'none')
  return requiredGeographicLayerGroups.every((group) => group.some((token) => visibleLayers.some((layer) => layerText(layer).includes(token))))
}

async function getMapTilerStyle(key: string) {
  const response = await fetch(mapTilerStyleUrl(key), { cache: 'no-store' })
  if (!response.ok) throw new Error(`MapTiler style unavailable (${response.status})`)
  const styleDocument = await response.json() as StyleSpecification
  if (styleDocument.version !== 8 || !styleDocument.sources || !styleDocument.layers?.length || !hasRequiredGeographicLayers(styleDocument)) {
    throw new Error('MapTiler style is missing intended geographic layers')
  }

  // Resolve MapTiler's vector TileJSON before passing the style to MapLibre.
  // This makes source readiness deterministic in the browser worker while
  // retaining the original MapTiler vector tiles and attribution metadata.
  const vectorSource = styleDocument.sources.maptiler_planet_v4
  if (!vectorSource || vectorSource.type !== 'vector' || !('url' in vectorSource) || typeof vectorSource.url !== 'string') {
    throw new Error('MapTiler vector source is unavailable')
  }
  const tileJsonResponse = await fetch(vectorSource.url, { cache: 'no-store' })
  if (!tileJsonResponse.ok) throw new Error(`MapTiler TileJSON unavailable (${tileJsonResponse.status})`)
  const tileJson = await tileJsonResponse.json() as { tiles?: string[] }
  if (!Array.isArray(tileJson.tiles) || tileJson.tiles.length === 0) throw new Error('MapTiler vector tiles are unavailable')
  vectorSource.tiles = tileJson.tiles
  delete vectorSource.url
  return styleDocument
}

export default function RealMap({ locations, selectedLocationId, highlightedLocationId, onSelectLocation, onHighlightLocation }: RealMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<MapLibreMap | null>(null)
  const markerRefs = useRef<Map<string, MarkerRecord>>(new Map())
  const denseMarkerRefs = useRef<Map<string, MapLibreMarker>>(new Map())
  const popupRef = useRef<MapLibrePopup | null>(null)
  const densePanelTitleRef = useRef<HTMLElement>(null)
  const callbackRefs = useRef({ onHighlightLocation, onSelectLocation })
  const previousSelectionRef = useRef<string | null>(null)
  const denseGroups = useMemo(() => createDenseGroups(locations), [locations])
  const [openDenseGroupId, setOpenDenseGroupId] = useState<string | null>(null)
  const mapTilerKey = process.env.NEXT_PUBLIC_MAPTILER_KEY?.trim()
  const [mapState, setMapState] = useState<'loading' | 'ready' | 'error'>(mapTilerKey ? 'loading' : 'error')
  const [mapErrorMessage, setMapErrorMessage] = useState(mapTilerKey ? 'La carte MapTiler n’est pas disponible pour le moment.' : 'La carte MapTiler n’est pas configurée localement.')

  const openDenseGroup = denseGroups.find((group) => group.id === openDenseGroupId) ?? null

  useEffect(() => {
    callbackRefs.current = { onHighlightLocation, onSelectLocation }
  }, [onHighlightLocation, onSelectLocation])

  useEffect(() => {
    const container = mapContainerRef.current
    if (!container) return

    let disposed = false
    if (!mapTilerKey) {
      return () => { disposed = true }
    }

    let map: MapLibreMap
    try {
      // Next's dev bundler can otherwise resolve MapLibre's worker URL to the
      // document root. Keep the worker same-origin so Netlify serves the
      // worker and its shared module without an external runtime dependency.
      setWorkerUrl('/maplibre-gl-worker.mjs')
      map = new MapLibreMapConstructor({
        attributionControl: { compact: false },
        center: [2.2, 47.2],
        cooperativeGestures: true,
        container,
        maxZoom: 14,
        minZoom: 3.5,
        style: {
          layers: [{ id: 'map-bootstrap', paint: { 'background-color': '#edf2f0' }, type: 'background' }],
          sources: {},
          version: 8,
        },
        transformRequest: (url) => {
          if (!url.startsWith('https://api.maptiler.com/') || url.includes('key=')) return { url }
          return { url: `${url}${url.includes('?') ? '&' : '?'}key=${encodeURIComponent(mapTilerKey)}` }
        },
        zoom: 5,
      })
    } catch {
      window.requestAnimationFrame(() => {
        if (!disposed) setMapState('error')
      })
      return () => { disposed = true }
    }
    mapRef.current = map
    map.addControl(new NavigationControl({ showCompass: false }), 'top-right')
    window.requestAnimationFrame(() => {
      if (!disposed) {
        map.resize()
        map.triggerRepaint()
      }
    })

    const markerRecords = markerRefs.current
    const denseMarkerRecords = denseMarkerRefs.current
    const denseLocationIds = new Set(denseGroups.flatMap((group) => group.locationIds))
    let basemapReady = false

    const setMarkersVisible = (visible: boolean) => {
      markerRecords.forEach(({ element }) => element.style.setProperty('display', visible ? 'flex' : 'none'))
      denseMarkerRecords.forEach((marker) => marker.getElement().style.setProperty('display', visible ? 'flex' : 'none'))
    }

    locations.forEach((location) => {
      const element = document.createElement('button')
      element.className = `coverage-map-marker coverage-map-marker--${location.category}`
      element.dataset.locationId = location.id
      element.type = 'button'
      element.title = location.name
      element.setAttribute('aria-label', `${location.name} — ${categoryLabels[location.category]}`)

      const core = document.createElement('span')
      core.className = 'coverage-map-marker-core'
      const hiddenText = document.createElement('span')
      hiddenText.className = 'sr-only'
      hiddenText.textContent = location.name
      element.append(core, hiddenText)

      const marker = new MapLibreMarkerConstructor({ anchor: 'center', element })
        .setLngLat([location.longitude, location.latitude])
        .addTo(map)
      markerRecords.set(location.id, { element, marker })
      element.style.display = 'none'

      element.addEventListener('click', () => callbackRefs.current.onSelectLocation(location.id))
      element.addEventListener('focus', () => callbackRefs.current.onHighlightLocation(location.id))
      element.addEventListener('mouseenter', () => callbackRefs.current.onHighlightLocation(location.id))
      element.addEventListener('mouseleave', () => callbackRefs.current.onHighlightLocation(null))
    })

    const setDenseVisibility = () => {
      if (!basemapReady) {
        setMarkersVisible(false)
        return
      }
      const showIndividualMarkers = map.getZoom() >= denseRevealZoom
      denseGroups.forEach((group) => {
        denseMarkerRecords.get(group.id)?.getElement().style.setProperty('display', showIndividualMarkers ? 'none' : 'flex')
        group.locationIds.forEach((locationId) => {
          const record = markerRecords.get(locationId)
          if (record) record.element.style.display = showIndividualMarkers ? 'flex' : 'none'
        })
      })
      locations.forEach((location) => {
        if (!denseLocationIds.has(location.id)) markerRecords.get(location.id)?.element.style.setProperty('display', 'flex')
      })
    }

    denseGroups.forEach((group) => {
      const element = document.createElement('button')
      element.className = 'coverage-map-cluster'
      element.type = 'button'
      element.title = group.label
      element.setAttribute('aria-label', `${group.label}. Ouvrir le détail des lieux.`)
      const count = document.createElement('span')
      count.className = 'coverage-map-cluster-count'
      count.textContent = String(group.locations.length)
      const label = document.createElement('span')
      label.className = 'coverage-map-cluster-label'
      label.textContent = group.id === 'paris-rail' ? 'Paris' : 'Bâle / Mulhouse'
      element.append(count, label)
      const marker = new MapLibreMarkerConstructor({ anchor: 'center', element }).setLngLat(group.center).addTo(map)
      denseMarkerRecords.set(group.id, marker)
      element.style.display = 'none'
      element.addEventListener('click', () => {
        popupRef.current?.remove()
        popupRef.current = null
        setOpenDenseGroupId(group.id)
        const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        map.flyTo({ center: group.center, duration: isReducedMotion ? 0 : 520, essential: true, zoom: Math.max(map.getZoom(), denseRevealZoom + 0.4) })
      })
    })
    setDenseVisibility()
    map.on('zoom', setDenseVisibility)

    let initialized = false
    let intendedStyleRequested = false
    let intendedStyleLoaded = false
    let viewportFitted = false
    const failMap = (message = 'La carte MapTiler n’est pas disponible pour le moment.') => {
      if (disposed) return
      basemapReady = false
      setMarkersVisible(false)
      setMapErrorMessage(message)
      setMapState('error')
    }
    const initializeMap = () => {
      if (disposed || initialized || !intendedStyleLoaded) return
      const renderedStyle = map.getStyle()
      if (!hasRequiredGeographicLayers(renderedStyle)) {
        failMap('La carte MapTiler n’a pas rendu les couches géographiques attendues. Le répertoire adjacent reste complet et utilisable.')
        return
      }
      if (!viewportFitted) {
        viewportFitted = true
        map.fitBounds(franceContextBounds, { duration: 0, maxZoom: 5.1, padding: { bottom: 48, left: 34, right: 34, top: 34 } })
        map.resize()
        return
      }
      if (!map.isStyleLoaded()) return
      if (typeof map.areTilesLoaded === 'function' && !map.areTilesLoaded()) return
      initialized = true
      basemapReady = true
      setMapState('ready')
      setDenseVisibility()
    }
    // Bootstrap style events are deliberately ignored. Ready is only reached
    // after the intended MapTiler style, geographic layer set and tile idle.
    map.on('style.load', () => {
      if (!intendedStyleRequested) return
      intendedStyleLoaded = true
      initializeMap()
    })
    map.on('idle', initializeMap)
    map.on('error', () => failMap())
    void getMapTilerStyle(mapTilerKey).then((styleDocument) => {
      if (!disposed) {
        intendedStyleRequested = true
        map.setStyle(styleDocument)
        map.resize()
        map.triggerRepaint()
      }
    }).catch(() => failMap('La carte MapTiler n’est pas accessible avec la configuration actuelle.'))

    return () => {
      disposed = true
      popupRef.current?.remove()
      popupRef.current = null
      markerRecords.forEach(({ marker }) => marker.remove())
      markerRecords.clear()
      denseMarkerRecords.forEach((marker) => marker.remove())
      denseMarkerRecords.clear()
      map.off('zoom', setDenseVisibility)
      map.remove()
      mapRef.current = null
      previousSelectionRef.current = null
    }
  }, [denseGroups, locations, mapTilerKey])

  useEffect(() => {
    if (!openDenseGroupId) return
    window.requestAnimationFrame(() => densePanelTitleRef.current?.focus())
  }, [openDenseGroupId])

  useEffect(() => {
    markerRefs.current.forEach(({ element }, id) => {
      element.classList.toggle('is-selected', id === selectedLocationId)
      element.classList.toggle('is-highlighted', id === highlightedLocationId)
    })
  }, [highlightedLocationId, selectedLocationId])

  useEffect(() => {
    const map = mapRef.current
    const location = locations.find((item) => item.id === selectedLocationId)
    if (!map || mapState !== 'ready' || !location) return

    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const denseGroup = denseGroups.find((group) => group.locationIds.includes(selectedLocationId))
    if (denseGroup && map.getZoom() < denseRevealZoom) setOpenDenseGroupId(denseGroup.id)
    if (previousSelectionRef.current && previousSelectionRef.current !== selectedLocationId) {
      map.flyTo({ center: [location.longitude, location.latitude], duration: isReducedMotion ? 0 : 520, essential: true, zoom: Math.max(map.getZoom(), denseGroup ? denseRevealZoom + 0.4 : 6.1) })
    }
    previousSelectionRef.current = selectedLocationId

    const popup = popupRef.current ?? new MapLibrePopupConstructor({ closeButton: false, closeOnClick: false, maxWidth: '220px', offset: 17 })
    popupRef.current = popup
    popup.setLngLat([location.longitude, location.latitude]).setHTML(popupMarkup(location)).addTo(map)
  }, [denseGroups, locations, mapState, selectedLocationId])

  return <div className={`real-map-shell${mapState === 'error' ? ' has-error' : ''}`}>
    <div aria-label="Carte géographique interactive des implantations publiées" className="real-map" ref={mapContainerRef} />
    {mapState === 'loading' ? <div className="map-status" role="status"><span className="map-status-line" />Chargement de la carte</div> : null}
    {mapState === 'error' ? <div className="map-error" role="alert"><strong>{mapErrorMessage}</strong><span>Le répertoire adjacent reste complet et utilisable.</span></div> : null}
    {openDenseGroup ? <aside aria-labelledby={`dense-title-${openDenseGroup.id}`} className="map-density-panel">
      <div className="map-density-heading"><div><span>Zone dense</span><strong id={`dense-title-${openDenseGroup.id}`} ref={densePanelTitleRef} tabIndex={-1}>{openDenseGroup.label}</strong><p>Les lieux restent sélectionnables un par un dans ce panneau et dans le répertoire.</p></div><button aria-label={`Fermer le détail ${openDenseGroup.label}`} onClick={() => setOpenDenseGroupId(null)} type="button">Fermer <span aria-hidden="true">×</span></button></div>
      <ul>{openDenseGroup.locations.map((location) => <li key={location.id}><button aria-current={selectedLocationId === location.id ? 'true' : undefined} className={selectedLocationId === location.id ? 'is-selected' : ''} onBlur={() => onHighlightLocation(null)} onClick={() => onSelectLocation(location.id)} onFocus={() => onHighlightLocation(location.id)} onMouseEnter={() => onHighlightLocation(location.id)} onMouseLeave={() => onHighlightLocation(null)} type="button"><span aria-hidden="true" className={`category-shape category-shape--${location.category}`} /><span>{location.name}</span><span>Ouvrir</span></button></li>)}</ul>
      <p className="map-density-note">À l’échelle détaillée, les repères individuels reprennent leur longitude et latitude propres.</p>
    </aside> : null}
    <a className="map-provider-logo" href="https://www.maptiler.com/" rel="noreferrer" target="_blank">MapTiler</a>
    <p className="map-attribution">© MapTiler · © OpenStreetMap contributors</p>
  </div>
}
