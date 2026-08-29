import { Carousel } from '@intlayer/design-system/carousel';
import { Container } from '@intlayer/design-system/container';
import type { FC } from 'react';
import { useEffect, useRef, useState } from 'react';
import { AIABTestingSection } from './AIABTestingSection';
import { CMSSection } from './CMSSection';
import { FeatureFlagsSection } from './FeatureFlagsSection';
import { I18nCodebaseSection } from './I18nCodebaseSection';
import { TMSSection } from './TMSSection';
import { TranslateSection } from './TranslateSection';

const PRODUCTS = [
  { Component: I18nCodebaseSection, key: 'i18n' },
  { Component: TranslateSection, key: 'translate' },
  { Component: TMSSection, key: 'tms' },
  { Component: CMSSection, key: 'cms' },
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
      className="flex min-h-[75vh] w-full items-center justify-center overflow-hidden border-neutral border-b"
    >
      <Carousel initialIndex={1} className="space-y-10 overflow-visible">
        {PRODUCTS.map(({ Component, key }) => (
          <Carousel.Item key={key}>
            <div className="max-w-2xl rounded-2xl border bg-card p-6">
              <Component />
            </div>
          </Carousel.Item>
        ))}

        <Carousel.Indicators disableKeyboardShortcuts={!isActionEnabled} />
      </Carousel>
    </div>
  );
};
