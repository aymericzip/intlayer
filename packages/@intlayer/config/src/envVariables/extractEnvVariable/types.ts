import { IntlayerConfig } from '../../client';

// Utility type that replaces all values of a given type with another type
export type ReplaceValue<T> = {
  [K in keyof T]: string | undefined;
};

export type IntlayerConfigEnvVariable = {
  [K in keyof IntlayerConfig]: ReplaceValue<IntlayerConfig[K]>;
};
