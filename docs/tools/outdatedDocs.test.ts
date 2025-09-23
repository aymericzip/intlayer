import { describe, expect, it } from 'vitest';
import { runOutdatedDocsTest } from './outdatedDocs';

/**
 * Set FAIL_ON_OUTDATED_DOCS=true to make the test fail when outdated docs are detected.
 * Otherwise, it will only log the outdated pairs.
 */
const shouldFail =
  String(process.env.FAIL_ON_OUTDATED_DOCS).toLowerCase() === 'true';

describe('Outdated Docs', () => {
  it('should detect and report translations that are not up to date', () => {
    const result = runOutdatedDocsTest(shouldFail);

    if (shouldFail) {
      expect(result.details.length).toBe(0);
    } else {
      // Only log; do not fail
      console.log(`Outdated pairs found: ${result.details.length}`);
    }
  }, 60000); // 60s timeout
});
