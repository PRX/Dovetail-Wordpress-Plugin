import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-full border border-slate-200 px-2 py-0.5 text-xs font-semibold w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none ring-slate-950/10 dark:ring-slate-950/20 dark:outline-ring/40 outline-ring/50 focus-visible:ring-4 focus-visible:outline-1 aria-invalid:focus-visible:ring-0 transition-[color,box-shadow] dark:border-slate-800 dark:ring-slate-300/10 dark:dark:ring-slate-300/20",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-slate-900 text-slate-50 shadow-sm [a&]:hover:bg-slate-900/90 dark:bg-slate-50 dark:text-slate-900 dark:[a&]:hover:bg-slate-50/90",
        secondary:
          "border-transparent bg-slate-100 text-slate-900 [a&]:hover:bg-slate-100/90 dark:bg-slate-800 dark:text-slate-50 dark:[a&]:hover:bg-slate-800/90",
        destructive:
          "border-transparent bg-red-500 text-slate-50 shadow-sm [a&]:hover:bg-red-500/90 dark:bg-red-900 dark:text-slate-50 dark:[a&]:hover:bg-red-900/90",
        outline:
          "text-slate-950 [a&]:hover:bg-slate-100 [a&]:hover:text-slate-900 dark:text-slate-50 dark:[a&]:hover:bg-slate-800 dark:[a&]:hover:text-slate-50",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span"

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
