import { SessionModel } from '@schemas/session.schema';
import type { EnvironmentAPI, ProjectDocument } from '@/types/project.types';

/**
 * Resolves the active environment from the project's environments list.
 *
 * Convention: `null` in `session.activeEnvironmentId` means "production" (the
 * default environment). A real ObjectId string means a non-default environment.
 *
 * - When `sessionEnvironmentId` is null → resolves to the default environment
 *   for display purposes; does NOT write to the session (null is already correct).
 * - When `sessionEnvironmentId` is a non-default env ID → returns that env.
 * - When `sessionEnvironmentId` points to the default env (inconsistency) →
 *   normalises the session back to null.
 */
export const resolveSessionEnvironment = async ({
  projectData,
  sessionId,
  sessionEnvironmentId,
}: {
  projectData: ProjectDocument | null;
  sessionId: string;
  sessionEnvironmentId: string | null;
}): Promise<{
  environmentAPI: EnvironmentAPI | null;
  resolvedEnvironmentId: string | null;
}> => {
  if (!projectData?.environments?.length) {
    return { environmentAPI: null, resolvedEnvironmentId: null };
  }

  const matchedEnvironment = sessionEnvironmentId
    ? (projectData.environments.find(
        (environment) => String(environment.id) === sessionEnvironmentId
      ) ?? null)
    : null;

  const resolvedEnvironment =
    matchedEnvironment ??
    projectData.environments.find((environment) => environment.isDefault) ??
    projectData.environments[0];

  if (!resolvedEnvironment) {
    return { environmentAPI: null, resolvedEnvironmentId: null };
  }

  const isDefaultEnvironment = resolvedEnvironment.isDefault;

  // null = production (default) convention
  const resolvedEnvironmentId = isDefaultEnvironment
    ? null
    : String(resolvedEnvironment.id);

  const environmentAPI: EnvironmentAPI = {
    ...(resolvedEnvironment.toObject?.() ?? resolvedEnvironment),
    id: String(resolvedEnvironment.id),
  } as unknown as EnvironmentAPI;

  // Sync session when stored value diverges from the resolved convention:
  // - sessionEnvironmentId is set but resolved env is the default → clear to null
  // - session has a stale / missing value for a non-default env → write the id
  const sessionNeedsUpdate = sessionEnvironmentId !== resolvedEnvironmentId;

  if (sessionNeedsUpdate) {
    await SessionModel.updateOne(
      { id: sessionId },
      { $set: { activeEnvironmentId: resolvedEnvironmentId } }
    );
  }

  return { environmentAPI, resolvedEnvironmentId };
};
