import type { MediaAsset } from '../data/capabilities'
import { getMediaUrl } from '../lib/media'

interface MediaFrameProps {
  readonly media: MediaAsset
  readonly eager?: boolean
}

export function MediaFrame({ media, eager = false }: MediaFrameProps) {
  return (
    <figure className="media-frame">
      <div className="media-frame__top" aria-hidden="true">
        <span />
        <span />
        <span />
        <b>LOCAL / EVIDENCE VIEW</b>
      </div>
      <div className="media-frame__viewport">
        <img
          src={getMediaUrl(media.file)}
          alt={media.alt}
          width={media.width}
          height={media.height}
          loading={eager ? 'eager' : 'lazy'}
          fetchPriority={eager ? 'high' : 'auto'}
          decoding="async"
        />
      </div>
      <figcaption>{media.caption}</figcaption>
    </figure>
  )
}
