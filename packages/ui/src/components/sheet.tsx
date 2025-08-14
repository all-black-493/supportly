"use client"

import * as React from "react"
import * as SheetPrimitive from "@radix-ui/react-dialog"
import { XIcon } from "lucide-react"

import { cn } from "@workspace/ui/lib/utils"

/**
 * Root Sheet component that wraps Radix UI's Dialog Root.
 *
 * Renders a SheetPrimitive.Root with a data-slot of "sheet" and forwards all received props to the underlying Radix primitive.
 *
 * @returns A JSX element rendering the sheet root.
 */
function Sheet({ ...props }: React.ComponentProps<typeof SheetPrimitive.Root>) {
  return <SheetPrimitive.Root data-slot="sheet" {...props} />
}

/**
 * React wrapper for Radix's Sheet trigger that adds a data-slot attribute.
 *
 * Renders a SheetPrimitive.Trigger and forwards all props to it while adding
 * data-slot="sheet-trigger" to aid styling and testing.
 *
 * @returns The rendered trigger element (JSX.Element).
 */
function SheetTrigger({
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Trigger>) {
  return <SheetPrimitive.Trigger data-slot="sheet-trigger" {...props} />
}

/**
 * A simple wrapper around Radix's Sheet Close button that adds a data-slot for styling.
 *
 * Forwards all props to `SheetPrimitive.Close` and injects `data-slot="sheet-close"`.
 */
function SheetClose({
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Close>) {
  return <SheetPrimitive.Close data-slot="sheet-close" {...props} />
}

/**
 * Renders a Radix Portal for the sheet and applies the `data-slot="sheet-portal"` attribute.
 *
 * Forwards all props to Radix UI's `Portal` (including children and any portal-specific options).
 */
function SheetPortal({
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Portal>) {
  return <SheetPrimitive.Portal data-slot="sheet-portal" {...props} />
}

/**
 * Overlay backdrop for the Sheet component.
 *
 * Renders a Radix Overlay with data-slot="sheet-overlay", applies the default
 * semi-transparent backdrop and state-driven open/close animation classes,
 * and merges any provided `className` and other props.
 */
function SheetOverlay({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Overlay>) {
  return (
    <SheetPrimitive.Overlay
      data-slot="sheet-overlay"
      className={cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className
      )}
      {...props}
    />
  )
}

/**
 * Renders the sheet's sliding content panel inside a portal with an overlay.
 *
 * The Content panel includes built-in open/close animations, side-specific sizing and placement,
 * and a top-right close control. It renders a SheetPortal and SheetOverlay, then a Radix
 * Content element with merged classes and forwarded props.
 *
 * @param side - Which edge the sheet should slide from. One of `"top"`, `"right"`, `"bottom"`, or `"left"`. Defaults to `"right"`. Controls animation direction and sizing:
 *   - `"right"` / `"left"`: full height, ~3/4 width, anchored to the corresponding side.
 *   - `"top"` / `"bottom"`: auto height, full width, anchored to the corresponding edge.
 * @returns A JSX element containing the sheet content panel.
 */
function SheetContent({
  className,
  children,
  side = "right",
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Content> & {
  side?: "top" | "right" | "bottom" | "left"
}) {
  return (
    <SheetPortal>
      <SheetOverlay />
      <SheetPrimitive.Content
        data-slot="sheet-content"
        className={cn(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out fixed z-50 flex flex-col gap-4 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500",
          side === "right" &&
            "data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm",
          side === "left" &&
            "data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm",
          side === "top" &&
            "data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top inset-x-0 top-0 h-auto border-b",
          side === "bottom" &&
            "data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom inset-x-0 bottom-0 h-auto border-t",
          className
        )}
        {...props}
      >
        {children}
        <SheetPrimitive.Close className="ring-offset-background focus:ring-ring data-[state=open]:bg-secondary absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none">
          <XIcon className="size-4" />
          <span className="sr-only">Close</span>
        </SheetPrimitive.Close>
      </SheetPrimitive.Content>
    </SheetPortal>
  )
}

/**
 * Layout container for a sheet's header area.
 *
 * Renders a div with data-slot="sheet-header" and default header spacing/stacking classes.
 * Merges any provided `className` with the default "flex flex-col gap-1.5 p-4" styles.
 *
 * @param className - Optional additional class names to merge with the component's defaults.
 * @returns The header container element for use inside `SheetContent`.
 */
function SheetHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-header"
      className={cn("flex flex-col gap-1.5 p-4", className)}
      {...props}
    />
  )
}

/**
 * Footer container for Sheet content.
 *
 * Renders a div with `data-slot="sheet-footer"` and default spacing/sticky layout
 * (pushes to bottom with `mt-auto`, column layout, gap, and padding). Merges any
 * provided `className` with the default classes and forwards all other props to the div.
 *
 * @param className - Additional CSS classes to merge with the default footer classes.
 */
function SheetFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-footer"
      className={cn("mt-auto flex flex-col gap-2 p-4", className)}
      {...props}
    />
  )
}

/**
 * Sheet title element with default styling for the Sheet component.
 *
 * Renders a Radix `SheetPrimitive.Title` with a `data-slot="sheet-title"` attribute
 * and default typography classes (`text-foreground font-semibold`). Forwards all props
 * to the underlying primitive and merges any provided `className`.
 *
 * @returns The rendered sheet title element.
 */
function SheetTitle({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Title>) {
  return (
    <SheetPrimitive.Title
      data-slot="sheet-title"
      className={cn("text-foreground font-semibold", className)}
      {...props}
    />
  )
}

/**
 * Renders a sheet description slot using Radix's Description primitive.
 *
 * Renders a <Description> with data-slot="sheet-description" and default muted text styles;
 * any `className` provided is merged with the defaults.
 *
 * @param className - Optional additional CSS class names to merge with the component's default styles.
 * @returns The Sheet description element.
 */
function SheetDescription({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Description>) {
  return (
    <SheetPrimitive.Description
      data-slot="sheet-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  )
}

export {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
}
