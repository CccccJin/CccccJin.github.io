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
      'computer vision',
      'Transformer basics',
      'imitation learning',
      'reinforcement learning basics',
    ],
  },
  {
    category: 'Robotics',
    items: [
      'ROS',
      'MoveIt',
      'UR5e',
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
      'Node.js basics',
      'REST APIs',
      'Docker',
      'Kubernetes basics',
      'Azure exposure',
    ],
  },
  {
    category: 'Data',
    items: [
      'DuckDB',
      'MongoDB',
      'Vertica',
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
      'customer-facing engineering',
      'documentation',
    ],
  },
]
