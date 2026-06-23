export type ProfileLink = {
  label: string
  href: string
}

export const profile = {
  name: 'Changjin He',
  chineseName: '何昌劲',
  title:
    'Mechatronics Engineer | Robotics & AI | Computer Vision | Full-stack Prototyping',
  intro:
    'I am a Master of Mechatronics Engineering graduate from the University of Auckland, interested in robotics, embodied AI, computer vision, and practical AI systems. My work spans human-robot collaboration, robot learning prototypes, computer vision systems, and full-stack engineering.',
  about: [
    'I hold a Master of Mechatronics Engineering from the University of Auckland, with interests across robotics, embodied AI, vision-language-action systems, imitation learning, computer vision, and human-robot collaboration.',
    'My background combines practical engineering experience with software development, data systems, and robotics prototyping. I have worked across field service engineering, dashboard and API development, model evaluation workflows, and hands-on robot learning experiments.',
    'I am focused on building reliable robotic and AI systems that can operate under real-world constraints, where sensing, software, hardware, users, and deployment conditions all matter.',
  ],
  contactIntro:
    'I am open to opportunities in robotics, AI engineering, computer vision, and software engineering.',
  links: [
    {
      label: 'Email',
      href: 'mailto:TODO-email@example.com',
    },
    {
      label: 'GitHub',
      href: 'https://github.com/CccccJin',
    },
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/TODO-linkedin-profile',
    },
    {
      label: 'CV',
      href: './cv-placeholder.pdf',
    },
  ] satisfies ProfileLink[],
}

export const education = {
  degree: 'Master of Mechatronics Engineering',
  institution: 'University of Auckland',
  focus:
    'Research focus: Human-Robot Collaboration, UR5e, robot speed/proximity/task pacing, user study design, and statistical analysis.',
  additionalNote:
    'Additional engineering and mechatronics-related background can be added here when exact school and dates are ready.',
}
