'use client';

import { compareUrls, type MessageKey } from '@intlayer/editor';
import { useEffect } from 'react';
import { useCommunicator } from './CommunicatorContext';

/**
 * useCrossFrameMessageListener
 *
 * This React hook listens for messages sent via the `postMessage` API and triggers a callback
 * whenever a message of the specified type (`key`) is received. It is useful for synchronizing
 * state or events across different windows, iframes, or contexts.
 *
 * @template S - The type of the data payload in the message.
 * @param key - A unique identifier for the message type to listen for.
 * @param [onEventTriggered] - A callback function triggered when a message
 * @param [revalidator] - A function that re-suscribes the listener. Could be usefull if onEventTriggered depend of some state
 * with the specified key is received. The callback receives the message data as its argument.
 *
 * @returns {{ postMessage: (data: S) => void }} An object containing a `postMessage` function
 * that allows broadcasting messages with the specified key and data.
 */
export const useCrossFrameMessageListener = <S,>(
  key: `${MessageKey}` | `${MessageKey}/post` | `${MessageKey}/get`,
  onEventTriggered?: (data: S) => void,
  revalidator?: any
) => {
  const { allowedOrigins, postMessage, senderId } = useCommunicator();

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
        event: MessageEvent<{ type: string; data: S; senderId: string }>
      ) => {
        const { type, data, senderId: msgSenderId } = event.data;

        // Ignore messages that do not match the current key
        if (type !== key) return;

        // Ignore messages from myself
        if (msgSenderId === senderId) return;

        // Check if the message origin is allowed
        if (
          typeof allowedOrigins === 'undefined' ||
          allowedOrigins
            ?.filter((url) => ![null, undefined, '', '*'].includes(url))
            .some((url) => compareUrls(url, event.origin)) ||
          allowedOrigins?.includes('*')
        ) {
          // Update the local state with the received data
          onEventTriggered(data);
        }
      };

      window.addEventListener('message', handleMessage);

      // Clean up the event listener on unmount
      return () => window.removeEventListener('message', handleMessage);
    }
  }, [allowedOrigins, postMessage, senderId, revalidator]);

  /**
   * A wrapper function around the `postMessage` function to broadcast messages efficiently.
   *
   * - **Encapsulation:** Ensures the `postMessage` function is scoped to the provided key.
   * - **Ease of Use:** Simplifies broadcasting messages with consistent type and format.
   *
   * @param {S} data - The data payload to include in the message.
   * @returns {void}
   */
  const postMessageWrapper: (data?: S) => void = (data) => {
    postMessage({ type: key, data, senderId });
  };

  return postMessageWrapper;
};
