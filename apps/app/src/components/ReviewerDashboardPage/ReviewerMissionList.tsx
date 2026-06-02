import type { TranslationMissionAPI } from '@intlayer/backend';
import { useUpdateMissionStatus } from '@intlayer/design-system/api';
import { Badge, type BadgeColor } from '@intlayer/design-system/badge';
import { Button } from '@intlayer/design-system/button';
import { Container } from '@intlayer/design-system/container';
import { App_ReviewerMarketplace_Dashboard_Mission_Path } from '@intlayer/design-system/routes';
import { MessageSquare } from 'lucide-react';
import type { FC } from 'react';
import { useIntlayer } from 'react-intlayer';
import { Link } from '#components/Link/Link';

type ReviewerMissionListProps = {
  missions: TranslationMissionAPI[];
};

const STATUS_LABELS: Record<string, string> = {
  pending: 'Pending',
  accepted: 'Accepted',
  in_progress: 'In progress',
  reviewer_review: 'Reviewing',
  client_review: 'Client review',
  completed: 'Completed',
  canceled: 'Canceled',
};

const STATUS_BADGE_COLOR: Record<string, BadgeColor> = {
  pending: 'secondary',
  accepted: 'secondary',
  in_progress: 'secondary',
  reviewer_review: 'neutral',
  client_review: 'neutral',
  completed: 'success',
  canceled: 'neutral',
};

export const ReviewerMissionList: FC<ReviewerMissionListProps> = ({
  missions,
}) => {
  const content = useIntlayer('reviewer-mission-list');

  const { mutate: updateStatus } = useUpdateMissionStatus();

  if (missions.length === 0) {
    return <p className="text-neutral text-sm">{content.noMissionsYet}</p>;
  }

  return (
    <div className="flex flex-col gap-3">
      {missions.map((mission) => (
        <Container
          key={mission.id}
          roundedSize="3xl"
          padding="xl"
          border
          borderColor="neutral"
          className="w-full"
        >
          <div className="flex items-center gap-4">
            <div className="flex flex-1 flex-col gap-1">
              <div className="flex items-center gap-2">
                <Badge
                  variant="outline"
                  color={STATUS_BADGE_COLOR[mission.status] ?? 'neutral'}
                >
                  {STATUS_LABELS[mission.status] ?? mission.status}
                </Badge>
                <span className="text-neutral text-xs">
                  {mission.sourceLocale} → {mission.targetLocales.join(', ')}
                </span>
              </div>
              <p className="text-sm">
                {mission.wordCount.toLocaleString()} words ·{' '}
                {mission.estimatedHours.toFixed(1)}h ·{' '}
                <span className="font-semibold">
                  ${(mission.totalPrice / 100).toFixed(2)}
                </span>
              </p>
              {mission.notes && (
                <p className="line-clamp-1 text-neutral text-xs">
                  {mission.notes}
                </p>
              )}
            </div>

            <div className="flex items-center gap-2">
              {mission.status === 'pending' && (
                <>
                  <Button
                    type="button"
                    color="text"
                    size="sm"
                    label={content.acceptMission.value}
                    onClick={() =>
                      updateStatus({
                        missionId: mission.id,
                        body: { status: 'accepted' },
                      })
                    }
                  >
                    {content.accept}
                  </Button>
                  <Button
                    type="button"
                    color="text"
                    variant="outline"
                    size="sm"
                    label={content.declineMission.value}
                    onClick={() =>
                      updateStatus({
                        missionId: mission.id,
                        body: { status: 'canceled' },
                      })
                    }
                  >
                    {content.decline}
                  </Button>
                </>
              )}

              {mission.status === 'accepted' && (
                <Button
                  type="button"
                  color="text"
                  size="sm"
                  label={content.startMission.value}
                  onClick={() =>
                    updateStatus({
                      missionId: mission.id,
                      body: { status: 'in_progress' },
                    })
                  }
                >
                  {content.start}
                </Button>
              )}

              {mission.status === 'reviewer_review' && (
                <Button
                  type="button"
                  color="text"
                  size="sm"
                  label={content.markMissionAsDone.value}
                  onClick={() =>
                    updateStatus({
                      missionId: mission.id,
                      body: { status: 'client_review' },
                    })
                  }
                >
                  {content.markDone}
                </Button>
              )}

              <Link
                to={App_ReviewerMarketplace_Dashboard_Mission_Path as any}
                params={{ missionId: mission.id } as any}
                color="text"
                variant="hoverable"
                label={content.openMissionChat.value}
              >
                <MessageSquare size={16} />
              </Link>
            </div>
          </div>
        </Container>
      ))}
    </div>
  );
};
