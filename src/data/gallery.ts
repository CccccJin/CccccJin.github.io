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
  date: Localized
  /** Kept alongside the date the way a photographer would caption a set. */
  camera: string
  photos: Photo[]
}

/**
 * One entry per shoot, newest first. Generated from the photos/ folder by
 * `npm run photos` — edit the album.json in there, not this file.
 */
export const albums: Album[] = albumData
