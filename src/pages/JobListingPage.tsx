import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Send, Share2 } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { Header, Footer, JobCard, FiltersSidebar } from "../components/common";
import { Button, Card, Skeleton } from "../components/ui";
import { useJobsStore, useFiltersStore } from "../stores";
import { jobsService } from "../services/api";
import type { Job } from "../types";
import { formatCurrency } from "../lib/utils";
import { cn } from "../lib/cn";

export const JobListingPage: React.FC = () => {
  const {
    jobs,
    selectedJob,
    setJobs,
    setSelectedJob,
    isSaved,
    addSavedJob,
    removeSavedJob,
  } = useJobsStore();
  const {
    searchQuery,
    location,
    locationType,
    salaryRange,
    experienceLevel,
    techStack,
  } = useFiltersStore();
  const [isLoading, setIsLoading] = useState(true);
  const [showApplicationModal, setShowApplicationModal] = useState(false);

  useEffect(() => {
    const loadJobs = async () => {
      setIsLoading(true);
      const result = await jobsService.getJobs();
      if (result.success && result.data) {
        setJobs(result.data);
        setSelectedJob(result.data[0]);
      }
      setIsLoading(false);
    };
    loadJobs();
  }, [setJobs, setSelectedJob]);

  const filteredJobs = useMemo(() => {
    let results = [...jobs];

    if (searchQuery) {
      results = results.filter(
        (job) =>
          job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          job.company.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    if (location) {
      results = results.filter((job) =>
        job.location.toLowerCase().includes(location.toLowerCase()),
      );
    }

    if (locationType !== "all") {
      results = results.filter((job) => job.locationType === locationType);
    }

    if (salaryRange[1] > 0) {
      results = results.filter((job) => job.salary.min <= salaryRange[1]);
    }

    if (experienceLevel.length > 0) {
      results = results.filter((job) =>
        experienceLevel.includes(job.experienceLevel),
      );
    }

    if (techStack.length > 0) {
      results = results.filter((job) =>
        techStack.some((tech) => job.techStack.includes(tech)),
      );
    }

    return results;
  }, [
    jobs,
    searchQuery,
    location,
    locationType,
    salaryRange,
    experienceLevel,
    techStack,
  ]);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 dark:bg-gray-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar - Filters */}
            <motion.aside
              className="lg:col-span-1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <FiltersSidebar />
            </motion.aside>

            {/* Main Content */}
            <motion.div
              className="lg:col-span-3 grid grid-cols-1 lg:grid-cols-3 gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {/* Jobs List */}
              <div className="lg:col-span-1">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                    {filteredJobs.length} Jobs Found
                  </h2>
                </div>

                <div className="space-y-3 max-h-[calc(100vh-200px)] overflow-y-auto">
                  {isLoading ? (
                    <>
                      <Skeleton count={3} className="h-32" />
                    </>
                  ) : filteredJobs.length === 0 ? (
                    <Card className="text-center py-8">
                      <p className="text-gray-600 dark:text-gray-400">
                        No jobs found matching your criteria.
                      </p>
                    </Card>
                  ) : (
                    <AnimatePresence>
                      {filteredJobs.map((job, idx) => (
                        <motion.div
                          key={job.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: idx * 0.05 }}
                        >
                          <JobCard
                            job={job}
                            isSelected={selectedJob?.id === job.id}
                            onSelect={setSelectedJob}
                            onSave={(jobId) => {
                              if (isSaved(jobId)) {
                                removeSavedJob(jobId);
                              } else {
                                addSavedJob(jobId);
                              }
                            }}
                            isSaved={isSaved(job.id)}
                            compact={true}
                          />
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  )}
                </div>
              </div>

              {/* Job Details */}
              <div className="lg:col-span-2">
                {isLoading ? (
                  <Card className="p-8">
                    <Skeleton count={5} />
                  </Card>
                ) : selectedJob ? (
                  <motion.div
                    key={selectedJob.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    {/* Job Header */}
                    <Card>
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-start gap-4">
                          <div className="text-5xl">
                            {selectedJob.companyLogo}
                          </div>
                          <div>
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                              {selectedJob.title}
                            </h1>
                            <p className="text-lg text-gray-600 dark:text-gray-400">
                              {selectedJob.company}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
                              {selectedJob.location} - {selectedJob.locationType}
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => {
                            if (isSaved(selectedJob.id)) {
                              removeSavedJob(selectedJob.id);
                            } else {
                              addSavedJob(selectedJob.id);
                            }
                          }}
                          className="p-3 text-gray-400 hover:text-pink-500 transition-colors"
                          title={isSaved(selectedJob.id) ? "Remove from saved" : "Save job"}
                        >
                          <Heart
                            className={cn(
                              "h-6 w-6",
                              isSaved(selectedJob.id) &&
                                "fill-pink-500 text-pink-500",
                            )}
                          />
                        </button>
                      </div>

                      <div className="flex flex-wrap gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-500 uppercase">
                            Salary
                          </p>
                          <p className="font-semibold text-gray-900 dark:text-white">
                            {formatCurrency(selectedJob.salary.min)} -{" "}
                            {formatCurrency(selectedJob.salary.max)}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-500 uppercase">
                            Experience
                          </p>
                          <p className="font-semibold text-gray-900 dark:text-white capitalize">
                            {selectedJob.experienceLevel}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-500 uppercase">
                            Applicants
                          </p>
                          <p className="font-semibold text-gray-900 dark:text-white">
                            {selectedJob.applicants}
                          </p>
                        </div>
                      </div>
                    </Card>

                    {/* About Section */}
                    <Card>
                      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                        About This Role
                      </h2>
                      <div className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300">
                        <ReactMarkdown>{selectedJob.description}</ReactMarkdown>
                      </div>
                    </Card>

                    {/* Tech Stack */}
                    <Card>
                      <h3 className="font-bold text-gray-900 dark:text-white mb-4">
                        Tech Stack
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedJob.techStack.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 rounded-full bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200 text-sm font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </Card>

                    {/* Benefits */}
                    {selectedJob.benefits && (
                      <Card>
                        <h3 className="font-bold text-gray-900 dark:text-white mb-4">
                          Benefits & Perks
                        </h3>
                        <div className="grid grid-cols-2 gap-2">
                          {selectedJob.benefits.map((benefit) => (
                            <div
                              key={benefit}
                              className="flex items-center gap-2"
                            >
                              <div className="h-2 w-2 rounded-full bg-pink-500" />
                              <span className="text-sm text-gray-700 dark:text-gray-300">
                                {benefit}
                              </span>
                            </div>
                          ))}
                        </div>
                      </Card>
                    )}

                    {/* Action Buttons */}
                    <Card className="flex gap-3 bg-gray-100 dark:bg-gray-800">
                      <Button
                        onClick={() => setShowApplicationModal(true)}
                        className="flex-1"
                      >
                        <Send className="mr-2 h-4 w-4" />
                        Apply Now
                      </Button>
                      <Button variant="outline" className="flex-1">
                        <Share2 className="mr-2 h-4 w-4" />
                        Share
                      </Button>
                    </Card>
                  </motion.div>
                ) : (
                  <Card className="flex items-center justify-center h-96">
                    <p className="text-gray-500 dark:text-gray-400">
                      Select a job to view details
                    </p>
                  </Card>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      {/* Application Modal */}
      {showApplicationModal && selectedJob && (
        <ApplicationModal
          job={selectedJob}
          isOpen={showApplicationModal}
          onClose={() => setShowApplicationModal(false)}
        />
      )}

      <Footer />
    </>
  );
};

// Application Modal Component
const ApplicationModal: React.FC<{
  job: Job;
  isOpen: boolean;
  onClose: () => void;
}> = ({ job, isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    yearsOfExperience: "",
    resumeUrl: "",
  });

  const handleSubmit = () => {
    if (step === 3) {
      // Submit application
      onClose();
      setStep(1);
      setFormData({
        fullName: "",
        email: "",
        yearsOfExperience: "",
        resumeUrl: "",
      });
    } else {
      setStep(step + 1);
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        className="bg-white dark:bg-gray-900 rounded-2xl max-w-2xl w-full p-8"
        onClick={(e) => e.stopPropagation()}
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
      >
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Apply for {job.title}
        </h2>

        {/* Step Indicator */}
        <div className="flex gap-2 mb-8">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={cn(
                "h-2 flex-1 rounded-full transition-colors",
                s <= step ? "bg-pink-500" : "bg-gray-300 dark:bg-gray-700",
              )}
            />
          ))}
        </div>

        {/* Step 1: Contact Info */}
        {step === 1 && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) =>
                  setFormData({ ...formData, fullName: e.target.value })
                }
                placeholder="John Doe"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg dark:bg-gray-800 dark:border-gray-700"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="john@example.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg dark:bg-gray-800 dark:border-gray-700"
              />
            </div>
          </div>
        )}

        {/* Step 2: Experience */}
        {step === 2 && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                Years of Experience
              </label>
              <input
                type="number"
                value={formData.yearsOfExperience}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    yearsOfExperience: e.target.value,
                  })
                }
                placeholder="5"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg dark:bg-gray-800 dark:border-gray-700"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                Resume URL
              </label>
              <input
                type="text"
                value={formData.resumeUrl}
                onChange={(e) =>
                  setFormData({ ...formData, resumeUrl: e.target.value })
                }
                placeholder="https://example.com/resume.pdf"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg dark:bg-gray-800 dark:border-gray-700"
              />
            </div>
          </div>
        )}

        {/* Step 3: Review */}
        {step === 3 && (
          <div className="space-y-4 bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Full Name
              </p>
              <p className="font-semibold text-gray-900 dark:text-white">
                {formData.fullName}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Email</p>
              <p className="font-semibold text-gray-900 dark:text-white">
                {formData.email}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Experience
              </p>
              <p className="font-semibold text-gray-900 dark:text-white">
                {formData.yearsOfExperience} years
              </p>
            </div>
          </div>
        )}

        {/* Buttons */}
        <div className="flex gap-3 mt-8">
          <Button variant="outline" onClick={onClose} className="flex-1">
            Cancel
          </Button>
          <Button
            onClick={() => setStep(Math.max(1, step - 1))}
            disabled={step === 1}
            className="flex-1"
          >
            Back
          </Button>
          <Button onClick={handleSubmit} className="flex-1">
            {step === 3 ? "Submit Application" : "Next"}
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
};

