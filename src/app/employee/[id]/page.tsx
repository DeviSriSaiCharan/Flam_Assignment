"use client";

import { useParams } from "next/navigation";
import { Employee, useEmployeeStore } from "@/lib/store";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Badge } from "@/components/custom/badge";
import { Star, Mail, MapPin,Calendar, Phone, Building, Bookmark } from "lucide-react";
import { Button } from "@/components/custom/button";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";

export default function EmployeePage() {

    const {id} = useParams();
    const { employees, bookmarkedIds } = useEmployeeStore();
    const employeeId = parseInt(id as string);
    const [employee, setEmployee] = useState<Employee | null>(null);
    const isBookmarked = bookmarkedIds.includes(employeeId);

    useEffect(() => {
        const e = employees.find((emp) => emp.id === employeeId);
        setEmployee(e || null);
        console.log("Employee:", e);
        console.log(employees);
    },[employees, employeeId]);

    if(!employee){
        return (
            <div>
                Employee not found
                <p>{employeeId}</p>
            </div>
        )
    }

    return (
        <div className="p-4 h-full">
            <div className="mb-4">
                <h1 className="text-2xl font-bold">Employee Details</h1>
            </div>
            <div className="flex gap-4 h-11/12">
                <div className="border rounded-lg p-4 w-1/3 h-full">
                    <div className="flex flex-col items-center mb-4">
                        <Image
                            src={employee.image}
                            alt={`${employee.firstName} ${employee.lastName}`}
                            width={100}
                            height={100}
                            className="rounded-full border-4 border-lime-600/30 mb-4"
                        />
                        <p className="font-semibold text-xl" >{employee.firstName + " " + employee.lastName}</p>
                        <p className="mb-3 text-muted-foreground font-medium">{employee.company.title}</p>
                        <Badge title={employee.company.department} isDept />
                    </div>
                    <div className="flex gap-1 justify-center items-center mb-4">
                        {
                            [...Array(5)].map((_, i) => (
                                <Star
                                className={`w-4 ${i < employee.rating ? 'fill-amber-400 ' : 'text-gray-300'}`}
                                />
                            ))
                        }
                        <p>{` (${employee.rating}/5)`}</p>
                    </div>
                    <div className="mx-auto w-fit ">
                        <p className="flex gap-3 items-center "> 
                            <Mail className="w-4 text-muted-foreground" />
                            <span>{employee.email}</span>
                        </p>
                        <p className="flex gap-3 items-center">
                            <Phone className="w-4 text-muted-foreground" />
                            <span>{employee.phone}</span>
                        </p>
                        <p className="flex gap-3 items-center">
                            <MapPin className="w-4 text-muted-foreground" />
                            <span>{employee.address.city + ", " + employee.address.state}</span>
                        </p>
                        <p className="flex gap-3 items-center">
                            <Building className="w-4 text-muted-foreground" />
                            <span>{employee.address.address}</span>
                        </p>
                        <p className="flex gap-3 items-center">
                            <Calendar className="w-4 text-muted-foreground" />
                            <span>{employee.age + " years old"}</span>
                        </p>
                    </div>
                    <div className="flex justify-center items-center mt-4">
                        <Button className="w-full hover:bg-zinc-500/20" icon={<Bookmark className="w-4"/>} title={isBookmarked ? "Bookmarked" : "Bookmark"} />
                    </div>
                </div>

                <div className="border rounded-lg p-4 w-2/3 h-full">
                    <Tabs defaultValue="overview" className="w-full">
                        <TabsList className="w-full grid grid-cols-3 ">
                            <TabsTrigger value="overview">Overview</TabsTrigger>
                            <TabsTrigger value="projects">Projects</TabsTrigger>
                            <TabsTrigger value="feedback">Feedback</TabsTrigger>
                        </TabsList>
                        <TabsContent value="overview">
                            <div className="p-6 border rounded-xl mt-2" >
                                <h2 className="text-2xl font-bold">Personal Information</h2>
                                <div className="grid grid-cols-2 gap-4 mt-4">
                                    <div>
                                        <p className="text-muted-foreground" >Full Address</p>
                                        <p>
                                            {employee.address.address}
                                            <br />
                                            {employee.address.city}, {employee.address.state} {employee.address.postalCode}
                                            <br />
                                            {employee.address.country}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-muted-foreground">Company</p>
                                        <p>{employee.company.name}</p>
                                        <p>{employee.company.department} Department</p>
                                    </div>
                                </div>
                            </div>
                        </TabsContent>
                        <TabsContent value="projects">
                            <div className="p-6 border rounded-xl mt-2">
                                <h2 className="text-2xl font-bold mb-4">Current Project</h2>
                                <div className="flex flex-col gap-2">
                                    {employee.projects.map((project, index) => (
                                      <div
                                        key={index}
                                        className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 border border-border/40"
                                      >
                                        <div className="h-2 w-2 rounded-full bg-green-400" />
                                        <span className="font-medium">{project}</span>
                                      </div>
                                    ))}
                                </div>
                            </div>
                        </TabsContent>
                        <TabsContent value="feedback">
                            <div className="space-y-4">
                                {employee.feedback.map((feedback, index) => (
                                  <div
                                    key={index}
                                    className="p-4 rounded-lg bg-muted/50 border border-border/40"
                                  >
                                    <p className="text-sm font-medium leading-relaxed">{feedback}</p>
                                    <div className="flex items-center gap-2 mt-3 text-xs text-muted-foreground">
                                      <div className="h-1 w-1 rounded-full bg-green-400" />
                                      <span>Recent feedback</span>
                                    </div>
                                  </div>
                                ))}
                            </div>
                        </TabsContent>
                    </Tabs>

                </div>
            </div>
        </div>
    );
}