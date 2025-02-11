'use client';

import { useEffect } from 'react';
import { useCommunicator } from './CommunicatorContext';
import { type MessageKey } from './messageKey';

/**
 * useCrossFrameMessageListener
 *
 * This React hook listens for messages sent via the `postMessage` API and triggers a callback
 * whenever a message of the specified type (`key`) is received. It is useful for synchronizing
 * state or events across different windows, iframes, or contexts.
 *
 * @template S - The type of the data payload in the message.
 * @param {`${MessageKey}` | `${MessageKey}/post` | `${MessageKey}/get`} key - A unique identifier for the message type to listen for.
 * @param {(data: S) => void} [onEventTriggered] - A callback function triggered when a message
 * with the specified key is received. The callback receives the message data as its argument.
 *
 * @returns {{ postMessage: (data: S) => void }} An object containing a `postMessage` function
 * that allows broadcasting messages with the specified key and data.
 */
export const useCrossFrameMessageListener = <S,>(
  key: `${MessageKey}` | `${MessageKey}/post` | `${MessageKey}/get`,
  onEventTriggered?: (data: S) => void
) => {
  const { allowedOrigins, postMessage } = useCommunicator();

  useEffect(() => {
    if (onEventTriggered) {
      /**
       * Message handler to process incoming messages.
       *
       * - **Message Filtering:** Ensures only messages with the specified `key` are processed.
       * - **Origin Validation:** Checks that the origin of the message is within the allowed origins.
       *
       * @param {MessageEvent<{ type: string; data: S }>} event - The incoming message event object.
       */
      const handleMessage = (
        event: MessageEvent<{ type: string; data: S }>
      ) => {
        // Ignore messages that do not match the current key
        if (event.data.type !== key) return;

        // Check if the message origin is allowed
        if (
          typeof allowedOrigins === 'undefined' ||
          allowedOrigins?.includes(event.origin) ||
          allowedOrigins?.includes('*')
        ) {
          // Update the local state with the received data
          onEventTriggered(event.data.data);
        }
      };

      window.addEventListener('message', handleMessage);

      // Clean up the event listener on unmount
      return () => window.removeEventListener('message', handleMessage);
    }
  }, [key, onEventTriggered, allowedOrigins]);

  /**
   * A wrapper function around the `postMessage` function to broadcast messages efficiently.
   *
   * - **Encapsulation:** Ensures the `postMessage` function is scoped to the provided key.
   * - **Ease of Use:** Simplifies broadcasting messages with consistent type and format.
   *
   * @param {S} data - The data payload to include in the message.
   * @returns {void}
   */
  const postMessageWrapper: (data: S) => void = (data) => {
    postMessage({ type: key, data });
  };

  return postMessageWrapper;
};
