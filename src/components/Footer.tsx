type FooterProps = {
  name: string
}

export function Footer({ name }: FooterProps) {
  return (
    <footer className="site-footer">
      <p>{name}. Built with React, TypeScript, and Vite.</p>
    </footer>
  )
}
