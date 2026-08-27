import { describe, expect, it } from 'vitest'
import { isShowcaseRoute, showcaseRoutePaths } from './routes'

describe('route manifest', () => {
  it('contains the homepage and four detail routes', () => {
    expect(showcaseRoutePaths).toEqual([
      '/',
      '/hmi',
      '/plc',
      '/motion',
      '/vision',
    ])
  })

  it('rejects routes outside the agreed site map', () => {
    expect(isShowcaseRoute('/motion')).toBe(true)
    expect(isShowcaseRoute('/electrical')).toBe(false)
    expect(isShowcaseRoute('/unknown')).toBe(false)
  })
})

