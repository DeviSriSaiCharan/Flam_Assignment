import React, { JSX } from "react"

type ButtonProps = {
    title :  string,
    icon? : React.ReactNode,
    className? : string,
    onClick? : () => void;
}

export function Button({title, icon, className = "", onClick}: ButtonProps): JSX.Element {
    return (
        <button onClick={onClick} className={className + " rounded-lg flex items-center justify-center gap-2 border p-2 cursor-pointer"}>
            {icon}
            <span>{title}</span>
        </button>
    )
}