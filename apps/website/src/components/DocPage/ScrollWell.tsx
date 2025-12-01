'use client';

import { useGetElementById, useScrollY } from '@intlayer/design-system/hooks';
import type { FC, SVGProps } from 'react';
import { useActiveSection } from './useActiveSection';
import { useTitlesTree } from './useTitlesTree';

const RADIUS = 5;
const BORDER_WIDTH = 1;
const RADIUS_CENTER = RADIUS - BORDER_WIDTH;

export const ScrollWell: FC<SVGProps<SVGSVGElement>> = (props) => {
  // scrollPercentage goes from 0 to 1
  const contentElement = useGetElementById('content');
  const { scrollPercentage } = useScrollY({ element: contentElement });

  const circumference = 2 * Math.PI * RADIUS_CENTER;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - scrollPercentage * circumference;

  return (
    <svg
      role="progressbar"
      viewBox={`0 0 ${RADIUS * 2} ${RADIUS * 2}`}
      aria-valuenow={scrollPercentage}
      aria-valuemin={0}
      aria-valuemax={1}
      {...props}
    >
      <circle
        cx={RADIUS}
        cy={RADIUS}
        r={RADIUS_CENTER}
        fill="none"
        strokeWidth={BORDER_WIDTH}
        className="stroke-current/25"
      />
      <circle
        cx={RADIUS}
        cy={RADIUS}
        r={RADIUS_CENTER}
        fill="none"
        strokeWidth={BORDER_WIDTH}
        stroke="currentColor"
        strokeDasharray={strokeDasharray}
        strokeDashoffset={strokeDashoffset}
        strokeLinecap="round"
        transform={`rotate(-90 ${RADIUS} ${RADIUS})`}
        className="transition-all"
      />
    </svg>
  );
};

const Title: FC = () => {
  const { topLevelHeadings, headingMap } = useTitlesTree({
    levels: [2, 3],
    contentId: 'content',
  });

  const contentElement = useGetElementById('content');
  const { activeParent } = useActiveSection({
    contentElement,
    headings: topLevelHeadings,
    headingMap,
  });
  return (
    <span className="w-full flex-1 truncate text-neutral text-sm">
      {activeParent?.innerText ?? ''}
    </span>
  );
};

export const ScrollWellAndTitle: FC = () => {
  return (
    <div className="flex size-5 h-8 flex-1 flex-row items-center justify-between gap-5 p-2">
      <ScrollWell className="block h-full shrink-0" />
      <Title />
    </div>
  );
};
