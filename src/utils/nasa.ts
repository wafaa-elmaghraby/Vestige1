import type { LocalizedText } from '../i18n/types';

/** Returns the English source string of a value that may be a plain string or a localized pair. */
export const rawText = (value: string | LocalizedText): string =>
  typeof value === 'string' ? value : value.en;

/** Extracts a four-digit year from a date value regardless of the active language. */
export const yearOf = (value: string | LocalizedText, fallback = '1969'): string =>
  rawText(value).match(/\d{4}/)?.[0] ?? fallback;

/** Extracts the leading year/period token of an operational span for compact labels. */
export const spanStart = (value: string | LocalizedText): string =>
  rawText(value).split(/—|–/)[0].trim();