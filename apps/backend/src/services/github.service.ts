import { configurationFilesCandidates } from '@intlayer/config';
import { logger } from '@logger';
import type { RestEndpointMethodTypes } from '@octokit/rest';
import { Octokit } from '@octokit/rest';
import { getDBClient } from '@utils/mongoDB/connectDB';
import { ObjectId } from 'mongodb';

export type GitHubRepository =
  RestEndpointMethodTypes['repos']['listForAuthenticatedUser']['response']['data'][0];
export type GitHubFileContent =
  RestEndpointMethodTypes['repos']['getContent']['response']['data'];

export const getAuthorizationUrl = (
  redirectUri: string,
  login?: string
): string => {
  const clientId = process.env.GITHUB_CLIENT_ID;

  if (!clientId) {
    throw new Error('GitHub Client ID is not configured');
  }

  const params = new URLSearchParams({
    client_id: clientId,
    scope: 'repo',
    state: 'github_oauth',
    redirect_uri: redirectUri,
  });

  if (login) {
    params.append('login', login);
  }

  return `https://github.com/login/oauth/authorize?${params.toString()}`;
};

export const exchangeCodeForToken = async (code: string): Promise<string> => {
  const clientId = process.env.GITHUB_CLIENT_ID;
  const clientSecret = process.env.GITHUB_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error('GitHub OAuth credentials are not configured');
  }

  try {
    const response = await fetch(
      'https://github.com/login/oauth/access_token',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          client_id: clientId,
          client_secret: clientSecret,
          code,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`GitHub token exchange failed: ${response.statusText}`);
    }

    const data = await response.json();

    if (data.error) {
      throw new Error(`GitHub token error: ${data.error_description}`);
    }

    return data.access_token;
  } catch (error) {
    logger.error('Error exchanging GitHub code for token:', error);
    throw error;
  }
};

export const getUserRepos = async (
  accessToken: string
): Promise<GitHubRepository[]> => {
  try {
    const octokit = new Octokit({ auth: accessToken });

    const { data } = await octokit.rest.repos.listForAuthenticatedUser({
      sort: 'updated',
      per_page: 100,
      visibility: 'all',
    });

    return data;
  } catch (error) {
    logger.error('Error fetching GitHub repositories:', error);
    throw error;
  }
};

/**
 * Check if valid intlayer configuration files exist in a repository (Recursively).
 * Returns an array of file paths found (e.g. ['intlayer.config.ts', 'apps/web/intlayer.config.js']).
 */
export const checkIntlayerConfig = async (
  accessToken: string,
  owner: string,
  repo: string,
  branch: string = 'main'
): Promise<string[]> => {
  try {
    const octokit = new Octokit({ auth: accessToken });

    // Use Git Tree API to get all files recursively
    // This allows finding configs in monorepos/subfolders
    const { data } = await octokit.rest.git.getTree({
      owner,
      repo,
      tree_sha: branch,
      recursive: 'true',
    });

    if (!data.tree || !Array.isArray(data.tree)) {
      return [];
    }

    // Filter files that match the configuration candidates
    // We check if the path ends with one of the candidate filenames
    const foundFiles = data.tree
      .filter((item) => {
        if (item.type !== 'blob' || !item.path) return false;
        return (configurationFilesCandidates as readonly string[]).some(
          (candidate) => item.path?.endsWith(candidate)
        );
      })
      .map((item) => item.path as string); // Return the full path (e.g., 'packages/app/intlayer.config.ts')

    return foundFiles;
  } catch (error: any) {
    // If branch doesn't exist or repo is empty
    if (error.status === 404 || error.status === 409) return [];

    logger.error('Error checking intlayer configuration:', error);
    return [];
  }
};

/**
 * Get repository file contents and decode it
 */
export const getRepositoryFileContents = async (
  accessToken: string,
  owner: string,
  repo: string,
  path: string,
  branch: string = 'main'
): Promise<string | null> => {
  try {
    const octokit = new Octokit({ auth: accessToken });

    const { data } = await octokit.rest.repos.getContent({
      owner,
      repo,
      path,
      ref: branch,
    });

    // Octokit types are union types (file | dir | submodule), we need to check if it's a file
    if (Array.isArray(data) || !('content' in data)) {
      throw new Error('Path points to a directory, not a file');
    }

    // GitHub returns content in base64, we must decode it to read the actual code
    const decodedContent = Buffer.from(data.content, 'base64').toString(
      'utf-8'
    );

    return decodedContent;
  } catch (error: any) {
    if (error.status === 404) return null;

    logger.error('Error fetching repository file contents:', error);
    throw error;
  }
};

export const getGitHubTokenFromUser = async (
  userId: string
): Promise<string | null> => {
  try {
    const client = getDBClient();
    const db = client.db();

    let account = await db.collection('account').findOne({
      userId: userId,
      providerId: 'github',
    });

    if (!account && ObjectId.isValid(userId)) {
      account = await db.collection('account').findOne({
        userId: new ObjectId(userId),
        providerId: 'github',
      });
    }

    if (!account) {
      account = await db.collection('accounts').findOne({
        userId: userId,
        providerId: 'github',
      });
    }

    if (!account && ObjectId.isValid(userId)) {
      account = await db.collection('accounts').findOne({
        userId: new ObjectId(userId),
        providerId: 'github',
      });
    }

    if (!account) {
      return null;
    }

    const accessToken = account.accessToken || account.access_token;

    return accessToken || null;
  } catch (error) {
    logger.error('Error retrieving GitHub token from DB:', error);
    return null;
  }
};
