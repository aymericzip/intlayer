import { describe, expect, it } from 'vitest';
import { applyAuditEvent, initialAuditScanState } from './auditScanState';
import { describeAuditScan } from './describeAuditScan';

describe('applyAuditEvent', () => {
  it('accumulates checks, score and completion', () => {
    const scanning = { ...initialAuditScanState, isScanning: true };
    const withCheck = applyAuditEvent(scanning, {
      type: 'url_htmlLang\\https://example.com',
      status: 'error',
      data: { errorsDetails: 'Missing lang' },
      score: 40,
    });
    const done = applyAuditEvent(withCheck, { progress: 100, score: 55 });

    expect(done.score).toBe(55);
    expect(done.isScanning).toBe(false);
    expect(done.isDone).toBe(true);
    expect(Object.keys(done.mergedData)).toEqual([
      'url_htmlLang\\https://example.com',
    ]);
  });

  it('stops the scan on a global error', () => {
    const failed = applyAuditEvent(
      { ...initialAuditScanState, isScanning: true },
      { globalError: 'Unreachable', progress: 100 }
    );

    expect(failed.error).toBe('Unreachable');
    expect(failed.isScanning).toBe(false);
    expect(failed.isDone).toBe(false);
  });
});

describe('describeAuditScan', () => {
  it('splits URL-scoped checks and counts statuses', () => {
    const description = describeAuditScan({
      ...initialAuditScanState,
      score: 70,
      mergedData: {
        'url_htmlLang\\https://example.com/fr': {
          status: 'error',
          data: { errorsDetails: 'Missing lang' },
        },
        robots_present: {
          status: 'success',
          data: { successDetails: 'Found' },
        },
      },
    });

    expect(description.summary).toEqual({
      total: 2,
      success: 1,
      warning: 0,
      error: 1,
    });
    expect(description.checks).toEqual([
      {
        check: 'url_htmlLang',
        section: 'page',
        url: 'https://example.com/fr',
        status: 'error',
        details: 'Missing lang',
      },
      {
        check: 'robots_present',
        section: 'robots',
        url: undefined,
        status: 'success',
        details: 'Found',
      },
    ]);
  });
});
