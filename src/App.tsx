import { useEffect, useState } from 'react'
import { LocaleContext, ui, type Locale } from './i18n'
import { Footer } from './components/Footer'
import { Gallery } from './components/Gallery'
import { Header } from './components/Header'
import { ProjectCard } from './components/ProjectCard'
import { Section } from './components/Section'
import { news } from './data/profile'
import { projects } from './data/projects'

function App() {
  const [locale, setLocale] = useState<Locale>(() =>
    localStorage.getItem('locale') === 'zh' ? 'zh' : 'en',
  )

  useEffect(() => {
    document.documentElement.lang = locale === 'zh' ? 'zh-CN' : 'en'
    localStorage.setItem('locale', locale)
  }, [locale])

  return (
    <LocaleContext.Provider value={locale}>
      <div className="page">
        <button
          type="button"
          className="lang-toggle"
          lang={locale === 'zh' ? 'en' : 'zh-CN'}
          onClick={() => setLocale(locale === 'zh' ? 'en' : 'zh')}
        >
          {ui.toggleLabel[locale]}
        </button>

        <Header />

        <main>
          <hr />

          <Section id="news" title={ui.news[locale]}>
            <ul className="news-list">
              {news.map((item) => (
                <li key={`${item.date}-${item.text.en}`}>
                  [{item.date}] {item.text[locale]}
                  {item.href && item.linkText && (
                    <>
                      {' '}
                      (
                      <a href={item.href} target="_blank" rel="noreferrer">
                        {item.linkText[locale]}
                      </a>
                      )
                    </>
                  )}
                </li>
              ))}
            </ul>
          </Section>

          <hr />

          <Section id="projects" title={ui.projects[locale]}>
            <div className="pub-list">
              {projects.map((project) => (
                <ProjectCard key={project.title.en} project={project} />
              ))}
            </div>
          </Section>

          <hr />

          <Gallery />
        </main>

        <Footer />
      </div>
    </LocaleContext.Provider>
  )
}

export default App
