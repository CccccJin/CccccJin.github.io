import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { ProjectCard } from './components/ProjectCard'
import { Section } from './components/Section'
import { news } from './data/profile'
import { projects } from './data/projects'

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
      </main>

      <Footer />
    </div>
  )
}

export default App
