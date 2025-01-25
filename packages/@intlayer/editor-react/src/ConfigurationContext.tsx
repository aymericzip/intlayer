'use client';

import { getConfiguration, type IntlayerConfig } from '@intlayer/config/client';
import { createContext, useContext, FC, PropsWithChildren } from 'react';
import { useCrossFrameState } from './useCrossFrameState';

type ConfigurationStatesContextType = {
  configuration: IntlayerConfig;
};

const ConfigurationStatesContext = createContext<
  ConfigurationStatesContextType | undefined
>(undefined);

export const useConfigurationState = () =>
  useCrossFrameState<IntlayerConfig>('INTLAYER_CONFIGURATION', undefined, {
    receive: false,
    emit: true,
  });

export const ConfigurationProvider: FC<PropsWithChildren> = ({ children }) => {
  const fallbackConfiguration = getConfiguration();
  const [configuration] = useCrossFrameState<IntlayerConfig>(
    'INTLAYER_CONFIGURATION',
    undefined,
    {
      emit: false,
      receive: true,
    }
  );

  return (
    <ConfigurationStatesContext.Provider
      value={{ configuration: configuration ?? fallbackConfiguration }}
    >
      {children}
    </ConfigurationStatesContext.Provider>
  );
};

export const useConfiguration = () => {
  const statesContext = useContext(ConfigurationStatesContext);

  if (!statesContext) {
    throw new Error(
      'useConfigurationStates must be used within a ConfigurationProvider'
    );
  }

  return statesContext;
};
