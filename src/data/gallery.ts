import type { Localized } from '../i18n'
import albumData from './albums.json'

export type Photo = {
  /** Full-size file shown in the lightbox. */
  src: string
  /** Small file shown in the grid. */
  thumb: string
  width: number
  height: number
  caption: Localized
}

export type Album = {
  id: string
  place: Localized
  /**
   * The place split for the location cards: `city` is the big line, `region`
   * the small one under it. Both fall back to splitting `place` on its comma,
   * so an album.json written before these existed still reads sensibly.
   */
  city?: Localized
  region?: Localized
  date: Localized
  /** Kept alongside the date the way a photographer would caption a set. */
  camera: string
  /** Filename of the photo to lead the location card with, if not the first. */
  cover?: string
  photos: Photo[]
}

/**
 * One entry per shoot, newest first. Generated from the photos/ folder by
 * `npm run photos` — edit the album.json in there, not this file.
 */
export const albums: Album[] = albumData

/** A photo carrying the album fields the gallery needs to sort and label it. */
export type GalleryPhoto = Photo & {
  albumId: string
  place: Localized
  city: Localized
  region: Localized
  date: Localized
  camera: string
  /** Taken from the album's date; null unless the date names one single year. */
  year: number | null
  /** Every year the album's date names, oldest first. */
  years: number[]
}

/** Every photo of one place, however many shoots it took. */
export type Place = {
  key: string
  city: Localized
  region: Localized
  /** Indexes into `photos`, the cover first. */
  indexes: number[]
  /** Every distinct year the place was shot in, oldest first. */
  years: number[]
}

const EMPTY: Localized = { en: '', zh: '' }

/** "Muriwai, Auckland" -> "Muriwai" + "Auckland"; no comma leaves no region. */
function splitPlace(place: Localized): { city: Localized; region: Localized } {
  const city = { ...EMPTY }
  const region = { ...EMPTY }
  for (const locale of ['en', 'zh'] as const) {
    const [head, ...rest] = place[locale].split(/[,，]/)
    city[locale] = head.trim()
    region[locale] = rest.join(', ').trim()
  }
  return { city, region }
}

/**
 * Every distinct year the album's date names, oldest first. A set gathered
 * over several years says so — "2020 – 2024" — and names two.
 */
function yearsOf(date: Localized): number[] {
  const named = date.en.match(/\d{4}/g) ?? date.zh.match(/\d{4}/g) ?? []
  return [...new Set(named.map(Number))].sort((a, b) => a - b)
}

/** Falls back per locale, so filling in only the English half still works. */
function orElse(preferred: Localized | undefined, fallback: Localized): Localized {
  if (!preferred) return fallback
  return {
    en: preferred.en.trim() || fallback.en,
    zh: preferred.zh.trim() || fallback.zh,
  }
}

/** Every photo in the gallery, newest album first, in album order within it. */
export const photos: GalleryPhoto[] = albums.flatMap((album) => {
  const split = splitPlace(album.place)
  const city = orElse(album.city, split.city)
  const region = orElse(album.region, split.region)
  const years = yearsOf(album.date)
  return album.photos.map((photo) => ({
    ...photo,
    albumId: album.id,
    place: album.place,
    city,
    region,
    date: album.date,
    camera: album.camera,
    // A date spanning years names no one year for a photo, so its tile is
    // labelled with the place alone rather than picking the range's first.
    year: years.length === 1 ? years[0] : null,
    years,
  }))
})

/**
 * The same photos grouped by place, in the order each place was last shot —
 * which, because `photos` is already newest first, is the order they appear.
 */
export const places: Place[] = (() => {
  const grouped = new Map<string, Place>()

  photos.forEach((photo, index) => {
    const key = (photo.city.en || photo.albumId).toLowerCase()
    let place = grouped.get(key)
    if (!place) {
      place = { key, city: photo.city, region: photo.region, indexes: [], years: [] }
      grouped.set(key, place)
    }
    place.indexes.push(index)
    for (const year of photo.years) {
      if (!place.years.includes(year)) place.years.push(year)
    }
  })

  for (const place of grouped.values()) place.years.sort((a, b) => a - b)

  // The newest album that names a cover picks the card's face; without one the
  // place leads with its newest photo, which is already first.
  const covers = new Map<string, string>()
  for (const album of albums) {
    const key = (orElse(album.city, splitPlace(album.place).city).en || album.id).toLowerCase()
    if (album.cover && !covers.has(key)) covers.set(key, album.cover)
  }

  for (const [key, cover] of covers) {
    const place = grouped.get(key)
    if (!place) continue
    const at = place.indexes.findIndex((index) => photos[index].src.endsWith(`/${cover}`))
    if (at > 0) place.indexes.unshift(...place.indexes.splice(at, 1))
  }

  return [...grouped.values()]
})()
