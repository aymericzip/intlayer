export const removeUndefinedValueObject = <T extends Record<string, unknown>>(
  obj: T
): T => {
  const newObj: T = {} as T;

  for (const key in obj) {
    if (obj[key] !== undefined) {
      newObj[key] = obj[key];
    }
  }

  Object.freeze(newObj);

  return newObj;
};
