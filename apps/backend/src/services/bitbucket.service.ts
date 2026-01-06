import { configurationFilesCandidates } from '@intlayer/config';
import { logger } from '@logger';
import { getDBClient } from '@utils/mongoDB/connectDB';
import { ObjectId } from 'mongodb';

const BITBUCKET_API_URL = 'https://api.bitbucket.org/2.0';
const BITBUCKET_AUTH_URL = 'https://bitbucket.org/site/oauth2';

export type BitbucketRepository = {
  uuid: string;
  name: string;
  full_name: string;
  slug: string;
  mainbranch?: {
    name: string;
    type: string;
  };
  links: {
    html: {
      href: string;
    };
  };
  workspace: {
    slug: string;
    name: string;
    uuid: string;
  };
  owner: {
    display_name: string;
    username?: string;
    uuid: string;
  };
  updated_on: string;
  is_private: boolean;
};

export type BitbucketTreeItem = {
  path: string;
  type: 'commit_file' | 'commit_directory';
  size?: number;
};

/**
 * Get Bitbucket (Atlassian) authorization URL for OAuth flow
 */
export const getAuthorizationUrl = (redirectUri: string): string => {
  const clientId = process.env.ATLASSIAN_CLIENT_ID;

  if (!clientId) {
    throw new Error('Bitbucket/Atlassian Client ID is not configured');
  }

  const params = new URLSearchParams({
    client_id: clientId,
    response_type: 'code',
    state: 'bitbucket_oauth',
  });

  return `${BITBUCKET_AUTH_URL}/authorize?${params.toString()}`;
};

/**
 * Exchange Bitbucket authorization code for access token
 */
export const exchangeCodeForToken = async (code: string): Promise<string> => {
  const clientId = process.env.ATLASSIAN_CLIENT_ID;
  const clientSecret = process.env.ATLASSIAN_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error('Bitbucket OAuth credentials are not configured');
  }

  try {
    const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString(
      'base64'
    );

    const response = await fetch(`${BITBUCKET_AUTH_URL}/access_token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${credentials}`,
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code,
      }),
    });

    if (!response.ok) {
      throw new Error(
        `Bitbucket token exchange failed: ${response.statusText}`
      );
    }

    const data = await response.json();

    if (data.error) {
      throw new Error(`Bitbucket token error: ${data.error_description}`);
    }

    return data.access_token;
  } catch (error) {
    logger.error('Error exchanging Bitbucket code for token:', error);
    throw error;
  }
};

/**
 * Get user's Bitbucket repositories
 */
export const getUserRepositories = async (
  accessToken: string
): Promise<BitbucketRepository[]> => {
  try {
    // First, get the current user to find their workspaces
    const userResponse = await fetch(`${BITBUCKET_API_URL}/user`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: 'application/json',
      },
    });

    if (!userResponse.ok) {
      throw new Error(
        `Failed to fetch Bitbucket user: ${userResponse.statusText}`
      );
    }

    // Get repositories the user has access to
    const reposResponse = await fetch(
      `${BITBUCKET_API_URL}/repositories?role=member&sort=-updated_on&pagelen=100`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: 'application/json',
        },
      }
    );

    if (!reposResponse.ok) {
      throw new Error(
        `Failed to fetch Bitbucket repositories: ${reposResponse.statusText}`
      );
    }

    const data = await reposResponse.json();
    return data.values || [];
  } catch (error) {
    logger.error('Error fetching Bitbucket repositories:', error);
    throw error;
  }
};

/**
 * Check if valid intlayer configuration files exist in a Bitbucket repository (Recursively).
 * Returns an array of file paths found.
 */
export const checkIntlayerConfig = async (
  accessToken: string,
  workspace: string,
  repoSlug: string,
  branch: string = 'main'
): Promise<string[]> => {
  try {
    // Use Bitbucket's src API to list files recursively
    const response = await fetch(
      `${BITBUCKET_API_URL}/repositories/${workspace}/${repoSlug}/src/${encodeURIComponent(branch)}/?max_depth=10&pagelen=10000`,
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

    const data = await response.json();
    const items: BitbucketTreeItem[] = data.values || [];

    // Filter files that match the configuration candidates
    const foundFiles = items
      .filter((item) => {
        if (item.type !== 'commit_file') return false;
        return (configurationFilesCandidates as readonly string[]).some(
          (candidate) => item.path.endsWith(candidate)
        );
      })
      .map((item) => item.path);

    return foundFiles;
  } catch (error: any) {
    if (error.status === 404) return [];
    logger.error('Error checking intlayer configuration on Bitbucket:', error);
    return [];
  }
};

/**
 * Get repository file contents from Bitbucket and decode it
 */
export const getRepositoryFileContents = async (
  accessToken: string,
  workspace: string,
  repoSlug: string,
  path: string,
  branch: string = 'main'
): Promise<string | null> => {
  try {
    const response = await fetch(
      `${BITBUCKET_API_URL}/repositories/${workspace}/${repoSlug}/src/${encodeURIComponent(branch)}/${encodeURIComponent(path)}`,
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
    logger.error('Error fetching Bitbucket file contents:', error);
    throw error;
  }
};

/**
 * Get Bitbucket access token from user's linked account (Atlassian)
 */
export const getBitbucketTokenFromUser = async (
  userId: string
): Promise<string | null> => {
  try {
    const client = getDBClient();
    const db = client.db();

    // Try with 'atlassian' provider ID (as it's linked through Better Auth's atlassian provider)
    let account = await db.collection('account').findOne({
      userId: userId,
      providerId: 'atlassian',
    });

    if (!account && ObjectId.isValid(userId)) {
      account = await db.collection('account').findOne({
        userId: new ObjectId(userId),
        providerId: 'atlassian',
      });
    }

    if (!account) {
      account = await db.collection('accounts').findOne({
        userId: userId,
        providerId: 'atlassian',
      });
    }

    if (!account && ObjectId.isValid(userId)) {
      account = await db.collection('accounts').findOne({
        userId: new ObjectId(userId),
        providerId: 'atlassian',
      });
    }

    if (!account) {
      return null;
    }

    const accessToken = account.accessToken || account.access_token;

    return accessToken || null;
  } catch (error) {
    logger.error('Error retrieving Bitbucket token from DB:', error);
    return null;
  }
};
