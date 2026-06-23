import { ExperienceItem } from './components/ExperienceItem'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { ProjectCard } from './components/ProjectCard'
import { Section } from './components/Section'
import { experiences } from './data/experience'
import { education, profile } from './data/profile'
import { projects } from './data/projects'
import { skillGroups } from './data/skills'

function App() {
  return (
    <div className="page-shell">
      <Header profile={profile} />

      <main>
        <Section id="about" title="About">
          {profile.about.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </Section>

        <Section id="projects" title="Projects">
          <div className="project-list" aria-label="Selected projects">
            {projects.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </div>
        </Section>

        <Section id="experience" title="Work Experience">
          <div className="experience-list">
            {experiences.map((experience) => (
              <ExperienceItem
                key={`${experience.company}-${experience.role}`}
                experience={experience}
              />
            ))}
          </div>
        </Section>

        <Section id="skills" title="Skills">
          <div className="skill-grid">
            {skillGroups.map((group) => (
              <div className="skill-group" key={group.category}>
                <h3>{group.category}</h3>
                <p>{group.items.join(', ')}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section id="education" title="Education">
          <div className="education-item">
            <h3>{education.degree}</h3>
            <p className="institution">{education.institution}</p>
            <p>{education.focus}</p>
            {education.additionalNote && <p>{education.additionalNote}</p>}
          </div>
        </Section>

        <Section id="contact" title="Contact">
          <p>{profile.contactIntro}</p>
          <nav className="inline-links" aria-label="Contact links">
            {profile.links.map((link) => (
              <a key={link.label} href={link.href}>
                {link.label}
              </a>
            ))}
          </nav>
        </Section>
      </main>

      <Footer name={profile.name} />
    </div>
  )
}

export default App
