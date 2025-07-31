import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
  type Mock,
} from 'vitest';

// We are testing the public helper. The helper itself internally relies on
// `checkLastUpdateTime`, which hits the file-system. To keep the test
// deterministic (and independent from the real FS) we mock this dependency so
// that we can control the last modification date that the helper receives.

// NOTE: `vi.mock` must be called *before* the module under test is imported.
vi.mock('./checkLastUpdateTime', () => {
  return {
    checkLastUpdateTime: vi.fn(() => new Date()), // pretend the file was just modified
  };
});

import { checkFileModifiedRange } from './checkFileModifiedRange';
import { checkLastUpdateTime } from './checkLastUpdateTime';

describe('checkFileModifiedRange', () => {
  beforeEach(() => {
    // Use fake timers so Date.now() is deterministic.
    vi.useFakeTimers();
    // Pin the system time to an arbitrary date for reproducibility
    vi.setSystemTime(new Date('2025-01-01'));
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.clearAllMocks();
  });

  const testList = [
    {
      // |---a---|
      fileModifiedTime: new Date('2025-01-01'), // a
      isSkipped: false, // No constraints
    },
    {
      // |-min-a-max-|
      skipIfModifiedBefore: '2024-01-01', // min
      skipIfModifiedAfter: '2026-01-01', // max
      fileModifiedTime: new Date('2025-01-01'), // a
      isSkipped: true, // During the range
    },
    {
      // |-min-max-a-|
      skipIfModifiedBefore: '2024-01-01', // min
      skipIfModifiedAfter: '2026-01-01', // max
      fileModifiedTime: new Date('2027-01-01'), // a
      isSkipped: false, // After the range
    },
    {
      // |-a-min-max-|
      skipIfModifiedBefore: '2024-01-01', // min
      skipIfModifiedAfter: '2026-01-01', // max
      fileModifiedTime: new Date('2023-01-01'), // a
      isSkipped: false, // Before the range
    },
    {
      // |-a-min-|
      skipIfModifiedBefore: '2024-01-01', // min
      fileModifiedTime: new Date('2023-01-01'), // a
      isSkipped: false, // Before the skipIfModifiedBefore
    },
    {
      // |-min-a-|
      skipIfModifiedBefore: '2024-01-01', // min
      fileModifiedTime: new Date('2025-01-01'), // a
      isSkipped: true, // After the skipIfModifiedBefore
    },
    {
      // |-a-max-|
      skipIfModifiedAfter: '2026-01-01', // max
      fileModifiedTime: new Date('2027-01-01'), // a
      isSkipped: true, // Before the skipIfModifiedAfter
    },
    {
      // |-max-a-|
      skipIfModifiedAfter: '2026-01-01', // max
      fileModifiedTime: new Date('2027-01-01'), // a
      isSkipped: true, // After the skipIfModifiedAfter
    },
    {
      // |-min-max-a-|
      skipIfModifiedBefore: 3 * 365 * 24 * 60 * 60 * 1000, // min // 3 year ago
      skipIfModifiedAfter: 1 * 365 * 24 * 60 * 60 * 1000, // max // 1 year
      fileModifiedTime: new Date('2025-01-01'), // a
      isSkipped: false, // Before the range
    },
    {
      // |-a-max-|
      skipIfModifiedAfter: 0, // max // now
      fileModifiedTime: new Date('2024-01-01'), // a
      isSkipped: false, // Before the skipIfModifiedAfter
    },
    {
      // |-min-a-|
      skipIfModifiedAfter: 1 * 365 * 24 * 60 * 60 * 1000, // max // 1 year
      fileModifiedTime: new Date('2025-01-01'), // a
      isSkipped: true, // Before the skipIfModifiedAfter
    },
    {
      // |-min-a-max-|
      skipIfModifiedBefore: 3 * 365 * 24 * 60 * 60 * 1000, // min // 3 year ago
      skipIfModifiedAfter: 1 * 365 * 24 * 60 * 60 * 1000, // max // 1 year
      fileModifiedTime: new Date('2023-01-01'), // a
      isSkipped: true, // After the range
    },
    {
      // |-a-min-max-|
      skipIfModifiedBefore: 3 * 365 * 24 * 60 * 60 * 1000, // min // 3 year ago
      skipIfModifiedAfter: 1 * 365 * 24 * 60 * 60 * 1000, // max // 1 year
      fileModifiedTime: new Date('2020-01-01'), // a
      isSkipped: false, // Before the range
    },
    {
      // |-min-max-a-|
      skipIfModifiedBefore: '2024-01-01T00:00:00Z', // min
      skipIfModifiedAfter: '2026-01-01T00:00:00Z', // max
      fileModifiedTime: new Date('2027-01-01'), // a
      isSkipped: false, // After the range
    },
  ];

  testList.forEach((test) => {
    it(`should correctly handle string date inputs (absolute time) outside of the range`, () => {
      const filePath = 'test/file.txt';

      // Simulate the file's last modification time for this test case
      (checkLastUpdateTime as unknown as Mock).mockReturnValue(
        // If a specific mocked modification time is provided, use it. Otherwise, fall back to "now".
        test.fileModifiedTime ?? new Date()
      );

      const { isSkipped } = checkFileModifiedRange(filePath, {
        skipIfModifiedBefore: test.skipIfModifiedBefore,
        skipIfModifiedAfter: test.skipIfModifiedAfter,
      });

      expect(isSkipped).toBe(test.isSkipped);
    });
  });
});
