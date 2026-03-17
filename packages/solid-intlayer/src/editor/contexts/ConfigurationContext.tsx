import type { IntlayerConfig } from '@intlayer/types/config';
import { createSignal, onCleanup } from 'solid-js';
import { useEditorStateManager } from './EditorProvider';

export const useConfiguration = () => {
  const manager = useEditorStateManager();
  const [config, setConfigSignal] = createSignal<IntlayerConfig | undefined>(
    manager.configuration.value
  );

  const handler = (e: Event) =>
    setConfigSignal((e as CustomEvent<IntlayerConfig>).detail);
  manager.configuration.addEventListener('change', handler);
  onCleanup(() => manager.configuration.removeEventListener('change', handler));

  return config;
};
