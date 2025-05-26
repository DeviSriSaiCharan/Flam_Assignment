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

interface EmployeeStore {
  employees: Employee[]
  bookmarkedIds: number[]
  searchQuery: string
  selectedDepartments: string[]
  selectedRatings: number[]
  setEmployees: (employees: Employee[]) => void
  toggleBookmark: (id: number) => void
  setSearchQuery: (query: string) => void
  setSelectedDepartments: (departments: string[]) => void
  setSelectedRatings: (ratings: number[]) => void
  getFilteredEmployees: () => Employee[]
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

      toggleBookmark: (id) =>
        set((state) => ({
          bookmarkedIds: state.bookmarkedIds.includes(id)
            ? state.bookmarkedIds.filter((bookmarkId) => bookmarkId !== id)
            : [...state.bookmarkedIds, id],
        })),

      setSearchQuery: (query) => set({ searchQuery: query }),

      setSelectedDepartments: (departments) => set({ selectedDepartments: departments }),

      setSelectedRatings: (ratings) => set({ selectedRatings: ratings }),

      getFilteredEmployees: () => {
        const { employees, searchQuery, selectedDepartments, selectedRatings } = get()

        return employees.filter((employee) => {
          const matchesSearch =
            !searchQuery ||
            employee.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            employee.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            employee.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            employee.company.department.toLowerCase().includes(searchQuery.toLowerCase())

          const matchesDepartment =
            selectedDepartments.length === 0 || selectedDepartments.includes(employee.company.department)

          const matchesRating = selectedRatings.length === 0 || selectedRatings.includes(employee.rating)

          return matchesSearch && matchesDepartment && matchesRating
        })
      },

      getBookmarkedEmployees: () => {
        const { employees, bookmarkedIds } = get()
        return employees.filter((employee) => bookmarkedIds.includes(employee.id))
      },
    }),
    {
      name: "employee-store",
      partialize: (state) => ({ bookmarkedIds: state.bookmarkedIds }),
    },
  ),
)
