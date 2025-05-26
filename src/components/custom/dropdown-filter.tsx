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
import { Button } from "./button";


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
      <DropdownMenuTrigger className="flex items-center justify-center">
        <Button className="" title={title} icon={<Filter className="w-4 h-4" />} />
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
