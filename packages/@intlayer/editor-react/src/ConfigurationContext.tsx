'use client';

import type { IntlayerConfig } from '@intlayer/types/config';
import { useEffect, useState } from 'react';
import { useEditorStateManager } from './EditorStateContext';

/**
 * Returns the Intlayer configuration held by the editor state manager.
 */
export const useConfiguration = (): IntlayerConfig | undefined => {
  const manager = useEditorStateManager();
  const [configuration, setConfiguration] = useState<
    IntlayerConfig | undefined
  >(manager?.configuration.value as IntlayerConfig | undefined);

  useEffect(() => {
    if (!manager) return;

    const handleChange = (event: Event) =>
      setConfiguration((event as CustomEvent<IntlayerConfig>).detail);

    manager.configuration.addEventListener('change', handleChange);

    return () =>
      manager.configuration.removeEventListener('change', handleChange);
  }, [manager]);

  return configuration;
};
