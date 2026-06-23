import type { Project } from '../data/projects'

type ProjectCardProps = {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="project-card">
      <div>
        <h3>{project.title}</h3>
        <p>{project.description}</p>
      </div>

      <p className="project-focus">{project.focus}</p>
      <p className="tech-stack">{project.tech.join(' / ')}</p>

      <nav className="compact-links" aria-label={`${project.title} links`}>
        {project.links.map((link) => (
          <a key={link.label} href={link.href}>
            {link.label}
          </a>
        ))}
      </nav>
    </article>
  )
}
