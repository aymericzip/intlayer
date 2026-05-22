import {
  TranslatorProfileModel,
  TranslatorReviewModel,
} from '@schemas/translator.schema';
import type {
  TranslatorProfile,
  TranslatorProfileData,
  TranslatorProfileDocument,
  TranslatorReviewDocument,
} from '@/types/translator.types';

export const findTranslatorProfiles = async (
  query: Record<string, any> = {},
  skip = 0,
  limit = 20
): Promise<TranslatorProfileDocument[]> =>
  TranslatorProfileModel.find({ status: 'active', ...query })
    .sort({ averageRating: -1, totalMissions: -1 })
    .skip(skip)
    .limit(limit) as unknown as TranslatorProfileDocument[];

export const countTranslatorProfiles = async (
  query: Record<string, any> = {}
): Promise<number> =>
  TranslatorProfileModel.countDocuments({ status: 'active', ...query });

export const findTranslatorById = async (
  id: string
): Promise<TranslatorProfileDocument | null> =>
  TranslatorProfileModel.findById(
    id
  ) as unknown as TranslatorProfileDocument | null;

export const findTranslatorByUserId = async (
  userId: string
): Promise<TranslatorProfileDocument | null> =>
  TranslatorProfileModel.findOne({
    userId,
  }) as unknown as TranslatorProfileDocument | null;

export const createTranslatorProfile = async (
  data: Omit<
    TranslatorProfileData,
    'totalMissions' | 'averageRating' | 'reviewCount' | 'status'
  >
): Promise<TranslatorProfileDocument> =>
  TranslatorProfileModel.create(data) as unknown as TranslatorProfileDocument;

export const updateTranslatorProfile = async (
  id: string,
  data: Partial<TranslatorProfileData>
): Promise<TranslatorProfileDocument | null> =>
  TranslatorProfileModel.findByIdAndUpdate(id, data, {
    new: true,
  }) as unknown as TranslatorProfileDocument | null;

export const incrementMissionCount = async (id: string): Promise<void> => {
  await TranslatorProfileModel.findByIdAndUpdate(id, {
    $inc: { totalMissions: 1 },
  });
};

export const updateRating = async (
  translatorId: string,
  newRating: number
): Promise<void> => {
  const profile = await TranslatorProfileModel.findById(translatorId);
  if (!profile) return;

  const currentTotal = profile.averageRating * profile.reviewCount;
  const newCount = profile.reviewCount + 1;
  const newAverage = (currentTotal + newRating) / newCount;

  await TranslatorProfileModel.findByIdAndUpdate(translatorId, {
    averageRating: Math.round(newAverage * 10) / 10,
    reviewCount: newCount,
  });
};

export const findReviewsByTranslatorId = async (
  translatorId: string,
  skip = 0,
  limit = 20
): Promise<TranslatorReviewDocument[]> =>
  TranslatorReviewModel.find({ translatorId })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit) as unknown as TranslatorReviewDocument[];

export const countReviewsByTranslatorId = async (
  translatorId: string
): Promise<number> => TranslatorReviewModel.countDocuments({ translatorId });

export const findReviewByMissionId = async (
  missionId: string
): Promise<TranslatorReviewDocument | null> =>
  TranslatorReviewModel.findOne({
    missionId,
  }) as unknown as TranslatorReviewDocument | null;

export const createReview = async (data: {
  missionId: TranslatorProfile['id'];
  reviewerId: TranslatorProfile['id'];
  translatorId: TranslatorProfile['id'];
  rating: number;
  comment?: string;
}): Promise<TranslatorReviewDocument> =>
  TranslatorReviewModel.create(data) as unknown as TranslatorReviewDocument;
