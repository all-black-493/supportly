"use client"

import * as React from "react"
import { GripVerticalIcon } from "lucide-react"
import * as ResizablePrimitive from "react-resizable-panels"

import { cn } from "@workspace/ui/lib/utils"

/**
 * Wrapper around ResizablePrimitive.PanelGroup that applies default layout classes and a data-slot.
 *
 * Renders a PanelGroup with default flex layout (column when `data-[panel-group-direction=vertical]`),
 * sets `data-slot="resizable-panel-group"`, merges `className` with the defaults, and forwards all other props to the underlying primitive.
 */
function ResizablePanelGroup({
  className,
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.PanelGroup>) {
  return (
    <ResizablePrimitive.PanelGroup
      data-slot="resizable-panel-group"
      className={cn(
        "flex h-full w-full data-[panel-group-direction=vertical]:flex-col",
        className
      )}
      {...props}
    />
  )
}

/**
 * Wrapper around `ResizablePrimitive.Panel` that forwards all props and sets `data-slot="resizable-panel"`.
 *
 * Renders a resizable panel element from the underlying primitives; all received props are passed through to `ResizablePrimitive.Panel`.
 *
 * @returns The rendered `ResizablePrimitive.Panel` React element.
 */
function ResizablePanel({
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.Panel>) {
  return <ResizablePrimitive.Panel data-slot="resizable-panel" {...props} />
}

/**
 * Resize handle wrapper for resizable panels, optionally rendering a visual grip.
 *
 * Renders a PanelResizeHandle with a data-slot of "resizable-handle", merges default
 * orientation-aware styling with any provided `className`, and forwards all other props
 * to the underlying primitive. When `withHandle` is true, an inline grip icon is rendered
 * inside a small bordered container to provide an explicit drag affordance.
 *
 * @param withHandle - If true, show the inner grip icon; otherwise render only the handle wrapper.
 */
function ResizableHandle({
  withHandle,
  className,
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.PanelResizeHandle> & {
  withHandle?: boolean
}) {
  return (
    <ResizablePrimitive.PanelResizeHandle
      data-slot="resizable-handle"
      className={cn(
        "bg-border focus-visible:ring-ring relative flex w-px items-center justify-center after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:ring-1 focus-visible:ring-offset-1 focus-visible:outline-hidden data-[panel-group-direction=vertical]:h-px data-[panel-group-direction=vertical]:w-full data-[panel-group-direction=vertical]:after:left-0 data-[panel-group-direction=vertical]:after:h-1 data-[panel-group-direction=vertical]:after:w-full data-[panel-group-direction=vertical]:after:translate-x-0 data-[panel-group-direction=vertical]:after:-translate-y-1/2 [&[data-panel-group-direction=vertical]>div]:rotate-90",
        className
      )}
      {...props}
    >
      {withHandle && (
        <div className="bg-border z-10 flex h-4 w-3 items-center justify-center rounded-xs border">
          <GripVerticalIcon className="size-2.5" />
        </div>
      )}
    </ResizablePrimitive.PanelResizeHandle>
  )
}

export { ResizablePanelGroup, ResizablePanel, ResizableHandle }
