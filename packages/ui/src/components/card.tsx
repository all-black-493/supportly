import * as React from "react"

import { cn } from "@workspace/ui/lib/utils"

/**
 * A presentational Card container element with default visual styling.
 *
 * Renders a div with `data-slot="card"` and a set of base styling classes (background, foreground, layout, spacing, border, radius, and shadow).
 * Merges any provided `className` with the defaults and forwards all other props to the underlying div.
 *
 * @param className - Optional additional class names to merge with the card's default classes.
 * @returns The rendered card element.
 */
function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card"
      className={cn(
        "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm",
        className
      )}
      {...props}
    />
  )
}

/**
 * CardHeader component — semantic header region for a Card.
 *
 * Renders a div with `data-slot="card-header"` and applies the card header layout and responsive grid classes.
 * Accepts any standard div props and merges a provided `className` with the component's base classes.
 *
 * @param className - Additional CSS class names to merge with the component's base header classes.
 * @returns The header element for use inside a Card.
 */
function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
        className
      )}
      {...props}
    />
  )
}

/**
 * Renders the card's title area with preset typography and forwards native div props.
 *
 * The component outputs a <div> with `data-slot="card-title"`, applies base typography
 * classes (`leading-none font-semibold`) merged with any provided `className`, and
 * forwards all other props to the underlying element.
 *
 * @returns A JSX element representing the card title container.
 */
function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn("leading-none font-semibold", className)}
      {...props}
    />
  )
}

/**
 * Renders the card's description text area.
 *
 * Applies the default text styling ("text-muted-foreground text-sm"), merges any
 * provided `className`, and forwards all other div props to the underlying element.
 *
 * @param className - Additional CSS class names to merge with the default styles.
 * @returns A `<div>` element with `data-slot="card-description"`.
 */
function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  )
}

/**
 * Action area inside a Card used to position controls (e.g., buttons) within the card layout.
 *
 * Renders a `div` with `data-slot="card-action"`, applies grid positioning classes to place the actions
 * (top-right within the card grid by default), merges any provided `className`, and forwards all other
 * props to the underlying `div`.
 *
 * @returns The rendered `div` element for the card action slot.
 */
function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )}
      {...props}
    />
  )
}

/**
 * Presentational container for the card's main content area.
 *
 * Renders a div with `data-slot="card-content"` and horizontal padding, merges any provided `className` with the base padding class, and forwards all other props to the underlying div.
 *
 * @returns A JSX element representing the card content container.
 */
function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-6", className)}
      {...props}
    />
  )
}

/**
 * Card footer container — positions footer content and applies horizontal padding.
 *
 * Renders a div with `data-slot="card-footer"` that aligns children horizontally and adds
 * left/right padding and a top padding modifier when a top border is present. Additional
 * HTML div props are forwarded to the element.
 *
 * @param className - Optional additional CSS classes to merge with the component's defaults
 * @returns A React element representing the card's footer region
 */
function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center px-6 [.border-t]:pt-6", className)}
      {...props}
    />
  )
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
}
