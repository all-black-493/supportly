"use client"

import * as React from "react"

import { cn } from "@workspace/ui/lib/utils"

/**
 * Renders a responsive table surface wrapped in a horizontally scrollable container.
 *
 * The component forwards all received props to the underlying `<table>` element and
 * applies `data-slot="table-container"` to the wrapper and `data-slot="table"` to
 * the table for slot-based styling/composition.
 *
 * @param className - Additional class names that are merged with the component's default `"w-full caption-bottom text-sm"`.
 * @returns A JSX element containing the table wrapped in a scrollable container.
 */
function Table({ className, ...props }: React.ComponentProps<"table">) {
  return (
    <div
      data-slot="table-container"
      className="relative w-full overflow-x-auto"
    >
      <table
        data-slot="table"
        className={cn("w-full caption-bottom text-sm", className)}
        {...props}
      />
    </div>
  )
}

/**
 * Table header wrapper component rendering a `<thead>` element.
 *
 * Renders a `<thead data-slot="table-header">` with a default row-border style and merges any `className` provided. All other props are forwarded to the underlying `<thead>` element.
 *
 * @param className - Additional class names to merge with the component's defaults.
 */
function TableHeader({ className, ...props }: React.ComponentProps<"thead">) {
  return (
    <thead
      data-slot="table-header"
      className={cn("[&_tr]:border-b", className)}
      {...props}
    />
  )
}

/**
 * Table body wrapper for presentational tables.
 *
 * Renders a `<tbody>` with `data-slot="table-body"`. Merges the provided `className` with a default rule that removes the bottom border from the last row (`[&_tr:last-child]:border-0`) and forwards all other props to the underlying element.
 */
function TableBody({ className, ...props }: React.ComponentProps<"tbody">) {
  return (
    <tbody
      data-slot="table-body"
      className={cn("[&_tr:last-child]:border-0", className)}
      {...props}
    />
  )
}

/**
 * Renders a table footer (<tfoot>) with design-system slot attributes and default footer styles.
 *
 * The component merges provided `className` with the footer's default styling and forwards any
 * other props to the underlying `<tfoot>` element. Adds `data-slot="table-footer"` for slot-based composition.
 *
 * @param props - Props forwarded to the underlying `<tfoot>` element (including `className`)
 * @returns A JSX `<tfoot>` element with merged classes and forwarded props
 */
function TableFooter({ className, ...props }: React.ComponentProps<"tfoot">) {
  return (
    <tfoot
      data-slot="table-footer"
      className={cn(
        "bg-muted/50 border-t font-medium [&>tr]:last:border-b-0",
        className
      )}
      {...props}
    />
  )
}

/**
 * Table row wrapper that renders a `<tr>` with standardized styling and slot metadata.
 *
 * Renders a table row element with `data-slot="table-row"`, merges incoming `className`
 * with the component's default styles (hover background, selected-state background,
 * bottom border, and color transitions), and forwards all other props to the `<tr>`.
 */
function TableRow({ className, ...props }: React.ComponentProps<"tr">) {
  return (
    <tr
      data-slot="table-row"
      className={cn(
        "hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors",
        className
      )}
      {...props}
    />
  )
}

/**
 * Table header cell element with built-in styling and checkbox-aware layout.
 *
 * Renders a `th` element (data-slot="table-head") and forwards all received props to it.
 * Merges incoming `className` with the component's default classes which provide
 * typography, spacing, alignment, no-wrap behavior, and two selectors that:
 * - remove right padding when a checkbox is present in the cell, and
 * - vertically nudge a child element with role="checkbox" for visual alignment.
 *
 * @param className - Additional CSS class names to merge with the defaults.
 * @returns A rendered `th` element ready for use in table header rows.
 */
function TableHead({ className, ...props }: React.ComponentProps<"th">) {
  return (
    <th
      data-slot="table-head"
      className={cn(
        "text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className
      )}
      {...props}
    />
  )
}

/**
 * Render a table cell (<td>) with design-system slot and default layout styles.
 *
 * Renders a <td> element with the `data-slot="table-cell"` attribute, merges any
 * passed `className` with the component's default classes, and forwards all other
 * props to the underlying element.
 *
 * The default classes set padding, vertical alignment, and nowrap behavior, and
 * include selectors that adjust padding and checkbox alignment when a checkbox
 * (`role="checkbox"`) is present inside the cell.
 *
 * @returns A <td> element with merged classes and forwarded props.
 */
function TableCell({ className, ...props }: React.ComponentProps<"td">) {
  return (
    <td
      data-slot="table-cell"
      className={cn(
        "p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className
      )}
      {...props}
    />
  )
}

/**
 * Renders a table caption element with preset styling and slot attribute.
 *
 * Renders a `<caption>` element (data-slot="table-caption") that applies
 * the component's default text and spacing classes and merges any provided
 * `className`. All other props are forwarded to the underlying `<caption>`.
 *
 * @returns The rendered `<caption>` element.
 */
function TableCaption({
  className,
  ...props
}: React.ComponentProps<"caption">) {
  return (
    <caption
      data-slot="table-caption"
      className={cn("text-muted-foreground mt-4 text-sm", className)}
      {...props}
    />
  )
}

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
}
