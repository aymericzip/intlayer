'use client';

import { MessageKey } from '@intlayer/editor';
import type { IntlayerConfig } from '@intlayer/types';
import {
  createContext,
  type FunctionalComponent,
  type RenderableProps,
} from 'preact';
import { useContext } from 'preact/hooks';
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

export const ConfigurationProvider: FunctionalComponent<
  RenderableProps<ConfigurationProviderProps>
> = ({ children, configuration }) => (
  <ConfigurationStatesContext.Provider value={configuration}>
    {children}
  </ConfigurationStatesContext.Provider>
);

export const useConfiguration = () => useContext(ConfigurationStatesContext);
