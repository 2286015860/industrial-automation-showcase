import { useContext } from 'react'
import { MotionContext } from './motion-context'

export function useMotionMode() {
  return useContext(MotionContext)
}

