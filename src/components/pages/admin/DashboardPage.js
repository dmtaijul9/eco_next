import { Container } from "@/components/Container";
import PageLoader from "@/components/PageLoader";
import { formateMoney } from "@/tools/importantTools";
import { getDashboardAnalyticsQuery } from "@/utils/resolvers/query";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import React from "react";
import NewOrderTable from "./NewOrderTable";

const DashboardPage = () => {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated: () => {
      return { redirect: { destination: "/login", permanent: false } };
    },
  });

  const { data, isLoading, isError } = useQuery({
    queryKey: ["dashboard"],
    queryFn: getDashboardAnalyticsQuery,
  });

  const dashboardData = data?.data;

  if (status === "loading" || isLoading) {
    return <PageLoader />;
  }

  return (
    <Container>
      <main className="py-10">
        <div className="flex flex-col justify-between space-y-6 md:space-y-0 md:flex-row">
          <div className="mr-6">
            <h1 className="mb-2 text-4xl font-semibold">Dashboard</h1>
          </div>
          <div className="flex flex-wrap items-start justify-end -mb-3">
            <h1 className="font-semibold text-gray-950 ">
              HI! {session?.user?.first_name} {session?.user?.last_name}
            </h1>
          </div>
        </div>
        <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          <div className="flex items-center p-8 bg-white rounded-lg shadow">
            <div className="inline-flex items-center justify-center flex-shrink-0 w-16 h-16 mr-6 text-purple-600 bg-purple-100 rounded-full">
              <svg
                aria-hidden="true"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <div>
              <span className="block text-2xl font-bold">
                {dashboardData?.usersCount}
              </span>
              <span className="block text-gray-500">Total Customers</span>
            </div>
          </div>
          <div className="flex items-center p-8 bg-white rounded-lg shadow">
            <div className="inline-flex items-center justify-center flex-shrink-0 w-16 h-16 mr-6 text-green-600 bg-green-100 rounded-full">
              <svg
                aria-hidden="true"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                />
              </svg>
            </div>
            <div>
              <span className="block text-2xl font-bold">
                {dashboardData?.totalProductPurchase}
              </span>
              <span className="block text-gray-500">
                Total Product Purchased{" "}
              </span>
            </div>
          </div>
          <div className="flex items-center p-8 bg-white rounded-lg shadow">
            <div className="inline-flex items-center justify-center flex-shrink-0 w-16 h-16 mr-6 text-red-600 bg-red-100 rounded-full">
              <svg
                aria-hidden="true"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"
                />
              </svg>
            </div>
            <div>
              <span className="inline-block text-2xl font-bold">
                {dashboardData?.ordersCount}
              </span>

              <span className="block text-gray-500">Total Order</span>
            </div>
          </div>
          <div className="flex items-center p-8 bg-white rounded-lg shadow">
            <div className="inline-flex items-center justify-center flex-shrink-0 w-16 h-16 mr-6 text-blue-600 bg-blue-100 rounded-full">
              <svg
                aria-hidden="true"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>
            <div>
              <span className="block text-2xl font-bold">
                {dashboardData?.productsCount}
              </span>
              <span className="block text-gray-500">Total Product</span>
            </div>
          </div>
          <div className="flex items-center p-8 bg-white rounded-lg shadow">
            <div className="inline-flex items-center justify-center flex-shrink-0 w-16 h-16 mr-6 text-blue-600 bg-blue-100 rounded-full">
              <svg
                aria-hidden="true"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>
            <div>
              <span className="block text-2xl font-bold">
                {formateMoney(dashboardData?.totalRevenue)}
              </span>
              <span className="block text-gray-500">Total Revenue</span>
            </div>
          </div>
          <div className="flex items-center p-8 bg-white rounded-lg shadow">
            <div className="inline-flex items-center justify-center flex-shrink-0 w-16 h-16 mr-6 text-blue-600 bg-blue-100 rounded-full">
              <svg
                aria-hidden="true"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>
            <div>
              <span className="block text-2xl font-bold">
                {dashboardData?.pendingOrdersCount}
              </span>
              <span className="block text-gray-500">Total Pending Order</span>
            </div>
          </div>
        </section>
        <section className="mt-5 shadow-md">
          <NewOrderTable newOrders={dashboardData?.newOrders} />
        </section>
      </main>
    </Container>
  );
};

export default DashboardPage;
