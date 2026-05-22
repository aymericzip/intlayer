import { TranslatorMessageModel } from '@schemas/translator.schema';
import type { TranslatorMessageDocument } from '@/types/translator.types';

export const createMessage = async (
  missionId: string,
  senderId: string,
  content: string
): Promise<TranslatorMessageDocument> =>
  TranslatorMessageModel.create({
    missionId,
    senderId,
    content,
  }) as unknown as TranslatorMessageDocument;

export const findMessagesByMissionId = async (
  missionId: string,
  limit = 100
): Promise<TranslatorMessageDocument[]> =>
  TranslatorMessageModel.find({ missionId })
    .sort({ createdAt: 1 })
    .limit(limit) as unknown as TranslatorMessageDocument[];

export const findNewMessagesSince = async (
  missionId: string,
  since: Date
): Promise<TranslatorMessageDocument[]> =>
  TranslatorMessageModel.find({
    missionId,
    createdAt: { $gt: since },
  }).sort({ createdAt: 1 }) as unknown as TranslatorMessageDocument[];

export const markMessagesRead = async (
  missionId: string,
  userId: string
): Promise<void> => {
  await TranslatorMessageModel.updateMany(
    { missionId, senderId: { $ne: userId }, readAt: { $exists: false } },
    { readAt: new Date() }
  );
};
