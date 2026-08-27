import { lazy, type ComponentType, type LazyExoticComponent } from 'react'
import type { CapabilityId } from './data/capabilities'

type PageModule = { default: ComponentType }
type PageLoader = () => Promise<PageModule>

export const routeLoaders = {
  home: () => import('./pages/HomePage'),
  hmi: () => import('./pages/HmiPage'),
  plc: () => import('./pages/PlcPage'),
  motion: () => import('./pages/MotionPage'),
  vision: () => import('./pages/VisionPage'),
} satisfies Record<'home' | CapabilityId, PageLoader>

export const lazyPages: Record<
  'home' | CapabilityId,
  LazyExoticComponent<ComponentType>
> = {
  home: lazy(routeLoaders.home),
  hmi: lazy(routeLoaders.hmi),
  plc: lazy(routeLoaders.plc),
  motion: lazy(routeLoaders.motion),
  vision: lazy(routeLoaders.vision),
}

export function preloadRoute(path: string): Promise<PageModule> | undefined {
  if (path === '/') return routeLoaders.home()
  if (path === '/hmi') return routeLoaders.hmi()
  if (path === '/plc') return routeLoaders.plc()
  if (path === '/motion') return routeLoaders.motion()
  if (path === '/vision') return routeLoaders.vision()
  return undefined
}

