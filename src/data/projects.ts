export type ProjectLink = {
  label: 'GitHub' | 'Demo' | 'Details'
  href: string
}

export type Project = {
  title: string
  description: string
  focus: string
  tech: string[]
  links: ProjectLink[]
}

export const projects: Project[] = [
  {
    title: 'Affordable Drug Alternatives',
    description:
      'Built a compound search and comparison prototype for exploring large-scale ChEMBL drug data. The public GitHub Pages demo presents searchable compound information and property visualization, while the full dynamic similarity workflow uses backend components for RDKit processing, DuckDB querying, and FastAPI services.',
    focus:
      'Demonstrates practical data engineering, scientific data search, prototype UX, and the tradeoff between static deployment and backend-heavy cheminformatics workflows.',
    tech: [
      'React',
      'TypeScript',
      'Vite',
      'FastAPI',
      'DuckDB',
      'RDKit',
      'ChEMBL 35',
      'ChemBERTa',
      'GitHub Pages',
    ],
    links: [
      {
        label: 'GitHub',
        href: 'https://github.com/CccccJin/affordable-drug-alternatives',
      },
      {
        label: 'Demo',
        href: 'https://CccccJin.github.io/Affordable-Drug-Alternatives/',
      },
      { label: 'Details', href: '#projects' },
    ],
  },
  {
    title: 'Emotion-Aware Human-Robot Collaboration with UR5e',
    description:
      'Developed a UR5e human-robot collaboration research system using ROS/MoveIt for pick-and-place control, trajectory execution, gripper/conveyor integration, and simulation-to-real validation. The study evaluated how robot speed and interaction distance influence task performance, workload, and user perception.',
    focus:
      'Shows robot control, HRC experiment design, real-robot integration, user-study measurement, and statistical analysis with repeated-measures methods.',
    tech: [
      'UR5e',
      'ROS',
      'MoveIt',
      'Robotiq 85',
      'Gazebo',
      'R',
      'ANOVA',
      'NASA-TLX',
      'GodSpeed',
    ],
    links: [
      {
        label: 'GitHub',
        href: '#projects',
      },
      { label: 'Demo', href: '#projects' },
      { label: 'Details', href: '#projects' },
    ],
  },
  {
    title: 'Auckland Transport Computer Vision / Dashboard Work',
    description:
      'Supported intelligent transportation work by validating computer vision datasets and YOLOv8-based model outputs, documenting issues, and building an internal dashboard for transport data querying and operational visibility.',
    focus:
      'Demonstrates computer vision evaluation, data/API integration, role-based dashboard development, and exposure to deployment-oriented engineering workflows.',
    tech: [
      'Python',
      'React',
      'TypeScript',
      'Next.js',
      'Docker',
      'Git',
      'Vertica',
      'MongoDB',
      'DuckDB',
      'Computer Vision',
      'YOLOv8',
    ],
    links: [
      { label: 'GitHub', href: '#projects' },
      { label: 'Demo', href: '#projects' },
      { label: 'Details', href: '#projects' },
    ],
  },
  {
    title: 'Train LLM from Scratch',
    description:
      'Implemented a learning-oriented language model training project to understand tokenization, Transformer blocks, training loops, loss curves, and small-scale GPU experimentation.',
    focus:
      'Shows ability to move below library-level usage and reason about core model architecture, optimization behavior, and training diagnostics.',
    tech: ['Python', 'PyTorch', 'Transformer', 'Tokenization', 'CUDA'],
    links: [
      {
        label: 'GitHub',
        href: '#projects',
      },
      { label: 'Demo', href: '#projects' },
      { label: 'Details', href: '#projects' },
    ],
  },
]
