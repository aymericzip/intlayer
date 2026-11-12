/**
 * One-off migration: switches access keys created before grant enforcement to
 * enforced grants without changing what they can do.
 *
 * Legacy keys (`grantsEnforced !== true`) carry their creator's full
 * permissions at request time. This script snapshots those permissions into
 * `grants` and sets `grantsEnforced`, so later narrowing in the dashboard is
 * honoured. Keys whose creator or organization no longer exists get no grants.
 *
 * Usage (from apps/backend):
 *   bun scripts/backfill-access-key-grants.ts            # dry run
 *   bun scripts/backfill-access-key-grants.ts --apply    # write changes
 */
import { connect, disconnect } from 'mongoose';
import { OrganizationModel } from '../src/schemas/organization.schema';
import { ProjectModel } from '../src/schemas/project.schema';
import { UserModel } from '../src/schemas/user.schema';
import type { SessionContext } from '../src/types/session.types';
import { getMongoDBUri } from '../src/utils/mongoDB/getMongoDBUri';
import {
  computeEffectivePermission,
  getSessionRoles,
} from '../src/utils/permissions';

const shouldApply = process.argv.includes('--apply');

const backfillAccessKeyGrants = async (): Promise<void> => {
  await connect(getMongoDBUri());

  const projects = await ProjectModel.find({
    oAuth2Access: { $elemMatch: { grantsEnforced: { $ne: true } } },
  }).lean();

  let updatedKeyCount = 0;

  for (const project of projects) {
    const organization = await OrganizationModel.findById(
      project.organizationId
    ).lean();

    for (const accessKey of project.oAuth2Access) {
      if (accessKey.grantsEnforced) continue;

      const creator = await UserModel.findById(accessKey.userId).lean();

      const creatorPermissions =
        creator && organization
          ? computeEffectivePermission(
              getSessionRoles({
                user: { ...creator, id: creator._id },
                organization: { ...organization, id: organization._id },
                project: { ...project, id: project._id },
              } as unknown as SessionContext)
            )
          : [];

      console.info(
        `${shouldApply ? 'Updating' : '[dry run]'} project ${project._id} key "${accessKey.name}" (${accessKey.clientId}): ${creatorPermissions.join(', ') || '(none)'}`
      );

      if (shouldApply) {
        await ProjectModel.updateOne(
          { _id: project._id, 'oAuth2Access.clientId': accessKey.clientId },
          {
            $set: {
              'oAuth2Access.$.grants': creatorPermissions,
              'oAuth2Access.$.grantsEnforced': true,
            },
          }
        );
      }

      updatedKeyCount++;
    }
  }

  console.info(
    `${shouldApply ? 'Updated' : 'Would update'} ${updatedKeyCount} access key(s).`
  );

  await disconnect();
};

void backfillAccessKeyGrants();
