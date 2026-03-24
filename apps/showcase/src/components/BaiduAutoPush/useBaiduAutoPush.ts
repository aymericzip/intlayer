'use client';

import { useLocation } from '@tanstack/react-router';
import { useEffect } from 'react';

export const useBaiduAutoPush = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // 1. Abort in non-browser environments or local development
    if (
      typeof window === 'undefined' ||
      process.env.NODE_ENV !== 'production'
    ) {
      return;
    }

    // 2. Abort if the user's primary or secondary browser language is not Chinese
    const userLanguages = navigator.languages || [navigator.language];
    const isChineseUser = userLanguages.some((lang) =>
      lang.toLowerCase().startsWith('zh')
    );

    if (!isChineseUser) return;

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
  }, [pathname]);
};
