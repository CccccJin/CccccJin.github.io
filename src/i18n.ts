import { createContext, useContext } from 'react'

export type Locale = 'en' | 'zh'

/** A string with an English and a separately written Chinese version. */
export type Localized = { en: string; zh: string }

export const LocaleContext = createContext<Locale>('en')

export function useLocale(): Locale {
  return useContext(LocaleContext)
}

/** UI strings that don't belong to any data entry. */
export const ui = {
  news: { en: 'News', zh: '近况' },
  projects: { en: 'Projects', zh: '项目' },
  gallery: { en: 'Gallery', zh: '相册' },
  galleryIntro: {
    en: 'Photographs I take when I am away from the screen — mostly the coast around Auckland.',
    zh: '离开屏幕之后随手拍的照片,大多是奥克兰附近的海岸。',
  },
  photosCount: { en: 'photos', zh: '张' },
  lightboxLabel: { en: 'Photo viewer', zh: '照片查看' },
  /** Between a photo's caption and its place, punctuated per language. */
  captionJoin: { en: ', ', zh: ',' },
  close: { en: 'Close', zh: '关闭' },
  previous: { en: 'Previous photo', zh: '上一张' },
  next: { en: 'Next photo', zh: '下一张' },
  stack: { en: 'Stack:', zh: '技术栈:' },
  emailLine: {
    en: 'Email: che917 [AT] aucklanduni.ac.nz',
    zh: '邮箱:che917 [AT] aucklanduni.ac.nz',
  },
  toggleLabel: { en: '中文', zh: 'English' },
  footerDesign: { en: 'Design inspired by', zh: '网页设计参考' },
  footerSite: { en: 'Jon Barron’s website', zh: 'Jon Barron 的主页' },
  footerUpdated: { en: 'Last updated', zh: '最后更新' },
} satisfies Record<string, Localized>
