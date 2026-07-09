import { profile } from '../data/profile'

export function Header() {
  return (
    <header className="masthead">
      <h1>
        {profile.name} <span className="cn-name">「{profile.chineseName}」</span>
      </h1>

      <div className="header-grid">
        <div className="header-media">
          <img
            src={profile.avatarSrc}
            alt={profile.avatarAlt}
            width={560}
            height={746}
            fetchPriority="high"
          />
          <p className="profile-links">
            {profile.links.map((link, index) => (
              <span key={link.label}>
                {index === 0 && '| '}
                <a href={link.href} {...(link.external ? { target: '_blank', rel: 'noreferrer' } : {})}>
                  {link.label}
                </a>
                {' |'}{' '}
              </span>
            ))}
          </p>
        </div>

        <div className="bio">
          <p>
            I am a mechatronics engineer working on robotics, embodied AI, and computer vision. I
            recently completed my Master of Mechatronics Engineering (Research) at the{' '}
            <a href="https://www.auckland.ac.nz/" target="_blank" rel="noreferrer">
              University of Auckland
            </a>
            , where I studied emotion-aware human-robot collaboration on a UR5e — how a robot
            should adapt its speed and distance to the human working next to it.
          </p>
          <p>
            During my master&rsquo;s, I interned at{' '}
            <a href="https://at.govt.nz/" target="_blank" rel="noreferrer">
              Auckland Transport
            </a>{' '}
            validating YOLOv8 pipelines for intelligent transport systems, and at Cloudcell
            building a similarity-search platform over millions of ChEMBL compounds.
          </p>
          <p>
            Before moving to New Zealand, I spent five years as a field service engineer at{' '}
            <a href="https://www.axcelis.com/" target="_blank" rel="noreferrer">
              Axcelis Technologies
            </a>{' '}
            and{' '}
            <a href="https://www.nikon.com/business/precision/" target="_blank" rel="noreferrer">
              Nikon Precision
            </a>
            , diagnosing semiconductor and FPD lithography equipment — log analysis, waveform and
            Fourier diagnostics, and filter calibration on machines that are not allowed to fail.
          </p>
          <p>
            <strong>Goal:</strong> robots and AI systems that keep working outside the demo.
          </p>
          <p>
            <strong>Interests:</strong> robotics, embodied AI, human-robot interaction, computer
            vision, and practical ML systems.
          </p>
          <p>
            <strong>Currently:</strong> looking for AI/ML, robotics, computer vision, and software
            engineering roles.
          </p>
          <p>Email: che917 [AT] aucklanduni.ac.nz</p>
        </div>
      </div>
    </header>
  )
}
