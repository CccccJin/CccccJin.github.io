import { useCallback, useEffect, useRef, useState } from 'react'
import { ui, useLocale } from '../i18n'
import { albums } from '../data/gallery'

/** Which photo the lightbox is showing, as indexes into `albums`. */
type Shown = { album: number; photo: number }

export function Gallery() {
  const locale = useLocale()
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [shown, setShown] = useState<Shown | null>(null)

  const isOpen = shown !== null
  const current = shown ? albums[shown.album] : null
  const photo = shown && current ? current.photos[shown.photo] : null

  const step = useCallback((delta: number) => {
    setShown((prev) => {
      if (!prev) return prev
      const count = albums[prev.album].photos.length
      return { ...prev, photo: (prev.photo + delta + count) % count }
    })
  }, [])

  // Native <dialog> gives us the focus trap, Esc, and focus restore for free;
  // we only mirror the open state into it.
  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (shown && !dialog.open) dialog.showModal()
    if (!shown && dialog.open) dialog.close()
  }, [shown])

  // `close` doesn't bubble, so React's synthetic handler can miss it and leave
  // our state believing a dismissed lightbox is still open. Listen natively.
  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    const clear = () => setShown(null)
    dialog.addEventListener('close', clear)
    return () => dialog.removeEventListener('close', clear)
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
    if (!shown || !current) return
    const count = current.photos.length
    for (const delta of [1, -1]) {
      const next = new Image()
      next.src = current.photos[(shown.photo + delta + count) % count].src
    }
  }, [shown, current])

  return (
    <>
      <p className="gallery-intro">{ui.galleryIntro[locale]}</p>

      {albums.map((album, albumIndex) => (
        <div className="album" key={album.id}>
          <p className="album-meta">
            <strong>{album.place[locale]}</strong>
            <span> · {album.date[locale]}</span>
            <span> · {album.camera}</span>
            <span>
              {' '}
              · {album.photos.length} {ui.photosCount[locale]}
            </span>
          </p>

          <ul className="photo-grid">
            {album.photos.map((item, photoIndex) => (
              <li key={item.src}>
                <button
                  type="button"
                  className="photo-tile"
                  onClick={() => setShown({ album: albumIndex, photo: photoIndex })}
                >
                  <img
                    src={item.thumb}
                    alt={item.caption[locale]}
                    width={item.width}
                    height={item.height}
                    loading="lazy"
                    decoding="async"
                  />
                  <span className="photo-caption">{item.caption[locale]}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      ))}

      <dialog
        ref={dialogRef}
        className="lightbox"
        aria-label={ui.lightboxLabel[locale]}
        onClick={(event) => {
          // Clicks that land on the dialog itself came from the backdrop.
          if (event.target === dialogRef.current) setShown(null)
        }}
        onKeyDown={(event) => {
          if (event.key === 'ArrowRight') step(1)
          if (event.key === 'ArrowLeft') step(-1)
        }}
      >
        {shown && current && photo && (
          <div className="lightbox-inner">
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
              className="lightbox-nav prev"
              aria-label={ui.previous[locale]}
              onClick={() => step(-1)}
            >
              ‹
            </button>

            <img
              className="lightbox-image"
              src={photo.src}
              alt={photo.caption[locale]}
              width={photo.width}
              height={photo.height}
            />

            <button
              type="button"
              className="lightbox-nav next"
              aria-label={ui.next[locale]}
              onClick={() => step(1)}
            >
              ›
            </button>

            <p className="lightbox-caption">
              {shown.photo + 1} / {current.photos.length} — {photo.caption[locale]}
              {ui.captionJoin[locale]}
              {current.place[locale]}
            </p>
          </div>
        )}
      </dialog>
    </>
  )
}
