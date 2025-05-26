"use client"

import { SearchFilter } from "@/components/custom/searchfilter";
import { useEffect, useState } from "react";
import { Usercard } from "@/components/custom/user-card";
import { useEmployeeStore } from "@/lib/store";
import { fetchEmployees } from "@/lib/api";
import axios from "axios";


export default function Home() {
  const {employees, setEmployees, getFilteredEmployees, bookmarkedIds} = useEmployeeStore();
  const filteredEmployees = getFilteredEmployees();

  useEffect(() =>{
    async function getEmployees(){
      if(employees.length == 0){
        const e = await fetchEmployees();
        setEmployees(e);
      }
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

        <div className="py-2">
            <SearchFilter/>
            <div className="p-1 grid grid-cols-3 gap-10">
              <div>
                <h2>Team Members ({filteredEmployees.length})</h2>
              </div>
              <div>
                
              </div>
            </div>

        </div>
      </main>
    </div>
  );
}
