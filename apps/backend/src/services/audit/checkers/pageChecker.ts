import type { AuditEvent, CheerioAPI } from '../types';

export const checkHtmlAttributes = async (
  $: CheerioAPI,
  targetUrl: string,
  onEvent: (event: AuditEvent) => void
): Promise<{ langTag: string | undefined; dirTag: string | null }> => {
  const langTag = $('html').attr('lang');
  const dirTag = $('html').attr('dir') || null;

  const htmlLangPresent = Boolean(langTag);
  const htmlDirPresent = Boolean(dirTag);

  onEvent({
    type: `url_htmlLang\\${targetUrl}`,
    status: htmlLangPresent ? 'success' : 'error',
    data: {
      successDetails: htmlLangPresent ? langTag : undefined,
      errorsDetails: !htmlLangPresent
        ? 'Missing html lang attribute'
        : undefined,
    },
  });

  onEvent({
    type: `url_currentLocale\\${targetUrl}`,
    status: langTag ? 'success' : 'warning',
    data: {
      successDetails: langTag,
      warningsDetails: !langTag ? 'No locale detected' : undefined,
    },
  });

  onEvent({
    type: `url_htmlDir\\${targetUrl}`,
    status: htmlDirPresent ? 'success' : 'warning',
    data: {
      successDetails: htmlDirPresent ? dirTag : undefined,
      warningsDetails: !htmlDirPresent
        ? 'Missing html dir attribute'
        : undefined,
    },
  });

  return { langTag, dirTag };
};

export const extractPageMetadata = async (
  $: CheerioAPI,
  targetUrl: string,
  onEvent: (event: AuditEvent) => void
): Promise<void> => {
  const title = $('title').text();
  const metaDescription = $("meta[name='description']").attr('content') ?? '';
  const metaOgImage = $("meta[property='og:image']").attr('content');

  let image = '';
  if (metaOgImage) {
    try {
      image = new URL(metaOgImage, targetUrl).href;
    } catch {
      image = metaOgImage;
    }
  }

  onEvent({
    domainData: { title, image, description: metaDescription },
  });
};
