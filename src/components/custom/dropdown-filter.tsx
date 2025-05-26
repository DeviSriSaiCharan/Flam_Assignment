import { JSX } from "react";
import { Filter } from "lucide-react";
import { DropdownMenuLabel, DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuSeparator, DropdownMenuCheckboxItem } from "@/components/ui/dropdown-menu";
import { Button } from "./button";

type dropdownParams = {
    text : string,
    title : string,
    items : (string | number)[],
    state : (string | number)[],
    setState : any
}

export function DropdownFilter({text, title, items, state, setState}: dropdownParams): JSX.Element {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center justify-center">
                <Button className="" title={title} icon={<Filter className="w-4 h-4"/>} />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>{text}</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {
                        items.map((item) => (
                            <DropdownMenuCheckboxItem key={item}
                                checked={state.includes(item)}
                                onCheckedChange={(checked) => {
                                    if(checked){
                                        setState([...state, item])
                                    }
                                    else{
                                        setState(state.filter((i) => i !== item))
                                    }
                                }}
                            >
                                {item}
                            </DropdownMenuCheckboxItem>
                        ))
                    }
            </DropdownMenuContent>
        </DropdownMenu>
    )
}