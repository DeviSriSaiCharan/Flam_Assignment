import { JSX } from "react";
import { Filter } from "lucide-react";
import {
  DropdownMenuLabel,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem
} from "@/components/ui/dropdown-menu";


type DropdownParams<T extends string | number> = {
  text: string;
  title: string;
  items: T[];
  state: T[];
  setState: (values: T[]) => void;
};

export function DropdownFilter<T extends string | number>({
  text,
  title,
  items,
  state,
  setState
}: DropdownParams<T>): JSX.Element {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center justify-center border rounded-lg px-2">
        {/* <Button className="border-none" title={title} icon={<Filter className="w-4 h-4" />} /> */}
        <div className="flex items-center gap-2 justify-between w-full p-2">
          <span className="" >{title}</span>
          <Filter className="w-4 h-4" />
        </div>
        {
          state.length > 0 && (
            <span className="flex items-center justify-center w-5 h-5 text-sm text-lime-400 font-medium bg-lime-400/20 border-lime-900 border rounded-full">
              {state.length}
            </span>
          )
        }
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{text}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {items.map((item) => (
          <DropdownMenuCheckboxItem
            key={item.toString()}
            checked={state.includes(item)}
            onCheckedChange={(checked) => {
              if (checked) {
                setState([...state, item]);
              } else {
                setState(state.filter((i) => i !== item));
              }
            }}
          >
            {item}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
