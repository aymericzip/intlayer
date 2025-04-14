/**
 * Compare two semver-like version strings (e.g. "15.10.4" vs "15.3.4").
 *
 * @param version1 - first version string
 * @param version2 - second version string
 * @param comparison - type of comparison: 'gt', 'lt', 'eq', 'gte', 'lte'
 * @returns boolean indicating if version1 meets the specified comparison condition vs version2
 */
export const compareVersions = (
  version1: string,
  version2: string,
  comparison: 'gt' | 'lt' | 'eq' | 'gte' | 'lte'
): boolean => {
  const v1Parts = version1.split('.').map(Number);
  const v2Parts = version2.split('.').map(Number);
  const maxLen = Math.max(v1Parts.length, v2Parts.length);

  // Compute a basic -1, 0, or 1 comparison
  let result = 0;
  for (let i = 0; i < maxLen; i++) {
    const part1 = v1Parts[i] || 0;
    const part2 = v2Parts[i] || 0;
    if (part1 > part2) {
      result = 1;
      break;
    } else if (part1 < part2) {
      result = -1;
      break;
    }
  }

  switch (comparison) {
    case 'gt':
      return result === 1;
    case 'lt':
      return result === -1;
    case 'eq':
      return result === 0;
    case 'gte':
      return result === 0 || result === 1;
    case 'lte':
      return result === 0 || result === -1;
  }
};
