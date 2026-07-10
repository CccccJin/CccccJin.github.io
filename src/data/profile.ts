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
  email: 'che917@aucklanduni.ac.nz',
  links: [
    { label: 'CV', href: './cv-placeholder.pdf' },
    { label: 'Email', href: 'mailto:che917@aucklanduni.ac.nz' },
    { label: 'GitHub', href: 'https://github.com/CccccJin', external: true },
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/changjin-he-908a2531a/',
      external: true,
    },
  ] satisfies ProfileLink[],
}

export type NewsItem = {
  date: string
  text: string
  href?: string
  linkText?: string
}

export const news: NewsItem[] = [
  {
    date: '03/2026',
    text: 'Started a personal research project on robot learning with the SO-ARM101: teleoperated data collection, π0 (VLA) fine-tuning, and RL on real hardware.',
  },
  {
    date: '02/2026',
    text: 'Completed my Master of Mechatronics Engineering (Research) at the University of Auckland.',
  },
  {
    date: '11/2025',
    text: 'Joined Auckland Transport as a Computer Vision Intern, working on intelligent transport systems.',
  },
  {
    date: '05/2025',
    text: 'Joined Cloudcell as a Software Development Intern, building a drug similarity-search platform over ChEMBL.',
    href: 'https://cccccjin.github.io/Affordable-Drug-Alternatives/',
    linkText: 'demo',
  },
  {
    date: '03/2025',
    text: 'Graduate Teaching Assistant for MECHENG 313 at the University of Auckland.',
  },
  {
    date: '01/2025',
    text: 'Joined the Industrial AI Group at the University of Auckland for my master’s research on emotion-aware human-robot collaboration with a UR5e.',
  },
]

