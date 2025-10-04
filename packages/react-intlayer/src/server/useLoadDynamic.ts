import react from 'react';

export const useLoadDynamic = <T>(_key: string, promise: Promise<T>): T => {
  /** @ts-expect-error remove error Property 'cache' does not exist on type 'typeof React'. */
  const cachedPromise = react.cache(async () => await promise)();

  /** @ts-expect-error remove error Property 'use' does not exist on type 'typeof React'. */
  const dictionary = react.use(cachedPromise);

  return dictionary;
};
