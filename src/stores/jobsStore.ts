import { create } from "zustand";
import type { Job, SavedJob } from "../types";

interface JobsStore {
  jobs: Job[];
  selectedJob: Job | null;
  savedJobs: SavedJob[];
  isLoading: boolean;
  error: string | null;

  setJobs: (jobs: Job[]) => void;
  setSelectedJob: (job: Job | null) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  addSavedJob: (jobId: string) => void;
  removeSavedJob: (jobId: string) => void;
  isSaved: (jobId: string) => boolean;
}

export const useJobsStore = create<JobsStore>((set, get) => ({
  jobs: [],
  selectedJob: null,
  savedJobs: [],
  isLoading: false,
  error: null,

  setJobs: (jobs: Job[]) => {
    set({ jobs });
  },

  setSelectedJob: (job: Job | null) => {
    set({ selectedJob: job });
  },

  setLoading: (isLoading: boolean) => {
    set({ isLoading });
  },

  setError: (error: string | null) => {
    set({ error });
  },

  addSavedJob: (jobId: string) => {
    const savedJob: SavedJob = {
      jobId,
      savedAt: new Date().toISOString(),
    };
    set((state) => ({
      savedJobs: [...state.savedJobs, savedJob],
    }));
  },

  removeSavedJob: (jobId: string) => {
    set((state) => ({
      savedJobs: state.savedJobs.filter((job) => job.jobId !== jobId),
    }));
  },

  isSaved: (jobId: string) => {
    return get().savedJobs.some((job) => job.jobId === jobId);
  },
}));
