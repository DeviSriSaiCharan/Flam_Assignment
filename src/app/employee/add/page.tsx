"use client";

import { Briefcase, Building, MapPin, Plus, Save, Star, User } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { departments, jobTitles, projects } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Badge } from "@/components/custom/badge";
import { Textarea } from "@/components/ui/textarea";
import { Employee, useEmployeeStore } from "@/lib/store";
import { Toaster } from "@/components/ui/sonner"
import { toast } from "sonner"


interface FormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  age: string
  image: string
  department: string
  jobTitle: string
  companyName: string
  address: string
  city: string
  state: string
  postalCode: string
  country: string
  rating: number
  projects: string[]
  feedback: string[]
}

export default function AddEmployeePage() {

    const {employees, setEmployees} = useEmployeeStore();

    const [formData, setFormData] = useState<FormData>({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        age: "",
        image: "",
        department: "",
        jobTitle: "",
        companyName: "FlamApp Inc.",
        address: "",
        city: "",
        state: "",
        postalCode: "",
        country: "India",
        rating: 3,
        projects: [],
        feedback: []
    })
    const [feedback, setFeedback] = useState<string>("");

    function handleInputChange(field: keyof FormData, value: string | number | string[]){
        setFormData((prev) => ({ ...prev, [field]: value }))
    }

    function addProject(project: string){
        if (formData.projects.includes(project)) return;
        setFormData((prev) => ({
          ...prev,
          projects: [...prev.projects, project]
        }));
    }

    function addFeedback(field: keyof FormData, value: string){
      if (value.trim() === "" || formData.feedback.includes(value)) return;
      setFormData((prev) => ({
        ...prev,
        [field]: [...prev.feedback, value]
      }));
      setFeedback("");
    }

    function removeProject(project: string){
        setFormData((prev) => ({
            ...prev,
            projects: prev.projects.filter((p) => p !== project)
        }));
    }

    function deleteFeedback(value: string){
        setFormData((prev) => ({
            ...prev,
            feedback: prev.feedback.filter((f) => f !== value)
        }));
    }

    function submitForm(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        alert("Form submission is not implemented in this demo.");
        try{

            const employee: Employee = {
                id: employees.length + 1, 
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                phone: formData.phone,
                age: parseInt(formData.age, 10),
                image: formData.image,
                address: {
                    address: formData.address,
                    city: formData.city,
                    state: formData.state,
                    postalCode: formData.postalCode,
                    country: formData.country
                },
                company: {
                    department: formData.department,
                    name: formData.companyName,
                    title: formData.jobTitle
                },
                rating: formData.rating,
                projects: formData.projects,
                feedback: formData.feedback
            };
    
            const newData: Employee[] = [...employees, employee];
    
            setEmployees(newData);
    
            setFormData({
                firstName: "",
                lastName: "",
                email: "",
                phone: "",
                age: "",
                image: "",
                department: "",
                jobTitle: "",
                companyName: "FlamApp Inc.",
                address: "",
                city: "",
                state: "",
                postalCode: "",
                country: "India",
                rating: 3,
                projects: [],
                feedback: []
            });
            setFeedback("");
            toast.success("Employee added successfully!");
        }
        catch(e){
            console.error("Error adding employee: ", e);
            alert("Failed to add employee. Please try again.");
            toast.error("Failed to add employee. Please try again.");
        }
    }

    return (
        <div className="p-4 flex flex-col gap-6">
            <div>
                <h2 className="text-4xl font-bold">Add Employee</h2>
                <p className="text-muted-foreground" >Create a new employee profile for your team</p>
            </div>

            <form onSubmit={submitForm} className="flex flex-col gap-4">
                <div>
                    <div className="flex gap-8 flex-col md:flex-col lg:flex-row">
                        <div className="flex flex-col gap-6 lg:w-3/5">
                            {/* Persoanl Info */}
                            <div>
                                <div className="flex  font-semibold items-center gap-2 mb-4">
                                    <User className="w-6 h-6" />
                                    <h3 className="text-2xl">Personal Information</h3>
                                </div>
                                <div className="my-3">
                                    <div className="grid grid-cols-2 gap-4 my-2">
                                        <div className="flex flex-col gap-2"> 
                                            <Label>FirstName*</Label>
                                            <Input required onChange={(e) => handleInputChange("firstName", e.target.value)} type="text" placeholder="Enter First Name" />
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <Label>LastName*</Label>
                                            <Input required onChange={(e) => handleInputChange("lastName", e.target.value)} type="text" placeholder="Enter Last Name" />
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <Label>Email*</Label>
                                            <Input required onChange={(e) => handleInputChange("email", e.target.value)} type="email" placeholder="Enter Email" />
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <Label>Phone*</Label>
                                            <Input required onChange={(e) => handleInputChange("phone", e.target.value)} type="tel" placeholder="Enter Phone Number" />
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <Label>Age*</Label>
                                            <Input required onChange={(e) => handleInputChange("age", e.target.value)} type="number" placeholder="Enter Age" />
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <Label>Image URL*</Label>
                                            <Input required onChange={(e) => handleInputChange("image", e.target.value)} type="url" placeholder="Enter Age" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Address */}
                            <div>
                                <div className="flex  font-semibold items-center gap-2 mb-4">
                                    <MapPin className="w-6 h-6" />
                                    <h3 className="text-2xl">Address Information</h3>
                                </div>
                                <div className="my-3">
                                    <div className="grid grid-cols-2 gap-4 my-2">
                                        <div className="flex flex-col gap-2"> 
                                            <Label>Street Address*</Label>
                                            <Input required onChange={(e) => handleInputChange("address", e.target.value)} type="text" placeholder="Enter Street Address" />
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <Label>City*</Label>
                                            <Input  required onChange={(e) => handleInputChange("city", e.target.value)} type="text" placeholder="Enter City" />
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <Label>State*</Label>
                                            <Input required onChange={(e) => handleInputChange("state", e.target.value)} type="text" placeholder="Enter State" />
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <Label>Postal Code*</Label>
                                            <Input required onChange={(e) => handleInputChange("postalCode", e.target.value)} type="text" placeholder="Enter Postal Code" />
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <Label>Country*</Label>
                                        <Input required onChange={(e) => handleInputChange("country", e.target.value)} type="text" placeholder="Enter Country"/>
                                    </div>
                                </div>
                            </div>
                            {/* Company Info */}
                            <div>
                                <div className="flex  font-semibold items-center gap-2 mb-4">
                                    <Building className="w-6 h-6" />
                                    <h3 className="text-2xl">Company Information</h3>
                                </div>
                                <div className="my-3">
                                    <div className="grid sm:grid-cols-1 md:grid-cols-2  gap-4 my-2">
                                        <div className="flex flex-col gap-2"> 
                                            <Label>Department*</Label>
                                            <Select onValueChange={(value) => handleInputChange("department", value)} >
                                                <SelectTrigger className="w-full" >
                                                  <SelectValue placeholder="Select Department" />
                                                </SelectTrigger>
                                                <SelectContent className="">
                                                    {
                                                        departments.map((department) => (
                                                            <SelectItem key={department} value={department}>
                                                                {department}
                                                            </SelectItem>
                                                        ))
                                                    }
                                                    <SelectItem value="Other">Other</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="flex flex-col gap-2">
                                             <Label>Job Title*</Label>
                                            <Select onValueChange={(value) => handleInputChange("jobTitle", value)} >
                                                <SelectTrigger className="w-full">
                                                  <SelectValue placeholder="Select Job Title" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {
                                                        jobTitles.map((department) => (
                                                            <SelectItem key={department} value={department}>
                                                                {department}
                                                            </SelectItem>
                                                        ))
                                                    }
                                                    <SelectItem value="Other">Other</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <Label>Company Name*</Label>
                                        <Input onChange={(e) => handleInputChange("companyName", e.target.value)} type="text" placeholder="Enter Company Name" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-6 md:w-2/5">
                           {/* Performance Rating */}
                           <div>
                                <div className="flex font-semibold items-center gap-2 mb-4">
                                    <Star className="w-6 h-6" />
                                    <h3 className="text-2xl">Performance Rating</h3>
                                </div>
                                <div className="my-3">
                                    <div className="flex flex-col gap-2">
                                        <Label>Rating*</Label>
                                        <div>
                                            {
                                                [1, 2, 3, 4, 5].map((rating) => (
                                                    <Button
                                                    key={rating}
                                                    onClick={(e) => {e.preventDefault() ;handleInputChange("rating", rating)}}
                                                    className="bg-transparent hover:bg-lime-400/20 text-lime-500 border border-lime-500/20 hover:border-lime-500/50 w-10 h-10 m-1" >
                                                        <Star className={`${rating <= formData.rating ? "text-lime fill-current" : "text-muted-foreground/30"}`}  />
                                                    </Button>
                                                ))
                                            }
                                        </div>
                                    </div>
                                </div>
                           </div>
                            {/* Projects */}
                            <div>
                                <div className="flex font-semibold items-center gap-2 mb-4">
                                    <Briefcase  className="w-6 h-6" />
                                    <h3 className="text-2xl">Projects</h3>
                                </div>
                                <div className="my-3">
                                    <div className="flex flex-col gap-2">
                                        <Label>Projects*</Label>
                                        <Select  onValueChange={(value) => addProject(value)}>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select Projects" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {
                                                    projects.map((project) => (
                                                        <SelectItem key={project} value={project}>
                                                            {project}
                                                        </SelectItem>
                                                    ))
                                                }
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                                <div>
                                    {
                                        formData.projects.length > 0 && (
                                            <div className="flex flex-wrap gap-2 mt-2">
                                                {
                                                    formData.projects.map((project, index) => (
                                                        <Badge title={project} key={index} isIcon onClick={removeProject} />
                                                    ))
                                                }
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                            {/* Feedback */}
                            <div>
                                <div className="flex font-semibold items-center gap-2 mb-4">
                                    <Plus className="w-6 h-6" />
                                    <h3 className="text-2xl">Feedback</h3>
                                </div>
                                <div className="my-3 flex gap-2 ">
                                    <div className="flex flex-col gap-2 w-11/12">
                                        <Label>Feedback*</Label>
                                        <Textarea onChange={(e) => setFeedback(e.target.value)}  placeholder="Enter Feedback" />
                                    </div>
                                    <div className=" w-1/12 h-11/12 flex items-center justify-center">
                                        <Button onClick={(e) => {e.preventDefault(); addFeedback("feedback", feedback)}} className="h-full bg-lime-400 hover:bg-lime-500 text-white w-full mt-2" >
                                            <Plus/>
                                        </Button>
                                    </div>
                                </div>
                                <div>
                                    {
                                        formData.feedback.length > 0 && (
                                            <div className="flex flex-wrap gap-2 mt-2">
                                                {
                                                    formData.feedback.map((feedback, index) => (
                                                        <Badge onClick={() => {deleteFeedback(feedback)}} isDept title={feedback} key={index} isIcon />
                                                    ))
                                                }
                                            </div>
                                        )
                                    }
                                </div>
                            </div>    
                        </div>
                    </div>
                </div>
                <div>
                    <div>
                        <Button type="submit" className="bg-lime-400 hover:bg-lime-500 cursor-pointer w-full mt-2" >
                            <Save className="w-4 h-4 mr-2" />
                            <span>Add Employee </span>
                        </Button>
                    </div>
                </div>
            </form>
            <Toaster richColors closeButton />
        </div>
    )
}