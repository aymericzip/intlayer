/**
 * Helpers to group and label the audit check types streamed by the backend.
 * Check types are namespaced (`url_`, `robots_`, `sitemap_`, `domain_`) and
 * URL-scoped checks carry a `\<url>` suffix that is stripped before lookup.
 * Translated labels live in the `audit-section` dictionary.
 */

/** Group a raw check type into a section of the results list. */
export const checkSection = (
  type: string
): 'page' | 'robots' | 'sitemap' | 'domain' => {
  if (type.startsWith('robots_')) return 'robots';
  if (type.startsWith('sitemap_')) return 'sitemap';
  if (type.startsWith('domain_')) return 'domain';
  return 'page';
};

/** Strip the `\<url>` suffix of URL-scoped check types. */
export const baseCheckType = (type: string): string =>
  type.split('\\')[0] ?? type;

/** Readable label for a check type the dictionary does not know yet. */
export const fallbackCheckLabel = (type: string): string =>
  baseCheckType(type).replace(/^(url|robots|sitemap|domain)_/, '');
