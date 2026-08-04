import type {
  LocalesValues,
  ProviderVariant,
} from '@intlayer/types/module_augmentation';
import { getContext, setContext } from 'svelte';

export interface IntlayerContextType {
  locale: LocalesValues;
  setLocale: (locale: LocalesValues) => void;
  /**
   * Ambient variant applied to every dictionary read below the provider, the
   * same way `locale` is. Overridden per call by an explicit selector.
   *
   * Accepts a name (`'school1'`), an ordered preference chain
   * (`['school1', 'default']`), or a per-key map
   * (`{ key1: 'school1', default: 'base' }`). A plain object is always the
   * per-key map; nest a structured variant as `{ default: { id: 'prod_abc' } }`.
   */
  variant?: ProviderVariant;
  setVariant?: (variant: ProviderVariant | undefined) => void;
  isCookieEnabled?: boolean;
}

const INTLAYER_CONTEXT_KEY = Symbol('intlayer');

export const setIntlayerContext = (context: IntlayerContextType) => {
  setContext(INTLAYER_CONTEXT_KEY, context);
};

export const getIntlayerContext = (): IntlayerContextType | undefined => {
  return getContext(INTLAYER_CONTEXT_KEY);
};
