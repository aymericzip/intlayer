import react, { use } from 'react';

export const useLoadDynamic = <T>(_key: string, promise: Promise<T>): T => {
  /** @ts-ignore remove error Property 'cache' does not exist on type 'typeof React'. */
  const cachedPromise = react.cache(async () => await promise)();

  const dictionary = use(cachedPromise);

  return dictionary;
};
