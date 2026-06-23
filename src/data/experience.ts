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
    role: 'Computer Vision Intern',
    location: 'Auckland, New Zealand',
    period: 'Nov 2025 - Feb 2026',
    highlights: [
      'Validated training data and ground truth for intelligent transport computer vision use cases, covering annotation review, model testing, issue reporting, and documentation.',
      'Supported fine-tuned YOLOv8 model delivery workflows using Git, Docker, and cloud-based development practices.',
      'Designed and developed an internal operations dashboard with React, Next.js, TypeScript, custom APIs, Vertica, MongoDB, and DuckDB.',
      'Documented deployment behavior, validation findings, dashboard outputs, and technical issues for handoff between software, data, and operational stakeholders.',
    ],
  },
  {
    company: 'Cloudcell',
    role: 'Software Development Intern',
    location: 'Auckland, New Zealand',
    period: 'May 2025 - Oct 2025',
    highlights: [
      'Developed a drug similarity search platform with FastAPI, DuckDB, RDKit, and React/TypeScript for large-scale ChEMBL compound exploration.',
      'Integrated ChemBERTa-based molecular embeddings and similarity scoring workflows for semantic search, molecular filtering, ranking, clustering, export, and pricing comparison.',
      'Translated complex chemical-data processing into usable prototype functionality with attention to testing, documentation, and user-facing engineering value.',
    ],
  },
  {
    company: 'University of Auckland',
    role: 'Graduate Teaching Assistant, MECHENG 313',
    location: 'Auckland, New Zealand',
    period: 'Mar 2025 - Jun 2025',
    highlights: [
      'Supported undergraduate mechatronics teaching through lab and tutorial assistance, helping students connect engineering theory with practical implementation.',
    ],
  },
  {
    company: 'Axcelis Technologies, Inc.',
    role: 'Field Service Engineer',
    location: 'Shenzhen, China',
    period: 'Jun 2023 - Jun 2024',
    highlights: [
      'Installed, diagnosed, maintained, and repaired complex semiconductor equipment in customer-facing field environments.',
      'Tested and certified equipment operating performance and system quality after service activities.',
      'Supported hardware, software, PC, network, and wireless-network troubleshooting across field service cases.',
      'Delivered customer training on equipment operation and maintenance procedures.',
    ],
  },
  {
    company: 'Nikon Precision Shanghai Co., Ltd.',
    role: 'Field Service Engineer',
    location: 'Shenzhen, China',
    period: 'Jul 2019 - Aug 2022',
    highlights: [
      'Supported FPD equipment diagnostics, calibration, maintenance, and customer-facing troubleshooting.',
      'Analyzed system logs and waveform data, applying signal-analysis methods such as Fourier Transform to investigate equipment issues.',
      'Tuned filters and calibration settings, including feedforward, notch, and peak filters, to improve equipment behavior during troubleshooting.',
      'Collected multi-channel waveform logs and analyzed vibration and overlay anomalies using data acquisition systems and compensation-value trends.',
    ],
  },
]
