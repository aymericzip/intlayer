import { ensureMongoDocumentToObject } from '@utils/ensureMongoDocumentToObject';
import type { Project, ProjectAPI } from '@/types/project.types';

/**
 * Sanitizes the AI configuration by removing the API key and adding a flag.
 * @param aiConfig - The AI configuration to sanitize.
 * @returns The sanitized AI configuration.
 */
const maskApiKey = (apiKey: string): string => {
  if (apiKey.length <= 8) return '*'.repeat(apiKey.length);
  const prefix = apiKey.slice(0, 8);
  const suffix = apiKey.slice(-4);
  const masked = '*'.repeat(Math.max(apiKey.length - 12, 8));
  return `${prefix}${masked}${suffix}`;
};

const sanitizeAIConfig = (aiConfig?: any) => {
  if (!aiConfig) {
    return aiConfig;
  }

  const { apiKey, ...rest } = aiConfig;
  return {
    ...rest,
    apiKey: apiKey ? maskApiKey(apiKey) : undefined,
  };
};

/**
 * Sanitizes the project configuration by removing sensitive data.
 * @param configuration - The project configuration to sanitize.
 * @returns The sanitized project configuration.
 */
const sanitizeProjectConfiguration = (
  configuration?: Project['configuration']
) => {
  if (!configuration) {
    return configuration;
  }

  return {
    ...configuration,
    ai: sanitizeAIConfig(configuration.ai),
  };
};

/**
 * Maps a project to an API response.
 * @param project - The project to map.
 * @param  - Whether the user is an admin of the project.
 * @returns The project mapped to an API response.
 */
export const mapProjectToAPI = <T extends Project | ProjectAPI | null>(
  project?: T
): T extends null ? null : ProjectAPI => {
  if (!project) {
    return null as any;
  }

  const projectObject = ensureMongoDocumentToObject(project);

  // Sanitize configuration to remove sensitive API key
  if (projectObject.configuration) {
    projectObject.configuration = sanitizeProjectConfiguration(
      projectObject.configuration
    );
  }

  return projectObject as any;
};

/**
 * Formats an array of projects for API response. Removes sensitive information.
 * @param projects - The array of project objects to format.
 * @param user - The user object.
 * @param  - Whether the user is an admin of the project.
 * @returns The formatted array of user objects.
 */
export const mapProjectsToAPI = (
  projects: (Project | ProjectAPI)[]
): ProjectAPI[] =>
  projects.map(mapProjectToAPI).filter(Boolean) as ProjectAPI[];
