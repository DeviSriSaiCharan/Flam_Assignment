
import { JSX } from "react"
import { Skeleton } from "../ui/skeleton"

export function UserSkeleton(): JSX.Element{
    return (
         <div className="flex flex-col gap-3 rounded-xl p-6 border" >
            <div className="flex justify-between items-center">
                <Skeleton className={`w-12 h-12 rounded-full hover:border hover:border-lime-400`}/>
                <div>
                    <Skeleton className="h-10 w-44" />
                </div>
            </div>
            <div>
                <Skeleton className="h-14 w-full text-sm text-muted-foreground flex gap-2">
                </Skeleton>
            </div>
            <div className="">
                <Skeleton className="h-6 w-full" />
            </div>
            <div className="">
                <Skeleton className="h-10 w-full"/>
            </div>
        </div>
    )
}