import { spawnSync } from 'node:child_process';
import { normalize, resolve } from 'node:path';
import { listProjects } from '@intlayer/chokidar';
import { logger } from '@intlayer/config';

// Helper to detect the package manager used to run the command
const getPackageManagerCommand = () => {
  const userAgent = process.env.npm_config_user_agent;

  if (userAgent?.startsWith('bun')) {
    return { command: 'bun', args: ['intlayer'] }; // Bun runs local bins natively
  }
  if (userAgent?.startsWith('pnpm')) {
    return { command: 'pnpm', args: ['exec', 'intlayer'] }; // pnpm requires 'exec'
  }
  if (userAgent?.startsWith('yarn')) {
    return { command: 'yarn', args: ['run', 'intlayer'] }; // yarn requires 'run' or 'exec'
  }

  // Default fallback
  return { command: 'npx', args: ['intlayer'] };
};

export const runCI = async (commands: string[]) => {
  const credentialsEnv = process.env.INTLAYER_PROJECT_CREDENTIALS;
  let credentials: Record<string, { clientId: string; clientSecret: string }> =
    {};

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

  const cwd = process.cwd();

  // Discover Projects
  const { projectsPath } = await listProjects();

  if (projectsPath.length === 0) {
    logger('No Intlayer projects found.', { level: 'warn' });
    return;
  }

  // 3. Determine Context: Single Project vs All Projects
  // Check if the current directory matches one of the discovered project paths
  const currentProject = projectsPath.find((p) => cwd === p);
  const projectsToRun = currentProject ? [currentProject] : projectsPath;

  const { command, args: pmArgs } = getPackageManagerCommand();
  const finalArgs = [...pmArgs, ...commands];

  logger(`CI: Using package manager: ${command}`, { level: 'verbose' });

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

  let hasError = false;

  // Iterate and Execute
  for (const projectPath of projectsToRun) {
    // Attempt to match credentials to the project path
    // We check if the key (relative or absolute) matches the resolved project path
    const credsEntry = Object.entries(credentials).find(([key]) => {
      const absKey = resolve(key);
      return absKey === projectPath || projectPath.endsWith(normalize(key));
    });

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
        { level: 'verbose' }
      );
    }

    const result = spawnSync(command, finalArgs, {
      cwd: projectPath,
      stdio: 'inherit',
      env: envVars,
    });

    if (result.status !== 0) {
      logger(`CI: Failed for ${projectPath}`, {
        level: 'error',
      });
      hasError = true;
    }
  }

  if (hasError) process.exit(1);
};
