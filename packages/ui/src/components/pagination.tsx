import * as React from "react"
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  MoreHorizontalIcon,
} from "lucide-react"

import { cn } from "@workspace/ui/lib/utils"
import { Button, buttonVariants } from "@workspace/ui/components/button"

/**
 * Renders a semantic pagination navigation wrapper.
 *
 * The component outputs a <nav> with role="navigation", aria-label="pagination" and a
 * data-slot of "pagination". It applies a default centered layout class set and
 * merges any provided `className`, forwarding all other props to the underlying
 * nav element.
 *
 * @param className - Additional CSS classes merged with the component's default layout classes.
 * @param props - Props forwarded to the underlying <nav> element.
 */
function Pagination({ className, ...props }: React.ComponentProps<"nav">) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      data-slot="pagination"
      className={cn("mx-auto flex w-full justify-center", className)}
      {...props}
    />
  )
}

/**
 * Renders the container list for pagination items.
 *
 * Renders a <ul> with data-slot="pagination-content" and default horizontal layout classes.
 * Additional className and any other valid <ul> props are forwarded to the element.
 *
 * @param className - Optional additional CSS classes to merge with the default layout classes.
 */
function PaginationContent({
  className,
  ...props
}: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="pagination-content"
      className={cn("flex flex-row items-center gap-1", className)}
      {...props}
    />
  )
}

/**
 * Renders a list item used as a pagination item.
 *
 * The underlying <li> is rendered with `data-slot="pagination-item"` and forwards all received props (including `children`, `className`, and event handlers).
 */
function PaginationItem({ ...props }: React.ComponentProps<"li">) {
  return <li data-slot="pagination-item" {...props} />
}

type PaginationLinkProps = {
  isActive?: boolean
} & Pick<React.ComponentProps<typeof Button>, "size"> &
  React.ComponentProps<"a">

/**
 * Renders a pagination link (anchor) with appropriate styling and accessibility attributes.
 *
 * When `isActive` is true the link receives `aria-current="page"` and an "outline" button
 * variant; otherwise it uses the "ghost" variant. The `size` prop controls the Button variant
 * size and defaults to `"icon"`. All other props are forwarded to the underlying `<a>` element.
 *
 * @param isActive - If true, marks the link as the current page (affects `aria-current` and styling).
 * @param size - Button size variant applied to the link; defaults to `"icon"`.
 * @returns A JSX element rendering the styled pagination anchor.
 */
function PaginationLink({
  className,
  isActive,
  size = "icon",
  ...props
}: PaginationLinkProps) {
  return (
    <a
      aria-current={isActive ? "page" : undefined}
      data-slot="pagination-link"
      data-active={isActive}
      className={cn(
        buttonVariants({
          variant: isActive ? "outline" : "ghost",
          size,
        }),
        className
      )}
      {...props}
    />
  )
}

/**
 * Pagination "previous" control.
 *
 * Renders a PaginationLink configured for the "previous" action: sets `aria-label="Go to previous page"`,
 * forces `size="default"`, merges spacing classes with any provided `className`, and renders a left chevron
 * icon plus a responsive "Previous" label (hidden on very small screens).
 *
 * @returns A JSX element for the previous pagination control.
 */
function PaginationPrevious({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      aria-label="Go to previous page"
      size="default"
      className={cn("gap-1 px-2.5 sm:pl-2.5", className)}
      {...props}
    >
      <ChevronLeftIcon />
      <span className="hidden sm:block">Previous</span>
    </PaginationLink>
  )
}

/**
 * Renders a "Next" pagination control.
 *
 * Produces a PaginationLink configured for the "next" action with:
 * - aria-label "Go to next page"
 * - size set to "default"
 * - responsive label ("Next" visible at small screens and up)
 * - right chevron icon
 *
 * @returns The rendered pagination "Next" link element.
 */
function PaginationNext({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      aria-label="Go to next page"
      size="default"
      className={cn("gap-1 px-2.5 sm:pr-2.5", className)}
      {...props}
    >
      <span className="hidden sm:block">Next</span>
      <ChevronRightIcon />
    </PaginationLink>
  )
}

/**
 * Renders an accessible pagination ellipsis indicator.
 *
 * Displays a centered ellipsis icon with a visually hidden "More pages" label for screen readers.
 * The root span has `data-slot="pagination-ellipsis"`, is `aria-hidden` for the visual presentation,
 * accepts `className`, and forwards all other span props to the element.
 */
function PaginationEllipsis({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      aria-hidden
      data-slot="pagination-ellipsis"
      className={cn("flex size-9 items-center justify-center", className)}
      {...props}
    >
      <MoreHorizontalIcon className="size-4" />
      <span className="sr-only">More pages</span>
    </span>
  )
}

export {
  Pagination,
  PaginationContent,
  PaginationLink,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
}
