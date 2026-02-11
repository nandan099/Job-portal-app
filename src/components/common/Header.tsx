import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../stores";
import { Button } from "../ui";
import { LogOut, Moon, Sun } from "lucide-react";
import { useDarkMode } from "../../lib/hooks";

export const Header: React.FC = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const { isDark, toggle } = useDarkMode();

  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2 font-bold text-2xl">
            <div className="bg-gradient-to-r from-pink-500 to-pink-600 bg-clip-text text-transparent">
              JobHub
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link
              to="/jobs"
              className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
            >
              Jobs
            </Link>
            <Link
              to="/companies"
              className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
            >
              Companies
            </Link>
            {user?.role === "employer" && (
              <Link
                to="/employer"
                className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              >
                Dashboard
              </Link>
            )}
            {user?.role === "job_seeker" && (
              <Link
                to="/dashboard"
                className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              >
                My Dashboard
              </Link>
            )}
          </nav>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={toggle}
              className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg dark:text-gray-400 dark:hover:bg-gray-800"
              aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
              title={isDark ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDark ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>

            {user ? (
              <div className="flex items-center gap-3">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {user.name}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                    {user.role.replace("_", " ")}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    logout();
                    navigate("/");
                  }}
                  className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg dark:text-gray-400 dark:hover:bg-gray-800"
                  aria-label="Log out"
                  title="Log out"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate("/auth/login")}
                >
                  Login
                </Button>
                <Button size="sm" onClick={() => navigate("/auth/signup")}>
                  Sign Up
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
