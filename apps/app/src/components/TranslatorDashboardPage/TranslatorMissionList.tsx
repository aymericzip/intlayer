import type { TranslationMissionAPI } from '@intlayer/backend';
import { Badge, BadgeColor, BadgeVariant } from '@intlayer/design-system/badge';
import { Button } from '@intlayer/design-system/button';
import { Container } from '@intlayer/design-system/container';
import { useUpdateMissionStatus } from '@intlayer/design-system/hooks';
import { MessageSquare } from 'lucide-react';
import type { FC } from 'react';
import { Link } from '#components/Link/Link';

type TranslatorMissionListProps = {
  missions: TranslationMissionAPI[];
};

const STATUS_LABELS: Record<string, string> = {
  pending: 'Pending',
  accepted: 'Accepted',
  in_progress: 'In progress',
  translator_review: 'Reviewing',
  client_review: 'Client review',
  completed: 'Completed',
  canceled: 'Canceled',
};

const STATUS_BADGE_COLOR: Record<string, BadgeColor> = {
  pending: BadgeColor.SECONDARY,
  accepted: BadgeColor.SECONDARY,
  in_progress: BadgeColor.SECONDARY,
  translator_review: BadgeColor.NEUTRAL,
  client_review: BadgeColor.NEUTRAL,
  completed: BadgeColor.SUCCESS,
  canceled: BadgeColor.NEUTRAL,
};

export const TranslatorMissionList: FC<TranslatorMissionListProps> = ({
  missions,
}) => {
  const { mutate: updateStatus } = useUpdateMissionStatus();

  if (missions.length === 0) {
    return <p className="text-neutral text-sm">No missions yet.</p>;
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
                  variant={BadgeVariant.OUTLINE}
                  color={
                    STATUS_BADGE_COLOR[mission.status] ?? BadgeColor.NEUTRAL
                  }
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
                    label="Accept mission"
                    onClick={() =>
                      updateStatus({
                        missionId: mission.id,
                        body: { status: 'accepted' },
                      })
                    }
                  >
                    Accept
                  </Button>
                  <Button
                    type="button"
                    color="text"
                    variant="outline"
                    size="sm"
                    label="Decline mission"
                    onClick={() =>
                      updateStatus({
                        missionId: mission.id,
                        body: { status: 'canceled' },
                      })
                    }
                  >
                    Decline
                  </Button>
                </>
              )}

              {mission.status === 'accepted' && (
                <Button
                  type="button"
                  color="text"
                  size="sm"
                  label="Start mission"
                  onClick={() =>
                    updateStatus({
                      missionId: mission.id,
                      body: { status: 'in_progress' },
                    })
                  }
                >
                  Start
                </Button>
              )}

              {mission.status === 'translator_review' && (
                <Button
                  type="button"
                  color="text"
                  size="sm"
                  label="Mark mission as done"
                  onClick={() =>
                    updateStatus({
                      missionId: mission.id,
                      body: { status: 'client_review' },
                    })
                  }
                >
                  Mark done
                </Button>
              )}

              <Link
                to={
                  '/{-$locale}/translator-marketplace/dashboard/mission/$missionId' as any
                }
                params={{ missionId: mission.id } as any}
                color="text"
                variant="hoverable"
                label="Open mission chat"
                Icon={MessageSquare}
              />
            </div>
          </div>
        </Container>
      ))}
    </div>
  );
};
