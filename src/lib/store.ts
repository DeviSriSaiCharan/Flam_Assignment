import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface Employee {
  id: number
  firstName: string
  lastName: string
  email: string
  age: number
  phone: string
  address: {
    address: string
    city: string
    state: string
    postalCode: string
    country: string
  }
  company: {
    department: string
    name: string
    title: string
  }
  image: string
  rating: number
  projects: string[]
  feedback: string[]
}

export interface EmployeeStore {
  employees: Employee[]
  bookmarkedIds: number[]
  searchQuery: string
  selectedDepartments: string[]
  selectedRatings: number[]
  setEmployees: (employees: Employee[]) => void
  setBookmarkedIds: (ids: number[]) => void
  setSearchQuery: (query: string) => void
  setSelectedDepartments: (departments: string[]) => void
  setSelectedRatings: (ratings: number[]) => void
  getBookmarkedEmployees: () => Employee[]
}

export const useEmployeeStore = create<EmployeeStore>()(
  persist(
    (set, get) => ({
      employees: [],
      bookmarkedIds: [],
      searchQuery: "",
      selectedDepartments: [],
      selectedRatings: [],

      setEmployees: (employees) => set({ employees }),
      
      setBookmarkedIds: (ids) => set({ bookmarkedIds: ids }),

      setSearchQuery: (query) => set({ searchQuery: query }),

      setSelectedDepartments: (departments) => set({ selectedDepartments: departments }),

      setSelectedRatings: (ratings) => set({ selectedRatings: ratings }),

      getBookmarkedEmployees: () => {
        const { employees, bookmarkedIds } = get()
        return employees.filter((employee) => bookmarkedIds.includes(employee.id))
      },
    }),
    {
      name: "employee-store",
      partialize: (state) => ({
        employees: state.employees,
        bookmarkedIds: state.bookmarkedIds
      }),
    },
  ),
)
