import { Employee, EmployeeStore, useEmployeeStore } from "@/lib/store";
import { useMemo } from "react";

export function useSearch() {
  const employees = useEmployeeStore((state: EmployeeStore) => state.employees);
  const searchQuery = useEmployeeStore((state: EmployeeStore) => state.searchQuery);
  const selectedDepartments = useEmployeeStore((state: EmployeeStore) => state.selectedDepartments);
  const selectedRatings = useEmployeeStore((state: EmployeeStore) => state.selectedRatings);
  const setSearchQuery = useEmployeeStore((state: EmployeeStore) => state.setSearchQuery);

  const filteredEmployees = useMemo(() => {
    return employees.filter((employee: Employee) => {
      const matchesSearch =
        !searchQuery ||
        employee.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        employee.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        employee.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        employee.company.department.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesDepartment =
        selectedDepartments.length === 0 || selectedDepartments.includes(employee.company.department);

      const matchesRating =
        selectedRatings.length === 0 || selectedRatings.includes(employee.rating);

      return matchesSearch && matchesDepartment && matchesRating;
    });
  }, [employees, searchQuery, selectedDepartments, selectedRatings]);

  return {
    filteredEmployees,
    searchQuery,
    setSearchQuery,
  };
}
