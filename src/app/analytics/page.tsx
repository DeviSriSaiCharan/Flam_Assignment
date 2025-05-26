"use client";

import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useMemo } from "react";
import { useEmployeeStore } from "@/lib/store";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function AnalyticsPage() {
  const { employees } = useEmployeeStore();

  const departmentRatingData = useMemo(() => {
    // Handle empty employees array
    if (!employees || employees.length === 0) {
      return {
        labels: [],
        datasets: [
          {
            label: "Avg Rating",
            data: [],
            backgroundColor: "rgba(75, 192, 192, 0.6)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
        ],
      };
    }

    const departmentMap: Record<string, { sum: number; count: number }> = {};

    for (const emp of employees) {
      // Add null checks for nested properties
      const dept = emp?.company?.department || "Unknown";
      const rating = emp?.rating || 0;

      if (!departmentMap[dept]) {
        departmentMap[dept] = { sum: 0, count: 0 };
      }
      departmentMap[dept].sum += rating;
      departmentMap[dept].count += 1;
    }

    const labels = Object.keys(departmentMap);
    const data = labels.map((dept) => {
      const avg = departmentMap[dept].sum / departmentMap[dept].count;
      return Number(avg.toFixed(2)); // Round to 2 decimal places
    });

    return {
      labels,
      datasets: [
        {
          label: "Avg Rating",
          data,
          backgroundColor: "rgba(75, 192, 192, 0.6)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
      ],
    };
  }, [employees]);

  const bookmarkTrendData = useMemo(() => ({
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [
      {
        label: "Bookmarks",
        data: [5, 10, 7, 12],
        fill: false,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        tension: 0.3,
      },
    ],
  }), []);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="p-4 overflow-auto">
      <main className="flex flex-col gap-6">
        <div className="py-2">
          <h1 className="text-4xl font-bold">Analytics Dashboard</h1>
          <p className="text-muted-foreground">
            Comprehensive insights into team performance and metrics
          </p>
        </div>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="border p-6 rounded-xl shadow">
            <h2 className="text-xl font-semibold mb-4">Department-wise Avg Ratings</h2>
            <div className="h-64">
              {employees && employees.length > 0 ? (
                <Bar data={departmentRatingData} options={chartOptions} />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500">
                  No employee data available
                </div>
              )}
            </div>
          </div>

          <div className="border p-6 rounded-xl shadow">
            <h2 className="text-xl font-semibold mb-4">Bookmark Trends (Mocked)</h2>
            <div className="h-64">
              <Line data={bookmarkTrendData} options={lineChartOptions} />
            </div>
          </div>
        </section>


        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border p-4 rounded-xl shadow">
            <h3 className="text-lg font-semibold text-gray-700">Total Employees</h3>
            <p className="text-3xl font-bold text-blue-600">{employees?.length || 0}</p>
          </div>
          
          <div className="border p-4 rounded-xl shadow">
            <h3 className="text-lg font-semibold text-gray-700">Departments</h3>
            <p className="text-3xl font-bold text-green-600">
              {employees?.length > 0 
                ? new Set(employees.map(emp => emp?.company?.department || "Unknown")).size 
                : 0
              }
            </p>
          </div>
          
          <div className="border p-4 rounded-xl shadow">
            <h3 className="text-lg font-semibold text-gray-700">Avg Overall Rating</h3>
            <p className="text-3xl font-bold text-purple-600">
              {employees?.length > 0 
                ? (employees.reduce((sum, emp) => sum + (emp?.rating || 0), 0) / employees.length).toFixed(1)
                : "0.0"
              }
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}