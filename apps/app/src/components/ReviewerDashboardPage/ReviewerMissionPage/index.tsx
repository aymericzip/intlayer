import {
  useAuth,
  useGetMissionById,
  useGetMyReviewerProfile,
  useSubmitReview,
  useUpdateMissionStatus,
} from '@intlayer/design-system/api';
import { Button } from '@intlayer/design-system/button';
import { Container } from '@intlayer/design-system/container';
import { Loader } from '@intlayer/design-system/loader';
import { App_ReviewerMarketplace_Dashboard_Path } from '@intlayer/design-system/routes';
import { Globe, Star } from 'lucide-react';
import { type FC, useState } from 'react';
import { useIntlayer } from 'react-intlayer';
import { Link } from '#components/Link/Link';
import { ReviewerChat } from './ReviewerChat';

type ReviewerMissionPageProps = {
  missionId: string;
};

const STEPS = [
  'pending',
  'accepted',
  'in_progress',
  'reviewer_review',
  'client_review',
  'completed',
] as const;

export const ReviewerMissionPage: FC<ReviewerMissionPageProps> = ({
  missionId,
}) => {
  const content = useIntlayer('reviewer-mission-page');
  const { data, isLoading } = useGetMissionById(missionId);
  const { data: profileData } = useGetMyReviewerProfile();
  const { mutate: updateStatus, isPending: updatingStatus } =
    useUpdateMissionStatus();
  const { mutate: submitReview, isPending: submittingReview } =
    useSubmitReview();
  const { session } = useAuth();

  const [rating, setRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [reviewSent, setReviewSent] = useState(false);

  const mission = data?.data ?? null;
  const profile = profileData?.data ?? null;
  const currentUserId = session?.user?.id ?? '';
  const isReviewer =
    profile && mission && String(mission.reviewerId) === profile.id;
  const isClient = mission && String(mission.clientUserId) === currentUserId;

  const stepLabels: Record<(typeof STEPS)[number], string> = {
    pending: content.statusPending.value,
    accepted: content.statusAccepted.value,
    in_progress: content.statusInProgress.value,
    reviewer_review: content.statusReviewerReview.value,
    client_review: content.statusClientReview.value,
    completed: content.statusCompleted.value,
  };

  if (isLoading) {
    return (
      <div className="flex flex-1 items-center justify-center py-24">
        <Loader />
      </div>
    );
  }

  if (!mission) {
    return (
      <div className="py-24 text-center text-neutral">
        {content.missionNotFound}
      </div>
    );
  }

  const currentStepIdx = STEPS.indexOf(mission.status as any);

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-0 overflow-hidden px-4 py-8 md:flex-row">
      {/* Left panel — mission details */}
      <aside
        aria-label={content.missionDetailsAriaLabel.value}
        className="flex w-full flex-col gap-5 overflow-y-auto pr-0 md:w-80 md:shrink-0 md:pr-6"
      >
        <div>
          <Link
            to={App_ReviewerMarketplace_Dashboard_Path as any}
            color="text"
            variant="hoverable"
            label={content.missionTitle.value}
            className="mb-2 w-fit text-neutral text-xs"
          >
            ← {content.missionTitle}
          </Link>
          <p className="mt-1 text-neutral text-xs">
            <span className="sr-only">{content.missionIdLabel.value} </span>
            {mission.id}
          </p>
        </div>

        {/* Status progress */}
        <Container border borderColor="neutral" roundedSize="2xl" padding="md">
          <nav aria-label={content.statusProgressAriaLabel.value}>
            <ol className="flex list-none flex-col gap-1.5 p-0">
              {STEPS.map((step, i) => {
                const isCompleted = i < currentStepIdx;
                const isCurrent = i === currentStepIdx;
                return (
                  <li
                    key={step}
                    className="flex items-center gap-2"
                    aria-current={isCurrent ? 'step' : undefined}
                  >
                    <div
                      aria-hidden="true"
                      className={`size-2.5 rounded-full ${i <= currentStepIdx ? 'bg-text' : 'bg-neutral/20'}`}
                    />
                    <span
                      className={`text-sm capitalize ${isCurrent ? 'font-semibold text-text' : 'text-neutral'}`}
                    >
                      {stepLabels[step]}
                      {isCompleted && (
                        <span className="sr-only">
                          {' '}
                          {content.stepCompleted.value}
                        </span>
                      )}
                      {isCurrent && (
                        <span className="sr-only">
                          {' '}
                          {content.stepCurrent.value}
                        </span>
                      )}
                    </span>
                  </li>
                );
              })}
            </ol>
          </nav>
        </Container>

        {/* Details */}
        <Container
          border
          borderColor="neutral"
          roundedSize="2xl"
          padding="md"
          aria-label={content.missionSummaryAriaLabel.value}
        >
          <dl className="flex flex-col gap-1 text-sm">
            <div className="flex items-center gap-1.5 text-neutral">
              <Globe size={14} aria-hidden="true" />
              <dt className="sr-only">{content.languagesDtLabel.value}</dt>
              <dd>
                {mission.sourceLocale} → {mission.targetLocales.join(', ')}
              </dd>
            </div>
            <div>
              <dt className="sr-only">{content.wordCountDtLabel.value}</dt>
              <dd className="text-neutral">
                {mission.wordCount.toLocaleString()} {content.words}
              </dd>
            </div>
            <div>
              <dt className="sr-only">{content.estimatedHoursDtLabel.value}</dt>
              <dd className="text-neutral">
                {mission.estimatedHours.toFixed(1)} {content.hoursEstimated}
              </dd>
            </div>
            <div className="mt-1">
              <dt className="sr-only">{content.totalPriceDtLabel.value}</dt>
              <dd className="font-semibold text-base">
                ${(mission.totalPrice / 100).toFixed(2)}{' '}
                {mission.currency.toUpperCase()}
              </dd>
            </div>
            {mission.notes && (
              <div>
                <dt className="sr-only">{content.notesDtLabel.value}</dt>
                <dd className="text-neutral">{mission.notes}</dd>
              </div>
            )}
          </dl>
        </Container>

        {/* Reviewer actions */}
        {isReviewer && mission.status === 'pending' && (
          <fieldset
            className="m-0 flex gap-2 border-none p-0"
            aria-label={content.reviewerActionsAriaLabel.value}
          >
            <Button
              type="button"
              color="text"
              isFullWidth
              isLoading={updatingStatus}
              label={content.accept.value}
              onClick={() =>
                updateStatus({ missionId, body: { status: 'accepted' } })
              }
            >
              {content.accept}
            </Button>
            <Button
              type="button"
              color="text"
              variant="outline"
              isFullWidth
              isLoading={updatingStatus}
              label={content.decline.value}
              onClick={() =>
                updateStatus({ missionId, body: { status: 'canceled' } })
              }
            >
              {content.decline}
            </Button>
          </fieldset>
        )}

        {isReviewer && mission.status === 'accepted' && (
          <Button
            type="button"
            color="text"
            isFullWidth
            isLoading={updatingStatus}
            label={content.startTranslation.value}
            onClick={() =>
              updateStatus({ missionId, body: { status: 'in_progress' } })
            }
          >
            {content.startTranslation}
          </Button>
        )}

        {isReviewer && mission.status === 'in_progress' && (
          <Button
            type="button"
            color="text"
            isFullWidth
            isLoading={updatingStatus}
            label={content.sendForClientReview.value}
            onClick={() =>
              updateStatus({ missionId, body: { status: 'reviewer_review' } })
            }
          >
            {content.sendForClientReview}
          </Button>
        )}

        {/* Client actions */}
        {isClient && mission.status === 'client_review' && (
          <fieldset
            className="m-0 flex gap-2 border-none p-0"
            aria-label={content.clientActionsAriaLabel.value}
          >
            <Button
              type="button"
              color="success"
              isFullWidth
              isLoading={updatingStatus}
              label={content.approve.value}
              onClick={() =>
                updateStatus({ missionId, body: { status: 'completed' } })
              }
            >
              {content.approve}
            </Button>
            <Button
              type="button"
              color="text"
              variant="outline"
              isFullWidth
              isLoading={updatingStatus}
              label={content.requestChanges.value}
              onClick={() =>
                updateStatus({
                  missionId,
                  body: { status: 'reviewer_review' },
                })
              }
            >
              {content.requestChanges}
            </Button>
          </fieldset>
        )}

        {/* Review form */}
        {isClient && mission.status === 'completed' && !reviewSent && (
          <Container
            border
            borderColor="neutral"
            roundedSize="2xl"
            padding="md"
            gap="md"
            aria-label={content.reviewSectionAriaLabel.value}
          >
            <p className="font-medium text-sm">{content.leaveReview}</p>
            <fieldset
              aria-label={`${content.starRatingGroupPrefix.value} ${rating} ${content.starRatingGroupSuffix.value}`}
              className="m-0 flex gap-1 border-none p-0"
            >
              {[1, 2, 3, 4, 5].map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setRating(s)}
                  aria-label={`${content.rateStarLabel.value} ${s} ${s === 1 ? content.rateStarSingular.value : content.rateStarPlural.value}`}
                  aria-pressed={s <= rating}
                  className={
                    s <= rating ? 'text-yellow-400' : 'text-neutral/30'
                  }
                >
                  <Star
                    size={20}
                    aria-hidden="true"
                    fill={s <= rating ? 'currentColor' : 'none'}
                  />
                </button>
              ))}
            </fieldset>
            <label htmlFor="review-comment" className="sr-only">
              {content.reviewCommentAriaLabel.value}
            </label>
            <textarea
              id="review-comment"
              value={reviewComment}
              onChange={(e) => setReviewComment(e.target.value)}
              rows={2}
              placeholder={content.reviewPlaceholder.value}
              className="w-full rounded-xl border border-neutral/20 bg-card px-3 py-2 text-sm focus:outline-none"
            />
            <Button
              type="button"
              color="text"
              isFullWidth
              isLoading={submittingReview}
              label={content.submitReview.value}
              onClick={() =>
                submitReview(
                  { missionId, body: { rating, comment: reviewComment } },
                  { onSuccess: () => setReviewSent(true) }
                )
              }
            >
              {submittingReview ? content.submitting : content.submitReview}
            </Button>
          </Container>
        )}

        {reviewSent && (
          <p role="status" aria-live="polite" className="text-sm text-success">
            {content.reviewSubmitted}
          </p>
        )}
      </aside>

      {/* Right panel — chat */}
      <Container
        border
        borderColor="neutral"
        roundedSize="2xl"
        transparency="full"
        className="flex flex-1 flex-col overflow-hidden"
        aria-label={content.chatAriaLabel.value}
      >
        <div className="flex items-center justify-between border-neutral/20 border-b px-4 py-3">
          <p className="font-semibold text-sm">{content.chat}</p>
          <Link
            to={App_ReviewerMarketplace_Dashboard_Path as any}
            color="text"
            variant="hoverable"
            label={content.missionTitle.value}
            className="text-neutral text-xs"
          >
            ← {content.missionTitle}
          </Link>
        </div>
        <ReviewerChat missionId={missionId} currentUserId={currentUserId} />
      </Container>
    </div>
  );
};
