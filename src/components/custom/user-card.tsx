import Image from "next/image"
import { JSX } from "react"
import { Button } from "./button"
import { Badge } from "./badge"
import { Eye, Star, TrendingUp, Bookmark } from "lucide-react"

export function Usercard({user}: {user: any}): JSX.Element{
    return (
        <div className="flex flex-col gap-2 rounded-xl p-6 border" >
            <div className="flex gap-3 items-center">
                <Image className="rounded-full hover:border hover:border-lime-400" src={user.image} alt="Profile Image" width={55} height={10}/>
                <div>
                    <p>{user.firstName + " " + user.lastName}</p>
                </div>
                <Button title="" icon={<Bookmark/>} className="" />
            </div>
            <div>
                <p>
                    <span>{user.email}</span>
                </p>
                <p>
                    <span>{user.address.city + ", " + user.address.state}</span>
                </p>
            </div>
            <div className="flex items-center bg-red-400 justify-between">
                <Badge title="Engineering"/>
                <div className="flex justify-center">
                    {
                        [...Array(5)].map((_, i) => (
                            <Star key={i}
                                className={`w-4 h-4 ${i < 3 ? "fill-current" : ""} `}
                            />
                        ))
                    }
                    <p>({user.rating}/5)</p>
                </div>
            </div>
            <div className="flex w-full">
                <Button title="View" icon={<Eye/>} className="w-1/2" />
                <Button title="Promote" icon={<TrendingUp/>} className="w-1/2" />
            </div>
        </div>
    )
}