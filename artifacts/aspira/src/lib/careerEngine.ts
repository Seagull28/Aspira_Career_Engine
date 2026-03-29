export interface UserProfile {
  degree: string;
  specialization: string;
  cgpa: number;
  techStack: string[];
  softSkills: string[];
  industryInterests: string[];
}

export interface CareerMatch {
  title: string;
  description: string;
  matchScore: number;
  matchedSkills: string[];
  gapSkills: string[];
  icon: string;
  domain: string;
}

const CAREER_PATHS = [
  {
    title: "AI / ML Engineer",
    description: "Design, build, and deploy machine learning models and intelligent systems at scale.",
    domain: "AI Research",
    icon: "Brain",
    requiredTech: ["Python", "TensorFlow", "PyTorch", "Scikit-learn", "SQL", "NumPy"],
    bonusTech: ["Spark", "Docker", "Kubernetes", "FastAPI"],
    requiredSoft: ["Analytical Thinking", "Problem Solving", "Research"],
    industries: ["AI Research", "HealthTech", "FinTech", "EdTech"],
    specializations: ["AIML", "CSE", "Data Science"],
    cgpaWeight: 0.15,
  },
  {
    title: "Full Stack Developer",
    description: "Build end-to-end web applications from database design to polished user interfaces.",
    domain: "Software Engineering",
    icon: "Code2",
    requiredTech: ["JavaScript", "React", "Node.js", "SQL", "HTML/CSS"],
    bonusTech: ["TypeScript", "Python", "Docker", "AWS", "MongoDB"],
    requiredSoft: ["Communication", "Collaboration", "Problem Solving"],
    industries: ["SaaS", "EdTech", "FinTech", "E-Commerce"],
    specializations: ["CSE", "IT", "AIML"],
    cgpaWeight: 0.1,
  },
  {
    title: "Data Analyst",
    description: "Transform raw data into actionable business insights through analysis and visualization.",
    domain: "Data & Analytics",
    icon: "BarChart3",
    requiredTech: ["Python", "SQL", "Excel", "Tableau", "Power BI"],
    bonusTech: ["R", "Pandas", "NumPy", "Spark"],
    requiredSoft: ["Analytical Thinking", "Communication", "Strategic Planning"],
    industries: ["FinTech", "HealthTech", "Retail", "Consulting"],
    specializations: ["CSE", "AIML", "ECE", "Data Science"],
    cgpaWeight: 0.12,
  },
  {
    title: "Cloud Solutions Architect",
    description: "Design scalable, resilient cloud infrastructure and guide teams through digital transformation.",
    domain: "Cloud / DevOps",
    icon: "Cloud",
    requiredTech: ["AWS", "Docker", "Kubernetes", "Linux", "Python"],
    bonusTech: ["Terraform", "Azure", "GCP", "Jenkins", "SQL"],
    requiredSoft: ["Leadership", "Strategic Planning", "Communication"],
    industries: ["SaaS", "FinTech", "Cybersecurity", "Telecom"],
    specializations: ["CSE", "ECE", "IT", "Networks"],
    cgpaWeight: 0.1,
  },
  {
    title: "Product Manager",
    description: "Lead cross-functional teams to define, build, and launch products that solve real customer problems.",
    domain: "Product & Strategy",
    icon: "Target",
    requiredTech: ["SQL", "Figma", "Excel", "JIRA"],
    bonusTech: ["Python", "Tableau", "Mixpanel"],
    requiredSoft: ["Leadership", "Communication", "Strategic Planning", "Public Speaking"],
    industries: ["SaaS", "FinTech", "EdTech", "E-Commerce"],
    specializations: ["CSE", "IT", "AIML", "MBA"],
    cgpaWeight: 0.08,
  },
  {
    title: "Cybersecurity Analyst",
    description: "Protect digital assets by identifying threats, analyzing vulnerabilities, and implementing security protocols.",
    domain: "Cybersecurity",
    icon: "Shield",
    requiredTech: ["Linux", "Python", "SQL", "Wireshark"],
    bonusTech: ["Kali Linux", "Metasploit", "AWS", "Docker"],
    requiredSoft: ["Analytical Thinking", "Problem Solving", "Attention to Detail"],
    industries: ["Cybersecurity", "FinTech", "Defense", "Telecom"],
    specializations: ["CSE", "ECE", "Networks", "IT"],
    cgpaWeight: 0.12,
  },
  {
    title: "FinTech Engineer",
    description: "Build secure, high-performance financial systems — from payment gateways to algorithmic trading platforms.",
    domain: "FinTech",
    icon: "TrendingUp",
    requiredTech: ["Java", "Python", "SQL", "Spring Boot", "Kafka"],
    bonusTech: ["React", "Docker", "Kubernetes", "AWS"],
    requiredSoft: ["Analytical Thinking", "Problem Solving", "Attention to Detail"],
    industries: ["FinTech", "Banking", "Insurance"],
    specializations: ["CSE", "AIML", "IT", "ECE"],
    cgpaWeight: 0.15,
  },
  {
    title: "DevOps / SRE Engineer",
    description: "Automate, monitor, and scale software delivery pipelines to ensure reliable, fast releases.",
    domain: "DevOps",
    icon: "Cpu",
    requiredTech: ["Docker", "Kubernetes", "Linux", "Python", "Jenkins"],
    bonusTech: ["Terraform", "AWS", "GCP", "Prometheus", "Grafana"],
    requiredSoft: ["Problem Solving", "Collaboration", "Analytical Thinking"],
    industries: ["SaaS", "Telecom", "FinTech", "E-Commerce"],
    specializations: ["CSE", "IT", "ECE", "Networks"],
    cgpaWeight: 0.08,
  },
  {
    title: "Biomedical / HealthTech Engineer",
    description: "Apply engineering principles to healthcare — building medical devices, EHR systems, and diagnostic AI tools.",
    domain: "HealthTech",
    icon: "HeartPulse",
    requiredTech: ["Python", "MATLAB", "SQL", "TensorFlow"],
    bonusTech: ["R", "React", "AWS", "FHIR"],
    requiredSoft: ["Analytical Thinking", "Research", "Communication"],
    industries: ["HealthTech", "AI Research", "Pharma"],
    specializations: ["ECE", "AIML", "Biomedical", "CSE"],
    cgpaWeight: 0.18,
  },
  {
    title: "Technical Program Manager",
    description: "Coordinate complex engineering programs, align stakeholders, and ensure on-time delivery of technical projects.",
    domain: "Engineering Leadership",
    icon: "Users",
    requiredTech: ["JIRA", "SQL", "Excel", "Confluence"],
    bonusTech: ["Python", "Tableau", "Docker"],
    requiredSoft: ["Leadership", "Strategic Planning", "Communication", "Public Speaking"],
    industries: ["SaaS", "Consulting", "FinTech", "Telecom"],
    specializations: ["CSE", "IT", "AIML", "ECE"],
    cgpaWeight: 0.08,
  },
];

function computeScore(career: typeof CAREER_PATHS[0], profile: UserProfile): number {
  let score = 0;
  let maxScore = 0;

  const techMatchWeight = 50;
  const softMatchWeight = 20;
  const industryMatchWeight = 15;
  const specializationWeight = 10;
  const cgpaWeight = career.cgpaWeight * 100 * 0.05;

  maxScore += techMatchWeight;
  const allRequiredTech = [...career.requiredTech];
  const allBonusTech = [...career.bonusTech];

  let techHits = 0;
  let techMax = allRequiredTech.length;
  for (const tech of allRequiredTech) {
    if (profile.techStack.some(t => t.toLowerCase() === tech.toLowerCase())) {
      techHits += 1;
    }
  }
  for (const tech of allBonusTech) {
    if (profile.techStack.some(t => t.toLowerCase() === tech.toLowerCase())) {
      techHits += 0.4;
      techMax += 0.4;
    }
  }
  score += (techHits / Math.max(techMax, 1)) * techMatchWeight;

  maxScore += softMatchWeight;
  let softHits = 0;
  for (const skill of career.requiredSoft) {
    if (profile.softSkills.some(s => s.toLowerCase().includes(skill.toLowerCase()) || skill.toLowerCase().includes(s.toLowerCase()))) {
      softHits++;
    }
  }
  score += (softHits / Math.max(career.requiredSoft.length, 1)) * softMatchWeight;

  maxScore += industryMatchWeight;
  let industryHits = 0;
  for (const interest of profile.industryInterests) {
    if (career.industries.some(i => i.toLowerCase() === interest.toLowerCase())) {
      industryHits++;
    }
  }
  score += Math.min(industryHits, 2) / 2 * industryMatchWeight;

  maxScore += specializationWeight;
  if (career.specializations.includes(profile.specialization)) {
    score += specializationWeight;
  }

  const cgpaScore = ((profile.cgpa - 5) / 5) * cgpaWeight;
  score += Math.max(0, cgpaScore);
  maxScore += cgpaWeight;

  return Math.round(Math.min(100, (score / maxScore) * 100));
}

function getMatchedSkills(career: typeof CAREER_PATHS[0], profile: UserProfile): string[] {
  const matched: string[] = [];

  for (const tech of [...career.requiredTech, ...career.bonusTech]) {
    if (profile.techStack.some(t => t.toLowerCase() === tech.toLowerCase())) {
      matched.push(tech);
    }
  }

  for (const skill of career.requiredSoft) {
    if (profile.softSkills.some(s => s.toLowerCase().includes(skill.toLowerCase()) || skill.toLowerCase().includes(s.toLowerCase()))) {
      matched.push(skill);
    }
  }

  return matched.slice(0, 4);
}

function getGapSkills(career: typeof CAREER_PATHS[0], profile: UserProfile): string[] {
  const gaps: string[] = [];

  for (const tech of career.requiredTech) {
    if (!profile.techStack.some(t => t.toLowerCase() === tech.toLowerCase())) {
      gaps.push(tech);
    }
  }

  for (const tech of career.bonusTech) {
    if (!profile.techStack.some(t => t.toLowerCase() === tech.toLowerCase()) && gaps.length < 4) {
      gaps.push(tech);
    }
  }

  return gaps.slice(0, 3);
}

export function computeCareerMatches(profile: UserProfile): CareerMatch[] {
  const scored = CAREER_PATHS.map(career => ({
    career,
    score: computeScore(career, profile),
    matchedSkills: getMatchedSkills(career, profile),
    gapSkills: getGapSkills(career, profile),
  }));

  scored.sort((a, b) => b.score - a.score);

  return scored.slice(0, 3).map(({ career, score, matchedSkills, gapSkills }) => ({
    title: career.title,
    description: career.description,
    matchScore: score,
    matchedSkills,
    gapSkills,
    icon: career.icon,
    domain: career.domain,
  }));
}
