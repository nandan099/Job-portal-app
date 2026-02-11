import React from "react";
import { useFiltersStore } from "../../stores";
import { Card, Button } from "../ui";
import { techStackOptions } from "../../data/mockData";
import { ChevronDown } from "lucide-react";

export const FiltersSidebar: React.FC = () => {
  const {
    locationType,
    setLocationType,
    salaryRange,
    setSalaryRange,
    experienceLevel,
    setExperienceLevel,
    techStack,
    setTechStack,
    clearFilters,
  } = useFiltersStore();

  const [expandedSections, setExpandedSections] = React.useState({
    location: true,
    salary: true,
    experience: true,
    tech: true,
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const toggleExperience = (level: "entry" | "mid" | "senior", checked: boolean) => {
    if (checked) {
      if (!experienceLevel.includes(level)) {
        setExperienceLevel([...experienceLevel, level]);
      }
      return;
    }

    setExperienceLevel(experienceLevel.filter((l) => l !== level));
  };

  const toggleTech = (tech: string, checked: boolean) => {
    if (checked) {
      if (!techStack.includes(tech)) {
        setTechStack([...techStack, tech]);
      }
      return;
    }

    setTechStack(techStack.filter((t) => t !== tech));
  };

  return (
    <div className="space-y-4">
      {/* Location Type */}
      <Card>
        <button
          type="button"
          className="flex w-full items-center justify-between cursor-pointer"
          onClick={() => toggleSection("location")}
        >
          <h3 className="font-semibold text-gray-900 dark:text-white">
            Work Type
          </h3>
          <ChevronDown
            className={`h-4 w-4 transition-transform ${expandedSections.location ? "rotate-180" : ""}`}
          />
        </button>
        {expandedSections.location && (
          <div className="mt-4 space-y-3">
            {(["all", "remote", "on-site", "hybrid"] as const).map((type) => (
              <label
                key={type}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="radio"
                  name="locationType"
                  checked={locationType === type}
                  onChange={() => setLocationType(type)}
                  className="h-4 w-4"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300 capitalize">
                  {type === "all" ? "All" : type}
                </span>
              </label>
            ))}
          </div>
        )}
      </Card>

      {/* Salary Range */}
      <Card>
        <button
          type="button"
          className="flex w-full items-center justify-between cursor-pointer"
          onClick={() => toggleSection("salary")}
        >
          <h3 className="font-semibold text-gray-900 dark:text-white">
            Salary Range
          </h3>
          <ChevronDown
            className={`h-4 w-4 transition-transform ${expandedSections.salary ? "rotate-180" : ""}`}
          />
        </button>
        {expandedSections.salary && (
          <div className="mt-4 space-y-3">
            <input
              id="salary-max-range"
              aria-label="Maximum salary"
              type="range"
              min="0"
              max="250000"
              step="10000"
              value={salaryRange[1]}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const maxSalary = Number(e.target.value);
                setSalaryRange([
                  salaryRange[0],
                  Number.isFinite(maxSalary) ? maxSalary : salaryRange[1],
                ]);
              }}
              className="w-full"
            />
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Up to ${salaryRange[1].toLocaleString()}
            </div>
          </div>
        )}
      </Card>

      {/* Experience Level */}
      <Card>
        <button
          type="button"
          className="flex w-full items-center justify-between cursor-pointer"
          onClick={() => toggleSection("experience")}
        >
          <h3 className="font-semibold text-gray-900 dark:text-white">
            Experience
          </h3>
          <ChevronDown
            className={`h-4 w-4 transition-transform ${expandedSections.experience ? "rotate-180" : ""}`}
          />
        </button>
        {expandedSections.experience && (
          <div className="mt-4 space-y-3">
            {(["entry", "mid", "senior"] as const).map((level) => (
              <label
                key={level}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={experienceLevel.includes(level)}
                  onChange={(e) => toggleExperience(level, e.target.checked)}
                  className="h-4 w-4"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300 capitalize">
                  {level}
                </span>
              </label>
            ))}
          </div>
        )}
      </Card>

      {/* Tech Stack */}
      <Card>
        <button
          type="button"
          className="flex w-full items-center justify-between cursor-pointer"
          onClick={() => toggleSection("tech")}
        >
          <h3 className="font-semibold text-gray-900 dark:text-white">
            Tech Stack
          </h3>
          <ChevronDown
            className={`h-4 w-4 transition-transform ${expandedSections.tech ? "rotate-180" : ""}`}
          />
        </button>
        {expandedSections.tech && (
          <div className="mt-4 space-y-2">
            {techStackOptions.map((tech) => (
              <label
                key={tech}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={techStack.includes(tech)}
                  onChange={(e) => toggleTech(tech, e.target.checked)}
                  className="h-4 w-4"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  {tech}
                </span>
              </label>
            ))}
          </div>
        )}
      </Card>

      {/* Clear Filters */}
      <Button onClick={clearFilters} variant="outline" className="w-full">
        Clear All Filters
      </Button>
    </div>
  );
};
