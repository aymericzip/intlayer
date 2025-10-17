import { MessageKey } from '@intlayer/editor';
import type { IntlayerConfig } from '@intlayer/types';
import {
  type Component,
  createContext,
  type ParentProps,
  useContext,
} from 'solid-js';
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

export type ConfigurationProviderProps = ParentProps<{
  configuration?: IntlayerConfig;
}>;

export const ConfigurationProvider: Component<ConfigurationProviderProps> = (
  props
) => (
  <ConfigurationStatesContext.Provider value={props.configuration}>
    {props.children}
  </ConfigurationStatesContext.Provider>
);

export const useConfiguration = () => useContext(ConfigurationStatesContext);
