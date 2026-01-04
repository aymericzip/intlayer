'use client';

import { Carousel, Container } from '@intlayer/design-system';
import type { FC } from 'react';
import { useEffect, useRef, useState } from 'react';
import { AIABTestingSection } from './AIABTestingSection';
import { CMSSection } from './CMSSection';
import { FeatureFlagsSection } from './FeatureFlagsSection';
import { I18nCodebaseSection } from './I18nCodebaseSection';
import { TMSSection } from './TMSSection';

export const ProductsSection: FC = () => {
  const [isActionEnabled, setIsActionEnabled] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Use IntersectionObserver to toggle keyboard shortcuts only when visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsActionEnabled(entry.isIntersecting);
      },
      {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.6, // Activate when 60% of the component is visible
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      className="flex min-h-[75vh] items-center justify-center"
    >
      <Carousel initialIndex={1}>
        <Carousel.Item>
          <Container
            roundedSize="3xl"
            background="with"
            transparency="sm"
            className="max-w-2xl p-6"
          >
            <I18nCodebaseSection />
          </Container>
        </Carousel.Item>
        <Carousel.Item>
          <Container
            roundedSize="3xl"
            background="with"
            transparency="sm"
            className="max-w-2xl p-6"
          >
            <CMSSection />
          </Container>
        </Carousel.Item>

        <Carousel.Item>
          <Container
            roundedSize="3xl"
            background="with"
            transparency="sm"
            className="max-w-2xl p-6"
          >
            <TMSSection />
          </Container>
        </Carousel.Item>
        <Carousel.Item>
          <Container
            roundedSize="3xl"
            background="with"
            transparency="sm"
            className="max-w-2xl p-6"
          >
            <FeatureFlagsSection />
          </Container>
        </Carousel.Item>
        <Carousel.Item>
          <Container
            roundedSize="3xl"
            background="with"
            transparency="sm"
            className="max-w-2xl p-6"
          >
            <AIABTestingSection />
          </Container>
        </Carousel.Item>
        {/* Only enable keyboard shortcuts if the section is currently visible */}
        <Carousel.Indicators
          className="bottom-0"
          disableKeyboardShortcuts={!isActionEnabled}
        />
      </Carousel>
    </div>
  );
};
