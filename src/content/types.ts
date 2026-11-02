import type en from './locales/en';

/**
 * Shape of a locale dictionary. English is the reference: `ru` and `kk` are annotated
 * with this type, so a missing, extra or mistyped key is a compile-time error.
 */
export type Dictionary = typeof en;

export type FeaturedProject = Dictionary['projects']['featured'][number];
export type ArchiveProject = Dictionary['projects']['otherProjects'][number];

/** Strings shared by the layout chrome (navigation, home HUD, terminal). */
export type CommonDictionary = Pick<Dictionary, 'system' | 'nav'>;
