import { useEmployeeStore } from "@/lib/store";
import { Users, Bookmark, TrendingUp, Award } from "lucide-react";
import {JSX} from "react";



export function DashboardSummary(): JSX.Element {

    const {employees, bookmarkedIds} = useEmployeeStore();

    const items = [
    {
      title: "Total Employees",
      value: employees.length,
      icon: <Users className="w-5 h-5 text-blue-400 font-thin" />,
      color: "hover:border-blue-400/30 hover:shadow-lg hover:shadow-blue-400/20",
      textColor: "text-blue-400",
      iconColor: "border-blue-900 bg-blue-400/20"
    },
    {
      title: "Bookmarked",
      value: bookmarkedIds.length,
      icon: <Bookmark className="w-5 h-5 text-yellow-400 font-thin" />,
      color: "hover:border-yellow-400/30 hover:shadow-lg hover:shadow-yellow-400/20",
      textColor: "text-yellow-400",
      iconColor: "border-yellow-900 bg-yellow-400/20"
    },
    {
      title: "High Performance",
      value: employees.filter(emp => emp.rating >= 3).length,
      icon: <TrendingUp className="w-5 h-5 text-green-400 font-thin" />,
      color: "hover:border-green-400/30 hover:shadow-lg hover:shadow-green-400/20",
      textColor: "text-green-400",
      iconColor: "border-green-900 bg-green-400/20"
    },
    {
      title: "Top Rated",
      value: employees.filter(emp => emp.rating >= 4).length,
      icon: <Award className="w-5 h-5 text-purple-400 font-thin" />,
      color: "hover:border-purple-400/30 hover:shadow-lg hover:shadow-purple-400/20",
      textColor: "text-purple-400",
      iconColor: "border-purple-900 bg-purple-400/20"
    }
  ]

    return (
        <>
            <div className=" py-2">
              <h1 className="text-4xl font-bold">HR Dashboard</h1>
              <p className="text-muted-foreground">Manage your team performance and track employee metrics</p>
            </div>

            <div className="py-2  flex gap-6">
              {
                items.map((item, index) => (
                  <div key={index} className={`rounded-2xl w-1/4 border  ${item.color}`}>
                    <div className="flex items-center justify-between p-4">
                      <p className="text-muted-foreground font-medium">{item.title}</p>
                      <div className={`border rounded-lg p-2  ${item.iconColor}`}>
                        {item.icon}
                      </div>
                    </div>
                    <p className={`px-4 py-2 text-3xl font-bold ${item.textColor}`}>{item.value}</p>
                  </div>
                ))
              }

            </div>
        </>
    )
}
