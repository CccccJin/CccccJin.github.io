export type SkillGroup = {
  category: string
  /** One-line statement of actual depth — not just a list of names. */
  depth: string
  items: string[]
}

export const skillGroups: SkillGroup[] = [
  {
    category: 'Programming Languages',
    depth: 'Python and TypeScript daily; C++ for robotics, R for statistical analysis.',
    items: ['Python', 'TypeScript', 'JavaScript', 'C++', 'R'],
  },
  {
    category: 'Robotics',
    depth: 'Motion planning and control on a physical UR5e, from simulation to real-world user studies.',
    items: ['ROS', 'MoveIt', 'Gazebo', 'UR5e', 'Robotiq 85', 'Teleoperation', 'HRI experiment design'],
  },
  {
    category: 'Machine Learning',
    depth: 'Transformer internals implemented from scratch in PyTorch; applied embeddings and fine-tuning.',
    items: ['PyTorch', 'Transformers', 'ChemBERTa', 'TensorFlow', 'scikit-learn', 'Imitation & RL basics'],
  },
  {
    category: 'Computer Vision',
    depth: 'Dataset validation, model testing, and delivery workflows for object detection in production.',
    items: ['YOLOv8', 'OpenCV', 'Annotation review', 'Model evaluation'],
  },
  {
    category: 'Backend & Data',
    depth: 'API and data services over analytical and document stores, at ChEMBL scale.',
    items: ['FastAPI', 'REST APIs', 'DuckDB', 'MongoDB', 'Vertica', 'RDKit', 'Pandas', 'NumPy'],
  },
  {
    category: 'Frontend',
    depth: 'Data-heavy dashboards and search interfaces in React and Next.js.',
    items: ['React', 'Next.js', 'Vite', 'Data visualization'],
  },
  {
    category: 'Tools & Infrastructure',
    depth: 'Comfortable in Linux-first, containerized, CI-driven development environments.',
    items: ['Docker', 'Git', 'GitHub Actions', 'Linux / Ubuntu'],
  },
  {
    category: 'Research Methods',
    depth: 'Controlled human-subject experiments and signal-level diagnostics of physical systems.',
    items: ['Repeated-measures ANOVA', 'NASA-TLX', 'Godspeed', 'Fourier / waveform analysis', 'Data acquisition'],
  },
]
