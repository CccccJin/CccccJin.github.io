import type { Experience } from '../data/experience'

type ExperienceItemProps = {
  experience: Experience
}

export function ExperienceItem({ experience }: ExperienceItemProps) {
  return (
    <article className="exp-entry">
      <p className="exp-heading">
        <strong>{experience.role}</strong>, {experience.company}
        {experience.location && `, ${experience.location}`}
        <span className="exp-period"> · {experience.period}</span>
      </p>
      <ul className="exp-points">
        {experience.highlights.map((highlight) => (
          <li key={highlight}>{highlight}</li>
        ))}
      </ul>
    </article>
  )
}
