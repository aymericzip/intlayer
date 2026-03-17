import type { IntlayerConfig } from '@intlayer/types/config';
import { useEffect, useState } from 'preact/hooks';
import { useEditorStateManager } from './EditorStateContext';

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

export type ConfigurationProviderProps = { configuration?: IntlayerConfig };
