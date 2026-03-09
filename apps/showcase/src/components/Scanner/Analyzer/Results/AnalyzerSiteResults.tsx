import { Tag } from '@intlayer/design-system';
import type { FC, ReactNode } from 'react';
import { useIntlayer } from 'react-intlayer';
import { cn } from '#/utils/cn';
import type { DomainData } from './types';

type SkeletonProps = {
  className?: string;
  children?: ReactNode;
  isLoading?: boolean;
  renderChildren?: boolean;
};

const Skeleton: FC<SkeletonProps> = ({
  className,
  children,
  isLoading,
  renderChildren,
}) =>
  isLoading ? (
    <div
      className={cn(
        'inline-block animate-pulse rounded-xl bg-neutral/20',
        className
      )}
    >
      {renderChildren && <div className="opacity-0">{children}</div>}
    </div>
  ) : (
    children
  );

type AnalyzerSiteResultsProps = {
  domainData?: Partial<DomainData>;
  score?: number;
  isLoading?: boolean;
};

export const AnalyzerSiteResults: FC<AnalyzerSiteResultsProps> = ({
  domainData,
  score,
  isLoading,
}) => {
  const {
    score: scoreTitle,
    status,
    messages,
  } = useIntlayer('analyzer-results');

  return (
    <div className="flex flex-col pb-6">
      <div className="mb-4 flex items-center justify-between">
        <span className="font-semibold text-2xl text-text/70">
          <span className="mr-2 text-neutral">{scoreTitle.title}:</span>

          <Skeleton isLoading={isLoading && !score}>
            <span className="mr-1 text-text">{score ?? 0}</span>
          </Skeleton>
          <span className="text-neutral text-sm">/100</span>
        </span>

        <Skeleton isLoading={isLoading && !score}>
          <Tag color={status(score ?? 0).color.value} size="md">
            {status(score ?? 0).label}
          </Tag>
        </Skeleton>
      </div>

      <div className="flex items-center gap-8">
        <Skeleton
          className="h-[180px] w-[300px] max-w-[30vw] rounded-xl border-4"
          isLoading={isLoading && !domainData?.image}
          renderChildren={false}
        >
          {domainData?.image && (
            <img
              src={domainData.image}
              alt={messages.websitePreview.value}
              width={300}
              height={180}
              className="max-w-[30vw] rounded-xl border-4 border-neutral"
            />
          )}
        </Skeleton>

        <div className="flex-1 text-left">
          <Skeleton
            className="mb-2 h-7 w-3/4"
            isLoading={isLoading && !domainData?.title}
          >
            <h3 className="mb-2 font-semibold text-neutral-900 text-xl dark:text-neutral-100">
              {domainData?.title ?? messages.noTitle}
            </h3>
          </Skeleton>
          <Skeleton
            className="mb-2 h-4 w-full"
            isLoading={isLoading && !domainData?.description}
          >
            <p className="text-neutral text-sm">
              {domainData?.description ?? messages.noDescription}
            </p>
          </Skeleton>
        </div>
      </div>
    </div>
  );
};
