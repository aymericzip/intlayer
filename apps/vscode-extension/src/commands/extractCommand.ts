import { relative, resolve } from 'node:path';
import {
  detectPackageName,
  extractContent,
  type PackageName,
} from '@intlayer/babel';
import {
  type GetConfigurationOptions,
  getConfiguration,
} from '@intlayer/config/node';
import { getUnmergedDictionaries } from '@intlayer/dictionaries-entry/unmerged';
import { RelativePattern, Uri, window, workspace } from 'vscode';
import { findAllProjectRoots, findProjectRoot } from '../utils/findProjectRoot';
import {
  clearConfigurationCache,
  getConfigurationOptions,
} from '../utils/getConfiguration';
import { clearIntlayerConfigCache } from '../utils/intlayerCache';

export const extractCommand = async (resource?: Uri): Promise<void> => {
  // Resolve project root: prefer the resource URI, then the active editor, then ask the user.
  let projectDir = findProjectRoot(resource?.fsPath);

  if (!projectDir) {
    const roots = await findAllProjectRoots();
    if (roots.length === 1) {
      projectDir = roots[0];
    } else if (roots.length > 1) {
      const picked = await window.showQuickPick(roots, {
        placeHolder: 'Select the Intlayer project to extract from',
      });
      if (!picked) return;
      projectDir = picked;
    } else {
      await window.showErrorMessage('Intlayer project root not found.');
      return;
    }
  }

  const configOptions: GetConfigurationOptions =
    await getConfigurationOptions(projectDir);
  const configuration = getConfiguration(configOptions);

  const { baseDir } = configuration.system;
  const { codeDir, excludedPath } = configuration.content;
  const { traversePattern } = configuration.build;
  const { output } = configuration.compiler;

  if (!output) {
    clearConfigurationCache(projectDir);
    clearIntlayerConfigCache();

    const action = await window.showErrorMessage(
      `No output configuration found. Add a 'compiler.output' in your configuration, then retry.`,
      'Retry'
    );

    // Restart the command if the user clicks "Retry"
    if (action === 'Retry') {
      return extractCommand(resource);
    }

    return;
  }

  const packageName: PackageName = detectPackageName(baseDir);

  let filesToTransform: string[] = [];

  if (resource) {
    filesToTransform = [resource.fsPath];
  } else {
    // Safely handle arrays (fallback to defaults if undefined)
    const traverseArr = Array.isArray(traversePattern) ? traversePattern : [];
    const excludeArr = Array.isArray(excludedPath) ? excludedPath : [];
    const codeDirArr = Array.isArray(codeDir) ? codeDir : ['.'];

    // Separate positive and negative patterns
    const positivePatterns = traverseArr.filter(
      (pattern) => typeof pattern === 'string' && !pattern.startsWith('!')
    );
    const negativePatterns = traverseArr
      .filter(
        (pattern) => typeof pattern === 'string' && pattern.startsWith('!')
      )
      .map((pattern) => pattern.slice(1));

    if (positivePatterns.length === 0) {
      positivePatterns.push('**/*.{tsx,jsx,vue,svelte,astro,ts,js}');
    }

    // Format the include and exclude strings for VS Code GlobPattern
    const includeGlob =
      positivePatterns.length === 1
        ? positivePatterns[0]
        : `{${positivePatterns.join(',')}}`;

    const combinedExcludes = [...excludeArr, ...negativePatterns].filter(
      Boolean
    );
    const excludeGlob =
      combinedExcludes.length === 0
        ? null
        : combinedExcludes.length === 1
          ? combinedExcludes[0]
          : `{${combinedExcludes.join(',')}}`;

    // Helper: check if a resolved dir path is itself excluded (e.g. codeDir points into a dist folder)
    const isDirExcluded = (dirPath: string): boolean =>
      combinedExcludes.some((pattern) => {
        // Extract literal path segments from the glob (ignore wildcard segments)
        const segments = pattern
          .split('/')
          .filter((segment) => !segment.includes('*') && segment.length > 0);
        const parts = dirPath.split('/');

        return segments.some((seg) => parts.includes(seg));
      });

    // Fetch files for every directory mapping correctly to Uri to avoid "Illegal base/pattern"
    const urisArrays = await Promise.all(
      codeDirArr
        .filter((dir) => !isDirExcluded(resolve(baseDir, String(dir))))
        .map((dir) => {
          // Guarantee an absolute path and convert to URI for strict VS Code compliance
          const absoluteDir = resolve(baseDir, String(dir));
          const baseUri = Uri.file(absoluteDir);

          const searchPattern = new RelativePattern(baseUri, includeGlob);
          const excludePattern = excludeGlob
            ? new RelativePattern(baseUri, excludeGlob)
            : null;

          return workspace.findFiles(searchPattern, excludePattern);
        })
    );

    // Flatten and deduplicate files based on their absolute paths
    const allUris = urisArrays.flat();
    const uniqueUris = Array.from(
      new Map(allUris.map((uri) => [uri.fsPath, uri])).values()
    );

    const activeFilePath = window.activeTextEditor?.document.uri.fsPath;

    const items = uniqueUris.map((uri) => {
      const relPath = relative(baseDir, uri.fsPath);
      return {
        label: relPath,
        description: uri.fsPath,
        picked: uri.fsPath === activeFilePath,
      };
    });

    if (items.length === 0) {
      await window.showInformationMessage(
        'No transformable files found in the project.'
      );
      return;
    }

    const selected = await window.showQuickPick(items, {
      canPickMany: true,
      placeHolder: 'Select files to extract',
    });

    if (!selected || selected.length === 0) {
      return;
    }

    filesToTransform = selected
      .map((item) => item.description)
      .filter((desc): desc is string => !!desc);
  }

  if (filesToTransform.length === 0) {
    return;
  }

  const dirtyDocs = workspace.textDocuments.filter(
    (doc) => filesToTransform.includes(doc.uri.fsPath) && doc.isDirty
  );

  if (dirtyDocs.length > 0) {
    await Promise.all(dirtyDocs.map((doc) => doc.save()));
  }

  const unmergedDictionaries = getUnmergedDictionaries(configuration);
  let errorCount = 0;

  const editor = window.activeTextEditor;
  const fileText = editor?.document.getText();

  await Promise.all(
    filesToTransform.map(async (filePath) => {
      try {
        await extractContent(filePath, packageName, {
          unmergedDictionaries,
          configuration,
          code: fileText,
        });
      } catch (error) {
        errorCount++;
        const message = error instanceof Error ? error.message : String(error);
        console.error(`Failed to extract ${filePath}: ${message}`);
      }
    })
  );

  if (errorCount > 0) {
    window.showWarningMessage(
      `Completed with ${errorCount} errors. Check the debug console for details.`
    );
  } else {
    await window.showInformationMessage(
      `Successfully extracted content from ${filesToTransform.length} files.`
    );
  }
};
