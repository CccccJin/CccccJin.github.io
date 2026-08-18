import { ui, useLocale } from '../i18n'
import type { Project } from '../data/projects'
import { LazyVideo } from './LazyVideo'

type ProjectCardProps = {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  const locale = useLocale()

  return (
    <article className="pub-entry">
      {project.video ? (
        <LazyVideo
          src={project.video.src}
          poster={project.video.poster}
          label={`${project.title[locale]} demo video`}
        />
      ) : project.cover ? (
        <img
          className="pub-cover"
          src={project.cover.src}
          alt={project.cover.alt[locale]}
          loading="lazy"
          decoding="async"
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
        <h3 className="pub-title">{project.title[locale]}</h3>
        <p className="pub-tagline">{project.tagline[locale]}</p>

        <p className="pub-tech">
          <strong>{ui.stack[locale]}</strong> {project.tech.join(', ')}
        </p>

        {(project.links.length > 0 || project.note) && (
          <p className="pub-links">
            {project.links.map((link, index) => (
              <span key={link.label.en}>
                {index > 0 && ' | '}
                <a href={link.href} target="_blank" rel="noreferrer">
                  {link.label[locale]}
                </a>
              </span>
            ))}
            {project.note && (
              <i className="pub-note">
                {project.links.length > 0 && ' — '}
                {project.note[locale]}
              </i>
            )}
          </p>
        )}
      </div>
    </article>
  )
}
