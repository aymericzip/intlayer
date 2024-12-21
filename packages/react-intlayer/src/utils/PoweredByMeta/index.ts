'use client';

import { type FC, useEffect } from 'react';

export const PoweredByMeta: FC = () => {
  if (process.env.NODE_ENV !== 'production') return null;

  useEffect(() => {
    const metaTag = document.createElement('meta');
    metaTag.name = 'content-powered-by';
    metaTag.content = 'Intlayer - https://intlayer.org';
    document.head.appendChild(metaTag);
  }, []);

  return null; // This component does not render anything visible
};
