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
    highlights: [
      'Built the full ROS/MoveIt control stack — pick-and-place planning, trajectory execution, Robotiq 85 gripper and conveyor integration — validated in Gazebo before real-robot deployment.',
      'Designed and ran a repeated-measures user study varying robot speed and interaction distance, measuring task performance, workload (NASA-TLX), and perception (Godspeed).',
      'Quantified how motion parameters shape human experience in shared workspaces using repeated-measures ANOVA in R.',
    ],
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
    highlights: [
      'Validated training data and ground truth for YOLOv8 detection use cases: annotation review, model testing, and structured issue reporting that fed directly into model iterations.',
      'Designed and built an internal operations dashboard with React, Next.js, and TypeScript, backed by custom APIs over Vertica, MongoDB, and DuckDB.',
      'Worked inside production delivery workflows — Git, Docker, cloud-based development — and documented deployment behavior for handoff across software, data, and operations teams.',
    ],
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
    highlights: [
      'Built a FastAPI + DuckDB backend combining RDKit structural fingerprints with ChemBERTa embeddings for structural and semantic similarity search over ChEMBL 35.',
      'Shipped a React/TypeScript frontend for compound search, filtering, ranking, clustering, export, and price comparison.',
      'Split the system into a static GitHub Pages demo for exploration and a backend-powered dynamic workflow for the heavy cheminformatics — a deliberate deployment trade-off.',
    ],
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
    highlights: [
      'Implemented tokenization, multi-head attention, transformer blocks, and the full training loop directly in PyTorch.',
      'Ran small-scale GPU training experiments, tracking loss curves and diagnosing optimization behavior along the way.',
    ],
    tech: ['Python', 'PyTorch', 'Transformers', 'CUDA'],
    links: [],
    note: 'Learning-focused implementation — happy to walk through the code in an interview.',
  },
]
