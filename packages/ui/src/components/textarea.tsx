import * as React from "react"

import { cn } from "@workspace/ui/lib/utils"

/**
 * A styled wrapper around the native HTML `<textarea>` that applies the project's default input styles.
 *
 * This component accepts all standard `<textarea>` props (via `React.ComponentProps<'textarea'>`) and forwards them
 * to the underlying element. It merges the provided `className` with the component's default Tailwind-based classes
 * and sets `data-slot="textarea"`.
 *
 * @param className - Additional CSS class names to merge with the component's default classes.
 * @param props - All other standard `<textarea>` props which are forwarded to the underlying element.
 * @returns A JSX `<textarea>` element with the component's styling and forwarded props.
 */
function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
