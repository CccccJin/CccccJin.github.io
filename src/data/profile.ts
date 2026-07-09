export type ProfileLink = {
  label: string
  href: string
  external?: boolean
}

export const profile = {
  name: 'Changjin He',
  chineseName: '何昌劲',
  avatarSrc: './avatar.jpg',
  avatarAlt: 'Portrait of Changjin He',
  location: 'Auckland, New Zealand',
  availability: 'Open to AI / ML, robotics, computer vision, and software roles',
  role: 'Robotics & AI engineer working across human-robot collaboration, computer vision, and ML systems.',
  intro:
    'I built the full stack of a human-robot collaboration study on a physical UR5e — ROS/MoveIt control, experiment design, statistical analysis — validated YOLOv8 pipelines for intelligent transport at Auckland Transport, and shipped a full-stack similarity-search product over millions of ChEMBL compounds. Before that, five years of diagnosing semiconductor and FPD equipment in the field taught me how systems fail outside the lab.',
  email: 'che917@aucklanduni.ac.nz',
  cvHref: './cv-placeholder.pdf',
  links: [
    {
      label: 'GitHub',
      href: 'https://github.com/CccccJin',
      external: true,
    },
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/changjin-he-908a2531a/',
      external: true,
    },
    {
      label: 'Email',
      href: 'mailto:che917@aucklanduni.ac.nz',
    },
  ] satisfies ProfileLink[],
}

export type Highlight = {
  title: string
  body: string
}

export const highlights: Highlight[] = [
  {
    title: 'Robots outside simulation',
    body: 'ROS/MoveIt motion control and a controlled user study on a physical UR5e — from Gazebo validation to real-robot experiments with human participants.',
  },
  {
    title: 'Vision in production settings',
    body: 'Dataset validation, YOLOv8 model testing, and delivery workflows for intelligent transport systems at Auckland Transport.',
  },
  {
    title: 'ML from first principles',
    body: 'A GPT-style transformer, tokenizer, and training loop implemented directly in PyTorch — not just called from a library.',
  },
  {
    title: 'Field-proven debugging',
    body: 'Five years diagnosing semiconductor and FPD equipment: signal analysis, calibration, and troubleshooting under real-world constraints.',
  },
]

export type EducationEntry = {
  degree: string
  institution: string
  location: string
  period: string
  details: string[]
}

export const education: EducationEntry[] = [
  {
    degree: 'Master of Mechatronics Engineering (Research)',
    institution: 'University of Auckland',
    location: 'Auckland, New Zealand',
    period: 'Jul 2024 – Feb 2026',
    details: [
      'Thesis: emotion-aware human-robot collaboration with a UR5e — robot speed and distance adaptation, controlled experiments, workload and perception evaluation, and statistical analysis.',
      'Coursework: Human-Robot Interaction, Robotics and Society, Multivariable Control Systems, Advanced Control.',
    ],
  },
]
