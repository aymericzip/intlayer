import react, { use } from 'react';

const cacheFallback = () => () => ({ value: undefined });

export const useLoadDynamic = <T>(_key: string, promise: Promise<T>): T => {
  /** @ts-ignore remove error Property 'cache' does not exist on type 'typeof React'. */
  const cache = react.cache ?? cacheFallback;

  const cachedPromise = cache(async () => await promise)();

  const dictionary = use(cachedPromise);

  return dictionary;
};
