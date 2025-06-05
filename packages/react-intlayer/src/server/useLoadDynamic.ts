/** @ts-ignore remove error Property 'cache' does not exist on type 'typeof React'. */
import { cache, use } from 'react';

export const useLoadDynamic = <T>(_key: string, promise: Promise<T>): T => {
  const cachedPromise = cache(async () => await promise)();

  const dictionary = use(cachedPromise);

  return dictionary;
};
