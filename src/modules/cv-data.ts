// CV Data - Structured content from CV.md

export type Education = {
  institution: string
  degree: string
  location: string
  period: string
  gpa?: string
  thesis?: string
  technologies?: string[]
  highlights?: string[]
}

export type WorkExperience = {
  company: string
  position: string
  location: string
  period: string
  technologies?: string[]
  responsibilities: string[]
  highlights?: string[]
  positions?: {
    position: string
    period: string
    technologies?: string[]
    highlights?: string[]
  }[]
}

export type ThesisProject = {
  title: string
  period: string
  description: string
  achievements: string[]
}

export type Certification = {
  name: string
  issuer: string
  date: string
  description?: string
}

export type Award = {
  name: string
  position: string
  organization: string
  year: string
}

// Education
export const education: Education[] = [
  {
    institution: 'Technical University of Munich',
    degree: 'M.Sc. in Communications and Electronics Engineering',
    location: 'Munich, Germany',
    period: 'Dec. 2025',
    gpa: '1.2 (German scale: 1.0 best)',
    thesis: 'Physical Adversarial Attacks Using Fan-Based Holographic Projections',
    technologies: ['IoT Security', 'Network Security', 'Embedded Systems', 'Smart Cards'],
    highlights: [
      'Thesis: Black-box security testing of CV pipelines with holographic projections',
    ],
  },
  {
    institution: 'Hack The Box Academy',
    degree: 'Cybersecurity Trainee',
    location: '',
    period: 'May 2025 – Present',
    technologies: ['Burp Suite', 'Metasploit', 'Kali Linux', 'BloodHound', 'Python'],
    highlights: [
      'Completed Penetration Tester & Junior Security Analyst paths',
      'Hands-on labs: Web exploitation, Active Directory, privilege escalation',
    ],
  },
  {
    institution: 'Istanbul Technical University',
    degree: 'B.Sc. in Electronics and Communications Engineering',
    location: 'Istanbul, Turkey',
    period: 'Jul. 2023',
    gpa: '3.4/4.0',
    thesis: 'ESP8266 Ad Hoc Mesh for Real-Time Swarm Coordination',
    technologies: ['ESP8266', 'ESP-NOW', 'C/C++', 'IoT'],
    highlights: [
      'Thesis: Decentralized mesh network for real-time swarm coordination',
    ],
  },
]

// Work Experience
export const workExperience: WorkExperience[] = [
  {
    company: 'German Aerospace Center (DLR)',
    position: 'Cybersecurity Research Intern',
    location: 'Munich, Germany',
    period: 'Aug. 2024 – Nov. 2024',
    technologies: ['OMNeT++', 'SpaceWire', 'Threat Modeling', 'Protocol Analysis'],
    responsibilities: [],
    highlights: [
      'Offensive protocol assessment of SpaceWire for aerospace networks',
      'Built adversary emulation in OMNeT++ to demonstrate attack paths',
    ],
  },
  {
    company: 'Saportif Technology Inc.',
    position: '', // Left empty for multi-position display
    location: 'Istanbul, Turkey',
    period: 'Oct. 2020 – Sep. 2023',
    responsibilities: [],
    positions: [
      {
        position: 'IoT Systems Engineer',
        period: 'Sep. 2022 – Sep. 2023',
        technologies: ['ESP32', 'Raspberry Pi', 'RFID', 'TLS', 'REST APIs'],
        highlights: [
          'Developed end-to-end IoT smart door-lock system with RFID access control',
          'Secured integration with HTTPS/TLS, RBAC, and OWASP Top 10 compliance',
        ],
      },
      {
        position: 'Full-Stack Developer',
        period: 'Oct. 2020 – Sep. 2022',
        technologies: ['React', 'Node.js', 'JWT', 'PostgreSQL'],
        highlights: [
          'Built and maintained React/Node services with secure-by-default patterns',
          'Implemented auth controls (RBAC, JWT), CSRF protection, and XSS mitigations',
        ],
      },
    ],
  },
  {
    company: 'Arcelik Inc.',
    position: 'Software Engineer Intern',
    location: 'Istanbul, Turkey',
    period: 'Jul. 2022 – Sep. 2022',
    technologies: ['Python', 'Test Automation'],
    responsibilities: [],
    highlights: [
      'Built Python test library for virtual testing environment',
      'Achieved ~80% faster test execution on refrigerator control boards',
    ],
  },
]

// Thesis Projects
export const thesisProjects: ThesisProject[] = [
  {
    title:
      'Physical Adversarial Attacks Using Fan-Based Holographic Projections',
    period: 'May 2025 – Nov. 2025',
    description:
      'Planned and executed black-box security testing of traffic sign computer-vision pipelines; produced a threat model and attack-surface analysis for safety-critical scenarios.',
    achievements: [
      'Built a programmable hardware proof of concept with a holographic POV fan and a repeatable test harness to run real-time experiments and collect evidence for vulnerability assessment.',
      'Quantified evasion/misclassification across lighting, distance, and angle, achieving up to 90% misclassification; delivered steps to reproduce, PoCs, and prioritized mitigations, and documented residual risk.',
    ],
  },
  {
    title: 'ESP8266 Ad Hoc Mesh for Real-Time Swarm Coordination',
    period: 'Oct. 2022 – Jul. 2023',
    description:
      'Built a decentralized ad hoc mesh using ESP8266 & ESP-NOW, removing the ground-station dependency via peer-to-peer links.',
    achievements: [
      'Designed and implemented a real-time swarm coordination algorithm for dynamic environments and multi-node operation.',
      'Evaluated communication reliability and latency under varying node counts and mobility; documented results and limitations.',
    ],
  },
]

// Certifications (from Hack The Box training)
export const certifications: Certification[] = [
  {
    name: 'Penetration Tester Path',
    issuer: 'Hack The Box Academy',
    date: '2025',
    description:
      'Completed comprehensive penetration testing training covering the full assessment workflow from reconnaissance to reporting.',
  },
  {
    name: 'Junior Cybersecurity Analyst Path',
    issuer: 'Hack The Box Academy',
    date: '2025',
    description:
      'Completed cybersecurity analyst training with focus on web exploitation, Active Directory, privilege escalation, and network analysis.',
  },
]

// Honors & Awards
export const awards: Award[] = [
  {
    name: 'IOTSEC CTF I',
    position: '1st place',
    organization: 'TUM',
    year: '2024',
  },
  {
    name: 'IOTSEC CTF II',
    position: '2nd place',
    organization: 'TUM',
    year: '2024',
  },
  {
    name: 'Kaspersky CTF',
    position: '4th place (Europe)',
    organization: 'Kaspersky',
    year: '2025',
  },
]

// Skills & Technologies
export const skills = {
  technologies: [
    'Python',
    'C/C++',
    'Bash',
    'PowerShell',
    'Linux',
    'Kali Linux',
    'Windows',
    'Nmap',
    'Burp Suite',
    'Wireshark',
    'OWASP ZAP',
    'Metasploit',
    'sqlmap',
    'Nessus',
    'BloodHound',
    'Impacket',
    'Windows Active Directory',
  ],
  skills: [
    'Penetration Testing',
    'Vulnerability Assessment',
    'Secure Design Principles',
    'Threat Analysis and Risk Assessment (TARA)',
    'Applied Cryptography',
  ],
  languages: [
    { name: 'Turkish', level: 'Mother tongue' },
    { name: 'English', level: 'C1 (Advanced)' },
    { name: 'German', level: 'B1 (Intermediate)' },
  ],
}

// Contact Information
export const contact = {
  name: 'Mevlüt Yıldırım',
  email: 'yldrmm.mevlut@gmail.com',
  phone: '+49 163 193-1312',
  location: 'Munich, Germany',
  github: 'https://github.com/moolut',
  linkedin: 'https://linkedin.com/in/mevlut-yildirim', // Update if different
}
