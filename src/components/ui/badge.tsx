import { HTMLAttributes } from "react"
import { cn } from "@/lib/utils"

export interface BadgeProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "outline"
}

const variantStyles: Record<string, string> = {
  default: "bg-blue-600 text-white",
  secondary: "bg-gray-100 text-gray-800",
  outline: "border border-gray-300 text-gray-800",
}

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-semibold transition-colors",
        variantStyles[variant],
        className
      )}
      {...props}
    />
  )
}