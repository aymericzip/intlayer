'use client';

import { Loader } from '@intlayer/design-system';
import { useDevice } from '@intlayer/design-system/hooks';
import { cn } from '@utils/cn';
import { motion } from 'framer-motion';
import { type IntlayerNode, useIntlayer } from 'next-intlayer';
import dynamic from 'next/dynamic';
import {
  type FC,
  type PropsWithChildren,
  type ReactNode,
  startTransition,
  useEffect,
  useRef,
  useState,
} from 'react';

/* -------------------------------------------------------------------------- */
/*                               Subcomponents                                */
/* -------------------------------------------------------------------------- */

type SectionItemProps = {
  isActive: boolean;
};

const SectionItem: FC<PropsWithChildren<SectionItemProps>> = ({
  children,
  isActive,
}) => (
  <motion.div
    className="flex size-full items-center justify-center p-10"
    initial={{ x: '100%', opacity: 0 }}
    animate={{ x: isActive ? '0%' : '100%', opacity: isActive ? 1 : 0 }}
    transition={{ duration: 0.5, ease: 'easeInOut' }}
  >
    {children}
  </motion.div>
);

const SectionDescription: FC<PropsWithChildren<SectionItemProps>> = ({
  children,
  isActive,
}) => (
  <motion.p
    className="text-neutral bg-background flex size-full items-center justify-center px-16 text-sm md:pr-0 lg:pr-16"
    initial={{ x: '-100%', opacity: 0 }}
    animate={{ x: isActive ? '0%' : '-100%', opacity: isActive ? 1 : 0 }}
    transition={{ duration: 0.5, ease: 'easeInOut', delay: isActive ? 0.5 : 0 }}
  >
    {children}
  </motion.p>
);

export type Section = {
  id: IntlayerNode;
  title: IntlayerNode;
  description: IntlayerNode;
  children: ReactNode;
};

type TitlesProps = {
  sections: Section[];
  activeIndex: number;
  isMobile: boolean;
};

const Titles: FC<TitlesProps> = ({ sections, activeIndex, isMobile }) => (
  <>
    {sections.map((section, index) => {
      const isActive = index === activeIndex;
      // Define the angle step (in radians) between items.
      const angleStep = Math.PI / 10;
      const absIndexDiff = Math.abs(index - activeIndex);
      // Calculate the angle for this item relative to the active item.
      const angle = (index - activeIndex) * angleStep;
      // Define a radius in rem units.
      const radius = 10;

      const fontConst = isMobile ? 2 : 3;

      return (
        <motion.h3
          key={section.id.value}
          className="text-neutral aria-selected:text-text absolute left-3 top-1/4 inline text-xl font-bold leading-snug drop-shadow-sm"
          animate={{
            // Convert polar coords to Cartesian (rem units)
            translateX: isActive
              ? '5rem'
              : `${(radius * Math.cos(angle)) / 4 + 3}rem`,
            translateY: isActive
              ? '3rem'
              : `${
                  (2 / 3) *
                    (radius * Math.sin(angle) * 2 +
                      2 / (absIndexDiff / 5 + 1)) +
                  3
                }rem`,
            opacity: absIndexDiff > 2 ? 0 : absIndexDiff > 1 ? 0.5 : 1,
            fontSize: `${fontConst / (absIndexDiff + 1)}rem`,
          }}
          role="tab"
          transition={{ duration: 0.3 }}
          aria-selected={isActive}
        >
          {section.title}
        </motion.h3>
      );
    })}
  </>
);

type FeaturesCarouselProps = {
  sections: Section[];
  progress: number;
  setProgress: (progress: number) => void;
};

export const FeaturesCarousel: FC<FeaturesCarouselProps> = ({
  sections,
  progress,
  setProgress,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  // Track which section is currently "active"
  const [activeIndex, setActiveIndex] = useState(0);

  // We keep references to compare old vs new, so we only update state if changed
  const activeIndexRef = useRef(activeIndex);
  const progressRef = useRef(progress);

  // Keep them in sync whenever state changes
  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  useEffect(() => {
    progressRef.current = progress;
  }, [progress]);

  const nbSections = sections.length;
  const { isMobile } = useDevice();

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (!containerRef.current) {
            ticking = false;
            return;
          }
          const scrollY = window.scrollY;
          const containerTop = containerRef.current.offsetTop;
          const containerHeight = containerRef.current.offsetHeight;

          const scrollYInContainer = scrollY - containerTop;
          const scrollableHeight = containerHeight - window.innerHeight;
          const sectionHeight = scrollableHeight / nbSections;

          const newIndex = Math.floor(scrollYInContainer / sectionHeight);
          const clampedIndex = Math.max(0, Math.min(newIndex, nbSections - 1));

          // Only update if index changed
          if (activeIndexRef.current !== clampedIndex) {
            startTransition(() => {
              setActiveIndex(clampedIndex);
            });
          }

          // Check boundaries
          const isOverflowing = scrollYInContainer > scrollableHeight;
          const isUnderflowing = scrollYInContainer < 0;

          if (!isOverflowing && !isUnderflowing) {
            const progressInSection =
              (scrollYInContainer % sectionHeight) / sectionHeight;
            // Only update if progress changed
            if (progressRef.current !== progressInSection) {
              startTransition(() => {
                setProgress(progressInSection);
              });
            }
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [nbSections, setProgress]);

  return (
    <section
      className="relative z-0 w-screen"
      style={{
        // Make the entire container as tall as the number of sections * 150vh
        height: `${nbSections * 110}vh`,
      }}
      ref={containerRef}
    >
      {/* Sticky container */}
      <div className="sticky left-0 top-0 mb-[70vh] h-[30vh] w-full">
        {/* Progress Bar */}
        <div className="absolute left-10 top-20 flex h-3/5 w-[2px] md:top-[20vh]">
          <div className="bg-neutral/20 size-full rounded-full">
            <div
              className="bg-text w-full"
              style={{ height: `${progress * 100}%` }}
            />
          </div>
        </div>

        {/* Titles */}
        <div
          role="tablist"
          className="top-15 absolute left-0 z-30 size-full md:top-[15vh] md:w-0 md:text-nowrap"
        >
          <Titles
            sections={sections}
            activeIndex={activeIndex}
            isMobile={isMobile ?? true}
          />
        </div>

        {/* Section content “carousel” in a sticky container */}
        {sections.map((section, index) => (
          <div
            className={cn(
              'absolute right-0 top-[50vh] z-0 h-[50vh] w-full overflow-hidden md:top-0 md:h-screen md:w-2/3',
              index === activeIndex && 'z-20'
            )}
            key={section.id.value}
          >
            <SectionItem isActive={index === activeIndex}>
              {section.children}
            </SectionItem>
          </div>
        ))}

        {/* Descriptions */}
        {sections.map((section, index) => (
          <div
            className={cn(
              'absolute left-0 top-[37vh] z-0 h-[20vh] w-full overflow-hidden md:top-[50vh] md:h-[50vh] md:w-1/3',
              index === activeIndex && 'z-10'
            )}
            key={section.id.value}
          >
            <SectionDescription isActive={index === activeIndex}>
              {section.description}
            </SectionDescription>
          </div>
        ))}
      </div>
    </section>
  );
};

/* -------------------------------------------------------------------------- */
/*                   Dynamic Imports for Heavy Child Sections                 */
/* -------------------------------------------------------------------------- */

// const DynamicIDESection = dynamic(
//   () => import('./IDESection').then((mod) => mod.IDESection),
//   {
//     loading: () => <Loader />,
//   }
// );

const DynamicMarkdownSection = dynamic(
  () => import('./MarkdownSection').then((mod) => mod.MarkdownSection),
  {
    loading: () => <Loader />,
  }
);

const DynamicMultilingualSection = dynamic(
  () => import('./MultilingualSection').then((mod) => mod.MultilingualSection),
  {
    loading: () => <Loader />,
  }
);

const DynamicAutocompletionSection = dynamic(
  () =>
    import('./AutocompletionSection').then((mod) => mod.AutocompletionSection),
  {
    loading: () => <Loader />,
  }
);

const DynamicVisualEditorSection = dynamic(
  () => import('./VisualEditorSection').then((mod) => mod.VisualEditorSection),
  {
    loading: () => <Loader />,
  }
);

/* -------------------------------------------------------------------------- */
/*                       FeaturesSection Wrapper Example                      */
/* -------------------------------------------------------------------------- */

export const FeaturesSection: FC = () => {
  const [progress, setProgress] = useState(0);
  const sectionsData = useIntlayer('features-section');

  const sections: Section[] = sectionsData
    // Filter out anything you don’t want to display
    .map((sectionData) => {
      switch (sectionData.id.value) {
        case 'codebase':
          return {
            ...sectionData,
            children: <></>, // <DynamicIDESection scrollProgress={progress} />,
          };
        case 'visual-editor':
          return {
            ...sectionData,
            children: <DynamicVisualEditorSection />,
          };
        case 'multilingual':
          return {
            ...sectionData,
            children: <DynamicMultilingualSection scrollProgress={progress} />,
          };
        case 'markdown':
          return {
            ...sectionData,
            children: <DynamicMarkdownSection scrollProgress={progress} />,
          };
        case 'autocomplete':
          return {
            ...sectionData,
            children: (
              <DynamicAutocompletionSection scrollProgress={progress} />
            ),
          };
        default:
          return {
            ...sectionData,
            children: <>{sectionData.title}</>,
          };
      }
    });

  return (
    <FeaturesCarousel
      sections={sections}
      progress={progress}
      setProgress={setProgress}
    />
  );
};
