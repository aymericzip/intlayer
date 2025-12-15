'use client';

import type { GetUsersResult, ProjectAPI } from '@intlayer/backend';
import { Avatar, Button, Container } from '@intlayer/design-system';
import { useGetUsers } from '@intlayer/design-system/hooks';
import type { FC } from 'react';

export interface ProjectCardProps {
  project: ProjectAPI;
  onSelect: (projectId: string) => void;
  selectButtonLabel: string;
  selectButtonText: React.ReactNode;
}

export const ProjectCard: FC<ProjectCardProps> = ({
  project,
  onSelect,
  selectButtonLabel,
  selectButtonText,
}) => {
  // Fetch user data for all members
  const { data: usersData, isPending: isLoadingUsers } = useGetUsers(
    {
      ids: project.membersIds.map(String),
    },
    {
      enabled: project.membersIds.length > 0,
    }
  );

  const users = (usersData as GetUsersResult | undefined)?.data ?? [];
  const displayedUsers = users.slice(0, 5);
  const remainingCount = users.length - displayedUsers.length;

  return (
    <Container
      roundedSize="xl"
      border
      borderColor="neutral"
      padding="md"
      className="gap-4"
    >
      <h3 className="font-bold text-xl">{project.name}</h3>

      {project.membersIds.length > 0 && (
        <div className="flex flex-row items-center gap-1">
          <div className="-space-x-2 flex flex-row">
            {[...displayedUsers, ...displayedUsers].map((user) => (
              <Avatar
                key={String(user.id)}
                src={user.image ?? undefined}
                fullname={user.name}
                size="sm"
                isLoading={isLoadingUsers}
              />
            ))}
          </div>
          {remainingCount > 0 && (
            <span className="ml-1 text-neutral text-xs">+{remainingCount}</span>
          )}
        </div>
      )}

      <Button
        onClick={() => onSelect(String(project.id))}
        label={selectButtonLabel}
        color="text"
        className="mt-auto"
      >
        {selectButtonText}
      </Button>
    </Container>
  );
};
