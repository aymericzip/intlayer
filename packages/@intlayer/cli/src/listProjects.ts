import type { ListProjectsOptions } from '@intlayer/chokidar';
import { listProjects } from '@intlayer/chokidar';

export type ListProjectsCommandOptions = ListProjectsOptions & {
  json?: boolean;
};

export const listProjectsCommand = async (
  options?: ListProjectsCommandOptions
) => {
  const projects = await listProjects(options);

  if (options?.json) {
    console.log(JSON.stringify(projects));
    return;
  }

  if (projects.length === 0) {
    console.log('No Intlayer projects found.');
    return;
  }

  console.log(`Found ${projects.length} Intlayer project(s):\n`);
  projects.forEach((project) => {
    console.log(`  - ${project}`);
  });
};
