"use client"

import * as React from "react"
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog"

import { cn } from "@workspace/ui/lib/utils"
import { buttonVariants } from "@workspace/ui/components/button"

/**
 * Wrapper around Radix UI's AlertDialog root that forwards props and marks the element for slot composition.
 *
 * Renders an AlertDialog root element with a `data-slot="alert-dialog"` attribute and forwards all received props
 * to the underlying Radix `AlertDialogPrimitive.Root`.
 */
function AlertDialog({
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Root>) {
  return <AlertDialogPrimitive.Root data-slot="alert-dialog" {...props} />
}

/**
 * Render an AlertDialog trigger.
 *
 * Forwards all props to the underlying Radix AlertDialog Trigger and adds
 * `data-slot="alert-dialog-trigger"` for slot-based composition.
 */
function AlertDialogTrigger({
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Trigger>) {
  return (
    <AlertDialogPrimitive.Trigger data-slot="alert-dialog-trigger" {...props} />
  )
}

/**
 * Renders a Radix AlertDialog Portal with a `data-slot` attribute.
 *
 * This is a thin wrapper around `AlertDialogPrimitive.Portal` that forwards all props
 * and ensures `data-slot="alert-dialog-portal"` is present for slot-based composition.
 */
function AlertDialogPortal({
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Portal>) {
  return (
    <AlertDialogPrimitive.Portal data-slot="alert-dialog-portal" {...props} />
  )
}

/**
 * Radix AlertDialog overlay with bundled styling and a data-slot attribute.
 *
 * Renders an AlertDialogPrimitive.Overlay, applying default backdrop, z-index,
 * and open/close animation classes while forwarding all other props.
 *
 * @param className - Additional CSS classes to merge with the component's default overlay classes.
 */
function AlertDialogOverlay({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Overlay>) {
  return (
    <AlertDialogPrimitive.Overlay
      data-slot="alert-dialog-overlay"
      className={cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className
      )}
      {...props}
    />
  )
}

/**
 * Composes the AlertDialog portal, overlay, and content into a single dialog content component.
 *
 * Renders the dialog inside an AlertDialogPortal with an AlertDialogOverlay and a styled
 * AlertDialogPrimitive.Content. Forwards all props to the underlying Radix `Content`.
 *
 * @param className - Optional additional CSS classes to merge with the component's default styling.
 * @returns A React element rendering the composed alert dialog content.
 */
function AlertDialogContent({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Content>) {
  return (
    <AlertDialogPortal>
      <AlertDialogOverlay />
      <AlertDialogPrimitive.Content
        data-slot="alert-dialog-content"
        className={cn(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg",
          className
        )}
        {...props}
      />
    </AlertDialogPortal>
  )
}

/**
 * Header container for the AlertDialog layout.
 *
 * Renders a <div> with the data-slot "alert-dialog-header", applies default layout and typography
 * classes (vertical stack, gap, center-aligned on small screens, left-aligned on larger screens),
 * and merges any provided `className`. All other <div> props are forwarded.
 *
 * @param className - Additional CSS classes to merge with the component's defaults.
 */
function AlertDialogHeader({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-dialog-header"
      className={cn("flex flex-col gap-2 text-center sm:text-left", className)}
      {...props}
    />
  )
}

/**
 * Footer container for AlertDialog content.
 *
 * Renders a div with `data-slot="alert-dialog-footer"` and responsive layout classes
 * (column-reverse on small screens, row aligned to the end on larger screens). Forwards
 * all other div props to the element.
 *
 * @param className - Additional CSS classes to merge with the default layout classes.
 */
function AlertDialogFooter({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-dialog-footer"
      className={cn(
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        className
      )}
      {...props}
    />
  )
}

/**
 * A styled wrapper around Radix's AlertDialog Title that applies default typography and a slot attribute.
 *
 * Renders an AlertDialogPrimitive.Title with a data-slot of `"alert-dialog-title"` and default classes
 * (`text-lg font-semibold`). Any `className` passed will be merged with these defaults.
 *
 * @param className - Additional CSS classes to merge with the default typography classes.
 */
function AlertDialogTitle({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Title>) {
  return (
    <AlertDialogPrimitive.Title
      data-slot="alert-dialog-title"
      className={cn("text-lg font-semibold", className)}
      {...props}
    />
  )
}

/**
 * A styled wrapper around Radix's AlertDialog.Description that provides default text styles and a data-slot attribute.
 *
 * Merges the provided `className` with default muted, small text styles and forwards all other props to the underlying primitive.
 *
 * @param className - Additional CSS classes to append to the default description styles.
 * @returns A React element rendering the alert dialog description.
 */
function AlertDialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Description>) {
  return (
    <AlertDialogPrimitive.Description
      data-slot="alert-dialog-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  )
}

/**
 * Styled wrapper for Radix's AlertDialog Action button.
 *
 * Renders an AlertDialogPrimitive.Action with the library's buttonVariants applied and any provided `className` merged. All other props are forwarded to the underlying Radix primitive (e.g., event handlers, children, etc.).
 *
 * @param className - Optional additional class names that will be merged with the default button styles.
 * @returns A React element representing the alert dialog action button.
 */
function AlertDialogAction({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Action>) {
  return (
    <AlertDialogPrimitive.Action
      className={cn(buttonVariants(), className)}
      {...props}
    />
  )
}

/**
 * A styled wrapper for Radix's AlertDialog Cancel control.
 *
 * Renders AlertDialogPrimitive.Cancel with the component's "outline" button variant applied,
 * merging any provided `className` and forwarding all other props to the underlying primitive.
 *
 * @returns The rendered cancel button element for use inside an AlertDialog.
 */
function AlertDialogCancel({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Cancel>) {
  return (
    <AlertDialogPrimitive.Cancel
      className={cn(buttonVariants({ variant: "outline" }), className)}
      {...props}
    />
  )
}

export {
  AlertDialog,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
}
