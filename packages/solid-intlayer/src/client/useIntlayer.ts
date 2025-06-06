import type { LocalesValues } from '@intlayer/config/client';
import { DictionaryKeys } from '@intlayer/core';
import { createEffect, createMemo, createSignal } from 'solid-js';
// @ts-ignore intlayer declared for module augmentation
import { getIntlayer } from '../getIntlayer';
import { useIntlayerContext } from './installIntlayer';

/** guard utility — true only for objects generated by `renderIntlayerNode()` */
export const isUpdatableNode = (
  val: unknown
): val is { __update: (n: unknown) => void } =>
  !!val &&
  typeof val === 'object' &&
  typeof (val as any).__update === 'function';

export const useIntlayer = <T extends DictionaryKeys>(
  key: T,
  locale?: LocalesValues
): any => {
  const intlayer = useIntlayerContext();

  /** which locale should we use right now? */
  const localeTarget = createMemo(() => locale ?? intlayer.locale());

  /** a reactive signal for the content */
  const [content, setContent] = createSignal<any>({});

  /** whenever `key` or `locale` change, refresh the dictionary */
  createEffect(() => {
    const next = getIntlayer(key, localeTarget());
    setContent(next as any);
  });

  return content();
};
