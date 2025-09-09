import type { LocalesValues } from '@intlayer/config/client';
import type { DeepTransformContent, DictionaryKeys } from '@intlayer/core';
import { getContext, setContext } from 'svelte';
import { getIntlayer } from '../utils/getIntLayer.js';
//@ts-ignore
import type { IntlayerDictionaryTypesConnector } from 'intlayer';
const SYMBOL_KEY = 'int_layer_provider';

type ProviderProps = {
  locale?: LocalesValues;
  defaultLocale?: LocalesValues;
};

class IntlayerState {
  locale: LocalesValues | undefined = $state('');
  defaultLocale: LocalesValues | undefined = $state('');

  constructor(props: ProviderProps) {
    this.defaultLocale = props.locale;
    this.locale = props.locale;
  }

  setLocale = (locale: LocalesValues) => {
    this.locale = locale;
  };
  getLocale = () => {
    return this.locale;
  };
}

export function setIntLayer(props: ProviderProps) {
  console.log('Running setting up context with key', SYMBOL_KEY);
  return setContext(SYMBOL_KEY, new IntlayerState(props));
}

function getProviderCtx() {
  return getContext(SYMBOL_KEY) as IntlayerState;
}

export function useIntLayer<T extends DictionaryKeys>(
  key: T,
  locale?: LocalesValues
): DeepTransformContent<IntlayerDictionaryTypesConnector[T]['content']> {
  const state = getProviderCtx();
  let currentLocale = locale ?? state.getLocale();
  return getIntlayer(key, currentLocale);
}
