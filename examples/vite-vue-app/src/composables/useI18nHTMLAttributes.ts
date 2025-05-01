import { getHTMLTextDir } from 'intlayer';
import { watch } from 'vue';
import { useLocale } from 'vue-intlayer';

/**
 * Composable that updates the HTML <html> element's `lang` and `dir` attributes
 * based on the current locale.
 */
export const useI18nHTMLAttributes = () => {
  const { locale } = useLocale();

  // Update the HTML attributes whenever the locale changes
  watch(
    () => locale.value,
    (newLocale) => {
      if (!newLocale) return;

      // Update the language attribute
      document.documentElement.lang = newLocale;

      // Set the text direction (ltr for most languages, rtl for Arabic, Hebrew, etc.)
      document.documentElement.dir = getHTMLTextDir(newLocale);
    },
    { immediate: true }
  );
};
