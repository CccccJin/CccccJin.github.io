import type { Experience } from '../data/experience'

type ExperienceItemProps = {
  experience: Experience
}

export function ExperienceItem({ experience }: ExperienceItemProps) {
  return (
    <article className="experience-item">
      <div className="experience-heading">
        <div>
          <h3>{experience.company}</h3>
          <p>
            {experience.role}
            {experience.location && <span> · {experience.location}</span>}
          </p>
        </div>
        <span>{experience.period}</span>
      </div>

      <ul>
        {experience.highlights.map((highlight) => (
          <li key={highlight}>{highlight}</li>
        ))}
      </ul>
    </article>
  )
}
