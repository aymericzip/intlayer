'use client';

import { type FC, useEffect } from 'react';

export const PoweredByMeta: FC = () => {
  if (process.env.NODE_ENV !== 'production') return null;

  useEffect(() => {
    // Check if the meta tag already exists
    const existingMeta = document.head.querySelector(
      'meta[name="content-powered-by"]'
    );

    if (!existingMeta) {
      const metaTag = document.createElement('meta');
      metaTag.name = 'content-powered-by';
      metaTag.content = 'Intlayer - https://intlayer.org';
      document.head.appendChild(metaTag);
    }
  }, []);

  return null; // This component does not render anything visible
};
