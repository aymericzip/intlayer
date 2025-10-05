import {
  computed,
  effect,
  type Injector,
  type Signal,
  signal,
} from '@angular/core';
import { MessageKey } from '@intlayer/editor';
import { createSharedComposable } from './createSharedComposable';
import { useCrossFrameMessageListener } from './useCrossFrameMessageListener';

/* ------------------------------------------------------------------ */
/*  public type – identical to the React version                       */
/* ------------------------------------------------------------------ */
export type EditorEnabledStateProps = {
  wrapperEnabled: Signal<boolean>;
  isInIframe: Signal<boolean>;
  enabled: Signal<boolean>;
};

/**
 * Singleton instance
 */
let instance: EditorEnabledStateProps | null = null;

const _INTLAYER_EDITOR_ENABLED_SYMBOL = Symbol('EditorEnabled');

/**
 * Creates an editor wrapperEnabled client
 */
export const createEditorEnabledClient = () => {
  if (instance) return instance;

  const wrapperEnabledSignal = signal(false);
  const isInIframeSignal = signal(false);
  const enabledSignal = computed(
    () => wrapperEnabledSignal() && isInIframeSignal()
  );

  instance = {
    wrapperEnabled: wrapperEnabledSignal.asReadonly(),
    isInIframe: isInIframeSignal.asReadonly(),
    enabled: enabledSignal,
  };

  return instance;
};

/**
 * Helper to install the editor wrapperEnabled state into the injector
 */
export const installEditorEnabled = (_injector: Injector) => {
  const _client = createEditorEnabledClient();

  // Angular doesn't have a direct equivalent to Vue's app.provide
  // The client is stored as a singleton and accessed via createEditorEnabledClient
};

export const useEditorEnabled = createSharedComposable(() => {
  const client = createEditorEnabledClient();

  if (!client) {
    throw new Error('EditorEnabled state not found');
  }

  // Listen for the iframe parent if the editor send a message `INTLAYER_EDITOR_ENABLED`
  useCrossFrameMessageListener<boolean>(
    `${MessageKey.INTLAYER_EDITOR_ENABLED}/post`,
    (data) => {
      (client.wrapperEnabled as any).set(data);
    }
  );

  // Use effect to set up the iframe check immediately
  effect(
    () => {
      if (typeof window !== 'undefined') {
        (client.isInIframe as any).set(window.self !== window.top);
      }
    },
    { allowSignalWrites: true }
  );

  return client;
});
