"use client"

import * as React from "react"
import * as SeparatorPrimitive from "@radix-ui/react-separator"

import { cn } from "@workspace/ui/lib/utils"

/**
 * Thin React wrapper around Radix UI's Separator.Root that renders a horizontal or vertical separator.
 *
 * Renders a styled separator element with sensible defaults (horizontal orientation, decorative by default).
 *
 * @param className - Optional additional class names to merge with the component's base styling.
 * @param orientation - Layout of the separator; either `"horizontal"` or `"vertical"`. Defaults to `"horizontal"`.
 * @param decorative - Whether the separator is decorative (aria-hidden). Defaults to `true`.
 * @returns A JSX element rendering the configured separator.
 */
function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}: React.ComponentProps<typeof SeparatorPrimitive.Root>) {
  return (
    <SeparatorPrimitive.Root
      data-slot="separator"
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
        className
      )}
      {...props}
    />
  )
}

export { Separator }
