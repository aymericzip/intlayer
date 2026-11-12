import type { AIOptions } from '@intlayer/ai';
import { getProjectById } from '@services/project.service';
import { isSelfHosted } from '@utils/isSelfHosted';
import type {
  Project,
  ProjectAPI,
  ProjectConfiguration,
} from '@/types/project.types';

/**
 * Returns the project AI configuration as AI options, or `undefined` when the
 * project disabled its own key (`isOwnAPIKeyEnabled: false`) to run on the
 * plan credits instead. Self-hosted instances ignore that switch: they have
 * no platform key to fall back on.
 */
export const resolveProjectAIOptions = (
  aiConfiguration: ProjectConfiguration['ai'] | undefined
): AIOptions | undefined => {
  if (!aiConfiguration) return undefined;

  const {
    isOwnAPIKeyEnabled,
    apiKeyConfigured: _apiKeyConfigured,
    ...aiOptions
  } = aiConfiguration;

  if (isOwnAPIKeyEnabled === false && !isSelfHosted()) return undefined;

  return aiOptions as AIOptions;
};

/**
 * Returns the project's AI options with the real (unmasked) API key.
 *
 * The session project has its API key masked for security. This function
 * detects a masked key and re-fetches the project from the DB to recover
 * the real key for use in server-side AI calls.
 */
export const getProjectAIOptions = async (
  project: Project | ProjectAPI | null | undefined
): Promise<AIOptions | undefined> => {
  const sessionOptions = resolveProjectAIOptions(project?.configuration?.ai);

  if (!sessionOptions?.apiKey?.includes('*')) {
    return sessionOptions;
  }

  const realProject = await getProjectById(String(project?.id));
  return (
    resolveProjectAIOptions(realProject?.configuration?.ai) ?? sessionOptions
  );
};
