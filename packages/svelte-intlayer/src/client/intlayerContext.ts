import type { LocalesValues } from '@intlayer/types';
import { getContext, setContext } from 'svelte';

export interface IntlayerContextType {
  locale: LocalesValues;
  setLocale: (locale: LocalesValues) => void;
}

const INTLAYER_CONTEXT_KEY = Symbol('intlayer');

export const setIntlayerContext = (context: IntlayerContextType) => {
  setContext(INTLAYER_CONTEXT_KEY, context);
};

export const getIntlayerContext = (): IntlayerContextType | undefined => {
  return getContext(INTLAYER_CONTEXT_KEY);
};
