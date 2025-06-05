import type { LocalesValues } from '@intlayer/config/client';
import { Dictionary } from '@intlayer/core';
import { createEffect, createMemo, createSignal } from 'solid-js';
import { getDictionary } from '../getDictionary';
import { useIntlayerContext } from './installIntlayer';

export const useDictionary = <T extends Dictionary>(
  dictionary: T,
  locale?: LocalesValues
): any => {
  const intlayer = useIntlayerContext();

  /** which locale should we use right now? */
  const localeTarget = createMemo(() => locale ?? intlayer.locale());

  /** a reactive signal for the content */
  const [content, setContent] = createSignal<any>({});

  /** whenever `dictionary` or `locale` change, refresh the content */
  createEffect(() => {
    const next = getDictionary(dictionary, localeTarget());
    setContent(next as any);
  });

  return content();
};
