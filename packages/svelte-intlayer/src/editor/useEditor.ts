import { defineIntlayerElements } from '@intlayer/editor';
import { onDestroy, onMount } from 'svelte';
import { createEditorStateManager } from './communicator';

export const useEditor = () => {
  if (typeof window === 'undefined') return;

  const manager = createEditorStateManager();

  try {
    onMount(() => {
      defineIntlayerElements();
      manager.start();
    });

    onDestroy(() => {
      manager.stop();
    });
  } catch {
    // Outside component context - start immediately
    defineIntlayerElements();
    manager.start();
  }
};
