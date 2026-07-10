import type { Localized } from '../i18n'

export type ProfileLink = {
  label: Localized
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
    { label: { en: 'CV', zh: '简历' }, href: './CV_ChangjinHe_English.pdf' },
    { label: { en: 'Email', zh: '邮箱' }, href: 'mailto:che917@aucklanduni.ac.nz' },
    { label: { en: 'GitHub', zh: 'GitHub' }, href: 'https://github.com/CccccJin', external: true },
    {
      label: { en: 'LinkedIn', zh: '领英' },
      href: 'https://www.linkedin.com/in/changjin-he-908a2531a/',
      external: true,
    },
  ] satisfies ProfileLink[],
}

export type NewsItem = {
  date: string
  text: Localized
  href?: string
  linkText?: Localized
}

export const news: NewsItem[] = [
  {
    date: '03/2026',
    text: {
      en: 'Started a personal research project on robot learning with the SO-ARM101: teleoperated data collection, π0 (VLA) fine-tuning, and RL on real hardware.',
      zh: '开始了一个机器人学习方向的个人研究项目:基于 SO-ARM101 的遥操作数据采集、π0(VLA)微调与真机强化学习。',
    },
  },
  {
    date: '02/2026',
    text: {
      en: 'Completed my Master of Mechatronics Engineering (Research) at the University of Auckland.',
      zh: '完成了奥克兰大学机电工程研究型硕士学位。',
    },
  },
  {
    date: '11/2025',
    text: {
      en: 'Joined Auckland Transport as a Computer Vision Intern, working on intelligent transport systems.',
      zh: '加入 Auckland Transport 担任计算机视觉实习生,参与智能交通系统相关工作。',
    },
  },
  {
    date: '05/2025',
    text: {
      en: 'Joined Cloudcell as a Software Development Intern, building a drug similarity-search platform over ChEMBL.',
      zh: '加入 Cloudcell 担任软件开发实习生,参与搭建基于 ChEMBL 的药物相似性检索平台。',
    },
    href: 'https://cccccjin.github.io/Affordable-Drug-Alternatives/',
    linkText: { en: 'demo', zh: '演示' },
  },
  {
    date: '03/2025',
    text: {
      en: 'Graduate Teaching Assistant for MECHENG 313 at the University of Auckland.',
      zh: '担任奥克兰大学 MECHENG 313 课程的研究生助教。',
    },
  },
  {
    date: '01/2025',
    text: {
      en: 'Joined the Industrial AI Group at the University of Auckland for my master’s research on emotion-aware human-robot collaboration with a UR5e.',
      zh: '加入奥克兰大学 Industrial AI Group,开展情绪感知人机协作方向的硕士研究(UR5e)。',
    },
  },
]
