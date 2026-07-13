import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterEach, describe, expect, it } from 'vitest';
import {
  GITHUB_FILL_WORKFLOW_PATH,
  GITHUB_TEST_WORKFLOW_PATH,
  getGithubWorkflows,
  resolveGithubWorkflowsContext,
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

      expect(fillWorkflow?.content).toContain(`${expectedExec} build`);
      expect(fillWorkflow?.content).toContain(`${expectedExec} fill`);
      expect(fillWorkflow?.content).toContain(expectedInstall);

      expect(testWorkflow?.content).toContain(`${expectedExec} test`);
      expect(testWorkflow?.content).toContain(expectedInstall);
    });

    it('fills only changed dictionaries in complete mode and provides AI access', () => {
      const [fillWorkflow] = getGithubWorkflows('npm');

      expect(fillWorkflow?.content).toContain('--git-diff');
      expect(fillWorkflow?.content).toContain('--mode complete');
      expect(fillWorkflow?.content).toContain('--api-key $AI_API_KEY');
      expect(fillWorkflow?.content).toContain('contents: write');
    });

    it('skips the fill step when no AI credentials are configured', () => {
      const [fillWorkflow] = getGithubWorkflows('npm');

      expect(fillWorkflow?.content).toContain(
        "if: ${{ env.AI_API_KEY != '' || env.INTLAYER_CLIENT_ID != '' }}"
      );
    });

    it('adds pnpm and bun specific setup actions', () => {
      const [pnpmFill] = getGithubWorkflows('pnpm');
      const [bunFill] = getGithubWorkflows('bun');

      expect(pnpmFill?.content).toContain('pnpm/action-setup@v4');
      expect(bunFill?.content).toContain('oven-sh/setup-bun@v2');
    });

    it('routes the intlayer commands through `intlayer ci` in monorepo mode', () => {
      const [fillWorkflow, testWorkflow] = getGithubWorkflows('npm', {
        useCiCommand: true,
      });

      expect(fillWorkflow?.content).toContain('npx intlayer ci build');
      expect(fillWorkflow?.content).toContain(
        'npx intlayer ci fill --git-diff'
      );
      expect(fillWorkflow?.content).toContain('INTLAYER_PROJECT_CREDENTIALS');
      expect(testWorkflow?.content).toContain('npx intlayer ci build');
      expect(testWorkflow?.content).toContain('npx intlayer ci test');
    });

    it('does not mention per-project credentials in single-project mode', () => {
      const [fillWorkflow] = getGithubWorkflows('npm');

      expect(fillWorkflow?.content).not.toContain(
        'INTLAYER_PROJECT_CREDENTIALS'
      );
      expect(fillWorkflow?.content).not.toContain('intlayer ci');
    });

    it('runs the commands inside the project directory when nested', () => {
      const [fillWorkflow, testWorkflow] = getGithubWorkflows('npm', {
        workingDirectory: 'apps/web',
      });

      expect(fillWorkflow?.content).toContain('working-directory: apps/web');
      expect(testWorkflow?.content).toContain('working-directory: apps/web');
    });

    it('points the dependency cache at the nested lock file', () => {
      const [npmFill] = getGithubWorkflows('npm', {
        workingDirectory: 'apps/web',
      });
      const [pnpmFill] = getGithubWorkflows('pnpm', {
        workingDirectory: 'apps/web',
      });

      expect(npmFill?.content).toContain(
        'cache-dependency-path: apps/web/package-lock.json'
      );
      expect(pnpmFill?.content).toContain(
        'cache-dependency-path: apps/web/pnpm-lock.yaml'
      );
    });

    it('omits the working-directory block at the repository root', () => {
      const [fillWorkflow] = getGithubWorkflows('npm');

      expect(fillWorkflow?.content).not.toContain('working-directory');
    });
  });

  describe('resolveGithubWorkflowsContext', () => {
    const temporaryDirs: string[] = [];

    const createTemporaryDir = (): string => {
      const dir = mkdtempSync(join(tmpdir(), 'intlayer-gha-'));
      temporaryDirs.push(dir);
      return dir;
    };

    afterEach(() => {
      for (const dir of temporaryDirs.splice(0)) {
        rmSync(dir, { recursive: true, force: true });
      }
    });

    it('keeps plain commands for a standalone project', async () => {
      const projectDir = createTemporaryDir();
      writeFileSync(join(projectDir, 'package.json'), '{}');

      const context = await resolveGithubWorkflowsContext(projectDir, 'npm');

      expect(context.workflowsRootDir).toBe(projectDir);
      expect(context.packageManager).toBe('npm');
      expect(context.options.useCiCommand).toBeFalsy();
      expect(context.options.workingDirectory).toBeUndefined();
    });

    it('uses `intlayer ci` when the root hosts a workspace manifest', async () => {
      const projectDir = createTemporaryDir();
      writeFileSync(
        join(projectDir, 'package.json'),
        JSON.stringify({ workspaces: ['apps/*'] })
      );

      const context = await resolveGithubWorkflowsContext(projectDir, 'npm');

      expect(context.workflowsRootDir).toBe(projectDir);
      expect(context.options.useCiCommand).toBe(true);
    });

    it('uses `intlayer ci` when several Intlayer projects are discovered', async () => {
      const rootDir = createTemporaryDir();
      writeFileSync(join(rootDir, 'package.json'), '{}');

      for (const projectName of ['app-a', 'app-b']) {
        const projectDir = join(rootDir, 'apps', projectName);
        mkdirSync(projectDir, { recursive: true });
        writeFileSync(join(projectDir, 'intlayer.config.ts'), 'export {};');
      }

      const context = await resolveGithubWorkflowsContext(rootDir, 'npm');

      expect(context.options.useCiCommand).toBe(true);
    });
  });
});
