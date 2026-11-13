import type { Dictionary, FeaturedProject } from '@/content/types';

export type { FeaturedProject };
export type DetailUi = Dictionary['projects']['detailUi'];
export type GalleryItem = NonNullable<FeaturedProject['gallery']>[number];

/** Fields of the next case study shown in the footer teaser. */
export type NextProjectTeaser = Pick<FeaturedProject, 'num' | 'slug' | 'title' | 'category' | 'tags' | 'image'>;

/** A page section listed in the quick-jump rail (`id` is the DOM id of the <section>). */
export interface CaseSection {
  id: string;
  /** Two-digit position on this page: "01", "02", ... */
  index: string;
  label: string;
}

/** What the full-screen preview is showing. */
export interface LightboxState {
  items: GalleryItem[];
  index: number;
  /** Portrait phone screenshots (framed as a device) instead of wide web captures. */
  phone: boolean;
  /** Opened from the screen deck (the deck follows it) or from the cover. */
  source: 'gallery' | 'cover';
}
