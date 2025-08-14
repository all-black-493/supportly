"use client"

import * as React from "react"
import * as ContextMenuPrimitive from "@radix-ui/react-context-menu"
import { CheckIcon, ChevronRightIcon, CircleIcon } from "lucide-react"

import { cn } from "@workspace/ui/lib/utils"

/**
 * Root container for a context menu that wraps Radix's ContextMenuPrimitive.Root.
 *
 * Forwards all props to the underlying Radix primitive and sets a `data-slot` of `"context-menu"`.
 */
function ContextMenu({
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Root>) {
  return <ContextMenuPrimitive.Root data-slot="context-menu" {...props} />
}

/**
 * Trigger element for the context menu.
 *
 * Forwards all props to Radix's ContextMenuPrimitive.Trigger and adds `data-slot="context-menu-trigger"`
 * for styling and test hooks.
 */
function ContextMenuTrigger({
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Trigger>) {
  return (
    <ContextMenuPrimitive.Trigger data-slot="context-menu-trigger" {...props} />
  )
}

/**
 * Wrapper around Radix UI's ContextMenu Group primitive.
 *
 * Renders a ContextMenuPrimitive.Group with a data-slot of "context-menu-group"
 * and forwards all received props.
 *
 * @returns A JSX element representing the context menu group.
 */
function ContextMenuGroup({
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Group>) {
  return (
    <ContextMenuPrimitive.Group data-slot="context-menu-group" {...props} />
  )
}

/**
 * Wrapper around Radix's ContextMenu Portal that forwards all props and sets `data-slot="context-menu-portal"`.
 *
 * Useful for rendering context-menu content into a portal while providing a consistent data-slot hook.
 */
function ContextMenuPortal({
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Portal>) {
  return (
    <ContextMenuPrimitive.Portal data-slot="context-menu-portal" {...props} />
  )
}

/**
 * Wrapper around Radix's ContextMenuPrimitive.Sub that forwards all props.
 *
 * Renders a Sub menu primitive with a `data-slot="context-menu-sub"` attribute so callers can target or style submenus; all other props are passed through to the underlying Radix component.
 */
function ContextMenuSub({
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Sub>) {
  return <ContextMenuPrimitive.Sub data-slot="context-menu-sub" {...props} />
}

/**
 * Wraps Radix's ContextMenu RadioGroup and forwards all props.
 *
 * Renders a ContextMenuPrimitive.RadioGroup with `data-slot="context-menu-radio-group"`,
 * allowing consumers to pass through any RadioGroup props.
 */
function ContextMenuRadioGroup({
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.RadioGroup>) {
  return (
    <ContextMenuPrimitive.RadioGroup
      data-slot="context-menu-radio-group"
      {...props}
    />
  )
}

/**
 * A styled wrapper around Radix's SubTrigger used to open a submenu.
 *
 * Renders a submenu trigger element with a trailing chevron icon. Forwards all other props to
 * ContextMenuPrimitive.SubTrigger and adds a `data-slot="context-menu-sub-trigger"` attribute.
 *
 * @param inset - When true, applies inset spacing (used for alignment with leading icons/indicators).
 * @returns The submenu trigger element (JSX.Element).
 */
function ContextMenuSubTrigger({
  className,
  inset,
  children,
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.SubTrigger> & {
  inset?: boolean
}) {
  return (
    <ContextMenuPrimitive.SubTrigger
      data-slot="context-menu-sub-trigger"
      data-inset={inset}
      className={cn(
        "focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground flex cursor-default items-center rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      {children}
      <ChevronRightIcon className="ml-auto" />
    </ContextMenuPrimitive.SubTrigger>
  )
}

/**
 * Wrapper around Radix's SubContent that applies library default styling, animations, and a `data-slot`.
 *
 * Merges the provided `className` with the component's default styles (positioning, sizing, animations,
 * border, padding, and shadow) and forwards all other props to `ContextMenuPrimitive.SubContent`.
 *
 * @param className - Additional CSS classes to append to the component's default class list.
 * @returns A `ContextMenuPrimitive.SubContent` element with the library's contextual menu subcontent styling.
 */
function ContextMenuSubContent({
  className,
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.SubContent>) {
  return (
    <ContextMenuPrimitive.SubContent
      data-slot="context-menu-sub-content"
      className={cn(
        "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[8rem] origin-(--radix-context-menu-content-transform-origin) overflow-hidden rounded-md border p-1 shadow-lg",
        className
      )}
      {...props}
    />
  )
}

/**
 * Context menu content wrapped in a Portal with default styling and animations.
 *
 * Renders Radix's ContextMenuPrimitive.Content inside a Portal, applies a
 * data-slot="context-menu-content" attribute, and merges the provided
 * `className` with the component's default layout, animation, and positioning
 * styles. All other props are forwarded to the underlying Radix primitive.
 *
 * @param className - Optional additional CSS class names to append to the default styles.
 * @returns The rendered context menu content element.
 */
function ContextMenuContent({
  className,
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Content>) {
  return (
    <ContextMenuPrimitive.Portal>
      <ContextMenuPrimitive.Content
        data-slot="context-menu-content"
        className={cn(
          "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 max-h-(--radix-context-menu-content-available-height) min-w-[8rem] origin-(--radix-context-menu-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border p-1 shadow-md",
          className
        )}
        {...props}
      />
    </ContextMenuPrimitive.Portal>
  )
}

/**
 * A styled wrapper around Radix's ContextMenu Item with preset data attributes and variants.
 *
 * Renders a context menu item element that forwards all native Item props and applies
 * composed class names for spacing, focus/disabled states, icon sizing, and variant styles.
 *
 * @param inset - When true, applies inset spacing for leading icons/indicators (adds left padding).
 * @param variant - Visual variant of the item. `"default"` applies normal styling; `"destructive"` applies destructive color styles.
 * @returns A JSX element rendering a ContextMenu item.
 */
function ContextMenuItem({
  className,
  inset,
  variant = "default",
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Item> & {
  inset?: boolean
  variant?: "default" | "destructive"
}) {
  return (
    <ContextMenuPrimitive.Item
      data-slot="context-menu-item"
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
 * Context menu checkbox item that displays a check indicator when selected.
 *
 * Renders a Radix CheckboxItem with an inline check icon indicator and forwards all native props to the underlying primitive.
 *
 * @param checked - Controlled checked state passed to the underlying CheckboxItem.
 * @returns A JSX element representing the context menu checkbox item.
 */
function ContextMenuCheckboxItem({
  className,
  children,
  checked,
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.CheckboxItem>) {
  return (
    <ContextMenuPrimitive.CheckboxItem
      data-slot="context-menu-checkbox-item"
      className={cn(
        "focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      checked={checked}
      {...props}
    >
      <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
        <ContextMenuPrimitive.ItemIndicator>
          <CheckIcon className="size-4" />
        </ContextMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </ContextMenuPrimitive.CheckboxItem>
  )
}

/**
 * Radio menu item for the context menu that displays a left-aligned circular selection indicator.
 *
 * Accepts the same props as Radix's `ContextMenuPrimitive.RadioItem`. `className` can be used to extend or override the default styles; `children` is rendered as the item content. All other props are forwarded to the underlying Radix primitive.
 *
 * @returns A JSX element rendering a styled context menu radio item with a circular `ItemIndicator`.
 */
function ContextMenuRadioItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.RadioItem>) {
  return (
    <ContextMenuPrimitive.RadioItem
      data-slot="context-menu-radio-item"
      className={cn(
        "focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
        <ContextMenuPrimitive.ItemIndicator>
          <CircleIcon className="size-2 fill-current" />
        </ContextMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </ContextMenuPrimitive.RadioItem>
  )
}

/**
 * A styled wrapper for Radix's Context Menu Label.
 *
 * Renders a ContextMenuPrimitive.Label with a data-slot of "context-menu-label", merges utility and
 * custom class names, forwards all other props, and optionally applies inset padding for aligned content.
 *
 * @param inset - If true, applies left inset spacing (used to align labels with items that have leading indicators).
 * @returns The rendered ContextMenuPrimitive.Label element.
 */
function ContextMenuLabel({
  className,
  inset,
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Label> & {
  inset?: boolean
}) {
  return (
    <ContextMenuPrimitive.Label
      data-slot="context-menu-label"
      data-inset={inset}
      className={cn(
        "text-foreground px-2 py-1.5 text-sm font-medium data-[inset]:pl-8",
        className
      )}
      {...props}
    />
  )
}

/**
 * Horizontal separator used inside the context menu.
 *
 * Renders a Radix `ContextMenuPrimitive.Separator` with a `data-slot="context-menu-separator"`
 * and default styling. Additional CSS classes can be provided via `className`; all other props
 * are forwarded to the underlying Radix primitive.
 *
 * @param className - Optional additional CSS class names to merge with the component's default styles.
 * @returns A JSX element representing the menu separator.
 */
function ContextMenuSeparator({
  className,
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Separator>) {
  return (
    <ContextMenuPrimitive.Separator
      data-slot="context-menu-separator"
      className={cn("bg-border -mx-1 my-1 h-px", className)}
      {...props}
    />
  )
}

/**
 * Renders a right-aligned shortcut label for a context menu item.
 *
 * This component outputs a <span> styled for small, muted, uppercase shortcut text
 * (e.g., keyboard hints) and forwards all native span props to the underlying element.
 *
 * @returns A JSX element (`<span>`) containing the shortcut text. */
function ContextMenuShortcut({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="context-menu-shortcut"
      className={cn(
        "text-muted-foreground ml-auto text-xs tracking-widest",
        className
      )}
      {...props}
    />
  )
}

export {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuRadioItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuGroup,
  ContextMenuPortal,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuRadioGroup,
}
