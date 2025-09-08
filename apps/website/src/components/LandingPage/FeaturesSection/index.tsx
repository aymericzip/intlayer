'use client';

import { Loader } from '@intlayer/design-system';
import { useDevice } from '@intlayer/design-system/hooks';
import { cn } from '@utils/cn';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { type IntlayerNode, useIntlayer } from 'next-intlayer';
import dynamic from 'next/dynamic';
import {
  type FC,
  type PropsWithChildren,
  type ReactNode,
  startTransition,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

/* -------------------------------------------------------------------------- */
/*                   Dynamic Imports for Heavy Child Sections                 */
/* -------------------------------------------------------------------------- */

const DynamicIDESection = dynamic(
  () => import('./IDESection').then((mod) => mod.IDESection),
  {
    loading: () => <Loader />,
  }
);

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
/*                               Types & Utils                                */
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

// Utility function to create sections with mobile wrapper when needed
const createSections = (
  sectionsData: any[],
  progress: number,
  isMobile: boolean
): Section[] => {
  const MobileWrapper = ({ children }: { children: React.ReactNode }) => (
    <div className="w-full max-w-sm mx-auto">
      <div className="transform scale-100 origin-center">{children}</div>
    </div>
  );

  return sectionsData.map((sectionData) => {
    const baseSection: Section = {
      ...sectionData,
      children: (() => {
        switch (sectionData.id.value) {
          case 'codebase':
            return <DynamicIDESection scrollProgress={progress} />;
          case 'visual-editor':
            return <DynamicVisualEditorSection />;
          case 'multilingual':
            return <DynamicMultilingualSection scrollProgress={progress} />;
          case 'markdown':
            return <DynamicMarkdownSection scrollProgress={progress} />;
          case 'autocomplete':
            return <DynamicAutocompletionSection scrollProgress={progress} />;
          default:
            return <>{sectionData.title}</>;
        }
      })(),
    };

    // Wrap with mobile wrapper if needed
    return isMobile
      ? {
          ...baseSection,
          children: <MobileWrapper>{baseSection.children}</MobileWrapper>,
        }
      : baseSection;
  });
};

// Custom hook for unified navigation
const useFeaturesNavigation = (sectionsData: any[], isMobile: boolean) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const [useAnimations, setUseAnimations] = useState(true);

  // Fix hydration issues by ensuring client-side rendering
  useEffect(() => {
    setIsClient(true);
    // Disable animations if there are hydration issues
    const timer = setTimeout(() => {
      setUseAnimations(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const navigate = useCallback(
    (newIndex: number) => {
      setActiveIndex(newIndex);
      setProgress(newIndex / sectionsData.length);
    },
    [sectionsData.length]
  );

  const next = useCallback(() => {
    setDirection(1);
    setActiveIndex((prev) => {
      const newIndex = (prev + 1) % sectionsData.length;
      setProgress(newIndex / sectionsData.length);
      return newIndex;
    });
  }, [sectionsData.length]);

  const prev = useCallback(() => {
    setDirection(-1);
    setActiveIndex((prev) => {
      const newIndex = (prev - 1 + sectionsData.length) % sectionsData.length;
      setProgress(newIndex / sectionsData.length);
      return newIndex;
    });
  }, [sectionsData.length]);

  return {
    activeIndex,
    progress,
    direction,
    isClient,
    useAnimations,
    navigate,
    next,
    prev,
  };
};

/* -------------------------------------------------------------------------- */
/*                               Mobile Components                             */
/* -------------------------------------------------------------------------- */

// Mobile header with navigation
const MobileHeader: FC<{
  sections: Section[];
  activeIndex: number;
  onPrev: () => void;
  onNext: () => void;
}> = ({ sections, activeIndex, onPrev, onNext }) => (
  <div className="mb-6 flex w-full flex-row items-center justify-between px-6">
    <button
      onClick={onPrev}
      aria-label="Previous feature"
      className="rounded-full bg-neutral/20 p-2"
    >
      <ChevronLeft className="h-5 w-5 text-text" />
    </button>
    <h2 className="text-center text-lg font-bold text-text">
      {sections[activeIndex].title}
    </h2>
    <button
      onClick={onNext}
      aria-label="Next feature"
      className="rounded-full bg-neutral/20 p-2"
    >
      <ChevronRight className="h-5 w-5 text-text" />
    </button>
  </div>
);

// Mobile carousel content
const MobileCarouselContent: FC<{
  sections: Section[];
  activeIndex: number;
  direction: number;
  useAnimations: boolean;
  onDragEnd: (event: any, info: any) => void;
}> = ({ sections, activeIndex, direction, useAnimations, onDragEnd }) => {
  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 200 : -200,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -200 : 200,
      opacity: 0,
    }),
  };

  return (
    <div className="relative w-full max-w-md overflow-hidden">
      {useAnimations ? (
        <AnimatePresence custom={direction} mode="popLayout">
          <motion.div
            key={sections[activeIndex].id.value}
            className="absolute left-0 top-0 flex w-full flex-col items-center justify-center gap-4 px-6 py-6"
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.8}
            onDragEnd={onDragEnd}
          >
            <div className="w-full rounded-2xl bg-neutral/10 p-6 shadow-md">
              {sections[activeIndex].children}
            </div>
            <p className="text-center text-sm text-neutral">
              {sections[activeIndex].description}
            </p>
          </motion.div>
        </AnimatePresence>
      ) : (
        <div className="flex w-full flex-col items-center justify-center gap-4 px-6 py-6">
          <div className="w-full rounded-2xl bg-neutral/10 p-6 shadow-md">
            {sections[activeIndex].children}
          </div>
          <p className="text-center text-sm text-neutral">
            {sections[activeIndex].description}
          </p>
        </div>
      )}
    </div>
  );
};

// Mobile pagination dots
const MobilePagination: FC<{
  sections: Section[];
  activeIndex: number;
  onNavigate: (index: number) => void;
}> = ({ sections, activeIndex, onNavigate }) => (
  <div className="mt-6 flex gap-2">
    {sections.map((_, index) => (
      <button
        key={index}
        aria-label={`Go to feature ${index + 1}`}
        title={`Go to feature ${index + 1}`}
        onClick={() => onNavigate(index)}
        className={cn(
          'h-2 w-2 rounded-full transition-all',
          index === activeIndex
            ? 'bg-text w-4'
            : 'bg-neutral/40 hover:bg-neutral/70'
        )}
      />
    ))}
  </div>
);

// Unified mobile carousel
const MobileCarousel: FC<{
  sections: Section[];
  activeIndex: number;
  direction: number;
  isClient: boolean;
  useAnimations: boolean;
  navigate: (index: number) => void;
  next: () => void;
  prev: () => void;
}> = ({
  sections,
  activeIndex,
  direction,
  isClient,
  useAnimations,
  navigate,
  next,
  prev,
}) => {
  const handleDragEnd = (event: any, info: any) => {
    if (info.offset.x < -50) {
      next();
    } else if (info.offset.x > 50) {
      prev();
    }
  };

  const handleNavigate = (index: number) => {
    navigate(index);
  };

  // Show loading state until client-side hydration is complete
  if (!isClient) {
    return (
      <section className="relative z-0 w-screen h-[550vh]">
        <div className="sticky left-0 top-0 mb-[70vh] h-[30vh] w-full">
          <div className="absolute left-10 top-20 flex h-3/5 w-[2px] md:top-[20vh]">
            {/* Loading placeholder with same structure as desktop */}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative flex flex-col w-full items-center justify-center overflow-hidden bg-background py-10">
      <MobileHeader
        sections={sections}
        activeIndex={activeIndex}
        onPrev={prev}
        onNext={next}
      />

      <MobileCarouselContent
        sections={sections}
        activeIndex={activeIndex}
        direction={direction}
        useAnimations={useAnimations}
        onDragEnd={handleDragEnd}
      />

      <MobilePagination
        sections={sections}
        activeIndex={activeIndex}
        onNavigate={handleNavigate}
      />
    </section>
  );
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
/*                       FeaturesSection Wrapper Example                      */
/* -------------------------------------------------------------------------- */

export const FeaturesSection: FC = () => {
  const { isMobile } = useDevice();
  const sectionsData = useIntlayer('features-section');

  // Use unified navigation hook
  const {
    activeIndex,
    progress,
    direction,
    isClient,
    useAnimations,
    navigate,
    next,
    prev,
  } = useFeaturesNavigation(sectionsData, isMobile ?? false);

  // Create sections with unified logic
  const sections = createSections(sectionsData, progress, isMobile ?? false);

  // Use mobile-optimized version for mobile devices
  if (isMobile) {
    return (
      <MobileCarousel
        sections={sections}
        activeIndex={activeIndex}
        direction={direction}
        isClient={isClient}
        useAnimations={useAnimations}
        navigate={navigate}
        next={next}
        prev={prev}
      />
    );
  }

  // Desktop version with scroll-based progress
  const [scrollProgress, setScrollProgress] = useState(0);
  const desktopSections = createSections(sectionsData, scrollProgress, false);

  return (
    <FeaturesCarousel
      sections={desktopSections}
      progress={scrollProgress}
      setProgress={setScrollProgress}
    />
  );
};
