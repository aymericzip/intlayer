'use client';

import type { IntlayerConfig } from '@intlayer/config';
import { useSession } from '@intlayer/design-system/hooks';
import { ConfigurationProvider } from '@intlayer/editor-react';
import type { FC, PropsWithChildren } from 'react';

export const EditorConfigurationProvider: FC<PropsWithChildren> = ({
  children,
}) => {
  const { session } = useSession();
  const project = session?.project;

  return (
    <ConfigurationProvider
      configuration={project?.configuration as IntlayerConfig}
    >
      {children}
    </ConfigurationProvider>
  );
};
