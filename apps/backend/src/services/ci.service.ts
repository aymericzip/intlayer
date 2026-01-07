import { logger } from '@logger';
import type { Project } from '@/types/project.types';
import * as bitbucketService from './bitbucket.service';
import * as githubService from './github.service';
import * as gitlabService from './gitlab.service';

export const GITHUB_WORKFLOW_FILENAME = '.github/workflows/intlayer-cms.yml';
export const GITLAB_PIPELINE_FILENAME = '.gitlab-ci.yml';
export const BITBUCKET_PIPELINE_FILENAME = 'bitbucket-pipelines.yml';

export const GITHUB_TEMPLATE = `name: Intlayer CMS Update
on:
  repository_dispatch:
    types: [intlayer_cms_update]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci
      - run: npm run build
`;

export const GITLAB_TEMPLATE = `stages:
  - build

intlayer_cms_update:
  stage: build
  only:
    - triggers
  script:
    - npm ci
    - npm run build
`;

export const BITBUCKET_TEMPLATE = `pipelines:
  custom:
    intlayer-cms-update:
      - step:
          name: Build
          script:
            - npm ci
            - npm run build
`;

export type CIStatus = {
  exists: boolean;
  content: string;
  path: string;
  fileUrl?: string;
  allowAutoPush: boolean;
};

/**
 * Get access token from project's OAuth2 access
 */
const getAccessToken = (project: Project): string | null => {
  const tokenData = project.oAuth2Access?.[0];
  const accessToken = tokenData?.accessToken?.[0];
  return accessToken || null;
};

/**
 * Get CI configuration status for a project
 */
export const getCIStatus = async (project: Project): Promise<CIStatus> => {
  const { repository } = project;

  if (!repository) {
    throw new Error('Project is not connected to a repository.');
  }

  const accessToken = getAccessToken(project);

  if (!accessToken) {
    throw new Error('No valid OAuth2 access token found.');
  }

  const branch = repository.branch || 'main';

  try {
    switch (repository.provider) {
      case 'github': {
        const { owner, repository: repoName } = repository;
        const filename = GITHUB_WORKFLOW_FILENAME;
        const exists = await githubService.checkWorkflowFileExists(
          accessToken,
          owner,
          repoName,
          filename,
          branch
        );

        const content = GITHUB_TEMPLATE;
        const fileUrl = `https://github.com/${owner}/${repoName}/blob/${branch}/${filename}`;

        return {
          exists,
          content,
          path: filename,
          fileUrl,
          allowAutoPush: true, // GitHub allows file creation via API
        };
      }

      case 'gitlab': {
        const { projectId, instanceUrl } = repository;
        if (!projectId) {
          throw new Error('GitLab project ID is required.');
        }

        const filename = GITLAB_PIPELINE_FILENAME;
        const exists = await gitlabService.checkPipelineFileExists(
          accessToken,
          projectId,
          filename,
          branch,
          instanceUrl
        );

        const content = GITLAB_TEMPLATE;
        const baseUrl = instanceUrl || 'https://gitlab.com';
        const fileUrl = `${baseUrl}/${repository.owner}/${repository.repository}/-/blob/${branch}/${filename}`;

        return {
          exists,
          content,
          path: filename,
          fileUrl,
          allowAutoPush: true, // GitLab allows file creation via API
        };
      }

      case 'bitbucket': {
        const { workspace, repository: repoSlug } = repository;
        const filename = BITBUCKET_PIPELINE_FILENAME;
        const exists = await bitbucketService.checkPipelineFileExists(
          accessToken,
          workspace,
          repoSlug,
          filename,
          branch
        );

        const content = BITBUCKET_TEMPLATE;
        const fileUrl = `https://bitbucket.org/${workspace}/${repoSlug}/src/${branch}/${filename}`;

        return {
          exists,
          content,
          path: filename,
          fileUrl,
          allowAutoPush: false, // Bitbucket API doesn't support automatic file creation
        };
      }

      default:
        throw new Error(
          `Unsupported repository provider: ${repository.provider}`
        );
    }
  } catch (error) {
    logger.error('Error getting CI status:', error);
    throw error;
  }
};

/**
 * Install CI configuration file in the repository
 */
export const installCI = async (project: Project): Promise<void> => {
  const { repository } = project;

  if (!repository) {
    throw new Error('Project is not connected to a repository.');
  }

  const accessToken = getAccessToken(project);

  if (!accessToken) {
    throw new Error('No valid OAuth2 access token found.');
  }

  const branch = repository.branch || 'main';

  try {
    switch (repository.provider) {
      case 'github': {
        const { owner, repository: repoName } = repository;
        await githubService.createWorkflowFile(
          accessToken,
          owner,
          repoName,
          GITHUB_WORKFLOW_FILENAME,
          GITHUB_TEMPLATE,
          branch,
          'Add Intlayer CMS workflow'
        );
        break;
      }

      case 'gitlab': {
        const { projectId, instanceUrl } = repository;
        if (!projectId) {
          throw new Error('GitLab project ID is required.');
        }

        await gitlabService.createPipelineFile(
          accessToken,
          projectId,
          GITLAB_PIPELINE_FILENAME,
          GITLAB_TEMPLATE,
          branch,
          instanceUrl,
          'Add Intlayer CMS pipeline'
        );
        break;
      }

      case 'bitbucket': {
        // Bitbucket API doesn't support automatic file creation
        // This should not be called if allowAutoPush is false
        throw new Error(
          'Bitbucket does not support automatic CI file installation. Please add the file manually.'
        );
      }

      default:
        throw new Error(
          `Unsupported repository provider: ${repository.provider}`
        );
    }

    logger.info(
      `Successfully installed CI configuration for project ${project.id}`
    );
  } catch (error) {
    logger.error('Error installing CI configuration:', error);
    throw error;
  }
};
