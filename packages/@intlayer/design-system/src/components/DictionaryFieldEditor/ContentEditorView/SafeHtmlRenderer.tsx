'use client';

import { useEffect, useState } from 'react';

export const SafeHtmlRenderer = ({ rawContent }: { rawContent: string }) => {
  const [cleanHtml, setCleanHtml] = useState<string>('');

  useEffect(() => {
    import('dompurify').then(({ default: domPurify }) => {
      // Executes only in the browser using the native DOM. jsdom is never invoked.
      setCleanHtml(domPurify.sanitize(rawContent));
    });
  }, [rawContent]);

  if (!cleanHtml) return <div />;

  // biome-ignore lint/security/noDangerouslySetInnerHtml: sanitize
  return <div dangerouslySetInnerHTML={{ __html: cleanHtml }} />;
};
