"use client"

import * as React from "react"
import { OTPInput, OTPInputContext } from "input-otp"
import { MinusIcon } from "lucide-react"

import { cn } from "@workspace/ui/lib/utils"

/**
 * Wrapper around OTPInput that applies consistent container and input class names and exposes a containerClassName prop.
 *
 * Renders OTPInput with data-slot="input-otp", merges a default set of container classes with `containerClassName`, and merges default input classes with `className`. All other OTPInput props are forwarded.
 *
 * @param containerClassName - Additional class names applied to the OTP container (merged with the component's default container classes).
 * @param className - Additional class names applied to the input element (merged with the component's default input classes).
 */
function InputOTP({
  className,
  containerClassName,
  ...props
}: React.ComponentProps<typeof OTPInput> & {
  containerClassName?: string
}) {
  return (
    <OTPInput
      data-slot="input-otp"
      containerClassName={cn(
        "flex items-center gap-2 has-disabled:opacity-50",
        containerClassName
      )}
      className={cn("disabled:cursor-not-allowed", className)}
      {...props}
    />
  )
}

/**
 * Container component for grouping OTP slots.
 *
 * Renders a div with data-slot="input-otp-group" and base flex layout classes,
 * merging any provided `className`. All other div props are forwarded to the root element.
 *
 * @param className - Additional CSS class names to apply to the container
 */
function InputOTPGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="input-otp-group"
      className={cn("flex items-center", className)}
      {...props}
    />
  )
}

/**
 * Renders a single OTP slot reflecting runtime slot state from OTPInputContext.
 *
 * Reads the surrounding OTPInputContext and displays the character for `slots[index]`.
 * Shows a centered, non-interactive blinking caret overlay when the slot's `hasFakeCaret`
 * flag is true and sets a `data-active` attribute when the slot is active.
 *
 * @param index - Zero-based slot index to read from `OTPInputContext.slots`.
 * @param className - Additional CSS classes merged into the slot container.
 * @returns A JSX element for the OTP slot (a <div>) with slot content and optional caret.
 */
function InputOTPSlot({
  index,
  className,
  ...props
}: React.ComponentProps<"div"> & {
  index: number
}) {
  const inputOTPContext = React.useContext(OTPInputContext)
  const { char, hasFakeCaret, isActive } = inputOTPContext?.slots[index] ?? {}

  return (
    <div
      data-slot="input-otp-slot"
      data-active={isActive}
      className={cn(
        "data-[active=true]:border-ring data-[active=true]:ring-ring/50 data-[active=true]:aria-invalid:ring-destructive/20 dark:data-[active=true]:aria-invalid:ring-destructive/40 aria-invalid:border-destructive data-[active=true]:aria-invalid:border-destructive dark:bg-input/30 border-input relative flex h-9 w-9 items-center justify-center border-y border-r text-sm shadow-xs transition-all outline-none first:rounded-l-md first:border-l last:rounded-r-md data-[active=true]:z-10 data-[active=true]:ring-[3px]",
        className
      )}
      {...props}
    >
      {char}
      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="animate-caret-blink bg-foreground h-4 w-px duration-1000" />
        </div>
      )}
    </div>
  )
}

/**
 * Renders a visual separator used between OTP slots.
 *
 * The separator is a div with `data-slot="input-otp-separator"` and `role="separator"`,
 * containing a minus icon. All standard div props are forwarded to the root element.
 *
 * @returns A JSX element representing the OTP slot separator.
 */
function InputOTPSeparator({ ...props }: React.ComponentProps<"div">) {
  return (
    <div data-slot="input-otp-separator" role="separator" {...props}>
      <MinusIcon />
    </div>
  )
}

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator }
