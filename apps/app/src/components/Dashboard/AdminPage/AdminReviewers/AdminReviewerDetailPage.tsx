import {
  useGetReviewerById,
  useGetReviewerReviews,
  useValidateReviewerProfile,
} from '@intlayer/design-system/api';
import { Badge } from '@intlayer/design-system/badge';
import { Button } from '@intlayer/design-system/button';
import { Loader } from '@intlayer/design-system/loader';
import { CheckCircle, Clock, Globe, Star } from 'lucide-react';
import type { FC } from 'react';

type AdminReviewerDetailPageProps = {
  reviewerId: string;
};

export const AdminReviewerDetailPage: FC<AdminReviewerDetailPageProps> = ({
  reviewerId,
}) => {
  const {
    data: profileData,
    isLoading,
    refetch,
  } = useGetReviewerById(reviewerId);
  const { data: reviewsData } = useGetReviewerReviews(reviewerId, {
    page: 1,
    pageSize: 10,
  });
  const { mutate: validate, isPending: validating } =
    useValidateReviewerProfile();

  const profile = profileData?.data;
  const reviews = reviewsData?.data ?? [];

  if (isLoading) {
    return (
      <div className="flex flex-1 items-center justify-center p-8">
        <Loader />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="p-8">
        <p className="text-neutral">Reviewer not found.</p>
      </div>
    );
  }

  return (
    <div className="flex max-w-3xl flex-col gap-6 p-8">
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Badge
              variant="outline"
              color={profile.status === 'active' ? 'success' : 'neutral'}
            >
              {profile.status}
            </Badge>
            <span className="font-bold text-2xl">
              ${(profile.pricePerHour / 100).toFixed(0)}/hr
            </span>
          </div>
          <div className="flex items-center gap-1 text-neutral text-sm">
            <Clock size={13} />
            <span>
              {profile.totalMissions} missions · avg{' '}
              {profile.averageRating.toFixed(1)} ★ ({profile.reviewCount}{' '}
              reviews)
            </span>
          </div>
        </div>

        {profile.status === 'pending' && (
          <Button
            type="button"
            color="text"
            Icon={CheckCircle}
            label="Validate reviewer profile"
            isLoading={validating}
            onClick={() => validate(profile.id, { onSuccess: () => refetch() })}
          >
            Validate profile
          </Button>
        )}
      </div>

      {profile.mainPicture || profile.coverPicture ? (
        <div className="flex flex-col gap-2 overflow-hidden rounded-2xl border border-neutral/20">
          {profile.coverPicture && (
            <img
              src={profile.coverPicture}
              alt="Cover"
              className="h-32 w-full object-cover"
            />
          )}
          {profile.mainPicture && (
            <div className="p-4">
              <img
                src={profile.mainPicture}
                alt="Main"
                className="size-20 rounded-2xl object-cover"
              />
            </div>
          )}
        </div>
      ) : null}

      {profile.bio && (
        <div className="flex flex-col gap-1">
          <p className="font-medium text-neutral/60 text-xs uppercase tracking-wide">
            Bio
          </p>
          <p className="text-sm leading-relaxed">{profile.bio}</p>
        </div>
      )}

      {profile.languagePairs.length > 0 && (
        <div className="flex flex-col gap-2">
          <p className="font-medium text-neutral/60 text-xs uppercase tracking-wide">
            Language pairs
          </p>
          <div className="flex flex-wrap gap-1.5">
            {profile.languagePairs.map((pair: any) => (
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

      {reviews.length > 0 && (
        <div className="flex flex-col gap-3">
          <p className="font-medium text-neutral/60 text-xs uppercase tracking-wide">
            Recent reviews
          </p>
          {reviews.map((review: any) => (
            <div
              key={review.id}
              className="flex flex-col gap-1 border-neutral/10 border-t pt-3"
            >
              <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={12}
                    className={
                      star <= review.rating
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-neutral/30'
                    }
                  />
                ))}
              </div>
              {review.comment && (
                <p className="text-neutral text-xs leading-relaxed">
                  {review.comment}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
