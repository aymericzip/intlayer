import type { Document } from 'mongoose';

/**
 * If the dictionary is a mongoose document, convert it to an object
 * @param potentialDocument - The potential document to convert.
 * @returns The potential document converted to an object.
 */
export const ensureMongoDocumentToObject = <T extends object | Document>(
  potentialDocument: T
): T => {
  let potentialObject: T = potentialDocument as T;

  // If the user is a mongoose document, convert it to an object
  if (typeof (potentialDocument as Document).toObject === 'function') {
    potentialObject = (potentialDocument as Document).toObject();
  }

  return potentialObject as T;
};
