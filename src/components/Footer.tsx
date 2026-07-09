import { profile } from '../data/profile'
import { GitHubIcon, LinkedInIcon, MailIcon } from './Icons'

export function Contact() {
  return (
    <section className="contact" id="contact" aria-labelledby="contact-title">
      <h2 id="contact-title">Let's build something that works outside the demo.</h2>
      <p>
        I'm looking for AI/ML, robotics, computer vision, and software engineering roles. If my work
        looks relevant to your team, I'd love to talk.
      </p>
      <div className="contact-actions">
        <a className="button button-primary" href={`mailto:${profile.email}`}>
          <MailIcon />
          {profile.email}
        </a>
        <a
          className="button button-secondary"
          href="https://github.com/CccccJin"
          target="_blank"
          rel="noreferrer"
        >
          <GitHubIcon />
          GitHub
        </a>
        <a
          className="button button-secondary"
          href="https://www.linkedin.com/in/changjin-he-908a2531a/"
          target="_blank"
          rel="noreferrer"
        >
          <LinkedInIcon />
          LinkedIn
        </a>
      </div>
    </section>
  )
}

export function Footer() {
  return (
    <footer className="site-footer">
      <p>
        © {new Date().getFullYear()} {profile.name} · Built with React, TypeScript, and Vite ·{' '}
        <a href="https://github.com/CccccJin/CccccJin.github.io" target="_blank" rel="noreferrer">
          Source
        </a>
      </p>
    </footer>
  )
}
