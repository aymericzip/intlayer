'use client';

import { type IntlayerConfig } from '@intlayer/config/client';
import {
  createContext,
  useContext,
  FC,
  PropsWithChildren,
  Dispatch,
  SetStateAction,
} from 'react';
import { useCrossFrameState } from './useCrossFrameState';

type ConfigurationStatesContextType = {
  configuration: IntlayerConfig;
};
type ConfigurationActionsContextType = {
  setConfiguration: Dispatch<SetStateAction<IntlayerConfig>>;
};

const ConfigurationStatesContext = createContext<
  ConfigurationStatesContextType | undefined
>(undefined);
const ConfigurationActionsContext = createContext<
  ConfigurationActionsContextType | undefined
>(undefined);

export const ConfigurationProvider: FC<PropsWithChildren> = ({ children }) => {
  const [configuration, setConfiguration] = useCrossFrameState<IntlayerConfig>(
    'INTLAYER_CONFIGURATION'
  );

  return (
    <ConfigurationStatesContext.Provider value={{ configuration }}>
      <ConfigurationActionsContext.Provider
        value={{
          setConfiguration,
        }}
      >
        {children}
      </ConfigurationActionsContext.Provider>
    </ConfigurationStatesContext.Provider>
  );
};

export const useConfigurationActions = () => {
  const context = useContext(ConfigurationActionsContext);

  if (!context) {
    throw new Error(
      'useConfigurationActions must be used within a ConfigurationActionsProvider'
    );
  }
  return context;
};

export const useConfiguration = () => {
  const actionsContext = useConfigurationActions();
  const statesContext = useContext(ConfigurationStatesContext);

  if (!statesContext) {
    throw new Error(
      'useConfigurationStates must be used within a ConfigurationStatesProvider'
    );
  }

  return { ...statesContext, ...actionsContext };
};
