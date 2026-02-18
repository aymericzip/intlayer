import configuration from '@intlayer/config/built';
import { getRewritePath } from '@intlayer/core/localization';
import type { Locale } from '@intlayer/types';
import { watch } from 'vue';
import { useLocale } from './useLocale';

/**
 * Client-side hook to manage URL rewrites in Vue without triggering a router navigation.
 * It uses `window.history.replaceState` to update the URL in the address bar.
 */
export const useRewriteURL = (): void => {
  const { locale } = useLocale();
  const rewrite = configuration?.routing?.rewrite;

  watch(
    locale,
    (loc) => {
      if (typeof window === 'undefined' || !rewrite) return;

      const pathname = window.location.pathname;
      const targetPath = getRewritePath(pathname, loc as Locale, rewrite);

      if (targetPath && targetPath !== pathname) {
        window.history.replaceState(
          window.history.state,
          '',
          targetPath + window.location.search + window.location.hash
        );
      }
    },
    { immediate: true }
  );
};
