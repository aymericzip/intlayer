import { Button } from '@intlayer/design-system/button';
import { App_Dashboard_Tags_Path } from '@intlayer/design-system/routes';
import { ArrowLeft } from 'lucide-react';
import type { FC } from 'react';
import { useIntlayer } from 'react-intlayer';
import { Skeleton } from '#components/Skeleton';
import { useLocalizedNavigate } from '#hooks/useLocalizedNavigate.ts';
import { DictionaryListSkeleton } from '../DictionaryListDashboard/DictionaryListSkeleton';

export const TagDetailsSkeleton: FC = () => {
  const navigate = useLocalizedNavigate();
  const { returnToTagList } = useIntlayer('tag-details');

  return (
    <div className="flex size-full flex-1 flex-col gap-10">
      {/* Header bar */}
      <div className="flex items-center gap-2 px-10">
        <Button
          type="button"
          onClick={() => navigate({ to: App_Dashboard_Tags_Path })}
          variant="hoverable"
          className="z-10 me-auto"
          color="text"
          Icon={ArrowLeft}
          label={returnToTagList.label.value}
        >
          {returnToTagList.text}
        </Button>
        <div className="flex items-center gap-2">
          <Skeleton className="size-9 rounded-xl" />
          <Skeleton className="h-9 w-24 rounded-xl" />
        </div>
      </div>

      {/* Form fields skeleton */}
      <div className="flex flex-col gap-8 px-10">
        <div className="flex size-full flex-1 gap-8 max-md:flex-col">
          <div className="flex flex-1 flex-col gap-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-10 w-full rounded-xl" />
          </div>
          <div className="flex flex-1 flex-col gap-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-10 w-full rounded-xl" />
          </div>
        </div>

        <div className="flex size-full flex-1 gap-8 max-md:flex-col">
          <div className="flex flex-1 flex-col gap-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-24 w-full rounded-xl" />
          </div>
          <div className="flex flex-1 flex-col gap-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-24 w-full rounded-xl" />
          </div>
        </div>
      </div>

      {/* Section Title Skeleton */}
      <div className="px-10">
        <Skeleton className="h-7 w-72" />
      </div>

      {/* Dictionaries Table Skeleton */}
      <DictionaryListSkeleton showToolBar={true} />
    </div>
  );
};
