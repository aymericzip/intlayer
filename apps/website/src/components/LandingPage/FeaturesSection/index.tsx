'use client';

import { motion } from 'framer-motion';
import { Loader } from 'lucide-react';
import dynamic from 'next/dynamic';
import { type IntlayerNode, useIntlayer } from 'next-intlayer';
import React, {
  type ReactNode,
  type PropsWithChildren,
  type FC,
  useEffect,
  useState,
  useRef,
} from 'react';
import { VisualEditorSection } from './VisualEditorSection';

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
    className="text-neutral dark:text-neutral-dark bg-background dark:bg-background-dark flex size-full items-center justify-center px-16 text-sm md:pr-0 lg:pr-16"
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

type FeaturesCarouselProps = {
  sections: Section[];
};

export const FeaturesCarousel: FC<FeaturesCarouselProps> = ({ sections }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  // Track which section is currently "active"
  const [activeIndex, setActiveIndex] = useState(0);
  // Track scroll progress within the active section
  const [progress, setProgress] = useState(0);
  const nbSections = sections.length;

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const containerTop = containerRef.current?.offsetTop;
      const containerHeight = containerRef.current?.offsetHeight;

      if (
        typeof containerTop !== 'number' ||
        typeof containerHeight !== 'number'
      )
        return;

      const scrollYInContainer = scrollY - containerTop;
      const scrollableHeight = containerHeight - window.innerHeight;
      const sectionHeight = scrollableHeight / nbSections;

      // Determine which section index we’re in, based on multiples of 100vh
      const newIndex = Math.floor(scrollYInContainer / sectionHeight);
      // Clamp to valid section indices
      const clampedIndex = Math.max(0, Math.min(newIndex, nbSections));
      setActiveIndex(clampedIndex);

      const isOverflowing = scrollYInContainer > scrollableHeight;
      const isUnderflowing = scrollYInContainer < 0;

      if (!isOverflowing && !isUnderflowing) {
        // Determine progress (0..1) within the current section
        const progressInSection =
          (scrollYInContainer % sectionHeight) / sectionHeight;
        setProgress(progressInSection);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [sections.length]);

  return (
    <section
      className="relative w-screen"
      style={{
        // Make the entire container as tall as the number of sections * 100vh
        height: `${nbSections * 100}vh`,
      }}
      ref={containerRef}
    >
      {/* Left column with “floating” titles */}
      <div className="sticky left-0 top-0 h-[30vh] w-full">
        {/* Example of a vertical progress bar based on `progress` */}
        <div className="absolute left-10 top-20 flex h-3/5 w-[2px] md:top-[20vh]">
          <div className="bg-neutral/20 dark:bg-neutral-dark size-full rounded-full">
            <div
              className="bg-text dark:bg-text-dark w-full"
              style={{ height: `${progress * 100}%` }}
            />
          </div>
        </div>

        {/* Titles that move depending on `activeIndex` */}
        <div className="top-15 absolute left-0 z-20 size-full md:top-[15vh]">
          {sections.map((section, index) => {
            const isActive = index === activeIndex;
            // Define the angle step (in radians) between items.
            const angleStep = Math.PI / 10;
            const absIndexDiff = Math.abs(index - activeIndex);
            // Calculate the angle for this item relative to the active item.
            const angle = (index - activeIndex) * angleStep;
            // Define a radius in rem units.
            const radius = 10;

            return (
              <motion.h3
                key={section.id.value}
                className="text-neutral dark:text-neutral-dark aria-selected:text-text dark:aria-selected:text-text-dark absolute left-3 top-1/4 inline text-xl font-bold leading-snug"
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
                  fontSize: `${3 / (absIndexDiff + 1)}rem`,
                }}
                transition={{ duration: 0.3 }}
                aria-selected={isActive}
              >
                {section.title}
              </motion.h3>
            );
          })}
        </div>
        {/* Section content “carousel” in a sticky container */}
        {sections.map((section, index) => (
          <div
            className="absolute right-0 top-[50vh] z-10 h-[50vh] w-full overflow-hidden md:top-0 md:h-screen md:w-2/3"
            key={section.id.value}
          >
            <SectionItem isActive={index === activeIndex}>
              {section.children}
            </SectionItem>
          </div>
        ))}

        {sections.map((section, index) => (
          <div
            className="absolute left-0 top-[35vh] z-10 h-[20vh] w-full overflow-hidden md:top-[50vh] md:h-[50vh] md:w-1/3"
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

const DynamicIDESection = dynamic(
  () => import('./IDESection').then((mod) => mod.IDESection),
  {
    loading: () => <Loader />,
  }
);

export const FeaturesSection: FC = () => {
  const sectionsData = useIntlayer('features-section');

  const sections: Section[] = sectionsData
    .filter((el) => ['maintainability', 'visual-editor'].includes(el.id.value))
    .map((sectionData) => {
      switch (sectionData.id.value) {
        case 'maintainability':
          return { ...sectionData, children: <DynamicIDESection /> };

        case 'visual-editor':
          return { ...sectionData, children: <VisualEditorSection /> };

        case 'autocomplete-suggestions':
          return { ...sectionData, children: <>{sectionData.title}</> };

        case 'translate':
          return { ...sectionData, children: <>{sectionData.title}</> };

        case 'markdown':
          return { ...sectionData, children: <>{sectionData.title}</> };

        default:
          return { ...sectionData, children: <>{sectionData.title}</> };
      }
    });

  return <FeaturesCarousel sections={sections} />;
};
