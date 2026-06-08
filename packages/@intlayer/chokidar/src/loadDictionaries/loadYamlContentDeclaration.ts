import { readFile } from 'node:fs/promises';
import { parseYaml } from '@intlayer/core/utils';
import type { Dictionary } from '@intlayer/types/dictionary';

export const loadYamlContentDeclaration = async (
  path: string
): Promise<Dictionary | undefined> => {
  try {
    const fileContent = await readFile(path, 'utf-8');
    const parsed = parseYaml<Dictionary>(fileContent);

    if (!parsed || typeof parsed !== 'object') {
      console.error(`[intlayer] Invalid YAML content declaration: ${path}`);
      return undefined;
    }

    if (!parsed.key) {
      console.error(
        `[intlayer] Missing key in YAML content declaration: ${path}`
      );
      return undefined;
    }

    return parsed;
  } catch (error) {
    console.error(`Error loading YAML content declaration at ${path}:`, error);
    return undefined;
  }
};
