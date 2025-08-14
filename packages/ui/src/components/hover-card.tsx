"use client"

import * as React from "react"
import * as HoverCardPrimitive from "@radix-ui/react-hover-card"

import { cn } from "@workspace/ui/lib/utils"

/**
 * Wrapper around Radix HoverCardPrimitive.Root that attaches `data-slot="hover-card"` and forwards all props.
 *
 * Accepts the same props as `HoverCardPrimitive.Root` and renders the underlying `Root` element with a data-slot attribute for styling and testing.
 */
function HoverCard({
  ...props
}: React.ComponentProps<typeof HoverCardPrimitive.Root>) {
  return <HoverCardPrimitive.Root data-slot="hover-card" {...props} />
}

/**
 * Wrapper around Radix UI's HoverCard.Trigger that forwards all props and adds a data-slot.
 *
 * Renders a HoverCardPrimitive.Trigger with `data-slot="hover-card-trigger"` and passes through all provided props.
 */
function HoverCardTrigger({
  ...props
}: React.ComponentProps<typeof HoverCardPrimitive.Trigger>) {
  return (
    <HoverCardPrimitive.Trigger data-slot="hover-card-trigger" {...props} />
  )
}

/**
 * Render the hover card content inside a portal with built-in styling and defaults.
 *
 * This component wraps Radix's HoverCard.Content in a Portal, applies a composed
 * set of UI classes (including open/close animations and side-aware slide-ins),
 * and attaches `data-slot` attributes for styling/testing.
 *
 * @param className - Additional CSS classes to merge with the component's base styles.
 * @param align - Content alignment relative to the trigger (defaults to `"center"`).
 * @param sideOffset - Distance in pixels to offset the content from the trigger (defaults to `4`).
 * @returns A React element rendering the hover card content inside a portal.
 */
function HoverCardContent({
  className,
  align = "center",
  sideOffset = 4,
  ...props
}: React.ComponentProps<typeof HoverCardPrimitive.Content>) {
  return (
    <HoverCardPrimitive.Portal data-slot="hover-card-portal">
      <HoverCardPrimitive.Content
        data-slot="hover-card-content"
        align={align}
        sideOffset={sideOffset}
        className={cn(
          "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-64 origin-(--radix-hover-card-content-transform-origin) rounded-md border p-4 shadow-md outline-hidden",
          className
        )}
        {...props}
      />
    </HoverCardPrimitive.Portal>
  )
}

export { HoverCard, HoverCardTrigger, HoverCardContent }
