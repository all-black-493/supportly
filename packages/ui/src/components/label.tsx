"use client"

import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"

import { cn } from "@workspace/ui/lib/utils"

/**
 * Accessible label component that wraps Radix UI's LabelPrimitive.Root with project styles.
 *
 * Renders a LabelPrimitive.Root with a data-slot of "label", applies a set of default layout
 * and accessibility-focused classes, and forwards all received props to the underlying radix
 * primitive.
 *
 * @param className - Additional class names to merge with the component's default classes.
 * @returns The rendered Radix LabelPrimitive.Root element.
 */
function Label({
  className,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(
        "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
}

export { Label }
