import type { Localized } from '../i18n'

export type ProjectLink = {
  label: Localized
  href: string
}

export type Project = {
  title: Localized
  /** Short label rendered on the generated thumbnail. */
  thumb: string
  /** Accent hue (0-360) used by the generated thumbnail. */
  hue: number
  /** Looping demo video shown instead of the generated thumbnail. */
  video?: {
    src: string
    poster: string
  }
  tagline: Localized
  tech: string[]
  links: ProjectLink[]
  /** Shown when code cannot be public (research / internal work). */
  note?: Localized
}

export const projects: Project[] = [
  {
    title: {
      en: 'SO-ARM101: Robot Learning from Teleoperation to VLA Fine-Tuning',
      zh: 'SO-ARM101:从遥操作到 VLA 微调的机器人学习',
    },
    thumb: 'SO-ARM101 · VLA',
    hue: 288,
    video: {
      src: './videos/so-arm101.mp4',
      poster: './videos/so-arm101-poster.jpg',
    },
    tagline: {
      en: 'A personal research project building the full robot-learning loop on a real SO-ARM101 arm: teleoperated data collection, imitation learning, VLA fine-tuning, and RL on hardware.',
      zh: '一个个人研究项目,尝试在一台真实的 SO-ARM101 机械臂上跑通完整的机器人学习闭环:遥操作数据采集、模仿学习、VLA 微调与真机强化学习。',
    },
    tech: [
      'LeRobot',
      'ACT',
      'π0 (VLA)',
      'PyTorch',
      'Imitation Learning',
      'Reinforcement Learning',
      'Teleoperation',
      'CUDA / mixed precision',
    ],
    links: [],
    note: {
      en: 'Personal research project, Mar 2026 – present.',
      zh: '个人研究项目,2026 年 3 月至今。',
    },
  },
  {
    title: {
      en: 'Emotion-Aware Human-Robot Collaboration with UR5e',
      zh: '情绪感知的 UR5e 人机协作',
    },
    thumb: 'UR5e · ROS',
    hue: 244,
    tagline: {
      en: 'How should a robot adapt its speed and distance to the human working next to it? A controlled user study on a physical UR5e.',
      zh: '机械臂与人共同工作时,应当如何调整自己的速度与距离?在真实 UR5e 上开展的对照用户实验。',
    },
    tech: ['UR5e', 'ROS', 'MoveIt', 'Gazebo', 'Robotiq 85', 'Python', 'R'],
    links: [],
    note: {
      en: "Master's research thesis, University of Auckland — write-up available on request.",
      zh: '奥克兰大学硕士研究课题,论文可应要求提供。',
    },
  },
  {
    title: {
      en: 'Intelligent Transport Computer Vision & Operations Dashboard',
      zh: '智能交通计算机视觉与运营看板',
    },
    thumb: 'YOLOv8 · CV',
    hue: 200,
    tagline: {
      en: 'Model validation and an internal operations dashboard for computer-vision-based transport monitoring at Auckland Transport.',
      zh: '在 Auckland Transport 参与基于视觉的交通监测工作:模型验证,以及内部运营看板的设计与开发。',
    },
    tech: ['Python', 'YOLOv8', 'React', 'Next.js', 'TypeScript', 'Docker', 'Vertica', 'MongoDB', 'DuckDB'],
    links: [],
    note: {
      en: 'Internal production work at Auckland Transport — code not public.',
      zh: 'Auckland Transport 内部生产项目,代码不便公开。',
    },
  },
  {
    title: {
      en: 'Affordable Drug Alternatives',
      zh: '平价药物替代检索',
    },
    thumb: 'ChEMBL · RDKit',
    hue: 158,
    tagline: {
      en: 'Similarity search over millions of ChEMBL compounds to surface lower-cost alternatives to expensive drugs.',
      zh: '在数百万 ChEMBL 化合物中进行相似性检索,尝试为昂贵药物找到更平价的替代选项。',
    },
    tech: ['FastAPI', 'DuckDB', 'RDKit', 'ChemBERTa', 'React', 'TypeScript', 'Vite'],
    links: [
      {
        label: { en: 'code', zh: '代码' },
        href: 'https://github.com/CccccJin/Affordable-Drug-Alternatives',
      },
      {
        label: { en: 'demo', zh: '演示' },
        href: 'https://cccccjin.github.io/Affordable-Drug-Alternatives/',
      },
    ],
  },
  {
    title: {
      en: 'Training a Language Model from Scratch',
      zh: '从零训练一个语言模型',
    },
    thumb: 'GPT · PyTorch',
    hue: 24,
    tagline: {
      en: 'A GPT-style transformer implemented and trained from scratch to understand what the libraries hide.',
      zh: '从零实现并训练一个 GPT 风格的 Transformer,想弄明白那些被框架封装起来的细节。',
    },
    tech: ['Python', 'PyTorch', 'Transformers', 'CUDA'],
    links: [],
    note: {
      en: 'Learning-focused implementation — happy to walk through the code in an interview.',
      zh: '以学习为目的的实现,欢迎在面试中一起讨论代码。',
    },
  },
]
