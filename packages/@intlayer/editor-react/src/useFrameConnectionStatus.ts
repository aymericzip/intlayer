'use client';

import { useCallback, useEffect, useState } from 'react';
import { useEditorEnabled } from './EditorEnabledContext';

/** Delay after a frame load before an unanswered handshake counts as failed. */
export const FRAME_CONNECTION_TIMEOUT_MS = 5_000;

export type FrameConnectionStatus = {
  /**
   * The frame loaded but its client never answered the handshake: the page
   * refused to be framed (CSP `frame-ancestors`, `X-Frame-Options`), or it
   * does not run the editor client.
   */
  isConnectionFailed: boolean;
  /** To call on every `load` event of the application frame. */
  handleFrameLoad: () => void;
  /** Hides the failure until the next load. */
  dismiss: () => void;
};

/**
 * Detects an application frame that never connects to the editor.
 * A frame blocked by the application's framing policy still fires `load` on
 * an empty error page that the parent cannot inspect, so the missing
 * handshake is the only signal available.
 */
export const useFrameConnectionStatus = (
  timeoutMs: number = FRAME_CONNECTION_TIMEOUT_MS
): FrameConnectionStatus => {
  const { enabled } = useEditorEnabled();
  const [loadCount, setLoadCount] = useState(0);
  const [isTimedOut, setIsTimedOut] = useState(false);

  useEffect(() => {
    if (enabled || loadCount === 0) return;

    const timeout = setTimeout(() => setIsTimedOut(true), timeoutMs);

    return () => clearTimeout(timeout);
  }, [enabled, loadCount, timeoutMs]);

  const handleFrameLoad = useCallback(() => {
    setIsTimedOut(false);
    setLoadCount((count) => count + 1);
  }, []);

  const dismiss = useCallback(() => setIsTimedOut(false), []);

  return {
    isConnectionFailed: isTimedOut && !enabled,
    handleFrameLoad,
    dismiss,
  };
};
