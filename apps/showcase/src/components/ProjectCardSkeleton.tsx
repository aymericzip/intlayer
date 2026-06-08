import { Container } from '@intlayer/design-system/container';

export const ProjectCardSkeleton = () => {
  return (
    <Container
      className="group relative h-full overflow-hidden shadow-lg transition-all [-webkit-mask-image:-webkit-radial-gradient(white,black)]"
      roundedSize="3xl"
      transparency="lg"
    >
      <div className="flex flex-1 flex-col">
        <div className="relative overflow-hidden bg-background">
          {/* Main Image Skeleton */}
          <div className="aspect-video min-h-46 w-screen animate-pulse bg-neutral/40" />
        </div>
        <div className="flex-1 p-4">
          {/* Title */}
          <div className="h-6 w-2/3 animate-pulse rounded-md bg-neutral/20" />
          {/* Description lines */}
          <div className="mt-2 flex flex-col gap-1.5">
            <div className="h-4 w-full animate-pulse rounded-md bg-neutral/15" />
            <div className="h-4 w-4/5 animate-pulse rounded-md bg-neutral/15" />
          </div>
        </div>
      </div>

      <div className="mt-auto px-4 pb-4">
        <div className="flex items-end justify-between gap-2">
          <div className="flex min-w-0 flex-wrap gap-1.5">
            <div className="roundex-md h-4 w-16 animate-pulse bg-neutral/20" />
            <div className="roundex-md h-4 w-12 animate-pulse bg-neutral/20" />
          </div>
          <div className="flex shrink-0 items-center gap-1">
            <div className="inline-flex items-center justify-center rounded-xl p-1.5 ring-0">
              <div className="roundex-md size-3 animate-pulse rounded-full bg-neutral/30" />
            </div>
            <span className="min-w-6 text-center font-medium text-sm text-transparent">
              <div className="roundex-md mx-auto h-4 w-2 animate-pulse bg-neutral/20" />
            </span>
            <div className="inline-flex items-center justify-center rounded-xl p-1.5 ring-0">
              <div className="roundex-md size-3 animate-pulse rounded-full bg-neutral/30" />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};
