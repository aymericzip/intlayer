import pLimit from 'p-limit';

export const parallelize = async <T, R>(
  items: T[],
  callback: (item: T) => Promise<R>,
  parallelLimit: number = 10
): Promise<R[]> => {
  const limit = pLimit(parallelLimit);
  return Promise.all(items.map((item) => limit(() => callback(item))));
};
