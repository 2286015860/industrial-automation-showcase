import { existsSync, statSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'
import { capabilities, localMediaFiles } from './capabilities'

describe('local media', () => {
  it('contains every declared media file as a non-empty local asset', () => {
    for (const file of localMediaFiles) {
      const path = resolve(process.cwd(), 'public', 'media', file)
      expect(existsSync(path), `${file} should exist`).toBe(true)
      expect(statSync(path).size, `${file} should not be empty`).toBeGreaterThan(0)
    }
  })

  it('does not reference undeclared media', () => {
    const declared = new Set<string>(localMediaFiles)
    const referenced = new Set<string>()

    for (const capability of capabilities) {
      if (capability.heroMedia) referenced.add(capability.heroMedia.file)
      for (const section of capability.sections) {
        for (const media of section.media ?? []) referenced.add(media.file)
      }
    }

    expect([...referenced].every((file) => declared.has(file))).toBe(true)
  })
})

