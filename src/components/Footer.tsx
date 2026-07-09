import { profile } from '../data/profile'

export function Footer() {
  return (
    <footer className="site-footer">
      <p>
        © {new Date().getFullYear()} {profile.name} · Design inspired by{' '}
        <a href="https://jonbarron.info/" target="_blank" rel="noreferrer">
          Jon Barron&rsquo;s website
        </a>{' '}
        ·{' '}
        <a href="https://github.com/CccccJin/CccccJin.github.io" target="_blank" rel="noreferrer">
          Source
        </a>
      </p>
    </footer>
  )
}
