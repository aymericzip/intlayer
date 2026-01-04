'use client';

import { Carousel, Container } from '@intlayer/design-system';
import type { FC } from 'react';
import { useEffect, useRef, useState } from 'react';
import { AIABTestingSection } from './AIABTestingSection';
import { CMSSection } from './CMSSection';
import { FeatureFlagsSection } from './FeatureFlagsSection';
import { I18nCodebaseSection } from './I18nCodebaseSection';
import { TMSSection } from './TMSSection';

const PRODUCTS = [
  { Component: I18nCodebaseSection, key: 'i18n' },
  { Component: CMSSection, key: 'cms' },
  { Component: TMSSection, key: 'tms' },
  { Component: FeatureFlagsSection, key: 'feature-flags' },
  { Component: AIABTestingSection, key: 'ab-testing' },
];

export const ProductsSection: FC = () => {
  const [isActionEnabled, setIsActionEnabled] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsActionEnabled(entry.isIntersecting);
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.6,
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
        {PRODUCTS.map(({ Component, key }) => (
          <Carousel.Item key={key}>
            <Container
              roundedSize="3xl"
              background="with"
              transparency="sm"
              className="max-w-2xl p-6"
            >
              <Component />
            </Container>
          </Carousel.Item>
        ))}

        <Carousel.Indicators
          className="bottom-0"
          disableKeyboardShortcuts={!isActionEnabled}
        />
      </Carousel>
    </div>
  );
};
