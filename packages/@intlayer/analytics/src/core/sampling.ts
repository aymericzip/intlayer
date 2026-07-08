import { hashString } from '../utils/hash';

/**
 * Deterministic per-session sampling gate. Using the session id (rather than a
 * fresh random draw per event) means a sampled-in session reports *all* of its
 * content exposures, keeping per-session funnels consistent instead of leaving
 * holes.
 *
 * @param sessionId - The current anonymous session id.
 * @param sampleRate - Fraction of sessions to keep, from 0 (none) to 1 (all).
 * @returns `true` when this session's events should be recorded.
 *
 * @example
 * isSampledIn('abc', 1);   // always true
 * isSampledIn('abc', 0);   // always false
 * isSampledIn('abc', 0.5); // stable per session
 */
export const isSampledIn = (sessionId: string, sampleRate: number): boolean => {
  if (sampleRate >= 1) return true;
  if (sampleRate <= 0) return false;

  const bucket = hashString(sessionId) / 0xffffffff;
  return bucket < sampleRate;
};
