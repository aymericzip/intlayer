'use client';

import type { IntlayerConfig } from '@intlayer/types/config';
import { type FC, type PropsWithChildren, useEffect, useState } from 'react';
import { useEditorStateManager } from './EditorStateContext';

export type ConfigurationProviderProps = PropsWithChildren<{
  configuration?: IntlayerConfig;
}>;

export const ConfigurationProvider: FC<ConfigurationProviderProps> = ({
  configuration,
  children,
}) => {
  const manager = useEditorStateManager();

  useEffect(() => {
    if (!manager || !configuration) return;
    manager.configuration.set(configuration);
  }, [manager, configuration]);

  return <>{children}</>;
};

export const useConfiguration = (): IntlayerConfig | undefined => {
  const manager = useEditorStateManager();
  const [config, setConfig] = useState<IntlayerConfig | undefined>(
    manager?.configuration.value
  );

  useEffect(() => {
    if (!manager) return;

    const handler = (e: Event) =>
      setConfig((e as CustomEvent<IntlayerConfig>).detail);
    manager.configuration.addEventListener('change', handler);
    return () => manager.configuration.removeEventListener('change', handler);
  }, [manager]);

  return config;
};

export const useConfigurationState = () => {
  const manager = useEditorStateManager();

  const [config, setConfig] = useState<IntlayerConfig | undefined>(
    manager?.configuration.value
  );

  return [
    config,
    setConfig,
    () => manager?.configuration.postCurrentValue(),
  ] as const;
};
