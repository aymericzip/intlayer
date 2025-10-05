import { describe, expect, it } from 'vitest';
import { resolveObjectPromises } from './resolveObjectPromises';

const delay = async (ms: number) => {
  await new Promise((resolve) => setTimeout(resolve, ms));
};

const testCase = {
  test1: 1,
  test2: () => 2,
  test3: async () => 3,
  test4: [
    41,
    () => 42,
    async () => {
      await delay(100);
      return 43;
    },
    [
      Promise.resolve(44),
      async () => {
        await delay(100);
        return 45;
      },
      46,
    ],
  ],
  test5: {
    test51: () => 51,
    test52: () => 52,
    test53: () => 53,
  },
  test6: {
    test61: {
      test611: 611,
      test612: 612,
      test613: 613,
    },
  },
  test7: {
    test71: async () => {
      await delay(100);
      return {
        test711: async () => 711,
        test712: async () => {
          await delay(100);
          return 712;
        },
        test713: async () => {
          await delay(100);
          return [
            7131,
            async () => {
              await delay(100);
              return 7132;
            },
            async () => {
              await delay(100);
              return 7133;
            },
            7134,
          ];
        },
        test714: 714,
      };
    },
  },
  test8: 8,
};

const testCaseResolved = {
  test1: 1,
  test2: 2,
  test3: 3,
  test4: [41, 42, 43, [44, 45, 46]],
  test5: {
    test51: 51,
    test52: 52,
    test53: 53,
  },
  test6: {
    test61: {
      test611: 611,
      test612: 612,
      test613: 613,
    },
  },
  test7: {
    test71: {
      test711: 711,
      test712: 712,
      test713: [7131, 7132, 7133, 7134],
      test714: 714,
    },
  },
  test8: 8,
};

describe('resolveObjectPromises', () => {
  it('should the result be in the same order as the original object', async () => {
    const resolved = await resolveObjectPromises<typeof testCase>(testCase);

    // Stringify the objects to ensure the order of the keys is the same
    expect(JSON.stringify(resolved)).toStrictEqual(
      JSON.stringify(testCaseResolved)
    );
  });
});
