'use client';

import { Loader } from '@intlayer/design-system';
import { useEffect, useState, useRef, type FC } from 'react';

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
    window.addEventListener('resize', checkVisibility);
    window.addEventListener('scroll', checkVisibility);

    // Cleanup listeners
    return () => {
      window.removeEventListener('resize', checkVisibility);
      window.removeEventListener('scroll', checkVisibility);
    };
  }, [isVisible]);

  return (
    <div ref={ref} className="m-auto h-[700px] w-full">
      <Loader isLoading={!isVisible} />
      {isVisible && (
        <iframe
          src="https://codesandbox.io/p/github/aypineau/intlayer-example-nextjs/main?embed=1&file=%2Fintlayer.config.ts&showConsole=true"
          className="m-auto size-full overflow-hidden rounded-lg border-0 p-10 md:p-20"
          title="aypineau/intlayer-example-nextjs/main"
          sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
        />
      )}
    </div>
  );
};
