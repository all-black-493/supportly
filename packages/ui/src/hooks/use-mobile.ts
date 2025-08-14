import * as React from "react"

const MOBILE_BREAKPOINT = 768

/**
 * React hook that reports whether the current viewport is considered mobile (< 768px).
 *
 * Subscribes to a media-query listener on mount and updates when the viewport crosses the
 * mobile breakpoint. The hook returns `false` on the initial render (state is initialized
 * asynchronously) and then reflects whether `window.innerWidth < MOBILE_BREAKPOINT`.
 *
 * @returns `true` if the viewport width is less than `MOBILE_BREAKPOINT` (768px); otherwise `false`.
 */
export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    mql.addEventListener("change", onChange)
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return !!isMobile
}
