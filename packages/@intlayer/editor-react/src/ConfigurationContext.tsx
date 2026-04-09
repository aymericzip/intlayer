'use client';

import type { IntlayerConfig } from '@intlayer/types/config';
import {
  createContext,
  type FC,
  type PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useEditorStateManager } from './EditorStateContext';

// 1. Create a native React context
const ConfigurationReactContext = createContext<IntlayerConfig | undefined>(
  undefined
);

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

  // 2. Wrap children in the native provider
  return (
    <ConfigurationReactContext.Provider value={configuration}>
      {children}
    </ConfigurationReactContext.Provider>
  );
};

export const useConfiguration = (): IntlayerConfig | undefined => {
  const manager = useEditorStateManager();
  const reactConfig = useContext(ConfigurationReactContext); // 3. Consume native context

  const [config, setConfig] = useState<IntlayerConfig | undefined>(
    manager?.configuration.value ?? reactConfig
  );

  useEffect(() => {
    if (!manager) {
      setConfig(reactConfig);
      return;
    }

    const handler = (e: Event) => {
      const detail = (e as CustomEvent<IntlayerConfig>).detail;
      setConfig(detail ?? reactConfig);
    };

    manager.configuration.addEventListener('change', handler);
    return () => manager.configuration.removeEventListener('change', handler);
  }, [manager, reactConfig]);

  // Prefer event-driven config, fallback to React context config
  return config ?? reactConfig;
};

export const useConfigurationState = () => {
  const manager = useEditorStateManager();
  const reactConfig = useContext(ConfigurationReactContext);

  const [config, setConfig] = useState<IntlayerConfig | undefined>(
    manager?.configuration.value ?? reactConfig
  );

  return [
    config ?? reactConfig,
    setConfig,
    () => manager?.configuration.postCurrentValue(),
  ] as const;
};
