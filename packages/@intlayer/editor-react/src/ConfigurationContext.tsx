'use client';

import { type IntlayerConfig } from '@intlayer/config/client';
import { createContext, useContext, FC, PropsWithChildren } from 'react';
import { useCrossFrameState } from './useCrossFrameState';

const ConfigurationStatesContext = createContext<IntlayerConfig | undefined>(
  undefined
);

export const useConfigurationState = () =>
  useCrossFrameState<IntlayerConfig>('INTLAYER_CONFIGURATION', undefined, {
    receive: false,
    emit: true,
  });

export type ConfigurationProviderProps = {
  configuration?: IntlayerConfig;
};

export const ConfigurationProvider: FC<
  PropsWithChildren<ConfigurationProviderProps>
> = ({ children, configuration }) => (
  <ConfigurationStatesContext.Provider value={configuration}>
    {children}
  </ConfigurationStatesContext.Provider>
);

export const useConfiguration = () => {
  const statesContext = useContext(ConfigurationStatesContext);

  if (!statesContext) {
    throw new Error(
      'useConfigurationStates must be used within a ConfigurationProvider'
    );
  }

  return statesContext;
};
