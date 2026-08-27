export type MotionMode = 'full' | 'reduced'

export const reducedMotionQuery = '(prefers-reduced-motion: reduce)'
export const reducedMotionOverride = 'motion=reduced'

export function resolveMotionMode(reduceMotion: boolean): MotionMode {
  return reduceMotion ? 'reduced' : 'full'
}

export function shouldReduceMotion(mediaMatches: boolean, search: string): boolean {
  const parameters = new URLSearchParams(search)
  return mediaMatches || parameters.get('motion') === 'reduced'
}
