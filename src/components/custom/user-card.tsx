import Image from "next/image"
import { JSX } from "react"
import { Button } from "./button"
import { Badge } from "./badge"
import { Eye, Star, TrendingUp, Bookmark, MapPin, Mail } from "lucide-react"
import { Employee } from "@/lib/store"
import { redirect } from "next/navigation"
import {useBookmarks} from "@/hooks/use-bookmarks"

export function Usercard({user}: {user: Employee}): JSX.Element{

    const {bookmarkedIds, toggleBookmark} = useBookmarks();

    return (
        <div className="flex flex-col gap-3 rounded-xl p-6 border hover:border-lime-400/30 hover:shadow-lg hover:shadow-lime-400/20" >
            <div className="flex justify-between items-center">
                <img className={`rounded-full hover:border hover:border-lime-400`} src={user.image} alt="Profile Image" width={55} height={10}/>
                <div>
                    <p>{user.firstName + " " + user.lastName}</p>
                </div>
                <Button 
                onClick={() => toggleBookmark(user.id)}
                title="" icon={<Bookmark className={`w-4 h-4 ${bookmarkedIds.includes(user.id) && "fill-green-400"} `} />} 
                className={`flex items-center justify-center hover:text-green-400 hover:bg-lime-400/20 hover:border-lime-900 ${bookmarkedIds.includes(user.id) && " text-green-400"}`} />
            </div>
            <div>
                <p className="text-sm text-muted-foreground flex gap-2">
                    <Mail className="w-3"/>
                    <span>{user.email}</span>
                </p>
                <p className="text-sm text-muted-foreground flex gap-2">
                    <MapPin className="w-3" />
                    <span>{user.address.city + ", " + user.address.state}</span>
                </p>
            </div>
            <div className="flex items-center  justify-between">
                <Badge title={user.company.department.slice(0, 14)} isDept/>
                <div className="flex justify-center gap-0.5 items-center text-sm text-muted-foreground">
                    {
                        [...Array(5)].map((_, i) => (
                            <Star key={i}
                                className={`w-3 h-3 ${i < user.rating ? "fill-amber-500 border-amber-400" : ""} `}
                            />
                        ))
                    }
                    <p className="ml-1 text-sm" >({user.rating}/5)</p>
                </div>
            </div>
            <div className="flex w-full gap-2 ">
                <Button title="View" 
                onClick={() => redirect(`/employee/${user.id}`)}
                icon={<Eye className="w-4"/>} className="w-1/2 text-white font-medium h-9 text-sm hover:bg-lime-700/20 hover:text-lime-500" />
                <Button title="Promote"    
                icon={<TrendingUp className="w-4" />} className="h-9 text-sm font-medium  w-1/2 text-lime-500 hover:shadow-lg hover:shadow-lime-900/50 hover:border-lime-900 border-lime-900 hover:text-white hover:bg-lime-700/20" />
            </div>
        </div>
    )
}