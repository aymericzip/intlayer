import configuration from '@intlayer/config/built';
import type { LocalesValues } from '@intlayer/config/client';
import { getContext, setContext } from 'svelte';
import { SYMBOL_KEY } from '../utils/constants.js';

type ProviderProps = {
  locale?: LocalesValues;
  // defaultLocale?: LocalesValues;
};

// const CONFIG = configuration.default;

const {
  internationalization: { defaultLocale, locales: availableLocales },
} = configuration.default;

class IntlayerState {
  locale: LocalesValues | undefined = $state('');
  // defaultLocale: LocalesValues | undefined = $state('');

  constructor(props: ProviderProps) {
    // this.defaultLocale = props.locale;
    this.locale = props.locale;
  }

  setLocale = (newLocale: LocalesValues) => {
    console.log('[DEBUG]:', defaultLocale);
    console.log('[DEBUG]:', availableLocales);
    if (!availableLocales?.map(String).includes(newLocale)) {
      console.error(`Locale ${newLocale} is not available`);
      return;
    }
    this.locale = newLocale;
  };
  getLocale = () => {
    return this.locale;
  };
}

export function setIntLayer(props: ProviderProps) {
  return setContext(SYMBOL_KEY, new IntlayerState(props));
}

export function getProviderCtx() {
  return getContext(SYMBOL_KEY) as IntlayerState;
}
