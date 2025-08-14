"use client"

import * as AspectRatioPrimitive from "@radix-ui/react-aspect-ratio"

/**
 * Thin wrapper around Radix UI's AspectRatio.Root that attaches a `data-slot="aspect-ratio"` attribute.
 *
 * Forwards all received props to `AspectRatioPrimitive.Root`. Use the same props as `AspectRatioPrimitive.Root`.
 *
 * @param props - Props forwarded to `AspectRatioPrimitive.Root`.
 * @returns A JSX element rendering `AspectRatioPrimitive.Root` with the `data-slot="aspect-ratio"` attribute.
 */
function AspectRatio({
  ...props
}: React.ComponentProps<typeof AspectRatioPrimitive.Root>) {
  return <AspectRatioPrimitive.Root data-slot="aspect-ratio" {...props} />
}

export { AspectRatio }
