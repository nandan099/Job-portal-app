import { create } from "zustand";
import type {
  JobApplication,
  ApplicationStatus,
  ApplicationStats,
} from "../types";

interface ApplicationsStore {
  applications: JobApplication[];
  stats: ApplicationStats;
  isLoading: boolean;
  error: string | null;

  setApplications: (applications: JobApplication[]) => void;
  addApplication: (application: JobApplication) => void;
  updateApplicationStatus: (id: string, status: ApplicationStatus) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  calculateStats: () => void;
}

export const useApplicationsStore = create<ApplicationsStore>((set, get) => ({
  applications: [],
  stats: {
    applied: 0,
    interviewing: 0,
    rejected: 0,
    offers: 0,
  },
  isLoading: false,
  error: null,

  setApplications: (applications: JobApplication[]) => {
    set({ applications });
    get().calculateStats();
  },

  addApplication: (application: JobApplication) => {
    set((state) => ({
      applications: [...state.applications, application],
    }));
    get().calculateStats();
  },

  updateApplicationStatus: (id: string, status: ApplicationStatus) => {
    set((state) => ({
      applications: state.applications.map((app) =>
        app.id === id
          ? { ...app, status, updatedDate: new Date().toISOString() }
          : app,
      ),
    }));
    get().calculateStats();
  },

  setLoading: (isLoading: boolean) => {
    set({ isLoading });
  },

  setError: (error: string | null) => {
    set({ error });
  },

  calculateStats: () => {
    const { applications } = get();
    const stats = {
      applied: applications.filter((app) => app.status === "applied").length,
      interviewing: applications.filter((app) => app.status === "interviewing")
        .length,
      rejected: applications.filter((app) => app.status === "rejected").length,
      offers: applications.filter((app) => app.status === "offer").length,
    };
    set({ stats });
  },
}));
