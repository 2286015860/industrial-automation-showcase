export type Disposer = () => void

export interface DisposerStack {
  readonly add: (disposer: Disposer) => Disposer
  readonly dispose: () => void
  readonly size: () => number
}

export function createDisposerStack(): DisposerStack {
  const disposers = new Set<Disposer>()
  let disposed = false

  return {
    add(disposer) {
      if (disposed) {
        disposer()
        return disposer
      }

      disposers.add(disposer)
      return disposer
    },
    dispose() {
      if (disposed) return
      disposed = true

      for (const disposer of [...disposers].reverse()) {
        disposer()
      }

      disposers.clear()
    },
    size() {
      return disposers.size
    },
  }
}

