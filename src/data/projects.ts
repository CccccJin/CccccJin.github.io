export type ProjectLink = {
  label: string
  href: string
}

export type Project = {
  title: string
  /** Short label rendered on the generated thumbnail. */
  thumb: string
  /** Accent hue (0-360) used by the generated thumbnail. */
  hue: number
  /** Looping demo video shown instead of the generated thumbnail. */
  video?: {
    src: string
    poster: string
  }
  tagline: string
  highlights: string[]
  tech: string[]
  links: ProjectLink[]
  /** Shown when code cannot be public (research / internal work). */
  note?: string
}

export const projects: Project[] = [
  {
    title: 'SO-ARM101: Robot Learning from Teleoperation to VLA Fine-Tuning',
    thumb: 'SO-ARM101 · VLA',
    hue: 288,
    video: {
      src: './videos/so-arm101.mp4',
      poster: './videos/so-arm101-poster.jpg',
    },
    tagline:
      'A personal research project building the full robot-learning loop on a real SO-ARM101 arm: teleoperated data collection, imitation learning, VLA fine-tuning, and RL on hardware.',
    highlights: [],
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
    note: 'Personal research project, Mar 2026 – present.',
  },
  {
    title: 'Emotion-Aware Human-Robot Collaboration with UR5e',
    thumb: 'UR5e · ROS',
    hue: 244,
    tagline:
      'How should a robot adapt its speed and distance to the human working next to it? A controlled user study on a physical UR5e.',
    highlights: [],
    tech: ['UR5e', 'ROS', 'MoveIt', 'Gazebo', 'Robotiq 85', 'Python', 'R'],
    links: [],
    note: "Master's research thesis, University of Auckland — write-up available on request.",
  },
  {
    title: 'Intelligent Transport Computer Vision & Operations Dashboard',
    thumb: 'YOLOv8 · CV',
    hue: 200,
    tagline:
      'Model validation and an internal operations dashboard for computer-vision-based transport monitoring at Auckland Transport.',
    highlights: [],
    tech: ['Python', 'YOLOv8', 'React', 'Next.js', 'TypeScript', 'Docker', 'Vertica', 'MongoDB', 'DuckDB'],
    links: [],
    note: 'Internal production work at Auckland Transport — code not public.',
  },
  {
    title: 'Affordable Drug Alternatives',
    thumb: 'ChEMBL · RDKit',
    hue: 158,
    tagline:
      'Similarity search over millions of ChEMBL compounds to surface lower-cost alternatives to expensive drugs.',
    highlights: [],
    tech: ['FastAPI', 'DuckDB', 'RDKit', 'ChemBERTa', 'React', 'TypeScript', 'Vite'],
    links: [
      { label: 'code', href: 'https://github.com/CccccJin/Affordable-Drug-Alternatives' },
      { label: 'demo', href: 'https://cccccjin.github.io/Affordable-Drug-Alternatives/' },
    ],
  },
  {
    title: 'Training a Language Model from Scratch',
    thumb: 'GPT · PyTorch',
    hue: 24,
    tagline:
      'A GPT-style transformer implemented and trained from scratch to understand what the libraries hide.',
    highlights: [],
    tech: ['Python', 'PyTorch', 'Transformers', 'CUDA'],
    links: [],
    note: 'Learning-focused implementation — happy to walk through the code in an interview.',
  },
]
