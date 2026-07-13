import { spawnSync } from 'node:child_process';
import { resolve, sep } from 'node:path';
import { logger } from '@intlayer/config/logger';
import {
  detectPackageManager,
  listProjects,
  type PackageManager,
} from '@intlayer/engine/cli';

/** CMS access keys of a single project. */
type ProjectCredentials = {
  clientId: string;
  clientSecret: string;
};

/**
 * Shape of the `INTLAYER_PROJECT_CREDENTIALS` environment variable: a JSON map
 * of project path (absolute, or relative to the repository root) to its CMS
 * access keys.
 */
type CredentialsMap = Record<string, ProjectCredentials>;

/** Command used to run the locally installed `intlayer` binary. */
type PackageManagerCommand = {
  command: string;
  args: string[];
};

/**
 * Detects the command used to run the local `intlayer` binary. Prefers the
 * package manager that launched the current process (`npm_config_user_agent`),
 * and falls back to lock file detection when the CLI was not started through a
 * package manager (e.g. a global install or a bare CI runner).
 */
export const getPackageManagerCommand = (
  lockFileSearchDir: string
): PackageManagerCommand => {
  const userAgent = process.env.npm_config_user_agent;

  const commandByPackageManager: Record<PackageManager, PackageManagerCommand> =
    {
      bun: { command: 'bun', args: ['intlayer'] }, // Bun runs local bins natively
      pnpm: { command: 'pnpm', args: ['exec', 'intlayer'] }, // pnpm requires 'exec'
      yarn: { command: 'yarn', args: ['run', 'intlayer'] }, // yarn requires 'run' or 'exec'
      npm: { command: 'npx', args: ['intlayer'] },
    };

  const userAgentPackageManager = (
    Object.keys(commandByPackageManager) as PackageManager[]
  ).find((packageManager) => userAgent?.startsWith(packageManager));

  if (userAgentPackageManager) {
    return commandByPackageManager[userAgentPackageManager];
  }

  // No user agent — infer the package manager from the repository lock file.
  return commandByPackageManager[detectPackageManager(lockFileSearchDir)];
};

/**
 * Splits a path into segments, accepting both posix and windows separators so
 * credential keys written on any OS compare equal to local project paths.
 */
const toPathSegments = (path: string): string[] =>
  path.split(/[\\/]+/).filter((segment) => segment !== '' && segment !== '.');

/**
 * Returns true when a credentials key designates the given project directory.
 * A key matches when it is:
 * - the absolute path of the project,
 * - a path relative to `searchDir` (the repository root), or
 * - a trailing sequence of full path segments of the project path (so the key
 *   `"apps/web"` matches `/repo/apps/web`, but `"app"` never matches
 *   `/repo/my-app`).
 */
export const credentialsKeyMatchesProject = (
  key: string,
  projectPath: string,
  searchDir: string
): boolean => {
  if (resolve(key) === projectPath) return true;
  if (resolve(searchDir, key) === projectPath) return true;

  const keySegments = toPathSegments(key);
  const projectSegments = toPathSegments(projectPath);

  if (keySegments.length === 0 || keySegments.length > projectSegments.length) {
    return false;
  }

  const trailingProjectSegments = projectSegments.slice(-keySegments.length);

  return keySegments.every(
    (segment, index) => trailingProjectSegments[index] === segment
  );
};

/**
 * Selects the projects the CI command must run in:
 * - run from the repository root → every discovered project (monorepo mode);
 * - run from inside a project directory (or any of its subdirectories) → that
 *   project only, the deepest match winning when projects are nested;
 * - run anywhere else → every discovered project.
 */
export const selectProjectsToRun = (
  currentWorkingDir: string,
  searchDir: string,
  projectsPath: string[]
): { projectsToRun: string[]; currentProject: string | undefined } => {
  const cwd = resolve(currentWorkingDir);

  if (cwd === resolve(searchDir)) {
    return { projectsToRun: projectsPath, currentProject: undefined };
  }

  const currentProject = projectsPath
    .filter(
      (projectPath) => cwd === projectPath || cwd.startsWith(projectPath + sep)
    )
    .sort((a, b) => b.length - a.length)[0];

  return {
    projectsToRun: currentProject ? [currentProject] : projectsPath,
    currentProject,
  };
};

/**
 * Runs an intlayer command in every Intlayer project of the repository (or
 * only in the current one when invoked from inside a project directory),
 * injecting per-project CMS credentials from `INTLAYER_PROJECT_CREDENTIALS`.
 * Exits with code 1 when the command fails in at least one project.
 */
export const runCI = async (commands: string[]) => {
  const credentialsEnv = process.env.INTLAYER_PROJECT_CREDENTIALS;
  let credentials: CredentialsMap = {};

  // Parse Credentials (Optional now)
  if (credentialsEnv) {
    try {
      credentials = JSON.parse(credentialsEnv);
    } catch {
      logger(
        'INTLAYER_PROJECT_CREDENTIALS is not valid JSON. Proceeding without credentials.',
        {
          level: 'warn',
        }
      );
    }
  }

  // Discover projects from the git root so every project of the repository is
  // found regardless of the directory the command is launched from.
  const { searchDir, projectsPath } = await listProjects({ gitRoot: true });
  const normalizedProjectsPath = projectsPath.map((projectPath) =>
    resolve(projectPath)
  );

  if (normalizedProjectsPath.length === 0) {
    logger('No Intlayer projects found.', { level: 'warn' });
    return;
  }

  // Determine Context: Single Project vs All Projects
  const { projectsToRun, currentProject } = selectProjectsToRun(
    process.cwd(),
    searchDir,
    normalizedProjectsPath
  );

  const { command, args: pmArgs } = getPackageManagerCommand(searchDir);
  const finalArgs = [...pmArgs, ...commands];

  logger(`CI: Using package manager: ${command}`, {
    level: 'info',
    isVerbose: true,
  });

  if (currentProject) {
    logger(`CI: Detected project context: ${currentProject}`, {
      level: 'info',
    });
  } else {
    logger(
      `CI: No specific project context detected. Iterating over ${projectsToRun.length} discovered projects...`,
      {
        level: 'info',
      }
    );
  }

  const failedProjects: string[] = [];

  // Iterate and Execute
  for (const projectPath of projectsToRun) {
    // Attempt to match credentials to the project path
    const credsEntry = Object.entries(credentials).find(([key]) =>
      credentialsKeyMatchesProject(key, projectPath, searchDir)
    );

    const creds = credsEntry?.[1];

    logger(`\nCI: Executing for ${projectPath}...`, {
      level: 'info',
    });

    const envVars = { ...process.env };

    if (creds) {
      envVars.INTLAYER_CLIENT_ID = creds.clientId;
      envVars.INTLAYER_CLIENT_SECRET = creds.clientSecret;
    } else if (credentialsEnv) {
      logger(
        `CI: No matching credentials found for ${projectPath} in INTLAYER_PROJECT_CREDENTIALS.`,
        { isVerbose: true }
      );
    }

    const result = spawnSync(command, finalArgs, {
      cwd: projectPath,
      stdio: 'inherit',
      env: envVars,
    });

    if (result.error) {
      logger(
        `CI: Failed to launch "${command}" for ${projectPath}: ${result.error.message}`,
        { level: 'error' }
      );
      failedProjects.push(projectPath);
      continue;
    }

    if (result.status !== 0) {
      logger(`CI: Failed for ${projectPath}`, {
        level: 'error',
      });
      failedProjects.push(projectPath);
    }
  }

  if (failedProjects.length > 0) {
    logger(
      `\nCI: ${failedProjects.length}/${projectsToRun.length} project(s) failed:\n${failedProjects
        .map((projectPath) => `  - ${projectPath}`)
        .join('\n')}`,
      { level: 'error' }
    );
    process.exit(1);
  }
};
