import { Container } from '@intlayer/design-system/container';
import type { FC } from 'react';
import { Skeleton } from '#components/Skeleton';

export const TagListSkeleton: FC = () => (
  <div className="flex size-full flex-1 flex-col gap-10 px-10 py-6">
    <Skeleton className="h-10 w-full max-w-md rounded-lg" />
    <div className="flex flex-1 justify-center">
      <Container
        roundedSize="4xl"
        className="m-auto mt-[15%] flex min-h-60 w-full max-w-[400px] flex-col justify-center gap-2 p-6"
      >
        <div className="flex flex-1 flex-col gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex flex-col gap-2 p-2">
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-3 w-1/3" />
              <Skeleton className="h-10 w-full" />
            </div>
          ))}
        </div>
        <Skeleton className="mt-12 ml-auto h-10 w-32 rounded-lg" />
      </Container>
    </div>
    <div className="flex w-full flex-row items-end justify-between gap-4">
      <div className="flex flex-col gap-4">
        <Skeleton className="h-4 w-48" />
        <Skeleton className="h-9 w-24 rounded-lg" />
      </div>
      <Skeleton className="h-9 w-48 rounded-lg" />
    </div>
  </div>
);
