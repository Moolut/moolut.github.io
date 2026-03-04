// ─── Case File schema ─────────────────────────────────────────────────────────

export type CaseFileStatus = 'COMPLETE' | 'IN PROGRESS' | 'ARCHIVED'
export type CaseFileType = 'THESIS' | 'TOOL' | 'PROJECT' | 'RESEARCH'

export type CaseFile = {
  fileId: string
  slug: string
  type: CaseFileType
  status: CaseFileStatus
  title: string
  year: string
  context: string // "Thesis" | "Open Source" | "Personal" | "Internship"
  problem: string
  approach: string
  result: string
  tags: string[]
  pipeline: string
  tools: string[]
  links: {
    case?: string | null
    github?: string | null
    report?: string | null
    video?: string | null
  }
}

// ─── Projects data ─────────────────────────────────────────────────────────────
// Add new projects here. fileId format: <2-letter prefix>-<3-digit number>

export const caseFiles: CaseFile[] = [
  {
    fileId: 'PA-001',
    slug: 'physical-adversarial-attacks',
    type: 'THESIS',
    status: 'COMPLETE',
    title: 'Physical Adversarial Attacks on Traffic Sign CV Pipelines',
    year: '2025',
    context: 'Thesis',
    problem:
      'CV models misread real road signs under subtle physical perturbations.',
    approach:
      'Holographic overlays projected via POV fan hardware onto signs during live capture.',
    result:
      '90% misclassification rate validated across varying outdoor conditions.',
    tags: ['CV', 'Adversarial', 'Embedded', 'Python', 'Security'],
    pipeline: 'Capture → Perturb → Project → Evaluate → Report',
    tools: ['Python', 'OpenCV', 'PyTorch', 'POV Fan HW'],
    links: { case: '#', github: null, report: null, video: null },
  },
  {
    fileId: 'NW-002',
    slug: 'esp8266-mesh',
    type: 'THESIS',
    status: 'COMPLETE',
    title: 'ESP8266 Ad Hoc Mesh for Real-Time Swarm Coordination',
    year: '2024',
    context: 'Thesis',
    problem:
      'Drone swarms need a coordination layer without ground-station dependency.',
    approach:
      'ESP-NOW broadcast mesh with dynamic leader election across arbitrary node counts.',
    result:
      'Real-time multi-node coordination demonstrated; zero infrastructure dependency.',
    tags: ['Embedded', 'Wireless', 'Mesh', 'C++', 'ESP8266'],
    pipeline: 'Design → Flash → Coordinate → Stress-test → Validate',
    tools: ['ESP8266', 'ESP-NOW', 'C++', 'Arduino'],
    links: { case: '#', github: null, report: null, video: null },
  },
]

// ─── Legacy flat list (kept for reference / other uses) ───────────────────────

export type Project = {
  url: string
  name: string
  description: string
}

export const projects: Record<string, Project[]> = {
  thesis: [
    {
      url: '#',
      name: 'Physical Adversarial Attacks Using Fan-Based Holographic Projections',
      description:
        'Master thesis: black-box security testing of traffic sign computer-vision pipelines. Built programmable hardware PoC with holographic POV fan achieving up to 90% misclassification across varying conditions. Demonstrated vulnerabilities in safety-critical systems.',
    },
    {
      url: '#',
      name: 'ESP8266 Ad Hoc Mesh for Real-Time Swarm Coordination',
      description:
        'Bachelor thesis: decentralized ad hoc mesh using ESP8266 & ESP-NOW for peer-to-peer communication. Designed and implemented real-time swarm coordination algorithm for dynamic multi-node operation without ground-station dependency.',
    },
  ],
  opensource: [
    {
      url: 'https://github.com/kaisermann/svelte-preprocess',
      name: 'svelte-preprocess',
      description: 'quick and painless preprocess support for svelte',
    },
    {
      url: 'https://github.com/kaisermann/svelte-i18n',
      name: 'svelte-i18n',
      description: 'internationalization library for Svelte',
    },
    {
      url: 'https://github.com/kaisermann/svelte-loadable',
      name: 'svelte-loadable',
      description: 'dynamically load a svelte component',
    },
    {
      url: 'https://github.com/kaisermann/svelte-css-vars',
      name: 'svelte-css-vars',
      description: 'reactive css variables in svelte',
    },
    {
      url: 'https://github.com/vtex/typescript',
      name: 'vtex/typescript',
      description:
        "VTEX's typescript/javascript styleguide, tooling and recipes",
    },
    {
      url: 'https://github.com/vtex/danger',
      name: 'vtex/danger',
      description: 'encapsulated danger ruleset and github action',
    },
    {
      url: 'https://github.com/stone-payments/pos-mamba-sdk',
      name: 'pos-mamba-sdk',
      description: 'SDK for developing apps for the Mamba POS system',
    },
    {
      url: 'https://github.com/stone-payments/pos-mamba-app-template',
      name: 'pos-mamba-app-template',
      description: 'template for creating apps for the Mamba POS system',
    },
    {
      url: 'https://github.com/kaisermann/photoswippy',
      name: 'photoswippy',
      description: 'a PhotoSwipe friendly wrapper',
    },
    {
      url: 'https://github.com/kaisermann/rolleiflex',
      name: 'rolleiflex',
      description: 'css flexbox grid/helper framework',
    },
    {
      url: 'https://github.com/kaisermann/textlooper',
      name: 'textlooper',
      description: 'lightweight text rotation based on css animations',
    },
    {
      url: 'https://github.com/kaisermann/comicbubbles',
      name: 'comicbubbles',
      description: 'css-only 8 bit-like comic balloons',
    },
    {
      url: 'https://github.com/kaisermann/post-links',
      name: 'post-links',
      description: 'open <a> links using POST instead of GET',
    },
    {
      url: 'https://github.com/kaisermann/aph',
      name: 'aph',
      description: 'minimal DOM, barely api-less, manipulation library',
    },
    {
      url: 'https://github.com/kaisermann/WPDLS',
      name: 'wpdls',
      description: 'basic custom WordPress admin style made easy with stylus',
    },
    {
      url: 'https://github.com/kaisermann/crius',
      name: 'crius',
      description: 'flexible front-end workflow',
    },
    {
      url: 'https://github.com/kaisermann/selene',
      name: 'selene',
      description: 'opinionated wordpress starter theme',
    },
    {
      url: 'https://github.com/kaisermann/hyperion',
      name: 'hyperion',
      description: 'static website workflow forked from Crius',
    },
  ],
  sites: [
    {
      url: 'https://github.com/kaisermann/kaisermann',
      name: 'kaisermann.me v2',
      description: 'original template source',
    },
    {
      url: 'http://v1.kaisermann.me',
      name: 'kaisermann.me v1',
      description: 'first version of the template',
    },
    {
      url: 'https://copymoji.kaisermann.me',
      name: 'copymoji',
      description: 'build your own text emojis<br>☆└{▰⚆ヮ⚆▰}┐',
    },
    {
      url: 'https://genr.kaisermann.me/',
      name: 'genr',
      description: 'lookup the musical genres of an artist',
    },
    {
      url: 'https://solardancer.kaisermann.me',
      name: 'solar.dance',
      description: "just two lil' CSS guys dancing",
    },
  ],
} as const
