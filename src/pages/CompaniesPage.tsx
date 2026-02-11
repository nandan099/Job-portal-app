import React from "react";
import { ArrowRight, Globe } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Footer, Header } from "../components/common";
import { Button, Card } from "../components/ui";
import { mockCompanies } from "../data/mockData";

export const CompaniesPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 dark:bg-gray-950">
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
              Companies
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Explore companies hiring on JobHub.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {mockCompanies.map((company) => (
              <Card key={company.id} className="flex h-full flex-col">
                <div className="mb-4 flex items-start gap-3">
                  <div className="text-4xl leading-none">{company.logo}</div>
                  <div>
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                      {company.name}
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {company.industry}
                    </p>
                  </div>
                </div>

                <p className="mb-4 text-sm text-gray-700 dark:text-gray-300">
                  {company.description}
                </p>

                <div className="mb-5 space-y-1 text-sm text-gray-600 dark:text-gray-400">
                  <p>Company size: {company.size}</p>
                  <p>Employees: {company.employees.toLocaleString()}</p>
                </div>

                <div className="mt-auto flex gap-2">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() =>
                      window.open(`https://${company.website}`, "_blank", "noopener,noreferrer")
                    }
                  >
                    <Globe className="mr-2 h-4 w-4" />
                    Website
                  </Button>
                  <Button className="flex-1" onClick={() => navigate("/jobs")}>
                    View Jobs
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};
