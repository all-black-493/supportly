"use client"

import * as React from "react"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { ChevronDownIcon } from "lucide-react"

import { cn } from "@workspace/ui/lib/utils"

/**
 * Wrapper around Radix UI's Accordion root that mounts an accordion container.
 *
 * Renders an AccordionPrimitive.Root, forwards all received props to it, and
 * injects a `data-slot="accordion"` attribute for styling/test hooks.
 *
 * Use this component anywhere an accordion root is required; it preserves all
 * behaviors and props of the underlying Radix root.
 */
function Accordion({
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return <AccordionPrimitive.Root data-slot="accordion" {...props} />
}

/**
 * Wrapper around Radix Accordion.Item that applies consistent borders and a data-slot attribute.
 *
 * Renders an Accordion item with default bottom-border styles (`border-b` and `last:border-b-0`) merged
 * with any provided `className`, and sets `data-slot="accordion-item"` for testability/selection.
 */
function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn("border-b last:border-b-0", className)}
      {...props}
    />
  )
}

/**
 * Renders an accessible accordion trigger wrapped in a header, including a trailing chevron.
 *
 * The component wraps Radix's Trigger in a Header, applies default interaction and focus styles,
 * merges any provided `className` with those defaults, and renders `children` alongside a
 * ChevronDownIcon that rotates when the trigger state is open.
 *
 * @param className - Additional class names merged with the component's default classes.
 * @param children - Content rendered inside the trigger (typically the item title).
 * @returns A React element representing the accordion trigger.
 */
function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "focus-visible:border-ring focus-visible:ring-ring/50 flex flex-1 items-start justify-between gap-4 rounded-md py-4 text-left text-sm font-medium transition-all outline-none hover:underline focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:rotate-180",
          className
        )}
        {...props}
      >
        {children}
        <ChevronDownIcon className="text-muted-foreground pointer-events-none size-4 shrink-0 translate-y-0.5 transition-transform duration-200" />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

/**
 * Accordion content panel with open/close animations and inner padding.
 *
 * Renders Radix Accordion Content with state-driven open/close animations and an inner wrapper that applies top/bottom padding. Adds `data-slot="accordion-content"` for targeting.
 *
 * @param className - Additional CSS classes to apply to the inner content wrapper (merged with default padding).
 * @param children - Content rendered inside the accordion panel.
 */
function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden text-sm"
      {...props}
    >
      <div className={cn("pt-0 pb-4", className)}>{children}</div>
    </AccordionPrimitive.Content>
  )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
