"use client"

import * as React from "react"
import { Drawer as DrawerPrimitive } from "vaul"

import { cn } from "@workspace/ui/lib/utils"

/**
 * Wrapper around Vaul's `DrawerPrimitive.Root` that forwards all received props
 * and attaches `data-slot="drawer"` for slot mapping and testing.
 *
 * @returns The rendered Drawer root element.
 */
function Drawer({
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Root>) {
  return <DrawerPrimitive.Root data-slot="drawer" {...props} />
}

/**
 * Wrapper around Vaul's DrawerPrimitive.Trigger that forwards all props and adds
 * `data-slot="drawer-trigger"` for slot mapping and testing.
 */
function DrawerTrigger({
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Trigger>) {
  return <DrawerPrimitive.Trigger data-slot="drawer-trigger" {...props} />
}

/**
 * Wraps and forwards props to Vaul's Drawer Portal, adding a slot attribute.
 *
 * Renders a DrawerPrimitive.Portal with a `data-slot="drawer-portal"` attribute and forwards all received props.
 *
 * @returns A React element representing the drawer portal.
 */
function DrawerPortal({
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Portal>) {
  return <DrawerPrimitive.Portal data-slot="drawer-portal" {...props} />
}

/**
 * Renders a drawer close control by wrapping Vaul's Close primitive.
 *
 * Adds `data-slot="drawer-close"` and forwards all received props to the underlying `DrawerPrimitive.Close`.
 */
function DrawerClose({
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Close>) {
  return <DrawerPrimitive.Close data-slot="drawer-close" {...props} />
}

/**
 * Renders the Drawer overlay with default translucent background and animation classes.
 *
 * Renders Vaul's Overlay primitive, forwards all props, and attaches a `data-slot="drawer-overlay"`
 * attribute so the overlay can be targeted by slots/tests. The component merges any provided
 * `className` with the default positioning, z-index, background, and entry/exit animation classes.
 *
 * @param className - Optional additional class names to merge with the overlay's defaults
 * @returns A React element rendering the drawer overlay
 */
function DrawerOverlay({
  className,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Overlay>) {
  return (
    <DrawerPrimitive.Overlay
      data-slot="drawer-overlay"
      className={cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className
      )}
      {...props}
    />
  )
}

/**
 * Renders the drawer's main content area inside a portal with direction-aware styling.
 *
 * This component composes DrawerPortal, DrawerOverlay, and Vaul's DrawerPrimitive.Content to
 * render the drawer panel. It applies a set of responsive, direction-aware utility classes
 * (top, bottom, left, right) that control positioning, sizing, borders, and corner radii,
 * sets a data-slot="drawer-content" attribute for slot mapping, and includes a small decorative
 * handle at the top/bottom edge. All other props are forwarded to DrawerPrimitive.Content.
 *
 * @returns A React element containing the drawer content rendered in a portal.
 */
function DrawerContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Content>) {
  return (
    <DrawerPortal data-slot="drawer-portal">
      <DrawerOverlay />
      <DrawerPrimitive.Content
        data-slot="drawer-content"
        className={cn(
          "group/drawer-content bg-background fixed z-50 flex h-auto flex-col",
          "data-[vaul-drawer-direction=top]:inset-x-0 data-[vaul-drawer-direction=top]:top-0 data-[vaul-drawer-direction=top]:mb-24 data-[vaul-drawer-direction=top]:max-h-[80vh] data-[vaul-drawer-direction=top]:rounded-b-lg data-[vaul-drawer-direction=top]:border-b",
          "data-[vaul-drawer-direction=bottom]:inset-x-0 data-[vaul-drawer-direction=bottom]:bottom-0 data-[vaul-drawer-direction=bottom]:mt-24 data-[vaul-drawer-direction=bottom]:max-h-[80vh] data-[vaul-drawer-direction=bottom]:rounded-t-lg data-[vaul-drawer-direction=bottom]:border-t",
          "data-[vaul-drawer-direction=right]:inset-y-0 data-[vaul-drawer-direction=right]:right-0 data-[vaul-drawer-direction=right]:w-3/4 data-[vaul-drawer-direction=right]:border-l data-[vaul-drawer-direction=right]:sm:max-w-sm",
          "data-[vaul-drawer-direction=left]:inset-y-0 data-[vaul-drawer-direction=left]:left-0 data-[vaul-drawer-direction=left]:w-3/4 data-[vaul-drawer-direction=left]:border-r data-[vaul-drawer-direction=left]:sm:max-w-sm",
          className
        )}
        {...props}
      >
        <div className="bg-muted mx-auto mt-4 hidden h-2 w-[100px] shrink-0 rounded-full group-data-[vaul-drawer-direction=bottom]/drawer-content:block" />
        {children}
      </DrawerPrimitive.Content>
    </DrawerPortal>
  )
}

/**
 * Drawer header container used inside DrawerContent.
 *
 * Renders a div with `data-slot="drawer-header"` and composed layout classes.
 * The styling centers text for top/bottom drawer directions on small screens
 * and left-aligns on medium+ screens; any `className` provided is merged.
 *
 * @param className - Additional CSS classes merged with the component's base classes.
 * @param props - Other props are forwarded to the underlying `div`.
 *
 * @returns A React element serving as the drawer header slot.
 */
function DrawerHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="drawer-header"
      className={cn(
        "flex flex-col gap-0.5 p-4 group-data-[vaul-drawer-direction=bottom]/drawer-content:text-center group-data-[vaul-drawer-direction=top]/drawer-content:text-center md:gap-1.5 md:text-left",
        className
      )}
      {...props}
    />
  )
}

/**
 * Footer container for the Drawer.
 *
 * Renders a <div> with the `data-slot="drawer-footer"` attribute, applies default footer layout classes, merges any provided `className`, and forwards all other props to the underlying element.
 */
function DrawerFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="drawer-footer"
      className={cn("mt-auto flex flex-col gap-2 p-4", className)}
      {...props}
    />
  )
}

/**
 * Renders a styled drawer title.
 *
 * Wraps Vaul's `DrawerPrimitive.Title`, forwarding all props while:
 * - Adding `data-slot="drawer-title"` for slot mapping/testing.
 * - Merging a default title class (`text-foreground font-semibold`) with any provided `className`.
 *
 * @returns The rendered drawer title element.
 */
function DrawerTitle({
  className,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Title>) {
  return (
    <DrawerPrimitive.Title
      data-slot="drawer-title"
      className={cn("text-foreground font-semibold", className)}
      {...props}
    />
  )
}

/**
 * Description text element for the Drawer.
 *
 * Renders Vaul's `DrawerPrimitive.Description` with a `data-slot="drawer-description"` attribute,
 * applies a default muted small text style, merges any provided `className`, and forwards all other props.
 */
function DrawerDescription({
  className,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Description>) {
  return (
    <DrawerPrimitive.Description
      data-slot="drawer-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  )
}

export {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
}
