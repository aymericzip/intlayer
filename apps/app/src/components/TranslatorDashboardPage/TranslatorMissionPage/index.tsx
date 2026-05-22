import {
  useAuth,
  useGetMissionById,
  useGetMyTranslatorProfile,
  useSubmitReview,
  useUpdateMissionStatus,
} from '@intlayer/design-system/hooks';
import { Loader } from '@intlayer/design-system/loader';
import { Globe, Star } from 'lucide-react';
import { type FC, useState } from 'react';
import { TranslatorChat } from './TranslatorChat';

type TranslatorMissionPageProps = {
  missionId: string;
};

const STEPS = [
  'pending',
  'accepted',
  'in_progress',
  'translator_review',
  'client_review',
  'completed',
] as const;

export const TranslatorMissionPage: FC<TranslatorMissionPageProps> = ({
  missionId,
}) => {
  const { data, isLoading } = useGetMissionById(missionId);
  const { data: profileData } = useGetMyTranslatorProfile();
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
  const isTranslator =
    profile && mission && String(mission.translatorId) === profile.id;
  const isClient = mission && String(mission.clientUserId) === currentUserId;

  if (isLoading) {
    return (
      <div className="flex justify-center py-24">
        <Loader />
      </div>
    );
  }

  if (!mission) {
    return (
      <div className="py-24 text-center text-muted-foreground">
        Mission not found.
      </div>
    );
  }

  const currentStepIdx = STEPS.indexOf(mission.status as any);

  return (
    <div className="mx-auto flex h-[calc(100vh-4rem)] w-full max-w-6xl flex-col gap-0 overflow-hidden px-4 py-8 md:flex-row">
      {/* Left panel — mission details */}
      <div className="flex w-full flex-col gap-5 overflow-y-auto pr-0 md:w-80 md:shrink-0 md:pr-6">
        <div>
          <h1 className="font-bold text-xl">Translation Mission</h1>
          <p className="mt-1 text-muted-foreground text-sm">ID: {mission.id}</p>
        </div>

        {/* Status progress */}
        <div className="flex flex-col gap-1.5">
          {STEPS.map((step, i) => (
            <div key={step} className="flex items-center gap-2">
              <div
                className={`size-2.5 rounded-full ${i <= currentStepIdx ? 'bg-primary' : 'bg-muted-foreground/30'}`}
              />
              <span
                className={`text-sm capitalize ${i === currentStepIdx ? 'font-semibold' : 'text-muted-foreground'}`}
              >
                {step.replace('_', ' ')}
              </span>
            </div>
          ))}
        </div>

        {/* Details */}
        <div className="rounded-xl bg-muted p-4 text-sm">
          <div className="mb-2 flex items-center gap-1.5 text-muted-foreground">
            <Globe size={14} />
            {mission.sourceLocale} → {mission.targetLocales.join(', ')}
          </div>
          <p>{mission.wordCount.toLocaleString()} words</p>
          <p>{mission.estimatedHours.toFixed(1)} hours estimated</p>
          <p className="mt-2 font-semibold text-base">
            ${(mission.totalPrice / 100).toFixed(2)}{' '}
            {mission.currency.toUpperCase()}
          </p>
          {mission.notes && (
            <p className="mt-2 text-muted-foreground">{mission.notes}</p>
          )}
        </div>

        {/* Translator actions */}
        {isTranslator && mission.status === 'pending' && (
          <div className="flex gap-2">
            <button
              type="button"
              disabled={updatingStatus}
              onClick={() =>
                updateStatus({ missionId, body: { status: 'accepted' } })
              }
              className="flex-1 rounded-lg bg-primary py-2 font-semibold text-primary-foreground text-sm"
            >
              Accept
            </button>
            <button
              type="button"
              disabled={updatingStatus}
              onClick={() =>
                updateStatus({ missionId, body: { status: 'canceled' } })
              }
              className="flex-1 rounded-lg border border-border py-2 text-sm"
            >
              Decline
            </button>
          </div>
        )}

        {isTranslator && mission.status === 'accepted' && (
          <button
            type="button"
            disabled={updatingStatus}
            onClick={() =>
              updateStatus({ missionId, body: { status: 'in_progress' } })
            }
            className="w-full rounded-lg bg-primary py-2 font-semibold text-primary-foreground text-sm"
          >
            Start translation
          </button>
        )}

        {isTranslator && mission.status === 'in_progress' && (
          <button
            type="button"
            disabled={updatingStatus}
            onClick={() =>
              updateStatus({ missionId, body: { status: 'translator_review' } })
            }
            className="w-full rounded-lg bg-primary py-2 font-semibold text-primary-foreground text-sm"
          >
            Send for client review
          </button>
        )}

        {/* Client actions */}
        {isClient && mission.status === 'client_review' && (
          <div className="flex gap-2">
            <button
              type="button"
              disabled={updatingStatus}
              onClick={() =>
                updateStatus({ missionId, body: { status: 'completed' } })
              }
              className="flex-1 rounded-lg bg-green-600 py-2 font-semibold text-sm text-white"
            >
              Approve
            </button>
            <button
              type="button"
              disabled={updatingStatus}
              onClick={() =>
                updateStatus({
                  missionId,
                  body: { status: 'translator_review' },
                })
              }
              className="flex-1 rounded-lg border border-border py-2 text-sm"
            >
              Request changes
            </button>
          </div>
        )}

        {/* Review form */}
        {isClient && mission.status === 'completed' && !reviewSent && (
          <div className="rounded-xl border border-border bg-card p-4">
            <p className="mb-2 font-medium text-sm">Leave a review</p>
            <div className="mb-2 flex gap-1">
              {[1, 2, 3, 4, 5].map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setRating(s)}
                  className={
                    s <= rating ? 'text-yellow-400' : 'text-muted-foreground/30'
                  }
                >
                  <Star
                    size={20}
                    fill={s <= rating ? 'currentColor' : 'none'}
                  />
                </button>
              ))}
            </div>
            <textarea
              value={reviewComment}
              onChange={(e) => setReviewComment(e.target.value)}
              rows={2}
              placeholder="Share your experience..."
              className="mb-2 w-full rounded-md border border-border bg-background px-2 py-1 text-sm"
            />
            <button
              type="button"
              disabled={submittingReview}
              onClick={() =>
                submitReview(
                  {
                    missionId,
                    body: { rating, comment: reviewComment },
                  },
                  { onSuccess: () => setReviewSent(true) }
                )
              }
              className="w-full rounded-lg bg-primary py-1.5 font-semibold text-primary-foreground text-sm"
            >
              {submittingReview ? 'Submitting...' : 'Submit review'}
            </button>
          </div>
        )}

        {reviewSent && (
          <p className="text-green-600 text-sm">Review submitted. Thank you!</p>
        )}
      </div>

      {/* Right panel — chat */}
      <div className="flex flex-1 flex-col overflow-hidden rounded-2xl border border-border bg-card">
        <div className="border-border border-b px-4 py-3">
          <p className="font-semibold">Chat</p>
        </div>
        <TranslatorChat missionId={missionId} currentUserId={currentUserId} />
      </div>
    </div>
  );
};
