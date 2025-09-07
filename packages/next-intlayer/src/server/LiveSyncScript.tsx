import configuration from '@intlayer/config/built';
import Script from 'next/script';
import { FC } from 'react';

export const LiveSyncScript: FC = () => {
  const { liveSync, liveSyncURL } = configuration.editor;

  if (!liveSync) return <></>;

  const importmap: Record<string, string> = {
    '@intlayer/dictionaries-entry': `${liveSyncURL}/dictionaries`,
    '@intlayer/dictionaries-entry/': `${liveSyncURL}/dictionaries/`,
    '@intlayer/unmerged-dictionaries-entry': `${liveSyncURL}/unmerged_dictionaries`,
    '@intlayer/unmerged-dictionaries-entry/': `${liveSyncURL}/unmerged_dictionaries/`,
    '@intlayer/config/built': `${liveSyncURL}/configuration`,
  };

  const scriptContent: string = JSON.stringify({ imports: importmap });

  return (
    <Script
      id="intlayer-importmap"
      type="importmap"
      dangerouslySetInnerHTML={{
        __html: scriptContent,
      }}
    />
  );
};
