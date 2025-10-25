import type { LocalesValues } from '@intlayer/config/client';
import type { DictionaryKeys } from '@intlayer/core';
// @ts-ignore intlayer declared for module augmentation
import type { IntlayerDictionaryTypesConnector } from 'intlayer';
import {
  computed,
  inject,
  isRef,
  type MaybeRefOrGetter,
  ref,
  toValue,
  watch,
} from 'vue';
import { getIntlayer } from '../getIntlayer';
import type { DeepTransformContent } from '../plugins';
import { INTLAYER_SYMBOL, type IntlayerProvider } from './installIntlayer';

export const useIntlayer = <T extends DictionaryKeys>(
  key: MaybeRefOrGetter<T>,
  locale?: MaybeRefOrGetter<LocalesValues | null | undefined>
): DeepTransformContent<IntlayerDictionaryTypesConnector[T]['content']> => {
  const intlayer = inject<IntlayerProvider>(INTLAYER_SYMBOL);
  if (!intlayer)
    throw new Error('useIntlayer must be used under <IntlayerProvider>');

  // Normalize the provider locale so it's a Ref either way
  const providerLocale = isRef(intlayer.locale)
    ? intlayer.locale
    : ref(intlayer.locale as any);

  // Decide which locale to use, and make it reactive
  const localeTarget = computed<LocalesValues>(() => {
    const explicit = locale !== undefined ? toValue(locale) : undefined;
    return (explicit ?? providerLocale.value)!;
  });

  // Store content in a ref to track changes
  const sourceContent = ref<Record<string, any>>({});

  // Watch for locale/key changes and update content
  watch(
    [() => toValue(key) as T, () => localeTarget.value],
    ([key, locale]) => {
      const next = getIntlayer(key, locale);
      sourceContent.value = next;
    },
    { immediate: true, flush: 'sync' }
  );

  // Create a proxy that returns computed refs for each property
  // These computeds track sourceContent.value[prop] and update automatically
  const computedCache = new Map<string, any>();

  const content = new Proxy(
    {},
    {
      get(_target, prop: string | symbol) {
        // Skip Vue internal properties
        if (
          typeof prop === 'symbol' ||
          (typeof prop === 'string' && prop.startsWith('__'))
        ) {
          return undefined;
        }

        const propKey = prop as string;

        // Create or retrieve cached computed ref
        if (!computedCache.has(propKey)) {
          const computedRef = computed(() => sourceContent.value[propKey]);

          // Always create a proxy around the computed ref that can handle both
          // simple values and IntlayerNode objects with render methods
          const proxiedRef = new Proxy(computedRef, {
            get(target, methodProp) {
              // If accessing 'value', return the computed's value
              if (methodProp === 'value') {
                return target.value;
              }

              // Get the current inner value (re-evaluated each time!)
              const innerValue = target.value;

              // If the inner value has this property, return it
              // This handles IntlayerNode methods like render(), toString(), etc.
              if (
                innerValue &&
                typeof innerValue === 'object' &&
                methodProp in innerValue
              ) {
                const innerProp = innerValue[methodProp];
                return typeof innerProp === 'function'
                  ? innerProp.bind(innerValue)
                  : innerProp;
              }

              // Otherwise return from the ref itself
              return (target as any)[methodProp];
            },
          });

          computedCache.set(propKey, proxiedRef);
        }

        return computedCache.get(propKey);
      },

      has(_target, prop) {
        return prop in sourceContent.value;
      },

      ownKeys(_target) {
        return Object.keys(sourceContent.value);
      },

      getOwnPropertyDescriptor(_target, prop: string) {
        if (prop in sourceContent.value) {
          return {
            enumerable: true,
            configurable: true,
          };
        }
        return undefined;
      },
    }
  );

  return content as any;
};
