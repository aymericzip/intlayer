import { Octokit } from '@octokit/rest';

let githubClientInstance: Octokit | null = null;

export const connectGithub = async (): Promise<Octokit> => {
  try {
    githubClientInstance = new Octokit({ auth: process.env.GITHUB_TOKEN });
    return githubClientInstance;
  } catch (error) {
    const errorMessage = `Github connection error - ${(error as Error).message}`;
    throw new Error(errorMessage);
  }
};

export const getGithubClient = (): Octokit => {
  if (!githubClientInstance) {
    githubClientInstance = new Octokit({ auth: process.env.GITHUB_TOKEN });
  }
  return githubClientInstance;
};
