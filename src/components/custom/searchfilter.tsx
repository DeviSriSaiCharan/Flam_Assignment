"use client"

import { JSX } from "react";
import { Input } from "@/components/ui/input";
import { DropdownFilter } from "./dropdown-filter";
import { useEmployeeStore } from "@/lib/store";
import { Badge } from "./badge";
import { Button } from "./button";
import { Trash2 } from "lucide-react";
import { useSearch } from "@/hooks/use-search";

const departments: string[] = ["Engineering", "Support", "Research and Development", "Human Resource", "Product Manager", "Marketing", "Accounting", "Services", "Training", "Legal"];
const ratings: number[] = [1,2,3,4,5];


export function SearchFilter(): JSX.Element{

    const {selectedDepartments, selectedRatings, setSelectedDepartments, setSelectedRatings} = useEmployeeStore();
    const {searchQuery, setSearchQuery} = useSearch();

    const hasFilters: boolean = searchQuery.length>0 || selectedDepartments.length>0 || selectedRatings.length>0;


    function clearFilter(){
        setSearchQuery("");
        setSelectedDepartments([]);
        setSelectedRatings([]);
    }

    return (
        <div className="">
            <div className="flex gap-6 items-center  justify-between py-2">
                <Input 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="p-4 outline-lime-400" placeholder="Search by name, email or department..."/>
                <div className="flex gap-5 items-center">
                    <DropdownFilter state={selectedDepartments} setState={setSelectedDepartments} title="Departments" text="Filter by Department" items={departments} />
                    <DropdownFilter state={selectedRatings} setState={setSelectedRatings} title="Ratings" text="Filter by Rating" items={ratings} />
                    {
                        hasFilters &&
                        <Button onClick={clearFilter} className="hover:text-red-500/80 hover:border hover:border-red-400/80" title="Clear" icon={<Trash2 className="w-4 h-4" />} />
                    }
                </div>
            </div>
            <div className=" py-2 flex flex-wrap gap-4 items-center">
                {
                    searchQuery && 
                    <Badge isQuery title={searchQuery} />
                }
                {
                    selectedDepartments.map((department, i) => (
                        <Badge title={department} key={i} isDept/>
                    ))
                }
                {
                    selectedRatings.map((rating, i) => (
                        <Badge title={rating} key={i}/>
                    ))
                }
            </div>
        </div>
    )
}