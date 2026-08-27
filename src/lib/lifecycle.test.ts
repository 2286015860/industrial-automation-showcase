import { describe, expect, it, vi } from 'vitest'
import { createDisposerStack } from './lifecycle'

describe('animation lifecycle cleanup', () => {
  it('runs registered cleanup in reverse order exactly once', () => {
    const events: string[] = []
    const stack = createDisposerStack()

    stack.add(() => events.push('listener'))
    stack.add(() => events.push('raf'))
    expect(stack.size()).toBe(2)

    stack.dispose()
    stack.dispose()

    expect(events).toEqual(['raf', 'listener'])
    expect(stack.size()).toBe(0)
  })

  it('immediately cleans resources registered after disposal', () => {
    const cleanup = vi.fn()
    const stack = createDisposerStack()
    stack.dispose()
    stack.add(cleanup)
    expect(cleanup).toHaveBeenCalledOnce()
  })
})

