import { existsSync } from 'node:fs';
import { join, resolve } from 'node:path';
import * as p from '@clack/prompts';
import { type InitOptions, initIntlayer } from '@intlayer/chokidar/cli';
import { initMCP } from './initMCP';
import { initSkills } from './initSkills';

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
  | 'mcp';

const INIT_STEP_OPTIONS: Array<{
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

  const selected = await p.multiselect<InitStep>({
    message: 'Select what you want to set up:',
    options: INIT_STEP_OPTIONS,
    initialValues: INIT_STEP_OPTIONS.map((option) => option.value),
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

  if (steps.includes('skills')) {
    await initSkills(root);
  }

  if (steps.includes('mcp')) {
    await initMCP(root);
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
