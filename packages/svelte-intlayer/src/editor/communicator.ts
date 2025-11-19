import configuration from '@intlayer/config/built';
import { getContext, setContext } from 'svelte';
import { type Writable, writable } from 'svelte/store';

const randomUUID = () => Math.random().toString(36).slice(2);

export type Communicator = {
  postMessage: typeof window.postMessage;
  allowedOrigins?: string[];
  senderId: string;
};

const { editor } = configuration;

const postMessage = (data: any) => {
  if (typeof window === 'undefined') return;

  const isInIframe = window.self !== window.top;

  if (!isInIframe) return;

  if (editor.applicationURL.length > 0) {
    window.postMessage(data, editor.applicationURL);
  }

  if (editor.editorURL.length > 0) {
    window.parent.postMessage(data, editor.editorURL);
  }

  if (editor.cmsURL.length > 0) {
    window.parent.postMessage(data, editor.cmsURL);
  }
};

export type CommunicatorOptions = Omit<Communicator, 'senderId'>;

const defaultValue: Communicator = {
  postMessage,
  allowedOrigins: [
    editor?.applicationURL,
    editor?.editorURL,
    editor?.cmsURL,
  ] as string[],
  senderId: randomUUID(),
};

const COMMUNICATOR_KEY = Symbol('INTLAYER_COMMUNICATOR');

export const createCommunicator = (
  options: Partial<CommunicatorOptions> = {}
) => {
  const store = writable<Communicator>({
    ...defaultValue,
    ...options,
  });
  setContext(COMMUNICATOR_KEY, store);
  return store;
};

export const useCommunicator = (): Writable<Communicator> => {
  let context: Writable<Communicator> | undefined;

  // `getContext` must only run inside a component.
  // If this is called in plain JS, we catch the error and fallback.
  try {
    context = getContext<Writable<Communicator>>(COMMUNICATOR_KEY);
  } catch {
    // called outside component -> ignore, we’ll use global store
  }

  if (!context) {
    return createCommunicator();
  }

  return context;
};
