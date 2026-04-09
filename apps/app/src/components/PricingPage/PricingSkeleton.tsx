import { Container } from '@intlayer/design-system/container';
import type { FC } from 'react';
import { Skeleton } from '#components/Skeleton';

export const PricingSkeleton: FC = () => (
  <div className="flex flex-col items-center justify-center p-10">
    <Skeleton className="mb-4 h-12 w-64" />
    <Skeleton className="mb-12 h-6 w-96" />

    <div className="grid w-full grid-cols-1 gap-8 md:grid-cols-2 lg:max-w-7xl lg:grid-cols-3">
      {[...Array(3)].map((_, i) => (
        <Container
          key={i}
          roundedSize="3xl"
          padding="md"
          className="flex flex-col gap-6 p-8"
        >
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-4 w-48" />
          <div className="flex flex-col gap-3">
            {[...Array(5)].map((_, j) => (
              <Skeleton key={j} className="h-4 w-full" />
            ))}
          </div>
          <Skeleton className="mt-8 h-12 w-full rounded-xl" />
        </Container>
      ))}
    </div>
  </div>
);
