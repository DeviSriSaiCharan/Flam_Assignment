"use client"

import { SearchFilter } from "@/components/custom/searchfilter";
import { useEffect, useState } from "react";
import { Usercard } from "@/components/custom/user-card";
import { Employee, useEmployeeStore } from "@/lib/store";
import { fetchEmployees } from "@/lib/api";
import { useSearch } from "@/hooks/use-search";
import { UserSkeleton } from "@/components/custom/user-skeleton";
import { DashboardSummary } from "@/components/custom/dashboard-summary";


export default function Home() {
  const {employees, setEmployees, hydrate} = useEmployeeStore();
  const [loading, setLoading] = useState<boolean>(true);

  const {filteredEmployees} = useSearch();
  
  useEffect(() =>{
    async function getEmployees(){
      
      if(!hydrate) return;

      if(employees.length === 0) {
        const e: Employee[] = await fetchEmployees(0);
        setEmployees(e);
      }
      console.log(employees[0]);
      setLoading(false);
    }

    getEmployees();
  },[employees.length, setEmployees]);

  return (
    <div className="p-2 overflow-auto">
      <main className="flex flex-col gap-2">
        
        <DashboardSummary />

        <div className="py-2 ">
            <SearchFilter/>
            <div className="p-1">
              <div className="mb-4">
                <h2 className="font-semibold text-2xl" >Team Members ({filteredEmployees.length})</h2>
              </div>
              <div className="grid grid-cols-3 gap-6" >
                {
                  filteredEmployees.map((employee: Employee) => (
                    <Usercard user={employee} key={employee.id}/>
                  ))
                }

                {
                  loading && 
                  [...Array(6)].map((_, i) => (
                      <UserSkeleton key={i}/>
                  ))
                }
              </div>
            </div>

        </div>
      </main>
    </div>
  );
}
