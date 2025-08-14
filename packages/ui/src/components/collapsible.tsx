"use client"

import * as CollapsiblePrimitive from "@radix-ui/react-collapsible"

/**
 * Wrapper around Radix UI's Collapsible root that attaches a `data-slot` and forwards all props.
 *
 * This component renders `CollapsiblePrimitive.Root` with `data-slot="collapsible"` and passes through
 * any received props to the underlying Radix primitive.
 *
 * @param props - Props are the same as React.ComponentProps<typeof CollapsiblePrimitive.Root> and are forwarded to the underlying primitive.
 * @returns A React element rendering the Radix Collapsible root.
 */
function Collapsible({
  ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.Root>) {
  return <CollapsiblePrimitive.Root data-slot="collapsible" {...props} />
}

/**
 * Wrapper around Radix's CollapsibleTrigger that attaches a standardized data-slot.
 *
 * Renders `CollapsiblePrimitive.CollapsibleTrigger` with the `data-slot="collapsible-trigger"` attribute and forwards all received props to the underlying Radix primitive.
 *
 * @returns The rendered collapsible trigger element.
 */
function CollapsibleTrigger({
  ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.CollapsibleTrigger>) {
  return (
    <CollapsiblePrimitive.CollapsibleTrigger
      data-slot="collapsible-trigger"
      {...props}
    />
  )
}

/**
 * Wrapper around Radix's CollapsibleContent that forwards all props and sets a `data-slot="collapsible-content"` attribute.
 *
 * Accepts the same props as `CollapsiblePrimitive.CollapsibleContent` and spreads them to the underlying primitive.
 *
 * @param props - Props forwarded to the underlying Radix CollapsibleContent.
 * @returns A JSX element rendering the Radix CollapsibleContent with the `data-slot` attribute applied.
 */
function CollapsibleContent({
  ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.CollapsibleContent>) {
  return (
    <CollapsiblePrimitive.CollapsibleContent
      data-slot="collapsible-content"
      {...props}
    />
  )
}

export { Collapsible, CollapsibleTrigger, CollapsibleContent }
