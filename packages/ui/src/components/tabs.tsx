"use client"

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"

import { cn } from "@workspace/ui/lib/utils"

/**
 * Root Tabs component that wraps Radix Tabs.Root with default layout styling.
 *
 * Renders a TabsPrimitive.Root and applies a default "flex flex-col gap-2" class plus any
 * provided `className`, sets `data-slot="tabs"`, and forwards all other props to the underlying Radix primitive.
 *
 * @param className - Additional class names to merge with the default layout classes.
 */
function Tabs({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn("flex flex-col gap-2", className)}
      {...props}
    />
  )
}

/**
 * Styled wrapper around Radix's `TabsPrimitive.List` for rendering a tab list.
 *
 * This component applies a default set of Tailwind classes for the tab-list container
 * (background, sizing, rounded corners and padding), sets `data-slot="tabs-list"`,
 * and merges any provided `className` with the defaults. All other props are forwarded
 * to the underlying `TabsPrimitive.List`.
 *
 * @param className - Additional CSS classes to merge with the component's defaults.
 * @returns A JSX element rendering the styled tabs list.
 */
function TabsList({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(
        "bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-lg p-[3px]",
        className
      )}
      {...props}
    />
  )
}

/**
 * A styled wrapper around Radix UI's Tabs.Trigger that applies the project's
 * default tab-trigger styling and exposes the same props as the underlying primitive.
 *
 * The component merges any provided `className` with the default styles and
 * forwards all other props to `TabsPrimitive.Trigger`. It also sets
 * `data-slot="tabs-trigger"` for layout/slot targeting.
 *
 * @returns A `TabsPrimitive.Trigger` element with the project's tab-trigger styles.
 */
function TabsTrigger({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        "data-[state=active]:bg-background dark:data-[state=active]:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 text-foreground dark:text-muted-foreground inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    />
  )
}

/**
 * Wrapper around Radix `Tabs.Content` that applies default layout classes and a data-slot.
 *
 * Renders a `TabsPrimitive.Content` with `data-slot="tabs-content"` and merges the provided
 * `className` with the defaults `"flex-1 outline-none"`. All other props are forwarded to
 * the underlying Radix primitive.
 *
 * @param className - Additional class names to merge with the defaults.
 * @returns The rendered `TabsPrimitive.Content` element.
 */
function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn("flex-1 outline-none", className)}
      {...props}
    />
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent }
