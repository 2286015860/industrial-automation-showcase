import { createContext } from 'react'
import type { MotionMode } from '../../lib/motion'

export const MotionContext = createContext<MotionMode>('full')

