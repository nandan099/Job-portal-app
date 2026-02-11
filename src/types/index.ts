// User Types
export type UserRole = "job_seeker" | "employer";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  createdAt: Date;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

// Job Types
export interface Job {
  id: string;
  title: string;
  company: string;
  companyLogo: string;
  description: string;
  location: string;
  locationType: "remote" | "on-site" | "hybrid";
  salary: {
    min: number;
    max: number;
    currency: string;
  };
  experienceLevel: "entry" | "mid" | "senior";
  techStack: string[];
  applicants: number;
  postedDate: string;
  deadline: string;
  companySize?: string;
  industry?: string;
  benefits?: string[];
}

export interface JobFilters {
  searchQuery: string;
  location: string;
  locationType: "remote" | "on-site" | "hybrid" | "all";
  salaryRange: [number, number];
  experienceLevel: string[];
  techStack: string[];
}

// Application Types
export type ApplicationStatus =
  | "applied"
  | "interviewing"
  | "rejected"
  | "offer";

export interface JobApplication {
  id: string;
  jobId: string;
  userId: string;
  fullName: string;
  email: string;
  yearsOfExperience: number;
  resumeUrl: string;
  coverLetter?: string;
  status: ApplicationStatus;
  appliedDate: string;
  updatedDate: string;
}

// Dashboard Stats Types
export interface ApplicationStats {
  applied: number;
  interviewing: number;
  rejected: number;
  offers: number;
}

export interface SavedJob {
  jobId: string;
  savedAt: string;
}

export interface ProfileCompletion {
  percentage: number;
  completedFields: string[];
}

// Employer Job Posting Types
export interface JobPosting {
  id: string;
  jobId: string;
  employerId: string;
  status: "active" | "closed" | "draft";
  applicantsCount: number;
  createdAt: string;
  updatedAt: string;
}

// Generic Response Type
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

// Company Types
export interface Company {
  id: string;
  name: string;
  logo: string;
  description: string;
  website: string;
  industry: string;
  size: string;
  employees: number;
}
