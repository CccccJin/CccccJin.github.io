import type { ProfileLink } from '../data/profile'

type HeaderProps = {
  profile: {
    name: string
    chineseName: string
    avatarSrc: string
    avatarAlt: string
    title: string
    intro: string
    links: ProfileLink[]
  }
}

export function Header({ profile }: HeaderProps) {
  return (
    <header className="site-header">
      <div className="identity">
        <img className="avatar" src={profile.avatarSrc} alt={profile.avatarAlt} />

        <div className="identity-copy">
          <p className="kicker">Robotics / AI / Engineering</p>
          <h1>
            {profile.name}
            <span>{profile.chineseName}</span>
          </h1>
          <p className="title-line">{profile.title}</p>
          <nav className="inline-links" aria-label="Profile links">
            {profile.links.map((link) => (
              <a key={link.label} href={link.href}>
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </div>

      <p className="intro">{profile.intro}</p>
    </header>
  )
}
