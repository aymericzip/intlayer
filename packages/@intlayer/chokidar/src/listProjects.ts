import { dirname } from 'node:path';
import { configurationFilesCandidates } from '@intlayer/config';
import fg from 'fast-glob';
import simpleGit from 'simple-git';

export type ListProjectsOptions = {
  /**
   * Base directory to search from
   * @default process.cwd()
   */
  baseDir?: string;
  /**
   * If true, search from the git root directory instead of baseDir
   * @default false
   */
  gitRoot?: boolean;
};

/**
 * Get the git root directory
 */
const getGitRootDir = async (cwd?: string): Promise<string | null> => {
  try {
    const git = cwd ? simpleGit(cwd) : simpleGit();
    const rootDir = await git.revparse(['--show-toplevel']);
    return rootDir.trim();
  } catch (_error) {
    return null;
  }
};

/**
 * List all Intlayer projects by searching for configuration files
 *
 * @param options - Options for listing projects
 * @returns Array of absolute paths to project directories containing Intlayer config
 */
export const listProjects = async (
  options?: ListProjectsOptions
): Promise<string[]> => {
  let searchDir = options?.baseDir ?? process.cwd();

  // If gitRoot option is enabled, try to get the git root directory
  if (options?.gitRoot) {
    const gitRootDir = await getGitRootDir(searchDir);
    if (gitRootDir) {
      searchDir = gitRootDir;
    }
  }

  // Build glob patterns for all config file candidates
  const configPatterns = configurationFilesCandidates.map(
    (fileName) => `**/${fileName}`
  );

  // Search for all config files
  const configFiles = await fg(configPatterns, {
    cwd: searchDir,
    absolute: true,
    ignore: ['**/node_modules/**', '**/.git/**'],
    dot: true, // Include dot files like .intlayerrc
  });

  // Extract unique directory paths from config files
  const projectDirs = [...new Set(configFiles.map((file) => dirname(file)))];

  // Sort alphabetically for consistent output
  return projectDirs.sort();
};
