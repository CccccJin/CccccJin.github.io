export type Experience = {
  company: string
  role: string
  location?: string
  period: string
  highlights: string[]
}

export const experiences: Experience[] = [
  {
    company: 'Auckland Transport',
    role: 'Intern',
    period: 'Recent experience',
    highlights: [
      'Worked on computer vision model evaluation and image annotation workflows.',
      'Developed dashboard interfaces with React, TypeScript, and Next.js.',
      'Integrated data and APIs for transport data visualization and internal tools.',
      'Gained exposure to Docker, Kubernetes, Azure, documentation, and engineering workflow.',
    ],
  },
  {
    company: 'Cloudcell',
    role: 'Software Development Intern',
    period: 'Prior experience',
    highlights: [
      'Contributed to backend and visualization work for data-driven software features.',
      'Worked on fingerprint-related functionality and API/data workflows.',
      'Supported scalable feature development with practical implementation and testing.',
    ],
  },
  {
    company: 'Axcelis Technologies',
    role: 'Field Service Engineer',
    period: 'Prior experience',
    highlights: [
      'Supported installation, diagnostics, maintenance, and customer-facing engineering.',
      'Worked in semiconductor equipment environments with structured troubleshooting.',
      'Followed quality processes while diagnosing equipment issues and supporting customers.',
    ],
  },
  {
    company: 'Nikon Precision Shanghai',
    role: 'Field Service Engineer',
    period: 'Prior experience',
    highlights: [
      'Provided FPD equipment support, diagnostics, calibration, and customer-facing engineering.',
      'Troubleshot motion, control, and equipment performance issues in the field.',
      'Built practical experience connecting mechanical, electrical, control, and service workflows.',
    ],
  },
]
