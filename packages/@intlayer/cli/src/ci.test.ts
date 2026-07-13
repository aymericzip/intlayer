import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { credentialsKeyMatchesProject, selectProjectsToRun } from './ci';

describe('ci', () => {
  const searchDir = resolve('/repo');
  const webProject = resolve('/repo/apps/web');
  const backendProject = resolve('/repo/apps/backend');
  const projectsPath = [searchDir, webProject, backendProject];

  describe('credentialsKeyMatchesProject', () => {
    it('matches an absolute key', () => {
      expect(
        credentialsKeyMatchesProject(webProject, webProject, searchDir)
      ).toBe(true);
    });

    it('matches a key relative to the repository root', () => {
      expect(
        credentialsKeyMatchesProject('apps/web', webProject, searchDir)
      ).toBe(true);
      expect(
        credentialsKeyMatchesProject('./apps/web', webProject, searchDir)
      ).toBe(true);
    });

    it('matches the repository root with "."', () => {
      expect(credentialsKeyMatchesProject('.', searchDir, searchDir)).toBe(
        true
      );
    });

    it('matches trailing path segments written with windows separators', () => {
      expect(
        credentialsKeyMatchesProject('apps\\web', webProject, searchDir)
      ).toBe(true);
    });

    it('never matches a partial directory name', () => {
      const myAppProject = resolve('/repo/my-app');

      expect(credentialsKeyMatchesProject('app', myAppProject, searchDir)).toBe(
        false
      );
      expect(
        credentialsKeyMatchesProject('web', backendProject, searchDir)
      ).toBe(false);
    });

    it('never matches a key with more segments than the project path', () => {
      expect(
        credentialsKeyMatchesProject(
          'other-repo/apps/web/deep/nested',
          webProject,
          searchDir
        )
      ).toBe(false);
    });
  });

  describe('selectProjectsToRun', () => {
    it('runs every project when launched from the repository root', () => {
      const { projectsToRun, currentProject } = selectProjectsToRun(
        searchDir,
        searchDir,
        projectsPath
      );

      expect(projectsToRun).toEqual(projectsPath);
      expect(currentProject).toBeUndefined();
    });

    it('runs only the current project when launched from its directory', () => {
      const { projectsToRun, currentProject } = selectProjectsToRun(
        webProject,
        searchDir,
        projectsPath
      );

      expect(projectsToRun).toEqual([webProject]);
      expect(currentProject).toBe(webProject);
    });

    it('runs only the containing project when launched from a subdirectory', () => {
      const { projectsToRun } = selectProjectsToRun(
        resolve('/repo/apps/web/src/components'),
        searchDir,
        projectsPath
      );

      expect(projectsToRun).toEqual([webProject]);
    });

    it('picks the deepest project when projects are nested', () => {
      const nestedProject = resolve('/repo/apps/web/embedded');
      const { projectsToRun } = selectProjectsToRun(
        resolve('/repo/apps/web/embedded/src'),
        searchDir,
        [...projectsPath, nestedProject]
      );

      expect(projectsToRun).toEqual([nestedProject]);
    });

    it('never matches a sibling directory sharing a name prefix', () => {
      const { projectsToRun } = selectProjectsToRun(
        resolve('/repo/apps/web-admin'),
        searchDir,
        [webProject, backendProject]
      );

      expect(projectsToRun).toEqual([webProject, backendProject]);
    });

    it('runs every project when launched outside of any project', () => {
      const { projectsToRun, currentProject } = selectProjectsToRun(
        resolve('/repo/docs'),
        searchDir,
        [webProject, backendProject]
      );

      expect(projectsToRun).toEqual([webProject, backendProject]);
      expect(currentProject).toBeUndefined();
    });
  });
});
