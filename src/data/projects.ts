export type ProjectLink = {
  label: 'GitHub' | 'Demo' | 'Details'
  href: string
}

export type Project = {
  title: string
  description: string
  tech: string[]
  links: ProjectLink[]
}

export const projects: Project[] = [
  {
    title: 'Affordable Drug Alternatives',
    description:
      'A static GitHub Pages demo for exploring preprocessed ChEMBL/RDKit compound data. The demo focuses on searchable compound information and property visualization, while the full dynamic SMILES similarity search requires a backend with RDKit, DuckDB, and FastAPI.',
    tech: [
      'React',
      'TypeScript',
      'Vite',
      'RDKit data',
      'ChEMBL data',
      'GitHub Pages',
    ],
    links: [
      {
        label: 'GitHub',
        href: 'https://github.com/CccccJin/affordable-drug-alternatives',
      },
      {
        label: 'Demo',
        href: 'https://CccccJin.github.io/affordable-drug-alternatives/',
      },
      { label: 'Details', href: '#projects' },
    ],
  },
  {
    title: 'Human-Robot Collaboration with UR5e',
    description:
      "Master's research project studying how robot speed, proximity, and task pacing affect human-robot collaboration in a UR5e tool-delivery task. The study involved experimental design, participant trials, robot motion planning, and statistical analysis.",
    tech: ['UR5e', 'ROS', 'MoveIt', 'R', 'ANOVA', 'Human-Robot Interaction'],
    links: [
      {
        label: 'GitHub',
        href: 'https://github.com/CccccJin/ur5e-hrc-project',
      },
      { label: 'Demo', href: '#projects' },
      { label: 'Details', href: '#projects' },
    ],
  },
  {
    title: 'SO-ARM101 Robot Learning Prototype',
    description:
      'Hands-on robot learning prototype using a leader-follower SO-ARM101 setup for teleoperation, imitation learning, ACT/VLA-style experimentation, and robot data collection.',
    tech: [
      'Python',
      'LeRobot',
      'Teleoperation',
      'Imitation Learning',
      'ACT',
      'VLA',
      'Ubuntu',
    ],
    links: [
      {
        label: 'GitHub',
        href: 'https://github.com/CccccJin/so-arm101-robot-learning',
      },
      { label: 'Demo', href: '#projects' },
      { label: 'Details', href: '#projects' },
    ],
  },
  {
    title: 'Auckland Transport Computer Vision / Dashboard Work',
    description:
      'Computer vision and dashboard engineering work involving image annotation, model evaluation, transport data visualization, and full-stack dashboard development.',
    tech: [
      'Python',
      'React',
      'TypeScript',
      'Next.js',
      'Docker',
      'Kubernetes',
      'Azure',
      'Computer Vision',
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
      'A learning-oriented project to understand Transformer architecture, tokenization, training loops, loss curves, and small-scale language model training from scratch.',
    tech: ['Python', 'PyTorch', 'Transformer', 'Tokenization', 'CUDA'],
    links: [
      {
        label: 'GitHub',
        href: 'https://github.com/CccccJin/train-llm-from-scratch',
      },
      { label: 'Demo', href: '#projects' },
      { label: 'Details', href: '#projects' },
    ],
  },
]
