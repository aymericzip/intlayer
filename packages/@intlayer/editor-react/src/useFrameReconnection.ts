'use client';

import { useEffect, useRef } from 'react';

/** Delay between two probes of a disconnected application. */
export const FRAME_RECONNECTION_INTERVAL_MS = 3_000;

/**
 * Whether the application answers. `no-cors` resolves on any HTTP answer and
 * only rejects on a network failure: the editor origin is rarely in the
 * application's CORS allowlist.
 */
export const isApplicationReachable = (
  applicationURL: string
): Promise<boolean> =>
  fetch(applicationURL, { method: 'HEAD', mode: 'no-cors', cache: 'no-store' })
    .then(() => true)
    .catch(() => false);

export type FrameReconnectionOptions = {
  applicationURL: string | undefined;
  /** The frame lost (or never got) its connection to the editor. */
  isDisconnected: boolean;
  /** Reloads the application frame. */
  reloadFrame: () => void;
  intervalMs?: number;
};

/**
 * Reconnects a disconnected application frame: the frame is reloaded once
 * when the application still answers (e.g. it reloaded while its dev server
 * restarted), then each time it answers again after being unreachable.
 */
export const useFrameReconnection = ({
  applicationURL,
  isDisconnected,
  reloadFrame,
  intervalMs = FRAME_RECONNECTION_INTERVAL_MS,
}: FrameReconnectionOptions): void => {
  // Kept across probes: one reload per reachable period, so a frame that
  // never connects (framing refused, editor disabled) is not reloaded forever
  const hasReloadedRef = useRef(false);
  const reloadFrameRef = useRef(reloadFrame);
  reloadFrameRef.current = reloadFrame;

  useEffect(() => {
    if (!isDisconnected) {
      hasReloadedRef.current = false;
      return;
    }

    if (!applicationURL) return;

    let isCancelled = false;

    const probe = async () => {
      const isReachable = await isApplicationReachable(applicationURL);

      if (isCancelled) return;

      if (!isReachable) {
        hasReloadedRef.current = false;
        return;
      }

      if (hasReloadedRef.current) return;

      hasReloadedRef.current = true;
      reloadFrameRef.current();
    };

    void probe();
    const interval = setInterval(() => void probe(), intervalMs);

    return () => {
      isCancelled = true;
      clearInterval(interval);
    };
  }, [applicationURL, isDisconnected, intervalMs]);
};
