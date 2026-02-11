import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useAuthStore } from "./stores";
import {
  LandingPage,
  JobListingPage,
  CandidateDashboard,
  EmployerDashboard,
  LoginPage,
  SignupPage,
  CompaniesPage,
} from "./pages";

// Protected Route Component
const ProtectedRoute: React.FC<{
  children: React.ReactNode;
  requiredRole?: string;
}> = ({ children, requiredRole }) => {
  const { user } = useAuthStore();

  if (!user) {
    return <Navigate to="/auth/login" replace />;
  }

  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

function App() {
  useEffect(() => {
    // Initialize dark mode on mount
    const htmlElement = document.documentElement;
    const isDark = localStorage.getItem("darkMode") === "true";
    if (isDark) {
      htmlElement.classList.add("dark");
    }
  }, []);

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/jobs" element={<JobListingPage />} />
        <Route path="/companies" element={<CompaniesPage />} />

        {/* Auth Routes */}
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/signup" element={<SignupPage />} />

        {/* Protected Routes - Job Seeker */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute requiredRole="job_seeker">
              <CandidateDashboard />
            </ProtectedRoute>
          }
        />

        {/* Protected Routes - Employer */}
        <Route
          path="/employer"
          element={
            <ProtectedRoute requiredRole="employer">
              <EmployerDashboard />
            </ProtectedRoute>
          }
        />

        {/* Catch all - redirect to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
