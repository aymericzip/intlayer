type Status = 'pending' | 'success' | 'error';

const createSuspender = <T>(promise: Promise<T>) => {
  let status: Status = 'pending';
  let result: T;
  const suspender = promise.then(
    (r) => {
      status = 'success';
      result = r;
    },
    (e) => {
      status = 'error';
      result = e as any;
    }
  );

  return {
    read() {
      if (status === 'pending') throw suspender;
      if (status === 'error') throw result;
      return result!;
    },
  };
};

const cache = new Map<string, ReturnType<typeof createSuspender>>();

export const useLoadDynamic = <T>(key: string, promise: Promise<T>) => {
  if (!cache.has(key)) {
    cache.set(key, createSuspender(promise));
  }

  return (cache.get(key)! as ReturnType<typeof createSuspender>).read() as T;
};
