import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { relative, resolve } from 'node:path';
import { multiselect } from '@clack/prompts';
import { type PackageName, transformFiles } from '@intlayer/chokidar';
import {
  colorizePath,
  type GetConfigurationOptions,
  getAppLogger,
  getConfiguration,
} from '@intlayer/config';
import fg from 'fast-glob';

type TransformOptions = {
  files?: string[];
  configOptions?: GetConfigurationOptions;
};

// Helper to read package.json dependencies
const getDependencies = async (baseDir: string) => {
  try {
    const packageJsonPath = resolve(baseDir, 'package.json');
    if (!existsSync(packageJsonPath)) {
      // Try parent directory if not found in baseDir
      return {};
    }
    const file = await readFile(packageJsonPath, 'utf8');
    const packageJSON = JSON.parse(file);

    return packageJSON.dependencies;
  } catch {
    return {};
  }
};

export const transform = async (options: TransformOptions) => {
  const configuration = getConfiguration(options.configOptions);
  const appLogger = getAppLogger(configuration);
  const { baseDir } = configuration.content;

  const formatPath = (path: string) => {
    const relativePath = relative(baseDir, path);
    return colorizePath(relativePath);
  };

  // Detect package
  const dependencies = await getDependencies(baseDir);
  let packageName: PackageName = 'react-intlayer';

  if (dependencies['next-intlayer']) {
    packageName = 'next-intlayer';
  } else if (dependencies['vue-intlayer']) {
    packageName = 'vue-intlayer';
  } else if (dependencies['svelte-intlayer']) {
    packageName = 'svelte-intlayer';
  } else if (dependencies['react-intlayer']) {
    packageName = 'react-intlayer';
  } else if (dependencies['preact-intlayer']) {
    packageName = 'preact-intlayer';
  } else if (dependencies['solid-intlayer']) {
    packageName = 'solid-intlayer';
  } else if (dependencies['angular-intlayer']) {
    packageName = 'angular-intlayer';
  } else if (dependencies['express-intlayer']) {
    packageName = 'express-intlayer';
  }

  let filesToTransform = options.files ?? [];

  if (filesToTransform.length === 0) {
    const globPattern = '**/*.{tsx,jsx,vue,svelte,ts,js}';
    const excludePattern = [
      '**/*.content.{ts,tsx,js,jsx,mjs,cjs}',
      '**/*.config.{ts,tsx,js,jsx,mjs,cjs}',
      '**/*.test.{ts,tsx,js,jsx,mjs,cjs}',
      '**/*.stories.{ts,tsx,js,jsx,mjs,cjs}',
      '**/node_modules/**',
      '**/dist/**',
      '**/build/**',
    ];

    const allFiles = await fg(globPattern, {
      cwd: baseDir,
      ignore: excludePattern,
      absolute: true,
    });

    // Remove duplicates and non-existing files
    const uniqueFiles = [...new Set(allFiles)].filter((file) =>
      existsSync(file)
    );

    // Relative paths for selection
    const choices = uniqueFiles.map((file) => {
      const relPath = relative(baseDir, file);
      return {
        value: file,
        label: relPath,
      };
    });

    if (choices.length === 0) {
      appLogger('No transformable files found in the project.');
      return;
    }

    const selectedFiles = await multiselect({
      message: 'Select files to transform:',
      options: choices,
      required: false,
    });

    if (typeof selectedFiles === 'symbol') {
      // User cancelled
      process.exit(0);
    }

    filesToTransform = selectedFiles as string[];
  }

  if (filesToTransform.length === 0) {
    appLogger('No files selected for transformation.');
    return;
  }

  const absoluteFiles = filesToTransform
    .map((file) => resolve(baseDir, file))
    .filter((file) => {
      if (!existsSync(file)) {
        appLogger(`File not found: ${formatPath(file)}`);
        return false;
      }
      return true;
    });

  if (absoluteFiles.length === 0) {
    return;
  }

  await transformFiles(absoluteFiles, packageName, {
    configOptions: options.configOptions,
  });
};
