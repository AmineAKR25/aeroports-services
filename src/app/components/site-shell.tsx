'use client'

import dynamic from 'next/dynamic'
import Image from 'next/image'
import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties, type FormEvent, type KeyboardEvent } from 'react'
import { categoryLabels, history, locations, partnerGroups, services, stats, type CoverageCategory } from './site-data'

const RealMap = dynamic(() => import('./real-map'), {
  loading: () => <div className="real-map-loading"><span className="map-status-line" />Préparation de la carte</div>,
  ssr: false,
})

type IconName = 'arrow' | 'check' | 'chevron' | 'close' | 'location' | 'mail' | 'menu' | 'pause' | 'phone' | 'play' | 'search'
type QuoteField = 'service' | 'location' | 'dateTime' | 'operation' | 'travelers' | 'reference' | 'urgency' | 'organization' | 'contactName' | 'email' | 'phone' | 'details'
type QuoteForm = Record<QuoteField, string>
type QuoteErrors = Partial<Record<QuoteField, string>>

const initialQuote: QuoteForm = { service: '', location: '', dateTime: '', operation: '', travelers: '', reference: '', urgency: '', organization: '', contactName: '', email: '', phone: '', details: '' }
const navItems = [
  { href: '#services', label: 'Prestations' },
  { href: '#coverage', label: 'Couverture' },
  { href: '#company', label: 'Le groupe' },
  { href: '#partners', label: 'Références' },
  { href: '#contact', label: 'Contact' },
]
const quoteSteps = ['Opération', 'Coordonnées', 'Relecture']
const heroSlides = [
  {
    src: '/assets/redesign/hero-1.webp',
    alt: 'Passagers et agents se déplacent dans un terminal aéroportuaire',
    position: 'center 54%',
    label: 'Accompagnement des passagers',
  },
  {
    src: '/assets/redesign/hero-2.webp',
    alt: 'Avions en approche sur une piste, guidés par une équipe au sol',
    position: 'center 42%',
    label: 'Coordination côté piste',
  },
  {
    src: '/assets/redesign/hero-3.webp',
    alt: 'Avion prêt au départ entouré par les équipes de l’escale',
    position: 'center 43%',
    label: 'Opérations d’escale',
  },
]

function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  const props = {
    'aria-hidden': true,
    fill: 'none',
    height: size,
    stroke: 'currentColor',
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    strokeWidth: 1.8,
    viewBox: '0 0 24 24',
    width: size,
  }
  if (name === 'arrow') return <svg {...props}><path d="M5 12h13M14 7l5 5-5 5" /></svg>
  if (name === 'check') return <svg {...props}><path d="m5 12 4 4L19 6" /></svg>
  if (name === 'chevron') return <svg {...props}><path d="m7 10 5 5 5-5" /></svg>
  if (name === 'close') return <svg {...props}><path d="m6 6 12 12M18 6 6 18" /></svg>
  if (name === 'location') return <svg {...props}><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></svg>
  if (name === 'mail') return <svg {...props}><rect height="14" rx="1" width="18" x="3" y="5" /><path d="m4 7 8 6 8-6" /></svg>
  if (name === 'menu') return <svg {...props}><path d="M4 7h16M4 12h16M4 17h16" /></svg>
  if (name === 'pause') return <svg {...props}><path d="M8 5v14M16 5v14" /></svg>
  if (name === 'play') return <svg {...props}><path d="m8 5 11 7-11 7V5Z" /></svg>
  if (name === 'phone') return <svg {...props}><path d="M7.2 4.5 9.5 4l2 4.5-1.7 1.4a14.7 14.7 0 0 0 4.3 4.3l1.4-1.7 4.5 2-.5 2.3a2 2 0 0 1-2.2 1.6A15.8 15.8 0 0 1 5.6 6.7a2 2 0 0 1 1.6-2.2Z" /></svg>
  return <svg {...props}><circle cx="10.5" cy="10.5" r="6.5" /><path d="m16 16 4 4" /></svg>
}

function SectionIntro({ eyebrow, title, copy, id }: { eyebrow: string; title: string; copy?: string; id: string }) {
  return <div className="section-intro"><p className="eyebrow">{eyebrow}</p><div><h2 id={id}>{title}</h2>{copy ? <p>{copy}</p> : null}</div></div>
}

function FieldError({ field, errors }: { field: QuoteField; errors: QuoteErrors }) {
  return errors[field] ? <p className="field-error" id={`${field}-error`}>{errors[field]}</p> : null
}

function fieldA11y(field: QuoteField, errors: QuoteErrors) {
  return { 'aria-describedby': errors[field] ? `${field}-error` : undefined, 'aria-invalid': errors[field] ? true : undefined }
}

function getCategoryShape(category: CoverageCategory) {
  return <span aria-hidden="true" className={`category-shape category-shape--${category}`} />
}

export default function SiteShell() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [headerScrolled, setHeaderScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('top')
  const [selectedService, setSelectedService] = useState(services[0].id)
  const [serviceDirection, setServiceDirection] = useState<'forward' | 'back'>('forward')
  const [coverageCategory, setCoverageCategory] = useState<CoverageCategory>('airports')
  const [coverageSearch, setCoverageSearch] = useState('')
  const [selectedLocation, setSelectedLocation] = useState(locations[0].id)
  const [highlightedLocation, setHighlightedLocation] = useState<string | null>(null)
  const [mapOpen, setMapOpen] = useState(false)
  const [quoteOpen, setQuoteOpen] = useState(false)
  const [quoteStep, setQuoteStep] = useState(1)
  const [quote, setQuote] = useState<QuoteForm>(initialQuote)
  const [quoteErrors, setQuoteErrors] = useState<QuoteErrors>({})
  const [launcherErrors, setLauncherErrors] = useState<QuoteErrors>({})
  const [handoffPrepared, setHandoffPrepared] = useState(false)
  const [historyProgress, setHistoryProgress] = useState(0)
  const [activeHistoryIndex, setActiveHistoryIndex] = useState(0)
  const [marqueeInView, setMarqueeInView] = useState(false)
  const [marqueePaused, setMarqueePaused] = useState(false)
  const [wideViewport, setWideViewport] = useState(false)
  const [heroIndex, setHeroIndex] = useState(0)
  const [heroPaused, setHeroPaused] = useState(false)
  const [heroManual, setHeroManual] = useState(false)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const mobileNavRef = useRef<HTMLDivElement>(null)
  const quoteDialogRef = useRef<HTMLDialogElement>(null)
  const quoteTriggerRef = useRef<HTMLElement | null>(null)
  const errorSummaryRef = useRef<HTMLDivElement>(null)
  const historySectionRef = useRef<HTMLElement>(null)
  const marqueeRef = useRef<HTMLDivElement>(null)
  const heroMediaRef = useRef<HTMLElement>(null)

  const activeService = services.find((service) => service.id === selectedService) ?? services[0]
  const normalizedSearch = coverageSearch.trim().toLocaleLowerCase('fr')
  const visibleLocations = locations.filter((location) => location.category === coverageCategory && (normalizedSearch.length === 0 || location.name.toLocaleLowerCase('fr').includes(normalizedSearch)))
  const activeLocation = locations.find((location) => location.id === selectedLocation) ?? locations[0]

  const mailtoHref = useMemo(() => {
    const service = services.find((item) => item.id === quote.service)?.title || 'Prestation à préciser'
    const body = ['Bonjour Aéroports Services,', '', 'Je souhaite demander un devis avec les informations suivantes :', '', `Prestation : ${service}`, `Lieu : ${quote.location || 'À préciser'}`, `Date et heure locale : ${quote.dateTime ? new Date(quote.dateTime).toLocaleString('fr-FR') : 'À préciser'}`, `Contexte : ${quote.operation || 'À préciser'}`, `Passagers / groupe : ${quote.travelers || 'À préciser'}`, `Vol ou train : ${quote.reference || 'Non renseigné'}`, `Urgence : ${quote.urgency || 'À préciser'}`, '', `Organisation : ${quote.organization || 'À préciser'}`, `Contact : ${quote.contactName || 'À préciser'}`, `E-mail : ${quote.email || 'À préciser'}`, `Téléphone : ${quote.phone || 'À préciser'}`, '', 'Précisions opérationnelles :', quote.details || 'Aucune précision complémentaire.', '', 'Merci de me confirmer la prise en compte et les prochaines étapes.'].join('\n')
    const subject = `Demande de devis — ${service} — ${quote.location || 'lieu à préciser'}`
    return `mailto:resaparis@aeroports-services.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }, [quote])
  const urgentRequest = quote.urgency === 'Moins de 24 h'

  useEffect(() => {
    const updateHeader = () => setHeaderScrolled(window.scrollY > 18)
    updateHeader()
    window.addEventListener('scroll', updateHeader, { passive: true })
    return () => window.removeEventListener('scroll', updateHeader)
  }, [])

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>('[data-section]'))
    if (sections.length === 0) return
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
      if (visible?.target instanceof HTMLElement) setActiveSection(visible.target.dataset.section || 'top')
    }, { rootMargin: '-24% 0px -62% 0px', threshold: [0.1, 0.3, 0.6] })
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!menuOpen) return
    document.body.classList.add('menu-is-open')
    const firstFocusable = mobileNavRef.current?.querySelector<HTMLElement>('a, button')
    window.requestAnimationFrame(() => firstFocusable?.focus())
    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false)
        window.requestAnimationFrame(() => menuButtonRef.current?.focus())
        return
      }
      if (event.key !== 'Tab' || !mobileNavRef.current) return
      const focusable = Array.from(mobileNavRef.current.querySelectorAll<HTMLElement>('a, button')).filter((element) => !element.hasAttribute('disabled'))
      if (focusable.length === 0) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus() }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus() }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => { document.body.classList.remove('menu-is-open'); window.removeEventListener('keydown', onKeyDown) }
  }, [menuOpen])

  useEffect(() => {
    const dialog = quoteDialogRef.current
    if (!dialog) return
    if (quoteOpen && !dialog.open) { dialog.showModal(); document.body.classList.add('quote-is-open') }
    if (!quoteOpen && dialog.open) dialog.close()
    if (!quoteOpen) { document.body.classList.remove('quote-is-open'); window.requestAnimationFrame(() => quoteTriggerRef.current?.focus()) }
    return () => document.body.classList.remove('quote-is-open')
  }, [quoteOpen])

  useEffect(() => {
    const section = historySectionRef.current
    if (!section) return
    let frame = 0
    const updateProgress = () => {
      const rect = section.getBoundingClientRect()
      const start = window.innerHeight * 0.72
      const end = -rect.height * 0.2
      const progress = Math.max(0, Math.min(1, (start - rect.top) / (start - end)))
      setHistoryProgress(progress)
      setActiveHistoryIndex(Math.min(history.length - 1, Math.floor(progress * history.length)))
    }
    const onScroll = () => { window.cancelAnimationFrame(frame); frame = window.requestAnimationFrame(updateProgress) }
    updateProgress()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => { window.cancelAnimationFrame(frame); window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll) }
  }, [])

  useEffect(() => {
    const node = marqueeRef.current
    if (!node) return
    const observer = new IntersectionObserver(([entry]) => setMarqueeInView(entry.isIntersecting), { threshold: 0.1 })
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 800px)')
    const updateViewport = () => setWideViewport(mediaQuery.matches)
    updateViewport()
    mediaQuery.addEventListener('change', updateViewport)
    return () => mediaQuery.removeEventListener('change', updateViewport)
  }, [])

  useEffect(() => {
    if (heroManual || heroPaused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const rotateHero = () => {
      if (!document.hidden) setHeroIndex((current) => (current + 1) % heroSlides.length)
    }
    const interval = window.setInterval(rotateHero, 6000)
    return () => window.clearInterval(interval)
  }, [heroManual, heroPaused])

  const setQuoteField = useCallback((field: QuoteField, value: string) => {
    setQuote((current) => ({ ...current, [field]: value }))
    setQuoteErrors((current) => ({ ...current, [field]: undefined }))
    setLauncherErrors((current) => ({ ...current, [field]: undefined }))
    setHandoffPrepared(false)
  }, [])

  const openQuote = useCallback((serviceId?: string) => {
    quoteTriggerRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null
    if (serviceId) setQuoteField('service', serviceId)
    setQuoteStep(1)
    setQuoteErrors({})
    setHandoffPrepared(false)
    setQuoteOpen(true)
  }, [setQuoteField])

  function validateStep(step: number) {
    const errors: QuoteErrors = {}
    if (step === 1) {
      if (!quote.service) errors.service = 'Choisissez une prestation.'
      if (!quote.location) errors.location = 'Choisissez un aéroport ou une gare.'
      if (!quote.dateTime) errors.dateTime = 'Indiquez la date et l’heure locale.'
      else if (new Date(quote.dateTime).getTime() < Date.now() - 300_000) errors.dateTime = 'La date de l’opération doit être à venir.'
      if (!quote.operation) errors.operation = 'Précisez le contexte du passage.'
      if (!quote.travelers.trim()) errors.travelers = 'Indiquez le nombre de passagers ou la composition du groupe.'
      if (!quote.urgency) errors.urgency = 'Précisez le délai de la demande.'
    }
    if (step === 2) {
      if (!quote.organization.trim()) errors.organization = 'Indiquez votre organisation.'
      if (!quote.contactName.trim()) errors.contactName = 'Indiquez le nom du contact.'
      if (!quote.email.trim()) errors.email = 'Indiquez une adresse e-mail.'
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(quote.email)) errors.email = 'Saisissez une adresse e-mail valide.'
      if (!quote.phone.trim()) errors.phone = 'Indiquez un numéro de téléphone.'
    }
    return errors
  }

  function moveToStep(nextStep: number) {
    if (nextStep > quoteStep) {
      const errors = validateStep(quoteStep)
      if (Object.keys(errors).length > 0) { setQuoteErrors(errors); window.requestAnimationFrame(() => errorSummaryRef.current?.focus()); return }
    }
    setQuoteErrors({})
    setQuoteStep(nextStep)
    window.requestAnimationFrame(() => quoteDialogRef.current?.querySelector<HTMLElement>('.quote-step-title')?.focus())
  }

  function startFromHero(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const errors: QuoteErrors = {}
    if (!quote.service) errors.service = 'Choisissez une prestation.'
    if (!quote.location) errors.location = 'Choisissez un lieu.'
    if (!quote.dateTime) errors.dateTime = 'Indiquez la date et l’heure.'
    setLauncherErrors(errors)
    if (Object.keys(errors).length > 0) { document.getElementById(`launcher-${Object.keys(errors)[0]}`)?.focus(); return }
    openQuote()
  }

  function selectHeroSlide(nextIndex: number) {
    setHeroIndex((nextIndex + heroSlides.length) % heroSlides.length)
    setHeroManual(true)
  }

  function moveHeroSlide(direction: -1 | 1) {
    selectHeroSlide(heroIndex + direction)
  }

  function toggleHeroRotation() {
    if (heroManual || heroPaused) {
      setHeroManual(false)
      setHeroPaused(false)
      return
    }
    setHeroPaused(true)
  }

  function changeService(id: string) {
    const nextIndex = services.findIndex((service) => service.id === id)
    const currentIndex = services.findIndex((service) => service.id === selectedService)
    setServiceDirection(nextIndex >= currentIndex ? 'forward' : 'back')
    setSelectedService(id)
  }

  function handleServiceKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    if (!['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) return
    event.preventDefault()
    let nextIndex = index
    if (event.key === 'ArrowDown') nextIndex = (index + 1) % services.length
    if (event.key === 'ArrowUp') nextIndex = (index - 1 + services.length) % services.length
    if (event.key === 'Home') nextIndex = 0
    if (event.key === 'End') nextIndex = services.length - 1
    changeService(services[nextIndex].id)
    document.getElementById(`service-tab-${services[nextIndex].id}`)?.focus()
  }

  const chooseLocation = useCallback((id: string) => {
    const location = locations.find((item) => item.id === id)
    if (!location) return
    setSelectedLocation(id)
    setCoverageCategory(location.category)
    setHighlightedLocation(id)
  }, [])

  const chooseCategory = useCallback((category: CoverageCategory) => {
    const firstLocation = locations.find((location) => location.category === category)
    setCoverageCategory(category)
    setCoverageSearch('')
    if (firstLocation) {
      setSelectedLocation(firstLocation.id)
      setHighlightedLocation(firstLocation.id)
    }
  }, [])

  const marqueeTrack = partnerGroups.flatMap((group) => group.logos)
  const historyProgressStyle = { '--history-progress': `${historyProgress * 100}%` } as CSSProperties

  return <>
    <a className="skip-link" href="#main-content">Aller au contenu</a>
    <header className={`site-header${headerScrolled ? ' is-scrolled' : ''}`}>
      <div className="shell header-row">
        <a aria-label="Aéroports Services — accueil" className="brand" href="#top" onClick={() => setMenuOpen(false)}><Image alt="Aéroports Services" height={72} priority src="/assets/logo-aeroports-sevices.png" width={184} /></a>
        <nav aria-label="Navigation principale" className="desktop-nav">{navItems.map((item) => <a aria-current={activeSection === item.href.slice(1) ? 'location' : undefined} className={activeSection === item.href.slice(1) ? 'is-active' : ''} href={item.href} key={item.href}>{item.label}</a>)}</nav>
        <div className="header-actions">
          <a className="ops-link" href="tel:+33660475916"><span className="availability-mark" /><span className="ops-link-copy"><small>OPS · 24h/24 · 7j/7</small><strong>+33 (6) 60 47 59 16</strong></span><Icon name="phone" size={18} /></a>
          <button className="button button--compact header-quote" onClick={() => openQuote()} type="button">Demander un devis <Icon name="arrow" size={17} /></button>
          <button aria-controls="mobile-navigation" aria-expanded={menuOpen} className="menu-button" onClick={() => setMenuOpen((current) => !current)} ref={menuButtonRef} type="button"><span>{menuOpen ? 'Fermer' : 'Menu'}</span><Icon name={menuOpen ? 'close' : 'menu'} size={20} /></button>
        </div>
      </div>
      <div className={`mobile-navigation${menuOpen ? ' is-open' : ''}`} id="mobile-navigation" ref={mobileNavRef}>
        <nav aria-label="Navigation mobile" className="shell mobile-nav">
          {navItems.map((item) => <a aria-current={activeSection === item.href.slice(1) ? 'page' : undefined} href={item.href} key={item.href} onClick={() => setMenuOpen(false)}>{item.label}<Icon name="arrow" size={18} /></a>)}
          <div className="mobile-nav-actions"><a className="button button--secondary" href="tel:+33660475916"><Icon name="phone" size={18} /> Appeler OPS</a><button className="button" onClick={() => { setMenuOpen(false); openQuote() }} type="button">Demander un devis <Icon name="arrow" size={18} /></button></div>
        </nav>
      </div>
    </header>

    <main id="main-content">
      <section aria-labelledby="hero-title" className="hero" data-section="top" id="top">
        <div className="shell hero-grid">
          <div className="hero-copy">
            <p className="eyebrow eyebrow--accent"><span className="signal-bar" />Aéroports Services</p>
            <h1 id="hero-title">Premier réseau français d’assistance <em>aux passagers.</em></h1>
            <p className="hero-lead">Partout en France, le service est notre métier. Chaque jour, chaque nuit.</p>
            <div className="hero-proof">
              <div><span className="proof-mark">DGAC</span><span><strong>Autorisé pour l’assistance en escale</strong><small>Autorisations nationales</small></span></div>
              <div><span className="availability-mark availability-mark--large" /><span><strong>Disponible 24h/24 · 7j/7</strong><small>Toute l’année</small></span></div>
            </div>
            <a className="urgent-call" href="tel:+33660475916"><Icon name="phone" size={19} /><span><small>Besoin opérationnel urgent</small><strong>Appeler OPS · +33 (6) 60 47 59 16</strong></span><Icon name="arrow" size={18} /></a>
          </div>
          <figure className="hero-media" onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setHeroPaused(false) }} onFocus={() => setHeroPaused(true)} onMouseEnter={() => setHeroPaused(true)} onMouseLeave={() => setHeroPaused(false)} ref={heroMediaRef}>
            <div aria-live="polite" className="hero-slides">
              {heroSlides.map((slide, index) => <div aria-hidden={heroIndex !== index} className={`hero-slide${heroIndex === index ? ' is-active' : ''}`} id={`hero-slide-${index + 1}`} key={slide.src}><Image alt={heroIndex === index ? slide.alt : ''} fill loading={index === 0 ? undefined : 'lazy'} priority={index === 0} sizes="(max-width: 799px) 100vw, 52vw" src={slide.src} style={{ objectPosition: slide.position }} /></div>)}
            </div>
            <figcaption><span>{heroSlides[heroIndex].label}</span><strong>Une équipe qui accompagne chaque passage avec précision.</strong></figcaption>
            <div aria-label="Contrôles des images du message d’accueil" className="hero-media-controls">
              <button aria-label="Image précédente" onClick={() => moveHeroSlide(-1)} type="button"><Icon name="arrow" size={17} /></button>
              <div aria-label="Choisir une image" className="hero-slide-picker" role="group">{heroSlides.map((slide, index) => <button aria-label={`Afficher l’image ${index + 1} — ${slide.label}`} aria-pressed={heroIndex === index} className={heroIndex === index ? 'is-active' : ''} key={slide.src} onClick={() => selectHeroSlide(index)} type="button"><span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span></button>)}</div>
              <button aria-label={heroManual || heroPaused ? 'Reprendre la rotation des images' : 'Mettre la rotation des images en pause'} aria-pressed={heroManual || heroPaused} onClick={toggleHeroRotation} type="button"><Icon name={heroManual || heroPaused ? 'play' : 'pause'} size={16} /></button>
              <button aria-label="Image suivante" onClick={() => moveHeroSlide(1)} type="button"><Icon name="arrow" size={17} /></button>
            </div>
          </figure>
          <form className="quote-launcher" noValidate onSubmit={startFromHero}>
            <div className="launcher-heading"><span>Préparer une opération</span><strong>Commencer la demande</strong><p>Trois repères pour orienter rapidement votre demande.</p></div>
            <label><span>Prestation</span><select id="launcher-service" value={quote.service} onChange={(event) => setQuoteField('service', event.target.value)} {...fieldA11y('service', launcherErrors)}><option value="">Choisir</option>{services.map((service) => <option key={service.id} value={service.id}>{service.shortTitle}</option>)}</select><FieldError errors={launcherErrors} field="service" /></label>
            <label><span>Aéroport ou gare</span><select id="launcher-location" value={quote.location} onChange={(event) => setQuoteField('location', event.target.value)} {...fieldA11y('location', launcherErrors)}><option value="">Choisir</option>{Object.entries(categoryLabels).map(([category, label]) => <optgroup key={category} label={label}>{locations.filter((location) => location.category === category).map((location) => <option key={location.id} value={location.name}>{location.name}</option>)}</optgroup>)}</select><FieldError errors={launcherErrors} field="location" /></label>
            <label><span>Date et heure locale</span><input id="launcher-dateTime" type="datetime-local" value={quote.dateTime} onChange={(event) => setQuoteField('dateTime', event.target.value)} {...fieldA11y('dateTime', launcherErrors)} /><FieldError errors={launcherErrors} field="dateTime" /></label>
            <button className="button launcher-submit" type="submit">Continuer <Icon name="arrow" size={18} /></button>
          </form>
        </div>
      </section>

      <section aria-labelledby="readiness-title" className="readiness-section" data-section="readiness" id="readiness"><div className="shell">
        <div className="readiness-heading"><p className="eyebrow">Repères opérationnels</p><h2 id="readiness-title">Des preuves utiles avant d’engager le passage.</h2></div>
        <div className="readiness-rail"><article><span>Autorisation</span><strong>DGAC</strong><p>Assistances en escale nationales, en complément des autorisations des gestionnaires d’aéroports.</p></article><article><span>Disponibilité</span><strong>24h/24<br />7j/7</strong><p>Une ligne OPS dédiée pour les demandes opérationnelles.</p></article><article><span>Chaîne de service</span><strong>Amont → aval</strong><p>Commande, planning, contrôle des vols, SAV, suivi commercial et facturation.</p></article></div>
        <div className="published-stats"><p>Chiffres publiés par Aéroports Services sur son site historique.</p><div>{stats.map((stat) => <article key={stat.label}><strong>{stat.value}</strong><span>{stat.label}</span></article>)}</div></div>
      </div></section>

      <section aria-labelledby="services-title" className="section services-section" data-section="services" id="services"><div className="shell"><SectionIntro copy="Quatre familles de services issues du métier historique d’Aéroports Services. Sélectionnez un besoin pour vérifier son périmètre." eyebrow="Prestations" id="services-title" title="Le bon dispositif pour chaque passage." />
        <div className="service-desktop"><div aria-label="Familles de prestations" className="service-tabs" role="tablist">{services.map((service, index) => <button aria-controls={`service-panel-${service.id}`} aria-selected={selectedService === service.id} className={selectedService === service.id ? 'is-selected' : ''} id={`service-tab-${service.id}`} key={service.id} onClick={() => changeService(service.id)} onKeyDown={(event) => handleServiceKeyDown(event, index)} role="tab" tabIndex={selectedService === service.id ? 0 : -1} type="button"><strong>{service.title}</strong><Icon name="arrow" size={18} /></button>)}</div>
          <article aria-labelledby={`service-tab-${activeService.id}`} className={`service-panel service-panel--${serviceDirection}`} id={`service-panel-${activeService.id}`} key={`${activeService.id}-${serviceDirection}`} role="tabpanel"><div className="service-panel-copy"><p className="service-audience">Pour qui · {activeService.audience}</p><h3>{activeService.title}</h3><p>{activeService.scope}</p><ul>{activeService.deliverables.map((item) => <li key={item}><Icon name="check" size={17} />{item}</li>)}</ul><button className="text-button" onClick={() => openQuote(activeService.id)} type="button">Demander cette prestation <Icon name="arrow" size={18} /></button></div><div className="service-panel-media"><Image alt={activeService.imageAlt} fill sizes="40vw" src={activeService.image} style={{ objectPosition: activeService.imagePosition }} /><span>Repère terrain</span></div></article>
        </div>
        <div className="service-mobile">{services.map((service) => { const expanded = selectedService === service.id; return <article className={expanded ? 'is-expanded' : ''} key={service.id}><h3><button aria-expanded={expanded} aria-controls={`service-accordion-${service.id}`} onClick={() => changeService(service.id)} type="button"><strong>{service.title}</strong><Icon name="chevron" size={19} /></button></h3><div className="service-accordion-panel" id={`service-accordion-${service.id}`}><div><div className="service-mobile-media"><Image alt={service.imageAlt} fill sizes="(max-width: 799px) 100vw" src={service.image} style={{ objectPosition: service.imagePosition }} /></div><p className="service-audience">Pour qui · {service.audience}</p><p>{service.scope}</p><ul>{service.deliverables.map((item) => <li key={item}><Icon name="check" size={17} />{item}</li>)}</ul><button className="text-button" onClick={() => openQuote(service.id)} type="button">Demander cette prestation <Icon name="arrow" size={18} /></button></div></div></article> })}</div>
      </div></section>

      <section aria-labelledby="coverage-title" className="section coverage-section" data-section="coverage" id="coverage"><div className="shell"><SectionIntro copy="Recherchez les implantations publiées. La carte apporte le contexte géographique ; le répertoire reste la référence complète et accessible." eyebrow="Implantations publiées" id="coverage-title" title="Un réseau national, lieu par lieu." />
        <div className="coverage-explorer"><div className="coverage-directory"><label className="coverage-search"><span>Rechercher un lieu</span><span className="search-control"><Icon name="search" size={19} /><input aria-label="Rechercher un lieu" type="search" value={coverageSearch} onChange={(event) => setCoverageSearch(event.target.value)} placeholder="Ex. Orly, Gare de Lyon…" /></span></label>
          <div aria-label="Filtrer par catégorie" className="category-tabs">{(Object.keys(categoryLabels) as CoverageCategory[]).map((category) => <button aria-pressed={coverageCategory === category} className={coverageCategory === category ? 'is-active' : ''} key={category} onClick={() => chooseCategory(category)} type="button">{getCategoryShape(category)}<span>{categoryLabels[category]}</span><strong>{locations.filter((location) => location.category === category).length}</strong></button>)}</div>
          <div aria-live="polite" className="location-results"><div className="results-meta"><span>{visibleLocations.length} lieux</span><span>{categoryLabels[coverageCategory]}</span></div><div className="location-list">{visibleLocations.length > 0 ? visibleLocations.map((location) => <button aria-current={selectedLocation === location.id ? 'true' : undefined} className={selectedLocation === location.id ? 'is-selected' : ''} id={`location-${location.id}`} key={location.id} onBlur={() => setHighlightedLocation(null)} onClick={() => chooseLocation(location.id)} onFocus={() => setHighlightedLocation(location.id)} onMouseEnter={() => setHighlightedLocation(location.id)} onMouseLeave={() => setHighlightedLocation(null)} type="button">{getCategoryShape(location.category)}<span>{location.name}</span><Icon name="location" size={17} /></button>) : <p className="empty-results">Aucun lieu ne correspond à cette recherche dans la catégorie sélectionnée.</p>}</div></div>
          <button aria-expanded={mapOpen} className="map-toggle" onClick={() => setMapOpen((current) => !current)} type="button">{mapOpen ? 'Masquer la carte' : 'Afficher la carte'} <Icon name="chevron" size={18} /></button>
        </div><div className={`network-map${mapOpen ? ' is-open' : ''}`}><div className="map-toolbar"><div><span>Vue géographique</span><strong>{categoryLabels[coverageCategory]}</strong></div><div className="map-active"><span className={`category-shape category-shape--${activeLocation.category}`} /><span><small>Sélection</small><strong>{activeLocation.name}</strong></span></div></div>{wideViewport || mapOpen ? <RealMap highlightedLocationId={highlightedLocation} locations={locations} onHighlightLocation={setHighlightedLocation} onSelectLocation={chooseLocation} selectedLocationId={selectedLocation} /> : null}<p className="map-note">Les repères sont provisoires et doivent être validés par l’équipe d’exploitation avant mise en production.</p></div></div>
      </div></section>

      <section aria-labelledby="company-title" className="company-section" data-section="company" id="company"><div className="company-media"><Image alt="Passagers et agents dans un terminal sous la signalétique des départs et arrivées" fill sizes="(max-width: 899px) 100vw, 50vw" src="/assets/photoas11.jpg" /><p><span>Culture de service</span> Personnel expérimenté et multilingue</p></div><div className="company-content"><p className="eyebrow eyebrow--light">Une organisation humaine</p><h2 id="company-title">Le personnel est notre première richesse.</h2><p>Des agents de terrain expérimentés, des responsables opérationnels par zone géographique, une équipe commerciale, un service comptabilité et un service de courses sur Paris et Lyon.</p><div className="process-flow" aria-label="Chaîne de traitement opérationnelle"><div><span>Amont</span><strong>Commande · planning · ramassage · contrôle des vols</strong></div><Icon name="arrow" size={22} /><div><span>Temps réel</span><strong>Comptoir · back office · information aéroports</strong></div><Icon name="arrow" size={22} /><div><span>Aval</span><strong>SAV · suivi commercial · facturation</strong></div></div><p className="company-note"><span className="signal-bar signal-bar--light" />Lien informatique permanent avec les clients, traitement de l’information entrante et sortante en temps réel.</p></div></section>

      <section aria-labelledby="history-title" className="section history-section" data-section="history" id="history" ref={historySectionRef}><div className="shell history-layout"><div className="history-heading"><p className="eyebrow">Histoire du groupe</p><h2 id="history-title">Des savoir-faire réunis depuis 1991.</h2><p>Le groupe Aéroports Services naît en 2006 de l’association d’entreprises et du rachat d’Assist Concep et de Bienvenue Airport Services.</p><div className="history-readout"><strong>{history[activeHistoryIndex].year}</strong><span>progression de la chronologie</span></div></div><div className="history-stream-wrap"><div aria-hidden="true" className="history-track"><span style={historyProgressStyle} /></div><ol className="history-timeline">{history.map((item, index) => <li className={activeHistoryIndex === index ? 'is-current' : ''} key={item.year}><span className="history-node" /><time>{item.year}</time><div><strong>{item.title}</strong><p>{item.text}</p></div></li>)}</ol></div></div></section>

      <section aria-labelledby="partners-title" className="section partners-section" data-section="partners" id="partners"><div className="shell"><SectionIntro copy="Marques et références publiées dans les contenus historiques d’Aéroports Services." eyebrow="Clients & partenaires" id="partners-title" title="Une expérience construite avec les acteurs du voyage." /><div aria-label="Clients et partenaires publiés" className={`partner-marquee${marqueeInView && !marqueePaused ? ' is-running' : ''}`} onBlur={() => setMarqueePaused(false)} onFocus={() => setMarqueePaused(true)} onMouseEnter={() => setMarqueePaused(true)} onMouseLeave={() => setMarqueePaused(false)} ref={marqueeRef} tabIndex={0}><div className="partner-track">{marqueeTrack.map((logo) => <figure key={`primary-${logo.name}`}><Image alt={logo.name} height={100} sizes="(max-width: 720px) 32vw, 170px" src={logo.src} width={220} /></figure>)}{marqueeTrack.map((logo) => <figure aria-hidden="true" key={`loop-${logo.name}`}><Image alt="" height={100} sizes="(max-width: 720px) 32vw, 170px" src={logo.src} width={220} /></figure>)}</div></div><p className="partner-note">Les logos sont reproduits depuis les références archivées. Leur présence historique ne vaut pas recommandation actuelle.</p></div></section>

      <section aria-labelledby="contact-title" className="contact-section" data-section="contact" id="contact"><div className="shell contact-layout"><div className="contact-lead"><p className="eyebrow eyebrow--light">Préparer la prochaine opération</p><h2 id="contact-title">Un besoin identifié ? Transmettez le contexte utile dès maintenant.</h2><p>La demande de devis prépare un e-mail complet pour l’équipe Aéroports Services. L’envoi reste sous votre contrôle dans votre messagerie.</p><button className="button button--light" onClick={() => openQuote()} type="button">Commencer la demande <Icon name="arrow" size={18} /></button></div><address className="contact-details"><div><Icon name="phone" size={20} /><span><small>OPS · 24h/24 · 7j/7</small><a href="tel:+33660475916">+33 (6) 60 47 59 16</a></span></div><div><Icon name="phone" size={20} /><span><small>Téléphone</small><a href="tel:+33181871702">+33 (0) 1 81 87 17 02</a></span></div><div><Icon name="mail" size={20} /><span><small>E-mail réservation</small><a href="mailto:resaparis@aeroports-services.com">resaparis@aeroports-services.com</a></span></div><div><Icon name="location" size={20} /><span><small>Siège social</small><a href="https://maps.google.com/?q=2+Rue+Emile+Raspail+91380+Chilly-Mazarin" rel="noreferrer" target="_blank">2 Rue Emile Raspail<br />91380 Chilly-Mazarin</a></span></div></address></div><div className="shell urgent-rule"><strong>Demande à moins de 24 heures</strong><p>Conformément aux conditions publiées, contactez OPS par téléphone avant confirmation par e-mail ou fax.</p><a href="tel:+33660475916">Appeler OPS <Icon name="arrow" size={17} /></a></div></section>
    </main>

    <footer className="site-footer"><div className="shell footer-main"><div className="footer-brand"><div className="footer-logo-plate"><Image alt="Aéroports Services" height={72} src="/assets/logo-aeroports-sevices.png" width={184} /></div><p>Chaque jour, chaque nuit,<br />partout en France.</p></div><div className="footer-links"><span>Navigation</span>{navItems.map((item) => <a href={item.href} key={item.href}>{item.label}</a>)}</div><div className="footer-links"><span>Contact direct</span><a href="tel:+33660475916">OPS · +33 (6) 60 47 59 16</a><a href="mailto:resaparis@aeroports-services.com">resaparis@aeroports-services.com</a><button onClick={() => openQuote()} type="button">Demander un devis</button></div><div className="footer-links"><span>Informations</span><a href="https://aeroports-services.fr/condition-generale/" rel="noreferrer" target="_blank">Conditions générales</a><a href="https://www.linkedin.com/company-beta/2825395/" rel="noreferrer" target="_blank">LinkedIn</a><span>Fax · +33 (0)1 75 83 43 14</span></div></div><div className="shell footer-bottom"><span>© Aéroports Services</span><span>Réseau français de représentation et d’assistances aéroportuaires</span><span>Document de travail V3</span></div></footer>

    <div className="mobile-sticky-actions" aria-label="Actions rapides"><a href="tel:+33660475916"><Icon name="phone" size={18} /><span>Appeler OPS</span></a><button onClick={() => openQuote()} type="button"><span>Demander un devis</span><Icon name="arrow" size={18} /></button></div>

    <dialog aria-labelledby="quote-title" className="quote-dialog" onCancel={() => setQuoteOpen(false)} onClose={() => setQuoteOpen(false)} ref={quoteDialogRef}><div className="quote-workspace">
      <header className="quote-header"><div><p>Aéroports Services</p><strong id="quote-title">Demande opérationnelle</strong></div><button aria-label="Fermer la demande" className="icon-button" onClick={() => setQuoteOpen(false)} type="button"><Icon name="close" size={22} /></button></header>
      <div aria-label={`Étape ${quoteStep} sur 3`} className="quote-progress">{quoteSteps.map((label, index) => { const step = index + 1; return <div className={step === quoteStep ? 'is-active' : step < quoteStep ? 'is-complete' : ''} key={label}><span>{step < quoteStep ? <Icon name="check" size={14} /> : step}</span><small>{label}</small></div> })}</div>
      <form className="quote-form" noValidate onSubmit={(event) => event.preventDefault()}>
        {Object.keys(quoteErrors).length > 0 ? <div className="error-summary" ref={errorSummaryRef} role="alert" tabIndex={-1}><strong>Vérifiez les informations signalées.</strong><ul>{Object.entries(quoteErrors).map(([field, error]) => <li key={field}><a href={`#quote-${field}`} onClick={() => document.getElementById(`quote-${field}`)?.focus()}>{error}</a></li>)}</ul></div> : null}
        {quoteStep === 1 ? <section aria-labelledby="quote-step-1"><div className="quote-step-heading"><span>Étape 1</span><div><h2 className="quote-step-title" id="quote-step-1" tabIndex={-1}>Contexte de l’opération</h2><p>Les éléments indispensables pour orienter la demande vers la bonne équipe.</p></div></div><div className="form-grid">
          <label><span>Prestation *</span><select id="quote-service" value={quote.service} onChange={(event) => setQuoteField('service', event.target.value)} {...fieldA11y('service', quoteErrors)}><option value="">Choisir</option>{services.map((service) => <option key={service.id} value={service.id}>{service.title}</option>)}</select><FieldError errors={quoteErrors} field="service" /></label>
          <label><span>Aéroport ou gare *</span><select id="quote-location" value={quote.location} onChange={(event) => setQuoteField('location', event.target.value)} {...fieldA11y('location', quoteErrors)}><option value="">Choisir</option>{Object.entries(categoryLabels).map(([category, label]) => <optgroup key={category} label={label}>{locations.filter((location) => location.category === category).map((location) => <option key={location.id} value={location.name}>{location.name}</option>)}</optgroup>)}</select><FieldError errors={quoteErrors} field="location" /></label>
          <label><span>Date et heure locale *</span><input id="quote-dateTime" type="datetime-local" value={quote.dateTime} onChange={(event) => setQuoteField('dateTime', event.target.value)} {...fieldA11y('dateTime', quoteErrors)} /><FieldError errors={quoteErrors} field="dateTime" /></label>
          <label><span>Contexte *</span><select id="quote-operation" value={quote.operation} onChange={(event) => setQuoteField('operation', event.target.value)} {...fieldA11y('operation', quoteErrors)}><option value="">Choisir</option><option>Départ</option><option>Arrivée</option><option>Transit</option><option>Représentation / escale</option><option>Autre contexte</option></select><FieldError errors={quoteErrors} field="operation" /></label>
          <label><span>Passagers ou groupe *</span><input id="quote-travelers" inputMode="numeric" placeholder="Ex. 24 passagers, dont 2 PMR" value={quote.travelers} onChange={(event) => setQuoteField('travelers', event.target.value)} {...fieldA11y('travelers', quoteErrors)} /><FieldError errors={quoteErrors} field="travelers" /></label>
          <label><span>Référence vol ou train</span><input id="quote-reference" placeholder="Ex. AF1234" value={quote.reference} onChange={(event) => setQuoteField('reference', event.target.value)} /></label>
          <label className="form-wide"><span>Délai de la demande *</span><select id="quote-urgency" value={quote.urgency} onChange={(event) => setQuoteField('urgency', event.target.value)} {...fieldA11y('urgency', quoteErrors)}><option value="">Choisir</option><option>Moins de 24 h</option><option>24 à 72 h</option><option>Plus de 72 h</option></select><FieldError errors={quoteErrors} field="urgency" /></label>
        </div>{urgentRequest ? <div className="urgent-notice" role="status"><Icon name="phone" size={20} /><div><strong>Cette demande est urgente.</strong><p>Appelez OPS au <a href="tel:+33660475916">+33 (6) 60 47 59 16</a> avant la confirmation par e-mail.</p></div></div> : null}</section> : null}
        {quoteStep === 2 ? <section aria-labelledby="quote-step-2"><div className="quote-step-heading"><span>Étape 2</span><div><h2 className="quote-step-title" id="quote-step-2" tabIndex={-1}>Coordonnées du demandeur</h2><p>Ces informations permettent à l’équipe de reprendre rapidement le contexte.</p></div></div><div className="form-grid">
          <label className="form-wide"><span>Organisation *</span><input autoComplete="organization" id="quote-organization" value={quote.organization} onChange={(event) => setQuoteField('organization', event.target.value)} {...fieldA11y('organization', quoteErrors)} /><FieldError errors={quoteErrors} field="organization" /></label>
          <label><span>Nom du contact *</span><input autoComplete="name" id="quote-contactName" value={quote.contactName} onChange={(event) => setQuoteField('contactName', event.target.value)} {...fieldA11y('contactName', quoteErrors)} /><FieldError errors={quoteErrors} field="contactName" /></label>
          <label><span>E-mail *</span><input autoComplete="email" id="quote-email" type="email" value={quote.email} onChange={(event) => setQuoteField('email', event.target.value)} {...fieldA11y('email', quoteErrors)} /><FieldError errors={quoteErrors} field="email" /></label>
          <label className="form-wide"><span>Téléphone *</span><input autoComplete="tel" id="quote-phone" type="tel" value={quote.phone} onChange={(event) => setQuoteField('phone', event.target.value)} {...fieldA11y('phone', quoteErrors)} /><FieldError errors={quoteErrors} field="phone" /></label>
          <label className="form-wide"><span>Précisions opérationnelles</span><textarea id="quote-details" rows={5} placeholder="Horaires, point de rendez-vous, bagages, besoins particuliers…" value={quote.details} onChange={(event) => setQuoteField('details', event.target.value)} /></label>
        </div></section> : null}
        {quoteStep === 3 ? <section aria-labelledby="quote-step-3"><div className="quote-step-heading"><span>Étape 3</span><div><h2 className="quote-step-title" id="quote-step-3" tabIndex={-1}>Relire et préparer l’e-mail</h2><p>Aucune demande n’est envoyée automatiquement depuis ce prototype.</p></div></div><div className="quote-review"><article><span>Opération</span><dl><div><dt>Prestation</dt><dd>{services.find((service) => service.id === quote.service)?.title || 'À préciser'}</dd></div><div><dt>Lieu</dt><dd>{quote.location || 'À préciser'}</dd></div><div><dt>Date locale</dt><dd>{quote.dateTime ? new Date(quote.dateTime).toLocaleString('fr-FR') : 'À préciser'}</dd></div><div><dt>Contexte</dt><dd>{quote.operation || 'À préciser'}</dd></div><div><dt>Passagers</dt><dd>{quote.travelers || 'À préciser'}</dd></div><div><dt>Référence</dt><dd>{quote.reference || 'Non renseignée'}</dd></div></dl></article><article><span>Demandeur</span><dl><div><dt>Organisation</dt><dd>{quote.organization || 'À préciser'}</dd></div><div><dt>Contact</dt><dd>{quote.contactName || 'À préciser'}</dd></div><div><dt>E-mail</dt><dd>{quote.email || 'À préciser'}</dd></div><div><dt>Téléphone</dt><dd>{quote.phone || 'À préciser'}</dd></div></dl></article></div>
          {urgentRequest ? <div className="urgent-notice" role="status"><Icon name="phone" size={20} /><div><strong>Escalade OPS requise pour une demande à moins de 24 heures.</strong><p><a href="tel:+33660475916">Appeler +33 (6) 60 47 59 16</a> avant l’envoi de l’e-mail.</p></div></div> : null}
          <div className={`handoff-panel${handoffPrepared ? ' is-prepared' : ''}`}><Icon name="mail" size={24} /><div><strong>{handoffPrepared ? 'Le brouillon est prêt à être ouvert.' : 'Dernière étape : ouvrir votre messagerie.'}</strong><p>Un e-mail complet sera prérempli pour resaparis@aeroports-services.com. L’envoi n’est pas automatique et ne vaut pas confirmation opérationnelle.</p></div><a className="button" href={mailtoHref} onClick={() => setHandoffPrepared(true)}>Ouvrir ma messagerie <Icon name="arrow" size={18} /></a></div>
        </section> : null}
      </form>
      <footer className="quote-footer"><div><small>Étape {quoteStep} sur 3</small><strong>{quoteSteps[quoteStep - 1]}</strong></div><div>{quoteStep > 1 ? <button className="button button--secondary" onClick={() => moveToStep(quoteStep - 1)} type="button">Retour</button> : <button className="button button--secondary quote-cancel" onClick={() => setQuoteOpen(false)} type="button">Annuler</button>}{quoteStep < 3 ? <button className="button" onClick={() => moveToStep(quoteStep + 1)} type="button">Continuer <Icon name="arrow" size={18} /></button> : null}</div></footer>
    </div></dialog>
  </>
}
