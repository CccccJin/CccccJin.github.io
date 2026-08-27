import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type MouseEvent as ReactMouseEvent,
  type TouchEvent as ReactTouchEvent,
} from 'react'
import { count, ui, useLocale, type Locale, type Localized } from '../i18n'
import { photos, places, type Place } from '../data/gallery'

/** Which list the lightbox is stepping through, and where it is in it. */
type Shown = { indexes: number[]; position: number }
/** Which control the pointer is nearest, mirrored onto the lightbox chrome. */
type Hint = 'prev' | 'next' | 'close' | null

const BATCH = 10
const TILES_WIDE = 20
const TILES_NARROW = 10
const NARROW = '(max-width: 640px)'
/** The lightbox mat, as a share of the photo's shorter displayed side. */
const FRAME_RATIO = 0.04
/** How far a touch has to travel sideways before it counts as a swipe. */
const SWIPE = 45
const FALLBACK_SCRIM = 0.34

function initialTiles(): number {
  return window.matchMedia(NARROW).matches ? TILES_NARROW : TILES_WIDE
}

/**
 * How dark a place card's cover needs to be for the white name on top of it to
 * stay readable. Sampled from the middle of the photo, where the name sits, so
 * a bright sky gets a heavy scrim and a dark forest barely any.
 */
function scrimFor(image: HTMLImageElement): number {
  try {
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d', { willReadFrequently: true })
    if (!context || !image.naturalWidth || !image.naturalHeight) return FALLBACK_SCRIM

    const size = 64
    const source = Math.min(image.naturalWidth, image.naturalHeight) * 0.5
    canvas.width = size
    canvas.height = size
    context.drawImage(
      image,
      (image.naturalWidth - source) / 2,
      (image.naturalHeight - source) / 2,
      source,
      source,
      0,
      0,
      size,
      size,
    )

    const { data } = context.getImageData(0, 0, size, size)
    let luminance = 0
    for (let at = 0; at < data.length; at += 4) {
      luminance += 0.2126 * data[at] + 0.7152 * data[at + 1] + 0.0722 * data[at + 2]
    }
    luminance /= data.length / 4

    return Math.min(0.58, Math.max(0.16, 0.12 + (luminance / 255) * 0.54))
  } catch {
    // A cover served cross-origin taints the canvas; the middling scrim reads
    // acceptably either way.
    return FALLBACK_SCRIM
  }
}

function yearRange(years: number[]): string {
  if (years.length === 0) return ''
  const last = years[years.length - 1]
  return years[0] === last ? String(years[0]) : `${years[0]} – ${last}`
}

function placeLabel(place: { city: Localized; region: Localized }, locale: Locale): string {
  return [place.city[locale], place.region[locale]].filter(Boolean).join(', ')
}

function PlaceCard({
  place,
  locale,
  onOpen,
}: {
  place: Place
  locale: Locale
  onOpen: () => void
}) {
  const imageRef = useRef<HTMLImageElement>(null)
  const [scrim, setScrim] = useState(FALLBACK_SCRIM)
  const cover = photos[place.indexes[0]]

  // A cached cover can finish decoding before React attaches a load handler, so
  // check for that case as well as listening for the load.
  useEffect(() => {
    const image = imageRef.current
    if (!image) return
    const measure = () => setScrim(scrimFor(image))
    if (image.complete && image.naturalWidth) measure()
    image.addEventListener('load', measure)
    return () => image.removeEventListener('load', measure)
  }, [cover.thumb])

  const meta = [count.photos[locale](place.indexes.length), yearRange(place.years)]
    .filter(Boolean)
    .join(' · ')

  return (
    <li>
      <button
        type="button"
        className="gallery-item gallery-place"
        style={{ '--scrim': scrim } as CSSProperties}
        aria-label={`${placeLabel(place, locale)} — ${meta}`}
        onClick={onOpen}
      >
        <img
          ref={imageRef}
          src={cover.thumb}
          alt=""
          width={cover.width}
          height={cover.height}
          loading="lazy"
          decoding="async"
        />
        <span className="gallery-place-label">
          <span className="gallery-place-city">{place.city[locale]}</span>
          {place.region[locale] && (
            <span className="gallery-place-region">{place.region[locale]}</span>
          )}
        </span>
        <span className="gallery-place-meta">{meta}</span>
      </button>
    </li>
  )
}

export function Gallery() {
  const locale = useLocale()
  const dialogRef = useRef<HTMLDialogElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)

  const [byPlace, setByPlace] = useState(true)
  const [visiblePhotos, setVisiblePhotos] = useState(initialTiles)
  const [visiblePlaces, setVisiblePlaces] = useState(initialTiles)
  const [shown, setShown] = useState<Shown | null>(null)
  const [hint, setHint] = useState<Hint>(null)
  const [flash, setFlash] = useState<'prev' | 'next' | null>(null)
  const [portrait, setPortrait] = useState(false)

  const isOpen = shown !== null
  const current = shown ? photos[shown.indexes[shown.position]] : null
  // Captions are optional: an album can be photographs and nothing else, and
  // an uncaptioned photo is described by its place alone rather than by a
  // dangling comma.
  const described = current
    ? [current.caption[locale], current.place[locale]].filter(Boolean).join(ui.captionJoin[locale])
    : ''

  const shownPlaces = useMemo(() => places.slice(0, visiblePlaces), [visiblePlaces])
  // Opening any card walks the whole set of places on screen, not just that one.
  const placeIndexes = useMemo(() => shownPlaces.flatMap((place) => place.indexes), [shownPlaces])
  const photoIndexes = useMemo(
    () => Array.from({ length: Math.min(visiblePhotos, photos.length) }, (_, at) => at),
    [visiblePhotos],
  )

  const step = useCallback((delta: number) => {
    setShown((prev) => {
      if (!prev) return prev
      const total = prev.indexes.length
      return { ...prev, position: (prev.position + delta + total) % total }
    })
  }, [])

  const flashTimer = useRef<number | undefined>(undefined)
  const flashNav = useCallback((delta: number) => {
    setFlash(delta < 0 ? 'prev' : 'next')
    window.clearTimeout(flashTimer.current)
    flashTimer.current = window.setTimeout(() => setFlash(null), 180)
  }, [])
  useEffect(() => () => window.clearTimeout(flashTimer.current), [])

  const move = useCallback(
    (delta: number) => {
      flashNav(delta)
      step(delta)
    },
    [flashNav, step],
  )

  // Native <dialog> gives us the focus trap, Esc, and focus restore for free;
  // we only mirror the open state into it.
  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (shown && !dialog.open) dialog.showModal()
    if (!shown && dialog.open) dialog.close()
  }, [shown])

  // Neither event bubbles, so React's synthetic handlers can miss them and
  // leave our state believing a dismissed lightbox is still open — which would
  // strand the scroll lock below. Listen natively, and for both: an Esc that
  // the browser handles itself arrives as `cancel`, not always as `close`.
  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    const clear = () => {
      setShown(null)
      setHint(null)
    }
    dialog.addEventListener('cancel', clear)
    dialog.addEventListener('close', clear)
    return () => {
      dialog.removeEventListener('cancel', clear)
      dialog.removeEventListener('close', clear)
    }
  }, [])

  // The backdrop covers the page, but the page underneath would still scroll.
  // Keyed off open/closed only: re-running this per photo would capture the
  // already-locked value and restore `hidden` on the way out.
  useEffect(() => {
    if (!isOpen) return
    const { style } = document.documentElement
    const previous = style.overflow
    style.overflow = 'hidden'
    return () => {
      style.overflow = previous
    }
  }, [isOpen])

  // Warm the neighbours so arrowing through the set doesn't flash a blank frame.
  useEffect(() => {
    if (!shown) return
    const total = shown.indexes.length
    for (const delta of [1, -1]) {
      const next = new Image()
      next.src = photos[shown.indexes[(shown.position + delta + total) % total]].src
    }
  }, [shown])

  const fitFrame = useCallback(() => {
    const image = imageRef.current
    if (!image) return
    // Measure against the CSS fallback mat first, then set the real one as a
    // share of the displayed photo, so every photo is matted in proportion.
    image.style.removeProperty('--frame-w')
    const shorter = Math.min(image.offsetWidth, image.offsetHeight)
    if (shorter > 0) image.style.setProperty('--frame-w', `${Math.round(shorter * FRAME_RATIO)}px`)
  }, [])

  useEffect(() => {
    const image = imageRef.current
    if (!image || !current) return
    const settle = () => {
      setPortrait(image.naturalHeight > image.naturalWidth)
      fitFrame()
    }
    if (image.complete && image.naturalWidth) settle()
    image.addEventListener('load', settle)
    return () => image.removeEventListener('load', settle)
  }, [current, fitFrame])

  // Orientation swaps the size limits, so the mat is re-measured once the class
  // that changed them has actually landed.
  useLayoutEffect(() => {
    if (isOpen) fitFrame()
  }, [portrait, isOpen, fitFrame])

  useEffect(() => {
    if (!isOpen) return
    const refit = () => fitFrame()
    window.addEventListener('resize', refit)
    return () => window.removeEventListener('resize', refit)
  }, [isOpen, fitFrame])

  /** The photo's vertical band: outside it, a click means "close". */
  const overPhoto = (clientY: number): boolean => {
    const image = imageRef.current
    if (!image) return false
    const box = image.getBoundingClientRect()
    return clientY >= box.top && clientY <= box.bottom
  }

  const trackPointer = (event: ReactMouseEvent) => {
    if (!overPhoto(event.clientY)) return setHint('close')
    setHint(event.clientX < window.innerWidth / 2 ? 'prev' : 'next')
  }

  const swallowClick = useRef(false)
  const touchStart = useRef<{ x: number; y: number } | null>(null)

  const clickThrough = (event: ReactMouseEvent) => {
    if ((event.target as HTMLElement).closest('button')) return
    if (swallowClick.current) {
      swallowClick.current = false
      return
    }
    if (!overPhoto(event.clientY)) return setShown(null)
    move(event.clientX < window.innerWidth / 2 ? -1 : 1)
  }

  const startSwipe = (event: ReactTouchEvent) => {
    if (event.touches.length !== 1) return
    touchStart.current = { x: event.touches[0].clientX, y: event.touches[0].clientY }
  }

  const endSwipe = (event: ReactTouchEvent) => {
    const start = touchStart.current
    touchStart.current = null
    if (!start || event.changedTouches.length !== 1) return
    const alongX = event.changedTouches[0].clientX - start.x
    const alongY = event.changedTouches[0].clientY - start.y
    if (Math.abs(alongX) < SWIPE || Math.abs(alongX) < Math.abs(alongY) * 1.4) return
    // The tap that ends a swipe would otherwise also step the lightbox.
    swallowClick.current = true
    move(alongX < 0 ? 1 : -1)
  }

  const remaining = photos.length - visiblePhotos
  const lightboxClass = ['lightbox', hint && `hint-${hint}`, flash && `flash-${flash}`]
    .filter(Boolean)
    .join(' ')

  return (
    <section className="section" id="gallery" aria-labelledby="gallery-title">
      <div className="gallery-heading">
        <h2 id="gallery-title">{ui.gallery[locale]}</h2>
        {photos.length > 0 && (
          <div className="gallery-view-toggle" role="group" aria-label={ui.galleryView[locale]}>
            <button
              type="button"
              aria-pressed={byPlace}
              onClick={() => {
                setVisiblePlaces(initialTiles())
                setByPlace(true)
              }}
            >
              {ui.byLocation[locale]}
            </button>
            <button type="button" aria-pressed={!byPlace} onClick={() => setByPlace(false)}>
              {ui.byTime[locale]}
            </button>
          </div>
        )}
      </div>

      <p className="gallery-intro">{ui.galleryIntro[locale]}</p>

      <ul className="gallery-grid">
        {byPlace
          ? shownPlaces.map((place) => (
              <PlaceCard
                key={place.key}
                place={place}
                locale={locale}
                onOpen={() =>
                  setShown({
                    indexes: placeIndexes,
                    position: placeIndexes.indexOf(place.indexes[0]),
                  })
                }
              />
            ))
          : photoIndexes.map((index) => {
              const photo = photos[index]
              const label = [
                photo.city[locale],
                photo.region[locale],
                photo.year === null ? '' : String(photo.year),
              ]
                .filter(Boolean)
                .join(', ')
              const spoken = [photo.caption[locale], label]
                .filter(Boolean)
                .join(ui.captionJoin[locale])
              return (
                <li key={photo.src}>
                  <button
                    type="button"
                    className="gallery-item"
                    aria-label={spoken}
                    onClick={() => setShown({ indexes: photoIndexes, position: index })}
                  >
                    <img
                      src={photo.thumb}
                      alt=""
                      width={photo.width}
                      height={photo.height}
                      loading={index === 0 ? 'eager' : 'lazy'}
                      decoding="async"
                      fetchPriority={index === 0 ? 'high' : 'low'}
                    />
                    <span className="gallery-caption">{label}</span>
                  </button>
                </li>
              )
            })}
      </ul>

      {byPlace && visiblePlaces < places.length && (
        <div className="gallery-actions">
          <button type="button" onClick={() => setVisiblePlaces(places.length)}>
            {count.showAllPlaces[locale](places.length)}
          </button>
        </div>
      )}

      {!byPlace && remaining > 0 && (
        <div className="gallery-actions">
          <button
            type="button"
            onClick={() => setVisiblePhotos((seen) => Math.min(seen + BATCH, photos.length))}
          >
            {count.showMore[locale](Math.min(BATCH, remaining), remaining)}
          </button>
          <button type="button" onClick={() => setVisiblePhotos(photos.length)}>
            {count.showAllPhotos[locale](photos.length)}
          </button>
        </div>
      )}

      <dialog
        ref={dialogRef}
        className={lightboxClass}
        aria-label={ui.lightboxLabel[locale]}
        onClick={clickThrough}
        onMouseMove={trackPointer}
        onMouseLeave={() => setHint(null)}
        onKeyDown={(event) => {
          if (event.key === 'ArrowRight') move(1)
          if (event.key === 'ArrowLeft') move(-1)
        }}
      >
        {shown && current && (
          <>
            <button
              type="button"
              className="lightbox-close"
              aria-label={ui.close[locale]}
              onClick={() => setShown(null)}
            >
              ×
            </button>

            <button
              type="button"
              className="lightbox-prev"
              aria-label={ui.previous[locale]}
              onClick={() => move(-1)}
            >
              ‹
            </button>

            <img
              ref={imageRef}
              className={portrait ? 'lightbox-image portrait' : 'lightbox-image'}
              src={current.src}
              alt={described}
              onTouchStart={startSwipe}
              onTouchEnd={endSwipe}
            />

            <button
              type="button"
              className="lightbox-next"
              aria-label={ui.next[locale]}
              onClick={() => move(1)}
            >
              ›
            </button>

            <p className="lightbox-caption">
              {shown.position + 1} / {shown.indexes.length}
              {described && ` — ${described}`}
            </p>
          </>
        )}
      </dialog>
    </section>
  )
}
