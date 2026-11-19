/**
 * CMS page editing a dictionary (`https://app.intlayer.org/dictionary/hero`).
 *
 * @param cmsURL - `editor.cmsURL` of the configuration.
 * @param dictionaryKey - Key of the dictionary.
 */
export const getCmsDictionaryUrl = (
  cmsURL: string,
  dictionaryKey: string
): string =>
  `${cmsURL.replace(/\/+$/, '')}/dictionary/${encodeURIComponent(dictionaryKey)}`;
