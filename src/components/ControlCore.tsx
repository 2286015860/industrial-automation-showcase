import { useRef } from 'react'
import { capabilities } from '../data/capabilities'
import { useMotionMode } from '../features/motion/useMotionMode'
import { gsap, useGSAP } from '../lib/gsap'
import { IntentLink } from './IntentLink'

export function ControlCore() {
  const rootRef = useRef<HTMLDivElement>(null)
  const motionMode = useMotionMode()

  useGSAP(
    () => {
      const root = rootRef.current
      if (!root || motionMode === 'reduced') return

      const plate = root.querySelector<HTMLElement>('[data-core-plate]')
      if (!plate) return

      const xTo = gsap.quickTo(plate, 'rotationY', {
        duration: 0.8,
        ease: 'power3.out',
      })
      const yTo = gsap.quickTo(plate, 'rotationX', {
        duration: 0.8,
        ease: 'power3.out',
      })
      const mapX = gsap.utils.mapRange(0, 1, -5, 5)
      const mapY = gsap.utils.mapRange(0, 1, 4, -4)

      const onPointerMove = (event: PointerEvent) => {
        const rect = root.getBoundingClientRect()
        const normalizedX = gsap.utils.clamp(0, 1, (event.clientX - rect.left) / rect.width)
        const normalizedY = gsap.utils.clamp(0, 1, (event.clientY - rect.top) / rect.height)
        xTo(mapX(normalizedX))
        yTo(mapY(normalizedY))
      }

      const onPointerLeave = () => {
        xTo(0)
        yTo(0)
      }

      root.addEventListener('pointermove', onPointerMove, { passive: true })
      root.addEventListener('pointerleave', onPointerLeave)

      const orbit = gsap.to('[data-core-orbit]', {
        rotation: 72,
        duration: 4.6,
        ease: 'power1.inOut',
        transformOrigin: '50% 50%',
      })

      return () => {
        orbit.kill()
        root.removeEventListener('pointermove', onPointerMove)
        root.removeEventListener('pointerleave', onPointerLeave)
      }
    },
    { scope: rootRef, dependencies: [motionMode], revertOnUpdate: true },
  )

  return (
    <div ref={rootRef} className="control-core">
      <div className="core-plate" data-core-plate>
        <div className="core-orbit" data-core-orbit aria-hidden="true">
          <i />
          <i />
          <i />
          <i />
        </div>
        <div className="core-readout">
          <span>SYSTEM</span>
          <strong>CONTROL<br />CORE</strong>
          <small>COMMAND ↓ / READBACK ↑</small>
        </div>
        <div className="core-crosshair" aria-hidden="true" />
      </div>

      <div className="core-domains" aria-label="四项能力入口">
        {capabilities.map((capability) => (
          <IntentLink
            key={capability.id}
            to={capability.route}
            className={`core-domain core-domain--${capability.id}`}
            style={{ '--domain-accent': capability.accent } as React.CSSProperties}
          >
            <span>{capability.order}</span>
            <b>{capability.shortName}</b>
            <small>{capability.EnglishName}</small>
          </IntentLink>
        ))}
      </div>
    </div>
  )
}
