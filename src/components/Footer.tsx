import { ui, useLocale } from '../i18n'
import { profile } from '../data/profile'

export function Footer() {
  const locale = useLocale()
  const name = locale === 'zh' ? profile.chineseName : profile.name

  return (
    <footer className="site-footer">
      <p>
        © {new Date().getFullYear()} {name} · {ui.footerDesign[locale]}{' '}
        <a href="https://jonbarron.info/" target="_blank" rel="noreferrer">
          {ui.footerSite[locale]}
        </a>{' '}
        ·{' '}
        <a href="https://github.com/CccccJin/CccccJin.github.io" target="_blank" rel="noreferrer">
          {ui.footerSource[locale]}
        </a>
      </p>
    </footer>
  )
}
