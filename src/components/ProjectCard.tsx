import type { Project } from '../data/projects'
import { LazyVideo } from './LazyVideo'

type ProjectCardProps = {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="pub-entry">
      {project.video ? (
        <LazyVideo
          src={project.video.src}
          poster={project.video.poster}
          label={`${project.title} demo video`}
        />
      ) : (
        <div
          className="pub-thumb"
          style={{ '--thumb-hue': project.hue } as React.CSSProperties}
          aria-hidden="true"
        >
          <span>{project.thumb}</span>
        </div>
      )}

      <div className="pub-body">
        <h3 className="pub-title">{project.title}</h3>
        <p className="pub-tagline">{project.tagline}</p>

        {project.highlights.length > 0 && (
          <ul className="pub-points">
            {project.highlights.map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>
        )}

        <p className="pub-tech">
          <strong>Stack:</strong> {project.tech.join(', ')}
        </p>

        {(project.links.length > 0 || project.note) && (
          <p className="pub-links">
            {project.links.map((link, index) => (
              <span key={link.label}>
                {index > 0 && ' | '}
                <a href={link.href} target="_blank" rel="noreferrer">
                  {link.label.toLowerCase()}
                </a>
              </span>
            ))}
            {project.note && (
              <i className="pub-note">
                {project.links.length > 0 && ' — '}
                {project.note}
              </i>
            )}
          </p>
        )}
      </div>
    </article>
  )
}
