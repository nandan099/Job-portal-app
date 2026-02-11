import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, MapPin, ArrowRight } from "lucide-react";
import { Header, Footer } from "../components/common";
import { Button, Card, Input } from "../components/ui";
import { jobCategories, mockCompanies } from "../data/mockData";
import { useFiltersStore } from "../stores";

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const { setSearchQuery, setLocation } = useFiltersStore();
  const [jobTitle, setJobTitle] = useState("");
  const [location, setLocationState] = useState("");

  const handleSearch = () => {
    setSearchQuery(jobTitle);
    setLocation(location);
    navigate("/jobs");
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <>
      <Header />
      <main className="bg-gradient-to-b from-pink-50 to-white dark:from-gray-950 dark:to-gray-900">
        {/* Hero Section */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
          <motion.div
            className="text-center"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6"
              variants={itemVariants}
            >
              Find Your{" "}
              <span className="bg-gradient-to-r from-pink-500 to-pink-600 bg-clip-text text-transparent">
                Dream Job
              </span>
            </motion.h1>

            <motion.p
              className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto"
              variants={itemVariants}
            >
              Discover amazing opportunities with top companies. Your next
              career move is just a click away.
            </motion.p>

            {/* Search Bar */}
            <motion.div
              className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto mb-12"
              variants={itemVariants}
            >
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="Job title or keyword"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  className="pl-10"
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                />
              </div>
              <div className="flex-1 relative sm:flex-none">
                <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="Location"
                  value={location}
                  onChange={(e) => setLocationState(e.target.value)}
                  className="pl-10"
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                />
              </div>
              <Button onClick={handleSearch} className="w-full sm:w-auto">
                Find Jobs
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>

            <motion.p
              className="text-sm text-gray-500 dark:text-gray-400 mb-20"
              variants={itemVariants}
            >
              Popular: React Developer, Product Manager, UX Designer
            </motion.p>
          </motion.div>
        </section>

        {/* Job Categories */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12">
              Explore by Category
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {jobCategories.map((category, idx) => (
                <motion.div
                  key={category.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="flex items-center gap-4 cursor-pointer hover:border-pink-500 transition-colors">
                    <span className="text-3xl">{category.icon}</span>
                    <div className="text-left">
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {category.name}
                      </h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {category.count} jobs
                      </p>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Top Companies */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12">
              Top Companies Hiring Now
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              {mockCompanies.map((company) => (
                <motion.div
                  key={company.id}
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card className="text-center hover:border-pink-500">
                    <div className="text-4xl mb-3 text-center">
                      {company.logo}
                    </div>
                    <h3 className="font-bold text-gray-900 dark:text-white mb-1">
                      {company.name}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                      {company.industry}
                    </p>
                    <Button variant="outline" className="w-full text-xs">
                      View Jobs
                    </Button>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* CTA Section */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
          <motion.div
            className="bg-gradient-to-r from-pink-500 to-pink-600 rounded-2xl p-12 text-center text-white"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-4">
              Ready to Find Your Next Role?
            </h2>
            <p className="text-pink-100 mb-8 max-w-2xl mx-auto">
              Join thousands of job seekers who have found their perfect match
              on JobHub.
            </p>
            <Button
              onClick={() => navigate("/jobs")}
              className="bg-white text-pink-600 hover:bg-gray-100"
            >
              Browse All Jobs
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        </section>
      </main>
      <Footer />
    </>
  );
};
