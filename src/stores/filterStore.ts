import { create } from "zustand";
import type { JobFilters } from "../types";

interface FiltersStore extends JobFilters {
  setSearchQuery: (query: string) => void;
  setLocation: (location: string) => void;
  setLocationType: (type: "remote" | "on-site" | "hybrid" | "all") => void;
  setSalaryRange: (range: [number, number]) => void;
  setExperienceLevel: (levels: string[]) => void;
  setTechStack: (stack: string[]) => void;
  clearFilters: () => void;
}

const defaultFilters: JobFilters = {
  searchQuery: "",
  location: "",
  locationType: "all",
  salaryRange: [0, 250000],
  experienceLevel: [],
  techStack: [],
};

export const useFiltersStore = create<FiltersStore>((set) => ({
  ...defaultFilters,

  setSearchQuery: (searchQuery: string) => {
    set({ searchQuery });
  },

  setLocation: (location: string) => {
    set({ location });
  },

  setLocationType: (locationType: "remote" | "on-site" | "hybrid" | "all") => {
    set({ locationType });
  },

  setSalaryRange: (salaryRange: [number, number]) => {
    set({ salaryRange });
  },

  setExperienceLevel: (experienceLevel: string[]) => {
    set({ experienceLevel });
  },

  setTechStack: (techStack: string[]) => {
    set({ techStack });
  },

  clearFilters: () => {
    set(defaultFilters);
  },
}));
