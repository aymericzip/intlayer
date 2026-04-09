import { Container } from '@intlayer/design-system/container';
import type { FC } from 'react';
import { Skeleton } from '#components/Skeleton';

export const OrganizationSkeleton: FC = () => (
  <div className="flex w-full max-w-5xl flex-col gap-4">
    <div className="grid w-full justify-evenly gap-x-5 gap-y-4 max-md:grid-cols-1 md:grid-cols-2 lg:gap-x-16">
      <div className="mb-auto flex flex-col gap-4">
        {[1, 2].map((i) => (
          <>
            <Container
              key={i}
              roundedSize="3xl"
              padding="md"
              className="flex size-full flex-col gap-2"
            >
              <Skeleton className="h-6 w-1/3" />
              <Skeleton className="h-10 w-full" />
            </Container>
            <Skeleton className="h-40 w-full rounded-xl" />
          </>
        ))}
        <Skeleton className="h-20 w-full rounded-xl" />
      </div>
      <div className="mb-auto flex flex-col gap-4">
        {[1, 2, 3, 4].map((i) => (
          <Container
            key={i}
            roundedSize="3xl"
            padding="md"
            className="flex size-full flex-col gap-2"
          >
            <Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-32 w-full" />
          </Container>
        ))}
      </div>
    </div>
  </div>
);
