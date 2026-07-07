import {
  ReviewerProfileModel,
  ReviewerReviewModel,
} from '@schemas/reviewer.schema';
import { getUsersByIds } from '@services/user.service';
import type {
  ReviewerProfile,
  ReviewerProfileData,
  ReviewerProfileDocument,
  ReviewerReviewDocument,
} from '@/types/reviewer.types';

/** Public-facing subset of the linked user shown on marketplace profiles */
export type ReviewerUserInfo = {
  name?: string;
  avatar?: string;
};

/**
 * Resolves the public display name and avatar of the users linked to the
 * given reviewer profiles. Returns a map keyed by stringified user id.
 */
export const getReviewerUserInfoMap = async (
  profiles: ReviewerProfileDocument[]
): Promise<Map<string, ReviewerUserInfo>> => {
  const userIds = [
    ...new Set(profiles.map((profile) => String(profile.userId))),
  ];

  if (userIds.length === 0) return new Map();

  const users = await getUsersByIds(userIds);

  return new Map(
    (users ?? []).map((user) => [
      String(user.id),
      { name: user.name, avatar: user.image },
    ])
  );
};

export const findReviewerProfiles = async (
  query: Record<string, any> = {},
  skip = 0,
  limit = 20
): Promise<ReviewerProfileDocument[]> =>
  ReviewerProfileModel.find({
    status: 'active',
    isHidden: { $ne: true },
    ...query,
  })
    .sort({ averageRating: -1, totalMissions: -1 })
    .skip(skip)
    .limit(limit) as unknown as ReviewerProfileDocument[];

export const countReviewerProfiles = async (
  query: Record<string, any> = {}
): Promise<number> =>
  ReviewerProfileModel.countDocuments({
    status: 'active',
    isHidden: { $ne: true },
    ...query,
  });

export const findReviewerProfilesAdmin = async (
  query: Record<string, any> = {},
  skip = 0,
  limit = 20
): Promise<ReviewerProfileDocument[]> =>
  ReviewerProfileModel.find(query)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit) as unknown as ReviewerProfileDocument[];

export const countReviewerProfilesAdmin = async (
  query: Record<string, any> = {}
): Promise<number> => ReviewerProfileModel.countDocuments(query);

export const findReviewerById = async (
  id: string
): Promise<ReviewerProfileDocument | null> =>
  ReviewerProfileModel.findById(
    id
  ) as unknown as ReviewerProfileDocument | null;

export const findReviewerByUserId = async (
  userId: string
): Promise<ReviewerProfileDocument | null> =>
  ReviewerProfileModel.findOne({
    userId,
  }) as unknown as ReviewerProfileDocument | null;

export const createReviewerProfile = async (
  data: Omit<
    ReviewerProfileData,
    'totalMissions' | 'averageRating' | 'reviewCount' | 'status'
  >
): Promise<ReviewerProfileDocument> =>
  ReviewerProfileModel.create(data) as unknown as ReviewerProfileDocument;

export const updateReviewerProfile = async (
  id: string,
  data: Partial<ReviewerProfileData>
): Promise<ReviewerProfileDocument | null> =>
  ReviewerProfileModel.findByIdAndUpdate(id, data, {
    new: true,
  }) as unknown as ReviewerProfileDocument | null;

export const incrementMissionCount = async (id: string): Promise<void> => {
  await ReviewerProfileModel.findByIdAndUpdate(id, {
    $inc: { totalMissions: 1 },
  });
};

export const updateRating = async (
  reviewerId: string,
  newRating: number
): Promise<void> => {
  const profile = await ReviewerProfileModel.findById(reviewerId);
  if (!profile) return;

  const currentTotal = profile.averageRating * profile.reviewCount;
  const newCount = profile.reviewCount + 1;
  const newAverage = (currentTotal + newRating) / newCount;

  await ReviewerProfileModel.findByIdAndUpdate(reviewerId, {
    averageRating: Math.round(newAverage * 10) / 10,
    reviewCount: newCount,
  });
};

export const findReviewsByReviewerId = async (
  reviewerId: string,
  skip = 0,
  limit = 20
): Promise<ReviewerReviewDocument[]> =>
  ReviewerReviewModel.find({ reviewerId })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit) as unknown as ReviewerReviewDocument[];

export const countReviewsByReviewerId = async (
  reviewerId: string
): Promise<number> => ReviewerReviewModel.countDocuments({ reviewerId });

export const findReviewByMissionId = async (
  missionId: string
): Promise<ReviewerReviewDocument | null> =>
  ReviewerReviewModel.findOne({
    missionId,
  }) as unknown as ReviewerReviewDocument | null;

export const createReview = async (data: {
  missionId: ReviewerProfile['id'];
  reviewerId: ReviewerProfile['id'];
  rating: number;
  comment?: string;
}): Promise<ReviewerReviewDocument> =>
  ReviewerReviewModel.create(data) as unknown as ReviewerReviewDocument;

export const deleteReviewerProfile = async (id: string): Promise<void> => {
  await ReviewerProfileModel.findByIdAndDelete(id);
};

export const getReviewerPriceDistribution = async (
  query: Record<string, any> = {},
  bucketCount = 20
): Promise<Array<{ min: number; max: number; count: number }>> => {
  const result = await ReviewerProfileModel.aggregate([
    { $match: { status: 'active', isHidden: { $ne: true }, ...query } },
    {
      $bucketAuto: {
        groupBy: '$pricePerHour',
        buckets: bucketCount,
        output: { count: { $sum: 1 } },
      },
    },
  ]);
  return result.map((r: any) => ({
    min: r._id.min as number,
    max: r._id.max as number,
    count: r.count as number,
  }));
};
