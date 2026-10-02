import { useDevice } from '@intlayer/design-system/hooks';
import { Loader } from '@intlayer/design-system/loader';
import { cn, scheduleFrameTask } from '@intlayer/design-system/utils';
import { m } from 'framer-motion';
import { getHTMLTextDir } from 'intlayer';
import {
  type FC,
  lazy,
  type PropsWithChildren,
  type ReactNode,
  Suspense,
  startTransition,
  useEffect,
  useRef,
  useState,
} from 'react';
import { type IntlayerNode, useIntlayer, useLocale } from 'react-intlayer';
import { FrameworkProvider } from './FrameworkContext';

/* -------------------------------------------------------------------------- */
/*                               Subcomponents                                */
/* -------------------------------------------------------------------------- */

/** `1` in left-to-right locales, `-1` in right-to-left ones. */
type DirectionFactor = 1 | -1;

type SectionItemProps = {
  isActive: boolean;
  /** Mirrors the horizontal slide in right-to-left locales. */
  directionFactor: DirectionFactor;
};

const SectionItem: FC<PropsWithChildren<SectionItemProps>> = ({
  children,
  isActive,
  directionFactor,
}) => (
  <m.div
    className="m-auto flex size-full max-w-5xl items-center justify-center p-10"
    initial={{ x: `${100 * directionFactor}%`, opacity: 0 }}
    animate={{
      x: isActive ? '0%' : `${100 * directionFactor}%`,
      opacity: isActive ? 1 : 0,
    }}
    transition={{ duration: 0.5, ease: 'easeInOut' }}
  >
    {children}
  </m.div>
);

const SectionDescription: FC<PropsWithChildren<SectionItemProps>> = ({
  children,
  isActive,
  directionFactor,
}) => (
  <m.p
    className="flex size-full items-center justify-center px-16 text-muted-foreground text-sm md:pe-0 lg:pe-16"
    initial={{ x: `${-100 * directionFactor}%`, opacity: 0 }}
    animate={{
      x: isActive ? '0%' : `${-100 * directionFactor}%`,
      opacity: isActive ? 1 : 0,
    }}
    transition={{ duration: 0.5, ease: 'easeInOut' }}
  >
    {children}
  </m.p>
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
  directionFactor: DirectionFactor;
};

/**
 * Places one title on the carousel's arc, relative to the active one.
 *
 * Extracted so the same values can be given to `initial` as to `animate`:
 * Motion renders `initial` into the server markup, where `animate` is only
 * applied once the browser has hydrated. Without it the active title — by far
 * the largest text on the page, and so its Largest Contentful Paint — was
 * served at its stylesheet size and only grew to `fontSize` seconds later.
 *
 * @param index - Position of the title being placed.
 * @param activeIndex - Position of the title currently in focus.
 * @param isMobile - Whether the narrow-screen type scale applies.
 * @param directionFactor - Mirrors the arc in right-to-left locales.
 */
const getTitlePlacement = (
  index: number,
  activeIndex: number,
  isMobile: boolean,
  directionFactor: DirectionFactor
) => {
  const isActive = index === activeIndex;
  // Define the angle step (in radians) between items.
  const angleStep = Math.PI / 10;
  const absIndexDiff = Math.abs(index - activeIndex);
  // Calculate the angle for this item relative to the active item.
  const angle = (index - activeIndex) * angleStep;
  // Define a radius in rem units.
  const radius = 10;

  const fontConst = isMobile ? 2 : 3;

  // On narrow screens the upcoming titles fall onto the description below
  const isHiddenUpcomingTitle = isMobile && index > activeIndex;

  return {
    // Convert polar coords to Cartesian (rem units)
    translateX: `${directionFactor * (isActive ? 5 : (radius * Math.cos(angle)) / 4 + 3)}rem`,
    translateY: isActive
      ? '3rem'
      : `${
          (2 / 3) *
            (radius * Math.sin(angle) * 2 + 2 / (absIndexDiff / 5 + 1)) +
          3
        }rem`,
    opacity:
      isHiddenUpcomingTitle || absIndexDiff > 2
        ? 0
        : absIndexDiff > 1
          ? 0.5
          : 1,
    fontSize: `${fontConst / (absIndexDiff + 1)}rem`,
  };
};

/** The carousel always opens on the first section. */
const INITIAL_ACTIVE_INDEX = 0;

const Titles: FC<TitlesProps> = ({
  sections,
  activeIndex,
  isMobile,
  directionFactor,
}) => (
  <>
    {sections.map((section, index) => (
      <m.h3
        key={section.id.value}
        className="absolute inset-s-3 top-1/4 inline font-bold text-muted-foreground text-xl leading-snug drop-shadow-sm aria-selected:text-foreground"
        initial={getTitlePlacement(
          index,
          INITIAL_ACTIVE_INDEX,
          isMobile,
          directionFactor
        )}
        animate={getTitlePlacement(
          index,
          activeIndex,
          isMobile,
          directionFactor
        )}
        role="tab"
        transition={{ duration: 0.3 }}
        aria-selected={index === activeIndex}
      >
        {section.title}
      </m.h3>
    ))}
  </>
);

type FeaturesCarouselProps = {
  sections: Section[];
  activeIndex: number;
  setActiveIndex: (activeIndex: number) => void;
  progress: number;
  setProgress: (progress: number) => void;
};

export const FeaturesCarousel: FC<FeaturesCarouselProps> = ({
  sections,
  activeIndex,
  setActiveIndex,
  progress,
  setProgress,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

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
  const { locale } = useLocale();
  // Titles are anchored to the inline start, so their offsets must follow it
  const directionFactor: DirectionFactor =
    getHTMLTextDir(locale) === 'rtl' ? -1 : 1;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Cached so scrolling never reads layout; refreshed from the resize
    // observer, whose callback runs after layout and so reads it for free.
    let containerTop = 0;
    let containerHeight = 0;

    const updateActiveSection = () => {
      const scrollYInContainer = window.scrollY - containerTop;
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

      // Clamp so scrolling past (or loading below) the container shows the
      // last section fully played, and above it shows the first unplayed
      const progressInSection = Math.max(
        0,
        Math.min(
          (scrollYInContainer - clampedIndex * sectionHeight) / sectionHeight,
          1
        )
      );

      // Only update if progress changed
      if (progressRef.current !== progressInSection) {
        startTransition(() => {
          setProgress(progressInSection);
        });
      }
    };

    // The body is observed too: content growing above the carousel moves it.
    // Its first callback also syncs with a restored scroll position.
    const resizeObserver = new ResizeObserver(() => {
      containerTop = container.getBoundingClientRect().top + window.scrollY;
      containerHeight = container.offsetHeight;
      updateActiveSection();
    });
    resizeObserver.observe(container);
    resizeObserver.observe(document.body);

    let cancelScrollUpdate: (() => void) | undefined;
    const handleScroll = () => {
      cancelScrollUpdate?.();
      cancelScrollUpdate = scheduleFrameTask(updateActiveSection);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      resizeObserver.disconnect();
      cancelScrollUpdate?.();
      window.removeEventListener('scroll', handleScroll);
    };
  }, [nbSections, setActiveIndex, setProgress]);

  return (
    <section
      className="relative z-0 border-neutral border-b"
      style={{
        // Make the entire container as tall as the number of sections * 150vh
        height: `${nbSections * 125}vh`,
      }}
      ref={containerRef}
    >
      {/* Sticky container */}
      <div className="sticky inset-s-0 top-0 mb-[70vh] h-[30vh] w-full">
        {/* Progress Bar */}
        <div className="absolute inset-s-10 top-20 flex h-3/5 w-0.5 md:top-[20vh]">
          <div className="size-full rounded-full bg-border">
            <div
              className="w-full bg-text"
              style={{ height: `${progress * 100}%` }}
            />
          </div>
        </div>

        {/* Titles */}
        <div
          role="tablist"
          className="absolute inset-s-0 top-15 z-30 size-full md:top-[15vh] md:w-0 md:text-nowrap"
        >
          <Titles
            sections={sections}
            activeIndex={activeIndex}
            isMobile={isMobile ?? true}
            directionFactor={directionFactor}
          />
        </div>

        {/* Section content “carousel” in a sticky container */}
        {sections.map((section, index) => (
          <div
            className={cn(
              'absolute inset-e-0 top-[50vh] z-0 h-[50vh] w-full overflow-hidden md:top-0 md:h-screen md:w-2/3',
              index === activeIndex && 'z-20'
            )}
            key={section.id.value}
          >
            <SectionItem
              isActive={index === activeIndex}
              directionFactor={directionFactor}
            >
              {section.children}
            </SectionItem>
          </div>
        ))}

        {/* Descriptions */}
        {sections.map((section, index) => (
          <div
            className={cn(
              'absolute inset-s-0 top-[30vh] z-0 h-[20vh] w-full overflow-hidden max-md:bg-background md:top-[35vh] md:h-[50vh] md:w-1/3',
              index === activeIndex && 'z-10'
            )}
            key={section.id.value}
          >
            <SectionDescription
              isActive={index === activeIndex}
              directionFactor={directionFactor}
            >
              {section.description}
            </SectionDescription>
          </div>
        ))}
      </div>
    </section>
  );
};

/* -------------------------------------------------------------------------- */
/*                   Lazy Imports for Heavy Child Sections                    */
/* -------------------------------------------------------------------------- */

const IDESection = lazy(() =>
  import('./IDESection').then((mod) => ({ default: mod.IDESection }))
);

const MultilingualSection = lazy(() =>
  import('./MultilingualSection').then((mod) => ({
    default: mod.MultilingualSection,
  }))
);

// const AutocompletionSection = lazy(() =>
//   import('./AutocompletionSection').then((mod) => ({
//     default: mod.AutocompletionSection,
//   }))
// );

const VisualEditorSection = lazy(() =>
  import('./VisualEditorSection').then((mod) => ({
    default: mod.VisualEditorSection,
  }))
);

const CompilerSection = lazy(() =>
  import('./CompilerSection').then((mod) => ({ default: mod.CompilerSection }))
);

const TestSection = lazy(() =>
  import('./TestSection').then((mod) => ({ default: mod.TestSection }))
);

/* -------------------------------------------------------------------------- */
/*                       FeaturesSection Wrapper Example                      */
/* -------------------------------------------------------------------------- */

export const FeaturesSection: FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const sectionsData = useIntlayer('features-section');

  /**
   * Inactive sections stay mounted, so they must not play the active one's
   * progress: sections already scrolled past stay complete, later ones empty.
   */
  const getSectionProgress = (sectionIndex: number): number => {
    if (sectionIndex < activeIndex) return 1;
    if (sectionIndex > activeIndex) return 0;
    return progress;
  };

  const sections: Section[] = sectionsData
    // Filter out anything you don’t want to display
    .map((sectionData, sectionIndex) => {
      const sectionProgress = getSectionProgress(sectionIndex);

      switch (sectionData.id.value) {
        case 'codebase':
          return {
            ...sectionData,
            children: (
              <Suspense fallback={<Loader />}>
                <IDESection scrollProgress={sectionProgress} />
              </Suspense>
            ),
          };
        case 'visual-editor':
          return {
            ...sectionData,
            children: (
              <Suspense fallback={<Loader />}>
                <VisualEditorSection />
              </Suspense>
            ),
          };
        case 'multilingual':
          return {
            ...sectionData,
            children: (
              <Suspense fallback={<Loader />}>
                <MultilingualSection scrollProgress={sectionProgress} />
              </Suspense>
            ),
          };
        case 'test':
          return {
            ...sectionData,
            children: (
              <Suspense fallback={<Loader />}>
                <TestSection scrollProgress={sectionProgress} />
              </Suspense>
            ),
          };
        case 'compiler':
          return {
            ...sectionData,
            children: (
              <Suspense fallback={<Loader />}>
                <CompilerSection scrollProgress={sectionProgress} />
              </Suspense>
            ),
          };
        // case 'autocomplete':
        //   return {
        //     ...sectionData,
        //     children: (
        //       <Suspense fallback={<Loader />}>
        //         <AutocompletionSection scrollProgress={sectionProgress} />
        //       </Suspense>
        //     ),
        //   };
        default:
          return {
            ...sectionData,
            children: <>{sectionData.title}</>,
          };
      }
    });

  return (
    <FrameworkProvider>
      <FeaturesCarousel
        sections={sections}
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
        progress={progress}
        setProgress={setProgress}
      />
    </FrameworkProvider>
  );
};
