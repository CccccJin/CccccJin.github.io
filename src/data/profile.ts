export type ProfileLink = {
  label: string
  href: string
}

export const profile = {
  name: 'Changjin He',
  chineseName: '何昌劲',
  avatarSrc: './avatar.jpg?v=20260623-1848',
  avatarAlt: 'Portrait of Changjin He',
  title:
    'Mechatronics Engineer | Robotics & Embodied AI | Computer Vision | Full-stack Prototyping',
  intro:
    'I build practical robotics, computer vision, and AI/software prototypes that connect sensing, control, data, and deployment. My background combines mechatronics research, full-stack engineering, computer vision validation, and field diagnostics for complex industrial equipment. Outside engineering, I like photography, swimming, and running.',
  about: [
    'I completed a Master of Mechatronics Engineering (Research) at the University of Auckland, focused on human-robot collaboration, UR5e control, robot speed and distance adaptation, and experimental evaluation of user experience.',
    'My engineering work spans ROS/MoveIt robot control, computer vision model validation, React/TypeScript dashboards, FastAPI data services, chemical similarity search, and hardware/software troubleshooting in semiconductor and FPD equipment environments.',
    'I am interested in robotics, embodied AI, computer vision, and practical AI systems that work outside ideal demos, where perception, motion, interfaces, data pipelines, and deployment constraints have to fit together.',
  ],
  links: [
    {
      label: 'Email',
      href: 'mailto:che917@aucklanduni.ac.nz',
    },
    {
      label: 'GitHub',
      href: 'https://github.com/CccccJin',
    },
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/changjin-he-908a2531a/',
    },
    {
      label: 'CV',
      href: './cv-placeholder.pdf',
    },
  ] satisfies ProfileLink[],
}

export const education = {
  entries: [
    {
      degree: 'Master of Mechatronics Engineering (Research)',
      institution: 'University of Auckland',
      location: 'Auckland, New Zealand',
      period: 'Jul 2024 - Feb 2026',
      details: [
        'Research focus: emotion-aware human-robot collaboration with UR5e, robot speed and distance adaptation, controlled experiments, user workload/perception evaluation, and statistical analysis.',
        'Relevant coursework: Human-Robot Interaction, Robotics and Society, Multivariable Control Systems, Advanced Control.',
      ],
    },
  ],
}
