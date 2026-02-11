import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuthStore } from "../stores";
import { Button, Card, Input } from "../components/ui";
import { Header } from "../components/common";
import type { User } from "../types";
import { generateId } from "../lib/utils";

export const SignupPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuthStore();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "job_seeker" as "job_seeker" | "employer",
  });

  const handleSignup = () => {
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const mockUser: User = {
      id: generateId(),
      name: formData.name,
      email: formData.email,
      role: formData.role,
      createdAt: new Date(),
    };

    login(mockUser);
    navigate(formData.role === "job_seeker" ? "/dashboard" : "/employer");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-white dark:from-gray-950 dark:to-gray-900">
      <Header />
      <div className="flex items-center justify-center min-h-[calc(100vh-64px)]">
        <motion.div
          className="w-full max-w-md px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Card className="p-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Create Account
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Join JobHub and start your journey
            </p>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                  Full Name
                </label>
                <Input
                  type="text"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                  Email
                </label>
                <Input
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                  Password
                </label>
                <Input
                  type="password"
                  placeholder="********"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                  Confirm Password
                </label>
                <Input
                  type="password"
                  placeholder="********"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      confirmPassword: e.target.value,
                    })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                  I am a...
                </label>
                <select
                  aria-label="User role selection"
                  value={formData.role}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      role: e.target.value as "job_seeker" | "employer",
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg dark:bg-gray-800 dark:border-gray-700"
                >
                  <option value="job_seeker">Job Seeker</option>
                  <option value="employer">Employer</option>
                </select>
              </div>
            </div>

            <Button onClick={handleSignup} className="w-full mb-4">
              Create Account
            </Button>

            <p className="text-center text-sm text-gray-600 dark:text-gray-400">
              Already have an account?{" "}
              <button
                onClick={() => navigate("/auth/login")}
                className="text-pink-600 hover:text-pink-700 font-medium"
              >
                Sign in
              </button>
            </p>

            <p className="text-center text-xs text-gray-500 dark:text-gray-500 mt-6">
              By signing up, you agree to our Terms of Service and Privacy
              Policy
            </p>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};
