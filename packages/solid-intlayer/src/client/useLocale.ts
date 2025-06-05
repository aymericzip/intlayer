import type { LocalesValues } from '@intlayer/config/client';
import { Accessor } from 'solid-js';
import { useIntlayerContext } from './installIntlayer';

export const useLocale = (): [
  Accessor<LocalesValues>,
  (locale: LocalesValues) => void,
] => {
  const intlayer = useIntlayerContext();

  return [intlayer.locale, intlayer.setLocale];
};
