import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { BarChart3, FileText, CheckCircle, XCircle, Clock } from "lucide-react";
import { Header, Footer } from "../components/common";
import { Card, Button } from "../components/ui";
import { useApplicationsStore, useJobsStore } from "../stores";
import { formatDate } from "../lib/utils";

export const CandidateDashboard: React.FC = () => {
  const { stats, applications, calculateStats } = useApplicationsStore();
  const { savedJobs } = useJobsStore();

  useEffect(() => {
    calculateStats();
  }, [calculateStats]);

  const statCards = [
    {
      icon: FileText,
      label: "Applied",
      value: stats.applied,
      color: "bg-blue-500",
    },
    {
      icon: Clock,
      label: "Interviewing",
      value: stats.interviewing,
      color: "bg-yellow-500",
    },
    {
      icon: CheckCircle,
      label: "Offers",
      value: stats.offers,
      color: "bg-green-500",
    },
    {
      icon: XCircle,
      label: "Rejected",
      value: stats.rejected,
      color: "bg-red-500",
    },
  ];

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
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              My Dashboard
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Track your applications and opportunities
            </p>
          </motion.div>

          {/* Stats Cards */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {statCards.map(({ icon: Icon, label, value, color }) => (
              <motion.div key={label} variants={itemVariants}>
                <Card>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                        {label}
                      </p>
                      <p className="text-4xl font-bold text-gray-900 dark:text-white">
                        {value}
                      </p>
                    </div>
                    <div className={`${color} p-4 rounded-lg text-white`}>
                      <Icon className="h-6 w-6" />
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Profile Completion */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Profile Completion
                </h2>
                <span className="text-2xl font-bold text-pink-600">65%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4 dark:bg-gray-700">
                <div
                  className="bg-gradient-to-r from-pink-500 to-pink-600 h-4 rounded-full transition-all duration-500 w-[65%]"
                />
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-3">
                Complete your profile to get better job matches
              </p>
            </Card>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Applications */}
            <motion.div
              className="lg:col-span-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    Recent Applications
                  </h2>
                  <BarChart3 className="h-5 w-5 text-pink-500" />
                </div>

                {applications.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      No applications yet. Start applying to jobs!
                    </p>
                    <Button>Browse Jobs</Button>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-gray-200 dark:border-gray-700">
                          <th className="text-left py-3 px-3 font-semibold text-gray-900 dark:text-white">
                            Job Title
                          </th>
                          <th className="text-left py-3 px-3 font-semibold text-gray-900 dark:text-white">
                            Company
                          </th>
                          <th className="text-left py-3 px-3 font-semibold text-gray-900 dark:text-white">
                            Status
                          </th>
                          <th className="text-left py-3 px-3 font-semibold text-gray-900 dark:text-white">
                            Date
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {applications.map((app) => (
                          <tr
                            key={app.id}
                            className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
                          >
                            <td className="py-3 px-3 text-gray-900 dark:text-white">
                              {app.fullName}
                            </td>
                            <td className="py-3 px-3 text-gray-600 dark:text-gray-400">
                              {app.email}
                            </td>
                            <td className="py-3 px-3">
                              <span
                                className={`px-3 py-1 rounded-full text-xs font-medium ${
                                  app.status === "applied"
                                    ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                                    : app.status === "interviewing"
                                      ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                                      : app.status === "offer"
                                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                                        : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                                }`}
                              >
                                {app.status}
                              </span>
                            </td>
                            <td className="py-3 px-3 text-gray-600 dark:text-gray-400">
                              {formatDate(app.appliedDate)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </Card>
            </motion.div>

            {/* Saved Jobs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                  Saved Jobs ({savedJobs.length})
                </h2>

                {savedJobs.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      No saved jobs yet
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {savedJobs.map((job) => (
                      <Card
                        key={job.jobId}
                        className="p-4 cursor-pointer hover:border-pink-500 transition-colors"
                      >
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          Job #{job.jobId}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          Saved {formatDate(job.savedAt)}
                        </p>
                      </Card>
                    ))}
                  </div>
                )}
              </Card>
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};
