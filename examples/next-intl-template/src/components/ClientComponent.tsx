'use client';

import { useFormatter, useTranslations } from 'next-intl';
import { useState } from 'react';

const ClientComponent = () => {
  // Scope directly to the nested object
  // useTranslations/useFormatter are hooks that read from NextIntlClientProvider context
  // They only work if the component is wrapped in NextIntlClientProvider
  const t = useTranslations('about.counter');
  const format = useFormatter();
  const [count, setCount] = useState(0);

  return (
    <div className="flex flex-col gap-4 rounded-lg border border-zinc-200 bg-zinc-50 p-6 dark:border-zinc-800 dark:bg-zinc-900">
      <div className="flex items-center justify-between">
        <span className="font-medium text-sm text-zinc-600 dark:text-zinc-400">
          {t('label')}:
        </span>
        <span className="font-bold text-2xl text-zinc-900 dark:text-zinc-50">
          {format.number(count)}
        </span>
      </div>
      <button
        aria-label={t('label')}
        onClick={() => setCount((count) => count + 1)}
        className="rounded-md bg-blue-600 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-700"
      >
        {t('increment')}
      </button>
    </div>
  );
};

export default ClientComponent;
