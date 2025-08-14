"use client"

import * as React from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"

import { cn } from "@workspace/ui/lib/utils"

/**
 * Avatar root component wrapping Radix UI's AvatarPrimitive.Root.
 *
 * Renders a circular avatar container with base sizing and layout classes, attaches
 * `data-slot="avatar"`, and forwards all other props to the underlying Radix primitive.
 *
 * @param className - Additional class names to merge with the component's base styles.
 * @returns The Radix Avatar root element.
 */
function Avatar({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Root>) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      className={cn(
        "relative flex size-8 shrink-0 overflow-hidden rounded-full",
        className
      )}
      {...props}
    />
  )
}

/**
 * AvatarImage — a thin wrapper around Radix's Avatar Image that applies default sizing classes.
 *
 * Renders an <AvatarPrimitive.Image> with data-slot="avatar-image", merges the provided
 * `className` with the base classes `"aspect-square size-full"`, and forwards all other props
 * to the underlying Radix primitive.
 *
 * @param className - Additional CSS classes to merge with the component's base classes.
 * @param props - Remaining props forwarded to `AvatarPrimitive.Image`.
 * @returns The rendered Avatar image element.
 */
function AvatarImage({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Image>) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn("aspect-square size-full", className)}
      {...props}
    />
  )
}

/**
 * Avatar fallback content used when the image is unavailable.
 *
 * Renders a Radix `AvatarPrimitive.Fallback` with base fallback styles and any
 * additional `className` provided. Forwards all other props to the underlying
 * Radix primitive and sets `data-slot="avatar-fallback"`.
 *
 * @returns A JSX element containing the avatar fallback.
 */
function AvatarFallback({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Fallback>) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(
        "bg-muted flex size-full items-center justify-center rounded-full",
        className
      )}
      {...props}
    />
  )
}

export { Avatar, AvatarImage, AvatarFallback }
