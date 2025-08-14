"use client"

import * as React from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"

import { cn } from "@workspace/ui/lib/utils"

/**
 * Thin wrapper around Radix's TooltipProvider that defaults `delayDuration` to 0.
 *
 * Passes all other provider props through to `TooltipPrimitive.Provider`.
 *
 * @param delayDuration - Time in milliseconds before the tooltip opens. Defaults to `0`.
 */
function TooltipProvider({
  delayDuration = 0,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Provider>) {
  return (
    <TooltipPrimitive.Provider
      data-slot="tooltip-provider"
      delayDuration={delayDuration}
      {...props}
    />
  )
}

/**
 * Wraps Radix UI's Tooltip root in a TooltipProvider to ensure the tooltip has a provider context.
 *
 * This component forwards all props to `TooltipPrimitive.Root` and guarantees the root is rendered
 * within a `TooltipProvider` so consumers don't need to add a provider manually.
 *
 * @param props - Props accepted by `TooltipPrimitive.Root`, forwarded to the underlying root element.
 */
function Tooltip({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Root>) {
  return (
    <TooltipProvider>
      <TooltipPrimitive.Root data-slot="tooltip" {...props} />
    </TooltipProvider>
  )
}

/**
 * Wrapper around Radix's Tooltip.Trigger that adds a `data-slot="tooltip-trigger"` attribute.
 *
 * This component forwards all props to `TooltipPrimitive.Trigger` and is used as the element that
 * toggles the tooltip visibility.
 *
 * @returns A React element rendering Radix's Tooltip.Trigger with the tooltip-trigger data attribute.
 */
function TooltipTrigger({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Trigger>) {
  return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />
}

/**
 * Renders tooltip content inside a Portal with default styling and an arrow.
 *
 * The component mounts Radix Tooltip content into a Portal, applies a set of
 * default classes for appearance and animations, and renders a positioned
 * arrow element. Additional props are forwarded to Radix's `TooltipPrimitive.Content`.
 *
 * @param className - Optional additional CSS classes appended to the component's default classes.
 * @param sideOffset - Distance in pixels between the trigger and the tooltip (defaults to `0`).
 * @param children - Content displayed inside the tooltip.
 * @returns A JSX element representing the tooltip content.
 */
function TooltipContent({
  className,
  sideOffset = 0,
  children,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Content>) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        data-slot="tooltip-content"
        sideOffset={sideOffset}
        className={cn(
          "bg-primary text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-fit origin-(--radix-tooltip-content-transform-origin) rounded-md px-3 py-1.5 text-xs text-balance",
          className
        )}
        {...props}
      >
        {children}
        <TooltipPrimitive.Arrow className="bg-primary fill-primary z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px]" />
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  )
}

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }
