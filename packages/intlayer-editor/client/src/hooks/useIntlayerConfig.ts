import type { IntlayerConfig } from '@intlayer/types/config';
import { useEffect, useState } from 'preact/hooks';

/** Configuration served by the editor server at `/api/config`. */
export type EditorServerConfiguration = IntlayerConfig & {
  /**
   * `editor.enabled` as set in the application configuration (the served
   * `editor.enabled` is always forced on by the editor server).
   */
  isApplicationEditorEnabled: boolean;
};

let configurationPromise: Promise<EditorServerConfiguration> | undefined;

/** Fetches the configuration once, shared by every caller. */
const fetchConfiguration = (): Promise<EditorServerConfiguration> => {
  configurationPromise ??= fetch('/api/config')
    .then((response) => response.json())
    .then(
      (responseBody: { data: EditorServerConfiguration }) => responseBody.data
    )
    .catch((error: unknown) => {
      // Let the next caller retry
      configurationPromise = undefined;
      throw error;
    });

  return configurationPromise;
};

export const useIntlayerConfig = () => {
  const [intlayerConfig, setIntlayerConfig] =
    useState<EditorServerConfiguration>();

  useEffect(() => {
    fetchConfiguration().then(setIntlayerConfig);
  }, []);

  return intlayerConfig;
};
