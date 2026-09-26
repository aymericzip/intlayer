import { Showcase_Submit } from '@intlayer/design-system/routes';

/**
 * Builds the showcase submission URL, presetting the project name and website
 * URL (`?name=&url=`). Falls back to the hostname (without `www.`) as name.
 */
export const getShowcaseSubmitUrl = (
  pageUrl: string,
  siteName?: string | null
): string => {
  const { origin, hostname } = new URL(pageUrl);
  const submitUrl = new URL(Showcase_Submit);

  submitUrl.searchParams.set(
    'name',
    siteName?.trim() || hostname.replace(/^www\./, '')
  );
  submitUrl.searchParams.set('url', origin);

  return submitUrl.toString();
};
