import { Container } from '@intlayer/design-system/container';
import type { FC } from 'react';
import { Skeleton } from '#components/Skeleton';

export const ProfileSkeleton: FC = () => (
  <div className="flex w-full max-w-5xl flex-col items-center justify-center gap-4">
    <div className="grid w-full grid-cols-1 justify-evenly gap-x-5 gap-y-10 max-md:grid-cols-1 md:grid-cols-2 lg:gap-x-16">
      <div className="m-auto flex size-full w-full flex-col gap-10 md:max-w-xl">
        <Container
          roundedSize="3xl"
          padding="md"
          className="flex flex-col gap-4"
        >
          <Skeleton className="h-7 w-1/3" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="mt-8 h-10 w-full" />
        </Container>
        <Container
          roundedSize="3xl"
          padding="md"
          className="flex flex-col gap-2"
        >
          <Skeleton className="h-6 w-1/4" />
          <Skeleton className="h-10 w-full" />
        </Container>
      </div>
      <div className="flex w-full flex-col gap-10 md:max-w-xl">
        {[1, 2, 3].map((i) => (
          <Container
            key={i}
            roundedSize="3xl"
            padding="md"
            className="m-auto flex w-full flex-col gap-4"
          >
            <Skeleton className="h-7 w-1/3" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </Container>
        ))}
      </div>
    </div>
  </div>
);
