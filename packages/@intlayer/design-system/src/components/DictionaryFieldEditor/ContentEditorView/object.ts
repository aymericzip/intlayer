/**
 * Rename a key in an object by keeping the element order
 *
 * @param obj The original object
 * @param oldKey The key in the object that needs to be renamed
 * @param newKey The new key name to replace the old key
 * @returns A new object with the renamed key
 */
export const renameKey = <T extends object>(
  obj: T,
  oldKey: keyof T,
  newKey: string
): T => {
  // Create a shallow copy of the original object to avoid mutating it
  const newObj: T = { ...obj };

  // Iterate over all keys of the original object
  for (const key of Object.keys(obj)) {
    // Check if the current key is the one that needs to be renamed
    if (key === (oldKey as string)) {
      // Assign the value of the old key to the new key in newObj
      newObj[newKey as keyof T] = obj[oldKey];
      // Optionally, delete the old key from newObj if you don't want both keys
      delete newObj[oldKey];
    } else {
      // For all other keys, ensure they are copied over correctly
      newObj[key as keyof T] = obj[key as keyof T];
    }
  }
  // Return the new object with the renamed key
  return newObj;
};

/**
 * Remove a key from an object
 *
 * @param obj The original object
 * @param key The key in the object that needs to be removed
 * @returns A new object without the specified key
 */
export const removeKey = <T extends object>(obj: T, key: keyof T): T => {
  // Create a shallow copy of the original object to avoid mutating it
  const newObj: T = { ...obj };

  // Delete the key from the object
  delete newObj[key];

  return newObj;
};
