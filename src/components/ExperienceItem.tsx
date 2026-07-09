import type { Experience } from '../data/experience'

type ExperienceItemProps = {
  experience: Experience
}

export function ExperienceItem({ experience }: ExperienceItemProps) {
  return (
    <article className="experience-item">
      <div className="experience-heading">
        <div>
          <h3>{experience.role}</h3>
          <p className="experience-org">
            {experience.company}
            {experience.location && <span> · {experience.location}</span>}
          </p>
        </div>
        <span className="experience-period">{experience.period}</span>
      </div>

      <ul className="experience-highlights">
        {experience.highlights.map((highlight) => (
          <li key={highlight}>{highlight}</li>
        ))}
      </ul>
    </article>
  )
}
