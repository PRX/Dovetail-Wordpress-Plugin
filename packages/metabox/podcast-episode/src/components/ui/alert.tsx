import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const alertVariants = cva(
  "relative rounded-lg border border-slate-200 px-4 py-3 text-sm grid has-[>svg]:grid-cols-[var(--icon-size,calc(var(--spacing)*4))_1fr] grid-cols-[0_1fr] has-[>svg]:gap-x-3 gap-y-0.5 items-start [&>svg]:size-[var(--icon-size,4)] [&>svg]:translate-y-0.5 [&>svg]:text-current dark:border-slate-800",
  {
    variants: {
      variant: {
        default: "bg-white text-slate-950 dark:bg-slate-950 dark:text-slate-50",
        destructive:
          "bg-red-500 text-slate-50 [&>svg]:text-current *:data-[slot=alert-description]:text-slate-50/80 dark:text-slate-50 dark:*:data-[slot=alert-description]:text-slate-50/80",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Alert({
  className,
  variant,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof alertVariants>) {
  return (
    <div
      data-slot="alert"
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    />
  )
}

function AlertTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-title"
      className={cn(
        "col-start-2 line-clamp-1 min-h-4 font-medium tracking-tight",
        className
      )}
      {...props}
    />
  )
}

function AlertDescription({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-description"
      className={cn(
        "text-slate-500 col-start-2 grid justify-items-start gap-1 text-sm [&_p]:leading-relaxed dark:text-slate-400",
        className
      )}
      {...props}
    />
  )
}

export { Alert, AlertTitle, AlertDescription }
