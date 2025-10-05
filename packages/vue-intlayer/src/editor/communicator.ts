import configuration from '@intlayer/config/built';
import { v4 as uuid } from 'uuid';
import { type App, inject, reactive } from 'vue';

/**
 * Interface defining a cross-frame communicator
 */
export type Communicator = {
  postMessage: typeof window.postMessage;
  allowedOrigins?: string[];
  senderId: string;
};

/**
 * Configuration options for the communicator
 */
export type CommunicatorOptions = Omit<Communicator, 'senderId'>;

const { editor } = configuration;

/**
 * Default values for the communicator
 */
const defaultValue: Communicator = {
  postMessage: () => null,
  allowedOrigins: [
    editor?.applicationURL,
    editor?.editorURL,
    editor?.cmsURL,
  ] as string[],
  senderId: '',
};

/**
 * Singleton instance
 */
let instance: Communicator | null = null;

const INTLAYER_COMMUNICATOR_SYMBOL = Symbol('Communicator');

/**
 * Creates a communicator client
 * @param options - Options for configuring the communicator
 */
export const createCommunicator = (
  options: CommunicatorOptions = { postMessage: () => null }
) => {
  if (instance) return instance;

  instance = reactive({
    ...defaultValue,
    ...options,
    senderId: uuid(),
  });

  return instance;
};

/**
 * Helper to install the Intlayer communicator into the app
 */
export const installCommunicator = (
  app: App,
  options: CommunicatorOptions = { postMessage: () => null }
) => {
  const client = createCommunicator(options);

  app.provide(INTLAYER_COMMUNICATOR_SYMBOL, client);
};

/**
 * Hook to access the communicator
 * @returns The communicator instance
 */
export const useCommunicator = (): Communicator => {
  try {
    return inject(INTLAYER_COMMUNICATOR_SYMBOL, defaultValue);
  } catch (_error) {
    console.warn(
      'useCommunicator: inject can only be used in setup(). Returning default communicator.'
    );
    return {
      postMessage: () => null,
      senderId: '',
    };
  }
};
