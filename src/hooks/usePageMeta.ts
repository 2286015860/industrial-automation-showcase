import { useEffect, type RefObject } from 'react'

export function usePageMeta(
  title: string,
  headingRef: RefObject<HTMLHeadingElement | null>,
  focusDelayMs = 0,
) {
  useEffect(() => {
    document.title = `${title} — 工业自动化能力图谱`

    const focusTimer = window.setTimeout(() => {
      headingRef.current?.focus({ preventScroll: true })
    }, focusDelayMs)

    return () => window.clearTimeout(focusTimer)
  }, [focusDelayMs, headingRef, title])
}
