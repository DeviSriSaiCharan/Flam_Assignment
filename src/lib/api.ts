import axios from "axios";
import { Employee } from "./store";

export async function fetchEmployees(page:number = 0): Promise<Employee[]> {
    try{
      const limit = 20;
      const skip = page* limit;

        const response = await axios.get(`https://dummyjson.com/users?limit=${limit}&skip=${skip}`);
        const data = await response.data;

        const employee = data.users.map((user: Employee) => ({
            id : user.id,
            firstName : user.firstName,
            lastName: user.lastName,
            email: user.email,
            age: user.age,
            phone: user.phone,
            address: user.address,
            company: {
              department: user.company?.department,
              name: user.company?.name ,
              title: user.company?.title ,
            },
            image: user.image,
            rating: Math.floor(Math.random() * 5) + 1, // Random rating 1-5
            projects: generateProjects(),
            feedback: generateFeedback(),
        }))

        return employee;
    }
    catch(e){
        console.log("Error fetching employee details " + e);
        return []
    }
}

function generateProjects() {
  const projects = [
    "Website Redesign",
    "Mobile App Development",
    "Database Migration",
    "API Integration",
    "Performance Optimization",
    "Security Audit",
    "User Research",
    "Marketing Campaign",
  ]
  const count = Math.floor(Math.random() * 4) + 1
  return projects.sort(() => 0.5 - Math.random()).slice(0, count)
}


function generateFeedback() {
  const feedback = [
    "Excellent communication skills and team collaboration",
    "Consistently delivers high-quality work on time",
    "Shows great initiative in problem-solving",
    "Needs improvement in time management",
    "Outstanding technical expertise",
    "Great mentor to junior team members",
    "Could benefit from additional training in new technologies",
  ]
  const count = Math.floor(Math.random() * 3) + 1
  return feedback.sort(() => 0.5 - Math.random()).slice(0, count)
}
