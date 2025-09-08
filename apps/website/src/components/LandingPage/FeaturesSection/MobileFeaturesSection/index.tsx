  'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useIntlayer } from 'next-intlayer';
import { useState, useEffect } from 'react';
import { cn } from '@utils/cn';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import dynamic from 'next/dynamic';
import { type Section } from '../../FeaturesSection';
import { Loader } from '@intlayer/design-system';

/* -------------------------------------------------------------------------- */
/*                   Dynamic Imports (lazy loading heavy UI)                  */
/* -------------------------------------------------------------------------- */

const DynamicIDESection = dynamic(
  () => import('../IDESection').then((mod) => mod.IDESection),
  { loading: () => <Loader /> }
);

const DynamicMarkdownSection = dynamic(
  () => import('../MarkdownSection').then((mod) => mod.MarkdownSection),
  { loading: () => <Loader /> }
);

const DynamicMultilingualSection = dynamic(
  () =>
    import('../MultilingualSection').then(
      (mod) => mod.MultilingualSection
    ),
  { loading: () => <Loader /> }
);

const DynamicAutocompletionSection = dynamic(
  () =>
    import('../AutocompletionSection').then(
      (mod) => mod.AutocompletionSection
    ),
  { loading: () => <Loader /> }
);

const DynamicVisualEditorSection = dynamic(
  () =>
    import('../VisualEditorSection').then(
      (mod) => mod.VisualEditorSection
    ),
  { loading: () => <Loader /> }
);

/* -------------------------------------------------------------------------- */
/*                      Mobile Optimized Features Section                     */
/* -------------------------------------------------------------------------- */

export const MobileFeaturesSection = () => {
  const sectionsData = useIntlayer('features-section');
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [progress, setProgress] = useState(0);
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

  // Mapping identique à la version desktop
  const sections: Section[] = sectionsData.map((sectionData) => {
    // Create mobile-optimized wrapper for each component
    const MobileWrapper = ({ children }: { children: React.ReactNode }) => (
      <div className="w-full max-w-sm mx-auto">
        <div className="transform scale-100 origin-center">
          {children}
        </div>
      </div>
    );

    switch (sectionData.id.value) {
      case 'codebase':
        return {
          ...sectionData,
          children: (
            <MobileWrapper>
              <DynamicIDESection scrollProgress={progress} />
            </MobileWrapper>
          ),
        };
      case 'visual-editor':
        return {
          ...sectionData,
          children: (
            <MobileWrapper>
              <DynamicVisualEditorSection />
            </MobileWrapper>
          ),
        };
      case 'multilingual':
        return {
          ...sectionData,
          children: (
            <MobileWrapper>
              <DynamicMultilingualSection scrollProgress={progress} />
            </MobileWrapper>
          ),
        };
      case 'markdown':
        return {
          ...sectionData,
          children: (
            <MobileWrapper>
              <DynamicMarkdownSection scrollProgress={progress} />
            </MobileWrapper>
          ),
        };
      case 'autocomplete':
        return {
          ...sectionData,
          children: (
            <MobileWrapper>
              <DynamicAutocompletionSection scrollProgress={progress} />
            </MobileWrapper>
          ),
        };
      default:
        return {
          ...sectionData,
          children: <>{sectionData.title}</>,
        };
    }
  });

  const next = () => {
    setDirection(1);
    setActiveIndex((prev) => {
      const newIndex = (prev + 1) % sections.length;
      setProgress(newIndex / sections.length); // Set progress based on section position
      return newIndex;
    });
  };

  const prev = () => {
    setDirection(-1);
    setActiveIndex((prev) => {
      const newIndex = (prev - 1 + sections.length) % sections.length;
      setProgress(newIndex / sections.length); // Set progress based on section position
      return newIndex;
    });
  };

  // Variants d'animation selon la direction
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

  // Show loading state until client-side hydration is complete
  if (!isClient) {
    return (
      <section className="relative flex flex-col w-full items-center justify-center overflow-hidden bg-background py-10">
        <div className="text-center">
          <h2 className="text-lg font-bold text-text mb-4">Loading Features...</h2>
          <p className="text-sm text-neutral">Please wait while we load the features.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="relative flex flex-col w-full items-center justify-center overflow-hidden bg-background py-10">
      {/* Header avec navigation */}
      <div className="mb-6 flex w-full flex-row items-center justify-between px-6">
        <button
          onClick={prev}
          aria-label="Previous feature"
          className="rounded-full bg-neutral/20 p-2"
        >
          <ChevronLeft className="h-5 w-5 text-text" />
        </button>
        <h2 className="text-center text-lg font-bold text-text">
          {sections[activeIndex].title}
        </h2>
        <button
          onClick={next}
          aria-label="Next feature"
          className="rounded-full bg-neutral/20 p-2"
        >
          <ChevronRight className="h-5 w-5 text-text" />
        </button>
      </div>

      {/* Carrousel swipeable */}
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
              onDragEnd={(_, info) => {
                if (info.offset.x < -50) {
                  next();
                } else if (info.offset.x > 50) {
                  prev();
                }
              }}
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

      {/* Pagination dots */}
      <div className="mt-6 flex gap-2">
        {sections.map((_, index) => (
          <button
            key={index}
            aria-label={`Go to feature ${index + 1}`}
            title={`Go to feature ${index + 1}`}
            onClick={() => {
              setDirection(index > activeIndex ? 1 : -1);
              setActiveIndex(index);
              setProgress(index / sections.length); // Set progress based on section position
            }}
            className={cn(
              'h-2 w-2 rounded-full transition-all',
              index === activeIndex
                ? 'bg-text w-4'
                : 'bg-neutral/40 hover:bg-neutral/70'
            )}
          />
        ))}
      </div>
    </section>
  );
};
