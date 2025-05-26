import { Sparkles } from "lucide-react";
import { JSX } from "react";

export function Badge({title, isDept = false, isQuery = false}: {title: string | number, isDept?: boolean, isQuery? : boolean}): JSX.Element {
    return (
        <div className={`py-2 px-3 h-5 flex items-center text-center rounded-2xl border ${isDept ? "bg-blue-400/20 border-blue-900" : "bg-lime-400/20 border-lime-900"}`}>
            {isQuery && <Sparkles className="w-3 mr-2" />}
            <p className={`font-medium text-sm ${isDept ? "text-blue-500" : "text-lime-500"}`} >{(isQuery ? "Search: " : "")  + title + " " + ((!isDept && !isQuery) ? "Stars" : "")}</p>
        </div>
    )
}