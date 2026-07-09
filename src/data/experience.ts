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
    period: 'Nov 2025 – Feb 2026',
    highlights: [
      'Validated training data and ground truth for intelligent-transport computer vision use cases — annotation review, model testing, and structured issue reporting that fed model iterations.',
      'Supported fine-tuned YOLOv8 model delivery using Git, Docker, and cloud-based development workflows.',
      'Designed and built an internal operations dashboard with React, Next.js, TypeScript, and custom APIs over Vertica, MongoDB, and DuckDB.',
      'Documented deployment behavior and validation findings for handoff between software, data, and operations stakeholders.',
    ],
  },
  {
    company: 'Cloudcell',
    role: 'Software Development Intern',
    location: 'Auckland, New Zealand',
    period: 'May 2025 – Oct 2025',
    highlights: [
      'Built a drug similarity-search platform with FastAPI, DuckDB, RDKit, and React/TypeScript for exploring the large-scale ChEMBL compound database.',
      'Integrated ChemBERTa molecular embeddings for semantic search, filtering, ranking, clustering, export, and price comparison.',
      'Turned complex chemical-data processing into a usable prototype, with attention to testing, documentation, and end-user value.',
    ],
  },
  {
    company: 'University of Auckland',
    role: 'Graduate Teaching Assistant · MECHENG 313',
    location: 'Auckland, New Zealand',
    period: 'Mar 2025 – Jun 2025',
    highlights: [
      'Ran labs and tutorials for undergraduate mechatronics, helping students connect control theory with working implementations.',
    ],
  },
  {
    company: 'Axcelis Technologies',
    role: 'Field Service Engineer',
    location: 'Shenzhen, China',
    period: 'Jun 2023 – Jun 2024',
    highlights: [
      'Installed, diagnosed, and repaired ion-implantation semiconductor equipment on customer sites, then tested and certified system performance after every intervention.',
      'Troubleshot across the full stack — hardware, software, PC, and network — under production-downtime pressure.',
      'Trained customer engineers on equipment operation and maintenance procedures.',
    ],
  },
  {
    company: 'Nikon Precision Shanghai',
    role: 'Field Service Engineer',
    location: 'Shenzhen, China',
    period: 'Jul 2019 – Aug 2022',
    highlights: [
      'Diagnosed FPD lithography equipment issues from system logs and multi-channel waveform data, applying Fourier analysis to isolate vibration and overlay anomalies.',
      'Tuned feedforward, notch, and peak filters and calibration settings to bring equipment back into specification.',
      'Owned customer-facing troubleshooting, calibration, and maintenance across multi-year engagements.',
    ],
  },
]
