import { Container } from '@intlayer/design-system/container';
import type { FC } from 'react';
import { Skeleton } from '#components/Skeleton';

export const ProjectCardSkeleton: FC = () => (
  <Container
    roundedSize="2xl"
    border
    borderColor="neutral"
    padding="md"
    className="gap-4"
  >
    <Skeleton className="aspect-video w-full rounded-xl" />
    <Skeleton className="h-7 w-3/4" />

    <div className="flex items-center gap-4">
      <Skeleton className="aspect-square size-12 rounded-full" />
      <div className="flex flex-1 flex-col gap-2">
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-3 w-1/3" />
      </div>
    </div>

    <div className="flex flex-row items-center gap-1">
      <div className="flex flex-row -space-x-2">
        {[1, 2, 3].map((i) => (
          <Skeleton
            key={i}
            className="size-8 rounded-full border-2 border-card"
          />
        ))}
      </div>
    </div>

    <Skeleton className="mt-auto h-10 w-full rounded-lg" />
  </Container>
);
