import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuthStore } from "../stores";
import { Button, Card, Input } from "../components/ui";
import { Header } from "../components/common";
import type { User } from "../types";

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuthStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"job_seeker" | "employer">("job_seeker");

  const handleLogin = () => {
    const mockUser: User = {
      id: "1",
      name: "John Doe",
      email,
      role,
      createdAt: new Date(),
    };
    login(mockUser);
    navigate(role === "job_seeker" ? "/dashboard" : "/employer");
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
              Welcome Back
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Sign in to your JobHub account
            </p>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                  Email
                </label>
                <Input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                  Password
                </label>
                <Input
                  type="password"
                  placeholder="********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="role" className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                  I am a...
                </label>
                <select
                  id="role"
                  value={role}
                  onChange={(e) =>
                    setRole(e.target.value as "job_seeker" | "employer")
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg dark:bg-gray-800 dark:border-gray-700"
                >
                  <option value="job_seeker">Job Seeker</option>
                  <option value="employer">Employer</option>
                </select>
              </div>
            </div>

            <Button onClick={handleLogin} className="w-full mb-4">
              Sign In
            </Button>

            <p className="text-center text-sm text-gray-600 dark:text-gray-400">
              Don't have an account?{" "}
              <button
                onClick={() => navigate("/auth/signup")}
                className="text-pink-600 hover:text-pink-700 font-medium"
              >
                Sign up
              </button>
            </p>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};
