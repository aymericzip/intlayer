import type { AIOptions } from '@intlayer/ai';
import { getProjectById } from '@services/project.service';
import type { Project, ProjectAPI } from '@/types/project.types';

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
  if (!project?.configuration?.ai) return undefined;

  const sessionOptions = project.configuration.ai as AIOptions;

  if (!sessionOptions.apiKey?.includes('*')) {
    return sessionOptions;
  }

  const realProject = await getProjectById(String(project.id));
  return (
    (realProject?.configuration?.ai as AIOptions | undefined) ?? sessionOptions
  );
};
