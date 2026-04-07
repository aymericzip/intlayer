'use client';

import { CHINESE } from '@intlayer/types/locales';
import { useLocation } from '@tanstack/react-router';
import { useEffect } from 'react';
import { useLocale } from 'react-intlayer';

export const useBaiduAutoPush = () => {
  const { pathname } = useLocation();
  const { locale } = useLocale();

  useEffect(() => {
    // Abort in non-browser environments or local development
    if (
      typeof window === 'undefined' ||
      process.env.NODE_ENV !== 'production'
    ) {
      return;
    }

    if (locale !== CHINESE) return;

    const scriptId = 'baidu-auto-push';

    // Remove the old script to force re-execution on route change
    const existingScript = document.getElementById(scriptId);
    if (existingScript) existingScript.remove();

    const bp = document.createElement('script');

    bp.id = scriptId;
    bp.async = true;

    // Modern sites are HTTPS by default, but keeping the protocol check for safety
    const isHttps = window.location.protocol === 'https:';
    bp.src = isHttps
      ? 'https://zz.bdstatic.com/linksubmit/push.js'
      : 'http://push.zhanzhang.baidu.com/push.js';

    const firstScript = document.getElementsByTagName('script')[0];

    if (firstScript?.parentNode) {
      firstScript.parentNode.insertBefore(bp, firstScript);
    } else {
      document.head.appendChild(bp); // Fallback if no other scripts exist
    }
  }, [pathname, locale]);
};
