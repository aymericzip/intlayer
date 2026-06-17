import { describe, expect, it } from 'vitest';
import {
  GITHUB_FILL_WORKFLOW_PATH,
  GITHUB_TEST_WORKFLOW_PATH,
  getGithubWorkflows,
} from './githubActions';
import type { PackageManager } from './packageManager';

describe('githubActions', () => {
  describe('getGithubWorkflows', () => {
    it('returns the fill and test workflows at the expected paths', () => {
      const workflows = getGithubWorkflows('npm');

      expect(workflows).toHaveLength(2);
      expect(workflows.map((workflow) => workflow.filePath)).toEqual([
        GITHUB_FILL_WORKFLOW_PATH,
        GITHUB_TEST_WORKFLOW_PATH,
      ]);
    });

    const execByPackageManager: Record<PackageManager, string> = {
      npm: 'npx intlayer',
      yarn: 'yarn intlayer',
      pnpm: 'pnpm exec intlayer',
      bun: 'bunx intlayer',
    };

    const installByPackageManager: Record<PackageManager, string> = {
      npm: 'npm ci',
      yarn: 'yarn install --frozen-lockfile',
      pnpm: 'pnpm install --frozen-lockfile',
      bun: 'bun install --frozen-lockfile',
    };

    it.each(
      Object.keys(execByPackageManager) as PackageManager[]
    )('uses the %s exec and install commands', (packageManager) => {
      const [fillWorkflow, testWorkflow] = getGithubWorkflows(packageManager);

      const expectedExec = execByPackageManager[packageManager];
      const expectedInstall = installByPackageManager[packageManager];

      expect(fillWorkflow.content).toContain(`${expectedExec} build`);
      expect(fillWorkflow.content).toContain(`${expectedExec} fill`);
      expect(fillWorkflow.content).toContain(expectedInstall);

      expect(testWorkflow.content).toContain(`${expectedExec} test`);
      expect(testWorkflow.content).toContain(expectedInstall);
    });

    it('fills only changed dictionaries in complete mode and provides AI access', () => {
      const [fillWorkflow] = getGithubWorkflows('npm');

      expect(fillWorkflow.content).toContain('--git-diff');
      expect(fillWorkflow.content).toContain('--mode complete');
      expect(fillWorkflow.content).toContain('--api-key $AI_API_KEY');
      expect(fillWorkflow.content).toContain('contents: write');
    });

    it('adds pnpm and bun specific setup actions', () => {
      const [pnpmFill] = getGithubWorkflows('pnpm');
      const [bunFill] = getGithubWorkflows('bun');

      expect(pnpmFill.content).toContain('pnpm/action-setup@v4');
      expect(bunFill.content).toContain('oven-sh/setup-bun@v2');
    });
  });
});
