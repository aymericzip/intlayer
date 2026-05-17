import { Container } from '@intlayer/design-system/container';
import type { FC } from 'react';
import { Skeleton } from '#components/Skeleton';

export const ProfileSkeleton: FC = () => (
  <div className="flex w-full max-w-6xl flex-col items-center justify-center gap-8">
    <Container
      roundedSize="3xl"
      padding="lg"
      className="w-full flex-row items-center gap-10"
    >
      <Skeleton className="size-16 shrink-0 rounded-full" />
      <div className="flex flex-col gap-2">
        <Skeleton className="h-9 w-48" />
        <Skeleton className="h-6 w-36" />
      </div>
      <div className="mt-auto ml-auto flex flex-row gap-2">
        <Skeleton className="h-9 w-36 rounded-lg" />
        <Skeleton className="h-9 w-24 rounded-lg" />
      </div>
    </Container>

    <div className="justify-top grid w-full grid-cols-1 gap-x-5 gap-y-4 max-md:grid-cols-1 md:grid-cols-[8fr_7fr] lg:gap-x-16">
      <div className="flex size-full w-full flex-col gap-10 md:max-w-xl">
        <Container roundedSize="3xl" padding="md" className="w-full">
          <Skeleton className="mb-4 h-7 w-1/3" />
          {[1, 2, 3].map((i) => (
            <div key={i} className="mb-3 flex items-center gap-3">
              <Skeleton className="size-9 rounded-full" />
              <Skeleton className="h-5 w-32" />
              <Skeleton className="ml-auto h-8 w-20 rounded-lg" />
            </div>
          ))}
        </Container>
      </div>

      <div className="flex w-full flex-col gap-10 md:max-w-xl">
        <Container roundedSize="3xl" padding="md" className="w-full">
          <Skeleton className="mb-8 h-7 w-1/3" />
          <Skeleton className="h-10 w-full" />
        </Container>
        <Container roundedSize="3xl" padding="md" className="w-full">
          <Skeleton className="mb-8 h-7 w-1/3" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="mt-3 h-10 w-full" />
        </Container>
      </div>
    </div>

    <Container roundedSize="3xl" padding="lg" className="w-full">
      <div className="flex items-start gap-6 px-4">
        <Skeleton className="size-10 shrink-0 rounded-full" />
        <div className="flex-1">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="mt-2 h-4 w-64" />
          <Skeleton className="mt-4 h-9 w-36 rounded-lg" />
        </div>
      </div>
    </Container>
  </div>
);
