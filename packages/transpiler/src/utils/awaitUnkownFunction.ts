/* eslint-disable @typescript-eslint/no-explicit-any */

export const awaitUnknownFunction = async (fn: any) => {
  // Check if result is a Promise (Thenable)

  if (fn && typeof fn.then === 'function') {
    // It's a Promise, so wait for it to resolve
    return await fn;
  }

  // If not a Promise, it will just execute without awaiting
};
