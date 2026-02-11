import React, { useState } from "react";
import { motion } from "framer-motion";
import { Edit, Trash2, Plus, Users, TrendingUp } from "lucide-react";
import { Header, Footer } from "../components/common";
import { Card, Button } from "../components/ui";
import { mockJobs } from "../data/mockData";
import { formatDate } from "../lib/utils";

export const EmployerDashboard: React.FC = () => {
  const [jobs] = useState(mockJobs);
  const [showNewJobModal, setShowNewJobModal] = useState(false);

  const activeJobs = jobs.filter(() => true); // In real app, filter by status

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 dark:bg-gray-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <motion.div
            className="flex items-center justify-between mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                Employer Dashboard
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Manage your job postings and candidates
              </p>
            </div>
            <Button
              onClick={() => setShowNewJobModal(true)}
              className="flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Post New Job
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants}>
              <Card>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                      Active Jobs
                    </p>
                    <p className="text-4xl font-bold text-gray-900 dark:text-white">
                      {activeJobs.length}
                    </p>
                  </div>
                  <div className="bg-blue-500 p-4 rounded-lg text-white">
                    <TrendingUp className="h-6 w-6" />
                  </div>
                </div>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                      Total Applicants
                    </p>
                    <p className="text-4xl font-bold text-gray-900 dark:text-white">
                      {jobs.reduce((acc, job) => acc + job.applicants, 0)}
                    </p>
                  </div>
                  <div className="bg-green-500 p-4 rounded-lg text-white">
                    <Users className="h-6 w-6" />
                  </div>
                </div>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                      Avg. Applicants
                    </p>
                    <p className="text-4xl font-bold text-gray-900 dark:text-white">
                      {Math.round(
                        jobs.reduce((acc, job) => acc + job.applicants, 0) /
                          jobs.length,
                      )}
                    </p>
                  </div>
                  <div className="bg-pink-500 p-4 rounded-lg text-white">
                    <TrendingUp className="h-6 w-6" />
                  </div>
                </div>
              </Card>
            </motion.div>
          </motion.div>

          {/* Job Postings Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                Your Job Postings
              </h2>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <th className="text-left py-3 px-3 font-semibold text-gray-900 dark:text-white">
                        Job Title
                      </th>
                      <th className="text-left py-3 px-3 font-semibold text-gray-900 dark:text-white">
                        Location
                      </th>
                      <th className="text-left py-3 px-3 font-semibold text-gray-900 dark:text-white">
                        Applicants
                      </th>
                      <th className="text-left py-3 px-3 font-semibold text-gray-900 dark:text-white">
                        Status
                      </th>
                      <th className="text-left py-3 px-3 font-semibold text-gray-900 dark:text-white">
                        Posted
                      </th>
                      <th className="text-left py-3 px-3 font-semibold text-gray-900 dark:text-white">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {jobs.map((job) => (
                      <tr
                        key={job.id}
                        className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                      >
                        <td className="py-3 px-3">
                          <div>
                            <p className="font-semibold text-gray-900 dark:text-white">
                              {job.title}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              {job.company}
                            </p>
                          </div>
                        </td>
                        <td className="py-3 px-3 text-gray-600 dark:text-gray-400">
                          {job.location}
                        </td>
                        <td className="py-3 px-3">
                          <span className="px-3 py-1 rounded-full bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200 font-medium">
                            {job.applicants}
                          </span>
                        </td>
                        <td className="py-3 px-3">
                          <span className="px-3 py-1 rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 text-xs font-medium">
                            Active
                          </span>
                        </td>
                        <td className="py-3 px-3 text-gray-600 dark:text-gray-400">
                          {formatDate(job.postedDate)}
                        </td>
                        <td className="py-3 px-3">
                          <div className="flex gap-2">
                            <button title="Edit job posting" className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors">
                              <Edit className="h-4 w-4 text-blue-600" />
                            </button>
                            <button title="Delete job posting" className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors">
                              <Trash2 className="h-4 w-4 text-red-600" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </motion.div>

          {/* Recent Applicants */}
          <motion.div
            className="mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                Recent Applicants
              </h2>

              <div className="space-y-4">
                {[...Array(5)].map((_, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
                  >
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        Candidate #{idx + 1}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Applied 2 hours ago
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      Review
                    </Button>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>
      </main>

      {showNewJobModal && (
        <motion.div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setShowNewJobModal(false)}
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
              Post New Job
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Feature coming soon. Fill out the form to create a new job
              posting.
            </p>
            <Button
              onClick={() => setShowNewJobModal(false)}
              className="w-full"
            >
              Close
            </Button>
          </motion.div>
        </motion.div>
      )}

      <Footer />
    </>
  );
};
