'use client'

import {
  Map as MapLibreMapConstructor,
  Marker as MapLibreMarkerConstructor,
  NavigationControl,
  Popup as MapLibrePopupConstructor,
  type Map as MapLibreMap,
  type Marker as MapLibreMarker,
  type Popup as MapLibrePopup,
} from 'maplibre-gl'
import { useEffect, useRef, useState } from 'react'
import type { CoverageLocation } from './coverage-locations'

type RealMapProps = {
  locations: CoverageLocation[]
  selectedLocationId: string
  highlightedLocationId: string | null
  onSelectLocation: (id: string) => void
  onHighlightLocation: (id: string | null) => void
}

type MarkerRecord = { marker: MapLibreMarker; element: HTMLButtonElement }

// V3 prototype provider. Review OpenFreeMap hosting/provider requirements and
// capacity before production launch; no credential is required here.
const styleUrl = 'https://tiles.openfreemap.org/styles/positron'
const tileJsonUrl = 'https://tiles.openfreemap.org/planet'
const rasterFallbackTiles = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png'
const rasterFallbackSourceId = 'osm-raster-fallback'
const rasterFallbackLayerId = 'osm-raster-fallback-layer'
const franceContextBounds = [[-5.35, 42.82], [9.35, 51.25]] as [[number, number], [number, number]]

const categoryLabels: Record<CoverageLocation['category'], string> = {
  airports: 'Aéroport français',
  borders: 'Aéroport limitrophe',
  maritime: 'Gare maritime',
  rail: 'Gare ferroviaire',
}

function popupMarkup(location: CoverageLocation) {
  return `<strong>${location.name}</strong><span>${categoryLabels[location.category]}</span>`
}

function addRasterFallback(map: MapLibreMap) {
  if (!map.getSource(rasterFallbackSourceId)) {
    map.addSource(rasterFallbackSourceId, {
      attribution: '© OpenStreetMap contributors',
      tileSize: 256,
      tiles: [rasterFallbackTiles],
      type: 'raster',
    })
  }
  if (!map.getLayer(rasterFallbackLayerId)) {
    map.addLayer({
      id: rasterFallbackLayerId,
      paint: {
        'raster-brightness-max': 0.98,
        'raster-brightness-min': 0.08,
        'raster-contrast': -0.14,
        'raster-opacity': 0.88,
        'raster-saturation': -0.72,
      },
      source: rasterFallbackSourceId,
      type: 'raster',
    }, 'park')
  }
}

async function getOpenFreeMapStyle() {
  const [styleResponse, tileJsonResponse] = await Promise.all([fetch(styleUrl), fetch(tileJsonUrl)])
  if (!styleResponse.ok || !tileJsonResponse.ok) throw new Error('OpenFreeMap style unavailable')
  const [styleDocument, tileJson] = await Promise.all([styleResponse.json(), tileJsonResponse.json()])
  const source = styleDocument.sources?.openmaptiles
  if (!source || !Array.isArray(tileJson.tiles) || tileJson.tiles.length === 0) throw new Error('OpenFreeMap tiles unavailable')

  // Resolve the TileJSON URL before MapLibre consumes the style. This keeps
  // the vector source explicit and avoids an extra metadata-loading hop.
  source.tiles = tileJson.tiles
  delete source.url
  return styleDocument
}

export default function RealMap({ locations, selectedLocationId, highlightedLocationId, onSelectLocation, onHighlightLocation }: RealMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<MapLibreMap | null>(null)
  const markerRefs = useRef<Map<string, MarkerRecord>>(new Map())
  const popupRef = useRef<MapLibrePopup | null>(null)
  const callbackRefs = useRef({ onHighlightLocation, onSelectLocation })
  const previousSelectionRef = useRef<string | null>(null)
  const [mapState, setMapState] = useState<'loading' | 'ready' | 'error'>('loading')

  useEffect(() => {
    callbackRefs.current = { onHighlightLocation, onSelectLocation }
  }, [onHighlightLocation, onSelectLocation])

  useEffect(() => {
    const container = mapContainerRef.current
    if (!container) return

    let disposed = false
    let map: MapLibreMap
    try {
      map = new MapLibreMapConstructor({
        attributionControl: {},
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
    locations.forEach((location) => {
      const element = document.createElement('button')
      element.className = `coverage-map-marker coverage-map-marker--${location.category}`
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

      element.addEventListener('click', () => callbackRefs.current.onSelectLocation(location.id))
      element.addEventListener('focus', () => callbackRefs.current.onHighlightLocation(location.id))
      element.addEventListener('mouseenter', () => callbackRefs.current.onHighlightLocation(location.id))
      element.addEventListener('mouseleave', () => callbackRefs.current.onHighlightLocation(null))
    })

    let initialized = false
    const initializeMap = () => {
      if (disposed) return
      if (initialized) return
      initialized = true
      setMapState('ready')
      map.fitBounds(franceContextBounds, { duration: 0, maxZoom: 5.1, padding: { bottom: 48, left: 34, right: 34, top: 34 } })
    }
    // `idle` is a safe fallback for cached styles where the initial load event
    // can occur before the listener is attached in a client-only boundary.
    map.once('load', initializeMap)
    map.once('idle', initializeMap)
    if (map.isStyleLoaded()) initializeMap()
    map.on('error', () => {
      if (!disposed) setMapState('error')
    })
    void getOpenFreeMapStyle().then((styleDocument) => {
      if (!disposed) {
        map.once('style.load', () => {
          if (!disposed) addRasterFallback(map)
        })
        map.setStyle(styleDocument)
        map.resize()
        map.triggerRepaint()
      }
    }).catch(() => {
      if (!disposed) setMapState('error')
    })

    return () => {
      disposed = true
      popupRef.current?.remove()
      popupRef.current = null
      markerRecords.forEach(({ marker }) => marker.remove())
      markerRecords.clear()
      map.remove()
      mapRef.current = null
      previousSelectionRef.current = null
    }
  }, [locations])

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
    if (previousSelectionRef.current && previousSelectionRef.current !== selectedLocationId) {
      map.flyTo({ center: [location.longitude, location.latitude], duration: isReducedMotion ? 0 : 520, essential: true, zoom: Math.max(map.getZoom(), 6.1) })
    }
    previousSelectionRef.current = selectedLocationId

    const popup = popupRef.current ?? new MapLibrePopupConstructor({ closeButton: false, closeOnClick: false, maxWidth: '220px', offset: 17 })
    popupRef.current = popup
    popup.setLngLat([location.longitude, location.latitude]).setHTML(popupMarkup(location)).addTo(map)
  }, [locations, mapState, selectedLocationId])

  return <div className={`real-map-shell${mapState === 'error' ? ' has-error' : ''}`}>
    <div aria-label="Carte géographique interactive des implantations publiées" className="real-map" ref={mapContainerRef} />
    {mapState === 'loading' ? <div className="map-status" role="status"><span className="map-status-line" />Chargement de la carte</div> : null}
    {mapState === 'error' ? <div className="map-error" role="alert"><strong>La carte n’est pas disponible pour le moment.</strong><span>Le répertoire adjacent reste complet et utilisable.</span></div> : null}
    <p className="map-attribution">© OpenFreeMap · © OpenMapTiles · Données © OpenStreetMap</p>
  </div>
}
