import { ensureMongoDocumentToObject } from '@utils/ensureMongoDocumentToObject';
import type {
  EnvironmentAPI,
  Project,
  ProjectAPI,
  ProjectConfiguration,
} from '@/types/project.types';

/**
 * Sentinel ID used for the virtual "production" environment when the project
 * has no DB-persisted default environment. The frontend uses this value to
 * identify production and route the selection to the null-env reset endpoint.
 *
 * Safe to use as a sentinel because MongoDB ObjectIds are 24-char hex strings.
 */
export const PRODUCTION_ENV_SENTINEL_ID = 'production';

/**
 * Sanitizes the AI configuration by removing the API key and adding a flag.
 * @param apiKey - The API key to mask.
 * @returns The masked API key.
 */
const maskApiKey = (apiKey: string): string => {
  if (apiKey.length <= 8) return '*'.repeat(apiKey.length);
  const prefix = apiKey.slice(0, 8);
  const suffix = apiKey.slice(-4);
  const masked = '*'.repeat(Math.max(apiKey.length - 12, 8));
  return `${prefix}${masked}${suffix}`;
};

const sanitizeAIConfig = (
  aiConfig?: ProjectConfiguration['ai']
): ProjectConfiguration['ai'] => {
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
): Project['configuration'] => {
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
 * @returns The project mapped to an API response.
 */
export const mapProjectToAPI = <T extends Project | ProjectAPI | null>(
  project?: T
): T extends null ? null : ProjectAPI => {
  if (!project) {
    return null as any;
  }

  const projectObject = ensureMongoDocumentToObject(
    project
  ) as unknown as ProjectAPI;

  // Sanitize configuration to remove sensitive API key
  if (projectObject.configuration) {
    projectObject.configuration = sanitizeProjectConfiguration(
      projectObject.configuration
    );
  }

  // Sanitize per-environment AI keys
  const rawEnvironments: any[] = projectObject.environments ?? [];

  const mappedEnvironments: EnvironmentAPI[] = rawEnvironments.map(
    (environment) => ({
      ...environment,
      // Subdocuments expose _id before the toJSON transform; normalise to id
      id: String(environment._id ?? environment.id),
      configuration: sanitizeProjectConfiguration(environment.configuration),
    })
  );

  const hasDefaultEnvironment = mappedEnvironments.some(
    (environment) => environment.isDefault
  );

  // Production is the canonical default. If no DB environment is marked as
  // default, inject a virtual production entry so the frontend always has a
  // baseline to display and migrate to/from.
  if (!hasDefaultEnvironment) {
    mappedEnvironments.unshift({
      id: PRODUCTION_ENV_SENTINEL_ID,
      name: 'production',
      isDefault: true,
    } as unknown as EnvironmentAPI);
  }

  projectObject.environments = mappedEnvironments;

  return projectObject as any;
};

/**
 * Formats an array of projects for API response. Removes sensitive information.
 * @param projects - The array of project objects to format.
 * @returns The formatted array of user objects.
 */
export const mapProjectsToAPI = (
  projects: (Project | ProjectAPI)[]
): ProjectAPI[] =>
  projects.map(mapProjectToAPI).filter(Boolean) as ProjectAPI[];
