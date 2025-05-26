"use client";

import { Usercard } from "@/components/custom/user-card";
import { Employee, useEmployeeStore } from "@/lib/store";


export default function BookmarksPage() {

    const {bookmarkedIds, employees} = useEmployeeStore();
    const bookmarkedEmployees: Employee[] = employees.filter((employee) => bookmarkedIds.includes(employee.id));


  return (
    <div className="p-2 overflow-auto">
      <main className="flex flex-col gap-2">
        <div className=" py-2">
          <h1 className="text-4xl font-bold">Bookmarked Employees</h1>
          <p className="text-muted-foreground">
            Manage your saved employee profiles and quick actions
          </p>
        </div>

        <div className="py-2 flex  gap-6 justify-between">
          <div className="h-20 w-1/3 flex flex-col justify-center items-center rounded-2xl bg-amber-400/10 border-amber-400/20 border">
            <p className="text-2xl font-medium text-amber-400" >{bookmarkedIds.length}</p>
            <p className="text-sm text-muted-foreground">Total Bookmarked</p>
          </div>
          <div className="h-20 rounded-2xl w-1/3 bg-green-400/10 border border-green-400/20"></div>
          <div className="h-20 rounded-2xl w-1/3 bg-blue-400/10 border border-blue-400/20"></div>
        </div>

        <div className="py-2 ">
          <div className="p-1">
            <div className="mb-4">
              <h2 className="font-semibold text-2xl">
                Bookmarked Members ({bookmarkedIds.length})
              </h2>
            </div>
            <div className="grid grid-cols-3 gap-6">
              {bookmarkedEmployees.map((employee: Employee) => (
                <Usercard user={employee} key={employee.id} />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
