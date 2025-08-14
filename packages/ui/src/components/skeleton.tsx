import { cn } from "@workspace/ui/lib/utils"

/**
 * Skeleton placeholder element that renders an animated, rounded box.
 *
 * Renders a div with default classes "bg-accent animate-pulse rounded-md" and merges any provided `className`. Accepts all standard div props which are forwarded to the underlying element.
 *
 * @param className - Additional CSS classes to apply (merged with defaults).
 */
function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("bg-accent animate-pulse rounded-md", className)}
      {...props}
    />
  )
}

export { Skeleton }
