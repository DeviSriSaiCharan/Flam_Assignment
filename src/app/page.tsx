"use client"

import { SearchFilter } from "@/components/custom/searchfilter";
import { useEffect } from "react";
import { Usercard } from "@/components/custom/user-card";
import { Employee, useEmployeeStore } from "@/lib/store";
import { fetchEmployees } from "@/lib/api";
import { useSearch } from "@/hooks/use-search";


export default function Home() {
  const {employees, setEmployees, bookmarkedIds} = useEmployeeStore();
  
  const {filteredEmployees} = useSearch();

  useEffect(() =>{
    async function getEmployees(){
      if(employees.length == 0){
        const e = await fetchEmployees();
        setEmployees(e);
      }
      console.log(employees);
    }

    getEmployees();
  },[employees.length, setEmployees])

  return (
    <div className="p-2 overflow-auto">
      <main className="flex flex-col gap-2">
        <div className=" py-2">
          <h1 className="text-4xl font-bold">HR Dashboard</h1>
          <p className="text-muted-foreground">Manage your team performance and track employee metrics</p>
        </div>

        <div className="py-2  flex gap-6">
            <div className="h-36 rounded-2xl w-1/4 bg-amber-400"></div>
            <div className="h-36 rounded-2xl w-1/4 bg-amber-400"></div>
            <div className="h-36 rounded-2xl w-1/4 bg-amber-400"></div>
            <div className="h-36 rounded-2xl w-1/4 bg-amber-400"></div>
        </div>

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
              </div>
            </div>

        </div>
      </main>
    </div>
  );
}
