"use client"

import * as React from "react"
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu"
import { CheckIcon, ChevronRightIcon, CircleIcon } from "lucide-react"

import { cn } from "@workspace/ui/lib/utils"

/**
 * Renders a DropdownMenu root wrapper.
 *
 * A thin wrapper around Radix UI's `DropdownMenuPrimitive.Root` that forwards all props
 * and adds a `data-slot="dropdown-menu"` attribute for slotting/testing.
 *
 * @returns The Radix `DropdownMenuPrimitive.Root` element with the `data-slot` attribute applied.
 */
function DropdownMenu({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Root>) {
  return <DropdownMenuPrimitive.Root data-slot="dropdown-menu" {...props} />
}

/**
 * Renders a Radix DropdownMenu portal and adds a `data-slot="dropdown-menu-portal"` attribute.
 *
 * Passes all received props through to `DropdownMenuPrimitive.Portal`.
 */
function DropdownMenuPortal({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Portal>) {
  return (
    <DropdownMenuPrimitive.Portal data-slot="dropdown-menu-portal" {...props} />
  )
}

/**
 * Renders a DropdownMenu trigger element.
 *
 * Wrapper around Radix's `DropdownMenuPrimitive.Trigger` that forwards all props
 * and adds `data-slot="dropdown-menu-trigger"` for slotting and testing.
 */
function DropdownMenuTrigger({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Trigger>) {
  return (
    <DropdownMenuPrimitive.Trigger
      data-slot="dropdown-menu-trigger"
      {...props}
    />
  )
}

/**
 * Renders the dropdown menu content inside a Portal with consistent styling and slot metadata.
 *
 * Applies a large set of default classes for layout, animations, sizing, and positioning, merges any
 * provided `className`, and sets a `data-slot="dropdown-menu-content"` attribute.
 *
 * @param className - Additional class names to merge with the component's default styles.
 * @param sideOffset - Distance (in pixels) between the trigger and the content; defaults to `4`.
 * @returns A JSX element for the dropdown menu content rendered inside a Portal.
 */
function DropdownMenuContent({
  className,
  sideOffset = 4,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Content>) {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        data-slot="dropdown-menu-content"
        sideOffset={sideOffset}
        className={cn(
          "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 max-h-(--radix-dropdown-menu-content-available-height) min-w-[8rem] origin-(--radix-dropdown-menu-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border p-1 shadow-md",
          className
        )}
        {...props}
      />
    </DropdownMenuPrimitive.Portal>
  )
}

/**
 * Renders a grouped section inside a dropdown menu.
 *
 * This is a thin wrapper around `DropdownMenuPrimitive.Group` that forwards all props
 * and attaches a `data-slot="dropdown-menu-group"` attribute for consistent slotting/testing.
 *
 * @returns The rendered dropdown menu group element.
 */
function DropdownMenuGroup({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Group>) {
  return (
    <DropdownMenuPrimitive.Group data-slot="dropdown-menu-group" {...props} />
  )
}

/**
 * A styled wrapper around Radix's DropdownMenuPrimitive.Item for use in the app's dropdowns.
 *
 * Renders an item with standardized spacing, accessibility hooks, and variant/inset styling. Adds
 * data attributes (`data-slot="dropdown-menu-item"`, `data-inset`, `data-variant`) for slotting and styling hooks,
 * and forwards all other props to the underlying Radix primitive.
 *
 * @param inset - When true, applies inset layout (extra left padding) intended for items with an icon/indicator.
 * @param variant - Visual variant of the item. `"destructive"` applies destructive-focused/text styles; `"default"` uses the normal styling.
 * @returns The rendered DropdownMenu item element.
 */
function DropdownMenuItem({
  className,
  inset,
  variant = "default",
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Item> & {
  inset?: boolean
  variant?: "default" | "destructive"
}) {
  return (
    <DropdownMenuPrimitive.Item
      data-slot="dropdown-menu-item"
      data-inset={inset}
      data-variant={variant}
      className={cn(
        "focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:!text-destructive [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    />
  )
}

/**
 * A styled Checkbox item for use inside the dropdown menu that shows a check indicator when selected.
 *
 * Renders a Radix CheckboxItem with a built-in left-aligned ItemIndicator (CheckIcon), merges incoming
 * className with the component's default styling, and forwards all other props to the underlying primitive.
 * Adds a `data-slot="dropdown-menu-checkbox-item"` attribute for slotting/testing.
 *
 * @returns The dropdown checkbox menu item as a React element.
 */
function DropdownMenuCheckboxItem({
  className,
  children,
  checked,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.CheckboxItem>) {
  return (
    <DropdownMenuPrimitive.CheckboxItem
      data-slot="dropdown-menu-checkbox-item"
      className={cn(
        "focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      checked={checked}
      {...props}
    >
      <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
        <DropdownMenuPrimitive.ItemIndicator>
          <CheckIcon className="size-4" />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.CheckboxItem>
  )
}

/**
 * Wrapper around Radix UI's DropdownMenu RadioGroup that adds a slot attribute.
 *
 * Renders a RadioGroup and forwards all props to the underlying Radix primitive.
 * Adds `data-slot="dropdown-menu-radio-group"` for consistent slotting/testing.
 *
 * @returns The rendered RadioGroup element.
 */
function DropdownMenuRadioGroup({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.RadioGroup>) {
  return (
    <DropdownMenuPrimitive.RadioGroup
      data-slot="dropdown-menu-radio-group"
      {...props}
    />
  )
}

/**
 * A styled wrapper around Radix's `RadioItem` that renders a selectable radio menu item with a left-positioned radio indicator.
 *
 * Renders an item indicator (a filled circle) positioned at the left and forwards all other props to `DropdownMenuPrimitive.RadioItem`.
 *
 * @param className - Additional class names to merge with the component's default styling.
 * @param children - Content to display for the item's label (rendered to the right of the indicator).
 * @returns A `DropdownMenuPrimitive.RadioItem` element with consistent styling and a left radio indicator.
 */
function DropdownMenuRadioItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.RadioItem>) {
  return (
    <DropdownMenuPrimitive.RadioItem
      data-slot="dropdown-menu-radio-item"
      className={cn(
        "focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
        <DropdownMenuPrimitive.ItemIndicator>
          <CircleIcon className="size-2 fill-current" />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.RadioItem>
  )
}

/**
 * Label component for dropdown menus with optional inset spacing.
 *
 * Renders a Radix DropdownMenu Label with a `data-slot="dropdown-menu-label"` and consistent typography/spacing.
 * When `inset` is true, additional left padding is applied to align the label with inset menu items or indicators.
 *
 * @param inset - If true, applies inset left padding to the label.
 */
function DropdownMenuLabel({
  className,
  inset,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Label> & {
  inset?: boolean
}) {
  return (
    <DropdownMenuPrimitive.Label
      data-slot="dropdown-menu-label"
      data-inset={inset}
      className={cn(
        "px-2 py-1.5 text-sm font-medium data-[inset]:pl-8",
        className
      )}
      {...props}
    />
  )
}

/**
 * Separator used inside the dropdown menu.
 *
 * Renders a Radix DropdownMenu Separator with a `data-slot="dropdown-menu-separator"` attribute
 * and default horizontal divider styles. Any `className` passed in is merged with the defaults
 * to allow customization; all other props are forwarded to the underlying Radix primitive.
 */
function DropdownMenuSeparator({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Separator>) {
  return (
    <DropdownMenuPrimitive.Separator
      data-slot="dropdown-menu-separator"
      className={cn("bg-border -mx-1 my-1 h-px", className)}
      {...props}
    />
  )
}

/**
 * Renders a right-aligned shortcut text element for dropdown menu items.
 *
 * Produces a <span> with `data-slot="dropdown-menu-shortcut"` and default
 * styling that aligns and styles keyboard shortcut text; any `className`
 * passed is merged with the defaults.
 *
 * @param className - Additional class names to merge with the default styles.
 * @returns The rendered shortcut <span> element.
 */
function DropdownMenuShortcut({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="dropdown-menu-shortcut"
      className={cn(
        "text-muted-foreground ml-auto text-xs tracking-widest",
        className
      )}
      {...props}
    />
  )
}

/**
 * Wrapper around Radix UI's DropdownMenu Sub primitive.
 *
 * Renders a submenu container by forwarding all props to `DropdownMenuPrimitive.Sub`
 * and adds a `data-slot="dropdown-menu-sub"` attribute for slotting/testing.
 */
function DropdownMenuSub({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Sub>) {
  return <DropdownMenuPrimitive.Sub data-slot="dropdown-menu-sub" {...props} />
}

function DropdownMenuSubTrigger({
  className,
  inset,
  children,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.SubTrigger> & {
  inset?: boolean
}) {
  return (
    <DropdownMenuPrimitive.SubTrigger
      data-slot="dropdown-menu-sub-trigger"
      data-inset={inset}
      className={cn(
        "focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground flex cursor-default items-center rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[inset]:pl-8",
        className
      )}
      {...props}
    >
      {children}
      <ChevronRightIcon className="ml-auto size-4" />
    </DropdownMenuPrimitive.SubTrigger>
  )
}

/**
 * Submenu content container that wraps Radix's SubContent with consistent styling and slot metadata.
 *
 * Renders a DropdownMenuPrimitive.SubContent element, adds `data-slot="dropdown-menu-sub-content"`,
 * composes a large set of default classes for layout, appearance, and open/close animations, and forwards
 * all other props to the underlying Radix primitive.
 *
 * @returns The rendered submenu content element.
 */
function DropdownMenuSubContent({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.SubContent>) {
  return (
    <DropdownMenuPrimitive.SubContent
      data-slot="dropdown-menu-sub-content"
      className={cn(
        "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[8rem] origin-(--radix-dropdown-menu-content-transform-origin) overflow-hidden rounded-md border p-1 shadow-lg",
        className
      )}
      {...props}
    />
  )
}

export {
  DropdownMenu,
  DropdownMenuPortal,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
}
