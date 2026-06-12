'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';

/**
 * Client component example using React hooks for translations
 * Can use hooks like useState, useEffect, and useTranslation
 */
const ClientComponent = () => {
  // useTranslation hook provides access to translation function and i18n instance
  // Specify namespace to only load translations for "about" namespace
  const { t, i18n } = useTranslation('about');
  const [count, setCount] = useState(0);

  // Create locale-aware number formatter
  // i18n.language provides current locale (e.g., "en", "fr")
  // Intl.NumberFormat formats numbers according to locale conventions
  const numberFormat = new Intl.NumberFormat(i18n.language);

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Format number using locale-specific formatting */}
      <p className="m-0 font-bold text-5xl text-white">
        {numberFormat.format(count)}
      </p>
      <button
        type="button"
        className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] md:w-[158px] dark:hover:bg-[#ccc]"
        aria-label={t('counter.label')}
        onClick={() => setCount((c) => c + 1)}
      >
        {t('counter.increment')}
      </button>
    </div>
  );
};

export default ClientComponent;
