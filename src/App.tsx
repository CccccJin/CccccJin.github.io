import { ExperienceItem } from './components/ExperienceItem'
import { Contact, Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { Nav } from './components/Nav'
import { ProjectCard } from './components/ProjectCard'
import { Reveal } from './components/Reveal'
import { Section } from './components/Section'
import { experiences } from './data/experience'
import { education, highlights, profile } from './data/profile'
import { projects } from './data/projects'
import { skillGroups } from './data/skills'

function App() {
  return (
    <>
      <a className="skip-link" href="#projects">
        Skip to projects
      </a>
      <Nav name={profile.name} />

      <main id="top">
        <Hero />

        <section className="highlights" aria-labelledby="highlights-title">
          <h2 id="highlights-title" className="visually-hidden">
            What sets me apart
          </h2>
          <div className="highlight-grid">
            {highlights.map((item, index) => (
              <Reveal key={item.title} delay={index * 60}>
                <article className="highlight-card">
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        <Section
          id="projects"
          title="Selected projects"
          lede="Real robots, production vision systems, and full-stack ML products — each one scannable in thirty seconds."
        >
          <div className="project-list">
            {projects.map((project, index) => (
              <Reveal key={project.title} delay={index * 40}>
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </div>
        </Section>

        <Section
          id="experience"
          title="Experience"
          lede="From field service on semiconductor equipment to computer vision and full-stack engineering."
        >
          <div className="experience-list">
            {experiences.map((experience, index) => (
              <Reveal key={`${experience.company}-${experience.role}`} delay={index * 40}>
                <ExperienceItem experience={experience} />
              </Reveal>
            ))}
          </div>
        </Section>

        <Section
          id="skills"
          title="Skills"
          lede="Grouped by what I actually do with them, not just what I've installed."
        >
          <div className="skill-grid">
            {skillGroups.map((group, index) => (
              <Reveal key={group.category} delay={index * 40}>
                <article className="skill-group">
                  <h3>{group.category}</h3>
                  <p className="skill-depth">{group.depth}</p>
                  <ul className="chip-list">
                    {group.items.map((item) => (
                      <li className="chip" key={item}>
                        {item}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>
        </Section>

        <Section id="education" title="Education">
          <div className="education-list">
            {education.map((item) => (
              <Reveal key={`${item.degree}-${item.institution}`}>
                <article className="education-item">
                  <div className="experience-heading">
                    <div>
                      <h3>{item.degree}</h3>
                      <p className="experience-org">
                        {item.institution} · {item.location}
                      </p>
                    </div>
                    <span className="experience-period">{item.period}</span>
                  </div>
                  {item.details.map((detail) => (
                    <p className="education-detail" key={detail}>
                      {detail}
                    </p>
                  ))}
                </article>
              </Reveal>
            ))}
          </div>
        </Section>

        <Reveal>
          <Contact />
        </Reveal>
      </main>

      <Footer />
    </>
  )
}

export default App
