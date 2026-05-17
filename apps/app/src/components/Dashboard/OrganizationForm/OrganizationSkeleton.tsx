import { Container } from '@intlayer/design-system/container';
import type { FC } from 'react';
import { Skeleton } from '#components/Skeleton';

export const OrganizationSkeleton: FC = () => (
  <div className="flex w-full max-w-6xl flex-col items-center justify-center gap-8">
    <div className="grid w-full min-w-0 justify-evenly gap-x-5 gap-y-4 max-md:grid-cols-1 md:grid-cols-[8fr_7fr] lg:gap-x-16">
      <div className="mb-auto flex min-w-0 flex-col gap-4">
        <Container
          roundedSize="3xl"
          padding="md"
          className="flex size-full h-70 flex-col gap-3"
        >
          <Skeleton className="h-6 w-1/3" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </Container>
        <Container
          roundedSize="3xl"
          padding="md"
          className="flex size-full flex-col gap-3"
        >
          <Skeleton className="h-6 w-1/4" />
          <Skeleton className="h-20 w-full" />
        </Container>
        <Container
          roundedSize="3xl"
          padding="md"
          className="flex size-full h-70 flex-col gap-3"
        >
          <Skeleton className="h-6 w-1/3" />
          <Skeleton className="h-10 w-full" />
        </Container>
      </div>
      <div className="mb-auto flex min-w-0 flex-col gap-4">
        <Container
          roundedSize="3xl"
          padding="md"
          className="flex size-full h-140 flex-col gap-3"
        >
          <Skeleton className="h-6 w-1/4" />
          {[1, 2, 3, 4].map((i) => (
            <>
              <Skeleton className="my-4 h-6 w-1/4" />
              <div key={i} className="flex items-center gap-3">
                <Skeleton className="size-8 rounded-full" />
                <Skeleton className="h-5 w-32" />
                <Skeleton className="ml-auto h-7 w-16 rounded-lg" />
              </div>
            </>
          ))}
        </Container>
      </div>
    </div>

    <Container roundedSize="3xl" padding="lg" className="w-full">
      <div className="flex items-start gap-6 px-4">
        <Skeleton className="size-10 shrink-0 rounded-full" />
        <div className="flex-1">
          <Skeleton className="h-5 w-40" />
          <Skeleton className="mt-2 h-4 w-64" />
          <Skeleton className="mt-4 h-9 w-44 rounded-lg" />
        </div>
      </div>
    </Container>
  </div>
);
