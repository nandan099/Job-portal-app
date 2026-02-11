import type { Job, Company } from "../types";

export const mockJobs: Job[] = [
  {
    id: "1",
    title: "Senior React Developer",
    company: "TechCorp",
    companyLogo: "🏢",
    description: `# Senior React Developer

## About the Role

We're looking for an experienced React developer to join our growing team. You'll work on building scalable web applications that serve millions of users worldwide.

## Responsibilities

- Develop and maintain React components and applications
- Collaborate with design and backend teams
- Implement performance optimizations
- Mentor junior developers
- Participate in code reviews

## Required Skills

- 5+ years of React experience
- TypeScript proficiency
- Testing expertise (Jest, React Testing Library)
- State management (Redux, Zustand)
- RESTful API integration

## Nice to Have

- Next.js experience
- GraphQL knowledge
- DevOps basics
- Open source contributions`,
    location: "San Francisco, CA",
    locationType: "hybrid",
    salary: {
      min: 150000,
      max: 200000,
      currency: "USD",
    },
    experienceLevel: "senior",
    techStack: ["React", "TypeScript", "Node.js", "PostgreSQL"],
    applicants: 45,
    postedDate: "2024-02-05",
    deadline: "2024-03-05",
    companySize: "500-1000",
    industry: "Technology",
    benefits: ["Health Insurance", "401k", "Stock Options", "Remote Work"],
  },
  {
    id: "2",
    title: "Full Stack Developer",
    company: "StartupIO",
    companyLogo: "🚀",
    description: `# Full Stack Developer

## About StartupIO

We're a fast-growing startup revolutionizing the way companies manage their data pipelines.

## The Role

Join our engineering team and help build the next generation of data processing tools.

## Requirements

- 3+ years of full stack development
- React or Vue experience
- Backend development skills
- Database design knowledge

## What We Offer

- Competitive salary
- Equity
- Flexible work arrangements
- Learning budget`,
    location: "New York, NY",
    locationType: "remote",
    salary: {
      min: 120000,
      max: 160000,
      currency: "USD",
    },
    experienceLevel: "mid",
    techStack: ["React", "Node.js", "MongoDB", "Docker"],
    applicants: 78,
    postedDate: "2024-02-08",
    deadline: "2024-03-08",
    companySize: "50-200",
    industry: "SaaS",
    benefits: ["Remote", "Equity", "Health Coverage"],
  },
  {
    id: "3",
    title: "Junior Frontend Developer",
    company: "WebDesigns Inc",
    companyLogo: "🎨",
    description: `# Junior Frontend Developer

## Join Our Team!

Perfect opportunity for a junior developer to grow and learn from experienced professionals.

## What You'll Do

- Create responsive user interfaces
- Write clean, maintainable code
- Collaborate with designers
- Learn best practices from senior developers

## Requirements

- HTML, CSS, JavaScript knowledge
- Basic React or similar framework
- Git proficiency
- Good communication skills

## We Offer

- Mentorship from senior developers
- Learning opportunities
- Friendly team environment`,
    location: "Austin, TX",
    locationType: "on-site",
    salary: {
      min: 70000,
      max: 90000,
      currency: "USD",
    },
    experienceLevel: "entry",
    techStack: ["HTML", "CSS", "JavaScript", "React"],
    applicants: 120,
    postedDate: "2024-02-01",
    deadline: "2024-03-01",
    companySize: "100-500",
    industry: "Web Design",
    benefits: ["Training", "Mentorship", "Health Insurance"],
  },
  {
    id: "4",
    title: "DevOps Engineer",
    company: "CloudFirst",
    companyLogo: "☁️",
    description: `# DevOps Engineer

## Role Description

We're seeking a skilled DevOps engineer to manage our cloud infrastructure and CI/CD pipelines.

## Responsibilities

- Manage AWS infrastructure
- Implement CI/CD pipelines
- Monitor system performance
- Automate deployment processes
- Ensure system reliability

## Required

- 4+ years DevOps experience
- AWS or GCP expertise
- Docker and Kubernetes knowledge
- CI/CD tools (Jenkins, GitLab CI)
- Linux administration`,
    location: "Seattle, WA",
    locationType: "hybrid",
    salary: {
      min: 140000,
      max: 190000,
      currency: "USD",
    },
    experienceLevel: "senior",
    techStack: ["AWS", "Kubernetes", "Docker", "Terraform"],
    applicants: 32,
    postedDate: "2024-02-06",
    deadline: "2024-03-06",
    companySize: "1000+",
    industry: "Cloud Services",
    benefits: ["Health Insurance", "401k", "Stock", "Remote Options"],
  },
  {
    id: "5",
    title: "Data Scientist",
    company: "DataAI Labs",
    companyLogo: "📊",
    description: `# Data Scientist

## About the Role

Lead data science initiatives to drive insights and create ML models that impact millions.

## Responsibilities

- Build and deploy ML models
- Analyze large datasets
- Create data visualizations
- Collaborate with engineering teams

## Requirements

- 3+ years data science experience
- Python expertise
- Machine learning frameworks (TensorFlow, PyTorch)
- SQL proficiency
- Statistics knowledge`,
    location: "Boston, MA",
    locationType: "remote",
    salary: {
      min: 130000,
      max: 170000,
      currency: "USD",
    },
    experienceLevel: "mid",
    techStack: ["Python", "TensorFlow", "SQL", "Spark"],
    applicants: 54,
    postedDate: "2024-02-07",
    deadline: "2024-03-07",
    companySize: "200-500",
    industry: "AI/ML",
    benefits: ["Remote", "Health Insurance", "Learning Budget"],
  },
];

export const mockCompanies: Company[] = [
  {
    id: "1",
    name: "TechCorp",
    logo: "🏢",
    description: "Leading technology company building enterprise solutions",
    website: "techcorp.com",
    industry: "Technology",
    size: "500-1000",
    employees: 750,
  },
  {
    id: "2",
    name: "StartupIO",
    logo: "🚀",
    description: "Fast-growing startup in the data pipeline space",
    website: "startupio.com",
    industry: "SaaS",
    size: "50-200",
    employees: 125,
  },
  {
    id: "3",
    name: "WebDesigns Inc",
    logo: "🎨",
    description: "Creative web design and development agency",
    website: "webdesigns.com",
    industry: "Web Design",
    size: "100-500",
    employees: 280,
  },
  {
    id: "4",
    name: "CloudFirst",
    logo: "☁️",
    description: "Global cloud infrastructure provider",
    website: "cloudfirst.com",
    industry: "Cloud Services",
    size: "1000+",
    employees: 5000,
  },
  {
    id: "5",
    name: "DataAI Labs",
    logo: "📊",
    description:
      "Artificial intelligence and machine learning research company",
    website: "dataai.com",
    industry: "AI/ML",
    size: "200-500",
    employees: 350,
  },
];

export const jobCategories = [
  { name: "Engineering", icon: "⚙️", count: 2450 },
  { name: "Design", icon: "🎨", count: 890 },
  { name: "Product", icon: "📦", count: 560 },
  { name: "Marketing", icon: "📢", count: 1200 },
  { name: "Sales", icon: "💼", count: 1840 },
  { name: "Finance", icon: "💰", count: 730 },
  { name: "HR", icon: "👥", count: 420 },
  { name: "Operations", icon: "⚡", count: 650 },
];

export const techStackOptions = [
  "React",
  "Vue.js",
  "Angular",
  "Node.js",
  "Python",
  "Java",
  "TypeScript",
  "AWS",
  "Docker",
  "Kubernetes",
  "PostgreSQL",
  "MongoDB",
  "GraphQL",
  "Next.js",
  "Django",
  "Spring Boot",
];
