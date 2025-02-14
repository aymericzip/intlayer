'use client';

import { useCallback, useEffect, useMemo } from 'react';
import { useCommunicator } from './CommunicatorContext';
import { type MessageKey } from './messageKey';

/**
 * Compare two URLs for equality.
 * This function is used to determine if a message originates from the same origin.
 *
 * ```js
 * // Example usage
 * console.log(compareUrls("http://localhost:5173/", "http://localhost:5173")); // true
 * console.log(compareUrls("http://localhost:5173", "http://localhost:5173?myParam=true")); // true
 * console.log(compareUrls("http://localhost:5173/subpath", "http://localhost:5173")); // true
 * console.log(compareUrls("http://localhost:5172", "http://localhost:5173")); // false
 * ```
 *
 * @param url1 - The first URL to compare.
 * @param url2 - The second URL to compare.
 * @returns Whether the two URLs are equal.
 */
const compareUrls = (url1: string, url2: string): boolean => {
  try {
    const parsedUrl1 = new URL(url1);
    const parsedUrl2 = new URL(url2);

    // Compare protocol, hostname, and port
    if (
      parsedUrl1.protocol !== parsedUrl2.protocol ||
      parsedUrl1.hostname !== parsedUrl2.hostname ||
      parsedUrl1.port !== parsedUrl2.port
    ) {
      return false;
    }

    // One URL should not have a subpath while the other does
    const path1 = parsedUrl1.pathname.replace(/\/$/, ''); // Remove trailing slash
    const path2 = parsedUrl2.pathname.replace(/\/$/, '');

    if (path1 !== '' && path2 !== '' && path1 !== path2) {
      return false;
    }

    return true;
  } catch (error) {
    console.error('Invalid URL(s)', error);
    return false;
  }
};

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
          allowedOrigins?.some((url) => compareUrls(url, event.origin)) ||
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
  }, [allowedOrigins, postMessage, senderId]);

  /**
   * A wrapper function around the `postMessage` function to broadcast messages efficiently.
   *
   * - **Encapsulation:** Ensures the `postMessage` function is scoped to the provided key.
   * - **Ease of Use:** Simplifies broadcasting messages with consistent type and format.
   *
   * @param {S} data - The data payload to include in the message.
   * @returns {void}
   */
  const postMessageWrapper: (data: S) => void = useCallback(
    (data) => {
      postMessage({ type: key, data, senderId });
    },
    [postMessage, key, senderId]
  );

  return useMemo(() => postMessageWrapper, [postMessageWrapper]);
};
