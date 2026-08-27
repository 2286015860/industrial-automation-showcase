import { useEffect, useState, type ReactNode } from 'react'
import {
  reducedMotionQuery,
  resolveMotionMode,
  shouldReduceMotion,
} from '../../lib/motion'
import { MotionContext } from './motion-context'

interface MotionProviderProps {
  readonly children: ReactNode
}

function readInitialMode() {
  return resolveMotionMode(
    shouldReduceMotion(
      window.matchMedia(reducedMotionQuery).matches,
      window.location.search,
    ),
  )
}

export function MotionProvider({ children }: MotionProviderProps) {
  const [mode, setMode] = useState(readInitialMode)

  useEffect(() => {
    const mediaQuery = window.matchMedia(reducedMotionQuery)
    const hasLocalOverride = shouldReduceMotion(false, window.location.search)
    const onChange = (event: MediaQueryListEvent) => {
      setMode(resolveMotionMode(hasLocalOverride || event.matches))
    }

    mediaQuery.addEventListener('change', onChange)
    return () => mediaQuery.removeEventListener('change', onChange)
  }, [])

  return <MotionContext.Provider value={mode}>{children}</MotionContext.Provider>
}
