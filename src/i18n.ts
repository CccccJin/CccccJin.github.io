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
  stack: { en: 'Stack:', zh: '技术栈:' },
  emailLine: {
    en: 'Email: che917 [AT] aucklanduni.ac.nz',
    zh: '邮箱:che917 [AT] aucklanduni.ac.nz',
  },
  toggleLabel: { en: '中文', zh: 'English' },
  footerDesign: { en: 'Design inspired by', zh: '网页设计参考' },
  footerSite: { en: 'Jon Barron’s website', zh: 'Jon Barron 的主页' },
  footerSource: { en: 'Source', zh: '源码' },
} satisfies Record<string, Localized>
