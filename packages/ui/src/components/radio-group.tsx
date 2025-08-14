"use client"

import * as React from "react"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"
import { CircleIcon } from "lucide-react"

import { cn } from "@workspace/ui/lib/utils"

/**
 * A styled wrapper around Radix UI's RadioGroup.Root.
 *
 * Renders a Radix RadioGroup root element with a default grid gap layout and
 * a data-slot of "radio-group". Any additional props (including `className`)
 * are forwarded to the underlying Radix primitive; provided `className` is
 * merged with the default "grid gap-3" classes.
 *
 * @returns A JSX element rendering the Radix RadioGroup root.
 */
function RadioGroup({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Root>) {
  return (
    <RadioGroupPrimitive.Root
      data-slot="radio-group"
      className={cn("grid gap-3", className)}
      {...props}
    />
  )
}

/**
 * A styled Radix UI radio item used inside RadioGroup.
 *
 * Renders a Radix RadioGroup.Item with a circular visual and a centered dot indicator.
 * Applies a set of default styling classes (focus, disabled, aria-invalid variants, sizing, and transitions)
 * and merges any provided `className`. All other props are forwarded to the underlying Radix primitive.
 *
 * The element includes data-slot attributes for styling hooks:
 * - `data-slot="radio-group-item"` on the item
 * - `data-slot="radio-group-indicator"` on the indicator
 *
 * @returns A JSX element representing a single radio option.
 */
function RadioGroupItem({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Item>) {
  return (
    <RadioGroupPrimitive.Item
      data-slot="radio-group-item"
      className={cn(
        "border-input text-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 aspect-square size-4 shrink-0 rounded-full border shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator
        data-slot="radio-group-indicator"
        className="relative flex items-center justify-center"
      >
        <CircleIcon className="fill-primary absolute top-1/2 left-1/2 size-2 -translate-x-1/2 -translate-y-1/2" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  )
}

export { RadioGroup, RadioGroupItem }
