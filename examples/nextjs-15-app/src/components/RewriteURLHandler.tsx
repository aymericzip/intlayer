'use client';

import { useRewriteURL } from 'next-intlayer';
import type { FC } from 'react';

export const RewriteURLHandler: FC = () => {
  useRewriteURL();

  return <></>;
};
