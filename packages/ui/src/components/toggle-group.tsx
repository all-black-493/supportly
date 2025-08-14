"use client"

import * as React from "react"
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group"
import { type VariantProps } from "class-variance-authority"

import { cn } from "@workspace/ui/lib/utils"
import { toggleVariants } from "@workspace/ui/components/toggle"

const ToggleGroupContext = React.createContext<
  VariantProps<typeof toggleVariants>
>({
  size: "default",
  variant: "default",
})

/**
 * Wraps the Radix ToggleGroup Root, applies base group styling, and provides variant/size to descendants.
 *
 * Renders a ToggleGroup root with data-slot="toggle-group" and sets `data-variant`/`data-size`.
 * Supplies { variant, size } to ToggleGroupContext so ToggleGroupItem components can inherit those values.
 *
 * @param variant - Visual variant to apply to the group and propagate to items.
 * @param size - Size token to apply to the group and propagate to items.
 */
function ToggleGroup({
  className,
  variant,
  size,
  children,
  ...props
}: React.ComponentProps<typeof ToggleGroupPrimitive.Root> &
  VariantProps<typeof toggleVariants>) {
  return (
    <ToggleGroupPrimitive.Root
      data-slot="toggle-group"
      data-variant={variant}
      data-size={size}
      className={cn(
        "group/toggle-group flex w-fit items-center rounded-md data-[variant=outline]:shadow-xs",
        className
      )}
      {...props}
    >
      <ToggleGroupContext.Provider value={{ variant, size }}>
        {children}
      </ToggleGroupContext.Provider>
    </ToggleGroupPrimitive.Root>
  )
}

/**
 * A toggle group item — a single selectable button inside a ToggleGroup.
 *
 * Renders a Radix ToggleGroup Item and applies styling and attributes for the current `variant` and `size`. If the surrounding ToggleGroup provides `variant`/`size` via context, those values take precedence over the `variant`/`size` props passed to this component. Additional props are forwarded to the underlying Radix item and `className` is merged with the component's computed styles.
 *
 * @param className - Additional class names to append to the computed item classes.
 * @param children - Content rendered inside the toggle item.
 * @param variant - Visual variant for this item; overridden by group context when present.
 * @param size - Size token for this item; overridden by group context when present.
 * @returns A JSX element rendering a styled ToggleGroup item.
 */
function ToggleGroupItem({
  className,
  children,
  variant,
  size,
  ...props
}: React.ComponentProps<typeof ToggleGroupPrimitive.Item> &
  VariantProps<typeof toggleVariants>) {
  const context = React.useContext(ToggleGroupContext)

  return (
    <ToggleGroupPrimitive.Item
      data-slot="toggle-group-item"
      data-variant={context.variant || variant}
      data-size={context.size || size}
      className={cn(
        toggleVariants({
          variant: context.variant || variant,
          size: context.size || size,
        }),
        "min-w-0 flex-1 shrink-0 rounded-none shadow-none first:rounded-l-md last:rounded-r-md focus:z-10 focus-visible:z-10 data-[variant=outline]:border-l-0 data-[variant=outline]:first:border-l",
        className
      )}
      {...props}
    >
      {children}
    </ToggleGroupPrimitive.Item>
  )
}

export { ToggleGroup, ToggleGroupItem }
