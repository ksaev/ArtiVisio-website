import { cn } from "@/lib/utils"
import { HTMLAttributes } from "react"

type ContainerProps = HTMLAttributes<HTMLDivElement>

export function Container({ className, ...props }: ContainerProps) {
  return (
    <div
      className={cn("max-w-3xl mx-auto px-4 sm:px-6 lg:px-8", className)}
      {...props}
    />
  )
}
