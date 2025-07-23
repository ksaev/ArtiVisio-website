import { cn } from "@/lib/utils"
import { HTMLAttributes } from "react"

export function Title({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h1 className={cn("text-3xl font-bold mb-6 text-gray-900", className)} {...props} />
  )
}

export function Subtitle({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2 className={cn("text-xl font-semibold mt-10 mb-4 text-gray-800", className)} {...props} />
  )
}

export function Paragraph({ className, ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn("text-base leading-relaxed text-gray-700 mb-4", className)} {...props} />
  )
}

export function Section({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <section className={cn("mt-6", className)} {...props} />
  )
}
