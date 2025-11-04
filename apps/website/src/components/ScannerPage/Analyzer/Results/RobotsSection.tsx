'use client';

import { Bot, FileText } from 'lucide-react';
import { useIntlayer } from 'next-intlayer';
import type { FC } from 'react';
import { memo } from 'react';
import { InformationTag, StatusIcon } from './AnalyzerPageResults';

type RobotsSectionProps = {
  data: any;
};

export const RobotsSection: FC<RobotsSectionProps> = memo(({ data }) => {
  const { sections, robotsLabels, values } = useIntlayer('analyzer-results');

  return (
    <>
      <h3 className="mt-6 mb-3 font-semibold text-lg text-text/80">
        {sections.robots}
      </h3>
      <div className="mt-2 grid grid-cols-1 gap-x-8 gap-y-2 px-2 text-left text-sm sm:grid-cols-2">
        <div className="grid grid-cols-[auto_auto_1fr_auto] items-center gap-2 text-neutral">
          <Bot size={16} />
          <strong>{robotsLabels.accessible}</strong>
          <span className="text-left text-text/70">
            {data?.summary?.robotsTxt !== undefined ? (
              <StatusIcon ok={Boolean(data?.summary?.robotsTxt)} />
            ) : (
              values.unknown
            )}
          </span>
          <InformationTag id="accessible">
            {robotsLabels.accessibleDescription}
          </InformationTag>
        </div>
        <div className="grid grid-cols-[auto_auto_1fr_auto] items-center gap-2 text-neutral">
          <FileText size={16} />
          <strong>{robotsLabels.disallowWithoutLocaleAlternates}</strong>
          <span className="flex items-center gap-2 text-left text-text/70">
            <StatusIcon
              ok={
                (data?.summary?.robotsDisallowWithoutLocaleAlternates?.length ??
                  0) >= 0
              }
            />
            {data?.summary?.robotsDisallowWithoutLocaleAlternates?.length ?? 0}
          </span>
          <InformationTag id="disallowWithoutLocaleAlternates">
            {robotsLabels.disallowWithoutLocaleAlternatesDescription}
          </InformationTag>
        </div>
      </div>
    </>
  );
});
