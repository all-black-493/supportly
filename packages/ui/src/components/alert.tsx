import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@workspace/ui/lib/utils"

const alertVariants = cva(
  "relative w-full rounded-lg border px-4 py-3 text-sm grid has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] grid-cols-[0_1fr] has-[>svg]:gap-x-3 gap-y-0.5 items-start [&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current",
  {
    variants: {
      variant: {
        default: "bg-card text-card-foreground",
        destructive:
          "text-destructive bg-card [&>svg]:text-current *:data-[slot=alert-description]:text-destructive/90",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

/**
 * Alert container element with variant-based styling.
 *
 * Renders a `div` with `role="alert"` and `data-slot="alert"`, applies classes from `alertVariants`, and forwards all other `div` props.
 *
 * @param variant - Visual variant: `"default"` (card background/foreground) or `"destructive"` (error/destructive styling).
 * @param className - Optional additional class names merged with the computed variant classes.
 */
function Alert({
  className,
  variant,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof alertVariants>) {
  return (
    <div
      data-slot="alert"
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    />
  )
}

/**
 * Renders the Alert title slot used inside an Alert.
 *
 * The element uses the "alert-title" data-slot and applies layout and typography classes
 * (grid column start, line clamping, minimum height, font weight, and tracking). Any
 * additional `className` is merged and all other div props are forwarded to the element.
 *
 * @returns A JSX `div` element representing the alert title.
 */
function AlertTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-title"
      className={cn(
        "col-start-2 line-clamp-1 min-h-4 font-medium tracking-tight",
        className
      )}
      {...props}
    />
  )
}

/**
 * Renders the alert's descriptive content area.
 *
 * This component provides the styled container for an alert's description text. It renders a div with
 * data-slot="alert-description" and applies the component's default typography and layout classes;
 * any `className` passed in is merged with those defaults.
 *
 * @param className - Additional class names to merge with the component's default styles.
 * @returns A div element intended to contain descriptive content for an Alert.
 */
function AlertDescription({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-description"
      className={cn(
        "text-muted-foreground col-start-2 grid justify-items-start gap-1 text-sm [&_p]:leading-relaxed",
        className
      )}
      {...props}
    />
  )
}

export { Alert, AlertTitle, AlertDescription }
