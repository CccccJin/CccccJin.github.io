export type SkillGroup = {
  category: string
  items: string[]
}

export const skillGroups: SkillGroup[] = [
  {
    category: 'Programming',
    items: ['Python', 'TypeScript', 'JavaScript', 'C++', 'R'],
  },
  {
    category: 'AI / ML',
    items: [
      'PyTorch',
      'TensorFlow',
      'Scikit-learn',
      'OpenCV',
      'YOLOv8',
      'ChemBERTa',
      'Transformer fundamentals',
      'imitation learning',
      'reinforcement learning basics',
    ],
  },
  {
    category: 'Robotics',
    items: [
      'ROS',
      'Gazebo',
      'MoveIt',
      'UR5e',
      'Robotiq 85',
      'teleoperation',
      'robot data collection',
      'human-robot interaction',
    ],
  },
  {
    category: 'Web / Software',
    items: [
      'React',
      'Next.js',
      'Vite',
      'FastAPI',
      'REST APIs',
      'Docker',
      'Git',
      'Linux/Ubuntu',
    ],
  },
  {
    category: 'Data',
    items: [
      'DuckDB',
      'MongoDB',
      'Vertica',
      'Pandas',
      'NumPy',
      'Matplotlib',
      'Seaborn',
      'data visualization',
      'statistical analysis',
      'ANOVA',
    ],
  },
  {
    category: 'Engineering',
    items: [
      'troubleshooting',
      'field service',
      'equipment diagnostics',
      'calibration',
      'signal and waveform analysis',
      'customer-facing engineering',
      'documentation',
    ],
  },
]
