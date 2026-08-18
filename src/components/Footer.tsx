import { ui, useLocale } from '../i18n'
import { profile } from '../data/profile'

const UPDATED_ON = new Date(__LAST_UPDATED__)

export function Footer() {
  const locale = useLocale()
  const name = locale === 'zh' ? profile.chineseName : profile.name
  const updated = UPDATED_ON.toLocaleDateString(locale === 'zh' ? 'zh-CN' : 'en-GB', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <footer className="site-footer">
      <p className="footer-updated">
        {ui.footerUpdated[locale]}{' '}
        <time dateTime={__LAST_UPDATED__}>{updated}</time>
      </p>
      <p className="footer-credit">
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
