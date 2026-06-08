import { SessionModel } from '@schemas/session.schema';
import { UserModel } from '@schemas/user.schema';
import { Types } from 'mongoose';
import type { SessionDataApi } from '@/types/session.types';

// ─── Context restore ──────────────────────────────────────────────────────────

type RestoreSessionContextInput = {
  sessionId: string;
  currentOrganizationId: string | null;
  currentProjectId: string | null;
  lastActiveOrganizationId: string | null | undefined;
  lastActiveProjectId: string | null | undefined;
};

type RestoreSessionContextResult = {
  organizationId: string | null;
  projectId: string | null;
};

/**
 * When a session has no active org/project but the user document remembers
 * their last active context, restores those IDs into the session row.
 * Returns the resolved IDs (possibly unchanged) so the caller can proceed.
 */
export const restoreSessionContext = async ({
  sessionId,
  currentOrganizationId,
  currentProjectId,
  lastActiveOrganizationId,
  lastActiveProjectId,
}: RestoreSessionContextInput): Promise<RestoreSessionContextResult> => {
  const restoredOrganizationId =
    currentOrganizationId ?? lastActiveOrganizationId ?? null;
  const restoredProjectId = currentProjectId ?? lastActiveProjectId ?? null;

  const needsWrite =
    restoredOrganizationId !== currentOrganizationId ||
    restoredProjectId !== currentProjectId;

  if (needsWrite) {
    await SessionModel.updateOne(
      { id: sessionId },
      {
        $set: {
          activeOrganizationId: restoredOrganizationId,
          activeProjectId: restoredProjectId,
        },
      }
    );
  }

  return {
    organizationId: restoredOrganizationId,
    projectId: restoredProjectId,
  };
};

// ─── Zombie cleanup ───────────────────────────────────────────────────────────

type ZombieCleanupInput = {
  sessionId: string;
  userId: string | Types.ObjectId | null;
  /** The ID stored in the session, if any. */
  storedOrganizationId: string | null | undefined;
  /** Whether the org document was found in the DB. */
  organizationExists: boolean;
  /** The ID stored in the session, if any. */
  storedProjectId: string | null | undefined;
  /** Whether the project document was found in the DB. */
  projectExists: boolean;
};

export type ZombieCleanupResult = {
  /** True when the org ref was stale and has been cleared. */
  organizationCleared: boolean;
  /** True when the project ref was stale and has been cleared (also true when org cleared). */
  projectCleared: boolean;
};

/**
 * Detects "zombie" session references — IDs that were stored in the session
 * but whose documents no longer exist — and clears them from both the session
 * row and the user's last-active fields.
 *
 * Cascade rules:
 *   - Stale org  → clears org + project + environment
 *   - Stale project only → clears project + environment (org untouched)
 *
 * Returns null when no stale references are found.
 */
export const clearZombieSessionContext = async ({
  sessionId,
  userId,
  storedOrganizationId,
  organizationExists,
  storedProjectId,
  projectExists,
}: ZombieCleanupInput): Promise<ZombieCleanupResult | null> => {
  const organizationIsZombie = Boolean(
    storedOrganizationId && !organizationExists
  );
  const projectIsZombie = Boolean(storedProjectId && !projectExists);

  if (!organizationIsZombie && !projectIsZombie) return null;

  const sessionUpdate: Partial<SessionDataApi> = {};
  const userUpdate: Record<string, null> = {};

  if (organizationIsZombie) {
    sessionUpdate.activeOrganizationId = undefined;
    sessionUpdate.activeProjectId = undefined;
    sessionUpdate.activeEnvironmentId = undefined;
    userUpdate.lastActiveOrganizationId = null;
    userUpdate.lastActiveProjectId = null;
  } else {
    // Project-only zombie: leave org intact
    sessionUpdate.activeProjectId = undefined;
    sessionUpdate.activeEnvironmentId = undefined;
    userUpdate.lastActiveProjectId = null;
  }

  const writes: Promise<unknown>[] = [
    SessionModel.updateOne(
      { id: sessionId },
      // Convert undefined values → null for MongoDB
      {
        $set: Object.fromEntries(
          Object.keys(sessionUpdate).map((key) => [key, null])
        ),
      }
    ),
  ];

  if (userId) {
    const userObjectId =
      typeof userId === 'string' ? new Types.ObjectId(userId) : userId;
    writes.push(
      UserModel.updateOne({ _id: userObjectId }, { $set: userUpdate })
    );
  }

  await Promise.all(writes);

  return {
    organizationCleared: organizationIsZombie,
    projectCleared: organizationIsZombie || projectIsZombie,
  };
};
