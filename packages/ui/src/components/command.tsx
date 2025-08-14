"use client"

import * as React from "react"
import { Command as CommandPrimitive } from "cmdk"
import { SearchIcon } from "lucide-react"

import { cn } from "@workspace/ui/lib/utils"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@workspace/ui/components/dialog"

/**
 * Lightweight wrapper around Cmdk's CommandPrimitive that applies consistent base styling and sets `data-slot="command"`.
 *
 * Passes all received props to the underlying primitive. Use the `className` prop to extend or override the default styles.
 */
function Command({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive>) {
  return (
    <CommandPrimitive
      data-slot="command"
      className={cn(
        "bg-popover text-popover-foreground flex h-full w-full flex-col overflow-hidden rounded-md",
        className
      )}
      {...props}
    />
  )
}

/**
 * Dialog-hosted command palette wrapper that renders a Cmdk `Command` inside a `Dialog`.
 *
 * Renders an accessible dialog with a visually hidden header (title and description) and a
 * DialogContent that contains the Command palette. Use `children` to provide Command primitives
 * (Input, List, Item, etc.). Defaults: title `"Command Palette"`, description `"Search for a command to run..."`,
 * and `showCloseButton` true.
 *
 * @param title - Visible title text used in the screen-reader-only dialog header.
 * @param description - Visible description text used in the screen-reader-only dialog header.
 * @param className - Additional class names applied to the DialogContent container.
 * @param showCloseButton - Whether the DialogContent should render a close button.
 * @returns A React element representing the command palette dialog.
 */
function CommandDialog({
  title = "Command Palette",
  description = "Search for a command to run...",
  children,
  className,
  showCloseButton = true,
  ...props
}: React.ComponentProps<typeof Dialog> & {
  title?: string
  description?: string
  className?: string
  showCloseButton?: boolean
}) {
  return (
    <Dialog {...props}>
      <DialogHeader className="sr-only">
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
      </DialogHeader>
      <DialogContent
        className={cn("overflow-hidden p-0", className)}
        showCloseButton={showCloseButton}
      >
        <Command className="[&_[cmdk-group-heading]]:text-muted-foreground **:data-[slot=command-input-wrapper]:h-12 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group]]:px-2 [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5">
          {children}
        </Command>
      </DialogContent>
    </Dialog>
  )
}

/**
 * Renders the command palette search input with a leading search icon.
 *
 * Renders a wrapper div (data-slot="command-input-wrapper") containing a SearchIcon
 * and a Cmdk `CommandPrimitive.Input` (data-slot="command-input"). Any props passed
 * to this component are forwarded to the underlying `CommandPrimitive.Input`.
 *
 * @param className - Optional additional class names appended to the input's base styling.
 */
function CommandInput({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Input>) {
  return (
    <div
      data-slot="command-input-wrapper"
      className="flex h-9 items-center gap-2 border-b px-3"
    >
      <SearchIcon className="size-4 shrink-0 opacity-50" />
      <CommandPrimitive.Input
        data-slot="command-input"
        className={cn(
          "placeholder:text-muted-foreground flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-hidden disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        {...props}
      />
    </div>
  )
}

/**
 * Scrollable container for command palette items.
 *
 * Renders a Cmdk `CommandPrimitive.List` with sensible max-height and overflow styles.
 *
 * @param className - Additional class names appended to the component's base styling.
 */
function CommandList({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.List>) {
  return (
    <CommandPrimitive.List
      data-slot="command-list"
      className={cn(
        "max-h-[300px] scroll-py-1 overflow-x-hidden overflow-y-auto",
        className
      )}
      {...props}
    />
  )
}

/**
 * Renders the empty-state row shown when no command matches the current query.
 *
 * This is a thin wrapper around `CommandPrimitive.Empty` that applies a consistent
 * data-slot (`command-empty`) and default styling (`py-6 text-center text-sm`).
 * All other props are forwarded to the underlying Cmdk primitive.
 */
function CommandEmpty({
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Empty>) {
  return (
    <CommandPrimitive.Empty
      data-slot="command-empty"
      className="py-6 text-center text-sm"
      {...props}
    />
  )
}

/**
 * Groups related command items within the command palette.
 *
 * Renders a Cmdk `Group` with a `data-slot="command-group"` attribute and
 * default styling for group layout and headings. Any provided `className`
 * is merged with the component's base styles and all other props are
 * forwarded to the underlying `CommandPrimitive.Group`.
 */
function CommandGroup({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Group>) {
  return (
    <CommandPrimitive.Group
      data-slot="command-group"
      className={cn(
        "text-foreground [&_[cmdk-group-heading]]:text-muted-foreground overflow-hidden p-1 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium",
        className
      )}
      {...props}
    />
  )
}

/**
 * Visual separator used inside the command palette.
 *
 * Renders Cmdk's Separator with a consistent baseline styling and `data-slot="command-separator"`.
 * Any `className` passed will be merged with the default compact border styling.
 *
 * @public
 */
function CommandSeparator({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Separator>) {
  return (
    <CommandPrimitive.Separator
      data-slot="command-separator"
      className={cn("bg-border -mx-1 h-px", className)}
      {...props}
    />
  )
}

/**
 * Render a styled Cmdk command item with consistent data-slot and state-aware classes.
 *
 * This component wraps `CommandPrimitive.Item`, applies a standardized set of utility
 * classes (selected/disabled styles, SVG sizing/behavior, layout/padding) and sets
 * `data-slot="command-item"`. All received props are forwarded to the underlying
 * Cmdk primitive so it can be used like a normal command item.
 */
function CommandItem({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Item>) {
  return (
    <CommandPrimitive.Item
      data-slot="command-item"
      className={cn(
        "data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    />
  )
}

/**
 * Renders an inline keyboard shortcut label for a command item.
 *
 * The component outputs a `span` with `data-slot="command-shortcut"` and
 * styling suitable for compact, right-aligned shortcut text (small size,
 * wide tracking, muted foreground). Pass through standard `span` props
 * (including `className`) to customize or extend behavior.
 *
 * @returns A React element representing the shortcut label.
 */
function CommandShortcut({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="command-shortcut"
      className={cn(
        "text-muted-foreground ml-auto text-xs tracking-widest",
        className
      )}
      {...props}
    />
  )
}

export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
}
