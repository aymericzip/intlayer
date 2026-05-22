'use client';

import type {
  TranslatorProfileAPI,
  TranslatorReviewAPI,
} from '@intlayer/backend';
import { Badge, BadgeColor, BadgeVariant } from '@intlayer/design-system/badge';
import {
  useGetTranslatorReviews,
  useSession,
} from '@intlayer/design-system/hooks';
import { Clock, Globe, Star } from 'lucide-react';
import type { FC } from 'react';

type TranslatorProfileCardProps = {
  profile: TranslatorProfileAPI;
};

const StarRating: FC<{ rating: number; count: number }> = ({
  rating,
  count,
}) => (
  <div className="flex items-center gap-1.5">
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={14}
          className={
            star <= Math.round(rating)
              ? 'fill-yellow-400 text-yellow-400'
              : 'text-neutral/30'
          }
        />
      ))}
    </div>
    <span className="text-neutral text-xs">
      {rating.toFixed(1)} ({count})
    </span>
  </div>
);

const ReviewItem: FC<{ review: TranslatorReviewAPI }> = ({ review }) => (
  <div className="flex flex-col gap-1 border-neutral/10 border-t pt-3">
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={11}
          className={
            star <= review.rating
              ? 'fill-yellow-400 text-yellow-400'
              : 'text-neutral/30'
          }
        />
      ))}
    </div>
    {review.comment && (
      <p className="text-neutral text-xs leading-relaxed">{review.comment}</p>
    )}
  </div>
);

export const TranslatorProfileCard: FC<TranslatorProfileCardProps> = ({
  profile,
}) => {
  const { session } = useSession();
  const user = session?.user;

  const { data: reviewsData } = useGetTranslatorReviews(profile.id, {
    page: 1,
    pageSize: 5,
  });
  const reviews = reviewsData?.data ?? [];

  const priceDisplay = `$${(profile.pricePerHour / 100).toFixed(0)}/hr`;

  return (
    <div className="flex flex-col gap-0 overflow-hidden rounded-3xl border border-neutral/20">
      {/* Cover */}
      <div className="relative h-28 w-full shrink-0 bg-gradient-to-br from-neutral/10 to-neutral/5">
        {profile.coverPicture && (
          <img
            src={profile.coverPicture}
            alt="Cover"
            className="h-full w-full object-cover"
          />
        )}
        {/* Main picture overlapping cover */}
        <div className="absolute -bottom-8 left-4 size-16 overflow-hidden rounded-2xl border-2 border-card bg-card">
          {profile.mainPicture || user?.image ? (
            <img
              src={profile.mainPicture ?? user?.image ?? ''}
              alt={user?.name ?? 'Translator'}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-neutral/10 font-semibold text-lg text-neutral uppercase">
              {user?.name?.[0] ?? '?'}
            </div>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-col gap-4 p-4 pt-10">
        {/* Name + status + price */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex flex-col gap-1">
            <p className="font-semibold text-base leading-tight">
              {user?.name ?? '—'}
            </p>
            <Badge
              variant={BadgeVariant.OUTLINE}
              color={
                profile.status === 'active'
                  ? BadgeColor.SUCCESS
                  : BadgeColor.NEUTRAL
              }
            >
              {profile.status === 'active' ? 'Active' : 'Pending'}
            </Badge>
          </div>
          <p className="shrink-0 font-bold text-xl">{priceDisplay}</p>
        </div>

        {/* Rating */}
        <StarRating
          rating={profile.averageRating}
          count={profile.reviewCount}
        />

        {/* Stats */}
        <div className="flex items-center gap-1 text-neutral text-xs">
          <Clock size={12} />
          <span>{profile.totalMissions} missions completed</span>
        </div>

        {/* Bio */}
        {profile.bio && (
          <p className="text-neutral text-sm leading-relaxed">{profile.bio}</p>
        )}

        {/* Language pairs */}
        {profile.languagePairs.length > 0 && (
          <div className="flex flex-col gap-1.5">
            <p className="font-medium text-neutral/60 text-xs uppercase tracking-wide">
              Languages
            </p>
            <div className="flex flex-wrap gap-1.5">
              {profile.languagePairs.map((pair) => (
                <span
                  key={`${pair.from}-${pair.to}`}
                  className="flex items-center gap-1 rounded-full border border-neutral/20 px-2 py-0.5 text-xs"
                >
                  <Globe size={10} />
                  {pair.from.toUpperCase()} → {pair.to.toUpperCase()}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Reviews */}
        {reviews.length > 0 && (
          <div className="flex flex-col gap-3">
            <p className="font-medium text-neutral/60 text-xs uppercase tracking-wide">
              Recent reviews
            </p>
            {reviews.map((review) => (
              <ReviewItem key={review.id} review={review} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
