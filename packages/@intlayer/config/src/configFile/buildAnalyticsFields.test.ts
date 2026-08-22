import { describe, expect, it } from 'vitest';
import { buildAnalyticsFields } from './buildBrowserConfiguration';

describe('buildAnalyticsFields', () => {
  it('should enable analytics by default when the package is installed', () => {
    expect(buildAnalyticsFields(undefined, true).enabled).toBe(true);
  });

  it('should disable analytics by default when the package is missing', () => {
    expect(buildAnalyticsFields(undefined, false).enabled).toBe(false);
  });

  it('should let an explicit value win over the package detection', () => {
    expect(buildAnalyticsFields({ enabled: true }, false).enabled).toBe(true);
    expect(buildAnalyticsFields({ enabled: false }, true).enabled).toBe(false);
  });

  it('should assume the package is available for browser callers', () => {
    expect(buildAnalyticsFields().enabled).toBe(true);
  });

  it('should apply the flush interval and sample rate defaults', () => {
    const analytics = buildAnalyticsFields();

    expect(analytics.flushInterval).toBe(20_000);
    expect(analytics.sampleRate).toBe(1);
  });
});
