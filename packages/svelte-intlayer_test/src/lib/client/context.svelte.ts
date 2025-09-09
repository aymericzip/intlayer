import type { LocalesValues } from '@intlayer/config/client';
import { getContext, setContext } from 'svelte';
import { SYMBOL_KEY } from '../utils/constants.js';

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

export function getProviderCtx() {
  return getContext(SYMBOL_KEY) as IntlayerState;
}
