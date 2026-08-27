export const showcaseRoutePaths = ['/', '/hmi', '/plc', '/motion', '/vision'] as const

export type ShowcaseRoutePath = (typeof showcaseRoutePaths)[number]

export function isShowcaseRoute(path: string): path is ShowcaseRoutePath {
  return showcaseRoutePaths.some((candidate) => candidate === path)
}

