// CV Data - Structured content from CV.md

export type Education = {
  institution: string
  degree: string
  location: string
  period: string
  gpa?: string
  thesis?: string
  details?: string[]
}

export type WorkExperience = {
  company: string
  position: string
  location: string
  period: string
  responsibilities: string[]
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
    thesis:
      'Physical Adversarial Attacks Using Fan-Based Holographic Projections',
    details: [
      'Relevant Coursework: IoT Security, Network Security, Embedded Systems & Security, Smart Card Laboratory, IoT Remote Lab, Software Architecture Design for Distributed Embedded Systems',
    ],
  },
  {
    institution: 'Hack The Box Academy',
    degree: 'Cybersecurity Trainee',
    location: '',
    period: 'May 2025 – Present',
    details: [
      'Completed Hack The Box job-role paths: Penetration Tester and Junior Cybersecurity Analyst, with hands-on labs covering the full assessment workflow from reconnaissance to reporting.',
      'Focus areas proved by completed paths and modules: web exploitation (auth/session testing, input validation, XSS/SQLi, IDOR), Active Directory enumeration and attack paths, Linux/Windows privilege escalation, password/authentication attacks, network enumeration and traffic analysis.',
      'Outcomes: produced step-by-step write-ups, PoCs, and reusable playbooks; standardized checklists and report snippets aligned with OWASP WSTG/Top 10 and ATT&CK; practiced detection-aware operations and basic OPSEC in lab environments.',
      'Tooling practiced: Kali Linux, Burp Suite, OWASP ZAP, Nmap, Metasploit, Wireshark, ffuf, sqlmap, John the Ripper, Hashcat, Nessus, BloodHound, Impacket; automation with Python and Bash.',
    ],
  },
  {
    institution: 'Istanbul Technical University',
    degree: 'B.Sc. in Electronics and Communications Engineering',
    location: 'Istanbul, Turkey',
    period: 'Jul. 2023',
    gpa: '3.4/4.0',
    thesis: 'ESP8266 Ad Hoc Mesh for Real-Time Swarm Coordination',
  },
]

// Work Experience
export const workExperience: WorkExperience[] = [
  {
    company: 'German Aerospace Center (DLR)',
    position: 'Cybersecurity Research Intern',
    location: 'Munich, Germany',
    period: 'Aug. 2024 – Nov. 2024',
    responsibilities: [
      'Conducted an offensive protocol assessment of SpaceWire, enumerated trust boundaries, and identified missing authentication/encryption and protocol weaknesses; outlined paths and mitigations.',
      'Built an adversary-centric threat model and attack-surface map for on-board networks; profiled attacker capabilities and preconditions to prioritize likely exploitation chains.',
      'Implemented adversary emulation in OMNeT++ to replay, spoof, inject, and disrupt traffic; captured evidence to demonstrate impact on integrity, availability and command authenticity.',
    ],
  },
  {
    company: 'Saportif Technology Inc.',
    position: 'IoT Systems Engineer',
    location: 'Istanbul, Turkey',
    period: 'Sep. 2022 – Sep. 2023',
    responsibilities: [
      'Developed an end-to-end IoT system with ESP32 and Raspberry Pi for a smart door-lock in shared offices, integrating sensors, actuators, RFID access control, and cloud-backed web interfaces.',
      'Secured the integration layer with HTTPS/TLS and authenticated REST APIs; mapped RFID identities to role-based access control and enforced server-side authorization for bookings and device commands.',
      'Implemented input validation, parameterized requests, rate limiting, and audit logging; documented issues using OWASP Top 10 categories to prioritize remediation.',
    ],
  },
  {
    company: 'Saportif Technology Inc.',
    position: 'Full-Stack Developer',
    location: 'Istanbul, Turkey',
    period: 'Oct. 2020 – Sep. 2022',
    responsibilities: [
      'Built and maintained React and Node services with secure-by-default patterns and peer code reviews.',
      'Implemented authentication and session controls (RBAC, JWT, secure cookies), CSRF protection, and XSS mitigations including output encoding and CSP.',
      'Hardened REST APIs with input validation, parameterized queries, security headers, and structured error handling; controls aligned with OWASP Top 10 and WSTG.',
    ],
  },
  {
    company: 'Arcelik Inc.',
    position: 'Software Engineer Intern',
    location: 'Istanbul, Turkey',
    period: 'Jul. 2022 – Sep. 2022',
    responsibilities: [
      'Built a Python test library that created a software-based virtual testing environment and removed reliance on hardware simulators.',
      'Achieved approximately 80% faster test execution on refrigerator control boards with reusable, automated test algorithms.',
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
  linkedin: 'https://linkedin.com/in/mevlutyildirim', // Update if different
}
