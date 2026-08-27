import { describe, expect, it } from 'vitest'
import {
  reducedMotionOverride,
  reducedMotionQuery,
  resolveMotionMode,
  shouldReduceMotion,
} from './motion'

describe('reduced motion branch', () => {
  it('maps the media-query result to a stable mode', () => {
    expect(resolveMotionMode(true)).toBe('reduced')
    expect(resolveMotionMode(false)).toBe('full')
  })

  it('uses the operating-system reduced-motion query', () => {
    expect(reducedMotionQuery).toBe('(prefers-reduced-motion: reduce)')
  })

  it('supports a local-only browser verification override', () => {
    expect(reducedMotionOverride).toBe('motion=reduced')
    expect(shouldReduceMotion(false, '?motion=reduced')).toBe(true)
    expect(shouldReduceMotion(false, '')).toBe(false)
    expect(shouldReduceMotion(true, '')).toBe(true)
  })
})
