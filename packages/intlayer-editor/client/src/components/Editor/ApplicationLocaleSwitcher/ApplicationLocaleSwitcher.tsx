import { LocaleSwitcher } from '@intlayer/design-system/locale-switcher-drop-down';
import {
  useConfiguration,
  useCrossURLPathState,
  useEditorLocale,
  useEditorStateManager,
} from '@intlayer/editor-react';
import type { Locale } from '@intlayer/types/allLocales';
import type { FunctionComponent, RefObject } from 'preact';
import { getLocalizedApplicationUrl } from './getLocalizedApplicationUrl';

/**
 * Switches the locale displayed by the application frame, using the
 * application configuration. The client is asked to apply the locale (state +
 * storage), and the frame is navigated when the routing puts it in the URL.
 */
export const ApplicationLocaleSwitcher: FunctionComponent<{
  iframeRef: RefObject<HTMLIFrameElement | null>;
  applicationURL: string;
  applicationPath: string;
}> = ({ iframeRef, applicationURL, applicationPath }) => {
  const configuration = useConfiguration();
  const editorStateManager = useEditorStateManager();
  const currentLocale = useEditorLocale();
  const iframePath = useCrossURLPathState();

  const locales = configuration?.internationalization.locales ?? [];

  if (!configuration || locales.length < 2) return null;

  const switchLocale = (locale: Locale) => {
    editorStateManager?.requestLocaleChange(locale);

    const currentPath = iframePath ?? applicationPath;
    const localizedUrl = getLocalizedApplicationUrl(
      applicationURL,
      currentPath,
      locale,
      configuration
    );
    const currentUrl = new URL(currentPath, applicationURL).href;
    const iframe = iframeRef.current;

    if (localizedUrl && iframe && localizedUrl !== currentUrl) {
      iframe.src = localizedUrl;
    }
  };

  return (
    <LocaleSwitcher
      locale={currentLocale}
      localeList={locales}
      setLocale={switchLocale}
      fullLocaleName={false}
      size="sm"
      variant="outline"
      color="text"
      border
      borderColor="neutral"
      roundedSize="2xl"
    />
  );
};
