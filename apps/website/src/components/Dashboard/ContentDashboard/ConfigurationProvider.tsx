'use client';

import type { IntlayerConfig } from '@intlayer/config';
import { useAuth } from '@intlayer/design-system/hooks';
import { ConfigurationProvider } from '@intlayer/editor-react';
import type { FC, PropsWithChildren } from 'react';

export const EditorConfigurationProvider: FC<PropsWithChildren> = ({
  children,
}) => {
  const { session } = useAuth();
  const project = session?.project;

  return (
    <ConfigurationProvider
      configuration={project?.configuration as IntlayerConfig}
    >
      {children}
    </ConfigurationProvider>
  );
};
