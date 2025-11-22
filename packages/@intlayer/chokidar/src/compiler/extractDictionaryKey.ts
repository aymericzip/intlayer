import { basename, dirname, extname } from 'node:path';

/**
 * Attempt to detect an exported React component name in the file text.
 * Looks for patterns like:
 *   - export const MyComponent = ...
 *   - export function MyComponent(...)
 *   - export default function MyComponent(...)
 */
export const detectExportedComponentName = (
  fileText: string
): string | null => {
  // Added regexes for default ESM, default CJS, and named exports
  const defaultEsmFnRegex = /export\s+default\s+function\s+(\w+)/;
  const defaultEsmVarRegex = /export\s+default\s+(\w+)/;
  const cjsDefaultRegex = /module\.exports\s*=\s*(\w+)/;
  const cjsDefaultVarRegex = /exports\.default\s*=\s*(\w+)/;
  const namedExportRegex = /export\s+(?:const|function)\s+(\w+)/g;

  // 1) Check for default ESM function or variable
  const defaultEsmFnMatch = fileText.match(defaultEsmFnRegex);
  if (defaultEsmFnMatch) {
    return defaultEsmFnMatch[1];
  }

  const defaultEsmVarMatch = fileText.match(defaultEsmVarRegex);
  if (defaultEsmVarMatch) {
    return defaultEsmVarMatch[1];
  }

  // 2) Check for default CJS
  const cjsDefaultMatch =
    fileText.match(cjsDefaultRegex) || fileText.match(cjsDefaultVarRegex);
  if (cjsDefaultMatch) {
    return cjsDefaultMatch[1];
  }

  // 3) Otherwise, look for capitalized named exports
  for (const [, exportName] of fileText.matchAll(namedExportRegex)) {
    if (/^[A-Z]/.test(exportName)) {
      return exportName;
    }
  }

  // If we can’t find it, return null
  return null;
};

export const extractDictionaryKey = (
  filePath: string,
  fileText: string
): string => {
  const componentName = detectExportedComponentName(fileText);
  if (componentName) {
    return componentName;
  }

  const ext = extname(filePath);
  let baseName = basename(filePath, ext);

  if (baseName === 'index') {
    baseName = basename(dirname(filePath));
  }

  return baseName;
};
