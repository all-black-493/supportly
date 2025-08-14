import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { ChevronRight, MoreHorizontal } from "lucide-react"

import { cn } from "@workspace/ui/lib/utils"

/**
 * Root container for a breadcrumb navigation.
 *
 * Renders a <nav> with aria-label="breadcrumb" and data-slot="breadcrumb" to serve as the accessible wrapper
 * for breadcrumb items. All other props are forwarded to the underlying <nav> element (e.g., className, id,
 * event handlers).
 *
 * @returns The breadcrumb <nav> element ready to contain a BreadcrumbList and BreadcrumbItem children.
 */
function Breadcrumb({ ...props }: React.ComponentProps<"nav">) {
  return <nav aria-label="breadcrumb" data-slot="breadcrumb" {...props} />
}

/**
 * Ordered list container for breadcrumb items.
 *
 * Renders an <ol> with sensible layout and typography classes for breadcrumbs,
 * sets `data-slot="breadcrumb-list"`, and forwards any other <ol> props.
 *
 * @param className - Optional additional class names to merge with the component's base classes
 */
function BreadcrumbList({ className, ...props }: React.ComponentProps<"ol">) {
  return (
    <ol
      data-slot="breadcrumb-list"
      className={cn(
        "text-muted-foreground flex flex-wrap items-center gap-1.5 text-sm break-words sm:gap-2.5",
        className
      )}
      {...props}
    />
  )
}

/**
 * A list item wrapper for breadcrumb entries.
 *
 * Renders an `li` element with the `data-slot="breadcrumb-item"` attribute, applies base inline-flex layout and spacing classes, merges any provided `className`, and forwards remaining `li` props to the element.
 */
function BreadcrumbItem({ className, ...props }: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="breadcrumb-item"
      className={cn("inline-flex items-center gap-1.5", className)}
      {...props}
    />
  )
}

/**
 * Renders a breadcrumb link element, optionally using a Radix `Slot` for composition.
 *
 * @param asChild - If true, renders a `Slot` so a child component is used as the link; otherwise renders an `<a>` element.
 * @param className - Additional class names merged with the component's base styles.
 * @returns The rendered link element (`<a>` or `Slot`) with breadcrumb-specific attributes and styling.
 */
function BreadcrumbLink({
  asChild,
  className,
  ...props
}: React.ComponentProps<"a"> & {
  asChild?: boolean
}) {
  const Comp = asChild ? Slot : "a"

  return (
    <Comp
      data-slot="breadcrumb-link"
      className={cn("hover:text-foreground transition-colors", className)}
      {...props}
    />
  )
}

/**
 * Renders the current page item in a breadcrumb as a non-interactive `span`.
 *
 * This component marks the item as the current page for assistive technology
 * (aria-current="page"), presents it with `role="link"` while disabling
 * interaction (aria-disabled="true"), and emits `data-slot="breadcrumb-page"`
 * for slot-based composition. Accepts all standard `span` props and merges
 * provided `className` with the component's base typography classes.
 *
 * @returns A JSX element representing the current breadcrumb page.
 */
function BreadcrumbPage({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="breadcrumb-page"
      role="link"
      aria-disabled="true"
      aria-current="page"
      className={cn("text-foreground font-normal", className)}
      {...props}
    />
  )
}

/**
 * Renders a breadcrumb separator as an <li> element.
 *
 * The separator is presentation-only (role="presentation", aria-hidden="true") and
 * applies a size class to any child SVGs. If no `children` are provided, a
 * right-chevron icon is rendered by default.
 *
 * @param children - Optional content to render inside the separator; defaults to a chevron icon when omitted.
 * @param className - Additional class names merged with the component's base classes.
 * @returns The rendered breadcrumb separator `<li>` element.
 */
function BreadcrumbSeparator({
  children,
  className,
  ...props
}: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="breadcrumb-separator"
      role="presentation"
      aria-hidden="true"
      className={cn("[&>svg]:size-3.5", className)}
      {...props}
    >
      {children ?? <ChevronRight />}
    </li>
  )
}

/**
 * Renders an inline "ellipsis" breadcrumb element used to indicate collapsed/hidden items.
 *
 * The component outputs a non-interactive <span> containing a MoreHorizontal icon and a screen-reader-only "More" label.
 * It sets role="presentation" and aria-hidden="true" to remain visually available while being ignored by assistive technologies,
 * and forwards any other span props to the root element.
 *
 * @param className - Additional CSS classes merged with the component's base layout classes.
 */
function BreadcrumbEllipsis({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="breadcrumb-ellipsis"
      role="presentation"
      aria-hidden="true"
      className={cn("flex size-9 items-center justify-center", className)}
      {...props}
    >
      <MoreHorizontal className="size-4" />
      <span className="sr-only">More</span>
    </span>
  )
}

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
}
