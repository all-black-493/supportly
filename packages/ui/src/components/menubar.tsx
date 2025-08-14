"use client"

import * as React from "react"
import * as MenubarPrimitive from "@radix-ui/react-menubar"
import { CheckIcon, ChevronRightIcon, CircleIcon } from "lucide-react"

import { cn } from "@workspace/ui/lib/utils"

/**
 * Root menubar component — a styled wrapper around Radix's Menubar.Root.
 *
 * Renders a menubar root with standardized class names and `data-slot="menubar"`.
 * The `className` prop is merged with the component's default styles; all other props are forwarded to the underlying Radix Primitive.
 */
function Menubar({
  className,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Root>) {
  return (
    <MenubarPrimitive.Root
      data-slot="menubar"
      className={cn(
        "bg-background flex h-9 items-center gap-1 rounded-md border p-1 shadow-xs",
        className
      )}
      {...props}
    />
  )
}

/**
 * Wrapper around Radix's Menu primitive that injects a menubar slot attribute and forwards all props.
 *
 * Renders a MenubarPrimitive.Menu with `data-slot="menubar-menu"`. All received props are passed through
 * to the underlying Radix component (including children, className, event handlers, etc.).
 *
 * @returns The rendered Radix Menu element with the menubar-specific `data-slot` attribute.
 */
function MenubarMenu({
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Menu>) {
  return <MenubarPrimitive.Menu data-slot="menubar-menu" {...props} />
}

/**
 * A thin wrapper around Radix's Menubar Group that injects standardized attributes and forwards props.
 *
 * Renders a Menubar group using `@radix-ui/react-menubar` with `data-slot="menubar-group"` and passes all received props to the underlying primitive.
 */
function MenubarGroup({
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Group>) {
  return <MenubarPrimitive.Group data-slot="menubar-group" {...props} />
}

/**
 * Renders a Radix Menubar Portal with a standardized `data-slot`.
 *
 * Thin wrapper around `@radix-ui/react-menubar`'s `Portal` that injects
 * `data-slot="menubar-portal"` and forwards all props to the underlying portal.
 */
function MenubarPortal({
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Portal>) {
  return <MenubarPrimitive.Portal data-slot="menubar-portal" {...props} />
}

/**
 * A thin wrapper around Radix's RadioGroup that injects standardized slot attributes.
 *
 * Forwards all props to the underlying Radix RadioGroup and sets `data-slot="menubar-radio-group"`.
 *
 * @returns A React element rendering the menubar radio group.
 */
function MenubarRadioGroup({
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.RadioGroup>) {
  return (
    <MenubarPrimitive.RadioGroup data-slot="menubar-radio-group" {...props} />
  )
}

/**
 * A styled wrapper around Radix's Menubar Trigger.
 *
 * Renders a Menubar trigger element with standardized data-slot="menubar-trigger" and a
 * composed set of utility classes (merged with the `className` prop) that provide focus and
 * open-state styling. Forwards all other props to the underlying Radix Trigger.
 *
 * @returns A React element for use as a menubar trigger.
 */
function MenubarTrigger({
  className,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Trigger>) {
  return (
    <MenubarPrimitive.Trigger
      data-slot="menubar-trigger"
      className={cn(
        "focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground flex items-center rounded-sm px-2 py-1 text-sm font-medium outline-hidden select-none",
        className
      )}
      {...props}
    />
  )
}

/**
 * Renders the menubar floating content panel (wrapped in a portal) with standardized styling and animation.
 *
 * The component forwards all native Radix Content props to the underlying primitive but sets default alignment and offsets,
 * applies consistent className utilities for visuals and motion, and adds `data-slot="menubar-content"`.
 *
 * @param align - Content alignment relative to the trigger (defaults to `"start"`).
 * @param alignOffset - Pixel offset applied to the alignment (defaults to `-4`).
 * @param sideOffset - Pixel offset from the side of the trigger (defaults to `8`).
 * @returns The rendered Menubar content element (React element).
 */
function MenubarContent({
  className,
  align = "start",
  alignOffset = -4,
  sideOffset = 8,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Content>) {
  return (
    <MenubarPortal>
      <MenubarPrimitive.Content
        data-slot="menubar-content"
        align={align}
        alignOffset={alignOffset}
        sideOffset={sideOffset}
        className={cn(
          "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[12rem] origin-(--radix-menubar-content-transform-origin) overflow-hidden rounded-md border p-1 shadow-md",
          className
        )}
        {...props}
      />
    </MenubarPortal>
  )
}

/**
 * A styled wrapper around Radix's Menubar Item that injects standardized attributes and variant/inset semantics.
 *
 * Renders a menu item with data-slot="menubar-item" and attaches `data-inset` and `data-variant` attributes.
 * Applies consistent focus, disabled, and variant (default | destructive) styling while forwarding all other props
 * to the underlying Radix Primitive Item.
 *
 * @param inset - When true, applies inset spacing (adds left padding for icons/indicators).
 * @param variant - Visual variant of the item; `"default"` (normal) or `"destructive"` (emphasized destructive styling).
 * @returns A React element representing the styled menubar item.
 */
function MenubarItem({
  className,
  inset,
  variant = "default",
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Item> & {
  inset?: boolean
  variant?: "default" | "destructive"
}) {
  return (
    <MenubarPrimitive.Item
      data-slot="menubar-item"
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
 * Menu item that behaves like a checkbox inside the menubar.
 *
 * Renders a styled Radix CheckboxItem with a leading check indicator and forwards all native props to the underlying primitive.
 *
 * @param checked - Controls the checked state of the item.
 * @returns The rendered menubar checkbox item element.
 */
function MenubarCheckboxItem({
  className,
  children,
  checked,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.CheckboxItem>) {
  return (
    <MenubarPrimitive.CheckboxItem
      data-slot="menubar-checkbox-item"
      className={cn(
        "focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-xs py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      checked={checked}
      {...props}
    >
      <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
        <MenubarPrimitive.ItemIndicator>
          <CheckIcon className="size-4" />
        </MenubarPrimitive.ItemIndicator>
      </span>
      {children}
    </MenubarPrimitive.CheckboxItem>
  )
}

/**
 * Radio menu item for the Menubar that wraps Radix's RadioItem, applies standardized styling, and shows a circular selection indicator.
 *
 * Renders a Menubar radio item with `data-slot="menubar-radio-item"`, merges provided `className` with the component's base styles, and displays a circular `ItemIndicator` (CircleIcon) when selected.
 *
 * @param className - Optional additional class names merged with the component's base styles.
 * @param children - Node(s) shown as the item's content (typically the label).
 * @returns A React element representing the menubar radio item.
 */
function MenubarRadioItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.RadioItem>) {
  return (
    <MenubarPrimitive.RadioItem
      data-slot="menubar-radio-item"
      className={cn(
        "focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-xs py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
        <MenubarPrimitive.ItemIndicator>
          <CircleIcon className="size-2 fill-current" />
        </MenubarPrimitive.ItemIndicator>
      </span>
      {children}
    </MenubarPrimitive.RadioItem>
  )
}

/**
 * Label wrapper for menubar items that adds standardized slot attributes and optional inset styling.
 *
 * Renders a Radix `MenubarPrimitive.Label` with `data-slot="menubar-label"`. If `inset` is true,
 * `data-inset` is set and an increased left padding class is applied to align with inset menu items.
 * All other props are forwarded to the underlying Radix Label.
 *
 * @param inset - When true, marks the label as inset and applies left padding (`pl-8`).
 */
function MenubarLabel({
  className,
  inset,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Label> & {
  inset?: boolean
}) {
  return (
    <MenubarPrimitive.Label
      data-slot="menubar-label"
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
 * A styled wrapper around Radix's Menubar Separator.
 *
 * Renders a hairline separator with standardized spacing and border styling, injects
 * `data-slot="menubar-separator"`, and forwards all props to the underlying
 * `MenubarPrimitive.Separator`.
 *
 * @remarks
 * - Merges any provided `className` with the component's base classes.
 */
function MenubarSeparator({
  className,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Separator>) {
  return (
    <MenubarPrimitive.Separator
      data-slot="menubar-separator"
      className={cn("bg-border -mx-1 my-1 h-px", className)}
      {...props}
    />
  )
}

/**
 * Renders a right-aligned keyboard shortcut label for a menubar item.
 *
 * @param className - Additional class names to merge with the component's base styles.
 * @param props - All other `span` props are forwarded to the underlying element.
 * @returns The rendered shortcut `<span>` element with menubar-specific styling and `data-slot="menubar-shortcut"`.
 */
function MenubarShortcut({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="menubar-shortcut"
      className={cn(
        "text-muted-foreground ml-auto text-xs tracking-widest",
        className
      )}
      {...props}
    />
  )
}

/**
 * Wrapper around Radix UI's `MenubarPrimitive.Sub` that injects a standardized `data-slot` attribute.
 *
 * Forwards all received props to the underlying Radix `Sub` component and sets `data-slot="menubar-sub"`
 * so downstream styles and automation can target the sub-menu container.
 */
function MenubarSub({
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Sub>) {
  return <MenubarPrimitive.Sub data-slot="menubar-sub" {...props} />
}

/**
 * Submenu trigger for the Menubar that displays a trailing chevron.
 *
 * Renders the underlying Radix `SubTrigger` with `data-slot="menubar-sub-trigger"`, forwards all other props, and appends a right-pointing chevron icon to indicate a nested submenu. When `inset` is true the trigger is marked as inset to apply additional left padding.
 *
 * @param inset - If true, mark the trigger as inset (adds left padding via a data attribute).
 * @returns The rendered Menubar sub-trigger element.
 */
function MenubarSubTrigger({
  className,
  inset,
  children,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.SubTrigger> & {
  inset?: boolean
}) {
  return (
    <MenubarPrimitive.SubTrigger
      data-slot="menubar-sub-trigger"
      data-inset={inset}
      className={cn(
        "focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground flex cursor-default items-center rounded-sm px-2 py-1.5 text-sm outline-none select-none data-[inset]:pl-8",
        className
      )}
      {...props}
    >
      {children}
      <ChevronRightIcon className="ml-auto h-4 w-4" />
    </MenubarPrimitive.SubTrigger>
  )
}

/**
 * Submenu content wrapper for menubar submenus.
 *
 * Renders Radix's SubContent with standardized data-slot ("menubar-sub-content"), a set of default
 * layout/visual/animation classes for nested submenu panels, and forwards all props to the underlying
 * primitive. Any `className` passed in will be merged with the component's default classes.
 *
 * @returns A React element that renders the styled submenu content container.
 */
function MenubarSubContent({
  className,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.SubContent>) {
  return (
    <MenubarPrimitive.SubContent
      data-slot="menubar-sub-content"
      className={cn(
        "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[8rem] origin-(--radix-menubar-content-transform-origin) overflow-hidden rounded-md border p-1 shadow-lg",
        className
      )}
      {...props}
    />
  )
}

export {
  Menubar,
  MenubarPortal,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarGroup,
  MenubarSeparator,
  MenubarLabel,
  MenubarItem,
  MenubarShortcut,
  MenubarCheckboxItem,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSub,
  MenubarSubTrigger,
  MenubarSubContent,
}
