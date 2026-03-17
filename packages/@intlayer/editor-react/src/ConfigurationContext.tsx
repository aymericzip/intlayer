'use client';

import type { IntlayerConfig } from '@intlayer/types/config';
import { useEffect, useState } from 'react';
import { useEditorStateManager } from './EditorStateContext';

export type ConfigurationProviderProps = {
  configuration?: IntlayerConfig;
};

/**
 * Returns the current configuration, backed by EditorStateManager.
 */
export const useConfiguration = (): IntlayerConfig | undefined => {
  const manager = useEditorStateManager();
  const [config, setConfig] = useState<IntlayerConfig | undefined>(
    manager.configuration.value
  );

  useEffect(() => {
    const handler = (e: Event) =>
      setConfig((e as CustomEvent<IntlayerConfig>).detail);
    manager.configuration.addEventListener('change', handler);
    return () => manager.configuration.removeEventListener('change', handler);
  }, [manager]);

  return config;
};

/**
 * Returns a function that broadcasts the current configuration.
 */
export const useConfigurationState = () => {
  const manager = useEditorStateManager();

  const [config, setConfig] = useState<IntlayerConfig | undefined>(
    manager.configuration.value
  );

  return [
    config,
    setConfig,
    () => manager.configuration.postCurrentValue(),
  ] as const;
};
