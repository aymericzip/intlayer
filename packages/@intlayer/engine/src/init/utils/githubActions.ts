import { existsSync, readFileSync } from 'node:fs';
import { join, relative, resolve, sep } from 'node:path';
import { getGitRootDir, listProjects } from '../../listProjects';
import { detectPackageManager, type PackageManager } from './packageManager';

/** A GitHub Actions workflow file to be written to the project. */
export type GithubWorkflowFile = {
  /** Path relative to the project root, e.g. `.github/workflows/intlayer-fill.yml`. */
  filePath: string;
  /** Full YAML content of the workflow file. */
  content: string;
};

/** Options controlling how the CI workflows are generated. */
export type GithubWorkflowsOptions = {
  /**
   * Route the intlayer commands through `intlayer ci` instead of calling them
   * directly. The `ci` command discovers every Intlayer project of the
   * repository (via `listProjects`) and runs the given command inside each of
   * them, injecting per-project credentials from the
   * `INTLAYER_PROJECT_CREDENTIALS` secret when provided. Required for
   * monorepos where a single workflow must cover several projects.
   */
  useCiCommand?: boolean;
  /**
   * Repository-relative directory (posix separators) the workflow commands run
   * in. Set when the Intlayer project lives in a subdirectory of the
   * repository and the repository root has no workspace manifest to install
   * dependencies from. Undefined = repository root.
   */
  workingDirectory?: string;
};

/**
 * Resolved placement and generation parameters for the CI workflows.
 * See {@link resolveGithubWorkflowsContext}.
 */
export type GithubWorkflowsContext = {
  /**
   * Directory the workflow files must be written to. GitHub only triggers
   * workflows stored in `.github/workflows` at the repository root, so this is
   * the git root whenever the project lives inside a git repository.
   */
  workflowsRootDir: string;
  /** Package manager whose commands are baked into the workflows. */
  packageManager: PackageManager;
  /** Generation options forwarded to {@link getGithubWorkflows}. */
  options: GithubWorkflowsOptions;
};

/**
 * Returns true when the repository root hosts a workspace manifest
 * (a `package.json` `workspaces` field or a `pnpm-workspace.yaml`), meaning a
 * single install at the root covers every package of the monorepo.
 */
const hasWorkspaceManifest = (repositoryRootDir: string): boolean => {
  if (existsSync(join(repositoryRootDir, 'pnpm-workspace.yaml'))) {
    return true;
  }

  try {
    const packageJsonPath = join(repositoryRootDir, 'package.json');
    if (!existsSync(packageJsonPath)) return false;
    const { workspaces } = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));
    return Boolean(workspaces);
  } catch {
    return false;
  }
};

/**
 * Resolves where the CI workflows must be written and how their commands must
 * be generated, based on the repository layout around `rootDir` (the Intlayer
 * project being initialized):
 *
 * - Project at the repository root: workflows are written in place. When the
 *   repository is a monorepo (workspace manifest, or several Intlayer projects
 *   discovered by `listProjects`), the commands go through `intlayer ci` so
 *   every project is covered.
 * - Project nested in a repository whose root has a `package.json`
 *   (workspace-managed monorepo): workflows are written at the git root —
 *   GitHub ignores `.github/workflows` in subdirectories — dependencies are
 *   installed at the root with the root's package manager, and the commands go
 *   through `intlayer ci` to iterate every Intlayer project.
 * - Project nested in a repository without a root `package.json`: workflows
 *   are written at the git root but run inside the project directory
 *   (`working-directory`), keeping the project's own package manager.
 */
export const resolveGithubWorkflowsContext = async (
  rootDir: string,
  projectPackageManager: PackageManager
): Promise<GithubWorkflowsContext> => {
  const projectRootDir = resolve(rootDir);

  let repositoryRootDir = projectRootDir;
  try {
    const gitRootDir = await getGitRootDir(projectRootDir);
    if (gitRootDir) repositoryRootDir = resolve(gitRootDir);
  } catch {
    // Not a git repository — keep the project root as the workflow root.
  }

  // Discover every Intlayer project of the repository. `listProjects` scans
  // for configuration files, so a fresh project whose config is created later
  // in the init flow may not be counted yet — the workspace manifest check
  // below still catches that monorepo case.
  let repositoryProjectCount = 0;
  try {
    const { projectsPath } = await listProjects({
      baseDir: repositoryRootDir,
    });
    repositoryProjectCount = projectsPath.length;
  } catch {
    repositoryProjectCount = 0;
  }

  const isNestedProject = repositoryRootDir !== projectRootDir;
  const isWorkspaceRepository = hasWorkspaceManifest(repositoryRootDir);
  const hasRootPackageJson = existsSync(
    join(repositoryRootDir, 'package.json')
  );

  if (!isNestedProject) {
    return {
      workflowsRootDir: projectRootDir,
      packageManager: projectPackageManager,
      options: {
        useCiCommand: isWorkspaceRepository || repositoryProjectCount > 1,
      },
    };
  }

  if (hasRootPackageJson) {
    return {
      workflowsRootDir: repositoryRootDir,
      packageManager: detectPackageManager(repositoryRootDir),
      options: { useCiCommand: true },
    };
  }

  // Nested project without a root manifest: install and run everything inside
  // the project directory itself.
  return {
    workflowsRootDir: repositoryRootDir,
    packageManager: projectPackageManager,
    options: {
      workingDirectory: relative(repositoryRootDir, projectRootDir)
        .split(sep)
        .join('/'),
    },
  };
};

/**
 * Package-manager-specific snippets used to assemble the CI workflows.
 * - `setupSteps`: YAML steps (already indented for the `steps:` list) that
 *   install the package manager and Node.js, including dependency caching.
 * - `installCommand`: command that installs the project dependencies.
 * - `execCommand`: prefix used to run the locally installed `intlayer` binary.
 */
type PackageManagerCIConfig = {
  setupSteps: string;
  installCommand: string;
  execCommand: string;
};

/** Dependency lock file of each package manager, used for cache invalidation. */
const LOCK_FILE_BY_PACKAGE_MANAGER: Record<PackageManager, string> = {
  bun: 'bun.lock',
  pnpm: 'pnpm-lock.yaml',
  yarn: 'yarn.lock',
  npm: 'package-lock.json',
};

/**
 * Returns the package-manager-specific steps and commands used to build the
 * GitHub Actions workflows. Each package manager needs a slightly different
 * setup action and a different way to run the local `intlayer` binary.
 *
 * `workingDirectory` is the repository-relative directory holding the lock
 * file when the project is nested: `actions/setup-node` looks for the lock
 * file at the repository root by default and fails the cache setup otherwise.
 */
const getPackageManagerCIConfig = (
  packageManager: PackageManager,
  workingDirectory?: string
): PackageManagerCIConfig => {
  const setupNodeStep = (cache: PackageManager | undefined): string => {
    const cacheDependencyPath =
      cache && workingDirectory
        ? `\n          cache-dependency-path: ${workingDirectory}/${LOCK_FILE_BY_PACKAGE_MANAGER[cache]}`
        : '';

    return `      - name: 🟢 Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20${cache ? `\n          cache: ${cache}` : ''}${cacheDependencyPath}`;
  };

  switch (packageManager) {
    case 'bun':
      return {
        setupSteps: `      - name: 🥟 Setup Bun
        uses: oven-sh/setup-bun@v2`,
        installCommand: 'bun install --frozen-lockfile',
        execCommand: 'bunx intlayer',
      };
    case 'pnpm':
      return {
        setupSteps: `      - name: 📦 Setup pnpm
        uses: pnpm/action-setup@v4
${setupNodeStep('pnpm')}`,
        installCommand: 'pnpm install --frozen-lockfile',
        execCommand: 'pnpm exec intlayer',
      };
    case 'yarn':
      return {
        setupSteps: setupNodeStep('yarn'),
        installCommand: 'yarn install --frozen-lockfile',
        execCommand: 'yarn intlayer',
      };
    case 'npm':
      return {
        setupSteps: setupNodeStep('npm'),
        installCommand: 'npm ci',
        execCommand: 'npx intlayer',
      };
  }
};

/**
 * Renders the `defaults.run.working-directory` block for jobs that must run
 * inside a nested project directory. Empty when the commands run at the
 * repository root.
 */
const getWorkingDirectoryBlock = (workingDirectory?: string): string =>
  workingDirectory
    ? `
    defaults:
      run:
        working-directory: ${workingDirectory}`
    : '';

/**
 * Renders the env comment + optional wiring for per-project credentials in
 * monorepo (`intlayer ci`) mode. The `ci` command matches each entry of the
 * `INTLAYER_PROJECT_CREDENTIALS` JSON map to a discovered project path and
 * injects its access keys before running the command in that project.
 */
const getMonorepoCredentialsBlock = (useCiCommand?: boolean): string =>
  useCiCommand
    ? `
      #
      # Monorepo — per-project CMS credentials, as a JSON map of project path
      # (relative to the repository root) to access keys, e.g.
      # {"apps/web":{"clientId":"...","clientSecret":"..."}}:
      # INTLAYER_PROJECT_CREDENTIALS: \${{ secrets.INTLAYER_PROJECT_CREDENTIALS }}`
    : '';

/**
 * Builds the `intlayer fill` workflow. Runs on pull requests, regenerates the
 * missing translations for the changed dictionaries (`--git-diff`) using AI,
 * then commits the result back to the PR branch.
 *
 * AI access is required for `fill`. The workflow exposes both options:
 * - a provider API key (`AI_API_KEY` secret), forwarded via CLI flags, or
 * - Intlayer CMS access keys (`INTLAYER_CLIENT_ID` / `INTLAYER_CLIENT_SECRET`).
 */
const generateFillWorkflow = (
  packageManager: PackageManager,
  options: GithubWorkflowsOptions
): string => {
  const { setupSteps, installCommand, execCommand } = getPackageManagerCIConfig(
    packageManager,
    options.workingDirectory
  );

  // In monorepo mode `intlayer ci <command>` discovers every Intlayer project
  // of the repository and runs the command inside each of them.
  const intlayerCommand = options.useCiCommand
    ? `${execCommand} ci`
    : execCommand;

  return `name: Intlayer Fill
# Auto-fill missing translations on every pull request.
on:
  pull_request:
    branches:
      - main

permissions:
  contents: write
  pull-requests: write

concurrency:
  group: intlayer-fill-\${{ github.ref }}
  cancel-in-progress: true

jobs:
  fill:
    runs-on: ubuntu-latest${getWorkingDirectoryBlock(options.workingDirectory)}
    env:
      # AI access is required to generate translations.
      # Add the secret in: Settings → Secrets and variables → Actions.
      #
      # Option 1 — Use your own AI provider key (forwarded below via CLI flags):
      AI_PROVIDER: openai
      AI_MODEL: gpt-5-mini
      AI_API_KEY: \${{ secrets.AI_API_KEY }}
      #
      # Option 2 — Use Intlayer CMS access keys instead of your own AI key.
      # Wire them in your intlayer.config and uncomment the lines below:
      # INTLAYER_CLIENT_ID: \${{ secrets.INTLAYER_CLIENT_ID }}
      # INTLAYER_CLIENT_SECRET: \${{ secrets.INTLAYER_CLIENT_SECRET }}${getMonorepoCredentialsBlock(options.useCiCommand)}
    steps:
      - name: ⬇️ Checkout repository
        uses: actions/checkout@v4
        with:
          persist-credentials: true # Keep credentials to push back to the PR
          fetch-depth: 0 # Full history so --git-diff can compare refs
${setupSteps}
      - name: 📦 Install dependencies
        run: ${installCommand}
      - name: ⚙️ Build dictionaries
        run: ${intlayerCommand} build
      - name: 🤖 Fill missing translations
        # Skip when no AI credentials are configured, so the workflow stays green
        # until an \`AI_API_KEY\` (or Intlayer CMS access keys) secret is added.
        if: \${{ env.AI_API_KEY != '' || env.INTLAYER_CLIENT_ID != '' }}
        run: ${intlayerCommand} fill --git-diff --mode complete --provider $AI_PROVIDER --model $AI_MODEL --api-key $AI_API_KEY
      - name: 📤 Commit and push changes
        run: |
          git config --local user.email "github-actions[bot]@users.noreply.github.com"
          git config --local user.name "github-actions[bot]"
          if [ -n "$(git status --porcelain)" ]; then
            git add .
            git commit -m "chore(intlayer): fill missing translations [skip ci]"
            git push origin HEAD:\${{ github.head_ref }}
          else
            echo "No missing translations to fill."
          fi
`;
};

/**
 * Builds the `intlayer test` workflow. Runs on pull requests and fails the
 * check when required locales are missing translations. No AI access needed.
 */
const generateTestWorkflow = (
  packageManager: PackageManager,
  options: GithubWorkflowsOptions
): string => {
  const { setupSteps, installCommand, execCommand } = getPackageManagerCIConfig(
    packageManager,
    options.workingDirectory
  );

  // In monorepo mode `intlayer ci <command>` discovers every Intlayer project
  // of the repository and runs the command inside each of them.
  const intlayerCommand = options.useCiCommand
    ? `${execCommand} ci`
    : execCommand;

  return `name: Intlayer Test
# Fail the pull request when required locales are missing translations.
on:
  pull_request:
    branches:
      - main

concurrency:
  group: intlayer-test-\${{ github.ref }}
  cancel-in-progress: true

jobs:
  test:
    runs-on: ubuntu-latest${getWorkingDirectoryBlock(options.workingDirectory)}
    steps:
      - name: ⬇️ Checkout repository
        uses: actions/checkout@v4
${setupSteps}
      - name: 📦 Install dependencies
        run: ${installCommand}
      - name: ⚙️ Build dictionaries
        run: ${intlayerCommand} build
      - name: 🧪 Test for missing translations
        run: ${intlayerCommand} test
`;
};

/** Workflow file path constants, relative to the project root. */
export const GITHUB_FILL_WORKFLOW_PATH = '.github/workflows/intlayer-fill.yml';
export const GITHUB_TEST_WORKFLOW_PATH = '.github/workflows/intlayer-test.yml';

/**
 * Returns the two Intlayer GitHub Actions workflows (`fill` and `test`),
 * generated with commands matching the detected package manager and the
 * repository layout (see {@link GithubWorkflowsOptions} for the monorepo and
 * nested-project variants).
 */
export const getGithubWorkflows = (
  packageManager: PackageManager,
  options: GithubWorkflowsOptions = {}
): GithubWorkflowFile[] => [
  {
    filePath: GITHUB_FILL_WORKFLOW_PATH,
    content: generateFillWorkflow(packageManager, options),
  },
  {
    filePath: GITHUB_TEST_WORKFLOW_PATH,
    content: generateTestWorkflow(packageManager, options),
  },
];
