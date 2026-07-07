import { ReviewerMessageModel } from '@schemas/reviewer.schema';
import type { ReviewerMessageDocument } from '@/types/reviewer.types';

export const createMessage = async (
  missionId: string,
  senderId: string,
  content: string
): Promise<ReviewerMessageDocument> =>
  ReviewerMessageModel.create({
    missionId,
    senderId,
    content,
  }) as unknown as ReviewerMessageDocument;

/**
 * Returns the latest `limit` messages of a mission in chronological order.
 */
export const findMessagesByMissionId = async (
  missionId: string,
  limit = 100
): Promise<ReviewerMessageDocument[]> => {
  const latestMessages = (await ReviewerMessageModel.find({ missionId })
    .sort({ createdAt: -1 })
    .limit(limit)) as unknown as ReviewerMessageDocument[];

  return latestMessages.reverse();
};

export const findNewMessagesSince = async (
  missionId: string,
  since: Date
): Promise<ReviewerMessageDocument[]> =>
  ReviewerMessageModel.find({
    missionId,
    createdAt: { $gt: since },
  }).sort({ createdAt: 1 }) as unknown as ReviewerMessageDocument[];

export const markMessagesRead = async (
  missionId: string,
  userId: string
): Promise<void> => {
  await ReviewerMessageModel.updateMany(
    { missionId, senderId: { $ne: userId }, readAt: { $exists: false } },
    { readAt: new Date() }
  );
};
