import type { Project } from '../data/projects'
import { ArrowIcon } from './Icons'

type ProjectCardProps = {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="project-card">
      <div
        className="project-thumb"
        style={{ '--thumb-hue': project.hue } as React.CSSProperties}
        aria-hidden="true"
      >
        <span>{project.thumb}</span>
      </div>

      <div className="project-body">
        <h3>{project.title}</h3>
        <p className="project-tagline">{project.tagline}</p>

        <ul className="project-highlights">
          {project.highlights.map((highlight) => (
            <li key={highlight}>{highlight}</li>
          ))}
        </ul>

        <ul className="chip-list" aria-label="Technologies used">
          {project.tech.map((item) => (
            <li className="chip" key={item}>
              {item}
            </li>
          ))}
        </ul>

        <div className="project-footer">
          {project.links.map((link) => (
            <a
              key={link.label}
              className="text-link"
              href={link.href}
              target="_blank"
              rel="noreferrer"
            >
              {link.label}
              <ArrowIcon size={13} />
            </a>
          ))}
          {project.note && <p className="project-note">{project.note}</p>}
        </div>
      </div>
    </article>
  )
}
