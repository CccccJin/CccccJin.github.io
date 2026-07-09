import { ExperienceItem } from './components/ExperienceItem'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { ProjectCard } from './components/ProjectCard'
import { Section } from './components/Section'
import { experiences } from './data/experience'
import { education, news } from './data/profile'
import { projects } from './data/projects'
import { skillGroups } from './data/skills'

function App() {
  return (
    <div className="page">
      <Header />

      <main>
      <hr />

      <Section id="news" title="News">
        <ul className="news-list">
          {news.map((item) => (
            <li key={`${item.date}-${item.text}`}>
              [{item.date}] {item.text}
              {item.href && item.linkText && (
                <>
                  {' '}
                  (
                  <a href={item.href} target="_blank" rel="noreferrer">
                    {item.linkText}
                  </a>
                  )
                </>
              )}
            </li>
          ))}
        </ul>
      </Section>

      <hr />

      <Section id="projects" title="Projects">
        <div className="pub-list">
          {projects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </Section>

      <hr />

      <Section id="experience" title="Experience">
        <div className="exp-list">
          {experiences.map((experience) => (
            <ExperienceItem
              key={`${experience.company}-${experience.role}`}
              experience={experience}
            />
          ))}
        </div>
      </Section>

      <hr />

      <Section id="skills" title="Skills">
        <ul className="skill-list">
          {skillGroups.map((group) => (
            <li key={group.category}>
              <strong>{group.category}:</strong> {group.items.join(', ')}.{' '}
              <span className="skill-depth">{group.depth}</span>
            </li>
          ))}
        </ul>
      </Section>

      <hr />

      <Section id="education" title="Education">
        {education.map((item) => (
          <article className="edu-entry" key={`${item.degree}-${item.institution}`}>
            <p className="exp-heading">
              <strong>{item.degree}</strong>, {item.institution}, {item.location}
              <span className="exp-period"> · {item.period}</span>
            </p>
            {item.details.map((detail) => (
              <p className="edu-detail" key={detail}>
                {detail}
              </p>
            ))}
          </article>
        ))}
      </Section>
      </main>

      <Footer />
    </div>
  )
}

export default App
