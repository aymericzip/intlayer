import { ESMxCJSRequire, loadExternalFile } from '@intlayer/config';
import type { Dictionary } from '@intlayer/core';
import { processContentDeclaration } from '../transpiler/declaration_file_to_dictionary/intlayer_dictionary/processContentDeclaration';

export const loadContentDeclarations = async (
  contentDeclarationFilePath: string[],
  projectRequire = ESMxCJSRequire
): Promise<Dictionary[]> => {
  const contentDeclarations = contentDeclarationFilePath.map((path) => ({
    ...loadExternalFile(path, undefined, projectRequire),
    filePath: path,
  }));
  const resultDictionariesPaths: Dictionary[] = [];

  for await (const contentDeclaration of contentDeclarations) {
    if (!contentDeclaration) {
      continue;
    }

    const processedContentDeclaration = await processContentDeclaration(
      contentDeclaration as Dictionary
    );

    if (!processedContentDeclaration) {
      continue;
    }

    resultDictionariesPaths.push(processedContentDeclaration);
  }

  return resultDictionariesPaths;
};
