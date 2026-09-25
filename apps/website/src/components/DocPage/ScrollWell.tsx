import { useGetElementById, useScrollY } from '@intlayer/design-system/hooks';
import { AnimatePresence, m } from 'framer-motion';
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
  const { topLevelHeadings, headingMap, headingTexts } = useTitlesTree({
    levels: [2, 3],
    contentId: 'content',
  });

  const contentElement = useGetElementById('content');
  const { activeParent, activeChild } = useActiveSection({
    contentElement,
    headings: topLevelHeadings,
    headingMap,
  });

  const parentTitle = activeParent ? headingTexts.get(activeParent) : undefined;
  const childTitle = activeChild ? headingTexts.get(activeChild) : undefined;

  const firstTitle = parentTitle ?? childTitle;
  const secondTitle =
    parentTitle && childTitle && parentTitle !== childTitle
      ? childTitle
      : undefined;

  return (
    <m.div
      layout
      transition={{ duration: 0.2, ease: 'easeInOut' }}
      className="ml-3 flex min-w-0 flex-1 flex-wrap items-center overflow-hidden"
    >
      <span className="line-clamp-2 text-muted-foreground text-xs leading-snug">
        <m.span
          layout="position"
          transition={{ duration: 0.2, ease: 'easeInOut' }}
          className={
            secondTitle ? 'text-muted-foreground/70' : 'text-muted-foreground'
          }
        >
          {firstTitle ?? ''}
        </m.span>
        <AnimatePresence initial={false}>
          {secondTitle && (
            <m.span
              key="second-title"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: 'easeInOut' }}
              className="text-muted-foreground"
            >
              <span className="mx-1 text-muted-foreground/40">/</span>
              {secondTitle}
            </m.span>
          )}
        </AnimatePresence>
      </span>
    </m.div>
  );
};

export const ScrollWellAndTitle: FC = () => {
  return (
    <div className="flex min-h-8 min-w-0 flex-1 flex-row items-center py-0.5">
      <ScrollWell className="block size-4 shrink-0" />
      <Title />
    </div>
  );
};
