import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { useMotionMode } from '../features/motion/useMotionMode'

interface ScrollTargetButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type' | 'onClick'> {
  readonly children: ReactNode
  readonly targetId: string
}

export function ScrollTargetButton({
  children,
  targetId,
  ...props
}: ScrollTargetButtonProps) {
  const motionMode = useMotionMode()

  const moveToTarget = () => {
    const target = document.getElementById(targetId)
    if (!target) return

    target.scrollIntoView({
      behavior: motionMode === 'reduced' ? 'auto' : 'smooth',
      block: 'start',
    })
    window.requestAnimationFrame(() => {
      const focusTarget = target.querySelector<HTMLElement>('h1') ?? target
      focusTarget.focus({ preventScroll: true })
    })
  }

  return (
    <button type="button" onClick={moveToTarget} {...props}>
      {children}
    </button>
  )
}
