import { relative } from 'node:path';
import type { ListProjectsOptions } from '@intlayer/chokidar';
import { listProjects } from '@intlayer/chokidar';

export type ListProjectsCommandOptions = ListProjectsOptions & {
  json?: boolean;
  absolute?: boolean;
};

export const listProjectsCommand = async (
  options?: ListProjectsCommandOptions
) => {
  const { searchDir, projectsPath } = await listProjects(options);

  const projectsRelativePath = projectsPath
    .map((projectPath) =>
      options?.absolute ? projectPath : relative(searchDir, projectPath)
    )
    .map((projectPath) => (projectPath === '' ? '.' : projectPath));

  if (options?.json) {
    console.dir(projectsRelativePath, { depth: null, arrayLimit: null });
    return;
  }

  if (projectsPath.length === 0) {
    console.log('No Intlayer projects found.');
    return;
  }

  console.log(`Found ${projectsPath.length} Intlayer project(s):\n`);
  projectsPath.forEach((project) => {
    console.log(`  - ${project}`);
  });
};
