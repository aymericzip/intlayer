import { COMPILER_DICTIONARY_KEY_PREFIX } from '@intlayer/config/defaultValues';
import { camelCaseToKebabCase } from '@intlayer/config/utils';
import { detectExportedComponentName } from '@intlayer/engine/cli';

/**
 * File names set by routing conventions (Next.js `page.tsx`, SvelteKit
 * `+page.svelte`, Remix `_index.tsx`…): the folder names the component.
 */
const CONVENTIONAL_FILE_NAMES = new Set([
  'index',
  '_index',
  'page',
  'layout',
  'template',
  'loading',
  'error',
  'global-error',
  'not-found',
  'default',
  'route',
  '+page',
  '+layout',
  '+error',
  '$',
]);

/**
 * Route folders that name a parameter or a group rather than a page:
 * `[slug]`, `(marketing)`, `{-$locale}`, `$id`, `@modal`.
 */
const isRouteParameterSegment = (segment: string): boolean =>
  /^[[({$@]/.test(segment);

/** Kebab-case key made of letters, digits and dashes only. */
const toDictionaryKeyName = (name: string): string =>
  camelCaseToKebabCase(name)
    .replace(/[^a-z0-9-]+/g, '-')
    .replace(/-{2,}/g, '-')
    .replace(/^-|-$/g, '');

/**
 * Extracts a dictionary key from a file path. Conventional file names
 * (`index`, `page`, `+page`…) take the name of the closest folder that is
 * not a route parameter or group.
 *
 * Example: "src/components/MyComponent/index.tsx" -> "my-component"
 * Example: "app/[locale]/(marketing)/about/page.tsx" -> "about"
 */
export const extractDictionaryKeyFromPath = (
  filePath: string,
  prefix = COMPILER_DICTIONARY_KEY_PREFIX
): string => {
  const pathParts = filePath.split(/[\\/]/).filter(Boolean);
  const fileNameWithExtension = pathParts.pop() ?? '';
  const lastDotIndex = fileNameWithExtension.lastIndexOf('.');
  const fileBaseName =
    lastDotIndex > 0
      ? fileNameWithExtension.slice(0, lastDotIndex)
      : fileNameWithExtension;

  let baseName = fileBaseName;

  if (CONVENTIONAL_FILE_NAMES.has(fileBaseName.toLowerCase())) {
    const folderName = [...pathParts]
      .reverse()
      .find((segment) => !isRouteParameterSegment(segment));

    if (folderName) baseName = folderName;
  }

  return `${prefix}${toDictionaryKeyName(baseName) || toDictionaryKeyName(fileBaseName) || 'content'}`;
};

export const extractDictionaryKey = (
  filePath: string,
  fileText: string,
  prefix = COMPILER_DICTIONARY_KEY_PREFIX
): string => {
  const componentName = detectExportedComponentName(fileText);

  if (componentName) {
    return `${prefix}${toDictionaryKeyName(componentName)}`;
  }

  return extractDictionaryKeyFromPath(filePath, prefix);
};
