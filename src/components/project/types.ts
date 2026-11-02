import type { Dictionary, FeaturedProject } from '@/content/types';

export type { FeaturedProject };
export type DetailUi = Dictionary['projects']['detailUi'];
export type GalleryItem = NonNullable<FeaturedProject['gallery']>[number];

/** Fields of the next case study shown in the footer teaser. */
export type NextProjectTeaser = Pick<FeaturedProject, 'num' | 'slug' | 'title' | 'category' | 'tags' | 'image'>;
