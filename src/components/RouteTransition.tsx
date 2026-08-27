import { useRef } from 'react'
import { useMotionMode } from '../features/motion/useMotionMode'
import { gsap, useGSAP } from '../lib/gsap'

interface RouteTransitionProps {
  readonly routeKey: string
}

export function RouteTransition({ routeKey }: RouteTransitionProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const motionMode = useMotionMode()

  useGSAP(
    () => {
      const root = rootRef.current
      if (!root) return

      const panels = gsap.utils.toArray<HTMLElement>('[data-transition-panel]', root)

      if (motionMode === 'reduced') {
        gsap.set(root, { autoAlpha: 0, pointerEvents: 'none' })
        window.scrollTo(0, 0)
        return
      }

      const timeline = gsap.timeline({
        defaults: { ease: 'power4.inOut' },
        onStart: () => {
          root.style.pointerEvents = 'auto'
        },
        onComplete: () => {
          root.style.pointerEvents = 'none'
        },
      })

      timeline
        .set(root, { autoAlpha: 1 })
        .set(panels, { yPercent: 110 })
        .to(panels, { yPercent: 0, duration: 0.3, stagger: 0.045 })
        .add(() => window.scrollTo(0, 0))
        .to(panels, {
          yPercent: -110,
          duration: 0.45,
          stagger: 0.055,
        }, '+=0.06')
        .set(root, { autoAlpha: 0 })
    },
    {
      scope: rootRef,
      dependencies: [motionMode, routeKey],
      revertOnUpdate: true,
    },
  )

  return (
    <div ref={rootRef} className="route-transition" aria-hidden="true">
      <div data-transition-panel><span>ROUTE</span></div>
      <div data-transition-panel><span>SYNC</span></div>
      <div data-transition-panel><span>READBACK</span></div>
      <div data-transition-panel><span>READY</span></div>
    </div>
  )
}

