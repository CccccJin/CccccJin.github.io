import { profile } from '../data/profile'
import { ArrowIcon, GitHubIcon, LinkedInIcon, MailIcon } from './Icons'

const linkIcons: Record<string, () => React.JSX.Element> = {
  GitHub: () => <GitHubIcon />,
  LinkedIn: () => <LinkedInIcon />,
  Email: () => <MailIcon />,
}

export function Hero() {
  return (
    <section className="hero" aria-label="Introduction">
      <div className="hero-inner">
        <div className="hero-copy">
          <p className="hero-status">
            <span className="status-dot" aria-hidden="true" />
            {profile.availability}
          </p>
          <h1>
            {profile.name} <span className="hero-cn">{profile.chineseName}</span>
          </h1>
          <p className="hero-role">{profile.role}</p>
          <p className="hero-intro">{profile.intro}</p>

          <div className="hero-actions">
            <a className="button button-primary" href="#projects">
              View projects
              <ArrowIcon />
            </a>
            <a className="button button-secondary" href={profile.cvHref} target="_blank" rel="noreferrer">
              Download CV
            </a>
            <div className="hero-social" aria-label="Profiles">
              {profile.links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  aria-label={link.label}
                  title={link.label}
                  {...(link.external ? { target: '_blank', rel: 'noreferrer' } : {})}
                >
                  {linkIcons[link.label]?.()}
                </a>
              ))}
            </div>
          </div>

          <p className="hero-meta">
            {profile.location} · MSc Mechatronics Engineering (Research), University of Auckland
          </p>
        </div>

        <img
          className="hero-avatar"
          src={profile.avatarSrc}
          alt={profile.avatarAlt}
          width={280}
          height={350}
          fetchPriority="high"
        />
      </div>
    </section>
  )
}
