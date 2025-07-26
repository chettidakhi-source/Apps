import { cn } from "@/lib/utils"
import { HTMLAttributes, forwardRef } from "react"

export interface CardProps extends HTMLAttributes<HTMLDivElement> {}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "rounded-lg border bg-white text-gray-900 shadow-sm",
        className
      )}
      {...props}
    />
  )
)
Card.displayName = "Card"

export const CardHeader = ({ className, ...props }: CardProps) => (
  <div className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
)

export const CardTitle = ({ className, ...props }: CardProps) => (
  <h3
    className={cn("text-lg font-semibold leading-none tracking-tight", className)}
    {...props}
  />
)

export const CardDescription = ({ className, ...props }: CardProps) => (
  <p className={cn("text-sm text-muted-foreground", className)} {...props} />
)

export const CardContent = ({ className, ...props }: CardProps) => (
  <div className={cn("p-6 pt-0", className)} {...props} />
)