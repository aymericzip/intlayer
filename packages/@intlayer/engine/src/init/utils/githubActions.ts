import type { PackageManager } from './packageManager';

/** A GitHub Actions workflow file to be written to the project. */
export type GithubWorkflowFile = {
  /** Path relative to the project root, e.g. `.github/workflows/intlayer-fill.yml`. */
  filePath: string;
  /** Full YAML content of the workflow file. */
  content: string;
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

/**
 * Returns the package-manager-specific steps and commands used to build the
 * GitHub Actions workflows. Each package manager needs a slightly different
 * setup action and a different way to run the local `intlayer` binary.
 */
const getPackageManagerCIConfig = (
  packageManager: PackageManager
): PackageManagerCIConfig => {
  const setupNodeStep = (
    cache: PackageManager | undefined
  ): string => `      - name: 🟢 Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20${cache ? `\n          cache: ${cache}` : ''}`;

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
 * Builds the `intlayer fill` workflow. Runs on pull requests, regenerates the
 * missing translations for the changed dictionaries (`--git-diff`) using AI,
 * then commits the result back to the PR branch.
 *
 * AI access is required for `fill`. The workflow exposes both options:
 * - a provider API key (`AI_API_KEY` secret), forwarded via CLI flags, or
 * - Intlayer CMS access keys (`INTLAYER_CLIENT_ID` / `INTLAYER_CLIENT_SECRET`).
 */
const generateFillWorkflow = (packageManager: PackageManager): string => {
  const { setupSteps, installCommand, execCommand } =
    getPackageManagerCIConfig(packageManager);

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
    runs-on: ubuntu-latest
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
      # INTLAYER_CLIENT_SECRET: \${{ secrets.INTLAYER_CLIENT_SECRET }}
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
        run: ${execCommand} build
      - name: 🤖 Fill missing translations
        # Skip when no AI credentials are configured, so the workflow stays green
        # until an \`AI_API_KEY\` (or Intlayer CMS access keys) secret is added.
        if: \${{ env.AI_API_KEY != '' || env.INTLAYER_CLIENT_ID != '' }}
        run: ${execCommand} fill --git-diff --mode complete --provider $AI_PROVIDER --model $AI_MODEL --api-key $AI_API_KEY
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
const generateTestWorkflow = (packageManager: PackageManager): string => {
  const { setupSteps, installCommand, execCommand } =
    getPackageManagerCIConfig(packageManager);

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
    runs-on: ubuntu-latest
    steps:
      - name: ⬇️ Checkout repository
        uses: actions/checkout@v4
${setupSteps}
      - name: 📦 Install dependencies
        run: ${installCommand}
      - name: ⚙️ Build dictionaries
        run: ${execCommand} build
      - name: 🧪 Test for missing translations
        run: ${execCommand} test
`;
};

/** Workflow file path constants, relative to the project root. */
export const GITHUB_FILL_WORKFLOW_PATH = '.github/workflows/intlayer-fill.yml';
export const GITHUB_TEST_WORKFLOW_PATH = '.github/workflows/intlayer-test.yml';

/**
 * Returns the two Intlayer GitHub Actions workflows (`fill` and `test`),
 * generated with commands matching the detected package manager.
 */
export const getGithubWorkflows = (
  packageManager: PackageManager
): GithubWorkflowFile[] => [
  {
    filePath: GITHUB_FILL_WORKFLOW_PATH,
    content: generateFillWorkflow(packageManager),
  },
  {
    filePath: GITHUB_TEST_WORKFLOW_PATH,
    content: generateTestWorkflow(packageManager),
  },
];
