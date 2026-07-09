import type { ReactNode } from 'react'
import { Reveal } from './Reveal'

type SectionProps = {
  id: string
  title: string
  lede?: string
  children: ReactNode
}

export function Section({ id, title, lede, children }: SectionProps) {
  return (
    <section className="section" id={id} aria-labelledby={`${id}-title`}>
      <Reveal>
        <div className="section-header">
          <h2 id={`${id}-title`}>{title}</h2>
          {lede && <p className="section-lede">{lede}</p>}
        </div>
      </Reveal>
      {children}
    </section>
  )
}
