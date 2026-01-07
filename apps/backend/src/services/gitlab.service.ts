import { configurationFilesCandidates } from '@intlayer/config';
import { logger } from '@logger';
import { getDBClient } from '@utils/mongoDB/connectDB';
import { ObjectId } from 'mongodb';

const GITLAB_DEFAULT_URL = 'https://gitlab.com';

export type GitLabProject = {
  id: number;
  name: string;
  path_with_namespace: string;
  web_url: string;
  default_branch: string;
  visibility: string;
  last_activity_at: string;
  namespace: {
    id: number;
    name: string;
    path: string;
  };
};

export type GitLabTreeItem = {
  id: string;
  name: string;
  type: 'tree' | 'blob';
  path: string;
  mode: string;
};

/**
 * Get GitLab authorization URL for OAuth flow
 */
export const getAuthorizationUrl = (
  redirectUri: string,
  instanceUrl?: string,
  login?: string
): string => {
  const clientId = process.env.GITLAB_CLIENT_ID;
  const baseUrl = instanceUrl || GITLAB_DEFAULT_URL;

  if (!clientId) {
    throw new Error('GitLab Client ID is not configured');
  }

  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: 'code',
    scope: 'api read_repository',
    state: 'gitlab_oauth',
  });

  if (login) {
    params.append('login_hint', login);
  }

  return `${baseUrl}/oauth/authorize?${params.toString()}`;
};

/**
 * Exchange GitLab authorization code for access token
 */
export const exchangeCodeForToken = async (
  code: string,
  redirectUri: string,
  instanceUrl?: string
): Promise<string> => {
  const clientId = process.env.GITLAB_CLIENT_ID;
  const clientSecret = process.env.GITLAB_CLIENT_SECRET;
  const baseUrl = instanceUrl || GITLAB_DEFAULT_URL;

  if (!clientId || !clientSecret) {
    throw new Error('GitLab OAuth credentials are not configured');
  }

  try {
    const response = await fetch(`${baseUrl}/oauth/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        code,
        grant_type: 'authorization_code',
        redirect_uri: redirectUri,
      }),
    });

    if (!response.ok) {
      throw new Error(`GitLab token exchange failed: ${response.statusText}`);
    }

    const data = await response.json();

    if (data.error) {
      throw new Error(`GitLab token error: ${data.error_description}`);
    }

    return data.access_token;
  } catch (error) {
    logger.error('Error exchanging GitLab code for token:', error);
    throw error;
  }
};

/**
 * Get user's GitLab projects/repositories
 */
export const getUserProjects = async (
  accessToken: string,
  instanceUrl?: string
): Promise<GitLabProject[]> => {
  const baseUrl = instanceUrl || GITLAB_DEFAULT_URL;

  try {
    const response = await fetch(
      `${baseUrl}/api/v4/projects?membership=true&order_by=last_activity_at&per_page=100`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(
        `Failed to fetch GitLab projects: ${response.statusText}`
      );
    }

    const projects: GitLabProject[] = await response.json();
    return projects;
  } catch (error) {
    logger.error('Error fetching GitLab projects:', error);
    throw error;
  }
};

/**
 * Check if valid intlayer configuration files exist in a GitLab repository (Recursively).
 * Returns an array of file paths found.
 */
export const checkIntlayerConfig = async (
  accessToken: string,
  projectId: number,
  branch: string = 'main',
  instanceUrl?: string
): Promise<string[]> => {
  const baseUrl = instanceUrl || GITLAB_DEFAULT_URL;

  try {
    // Use GitLab's repository tree API with recursive option
    const response = await fetch(
      `${baseUrl}/api/v4/projects/${projectId}/repository/tree?ref=${encodeURIComponent(branch)}&recursive=true&per_page=10000`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: 'application/json',
        },
      }
    );

    if (!response.ok) {
      if (response.status === 404) return [];
      throw new Error(
        `Failed to fetch repository tree: ${response.statusText}`
      );
    }

    const tree: GitLabTreeItem[] = await response.json();

    // Filter files that match the configuration candidates
    const foundFiles = tree
      .filter((item) => {
        if (item.type !== 'blob') return false;
        return (configurationFilesCandidates as readonly string[]).some(
          (candidate) => item.path.endsWith(candidate)
        );
      })
      .map((item) => item.path);

    return foundFiles;
  } catch (error: any) {
    if (error.status === 404) return [];
    logger.error('Error checking intlayer configuration on GitLab:', error);
    return [];
  }
};

/**
 * Get repository file contents from GitLab and decode it
 */
export const getRepositoryFileContents = async (
  accessToken: string,
  projectId: number,
  path: string,
  branch: string = 'main',
  instanceUrl?: string
): Promise<string | null> => {
  const baseUrl = instanceUrl || GITLAB_DEFAULT_URL;

  try {
    const encodedPath = encodeURIComponent(path);
    const response = await fetch(
      `${baseUrl}/api/v4/projects/${projectId}/repository/files/${encodedPath}/raw?ref=${encodeURIComponent(branch)}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: 'application/json',
        },
      }
    );

    if (!response.ok) {
      if (response.status === 404) return null;
      throw new Error(`Failed to fetch file contents: ${response.statusText}`);
    }

    const content = await response.text();
    return content;
  } catch (error: any) {
    if (error.status === 404) return null;
    logger.error('Error fetching GitLab file contents:', error);
    throw error;
  }
};

/**
 * Get GitLab access token from user's linked account
 */
export const getGitLabTokenFromUser = async (
  userId: string
): Promise<string | null> => {
  try {
    const client = getDBClient();
    const db = client.db();

    let account = await db.collection('account').findOne({
      userId: userId,
      providerId: 'gitlab',
    });

    if (!account && ObjectId.isValid(userId)) {
      account = await db.collection('account').findOne({
        userId: new ObjectId(userId),
        providerId: 'gitlab',
      });
    }

    if (!account) {
      account = await db.collection('accounts').findOne({
        userId: userId,
        providerId: 'gitlab',
      });
    }

    if (!account && ObjectId.isValid(userId)) {
      account = await db.collection('accounts').findOne({
        userId: new ObjectId(userId),
        providerId: 'gitlab',
      });
    }

    if (!account) {
      return null;
    }

    const accessToken = account.accessToken || account.access_token;

    return accessToken || null;
  } catch (error) {
    logger.error('Error retrieving GitLab token from DB:', error);
    return null;
  }
};

/**
 * Check if a GitLab CI pipeline file exists
 */
export const checkPipelineFileExists = async (
  accessToken: string,
  projectId: number,
  filename: string = '.gitlab-ci.yml',
  branch: string = 'main',
  instanceUrl?: string
): Promise<boolean> => {
  const baseUrl = instanceUrl || GITLAB_DEFAULT_URL;

  try {
    const encodedPath = encodeURIComponent(filename);
    const response = await fetch(
      `${baseUrl}/api/v4/projects/${projectId}/repository/files/${encodedPath}?ref=${encodeURIComponent(branch)}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: 'application/json',
        },
      }
    );

    if (response.status === 404) return false;
    if (!response.ok) {
      throw new Error(`Failed to check file existence: ${response.statusText}`);
    }

    return true;
  } catch (error: any) {
    if (error.status === 404) return false;
    logger.error('Error checking pipeline file existence:', error);
    throw error;
  }
};

/**
 * Create or update a GitLab CI pipeline file
 */
export const createPipelineFile = async (
  accessToken: string,
  projectId: number,
  filename: string = '.gitlab-ci.yml',
  content: string,
  branch: string = 'main',
  instanceUrl?: string,
  message: string = 'Add Intlayer CI pipeline'
): Promise<void> => {
  const baseUrl = instanceUrl || GITLAB_DEFAULT_URL;

  try {
    const encodedPath = encodeURIComponent(filename);
    const encodedContent = Buffer.from(content, 'utf-8').toString('base64');

    // Check if file exists to get content_sha256 for update
    let existingContentSha: string | undefined;
    try {
      const checkResponse = await fetch(
        `${baseUrl}/api/v4/projects/${projectId}/repository/files/${encodedPath}?ref=${encodeURIComponent(branch)}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            Accept: 'application/json',
          },
        }
      );

      if (checkResponse.ok) {
        const fileData = await checkResponse.json();
        existingContentSha = fileData.content_sha256;
      }
    } catch (error: any) {
      if (error.status !== 404) {
        throw error;
      }
      // File doesn't exist, will create new one
    }

    const body: any = {
      branch,
      content: encodedContent,
      commit_message: message,
      encoding: 'base64',
    };

    if (existingContentSha) {
      body.last_commit_id = existingContentSha;
    }

    const response = await fetch(
      `${baseUrl}/api/v4/projects/${projectId}/repository/files/${encodedPath}`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(body),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to create/update pipeline file: ${errorText}`);
    }

    logger.info(
      `Successfully ${existingContentSha ? 'updated' : 'created'} pipeline file ${filename} for project ${projectId}`
    );
  } catch (error) {
    logger.error('Error creating/updating pipeline file:', error);
    throw error;
  }
};
