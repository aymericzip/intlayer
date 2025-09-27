import { ESMxCJSRequire } from './ESMxCJSHelpers';

/**
 * Recursively clears the require cache for a module and all its dependencies
 */
export const clearModuleCache = (
  modulePath: string,
  visited = new Set<string>()
) => {
  // Avoid infinite loops
  if (visited.has(modulePath)) {
    return;
  }
  visited.add(modulePath);

  try {
    const resolvedPath = ESMxCJSRequire.resolve(modulePath);

    // Get the cached module
    const cachedModule = ESMxCJSRequire.cache[resolvedPath];

    if (cachedModule) {
      // Clear cache for all children (dependencies) first
      if (cachedModule.children) {
        cachedModule.children.forEach((child) => {
          clearModuleCache(child.filename, visited);
        });
      }

      // Clear the cache for this module
      delete ESMxCJSRequire.cache[resolvedPath];
    }
  } catch (error) {
    // Module might not exist or be resolvable, skip it
    console.warn(`Could not clear cache for module: ${modulePath}`, error);
  }
};
