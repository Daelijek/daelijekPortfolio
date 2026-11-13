'use client';

import { createContext, useContext, type ReactNode } from 'react';
import type { MediaMap, MediaMeta } from '@/content/media';

const MediaContext = createContext<MediaMap>({});

/** Makes the real sizes and blurred previews of this page's images available to the template. */
export function MediaProvider({ media, children }: { media: MediaMap; children: ReactNode }) {
  return <MediaContext.Provider value={media}>{children}</MediaContext.Provider>;
}

/** Lookup for image metadata; `undefined` for images missing from the manifest. */
export function useMedia(): (src: string) => MediaMeta | undefined {
  const media = useContext(MediaContext);
  return (src) => media[src];
}

/** next/image props for the blurred preview of an image (none when it is not in the manifest). */
export function blurProps(meta: MediaMeta | undefined) {
  return meta ? ({ placeholder: 'blur', blurDataURL: meta.blur } as const) : {};
}
