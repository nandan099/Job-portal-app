import React from "react";
import { MapPin, DollarSign, Briefcase, Heart } from "lucide-react";
import { Card, Badge } from "../ui";
import type { Job } from "../../types";
import { formatCurrency, daysAgo } from "../../lib/utils";
import { cn } from "../../lib/cn";

interface JobCardProps {
  job: Job;
  isSelected?: boolean;
  onSelect?: (job: Job) => void;
  onSave?: (jobId: string) => void;
  isSaved?: boolean;
  compact?: boolean;
}

export const JobCard: React.FC<JobCardProps> = ({
  job,
  isSelected = false,
  onSelect,
  onSave,
  isSaved = false,
  compact = false,
}) => {
  const techPreview =
    job.techStack.length > 0 ? job.techStack.slice(0, 2).join(", ") : "N/A";

  return (
    <Card
      onClick={() => onSelect?.(job)}
      className={cn(
        "cursor-pointer transition-all duration-200",
        isSelected && "border-pink-500 bg-pink-50 dark:bg-pink-950/20",
        !compact && "mb-4",
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <div className="text-3xl">{job.companyLogo}</div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                {job.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {job.company}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 my-3">
            <Badge variant="default">{job.experienceLevel}</Badge>
            <Badge variant="secondary">{job.locationType}</Badge>
            {job.applicants > 0 && (
              <Badge variant="secondary">{job.applicants} applicants</Badge>
            )}
          </div>

          <div
            className={cn(
              "grid gap-2",
              compact ? "grid-cols-2" : "grid-cols-3",
            )}
          >
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <MapPin className="h-4 w-4 text-pink-500" />
              {job.location}
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <DollarSign className="h-4 w-4 text-green-500" />
              {formatCurrency(job.salary.min)} -{" "}
              {formatCurrency(job.salary.max)}
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <Briefcase className="h-4 w-4 text-blue-500" />
              {techPreview}
              {job.techStack.length > 2 && ` +${job.techStack.length - 2}`}
            </div>
          </div>

          <p className="mt-3 text-xs text-gray-500 dark:text-gray-500">
            Posted {daysAgo(job.postedDate)}
          </p>
        </div>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onSave?.(job.id);
          }}
          className="ml-4 p-2 text-gray-400 hover:text-pink-500 transition-colors"
          aria-label={isSaved ? "Remove saved job" : "Save job"}
          title={isSaved ? "Remove saved job" : "Save job"}
        >
          <Heart
            className={cn("h-5 w-5", isSaved && "fill-pink-500 text-pink-500")}
          />
        </button>
      </div>
    </Card>
  );
};
