"use client"

import * as React from "react"
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area"

import { cn } from "@workspace/ui/lib/utils"

/**
 * A wrapper around Radix's ScrollArea.Root that provides a styled viewport, scrollbar, and corner.
 *
 * Renders a ScrollArea primitive with a viewport that contains `children`, a default ScrollBar, and a Corner.
 * The provided `className` is merged with a default "relative" root class. All other props are forwarded
 * to ScrollAreaPrimitive.Root.
 *
 * @param props - Props forwarded to `ScrollAreaPrimitive.Root`. `className` will be combined with the default `"relative"`.
 * @returns A React element rendering the composed scroll area.
 */
function ScrollArea({
  className,
  children,
  ...props
}: React.ComponentProps<typeof ScrollAreaPrimitive.Root>) {
  return (
    <ScrollAreaPrimitive.Root
      data-slot="scroll-area"
      className={cn("relative", className)}
      {...props}
    >
      <ScrollAreaPrimitive.Viewport
        data-slot="scroll-area-viewport"
        className="focus-visible:ring-ring/50 size-full rounded-[inherit] transition-[color,box-shadow] outline-none focus-visible:ring-[3px] focus-visible:outline-1"
      >
        {children}
      </ScrollAreaPrimitive.Viewport>
      <ScrollBar />
      <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
  )
}

/**
 * A styled scrollbar component for use inside the ScrollArea wrapper.
 *
 * Renders a Radix ScrollAreaScrollbar with an inner ScrollAreaThumb and applies
 * orientation-specific styling. For `orientation = "vertical"` the scrollbar is
 * rendered full-height with a narrow width; for `orientation = "horizontal"`
 * it is rendered as a short, row-oriented bar. Additional props are forwarded
 * to the underlying Radix primitive.
 *
 * @param orientation - `"vertical"` (default) or `"horizontal"`, determines layout and size
 * @param className - Additional CSS classes to append to the computed scrollbar classes
 */
function ScrollBar({
  className,
  orientation = "vertical",
  ...props
}: React.ComponentProps<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>) {
  return (
    <ScrollAreaPrimitive.ScrollAreaScrollbar
      data-slot="scroll-area-scrollbar"
      orientation={orientation}
      className={cn(
        "flex touch-none p-px transition-colors select-none",
        orientation === "vertical" &&
          "h-full w-2.5 border-l border-l-transparent",
        orientation === "horizontal" &&
          "h-2.5 flex-col border-t border-t-transparent",
        className
      )}
      {...props}
    >
      <ScrollAreaPrimitive.ScrollAreaThumb
        data-slot="scroll-area-thumb"
        className="bg-border relative flex-1 rounded-full"
      />
    </ScrollAreaPrimitive.ScrollAreaScrollbar>
  )
}

export { ScrollArea, ScrollBar }
