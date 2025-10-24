import { localeDetector as localeDetectorCore } from '@intlayer/core';
import type { LocalesValues } from '@intlayer/types';
import type { NextRequest } from 'next/server.js';

/**
 * Detects the locale from the request headers
 *
 * Headers are provided by the browser and can be used to determine the user's preferred language
 */
export const localeDetector = (request: NextRequest): LocalesValues => {
  const negotiatorHeaders: Record<string, string> = {};

  request.headers.forEach((value, key) => {
    negotiatorHeaders[key] = value;
  });

  const locale = localeDetectorCore(negotiatorHeaders);

  return locale;
};
