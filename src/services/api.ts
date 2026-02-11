import { mockJobs, mockCompanies } from "../data/mockData";
import type { Job, Company, JobApplication, ApiResponse } from "../types";
import { generateId } from "../lib/utils";

// Simulate API delay
const delay = (ms: number = 500) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const jobsService = {
  async getJobs(): Promise<ApiResponse<Job[]>> {
    await delay();
    return {
      success: true,
      data: mockJobs,
    };
  },

  async getJobById(id: string): Promise<ApiResponse<Job | undefined>> {
    await delay();
    const job = mockJobs.find((j) => j.id === id);
    return {
      success: !!job,
      data: job,
      error: job ? undefined : "Job not found",
    };
  },

  async searchJobs(query: string): Promise<ApiResponse<Job[]>> {
    await delay();
    const results = mockJobs.filter(
      (job) =>
        job.title.toLowerCase().includes(query.toLowerCase()) ||
        job.company.toLowerCase().includes(query.toLowerCase()) ||
        job.techStack.some((tech) =>
          tech.toLowerCase().includes(query.toLowerCase()),
        ),
    );
    return {
      success: true,
      data: results,
    };
  },

  async filterJobs(filters: {
    location?: string;
    locationType?: string;
    salaryMin?: number;
    salaryMax?: number;
    experienceLevel?: string[];
    techStack?: string[];
  }): Promise<ApiResponse<Job[]>> {
    await delay();
    let results = [...mockJobs];

    if (filters.location && filters.location !== "") {
      results = results.filter((job) =>
        job.location.toLowerCase().includes(filters.location!.toLowerCase()),
      );
    }

    if (filters.locationType && filters.locationType !== "all") {
      results = results.filter(
        (job) => job.locationType === filters.locationType,
      );
    }

    if (filters.salaryMin !== undefined) {
      results = results.filter((job) => job.salary.max >= filters.salaryMin!);
    }

    if (filters.salaryMax !== undefined) {
      results = results.filter((job) => job.salary.min <= filters.salaryMax!);
    }

    if (filters.experienceLevel && filters.experienceLevel.length > 0) {
      results = results.filter((job) =>
        filters.experienceLevel!.includes(job.experienceLevel),
      );
    }

    if (filters.techStack && filters.techStack.length > 0) {
      results = results.filter((job) =>
        filters.techStack!.some((tech) => job.techStack.includes(tech)),
      );
    }

    return {
      success: true,
      data: results,
    };
  },
};

export const companiesService = {
  async getCompanies(): Promise<ApiResponse<Company[]>> {
    await delay();
    return {
      success: true,
      data: mockCompanies,
    };
  },

  async getCompanyById(id: string): Promise<ApiResponse<Company | undefined>> {
    await delay();
    const company = mockCompanies.find((c) => c.id === id);
    return {
      success: !!company,
      data: company,
      error: company ? undefined : "Company not found",
    };
  },
};

export const applicationsService = {
  async submitApplication(data: {
    jobId: string;
    fullName: string;
    email: string;
    yearsOfExperience: number;
    resumeUrl: string;
  }): Promise<ApiResponse<JobApplication>> {
    await delay(1000);
    const application: JobApplication = {
      id: generateId(),
      jobId: data.jobId,
      userId: "user_123",
      fullName: data.fullName,
      email: data.email,
      yearsOfExperience: data.yearsOfExperience,
      resumeUrl: data.resumeUrl,
      status: "applied",
      appliedDate: new Date().toISOString(),
      updatedDate: new Date().toISOString(),
    };
    return {
      success: true,
      data: application,
    };
  },

  async getApplications(): Promise<ApiResponse<JobApplication[]>> {
    await delay();
    // Mock applications
    return {
      success: true,
      data: [],
    };
  },
};
