'use client';

import { Bot, FileText } from 'lucide-react';
import type { FC } from 'react';
import { memo } from 'react';
import { useIntlayer } from 'react-intlayer';
import { FieldItem } from './FieldItem';
import type { MergedData } from './types';

type RobotsSectionProps = {
  data: MergedData;
  isLoading?: boolean;
};

export const RobotsSection: FC<RobotsSectionProps> = memo(
  ({ data, isLoading }) => {
    const { sections, robotsLabels } = useIntlayer('analyzer-results');

    return (
      <>
        <h3 className="mt-6 mb-3 font-semibold text-lg text-text/80">
          {sections.robots}
        </h3>
        <div className="mt-2 grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-x-8 gap-y-2 px-2 text-sm">
          <FieldItem
            id="accessible"
            icon={<Bot size={16} />}
            label={robotsLabels.accessible}
            event={data['robots_robotsPresent']}
            details={robotsLabels.accessibleDescription}
            isLoading={isLoading}
          />
          <FieldItem
            id="disallowWithoutLocaleAlternates"
            icon={<FileText size={16} />}
            label={robotsLabels.disallowWithoutLocaleAlternates}
            event={data['robots_noLocalizedUrlsForgotten']}
            details={robotsLabels.disallowWithoutLocaleAlternatesDescription}
            isLoading={isLoading}
          />
        </div>
      </>
    );
  }
);
