import { useEffect, useRef, useState } from 'react'

type LazyVideoProps = {
  src: string
  poster: string
  label: string
}

/**
 * Muted looping demo video that behaves like a GIF, but only starts
 * downloading once it scrolls near the viewport so the page stays fast.
 */
export function LazyVideo({ src, poster, label }: LazyVideoProps) {
  const ref = useRef<HTMLVideoElement>(null)
  const [active, setActive] = useState(false)
  const reducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true)
          observer.disconnect()
        }
      },
      { rootMargin: '400px 0px' },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (active && !reducedMotion) {
      ref.current?.play().catch(() => {})
    }
  }, [active, reducedMotion])

  return (
    <video
      ref={ref}
      className="pub-video"
      src={active ? src : undefined}
      poster={poster}
      muted
      loop
      playsInline
      preload="none"
      controls={reducedMotion}
      aria-label={label}
    />
  )
}
