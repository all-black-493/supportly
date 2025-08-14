"use client"

import * as React from "react"
import * as PopoverPrimitive from "@radix-ui/react-popover"

import { cn } from "@workspace/ui/lib/utils"

/**
 * A thin wrapper around Radix's Popover Root that attaches a data-slot marker.
 *
 * Forwards all received props to `PopoverPrimitive.Root` and adds `data-slot="popover"` for styling or testing hooks.
 *
 * @returns A `PopoverPrimitive.Root` element with the provided props applied.
 */
function Popover({
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Root>) {
  return <PopoverPrimitive.Root data-slot="popover" {...props} />
}

/**
 * Render a Radix Popover Trigger that forwards all props and marks the element with `data-slot="popover-trigger"`.
 *
 * This component is a thin wrapper around `@radix-ui/react-popover`'s `Trigger`. It forwards all received props to
 * the underlying primitive so it can be used interchangeably with Radix's API while providing a stable
 * `data-slot` attribute for styling or testing hooks.
 */
function PopoverTrigger({
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Trigger>) {
  return <PopoverPrimitive.Trigger data-slot="popover-trigger" {...props} />
}

/**
 * Popover content component rendered inside a Portal with sensible defaults and styling.
 *
 * Renders Radix's Popover Content inside a Portal, attaches `data-slot="popover-content"`,
 * applies default alignment and side offset, and merges a comprehensive default set of Tailwind
 * utility classes with any `className` provided.
 *
 * @param className - Additional CSS classes to merge with the component's default styles.
 * @param align - Alignment of the popover relative to the trigger. Defaults to `"center"`.
 * @param sideOffset - Pixel offset from the side of the trigger. Defaults to `4`.
 * @returns A JSX element containing the popover content rendered in a Portal.
 */
function PopoverContent({
  className,
  align = "center",
  sideOffset = 4,
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Content>) {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        data-slot="popover-content"
        align={align}
        sideOffset={sideOffset}
        className={cn(
          "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-72 origin-(--radix-popover-content-transform-origin) rounded-md border p-4 shadow-md outline-hidden",
          className
        )}
        {...props}
      />
    </PopoverPrimitive.Portal>
  )
}

/**
 * Thin wrapper around Radix's Popover Anchor that forwards all props and sets a data-slot attribute.
 *
 * Renders a PopoverPrimitive.Anchor with the same props it receives and adds data-slot="popover-anchor"
 * to aid identification/styling.
 *
 * @returns The Radix Popover Anchor element.
 */
function PopoverAnchor({
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Anchor>) {
  return <PopoverPrimitive.Anchor data-slot="popover-anchor" {...props} />
}

export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor }
