import { logger } from '@logger';
import { getGithubClient } from '@utils/github/connectGithub';

/**
 * Verifies that a GitHub repository uses Intlayer by checking its package.json.
 */
export const verifyGithubRepo = async (githubUrl: string): Promise<boolean> => {
  const match = githubUrl.match(/github\.com\/([^/]+)\/([^/]+)/);
  if (!match) {
    return false;
  }

  const [, owner, repo] = match;

  try {
    const octokit = getGithubClient();
    const response = await octokit.rest.repos.getContent({
      owner,
      repo: repo.replace(/\.git$/, ''),
      path: 'package.json',
    });

    if (!Array.isArray(response.data) && 'content' in response.data) {
      const content = Buffer.from(response.data.content, 'base64').toString(
        'utf-8'
      );
      const pkg = JSON.parse(content);
      return !!(
        pkg.dependencies?.['intlayer'] || pkg.devDependencies?.['intlayer']
      );
    }

    return false;
  } catch (e) {
    logger.error('Error:', e instanceof Error ? e.message : String(e));
    return false;
  }
};
