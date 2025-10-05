import type { Injector } from '@angular/core';
import configuration from '@intlayer/config/built';
import { v4 as uuid } from 'uuid';

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

  instance = {
    ...defaultValue,
    ...options,
    senderId: uuid(),
  };

  return instance;
};

/**
 * Helper to install the Intlayer communicator into the injector
 */
export const installCommunicator = (
  injector: Injector,
  options: CommunicatorOptions = { postMessage: () => null }
) => {
  const client = createCommunicator(options);

  // Angular doesn't have a direct equivalent to Vue's app.provide
  // The client is stored as a singleton and accessed via createCommunicator
};

/**
 * Hook to access the communicator
 * @returns The communicator instance
 */
export const useCommunicator = (): Communicator => {
  try {
    const communicator = createCommunicator();
    return communicator || defaultValue;
  } catch (error) {
    console.warn(
      'useCommunicator: Error accessing communicator. Returning default communicator.'
    );
    return {
      postMessage: () => null,
      senderId: '',
    };
  }
};
