import { Sparkles, XIcon } from "lucide-react";
import { JSX } from "react";
import { Button } from "../ui/button";

export function Badge({
  title,
  isDept = false,
  isQuery = false,
  onClick,
  isIcon = false,
}: {
  title: string | number;
  isDept?: boolean;
  isQuery?: boolean;
  onClick?: (d : string) => void;
  isIcon?: boolean; 
}): JSX.Element {
  return (
    <div
      className={`py-2 px-3 h-5 flex items-center text-center rounded-2xl border ${
        isDept
          ? "bg-blue-400/20 border-blue-900"
          : "bg-lime-400/20 border-lime-900"
      }`}
    >
      {isQuery && <Sparkles className="w-3 mr-2" />}
      <p
        className={`font-medium text-sm ${
          isDept ? "text-blue-500" : "text-lime-500"
        }`}
      >
        {(isQuery ? "Search: " : "") +
          title +
          " " +
          (!isDept && !isQuery ? "Stars" : "")}
      </p>
      {
        isIcon && (
          <Button
            type="button"
            className="w-4 h-4 bg-transparent hover:bg-transparent border-none ml-2 p-0 cursor-pointer"
            title="Remove Filter"
            onClick={() => onClick?.(title.toString())}
            aria-label="Remove Filter"
          >
            <XIcon
              className={`w-3 h-3 ${isDept ? "text-blue-500" : "text-lime-500"}`}
            />
          </Button>
        )
      }
    </div>
  );
}
