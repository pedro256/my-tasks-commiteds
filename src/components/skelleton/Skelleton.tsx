import { twMerge } from "tailwind-merge"

interface ISkelletonProps{
    className?:string
}

export default function Skelleton(props:ISkelletonProps){
    return (
        <div className={twMerge(
            "animate-pulse rounded-md bg-black/10",props.className
        )}>
        </div>
    )
}