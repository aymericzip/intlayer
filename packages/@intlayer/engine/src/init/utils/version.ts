/**
 * Returns true when the dependency `version` range targets a major >= `major`.
 * Tolerant of leading range characters, e.g. `^16.0.0`, `~16`, `16.1.0`.
 */
export const isVersionAtLeast = (
  version: string | undefined,
  major: number
): boolean => {
  if (!version || typeof version !== 'string') return false;
  const match = version.match(/(\d+)/);
  if (!match?.[1]) return false;
  return parseInt(match[1], 10) >= major;
};
