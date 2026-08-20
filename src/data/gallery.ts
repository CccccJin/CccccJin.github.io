import type { Localized } from '../i18n'

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

/** One entry per shoot, newest first. */
export const albums: Album[] = [
  {
    id: 'muriwai',
    place: { en: 'Muriwai, Auckland', zh: '奥克兰 Muriwai' },
    date: { en: 'October 2025', zh: '2025 年 10 月' },
    camera: 'Canon EOS 800D',
    photos: [
      {
        src: './gallery/muriwai-01.jpg',
        thumb: './gallery/thumbs/muriwai-01.jpg',
        width: 1500,
        height: 1000,
        caption: {
          en: 'The road out west, through the windscreen',
          zh: '往西开的路上,透过挡风玻璃',
        },
      },
      {
        src: './gallery/muriwai-02.jpg',
        thumb: './gallery/thumbs/muriwai-02.jpg',
        width: 1500,
        height: 1000,
        caption: {
          en: 'Sheltered water on the way to the coast',
          zh: '去海边路上一处平静的水湾',
        },
      },
      {
        src: './gallery/muriwai-03.jpg',
        thumb: './gallery/thumbs/muriwai-03.jpg',
        width: 1500,
        height: 1000,
        caption: {
          en: 'An old tree leaning over the bay',
          zh: '一棵斜倚在海湾边的老树',
        },
      },
      {
        src: './gallery/muriwai-04.jpg',
        thumb: './gallery/thumbs/muriwai-04.jpg',
        width: 1500,
        height: 1000,
        caption: {
          en: 'First sight of the black sand from the ridge',
          zh: '从山脊上第一次看到黑沙滩',
        },
      },
      {
        src: './gallery/muriwai-05.jpg',
        thumb: './gallery/thumbs/muriwai-05.jpg',
        width: 1500,
        height: 1000,
        caption: {
          en: 'The beach curving away below the lookout',
          zh: '观景台下方一路弯过去的海岸线',
        },
      },
      {
        src: './gallery/muriwai-06.jpg',
        thumb: './gallery/thumbs/muriwai-06.jpg',
        width: 1500,
        height: 1000,
        caption: {
          en: 'The rock standing at the end of the beach',
          zh: '立在海滩尽头的那块礁岩',
        },
      },
      {
        src: './gallery/muriwai-07.jpg',
        thumb: './gallery/thumbs/muriwai-07.jpg',
        width: 1500,
        height: 1000,
        caption: {
          en: 'Flax in the wind, the Tasman Sea behind it',
          zh: '风里的亚麻草,身后是塔斯曼海',
        },
      },
    ],
  },
]
