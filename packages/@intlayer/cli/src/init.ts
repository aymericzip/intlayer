import { existsSync, readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import * as p from '@clack/prompts';
import {
  type InitOptions,
  initIntlayer,
  PLATFORMS,
  type Platform,
} from '@intlayer/chokidar/cli';
import enquirer from 'enquirer';
import { initBuildOptimization } from './initBuildOptimization';
import { initCompiler } from './initCompiler';
import { initMCP } from './initMCP';
import {
  getDetectedPlatform,
  initSkills,
  PLATFORM_OPTIONS,
} from './initSkills';

export const findProjectRoot = (startDir: string) => {
  let currentDir = startDir;

  while (currentDir !== resolve(currentDir, '..')) {
    if (existsSync(join(currentDir, 'package.json'))) {
      return currentDir;
    }
    currentDir = resolve(currentDir, '..');
  }

  // If no package.json is found, return the start directory.
  // The initIntlayer function will handle the missing package.json error.
  return startDir;
};

/** Individually selectable setup steps exposed by the interactive init flow. */
type InitStep =
  | 'packages'
  | 'gitignore'
  | 'githubActions'
  | 'frameworkSetup'
  | 'vscodeExtension'
  | 'lsp'
  | 'skills'
  | 'mcp'
  | 'compiler'
  | 'buildOptimization';

const BASE_INIT_STEP_OPTIONS: Array<{
  value: InitStep;
  label: string;
  hint: string;
}> = [
  {
    value: 'packages',
    label: 'Install & upgrade packages',
    hint: 'install missing Intlayer dependencies and upgrade outdated ones',
  },
  {
    value: 'gitignore',
    label: '.gitignore entry',
    hint: 'add .intlayer to .gitignore',
  },
  {
    value: 'githubActions',
    label: 'GitHub Actions',
    hint: 'scaffold the fill and test workflows',
  },
  {
    value: 'frameworkSetup',
    label: 'Framework setup',
    hint: 'middleware/proxy and providers in layout/page',
  },
  {
    value: 'vscodeExtension',
    label: 'VS Code extension',
    hint: 'recommend the Intlayer extension',
  },
  {
    value: 'lsp',
    label: 'Editor LSP',
    hint: 'go-to-definition from keys to .content files',
  },
  {
    value: 'skills',
    label: 'AI skills',
    hint: 'install the Intlayer documentation as agent skills',
  },
  {
    value: 'mcp',
    label: 'MCP server',
    hint: 'configure the Intlayer MCP server',
  },
];

/** Reads the merged dependencies of the project at `root`. */
const getProjectDependencies = (root: string): Record<string, string> => {
  try {
    const packageJsonPath = join(root, 'package.json');
    if (!existsSync(packageJsonPath)) return {};
    const { dependencies = {}, devDependencies = {} } = JSON.parse(
      readFileSync(packageJsonPath, 'utf-8')
    );
    return { ...dependencies, ...devDependencies };
  } catch {
    return {};
  }
};

/** Returns true when the project at `root` depends on Next.js. */
const isNextJsProject = (root: string): boolean =>
  Boolean(getProjectDependencies(root).next);

/** Returns true when the project at `root` depends on Vite. */
const isViteProject = (root: string): boolean =>
  Boolean(getProjectDependencies(root).vite);

/**
 * Runs `init` in interactive mode: prompts the user with a checkbox of setup
 * steps, then forwards the selection to {@link initIntlayer} (packages,
 * .gitignore, GitHub Actions, VS Code extension, LSP) and runs the dedicated
 * skills/MCP installers for the steps that own their own prompts.
 */
const runInteractiveInit = async (
  root: string,
  baseOptions?: InitOptions
): Promise<void> => {
  p.intro('Initialize Intlayer');

  const stepOptions = [...BASE_INIT_STEP_OPTIONS];

  const nextJsProject = isNextJsProject(root);

  // The compiler is plugged in directly on Vite; on Next.js it needs a Babel
  // config. Only offer the step when one of those frameworks is detected.
  if (nextJsProject || isViteProject(root)) {
    stepOptions.push({
      value: 'compiler',
      label: 'Compiler',
      hint: nextJsProject
        ? 'add the Babel compiler config to extract inline content (Next.js)'
        : 'auto-extract inline content at build time (already plugged in on Vite)',
    });
  }

  if (nextJsProject) {
    stepOptions.push({
      value: 'buildOptimization',
      label: 'Build optimization',
      hint: 'add @intlayer/swc or @intlayer/babel for tree-shaking and minification (Next.js only)',
    });
  }

  const selected = await p.multiselect<InitStep>({
    message: 'Select what you want to set up:',
    options: stepOptions,
    initialValues: BASE_INIT_STEP_OPTIONS.map((option) => option.value),
    required: false,
  });

  if (p.isCancel(selected)) {
    p.cancel('Operation cancelled.');
    return;
  }

  const steps = selected as InitStep[];

  const options: InitOptions = {
    ...baseOptions,
    noInstallPackages: !steps.includes('packages'),
    // Respect explicit `--no-*` flags from the command line even when the
    // corresponding step is selected in the checkbox.
    noGitignore: baseOptions?.noGitignore || !steps.includes('gitignore'),
    noGithubActions:
      baseOptions?.noGithubActions || !steps.includes('githubActions'),
    noFrameworkSetup:
      baseOptions?.noFrameworkSetup || !steps.includes('frameworkSetup'),
    noVscodeExtension: !steps.includes('vscodeExtension'),
    noLsp: !steps.includes('lsp'),
  };

  await initIntlayer(root, options);

  const needsPlatform = steps.includes('skills') || steps.includes('mcp');

  let sharedPlatform: Platform | undefined;

  if (needsPlatform) {
    const detectedPlatform = getDetectedPlatform();

    try {
      const response = await enquirer.prompt<{ platforms: Platform }>({
        type: 'autocomplete',
        name: 'platforms',
        message: 'Which platform are you using? (Type to search)',
        multiple: false,
        initial: detectedPlatform
          ? PLATFORMS.indexOf(detectedPlatform)
          : undefined,
        choices: PLATFORM_OPTIONS.map((opt) => ({
          name: opt.value,
          message: opt.label,
          hint: opt.hint,
        })),
      });
      sharedPlatform = response.platforms;
    } catch {
      p.cancel('Operation cancelled.');
      return;
    }
  }

  if (steps.includes('skills')) {
    await initSkills(root, sharedPlatform);
  }

  if (steps.includes('mcp')) {
    await initMCP(root, sharedPlatform);
  }

  if (steps.includes('compiler')) {
    await initCompiler(root);
  }

  if (steps.includes('buildOptimization')) {
    await initBuildOptimization(root);
  }

  p.outro('Intlayer initialization complete');
};

export const init = async (
  projectRoot?: string,
  options?: InitOptions,
  interactive?: boolean
) => {
  const root = projectRoot
    ? findProjectRoot(resolve(projectRoot))
    : findProjectRoot(process.cwd());

  if (interactive) {
    await runInteractiveInit(root, options);
    return;
  }

  await initIntlayer(root, options);
};
