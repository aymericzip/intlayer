import { workspace } from 'vscode';

/**
 * Replaces absolute paths in a string with relative paths based on the VS Code workspace.
 * Adds a leading slash to the relative path to match the user's preference.
 */
export const formatResult = (result: string): string => {
  // Regex to find potential absolute paths (starting with /)
  // We look for patterns like /Users/... or /home/... etc.
  // We match until a space or end of string.
  return result.replace(/\/[^\s]+/g, (match) => {
    try {
      const relative = workspace.asRelativePath(match, false);

      // if asRelativePath returns a different string, it managed to make it relative
      if (relative !== match) {
        // Return with leading slash as requested
        return `/${relative}`;
      }
    } catch {
      // Ignore errors in path processing
    }

    return match;
  });
};
