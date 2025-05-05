'use client';

import { type IntlayerConfig } from '@intlayer/config/client';
import { MessageKey } from '@intlayer/editor';
import {
  type FC,
  type PropsWithChildren,
  createContext,
  useContext,
} from 'react';
import { useCrossFrameState } from './useCrossFrameState';

const ConfigurationStatesContext = createContext<IntlayerConfig | undefined>(
  undefined
);

export const useConfigurationState = () =>
  useCrossFrameState<IntlayerConfig>(
    MessageKey.INTLAYER_CONFIGURATION,
    undefined,
    {
      receive: false,
      emit: true,
    }
  );

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

export const useConfiguration = () => useContext(ConfigurationStatesContext);
