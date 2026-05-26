import type { ReviewerProfileAPI, ReviewerReviewAPI } from '@intlayer/backend';
import { Container } from '@intlayer/design-system/container';
import {
  useGetReviewerReviews,
  useSession,
} from '@intlayer/design-system/hooks';
import { MarkdownRenderer } from '@intlayer/design-system/mark-down-render';
import { Modal, ModalSize } from '@intlayer/design-system/modal';
import { TechLogos } from '@intlayer/design-system/tech-logo';
import { Clock, ExternalLink, Globe, Star } from 'lucide-react';
import { type FC, useState } from 'react';
import { useIntlayer } from 'react-intlayer';

type Size = 'sm' | 'md' | 'lg';

type ReviewerProfileCardProps = {
  profile: ReviewerProfileAPI;
  size?: Size;
};

const sizeConfig = {
  sm: {
    nameFontSize: 'text-base',
    pricePrefixSize: 'text-xs',
    priceValueSize: 'text-lg',
    bodyPadding: 'p-3',
    starSize: 11 as const,
    statsTextSize: 'text-xs',
    sectionLabelSize: 'text-[10px]',
    badgeTextSize: 'text-[10px]',
    bioTextSize: 'text-xs',
    avatarSize: 'size-10',
    avatarFontSize: 'text-sm',
    coverMinHeight: 'min-h-[80px]',
    coverMarginBottom: 'mb-0',
    avatarBottom: 'bottom-[-30%]',
    showMainPicture: true,
    showReviews: false,
  },
  md: {
    nameFontSize: 'text-3xl',
    pricePrefixSize: 'text-2xl',
    priceValueSize: 'text-4xl',
    bodyPadding: 'p-4 pt-10',
    starSize: 14 as const,
    statsTextSize: 'text-xs',
    sectionLabelSize: 'text-xs',
    badgeTextSize: 'text-xs',
    bioTextSize: 'text-sm',
    avatarSize: 'size-14',
    avatarFontSize: 'text-lg',
    coverMinHeight: 'min-h-[15%]',
    coverMarginBottom: 'mb-[5%]',
    avatarBottom: 'bottom-[-50%]',
    showMainPicture: true,
    showReviews: true,
  },
  lg: {
    nameFontSize: 'text-4xl',
    pricePrefixSize: 'text-3xl',
    priceValueSize: 'text-5xl',
    bodyPadding: 'p-6 pt-14',
    starSize: 18 as const,
    statsTextSize: 'text-sm',
    sectionLabelSize: 'text-xs',
    badgeTextSize: 'text-sm',
    bioTextSize: 'text-base',
    avatarSize: 'size-20',
    avatarFontSize: 'text-2xl',
    coverMinHeight: 'min-h-[18%]',
    coverMarginBottom: 'mb-[6%]',
    avatarBottom: 'bottom-[-55%]',
    showMainPicture: true,
    showReviews: true,
  },
} satisfies Record<Size, object>;

const StarRating: FC<{ rating: number; count: number; starSize?: number }> = ({
  rating,
  count,
  starSize = 14,
}) => (
  <div className="flex items-center gap-1.5">
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={starSize}
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

const ReviewItem: FC<{ review: ReviewerReviewAPI }> = ({ review }) => (
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

export const ReviewerProfileCard: FC<ReviewerProfileCardProps> = ({
  profile,
  size = 'md',
}) => {
  const content = useIntlayer('reviewer-profile-card');
  const sc = sizeConfig[size];

  const { session } = useSession();
  const user = session?.user;

  const displayName = user?.name;
  const displayAvatar = user?.image;

  const { data: reviewsData } = useGetReviewerReviews(
    profile.id,
    { page: 1, pageSize: 5 },
    { enabled: sc.showReviews }
  );
  const reviews = reviewsData?.data ?? [];

  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  return (
    <Container
      roundedSize="2xl"
      border
      borderColor="neutral"
      className="flex flex-col gap-0 overflow-hidden"
    >
      {/* Cover — short background strip */}
      <div
        className={`relative ${sc.coverMarginBottom} ${sc.coverMinHeight} w-full shrink-0 bg-linear-to-br from-neutral/10 to-neutral/5`}
      >
        {profile.coverPicture && (
          <img
            src={profile.coverPicture}
            alt={content.cover.value}
            className="aspect-16/5 h-full w-full object-cover"
          />
        )}
        {/* Main picture — aspect-video service preview (md/lg only) */}
        {sc.showMainPicture && profile.mainPicture && (
          <>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsImageModalOpen(true);
              }}
              className={`absolute ${sc.avatarBottom} left-1/2 -translate-x-1/2 cursor-zoom-in`}
              aria-label={content.service.value}
            >
              <Container
                roundedSize="2xl"
                className="aspect-video w-full cursor-pointer overflow-hidden border-5 border-card bg-card shadow-lg"
              >
                <img
                  src={profile.mainPicture}
                  alt={content.service.value}
                  className="h-full w-full max-w-228 object-cover"
                />
              </Container>
            </button>

            <Modal
              isOpen={isImageModalOpen}
              onClose={() => setIsImageModalOpen(false)}
              size={ModalSize.UNSET}
              hasCloseButton
              isScrollable={false}
              padding="sm"
            >
              <img
                src={profile.mainPicture}
                alt={content.service.value}
                className="w-full rounded-2xl object-contain"
              />
            </Modal>
          </>
        )}
        {/* Round profile avatar overlapping the cover bottom */}
        <div
          className={`absolute top-4 right-4 ${sc.avatarSize} overflow-hidden rounded-full border-4 border-card bg-card`}
        >
          {displayAvatar ? (
            <img
              src={displayAvatar}
              alt={displayName ?? content.reviewer.value}
              className="h-full w-full object-cover"
            />
          ) : (
            <div
              className={`flex h-full w-full items-center justify-center bg-neutral/10 font-semibold ${sc.avatarFontSize} text-neutral uppercase`}
            >
              {displayName?.[0] ?? '?'}
            </div>
          )}
        </div>
      </div>

      {/* Body */}
      <div className={`flex flex-col gap-4 ${sc.bodyPadding}`}>
        {/* Name + price */}
        <div className="flex flex-wrap items-start justify-between gap-2">
          <p
            className={`flex flex-col gap-1 font-semibold ${sc.nameFontSize} leading-tight`}
          >
            {displayName ?? '—'}
          </p>
          <p
            className={`shrink-0 font-bold ${sc.pricePrefixSize} text-neutral`}
          >
            $
            <span className={`mx-2 ${sc.priceValueSize} text-text`}>
              {(profile.pricePerHour / 100).toFixed(0)}
            </span>
            / hr
          </p>
        </div>

        {/* Rating */}
        <StarRating
          rating={profile.averageRating}
          count={profile.reviewCount}
          starSize={sc.starSize}
        />

        {/* Stats */}
        <div
          className={`flex items-center gap-1 text-neutral ${sc.statsTextSize}`}
        >
          <Clock size={12} />
          <span>{profile.totalMissions} missions completed</span>
        </div>

        {/* Bio */}
        {profile.bio && (
          <div
            className={`line-clamp-4 text-neutral ${sc.bioTextSize} leading-relaxed`}
          >
            <MarkdownRenderer>{profile.bio}</MarkdownRenderer>
          </div>
        )}

        {/* Categories */}
        {profile.categories.length > 0 && (
          <div className="flex flex-col gap-1.5">
            <p
              className={`font-medium text-neutral/60 ${sc.sectionLabelSize} uppercase tracking-wide`}
            >
              {content.categories}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {profile.categories.map((cat) => (
                <span
                  key={cat}
                  className={`flex items-center gap-1.5 rounded-lg border border-neutral/20 px-2.5 py-1 ${sc.badgeTextSize}`}
                >
                  <span className="size-1.5 rounded-full bg-text/60" />
                  {cat.replace('_', ' ')}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Language pairs */}
        {profile.languagePairs.length > 0 && (
          <div className="flex flex-col gap-1.5">
            <p
              className={`font-medium text-neutral/60 ${sc.sectionLabelSize} uppercase tracking-wide`}
            >
              {content.languages}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {profile.languagePairs.map((pair) => (
                <span
                  key={`${pair.from}-${pair.to}`}
                  className={`flex items-center gap-1 rounded-full border border-neutral/20 px-2 py-0.5 ${sc.badgeTextSize}`}
                >
                  <Globe size={10} />
                  {pair.from.toUpperCase()} → {pair.to.toUpperCase()}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Social links */}
        {(profile.socialLinks?.github ||
          profile.socialLinks?.linkedin ||
          profile.socialLinks?.portfolio) && (
          <div className="flex items-center gap-2">
            {profile.socialLinks.github && (
              <a
                href={profile.socialLinks.github}
                target="_blank"
                rel="nofollow noopener noreferrer"
                aria-label={content.githubAriaLabel.value}
                className="text-neutral/60 transition-colors hover:text-text"
              >
                <TechLogos.GITHUB className="size-4" />
              </a>
            )}
            {profile.socialLinks.linkedin && (
              <a
                href={profile.socialLinks.linkedin}
                target="_blank"
                rel="nofollow noopener noreferrer"
                aria-label={content.linkedinAriaLabel.value}
                className="text-neutral/60 transition-colors hover:text-text"
              >
                <TechLogos.LINKEDIN className="size-4" />
              </a>
            )}
            {profile.socialLinks.portfolio && (
              <a
                href={profile.socialLinks.portfolio}
                target="_blank"
                rel="nofollow noopener noreferrer"
                aria-label={content.portfolioAriaLabel.value}
                className="flex items-center gap-1 text-neutral/60 text-xs transition-colors hover:text-text"
              >
                <ExternalLink size={13} />
                {content.portfolioAriaLabel}
              </a>
            )}
          </div>
        )}

        {/* Reviews (md/lg only) */}
        {sc.showReviews && reviews.length > 0 && (
          <div className="flex flex-col gap-3">
            <p
              className={`font-medium text-neutral/60 ${sc.sectionLabelSize} uppercase tracking-wide`}
            >
              {content.recentReviews}
            </p>
            {reviews.map((review) => (
              <ReviewItem key={review.id} review={review} />
            ))}
          </div>
        )}
      </div>
    </Container>
  );
};
