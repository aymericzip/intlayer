/* @vitest-environment node */
import { listMissingTranslations } from 'intlayer/cli';
import { describe, expect, it } from 'vitest';

describe('listMissingTranslations', () => {
  it('should return the missing translations', () => {
    const result = listMissingTranslations();

    if (result.missingRequiredLocales.length > 0) {
      console.log(result.missingTranslations);
    }

    expect(result.missingRequiredLocales).toHaveLength(0);
  });
});
