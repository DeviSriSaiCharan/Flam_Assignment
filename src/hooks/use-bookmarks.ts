
import { Employee, useEmployeeStore } from "@/lib/store";

export function useBookmarks(id: number){
    const {employees, bookmarkedIds, setBookmarkedIds} = useEmployeeStore();

    function toggleBookmark(id: number) {
        if(bookmarkedIds.includes(id)){
            setBookmarkedIds(bookmarkedIds.filter((bookmarkId) => bookmarkId !== id));
        }
        else{
           setBookmarkedIds([...bookmarkedIds, id]);
        }
    }

    function getBookmarkedEmployees(): Employee[] {
        const bookmarkedEmployees: Employee[] = employees.filter((employee) => bookmarkedIds.includes(employee.id));
        return bookmarkedEmployees;
    }

    return {
        bookmarkedIds,
        toggleBookmark,
        getBookmarkedEmployees 
    }
}