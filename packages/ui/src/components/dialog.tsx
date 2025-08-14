"use client"

import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { XIcon } from "lucide-react"

import { cn } from "@workspace/ui/lib/utils"

/**
 * Root Dialog component that wraps Radix's DialogPrimitive.Root.
 *
 * This component forwards all props to DialogPrimitive.Root and adds a
 * data-slot="dialog" attribute for consistent slot-based styling.
 *
 * @param props - Props accepted by Radix `DialogPrimitive.Root` (all are forwarded).
 * @returns The rendered Dialog root element.
 */
function Dialog({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Root>) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />
}

/**
 * Wrapper around Radix Dialog Trigger that forwards all props and applies a `data-slot="dialog-trigger"` attribute.
 *
 * Use this component to open the dialog; it accepts the same props as `DialogPrimitive.Trigger` and forwards them unchanged.
 */
function DialogTrigger({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />
}

/**
 * Wraps Radix's DialogPrimitive.Portal and attaches `data-slot="dialog-portal"` for styling/slotting.
 *
 * Forwards all received props to the underlying Radix Portal.
 */
function DialogPortal({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Portal>) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />
}

/**
 * A thin wrapper around Radix's Dialog Close primitive that adds a data-slot for styling.
 *
 * Renders a DialogPrimitive.Close element with `data-slot="dialog-close"` and forwards all props.
 */
function DialogClose({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Close>) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />
}

/**
 * Radix Overlay wrapper that renders the dialog backdrop with project defaults.
 *
 * Renders a full-screen, fixed backdrop for dialogs and attaches data-slot="dialog-overlay"
 * for styling/slotting. The component merges its default positioning, backdrop, and open/close
 * animation classes with any `className` provided via props.
 *
 * @param className - Additional CSS classes to merge with the component's defaults.
 * @returns The rendered Dialog overlay element.
 */
function DialogOverlay({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
  return (
    <DialogPrimitive.Overlay
      data-slot="dialog-overlay"
      className={cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className
      )}
      {...props}
    />
  )
}

/**
 * Renders the dialog content inside a Portal with backdrop and optional close button.
 *
 * This composes a DialogPortal, DialogOverlay, and Radix Dialog Content, centering
 * and styling the content area and merging any `className` provided. It also
 * injects data-slot attributes for theming/slotting hooks and, by default,
 * renders an accessible top-right close button.
 *
 * @param className - Additional CSS class names merged with the component's defaults.
 * @param children - Content to render inside the dialog.
 * @param showCloseButton - When true (default), renders a top-right close button that closes the dialog.
 */
function DialogContent({
  className,
  children,
  showCloseButton = true,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Content> & {
  showCloseButton?: boolean
}) {
  return (
    <DialogPortal data-slot="dialog-portal">
      <DialogOverlay />
      <DialogPrimitive.Content
        data-slot="dialog-content"
        className={cn(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg",
          className
        )}
        {...props}
      >
        {children}
        {showCloseButton && (
          <DialogPrimitive.Close
            data-slot="dialog-close"
            className="ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
          >
            <XIcon />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Content>
    </DialogPortal>
  )
}

/**
 * Layout wrapper for a dialog header region.
 *
 * Renders a div with `data-slot="dialog-header"` and default header layout classes
 * (vertical stack, small gap, centered on small screens and left-aligned on larger screens).
 *
 * @param className - Additional CSS classes to merge with the component's default layout classes.
 */
function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-header"
      className={cn("flex flex-col gap-2 text-center sm:text-left", className)}
      {...props}
    />
  )
}

/**
 * A layout wrapper for dialog action buttons placed at the bottom of a dialog.
 *
 * Renders a div with data-slot="dialog-footer" and responsive layout:
 * - Small screens: column-reverse with a small gap (actions stack with primary action last).
 * - SM and up: row layout aligned to the end (actions arranged horizontally, right-aligned).
 *
 * Accepts all standard div props which are forwarded to the underlying element.
 *
 * @param className - Additional CSS classes to append to the component's default layout classes.
 */
function DialogFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn(
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        className
      )}
      {...props}
    />
  )
}

/**
 * Styled wrapper around Radix Dialog Title with slot and default typography.
 *
 * Renders a DialogPrimitive.Title with data-slot="dialog-title" and applies
 * default title classes (`text-lg leading-none font-semibold`). Any `className`
 * passed to the component is merged with these defaults.
 *
 * @returns The rendered dialog title element.
 */
function DialogTitle({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn("text-lg leading-none font-semibold", className)}
      {...props}
    />
  )
}

/**
 * Styled wrapper around Radix Dialog Description.
 *
 * Renders a DialogPrimitive.Description with a default muted, small text style and a `data-slot="dialog-description"` attribute. Any `className` provided is merged with the default classes; other props are forwarded to the underlying Radix primitive.
 *
 * @param className - Additional CSS classes to merge with the component's default styles.
 */
function DialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  )
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
}
