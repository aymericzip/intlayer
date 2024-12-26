export const removeObjectKeys = <
  T extends Record<string, unknown>,
  K extends (keyof T)[],
>(
  obj: T,
  keys: K
): Omit<T, K[number]> => {
  const result = { ...obj };
  for (const key of keys) {
    delete result[key];
  }

  return result;
};
