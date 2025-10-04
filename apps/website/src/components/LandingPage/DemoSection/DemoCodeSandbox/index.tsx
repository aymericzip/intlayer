'use client';

import { Loader } from '@intlayer/design-system';
import { type FC, useEffect, useRef, useState } from 'react';

export const DemoCodeSandbox: FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkVisibility = () => {
      if (!isVisible) {
        // Example condition: check if the element is in the viewport
        const rect = ref.current?.getBoundingClientRect();
        setIsVisible(
          (rect && rect.top >= 0 && rect.bottom <= window.innerHeight) ?? false
        );
      }
    };

    // Run the visibility check on mount
    checkVisibility();

    // Optional: Re-check visibility on window resize or scroll
    window.addEventListener('resize', checkVisibility, { passive: true });
    window.addEventListener('scroll', checkVisibility, { passive: true });

    // Cleanup listeners
    return () => {
      window.removeEventListener('resize', checkVisibility);
      window.removeEventListener('scroll', checkVisibility);
    };
  }, [isVisible]);

  return (
    <div ref={ref} className="m-auto w-full">
      <Loader isLoading={!isVisible} />
      {isVisible && (
        <iframe
          src="https://github.dev/aymericzip/intlayer-next-15-template"
          className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-[16/9] md:w-full"
          title="Demo CodeSandbox - How to Internationalize your application using Intlayer"
          sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
          loading="lazy"
        />
      )}
    </div>
  );
};
