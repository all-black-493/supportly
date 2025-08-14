"use client"

import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "@workspace/ui/lib/utils"

/**
 * A horizontal progress bar component built on Radix UI's Progress primitives.
 *
 * Renders a rounded track and an animated indicator whose horizontal position reflects a progress value (treated as a percentage).
 *
 * @param value - Progress percentage in the range 0–100. If `undefined`, it is treated as `0`.
 * @returns A JSX element rendering the progress track and indicator.
 */
function Progress({
  className,
  value,
  ...props
}: React.ComponentProps<typeof ProgressPrimitive.Root>) {
  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      className={cn(
        "bg-primary/20 relative h-2 w-full overflow-hidden rounded-full",
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className="bg-primary h-full w-full flex-1 transition-all"
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  )
}

export { Progress }
